import { partnerFields } from '../src/partnerFields.js'

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

  const sections = []
  for (const { title, fields } of partnerFields) {
    const lines = [title]
    for (const { key, label, required, type } of fields) {
      const raw = body[key] ?? ''
      if (typeof raw !== 'string') return res.status(400).json({ ok: false })
      const value = raw.trim()
      if ((required && !value) || value.length > (label === 'Observações' ? 1000 : 500)
        || (value && type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        || (value && type === 'number' && !/^[1-9]\d*$/.test(value))) {
        return res.status(400).json({ ok: false })
      }
      lines.push(label + ': ' + (value || 'Não informado'))
    }
    sections.push(lines.join('\n'))
  }

  const webhook = process.env.GDJ_PARTNER_WEBHOOK_URL
  const token = process.env.GDJ_PARTNER_WEBHOOK_TOKEN
  if (!webhook || !token) return res.status(503).json({ ok: false })

  try {
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
