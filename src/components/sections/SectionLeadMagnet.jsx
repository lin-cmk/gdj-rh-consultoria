import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FaDownload, FaShieldAlt, FaCheckCircle, FaStar, FaSpinner } from 'react-icons/fa';

const EBOOKS = {
  nr1: { 
    nome: 'Manual NR1', 
    arquivo: '/docs/manual-nr1.pdf',
    badge: '⚠️ Urgente'
  },
  terceirizacao: { 
    nome: 'Guia de Terceirização', 
    arquivo: '/docs/guia-terceirizacao.pdf',
    badge: '🚀 Estratégia'
  },
};

export default function SectionLeadMagnet() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    qtd_funcionarios: '',
    cargos_funcoes: '',
    ebook: 'nr1',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.nome || !form.email) {
        throw new Error('Preencha nome e e-mail');
      }

      // Inserir na tabela leads
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert([
          {
            nome: form.nome,
            email: form.email,
            whatsapp: form.whatsapp,
            empresa: form.empresa,
            interesse: form.ebook === 'nr1' ? 'NR1' : 'TERCEIRIZACAO',
            origem: 'site_lead_magnet',
          },
        ])
        .select()
        .single();

      if (leadError) throw leadError;

      // Inserir na tabela lead_qualificacao (se houver dados)
      if (form.qtd_funcionarios || form.cargos_funcoes) {
        const { error: qualError } = await supabase
          .from('lead_qualificacao')
          .insert([
            {
              lead_id: leadData.id,
              qtd_funcionarios: form.qtd_funcionarios ? parseInt(form.qtd_funcionarios) : null,
              observacoes: form.cargos_funcoes || null,
            },
          ]);

        if (qualError) console.warn('Erro ao salvar qualificação:', qualError);
      }

      setSuccess(true);
      
      // Abrir o PDF
      const pdfUrl = EBOOKS[form.ebook]?.arquivo;
      if (pdfUrl) window.open(pdfUrl, '_blank');

      // Resetar após 5 segundos
      setTimeout(() => {
        setSuccess(false);
        setForm({
          nome: '',
          email: '',
          whatsapp: '',
          empresa: '',
          qtd_funcionarios: '',
          cargos_funcoes: '',
          ebook: 'nr1',
        });
      }, 5000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checklistItems = [
    'Manual completo e atualizado',
    'Explicação passo a passo',
    'Checklist de conformidade',
    'Exemplos práticos',
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fundo com imagem */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/introducao.png"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-verde-profundo/95 via-verde-profundo/90 to-verde-profundo/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo — Texto + Checklist */}
          <div className="text-branco-gelo space-y-6">
            <span className="inline-block bg-dourado-metalico/20 text-dourado-metalico font-bold text-sm px-4 py-1.5 rounded-full border border-dourado-metalico/30">
              🎯 Material Exclusivo
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Baixe seu ebook <br />
              <span className="text-dourado-metalico">gratuito agora!</span>
            </h2>
            
            <p className="text-lg text-branco-gelo/80 leading-relaxed">
              Escolha o material que mais se alinha com a necessidade da sua empresa 
              e receba imediatamente no seu e-mail.
            </p>

            {/* Checklist */}
            <div className="bg-branco-gelo/10 backdrop-blur-sm rounded-2xl p-6 border border-branco-gelo/10">
              <div className="grid grid-cols-2 gap-3">
                {checklistItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-branco-gelo/90">
                    <FaCheckCircle className="text-dourado-metalico flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selo de garantia */}
            <div className="flex items-center gap-4 bg-dourado-metalico/10 rounded-xl p-4 border border-dourado-metalico/20">
              <div className="w-12 h-12 rounded-full bg-dourado-metalico/20 flex items-center justify-center flex-shrink-0">
                <FaStar className="text-dourado-metalico text-xl" />
              </div>
              <div>
                <p className="font-bold text-branco-gelo">100% Gratuito</p>
                <p className="text-sm text-branco-gelo/70">Sem compromisso. Baixe agora.</p>
              </div>
            </div>
          </div>

          {/* Lado Direito — Formulário */}
          <div className="bg-branco-gelo rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-verde-profundo">
                Receba seu ebook agora
              </h3>
              <p className="text-verde-profundo/60 text-sm">
                Preencha os dados e faça o download imediato
              </p>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-verde-musgo/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-verde-musgo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-verde-profundo">Ebook enviado! 🎉</h4>
                <p className="text-verde-profundo/60 mt-2">O download já deve ter iniciado.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                {/* Quantos funcionários */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    Quantos funcionários?
                  </label>
                  <select
                    name="qtd_funcionarios"
                    value={form.qtd_funcionarios}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50 appearance-none"
                  >
                    <option value="">Selecione uma faixa</option>
                    <option value="1">Até 10</option>
                    <option value="2">11 a 50</option>
                    <option value="3">51 a 100</option>
                    <option value="4">101 a 500</option>
                    <option value="5">Mais de 500</option>
                  </select>
                </div>

                {/* Cargos e funções */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-1">
                    Cargos e funções que precisa contratar
                  </label>
                  <textarea
                    name="cargos_funcoes"
                    value={form.cargos_funcoes}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-verde-musgo/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-dourado-metalico bg-branco-gelo/50 resize-none"
                    placeholder="Ex: Desenvolvedor React, Analista de RH..."
                  />
                </div>

                {/* Escolha do ebook */}
                <div>
                  <label className="block text-sm font-semibold text-verde-profundo mb-2">
                    Escolha seu ebook *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, ebook: 'nr1' })}
                      className={`p-3 rounded-xl border-2 transition text-sm font-semibold ${
                        form.ebook === 'nr1'
                          ? 'border-vermelho-destaque bg-vermelho-destaque/10 text-vermelho-destaque'
                          : 'border-verde-musgo/20 hover:border-verde-musgo/40'
                      }`}
                    >
                      📄 Manual NR1
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, ebook: 'terceirizacao' })}
                      className={`p-3 rounded-xl border-2 transition text-sm font-semibold ${
                        form.ebook === 'terceirizacao'
                          ? 'border-dourado-metalico bg-dourado-metalico/10 text-dourado-metalico'
                          : 'border-verde-musgo/20 hover:border-verde-musgo/40'
                      }`}
                    >
                      📘 Guia Terceirização
                    </button>
                  </div>
                </div>

                {/* Botão submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dourado-metalico text-verde-profundo py-4 rounded-xl font-bold text-lg hover:bg-dourado-claro transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <><FaDownload /> Baixar Ebook Gratuito</>
                  )}
                </button>

                {error && (
                  <div className="text-vermelho-destaque text-sm text-center bg-vermelho-destaque/10 p-3 rounded-xl">
                    ⚠️ {error}
                  </div>
                )}

                <p className="text-xs text-verde-profundo/40 text-center flex items-center justify-center gap-1">
                  <FaShieldAlt /> Seus dados estão seguros
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
