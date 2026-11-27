import { afterEach, describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import handler, { HML_PROTOCOL, stableProfileId } from '../api/hml-reservas.js'

const oldToken = process.env.GDJ_HML_RESERVATION_TOKEN
const oldSecret = process.env.GDJ_HML_SUPABASE_SECRET_KEY
const oldFetch = globalThis.fetch

afterEach(() => {
  if (oldToken === undefined) delete process.env.GDJ_HML_RESERVATION_TOKEN
  else process.env.GDJ_HML_RESERVATION_TOKEN = oldToken
  if (oldSecret === undefined) delete process.env.GDJ_HML_SUPABASE_SECRET_KEY
  else process.env.GDJ_HML_SUPABASE_SECRET_KEY = oldSecret
  globalThis.fetch = oldFetch
})

function invoke({ body, authorization = 'Bearer test-only-token' }) {
  const headers = {}
  const result = { statusCode: 200, payload: null }
  const res = {
    setHeader(name, value) { headers[name] = value },
    status(code) { result.statusCode = code; return this },
    json(payload) { result.payload = payload; return this },
  }
  return Promise.resolve(handler({ method: 'POST', headers: { authorization }, body }, res))
    .then(() => ({ ...result, headers }))
}

describe('reserva HML de perfis', () => {
  it('gera IDs distintos por posição e conserva os IDs ao reprocessar o mesmo protocolo', async () => {
    process.env.GDJ_HML_RESERVATION_TOKEN = 'test-only-token'
    process.env.GDJ_HML_SUPABASE_SECRET_KEY = 'test-only-secret'
    const persisted = new Map()
    const calls = []
    globalThis.fetch = async (_url, options) => {
      const payload = JSON.parse(options.body)
      calls.push(payload)
      const rows = payload.p_profile_ids.map((profile_id, index) => {
        const position = index + 1
        const key = `${payload.p_protocol}:${position}`
        if (!persisted.has(key)) persisted.set(key, profile_id)
        return {
          protocol: payload.p_protocol,
          position,
          role_key: `HML-CARGO-${String(position).padStart(2, '0')}`,
          profile_id: persisted.get(key),
        }
      })
      return new Response(JSON.stringify(rows), { status: 200 })
    }

    const first = await invoke({ body: { protocol: HML_PROTOCOL, profile_count: 2 } })
    const replay = await invoke({ body: { protocol: HML_PROTOCOL, profile_count: 2 } })

    assert.equal(first.statusCode, 200)
    assert.deepEqual(replay.payload, first.payload)
    assert.equal(calls.length, 2)
    assert.deepEqual(calls[0].p_profile_ids, calls[1].p_profile_ids)
    assert.equal(first.payload.profiles[0].profile_id, stableProfileId(HML_PROTOCOL, 1))
    assert.equal(first.payload.profiles[1].profile_id, stableProfileId(HML_PROTOCOL, 2))
    assert.notEqual(first.payload.profiles[0].profile_id, first.payload.profiles[1].profile_id)
    assert.equal(first.headers['Cache-Control'], 'no-store')
  })

  it('recusa protocolo diferente e payloads com campos de dados reais antes de chamar o banco', async () => {
    process.env.GDJ_HML_RESERVATION_TOKEN = 'test-only-token'
    process.env.GDJ_HML_SUPABASE_SECRET_KEY = 'test-only-secret'
    let calls = 0
    globalThis.fetch = async () => { calls += 1; throw new Error('não deveria chamar o banco') }

    const protocol = await invoke({ body: { protocol: 'REAL-CLIENTE-001', profile_count: 1 } })
    const pii = await invoke({ body: { protocol: HML_PROTOCOL, profile_count: 1, cnpj: 'dado-real' } })

    assert.equal(protocol.statusCode, 400)
    assert.equal(pii.statusCode, 400)
    assert.equal(calls, 0)
  })

  it('exige autenticação própria da reserva antes de acessar o Supabase', async () => {
    process.env.GDJ_HML_RESERVATION_TOKEN = 'test-only-token'
    process.env.GDJ_HML_SUPABASE_SECRET_KEY = 'test-only-secret'
    let calls = 0
    globalThis.fetch = async () => { calls += 1; throw new Error('não deveria chamar o banco') }

    const result = await invoke({ body: { protocol: HML_PROTOCOL, profile_count: 1 }, authorization: 'Bearer errado' })

    assert.equal(result.statusCode, 401)
    assert.equal(calls, 0)
  })

  it('não expõe a chave nem o erro bruto se o banco falhar', async () => {
    process.env.GDJ_HML_RESERVATION_TOKEN = 'test-only-token'
    process.env.GDJ_HML_SUPABASE_SECRET_KEY = 'test-only-secret'
    globalThis.fetch = async () => new Response('{"message":"test-only-secret"}', { status: 403 })

    const result = await invoke({ body: { protocol: HML_PROTOCOL, profile_count: 1 } })

    assert.equal(result.statusCode, 502)
    assert.deepEqual(result.payload, { ok: false })
    assert.equal(JSON.stringify(result.payload).includes('test-only-secret'), false)
  })

  it('mantém a reserva isolada da fila geral e usa conflito idempotente por protocolo e posição', async () => {
    const sql = await readFile(new URL('../supabase/migrations/20261127120000_gdj_hml_profile_reservation.sql', import.meta.url), 'utf8')

    assert.match(sql, /create table public\.gdj_hml_profile_reservations/)
    assert.match(sql, /primary key \(protocol, position\)/)
    assert.match(sql, /on conflict \(protocol, position\) do nothing/i)
    assert.match(sql, /md5\('gdj-hml-profile:' \|\| p_protocol \|\| ':' \|\| i::text\)::uuid/i)
    assert.doesNotMatch(sql, /proxima_ficha|next_eligible|fila_geral/i)
  })
})
