import { sign } from 'node:crypto'
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

  const groups = partnerFields.flatMap(group => group.fields === demandFields
    ? body.jobs.map((values, index) => ({ ...group, title: `Perfil de vaga ${index + 1}`, values }))
    : [{ ...group, values: body }])

  if (body.differentSigner === 'on') {
    groups.splice(2, 0, { title: 'Signatário da proposta', values: body, fields: [
      { key: 'signerName', label: 'Nome', required: true },
      { key: 'signerEmail', label: 'E-mail', required: true, type: 'email' },
    ] })
  }

  const sections = []
  for (const { title, fields, values } of groups) {
    const lines = [title]
    for (const { key, label, required, type, options } of fields) {
      const raw = values[key] ?? ''
      if (typeof raw !== 'string') return res.status(400).json({ ok: false })
      const value = raw.trim()
      if ((required && !value) || value.length > (label === 'Observações' ? 1000 : 500)
        || (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        || (value && type === 'number' && !/^[1-9]\d*$/.test(value))
        || (value && options && !options.includes(value))) {
        return res.status(400).json({ ok: false })
      }
      lines.push(label + ': ' + (value || 'Não informado'))
    }
    sections.push(lines.join('\n'))
  }
  sections.push('Confirmação registrada: ' + proposalConsent)

  const webhook = process.env.GDJ_PARTNER_WEBHOOK_URL
  const privateKey = process.env.GDJ_PARTNER_WEBHOOK_PRIVATE_KEY
  if (!webhook || !privateKey) return res.status(503).json({ ok: false })

  try {
    const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
    const now = Math.floor(Date.now() / 1000)
    const claims = encode({ alg: 'RS256', typ: 'JWT' }) + '.' + encode({ iat: now, exp: now + 60 })
    const signature = sign('RSA-SHA256', Buffer.from(claims), privateKey).toString('base64url')
    const token = claims + '.' + signature
    const response = await fetch(webhook, {
      method: 'POST',
      redirect: 'error',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ text: sections.join('\n\n') }),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok || (await response.json()).ok !== true) {
      return res.status(502).json({ ok: false })
    }
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ ok: false })
  }
}
