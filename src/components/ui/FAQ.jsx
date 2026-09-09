import React, { useState } from "react";
import { motion } from "framer-motion";

const faqItems = [
  {
    title: "O que é a NR1 e por que minha empresa precisa se adequar?",
    content:
      "A NR1 é a Norma Regulamentadora que estabelece diretrizes para a gestão de riscos ocupacionais, incluindo riscos psicossociais. A partir de 2025, as empresas precisam mapear e mitigar esses riscos, com fiscalização ativa. A GDJ ajuda sua empresa a se adequar de ponta a ponta, evitando multas e passivos trabalhistas.",
  },
  {
    title: "Como funciona a terceirização de RH com a GDJ?",
    content:
      "Assumimos total ou parcialmente a gestão do seu Departamento Pessoal (folha, admissões, rescisões, eSocial) e Recrutamento & Seleção, com equipe especializada, reduzindo custos fixos e riscos de compliance trabalhista.",
  },
  {
    title: "Quanto tempo leva para implementar o serviço?",
    content:
      "O onboarding completo leva em média de 15 a 30 dias, dependendo do porte da empresa. Fazemos um diagnóstico inicial gratuito para mapear prioridades e implementar rapidamente.",
  },
  {
    title: "Vocês atendem empresas de qualquer porte?",
    content:
      "Sim! Atendemos desde pequenas empresas até médias e grandes corporações, com planos personalizados de acordo com o número de colaboradores e complexidade da operação.",
  },
  {
    title: "Como funciona o processo de Recrutamento & Seleção?",
    content:
      "Utilizamos metodologia própria com triagem por competências, entrevistas estruturadas e testes comportamentais, entregando candidatos qualificados e alinhados à cultura da sua empresa, com garantia de substituição em caso de desligamento no período inicial.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative overflow-hidden py-24 bg-off-white lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between lg:flex-nowrap">
          <div className="lg:w-[50%] lg:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-verde-profundo mb-4">
                Perguntas Frequentes
              </h2>
              <p className="mb-8 text-lg text-verde-musgo">
                Tire suas dúvidas sobre NR1, Departamento Pessoal,
                Terceirização de RH e Recrutamento & Seleção.
              </p>

              <div className="w-full space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-dourado-claro rounded-lg overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-verde-profundo hover:bg-branco-gelo transition-colors"
                    >
                      <span>{item.title}</span>
                      <span
                        className={`transform transition-transform text-dourado-metalico ${
                          openIndex === index ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="px-5 pb-4 text-verde-musgo">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <span className="mt-10 inline-block text-lg text-verde-profundo">
                Ainda com dúvidas?{" "}
                <a
                  href="mailto:contato@gdjrh.com.br"
                  className="text-vermelho-destaque font-semibold hover:underline"
                >
                  contato@gdjrh.com.br
                </a>
              </span>
            </motion.div>
          </div>

          <div className="relative z-[1] mb-10 mt-10 lg:mt-0 lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-2xl bg-gradient-to-br from-verde-profundo to-verde-musgo p-8 shadow-xl text-branco-gelo">
                <span className="mb-4 block text-base font-semibold">
                  Retenção de talentos
                </span>
                <span className="mb-4 block text-4xl font-bold text-dourado-claro">
                  97%
                </span>
                <span className="block text-base">
                  Empresas que reduziram turnover com nossa consultoria.
                </span>
              </div>

              <div className="relative mt-6 max-w-xs rounded-2xl bg-gradient-to-br from-vermelho-destaque to-vermelho-suave p-8 shadow-xl text-white ml-auto">
                <span className="mb-4 block text-base font-semibold">
                  Empresas atendidas
                </span>
                <span className="mb-4 block text-4xl font-bold">250+</span>
                <span className="block text-base">
                  Confiam na GDJ para gestão de RH e compliance.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
