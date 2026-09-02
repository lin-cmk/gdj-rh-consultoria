import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ_ITEMS = [
  {
    pergunta: 'O que muda na Nova NR1?',
    resposta:
      'A Nova NR1 amplia o Gerenciamento de Riscos Ocupacionais (GRO) para incluir riscos psicossociais, exigindo que empresas identifiquem e mitiguem fatores de estresse, assédio e sobrecarga no ambiente de trabalho.',
  },
  {
    pergunta: 'Minha empresa precisa se adequar mesmo sendo pequena?',
    resposta:
      'Sim. A norma se aplica a empresas de todos os portes que possuam empregados regidos pela CLT, com exigências proporcionais ao grau de risco e número de colaboradores.',
  },
  {
    pergunta: 'Como funciona a terceirização de RH com a GDJ?',
    resposta:
      'Assumimos processos como recrutamento, folha, admissão/demissão e compliance trabalhista, com uma equipe dedicada e ferramentas próprias, permitindo que sua empresa foque no core business.',
  },
  {
    pergunta: 'Quanto tempo leva o diagnóstico gratuito?',
    resposta:
      'O diagnóstico inicial é feito em até 48h após o contato via WhatsApp, com um raio-x da situação atual de RH/DP da sua empresa.',
  },
  {
    pergunta: 'Os ebooks são realmente gratuitos?',
    resposta:
      'Sim, 100% gratuitos e sem compromisso. Basta preencher o formulário para receber o material imediatamente.',
  },
];

export default function SectionFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 bg-branco-gelo">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-dourado-metalico/10 text-dourado-metalico font-semibold text-sm px-4 py-1.5 rounded-full mb-4 border border-dourado-metalico/20">
            ❓ Perguntas frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-verde-profundo">
            Ainda tem dúvidas?
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-verde-musgo/15 rounded-xl overflow-hidden bg-off-white"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-verde-profundo hover:bg-verde-musgo/5 transition"
              >
                <span>{item.pergunta}</span>
                <FaChevronDown
                  className={`text-dourado-metalico transition-transform flex-shrink-0 ml-3 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-verde-profundo/70 text-sm leading-relaxed">
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
