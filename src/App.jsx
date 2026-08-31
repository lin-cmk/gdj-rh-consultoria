import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FaWhatsapp, FaUsers, FaChartLine, FaRocket, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import Sobre from './Sobre.jsx'

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsapp = () => {
    window.open('https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!', '_blank')
  }

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 min-h-screen text-white">

      <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/gen_3Ieuk3KGUdia6KmztW8eJFyVNIJ.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-blue-900/40 to-indigo-900/80" />

        <div className="text-center max-w-4xl relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            GDJ VERTEX
            <span className="block text-2xl md:text-3xl font-medium text-white/80 mt-2">Pessoas & Gestão</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90">
            Conectando empresas às pessoas certas.<br/>
            <strong>Recrutamento estratégico + Departamento Pessoal simplificado.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={whatsapp}
              className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl border border-white/40 hover:bg-white/25 px-12 py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all hover:scale-105"
            >
              <FaWhatsapp className="text-2xl" />
              Falar com a GDJ Vertex
            </button>
            <button
              onClick={() => document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white/60 hover:bg-white/10 px-12 py-5 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
            >
              <FaRocket className="text-xl" />
              Ver Soluções
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-transparent to-blue-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-amber-400">
            Sobre a GDJ Vertex
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-6">
            A <strong className="text-white">GDJ VERTEX | Pessoas & Gestão</strong> é uma empresa especializada
            em soluções de Departamento Pessoal e Recrutamento & Seleção, oferecendo suporte estratégico e
            operacional para empresas que buscam mais organização, agilidade e eficiência na gestão de pessoas.
          </p>
          <p className="text-xl text-white/80 leading-relaxed mb-6">
            Nosso objetivo é simplificar as rotinas de RH e Departamento Pessoal, proporcionando às empresas
            um atendimento personalizado, responsável e alinhado às suas necessidades.
          </p>
          <p className="text-xl text-white/80 leading-relaxed">
            Atuamos desde a atração e seleção de talentos até as principais rotinas de Departamento Pessoal,
            contribuindo para que a empresa tenha processos mais eficientes e possa focar no crescimento do seu negócio.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-blue-950/50 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4"><FaUsers /></div>
              <div className="text-5xl font-black text-amber-400 mb-2">97%</div>
              <p className="text-white/70 text-lg">Taxa de retenção</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4"><FaChartLine /></div>
              <div className="text-5xl font-black text-amber-400 mb-2">3x</div>
              <p className="text-white/70 text-lg">Mais produtividade</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4"><FaRocket /></div>
              <div className="text-5xl font-black text-amber-400 mb-2">250+</div>
              <p className="text-white/70 text-lg">Empresas atendidas</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Nossas Soluções</h2>
            <p className="text-xl text-white/80">Do recrutamento à rotina de DP, cuidamos de cada etapa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video ref={videoRef} muted loop playsInline controls={false} className="w-full h-full object-cover">
                <source src="/videos/gdj.mp4" type="video/mp4" />
              </video>
              <button
                onClick={toggleSound}
                className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-4 rounded-full text-white hover:bg-black/70 transition-all"
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                <div className="text-3xl">👥</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Recrutamento & Seleção</h3>
                  <p className="text-white/80">
                    Encontramos profissionais alinhados ao perfil, à cultura e às necessidades da sua empresa,
                    conduzindo o processo seletivo de forma ágil e estratégica.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                <div className="text-3xl">📋</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Departamento Pessoal</h3>
                  <p className="text-white/80">
                    Prestamos suporte nas principais rotinas de DP, garantindo mais organização,
                    acompanhamento e segurança nos processos relacionados aos colaboradores.
                  </p>
                </div>
              </div>
              <button
                onClick={whatsapp}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all"
              >
                <FaWhatsapp /> Quero conhecer as soluções
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-transparent to-blue-950/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img src="/images/eficiencia.png" alt="Eficiência no DP" className="rounded-3xl shadow-2xl w-full hover:scale-[1.02] transition-transform" />
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Eficiência que <span className="text-amber-400">acelera</span> o crescimento
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Um Departamento Pessoal eficiente não é apenas sobre cumprir obrigações — é sobre liberar
              tempo e energia para que a sua empresa foque no que realmente importa: crescer.
              Cada processo bem estruturado hoje é uma vantagem competitiva amanhã.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Do operacional à liderança,<br/>
              <span className="text-amber-400">recrutamos o talento exato</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Cada profissão, cada nível de senioridade, cada função tem características únicas.
              Nós entendemos isso — e é por isso que encontramos exatamente a pessoa certa para
              cada posição da sua empresa.
            </p>
          </div>
          <img src="/images/lideranca.png" alt="Do operacional à liderança" className="rounded-3xl shadow-2xl order-1 md:order-2 hover:scale-[1.02] transition-transform" />
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-blue-950/50 to-transparent">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Nossos Valores</h2>
          <p className="text-xl text-white/80">O que guia cada entrega da GDJ Vertex</p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <img src="/images/servicos-2.jpeg" alt="Valores 1" className="rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform" />
          <img src="/images/servicos-3.jpeg" alt="Valores 2" className="rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform" />
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-12">
          {[
            { icon: '🗂️', titulo: 'Organização', desc: 'Processos claros e estruturados em cada etapa.' },
            { icon: '⚡', titulo: 'Agilidade', desc: 'Respostas rápidas sem abrir mão da qualidade.' },
            { icon: '🤝', titulo: 'Confiança', desc: 'Relação transparente e comprometida com resultado.' },
          ].map((v, i) => (
            <div key={i} className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 transition-all">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{v.titulo}</h3>
              <p className="text-white/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-white">
            Terceirize seu Departamento Pessoal
          </h2>
          <img src="/images/servicos-1.jpeg" alt="Terceirize seu DP" className="rounded-3xl shadow-2xl mx-auto hover:scale-[1.01] transition-transform" />
          <button
            onClick={whatsapp}
            className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all"
          >
            <FaWhatsapp /> Quero terceirizar meu DP
          </button>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-transparent to-blue-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/images/ceo.jpeg"
            alt="Gisele De Jesus"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-2xl border-4 border-amber-400/50"
          />
          <h2 className="text-3xl font-black text-white mb-2">Gisele De Jesus</h2>
          <p className="text-amber-400 font-semibold mb-6">Fundadora — GDJ Vertex</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Mais de 4 anos ajudando empresas a se organizar e alcançar resultados fantásticos.
          </p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-white transition-all"
          >
            Conhecer a história completa →
          </Link>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-br from-emerald-600/90 to-green-600/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/reuniao.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Pronto para simplificar sua gestão de pessoas?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Fale agora com a GDJ Vertex e descubra como podemos ajudar sua empresa
          </p>
          <button
            onClick={whatsapp}
            className="inline-flex items-center gap-4 mx-auto bg-white text-emerald-600 px-14 py-7 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 transition-all"
          >
            <FaWhatsapp className="text-2xl" />
            Falar no WhatsApp
          </button>
        </div>
      </section>

      <footer className="py-16 px-4 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <img src="/images/design-1.png" alt="GDJ Vertex" className="h-16 mx-auto mb-6" />
          <p className="mb-8 max-w-md mx-auto text-white/60">
            Conectando empresas às pessoas certas e tornando a gestão de pessoas mais simples.
          </p>
          <button onClick={whatsapp} className="flex items-center gap-2 justify-center text-white/70 hover:text-amber-400 transition-colors mb-8 font-semibold">
            <FaWhatsapp /> WhatsApp
          </button>
          <div className="text-xs text-white/40">
            © 2026 GDJ Vertex | Pessoas & Gestão. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-4 bg-emerald-500/90 backdrop-blur-xl rounded-full shadow-2xl hover:bg-emerald-600 transition-all"
        >
          <FaRocket className="text-xl text-white" />
        </button>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  )
}

export default App
