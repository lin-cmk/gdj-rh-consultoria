-- GDJVProject (ieuazfywianwzdfgzgtu)
-- Reserva isolada para homologação com o único protocolo fictício permitido.
-- Não consulta nem altera a fila geral, fichas, candidatos, vagas ou consultorias reais.

begin;

create table public.gdj_hml_profile_reservations (
  protocol text not null check (protocol = 'GDJ-HML-PERFIS-2026-001'),
  position integer not null check (position between 1 and 20),
  role_key text not null,
  profile_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (protocol, position),
  unique (profile_id),
  check (role_key = 'HML-CARGO-' || lpad(position::text, 2, '0'))
);

alter table public.gdj_hml_profile_reservations enable row level security;
alter table public.gdj_hml_profile_reservations force row level security;
revoke all on table public.gdj_hml_profile_reservations from public, anon, authenticated;
grant select, insert on table public.gdj_hml_profile_reservations to service_role;

create or replace function public.gdj_hml_reserve_profiles(
  p_protocol text,
  p_profile_count integer,
  p_profile_ids uuid[]
)
returns table (
  protocol text,
  position integer,
  role_key text,
  profile_id uuid,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  i integer;
  v_expected uuid;
  v_saved public.gdj_hml_profile_reservations%rowtype;
begin
  if p_protocol is distinct from 'GDJ-HML-PERFIS-2026-001' then
    raise exception 'protocolo de homologação inválido' using errcode = '22023';
  end if;
  if p_profile_count is null or p_profile_count < 1 or p_profile_count > 20
     or p_profile_ids is null or cardinality(p_profile_ids) <> p_profile_count then
    raise exception 'quantidade de perfis inválida' using errcode = '22023';
  end if;

  for i in 1..p_profile_count loop
    v_expected := md5('gdj-hml-profile:' || p_protocol || ':' || i::text)::uuid;
    if p_profile_ids[i] is distinct from v_expected then
      raise exception 'profile_id não corresponde ao protocolo e à posição' using errcode = '22023';
    end if;

    insert into public.gdj_hml_profile_reservations (protocol, position, role_key, profile_id)
    values (p_protocol, i, 'HML-CARGO-' || lpad(i::text, 2, '0'), v_expected)
    on conflict (protocol, position) do nothing;

    select r.* into v_saved
    from public.gdj_hml_profile_reservations as r
    where r.protocol = p_protocol and r.position = i;

    if not found or v_saved.profile_id is distinct from v_expected
       or v_saved.role_key is distinct from 'HML-CARGO-' || lpad(i::text, 2, '0') then
      raise exception 'reserva persistida diverge do protocolo e da posição' using errcode = '23514';
    end if;

    protocol := v_saved.protocol;
    position := v_saved.position;
    role_key := v_saved.role_key;
    profile_id := v_saved.profile_id;
    created_at := v_saved.created_at;
    return next;
  end loop;
end;
$function$;

revoke all on function public.gdj_hml_reserve_profiles(text, integer, uuid[]) from public, anon, authenticated;
grant execute on function public.gdj_hml_reserve_profiles(text, integer, uuid[]) to service_role;

commit;
