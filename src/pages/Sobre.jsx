import { Link } from 'react-router-dom'
import { FaWhatsapp, FaGraduationCap, FaArrowLeft } from 'react-icons/fa'

function Sobre() {
  const whatsapp = () => {
    window.open('https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!', '_blank')
  }

  const formacoes = [
    { curso: 'Pós-Graduação em Departamento Pessoal e Legislação Trabalhista', inst: 'Universidade Cruzeiro do Sul', ano: '2025' },
    { curso: 'Tecnólogo em Gestão de Recursos Humanos', inst: 'Anhanguera', ano: '2023–2024' },
    { curso: 'Curso de Gestão Financeira', inst: 'Sebrae', ano: '2023' },
    { curso: 'Curso de Recrutamento e Seleção', inst: 'CGO', ano: '2024' },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors mb-12">
          <FaArrowLeft /> Voltar para home
        </Link>

        <div className="text-center mb-20">
          <img
            src="/images/ceo.jpeg"
            alt="Gisele De Jesus"
            className="w-40 h-40 rounded-full object-cover mx-auto mb-8 shadow-2xl border-4 border-amber-400/50"
          />
          <h1 className="text-4xl md:text-5xl font-black mb-2">Gisele De Jesus</h1>
          <p className="text-xl text-amber-400 font-semibold mb-8">Fundadora — GDJ Vertex | Pessoas & Gestão</p>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Mais de <strong className="text-white">4 anos</strong> ajudando empresas a se organizar e alcançar
            resultados fantásticos, encontrando talentos que fazem a diferença.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Formação Acadêmica</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formacoes.map((f, i) => (
              <div key={i} className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex gap-4 hover:bg-white/15 transition-all">
                <FaGraduationCap className="text-2xl text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">{f.curso}</h4>
                  <p className="text-sm text-white/60">{f.inst} • {f.ano}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Vamos conversar sobre a sua empresa?</h3>
          <button
            onClick={whatsapp}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105"
          >
            <FaWhatsapp className="text-2xl" />
            Falar com a Gisele
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sobre
