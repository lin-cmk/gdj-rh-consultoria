import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppFloat from '../components/ui/WhatsAppFloat';
import SectionLeadMagnet from '../components/sections/SectionLeadMagnet';
import SectionPartners from '../components/sections/SectionPartners';
import SectionFaq from '../components/sections/SectionFaq';
import { FaWhatsapp, FaDownload, FaCheckCircle } from 'react-icons/fa';

export default function Estrategia() {
  const scrollToForm = () => {
    document.getElementById('form-captura').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-branco-gelo">
      <Header />

      {/* ===== BLOCO 1 — NR1 ===== */}
      <section className="py-20 bg-branco-gelo" id="nr1">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="/images/introducao.png"
              alt="NR1 - Nova legislação"
              className="rounded-2xl shadow-xl w-full hover:scale-[1.02] transition-transform"
            />
          </div>
          <div className="md:w-1/2">
            <span className="inline-block bg-vermelho-destaque/10 text-vermelho-destaque font-semibold text-sm px-4 py-1.5 rounded-full mb-4 border border-vermelho-destaque/20">
              ⚠️ Urgente — Nova legislação
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-verde-profundo mb-4">
              A Nova NR1 já está em vigor. Sua empresa está exposta a multas?
            </h2>
            <p className="text-lg text-verde-profundo/80 leading-relaxed mb-6">
              A atualização da Norma Regulamentadora 1 trouxe exigências que muitas empresas
              ainda não conhecem — e o desconhecimento pode custar caro: autuações,
              passivos trabalhistas e riscos à saúde mental dos colaboradores.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-vermelho-destaque" />
                <span>Manual completo e atualizado</span>
              </div>
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-vermelho-destaque" />
                <span>Checklist de conformidade</span>
              </div>
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-vermelho-destaque" />
                <span>Explicação passo a passo</span>
              </div>
            </div>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-vermelho-destaque text-branco-gelo px-8 py-4 rounded-xl font-semibold hover:bg-vermelho-suave transition shadow-lg hover:shadow-xl"
            >
              <FaDownload /> Baixar Manual Grátis da NR1
            </button>
          </div>
        </div>
      </section>

      {/* ===== BLOCO 2 — Terceirização ===== */}
      <section className="py-20 bg-off-white" id="terceirizacao">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="/images/servicos-1.jpeg"
              alt="Terceirização RH"
              className="rounded-2xl shadow-xl w-full hover:scale-[1.02] transition-transform"
            />
          </div>
          <div className="md:w-1/2">
            <span className="inline-block bg-dourado-metalico/10 text-dourado-metalico font-semibold text-sm px-4 py-1.5 rounded-full mb-4 border border-dourado-metalico/20">
              🚀 Estratégia inteligente
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-verde-profundo mb-4">
              Terceirizar o RH não é abrir mão do controle — é ganhar eficiência.
            </h2>
            <p className="text-lg text-verde-profundo/80 leading-relaxed mb-6">
              Sua empresa tem RH interno mas sente que os processos ainda travam?
              Ou ainda não tem uma estrutura de RH e DP e sente o peso disso no dia a dia?
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-dourado-metalico" />
                <span>Redução de custos operacionais</span>
              </div>
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-dourado-metalico" />
                <span>Especialistas dedicados</span>
              </div>
              <div className="flex items-center gap-2 text-verde-profundo/70">
                <FaCheckCircle className="text-dourado-metalico" />
                <span>Foco no core business</span>
              </div>
            </div>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-dourado-metalico text-verde-profundo px-8 py-4 rounded-xl font-semibold hover:bg-dourado-claro transition shadow-lg hover:shadow-xl"
            >
              <FaWhatsapp /> Agendar Diagnóstico Gratuito
            </button>
          </div>
        </div>
      </section>

      {/* ===== BLOCO 3 — LEAD MAGNET ===== */}
      <SectionLeadMagnet />
      <SectionPartners />
      <SectionFaq />

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
