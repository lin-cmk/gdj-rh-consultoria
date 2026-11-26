import { createHash, timingSafeEqual } from 'node:crypto'

export const HML_PROTOCOL = 'GDJ-HML-PERFIS-2026-001'
const SUPABASE_REST = 'https://ieuazfywianwzdfgzgtu.supabase.co/rest/v1/rpc/gdj_hml_reserve_profiles'
const MAX_PROFILES = 20

export function stableProfileId(protocol, position) {
  const hex = createHash('md5').update(`gdj-hml-profile:${protocol}:${position}`).digest('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function authorized(req, expected) {
  const header = req.headers?.authorization
  if (!expected || typeof header !== 'string' || !header.startsWith('Bearer ')) return false
  const supplied = Buffer.from(header.slice(7))
  const wanted = Buffer.from(expected)
  return supplied.length === wanted.length && timingSafeEqual(supplied, wanted)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const body = req.body
  if (!authorized(req, process.env.GDJ_HML_RESERVATION_TOKEN)) {
    return res.status(401).json({ ok: false })
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)
    || Object.keys(body).some(key => !['protocol', 'profile_count'].includes(key))
    || body.protocol !== HML_PROTOCOL
    || !Number.isInteger(body.profile_count)
    || body.profile_count < 1 || body.profile_count > MAX_PROFILES) {
    return res.status(400).json({ ok: false })
  }

  const secretKey = process.env.GDJ_HML_SUPABASE_SECRET_KEY
  if (!secretKey) return res.status(503).json({ ok: false })

  const profileIds = Array.from({ length: body.profile_count }, (_, index) =>
    stableProfileId(HML_PROTOCOL, index + 1))

  try {
    const response = await fetch(SUPABASE_REST, {
      method: 'POST',
      redirect: 'error',
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_protocol: HML_PROTOCOL,
        p_profile_count: body.profile_count,
        p_profile_ids: profileIds,
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return res.status(502).json({ ok: false })

    const rows = await response.json()
    if (!Array.isArray(rows) || rows.length !== body.profile_count
      || rows.some((row, index) => row?.protocol !== HML_PROTOCOL
        || row?.position !== index + 1
        || row?.role_key !== `HML-CARGO-${String(index + 1).padStart(2, '0')}`
        || row?.profile_id !== profileIds[index])) {
      return res.status(502).json({ ok: false })
    }

    return res.status(200).json({
      ok: true,
      protocol: HML_PROTOCOL,
      profiles: rows.map(({ position, role_key, profile_id }) => ({ position, role_key, profile_id })),
    })
  } catch {
    return res.status(502).json({ ok: false })
  }
}
