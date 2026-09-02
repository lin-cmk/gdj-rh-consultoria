import { useState } from 'react'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import WhatsAppFloat from '../components/ui/WhatsAppFloat.jsx'
import { supabase } from '../lib/supabaseClient.js'

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  interesse: 'NR1',
}

export default function LandingNR1() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSelectInteresse(valor) {
    setForm((prev) => ({ ...prev, interesse: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const { error } = await supabase.from('leads').insert([
      {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        empresa: form.empresa,
        interesse: form.interesse,
        origem: 'landing_nr1',
        status: 'novo',
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMsg('Não foi possível enviar. Tente novamente em instantes.')
      return
    }

    setStatus('success')

    const pdfMap = {
      NR1: '/docs/manual-nr1.pdf',
      TERCEIRIZACAO: '/docs/guia-terceirizacao.pdf',
      AMBOS: '/docs/manual-nr1.pdf',
    }
    window.open(pdfMap[form.interesse] || pdfMap.NR1, '_blank')

    setForm(initialForm)
  }

  return (
    <div className="min-h-screen bg-off-white">
      <Header />

      <section className="pt-32 pb-16 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-verde-profundo leading-tight">
          NR1 e Terceirização de RH: proteja sua empresa e reduza custos
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Baixe nosso material gratuito e entenda como adequar sua empresa à NR1
          e como a terceirização de RH pode reduzir riscos e custos operacionais.
        </p>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-6 mb-16">
        <button
          type="button"
          onClick={() => handleSelectInteresse('NR1')}
          className={`text-left p-6 rounded-2xl border-2 transition ${
            form.interesse === 'NR1'
              ? 'border-verde-profundo bg-verde-profundo/5'
              : 'border-gray-200 hover:border-verde-profundo/50'
          }`}
        >
          <h3 className="text-xl font-bold text-verde-profundo mb-2">
            Quero saber sobre NR1
          </h3>
          <p className="text-gray-600 text-sm">
            Riscos psicossociais, obrigatoriedade legal e como se adequar sem
            complicação.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelectInteresse('TERCEIRIZACAO')}
          className={`text-left p-6 rounded-2xl border-2 transition ${
            form.interesse === 'TERCEIRIZACAO'
              ? 'border-verde-profundo bg-verde-profundo/5'
              : 'border-gray-200 hover:border-verde-profundo/50'
          }`}
        >
          <h3 className="text-xl font-bold text-verde-profundo mb-2">
            Quero terceirizar meu RH
          </h3>
          <p className="text-gray-600 text-sm">
            Reduza custos com folha, encargos e departamento pessoal com
            segurança jurídica.
          </p>
        </button>
      </section>

      <section className="max-w-md mx-auto px-6 pb-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-4"
        >
          <h2 className="text-xl font-bold text-verde-profundo mb-2">
            Baixe o material gratuito
          </h2>

          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            required
            value={form.nome}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-verde-profundo"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-verde-profundo"
          />
          <input
            type="tel"
            name="telefone"
            placeholder="WhatsApp"
            value={form.telefone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-verde-profundo"
          />
          <input
            type="text"
            name="empresa"
            placeholder="Empresa (opcional)"
            value={form.empresa}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-verde-profundo"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-verde-profundo text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Baixar material gratuito'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-sm text-center">
              ✅ Enviado com sucesso! Seu material foi aberto em nova aba.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}
        </form>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
