import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaUsers, FaChartLine, FaRocket, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import WhatsAppFloat from '../components/ui/WhatsAppFloat.jsx'
import Button from '../components/ui/Button.jsx'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <div className="w-full bg-off-white min-h-screen text-verde-profundo">
      <Header />

      <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/gen_3Ieuk3KGUdia6KmztW8eJFyVNIJ.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-transparent" />

        <div className="text-center max-w-4xl relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-branco-gelo drop-shadow-2xl">
            GDJ VERTEX
            <span className="block text-2xl md:text-3xl font-medium text-branco-gelo/80 mt-2">Pessoas & Gestão</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-branco-gelo/90">
            Conectando empresas às pessoas certas.<br/>
            <strong>Recrutamento estratégico + Departamento Pessoal simplificado.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button href="https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!" variant="whatsapp">
              <FaWhatsapp className="text-2xl" />
              Falar com a GDJ Vertex
            </Button>
            <Button onClick={() => document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' })} variant="outline">
              <FaRocket className="text-xl" />
              Ver Soluções
            </Button>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-dourado-metalico">
            Sobre a GDJ Vertex
          </h2>
          <p className="text-xl text-verde-musgo/90 leading-relaxed mb-6">
            A <strong className="text-verde-profundo">GDJ VERTEX | Pessoas & Gestão</strong> é uma empresa especializada
            em soluções de Departamento Pessoal e Recrutamento & Seleção, oferecendo suporte estratégico e
            operacional para empresas que buscam mais organização, agilidade e eficiência na gestão de pessoas.
          </p>
          <p className="text-xl text-verde-musgo/90 leading-relaxed mb-6">
            Nosso objetivo é simplificar as rotinas de RH e Departamento Pessoal, proporcionando às empresas
            um atendimento personalizado, responsável e alinhado às suas necessidades.
          </p>
          <p className="text-xl text-verde-musgo/90 leading-relaxed">
            Atuamos desde a atração e seleção de talentos até as principais rotinas de Departamento Pessoal,
            contribuindo para que a empresa tenha processos mais eficientes e possa focar no crescimento do seu negócio.
          </p>
        </div>
      </section>

      <section className="py-24 bg-verde-profundo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4 text-dourado-metalico flex justify-center"><FaUsers /></div>
              <div className="text-5xl font-black text-dourado-metalico mb-2">97%</div>
              <p className="text-branco-gelo/70 text-lg">Taxa de retenção</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4 text-dourado-metalico flex justify-center"><FaChartLine /></div>
              <div className="text-5xl font-black text-dourado-metalico mb-2">3x</div>
              <p className="text-branco-gelo/70 text-lg">Mais produtividade</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4 text-dourado-metalico flex justify-center"><FaRocket /></div>
              <div className="text-5xl font-black text-dourado-metalico mb-2">250+</div>
              <p className="text-branco-gelo/70 text-lg">Empresas atendidas</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-32 px-4 bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-verde-profundo">Nossas Soluções</h2>
            <p className="text-xl text-verde-musgo/80">Do recrutamento à rotina de DP, cuidamos de cada etapa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video ref={videoRef} muted loop playsInline controls={false} className="w-full h-full object-cover">
                <source src="/videos/gdj.mp4" type="video/mp4" />
              </video>
              <button
                onClick={toggleSound}
                className="absolute bottom-4 right-4 bg-verde-profundo/70 backdrop-blur-md p-4 rounded-full text-branco-gelo hover:bg-verde-profundo transition-all"
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-verde-profundo/5 border border-verde-profundo/10 rounded-2xl">
                <div className="text-3xl">👥</div>
                <div>
                  <h3 className="text-2xl font-bold text-verde-profundo mb-2">Recrutamento & Seleção</h3>
                  <p className="text-verde-musgo/80">
                    Encontramos profissionais alinhados ao perfil, à cultura e às necessidades da sua empresa,
                    conduzindo o processo seletivo de forma ágil e estratégica.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-verde-profundo/5 border border-verde-profundo/10 rounded-2xl">
                <div className="text-3xl">📋</div>
                <div>
                  <h3 className="text-2xl font-bold text-verde-profundo mb-2">Departamento Pessoal</h3>
                  <p className="text-verde-musgo/80">
                    Prestamos suporte nas principais rotinas de DP, garantindo mais organização,
                    acompanhamento e segurança nos processos relacionados aos colaboradores.
                  </p>
                </div>
              </div>
              <Button href="https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!" variant="primary">
                <FaWhatsapp /> Quero conhecer as soluções
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-off-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img src="/images/eficiencia.png" alt="Eficiência no DP" className="rounded-3xl shadow-2xl w-full hover:scale-[1.02] transition-transform" />
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-verde-profundo">
              Eficiência que <span className="text-dourado-metalico">acelera</span> o crescimento
            </h2>
            <p className="text-xl text-verde-musgo/80 leading-relaxed">
              Um Departamento Pessoal eficiente não é apenas sobre cumprir obrigações — é sobre liberar
              tempo e energia para que a sua empresa foque no que realmente importa: crescer.
              Cada processo bem estruturado hoje é uma vantagem competitiva amanhã.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-off-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-verde-profundo">
              Do operacional à liderança,<br/>
              <span className="text-dourado-metalico">recrutamos o talento exato</span>
            </h2>
            <p className="text-xl text-verde-musgo/80 leading-relaxed">
              Cada profissão, cada nível de senioridade, cada função tem características únicas.
              Nós entendemos isso — e é por isso que encontramos exatamente a pessoa certa para
              cada posição da sua empresa.
            </p>
          </div>
          <img src="/images/lideranca.png" alt="Do operacional à liderança" className="rounded-3xl shadow-2xl order-1 md:order-2 hover:scale-[1.02] transition-transform" />
        </div>
      </section>

      <section className="py-32 px-4 bg-verde-profundo">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-branco-gelo">Nossos Valores</h2>
          <p className="text-xl text-branco-gelo/80">O que guia cada entrega da GDJ Vertex</p>
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
            <div key={i} className="p-8 bg-branco-gelo/5 border border-branco-gelo/10 rounded-3xl hover:bg-branco-gelo/10 transition-all">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold text-branco-gelo mb-2">{v.titulo}</h3>
              <p className="text-branco-gelo/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-4 bg-off-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-verde-profundo">
            Terceirize seu Departamento Pessoal
          </h2>
          <img src="/images/servicos-1.jpeg" alt="Terceirize seu DP" className="rounded-3xl shadow-2xl mx-auto hover:scale-[1.01] transition-transform" />
          <Button href="https://wa.me/5511966810215?text=Olá!%20Quero%20terceirizar%20meu%20DP!" variant="primary" className="mt-12">
            <FaWhatsapp /> Quero terceirizar meu DP
          </Button>
        </div>
      </section>

      <section className="py-32 px-4 bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/images/ceo.jpeg"
            alt="Gisele De Jesus"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-2xl border-4 border-dourado-metalico/50"
          />
          <h2 className="text-3xl font-black text-verde-profundo mb-2">Gisele De Jesus</h2>
          <p className="text-dourado-metalico font-semibold mb-6">Fundadora — GDJ Vertex</p>
          <p className="text-lg text-verde-musgo/80 mb-8 max-w-2xl mx-auto">
            Mais de 4 anos ajudando empresas a se organizar e alcançar resultados fantásticos.
          </p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 bg-verde-profundo/5 border border-verde-profundo/10 hover:bg-verde-profundo/10 px-8 py-4 rounded-2xl font-bold text-verde-profundo transition-all"
          >
            Conhecer a história completa →
          </Link>
        </div>
      </section>

      <section className="py-32 px-4 bg-verde-profundo relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/reuniao.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center text-branco-gelo relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Pronto para simplificar sua gestão de pessoas?
          </h2>
          <p className="text-xl mb-12 text-branco-gelo/90">
            Fale agora com a GDJ Vertex e descubra como podemos ajudar sua empresa
          </p>
          <Button href="https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!" variant="whatsapp" className="text-xl px-14 py-7">
            <FaWhatsapp className="text-2xl" />
            Falar no WhatsApp
          </Button>
        </div>
      </section>

      <Footer />

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 p-4 bg-dourado-metalico text-verde-profundo rounded-full shadow-2xl hover:bg-dourado-claro transition-all"
        >
          <FaRocket className="text-xl" />
        </button>
      )}

      <WhatsAppFloat />
    </div>
  )
}
