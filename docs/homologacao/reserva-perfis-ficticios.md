# Reserva HML isolada de perfis

Esta rota reserva apenas cargos fictícios sob `GDJ-HML-PERFIS-2026-001`. Não recebe nome, e-mail, CNPJ ou ficha; não consulta a RPC que seleciona a próxima ficha e não lê nem grava nas tabelas de produção.

## Contrato

- `POST /api/hml-reservas`
- Cabeçalho `Authorization: Bearer <GDJ_HML_RESERVATION_TOKEN>`.
- Corpo exato: `{"protocol":"GDJ-HML-PERFIS-2026-001","profile_count":2}`. O máximo é 20.
- A função Postgres grava somente em `public.gdj_hml_profile_reservations`.
- Posições persistidas `1..N` recebem `HML-CARGO-01..20`. `profile_id` é o UUID do MD5 de `gdj-hml-profile:<protocolo>:<posição>` tanto na API quanto no SQL.
- Chave primária `(protocol, position)`, unicidade de `profile_id` e `ON CONFLICT DO NOTHING` preservam o ID da primeira gravação. Repetir o mesmo protocolo e quantidade retorna as linhas persistidas sem criar cópias. Uma repetição menor não apaga posições já reservadas.

## Segredos e liberação

`GDJ_HML_RESERVATION_TOKEN` e `GDJ_HML_SUPABASE_SECRET_KEY` são variáveis somente de servidor. Não configurar valores em Vercel, não aplicar a migration e não executar a rota antes da revisão e da autorização da janela HML. Este commit não grava no Supabase nem na fila geral.

## Verificação local

`npm run test:hml-reservas` verifica autenticação da rota, recusa de protocolos/campos não fictícios, geração determinística e reentrega usando uma simulação de persistência. O teste não substitui a execução da migration contra um banco GDJVProject autorizado.
