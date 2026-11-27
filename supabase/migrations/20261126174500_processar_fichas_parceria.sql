begin;

create table gdj_intake.entregas (
  ficha_id uuid not null references gdj_intake.fichas(id),
  etapa text not null check (etapa in ('planilha', 'email')),
  estado text not null default 'pendente'
    check (estado in ('pendente', 'reservada', 'concluida', 'falha', 'incerta')),
  reserva uuid,
  prazo timestamptz,
  tentar_apos timestamptz not null default now(),
  tentativas integer not null default 0,
  referencia text,
  primary key (ficha_id, etapa),
  check ((estado = 'reservada') = (reserva is not null and prazo is not null))
);
alter table gdj_intake.entregas enable row level security;

create function gdj_intake.enfileirar_ficha() returns trigger
language plpgsql set search_path = '' as $$
begin
  insert into gdj_intake.entregas (ficha_id, etapa)
  values (new.id, 'planilha'), (new.id, 'email');
  return new;
end;
$$;

create trigger enfileirar_ficha after insert on gdj_intake.fichas
for each row execute function gdj_intake.enfileirar_ficha();

insert into gdj_intake.entregas (ficha_id, etapa, estado)
select id, etapa, case when entregue is null then 'pendente' else 'concluida' end
from gdj_intake.fichas
cross join lateral (values ('planilha', planilha_enviada_em), ('email', email_enviado_em)) as etapas(etapa, entregue);

create function public.gdj_reservar_entrega(p_etapa text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  e gdj_intake.entregas%rowtype;
  f gdj_intake.fichas%rowtype;
begin
  if p_etapa is null or p_etapa not in ('planilha', 'email') then
    raise sqlstate 'PT400' using message = 'Etapa inválida';
  end if;

  -- Expiração pode ocorrer depois de o provedor aceitar a operação.
  with expiradas as (
    select ficha_id, etapa from gdj_intake.entregas
    where etapa = p_etapa and estado = 'reservada' and prazo <= now()
    for update skip locked
  )
  update gdj_intake.entregas d set estado = 'incerta', reserva = null, prazo = null
  from expiradas x where d.ficha_id = x.ficha_id and d.etapa = x.etapa;

  select * into e from gdj_intake.entregas
  where etapa = p_etapa and estado in ('pendente', 'falha')
    and tentar_apos <= now() and tentativas < 5
  order by tentar_apos, ficha_id limit 1 for update skip locked;
  if not found then return null; end if;

  update gdj_intake.entregas
  set estado = 'reservada', reserva = gen_random_uuid(),
      prazo = now() + interval '5 minutes', tentativas = tentativas + 1
  where ficha_id = e.ficha_id and etapa = e.etapa
  returning * into e;

  select * into strict f from gdj_intake.fichas where id = e.ficha_id;
  return jsonb_build_object(
    'protocolo', f.id, 'etapa', e.etapa, 'reserva', e.reserva, 'prazo', e.prazo,
    'tentativa', e.tentativas, 'recebida_em', f.recebida_em,
    'empresa', f.empresa, 'perfis', f.perfis, 'texto_email', f.texto_email
  );
end;
$$;

create function public.gdj_confirmar_entrega(
  p_protocolo uuid, p_etapa text, p_reserva uuid, p_resultado text,
  p_referencia text default null
) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_resultado is null or p_resultado not in ('concluida', 'falha', 'incerta') then
    raise sqlstate 'PT400' using message = 'Resultado inválido';
  end if;

  update gdj_intake.entregas
  set estado = p_resultado, referencia = left(p_referencia, 250),
      reserva = null, prazo = null, tentar_apos = now() + interval '5 minutes'
  where ficha_id = p_protocolo and etapa = p_etapa and estado = 'reservada'
    and reserva = p_reserva and prazo > now();

  if not found then return false; end if;
  if p_resultado = 'concluida' then
    update gdj_intake.fichas set
      planilha_enviada_em = case when p_etapa = 'planilha' then now() else planilha_enviada_em end,
      email_enviado_em = case when p_etapa = 'email' then now() else email_enviado_em end
    where id = p_protocolo;
  end if;
  return true;
end;
$$;

-- Call only after checking the provider. A timeout alone is not evidence of absence.
create function public.gdj_reconciliar_entrega(
  p_protocolo uuid, p_etapa text, p_entregue boolean, p_evidencia text
) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_entregue is null or nullif(btrim(p_evidencia), '') is null then
    raise sqlstate 'PT400' using message = 'Informe o resultado e a evidência da conferência';
  end if;

  update gdj_intake.entregas
  set estado = case when p_entregue then 'concluida' else 'pendente' end,
      referencia = left(p_evidencia, 250), tentar_apos = now(),
      tentativas = case when p_entregue then tentativas else 0 end
  where ficha_id = p_protocolo and etapa = p_etapa and estado = 'incerta';

  if not found then return false; end if;
  if p_entregue then
    update gdj_intake.fichas set
      planilha_enviada_em = case when p_etapa = 'planilha' then now() else planilha_enviada_em end,
      email_enviado_em = case when p_etapa = 'email' then now() else email_enviado_em end
    where id = p_protocolo;
  end if;
  return true;
end;
$$;

revoke all on function public.gdj_reconciliar_entrega(uuid,text,boolean,text) from public, anon, authenticated;
grant execute on function public.gdj_reconciliar_entrega(uuid,text,boolean,text) to service_role;
revoke all on function public.gdj_reservar_entrega(text) from public, anon, authenticated;
revoke all on function public.gdj_confirmar_entrega(uuid,text,uuid,text,text) from public, anon, authenticated;
grant execute on function public.gdj_reservar_entrega(text) to service_role;
grant execute on function public.gdj_confirmar_entrega(uuid,text,uuid,text,text) to service_role;

commit;
