begin;

create schema if not exists gdj_intake;
revoke all on schema gdj_intake from public, anon, authenticated;

create table gdj_intake.fichas (
  id uuid primary key,
  cnpj text not null,
  empresa jsonb not null,
  perfis jsonb not null check (jsonb_typeof(perfis) = 'array' and jsonb_array_length(perfis) between 1 and 20),
  texto_email text not null,
  recebida_em timestamptz not null default now(),
  status_parceria text not null default 'Ficha recebida',
  planilha_enviada_em timestamptz,
  email_enviado_em timestamptz
);
alter table gdj_intake.fichas enable row level security;

create function public.gdj_registrar_ficha(
  p_id uuid, p_empresa jsonb, p_perfis jsonb, p_texto_email text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
begin
  insert into gdj_intake.fichas as ficha (id, cnpj, empresa, perfis, texto_email)
  values (p_id, regexp_replace(p_empresa ->> 'campo_3', '[^0-9]', '', 'g'), p_empresa, p_perfis, p_texto_email)
  on conflict (id) do update set id = excluded.id
  where ficha.empresa = excluded.empresa and ficha.perfis = excluded.perfis
    and ficha.texto_email = excluded.texto_email
  returning id into v_id;
  if v_id is null then
    raise sqlstate 'PT409' using message = 'Protocolo já associado a outro conteúdo';
  end if;
  return v_id;
end;
$$;
revoke all on function public.gdj_registrar_ficha(uuid,jsonb,jsonb,text) from public, anon, authenticated;
grant execute on function public.gdj_registrar_ficha(uuid,jsonb,jsonb,text) to service_role;

commit;
