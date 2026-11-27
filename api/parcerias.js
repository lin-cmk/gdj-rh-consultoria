import { randomUUID } from 'node:crypto'
import { partnerFields, demandFields, maxJobProfiles, proposalConsent } from '../src/partnerFields.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const body = req.body
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.website_confirmation) {
    return res.status(400).json({ ok: false })
  }

  if (body.proposalConsent !== 'on' || !Array.isArray(body.jobs) || body.jobs.length < 1
    || body.jobs.length > maxJobProfiles || body.jobs.some(job => !job || typeof job !== 'object' || Array.isArray(job))) {
    return res.status(400).json({ ok: false })
  }

  if (body.submissionId !== undefined && (typeof body.submissionId !== 'string'
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId))) {
    return res.status(400).json({ ok: false })
  }

  const partner = {}
  const profiles = body.jobs.map(() => ({}))
  const groups = partnerFields.flatMap(group => group.fields === demandFields
    ? body.jobs.map((values, index) => ({ ...group, title: `Perfil de vaga ${index + 1}`, values, normalized: profiles[index] }))
    : [{ ...group, values: body, normalized: partner }])

  if (body.differentSigner === 'on') {
    groups.splice(2, 0, { title: 'Signatário da proposta', values: body, normalized: partner, fields: [
      { key: 'signerName', label: 'Nome', required: true },
      { key: 'signerEmail', label: 'E-mail', required: true, type: 'email' },
    ] })
  }

  const sections = []
  for (const { title, fields, values, normalized } of groups) {
    const lines = [title]
    for (const { key, label, required, type, options } of fields) {
      const raw = values[key] ?? ''
      if (typeof raw !== 'string') return res.status(400).json({ ok: false })
      const value = raw.trim()
      if ((required && !value) || value.length > (label === 'Observações' ? 1000 : 500)
        || (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        || (value && type === 'number' && (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))))
        || (value && options && !options.includes(value))) {
        return res.status(400).json({ ok: false })
      }
      normalized[key] = value
      lines.push(label + ': ' + (value || 'Não informado'))
    }
    sections.push(lines.join('\n'))
  }
  sections.push('Confirmação registrada: ' + proposalConsent)

  const submissionId = body.submissionId?.toLowerCase() ?? randomUUID()
  const supabaseUrl = process.env.GDJ_INTAKE_SUPABASE_URL
  const serviceKey = process.env.GDJ_INTAKE_SUPABASE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(503).json({ ok: false })

  try {
    const response = await fetch(new URL('/rest/v1/rpc/gdj_registrar_ficha', supabaseUrl), {
      method: 'POST',
      redirect: 'error',
      headers: { 'Content-Type': 'application/json', apikey: serviceKey, Authorization: 'Bearer ' + serviceKey },
      body: JSON.stringify({ p_id: submissionId, p_empresa: partner, p_perfis: profiles, p_texto_email: sections.join('\n\n') }),
      signal: AbortSignal.timeout(10000),
    })
    if (response.status === 409) return res.status(409).json({ ok: false })
    if (!response.ok || (await response.json()) !== submissionId) {
      return res.status(502).json({ ok: false })
    }
    return res.status(200).json({ ok: true, submissionId })
  } catch {
    return res.status(502).json({ ok: false })
  }
}
