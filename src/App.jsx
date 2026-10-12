import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Servicos from './pages/Servicos.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import LandingNR1 from './pages/LandingNR1.jsx'
import Contato from './pages/Contato.jsx'

/* ============================================================
 * CHAT DA SANDRA (atendimento + captação) — n8n /webhook/site-chat
 * ============================================================ */
const CHAT_URL = 'https://n8noficial.salesguardian.com.br/webhook/site-chat'
const STORE_KEY = 'gdj_sandra_chat_v1'

const ler = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null') } catch { return null } }
const salvar = (v) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(v)) } catch { /* sem storage */ } }
const novaSessao = () => 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

function textoComLinks(t) {
  const partes = String(t).split(/(https?:\/\/[^\s]+)/g)
  return partes.map((p, i) => (/^https?:\/\//.test(p)
    ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="underline font-semibold break-all">{p}</a>
    : <span key={i}>{p.replace(/\*([^*]+)\*/g, '$1')}</span>))
}

function SandraChat() {
  const salvo = ler()
  const [aberto, setAberto] = useState(false)
  const [dados, setDados] = useState(salvo?.dados || null)
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', perfil: 'empresa', empresa: '' })
  const [msgs, setMsgs] = useState(salvo?.msgs || [])
  const [conv, setConv] = useState(salvo?.conv || '')
  const [sessao] = useState(salvo?.sessao || novaSessao())
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroForm, setErroForm] = useState('')
  const fimRef = useRef(null)

  useEffect(() => { salvar({ dados, msgs: msgs.slice(-40), conv, sessao }) }, [dados, msgs, conv, sessao])
  useEffect(() => { fimRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, aberto, enviando])

  async function enviar(mensagem, d = dados, c = conv) {
    if (!mensagem.trim() || enviando) return
    setMsgs((m) => [...m, { de: 'eu', t: mensagem }])
    setTexto('')
    setEnviando(true)
    try {
      const r = await fetch(CHAT_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessao, conversation_id: c, mensagem, pagina: window.location.pathname, ...d }),
      })
      const j = await r.json()
      if (j.conversation_id) setConv(j.conversation_id)
      setMsgs((m) => [...m, { de: 'sandra', t: j.resposta || 'Desculpe, não consegui responder agora.' }])
    } catch {
      setMsgs((m) => [...m, { de: 'sandra', t: 'Ops, tive um problema de conexão. Você também pode falar com a gente no WhatsApp: https://wa.me/5511966810215' }])
    } finally { setEnviando(false) }
  }

  function iniciar(e) {
    e.preventDefault()
    const tel = form.telefone.replace(/\D/g, '')
    if (!form.nome.trim()) return setErroForm('Informe seu nome.')
    if (tel.length < 10 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return setErroForm('Informe seu WhatsApp (com DDD) ou e-mail.')
    setErroForm('')
    const d = { ...form, telefone: tel }
    setDados(d)
    const primeira = form.perfil === 'candidato' ? 'Olá! Estou procurando uma oportunidade de trabalho.' : 'Olá! Represento uma empresa e quero conhecer as soluções de RH da GDJ.'
    enviar(primeira, d, '')
  }

  function reiniciar() { setDados(null); setMsgs([]); setConv(''); salvar(null) }

  const campo = 'w-full rounded-lg border border-[#E6DFCE] bg-white px-3 py-2 text-sm text-[#1A2E1A] outline-none focus:border-[#C9A24B]'

  return (
    <>
      <button onClick={() => setAberto((a) => !a)} aria-label="Conversar com a Sandra"
        className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-full bg-[#1A2E1A] pl-2 pr-4 py-2 text-[#F5F1E8] shadow-2xl ring-2 ring-[#C9A24B] hover:scale-105 transition-all duration-300">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A24B] text-[#1A2E1A] font-bold">S</span>
        <span className="text-sm font-semibold hidden sm:inline">{aberto ? 'Fechar' : 'Fale com a Sandra'}</span>
      </button>

      {aberto && (
        <div className="fixed bottom-40 right-4 left-4 sm:left-auto sm:right-6 z-50 flex max-h-[70vh] sm:w-[370px] flex-col overflow-hidden rounded-2xl border border-[#E6DFCE] bg-[#F5F1E8] shadow-2xl">
          <div className="flex items-center gap-3 bg-[#1A2E1A] px-4 py-3 text-[#F5F1E8]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A24B] text-[#1A2E1A] font-bold">S</span>
            <div className="flex-1">
              <div className="text-sm font-bold">Sandra · GDJ Vertex</div>
              <div className="text-xs text-[#E8CC8A]">Recrutamento, seleção e DP · online</div>
            </div>
            {dados && <button onClick={reiniciar} className="text-xs text-[#E8CC8A] underline">reiniciar</button>}
            <button onClick={() => setAberto(false)} aria-label="Fechar" className="ml-1 text-lg leading-none">×</button>
          </div>
          <div className="h-1 bg-[#C9A24B]" />

          {!dados ? (
            <form onSubmit={iniciar} className="space-y-2 overflow-y-auto p-4">
              <p className="text-sm text-[#33402F]">Olá! Eu sou a <b>Sandra</b>, da GDJ Vertex 😊 Para te atender melhor, me conte quem é você:</p>
              <div className="flex gap-2">
                {[['empresa', 'Sou empresa'], ['candidato', 'Sou candidato(a)']].map(([v, l]) => (
                  <button type="button" key={v} onClick={() => setForm({ ...form, perfil: v })}
                    className={'flex-1 rounded-lg border px-2 py-2 text-xs font-semibold ' + (form.perfil === v ? 'border-[#C9A24B] bg-[#1A2E1A] text-[#F5F1E8]' : 'border-[#E6DFCE] bg-white text-[#1A2E1A]')}>{l}</button>
                ))}
              </div>
              <input className={campo} placeholder="Seu nome *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              {form.perfil === 'empresa' && <input className={campo} placeholder="Empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />}
              <input className={campo} placeholder="WhatsApp com DDD *" inputMode="tel" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              <input className={campo} placeholder="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {erroForm && <p className="text-xs text-[#C0392B]">{erroForm}</p>}
              <button type="submit" className="w-full rounded-lg bg-[#C9A24B] py-2.5 text-sm font-bold text-[#1A2E1A] hover:brightness-105">Iniciar conversa</button>
              <p className="text-[10px] leading-snug text-[#7F8C7F]">Ao continuar, você concorda que a GDJ Vertex use seus dados para retornar o contato, conforme a LGPD.</p>
            </form>
          ) : (
            <>
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {msgs.map((m, i) => (
                  <div key={i} className={'flex ' + (m.de === 'eu' ? 'justify-end' : 'justify-start')}>
                    <div className={'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ' + (m.de === 'eu' ? 'rounded-br-sm bg-[#1A2E1A] text-[#F5F1E8]' : 'rounded-bl-sm bg-white text-[#1F2A1F] border border-[#E6DFCE]')}>
                      {textoComLinks(m.t)}
                    </div>
                  </div>
                ))}
                {enviando && <div className="text-xs italic text-[#8A7A52]">Sandra está digitando…</div>}
                <div ref={fimRef} />
              </div>
              <form onSubmit={(e) => { e.preventDefault(); enviar(texto) }} className="flex gap-2 border-t border-[#E6DFCE] bg-white p-2">
                <input className={campo} placeholder="Digite sua mensagem…" value={texto} onChange={(e) => setTexto(e.target.value)} disabled={enviando} />
                <button type="submit" disabled={enviando || !texto.trim()} className="rounded-lg bg-[#C9A24B] px-4 text-sm font-bold text-[#1A2E1A] disabled:opacity-50">Enviar</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/nr1" element={<LandingNR1 />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <SandraChat />
    </>
  )
}

export default App
