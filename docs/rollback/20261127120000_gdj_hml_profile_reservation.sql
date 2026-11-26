-- GDJVProject (ieuazfywianwzdfgzgtu)
-- Remove somente a função e a tabela isoladas de homologação GDJ.
-- Destrói as reservas fictícias gravadas pelo protocolo GDJ-HML-PERFIS-2026-001.
-- Não aplicar em produção sem aprovação explícita.

begin;
drop function if exists public.gdj_hml_reserve_profiles(text, integer, uuid[]);
drop table if exists public.gdj_hml_profile_reservations;
commit;
