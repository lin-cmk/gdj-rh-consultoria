import { useRef, useState } from 'react'
import { partnerFields, demandFields, maxJobProfiles, proposalConsent } from '../partnerFields.js'

const inputStyle = 'mt-2 w-full rounded-xl border border-[#bdb7a8] bg-white px-4 py-3 focus:border-[#315839] focus:outline focus:outline-2 focus:outline-[#315839]'

function Fields({ fields, prefix = '' }) {
  return <div className="grid gap-5 sm:grid-cols-2">
    {fields.map(({ key, label, type, options, required }) => (
      <label key={key} className="block text-sm font-medium">
        {label}{required && ' *'}
        {options ? (
          <select name={prefix + key} className={inputStyle} defaultValue="">
            <option value="">Selecione</option>
            {options.map(option => <option key={option}>{option}</option>)}
          </select>
        ) : label === 'Observações' ? (
          <textarea name={prefix + key} maxLength={1000} rows={3} className={inputStyle} />
        ) : (
          <input name={prefix + key} type={type} required={required} maxLength={500}
            min={type === 'number' ? 1 : undefined} className={inputStyle} />
        )}
      </label>
    ))}
  </div>
}

export default function Parcerias() {
  const [status, setStatus] = useState('idle')
  const pending = useRef(false)
  const [profiles, setProfiles] = useState([0])
  const nextProfile = useRef(1)
  const [differentSigner, setDifferentSigner] = useState(false)

  async function submit(event) {
    event.preventDefault()
    if (pending.current) return
    pending.current = true
    const values = Object.fromEntries(new FormData(event.currentTarget))
    values.jobs = profiles.map(id => Object.fromEntries(demandFields.map(({ key }) => {
      const fieldName = `job-${id}-${key}`
      const value = values[fieldName]
      delete values[fieldName]
      return [key, value]
    })))
    setStatus('sending')
    try {
      const response = await fetch('/api/parcerias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok || !(await response.json()).ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      pending.current = false
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#1a2e1a]">
      <header className="bg-[#162c22] px-6 py-12 text-[#fff9eb] sm:py-16">
        <div className="mx-auto max-w-4xl">
          <a href="/" aria-label="Página inicial da GDJ Vertex">
            <img src="/images/design-1.png" alt="GDJ Vertex" className="h-20 w-auto rounded-xl bg-[#fff9eb] p-2" />
          </a>
          <h1 className="mt-7 text-4xl font-bold sm:text-5xl">Ficha cadastral e proposta de parceria</h1>
          <p className="mt-4 max-w-xl text-[#eee4ce]">Cadastre sua consultoria para que a equipe da GDJ Vertex possa analisar os dados e dar continuidade à parceria.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[#f8d78c]">
            <a className="underline" href="mailto:gisele@gdjvertex.com.br">gisele@gdjvertex.com.br</a>
            <a className="underline" href="https://wa.me/5511966810215">WhatsApp (11) 96681-0215</a>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-10">
        {status === 'sent' ? (
          <section className="rounded-2xl bg-white p-8" role="status">
            <h2 className="text-2xl font-bold">Cadastro enviado</h2>
            <p className="mt-2">A equipe da GDJ Vertex recebeu a ficha para analisar os perfis e preparar a proposta de parceria.</p>
          </section>
        ) : (
          <form className="space-y-7" onSubmit={submit}>
            <p className="text-sm">Os campos com * são obrigatórios.</p>
            {partnerFields.map(({ title, fields }) => (
              <section key={title} aria-labelledby={fields[0].key + '-title'} className="rounded-2xl border border-[#dfd5bd] bg-[#fffcf5] p-5 sm:p-8">
                <h2 id={fields[0].key + '-title'} className="mb-5 text-2xl font-semibold">{title}</h2>
                {fields === demandFields ? (
                  <>
                    <p className="mb-4 text-sm">Inclua um perfil por cargo nesta demanda inicial. Para vagas novas após o envio, solicite à GDJ a ficha de inclusão de vagas.</p>
                    {profiles.map((id, index) => (
                      <fieldset key={id} className="mb-5 rounded-xl border border-[#dfd5bd] p-4">
                        <legend className="px-2 font-semibold">Perfil de vaga {index + 1}</legend>
                        <Fields fields={fields} prefix={`job-${id}-`} />
                        {index > 0 && <button type="button" className="mt-4 underline" onClick={() => setProfiles(current => current.filter(profile => profile !== id))}>Remover perfil {index + 1}</button>}
                      </fieldset>
                    ))}
                    <button type="button" className="rounded-lg border px-4 py-2 font-semibold disabled:opacity-50" disabled={profiles.length >= maxJobProfiles}
                      onClick={() => { const id = nextProfile.current++; setProfiles(current => [...current, id]) }}>Adicionar outro perfil de vaga</button>
                  </>
                ) : <Fields fields={fields} />}
                {fields[0].key === 'campo_9' && (
                  <div className="mt-5">
                    <label><input type="checkbox" name="differentSigner" checked={differentSigner} onChange={event => setDifferentSigner(event.target.checked)} /> Outra pessoa assinará a proposta</label>
                    {differentSigner && <div className="mt-4"><Fields fields={[
                      { key: 'signerName', label: 'Nome de quem vai assinar', required: true },
                      { key: 'signerEmail', label: 'E-mail de quem vai assinar', type: 'email', required: true },
                    ]} /></div>}
                  </div>
                )}
                {fields[0].key === 'campo_13' && <p className="mt-4 text-sm">Informe as condições já discutidas. Pontos em aberto podem ser detalhados nas observações.</p>}
              </section>
            ))}
            <div hidden><input name="website_confirmation" tabIndex={-1} autoComplete="off" /></div>
            <label className="block text-sm"><input type="checkbox" name="proposalConsent" required /> {proposalConsent}</label>
            {status === 'error' && <p role="alert" className="font-medium text-red-800">Não foi possível confirmar o envio. Seus dados continuam no formulário. Se o erro persistir, fale com a GDJ pelo WhatsApp.</p>}
            <button type="submit" disabled={status === 'sending'} className="rounded-xl bg-[#162c22] px-7 py-3 font-bold text-[#fff9eb] disabled:opacity-60">
              {status === 'sending' ? 'Enviando…' : 'Enviar para preparar proposta'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
