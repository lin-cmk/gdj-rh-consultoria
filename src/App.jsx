import { useState, useEffect } from 'react'
import { FaWhatsapp, FaUsers, FaChartLine, FaRocket } from 'react-icons/fa'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsapp = () => {
    window.open('https://wa.me/5511999999999?text=Olá!%20Quero%20transformar%20minha%20seleção%20de%20candidatos!', '_blank')
  }

  return (
    <div className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white">
      
      {/* HERO */}
      <section className="h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-black mb-8">
            Transforme sua <span className="text-emerald-400">seleção</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Processo rigoroso que garante candidatos alinhados à sua cultura. 
            <strong> 97% ficam 12+ meses.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={whatsapp}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all"
            >
              <FaWhatsapp className="text-2xl" />
              Falar com Consultor
            </button>
            <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 px-12 py-5 rounded-2xl font-bold text-lg transition-all">
              <FaRocket className="text-xl" />
              Ver Resultados
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-32 bg-gradient-to-b from-transparent to-blue-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4"><FaUsers /></div>
              <div className="text-5xl font-black text-emerald-400 mb-2">97%</div>
              <p className="text-white/70 text-lg">Taxa de retenção</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4"><FaChartLine /></div>
              <div className="text-5xl font-black text-emerald-400 mb-2">3x</div>
              <p className="text-white/70 text-lg">Mais produtividade</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4"><FaRocket /></div>
              <div className="text-5xl font-black text-emerald-400 mb-2">250+</div>
              <p className="text-white/70 text-lg">Empresas atendidas</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-32 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Seu problema atual
          </h2>
          <p className="text-xl text-white/80">
            Contrata errado → demite → contrata de novo → perde R$200k/ano
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <div className="text-3xl">💸</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Custo real turnover</h3>
                <p className="text-white/80">R$150k-300k por posição sênior</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl">
              <div className="text-3xl">⏳</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Tempo perdido</h3>
                <p className="text-white/80">90 dias sem produtividade</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
              <div className="text-3xl">😞</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Equipe desmotivada</h3>
                <p className="text-white/80">Performance cai 30% após demissões</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-3xl border-4 border-red-500/30 backdrop-blur-xl flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-6xl mb-6 animate-pulse">💥</div>
                <h3 className="text-3xl font-black text-white mb-4">Ciclo vicioso</h3>
                <p className="text-xl text-white/70">80% das contratações internas falham nos primeiros 12 meses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-32 px-4 bg-gradient-to-t from-blue-900/50 to-transparent">
        <div className="max-w-6xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-emerald-400">
            Processo validado com 250+ empresas
          </h2>
          <p className="text-xl text-white/80">4 fases → 97% sucesso → Garantia 90 dias</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-4">
          {['Análise profunda', 'Seleção estratégica', 'Onboarding perfeito', 'Acompanhamento 90 dias'].map((step, i) => (
            <div key={i} className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 transition-all hover:translate-y-[-10px]">
              <div className="text-4xl mb-6">{'🔍🎯🚀✅'.split('')[i]}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{step}</h3>
              <p className="text-white/70">Step {i + 1} da jornada</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Resultados reais
          </h2>
          <p className="text-xl text-white/80">Números que falam por si</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          <div className="p-10 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-2 border-emerald-500/30 rounded-3xl text-center hover:shadow-2xl hover:shadow-emerald-500/25 transition-all">
            <div className="text-5xl mb-6">📈</div>
            <h3 className="text-3xl font-black text-white mb-4">3.2x ROI</h3>
            <p className="text-white/80 text-lg">Retorno em produtividade</p>
          </div>

          <div className="p-10 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/30 rounded-3xl text-center hover:shadow-2xl hover:shadow-blue-500/25 transition-all">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-3xl font-black text-white mb-4">47 dias</h3>
            <p className="text-white/80 text-lg">Time to productivity</p>
          </div>

          <div className="p-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-3xl text-center hover:shadow-2xl hover:shadow-purple-500/25 transition-all">
            <div className="text-5xl mb-6">💰</div>
            <h3 className="text-3xl font-black text-white mb-4">R$420k</h3>
            <p className="text-white/80 text-lg">Economia média/ano</p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-32 px-4 bg-gradient-to-b from-transparent to-blue-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-24 text-emerald-400">
            O que dizem nossos clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { nome: 'João Silva', role: 'CEO TechCorp', text: 'Contratamos 8 devs em 30 dias!', emoji: '👨‍💼' },
              { nome: 'Maria Oliveira', role: 'RH FastGrow', text: 'Economizamos R$120k/ano!', emoji: '👩‍💼' },
              { nome: 'Pedro Santos', role: 'Founder StartupX', text: 'Minha empresa decolou!', emoji: '🧔' }
            ].map((t, i) => (
              <div key={i} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all hover:translate-y-[-10px]">
                <div className="text-5xl mb-6">{t.emoji}</div>
                <p className="text-white/80 text-lg mb-6 italic">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white text-xl">{t.nome}</h4>
                  <p className="text-emerald-400 font-semibold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇO */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
            Investimento vs Retorno
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Fee única 15%</h3>
                  <p className="text-white/80">Sobre salário anual 1º ano</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Garantia 90 dias</h3>
                  <p className="text-white/80">Substituição gratuita</p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-4 border-emerald-500/40 backdrop-blur-xl rounded-3xl">
              <h3 className="text-4xl font-black text-white mb-6">Exemplo Dev Sênior</h3>
              <div className="space-y-4 text-2xl">
                <div className="flex justify-between">
                  <span className="text-white/70">Salário/ano:</span>
                  <span>R$180.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Nosso fee:</span>
                  <span className="text-emerald-400 font-bold">R$27.000</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/20">
                  <span className="text-white/70">Você economiza:</span>
                  <span className="text-3xl font-black text-emerald-400">R$393.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-4 bg-gradient-to-r from-emerald-600/90 to-green-600/90">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Pronto para transformar?
          </h2>
          <p className="text-2xl mb-12 opacity-90">
            2 minutos no WhatsApp → análise gratuita → 1º candidato em 7 dias
          </p>
          
          <button
            onClick={whatsapp}
            className="inline-flex items-center gap-4 mx-auto bg-white text-emerald-600 px-16 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-white/50 transition-all mb-12 hover:scale-110"
          >
            <FaWhatsapp className="text-3xl" />
            Sim, quero resultado!
          </button>

          <div className="flex flex-wrap gap-6 justify-center items-center text-sm opacity-75">
            <div className="flex items-center gap-2">
              ✓ 250+ empresas atendidas
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              ✓ Garantia total 90 dias
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 text-center text-white/50 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-4xl mb-6">👨‍💼</div>
          <h3 className="text-3xl font-bold mb-4 text-white">
            Rogério - Consultoria em Recrutamento
          </h3>
          <p className="mb-8 max-w-md mx-auto opacity-75">
            Especialista em Tech | 97% retenção | Garantia 90 dias
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm mb-8">
            <button onClick={whatsapp} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <FaWhatsapp /> WhatsApp
            </button>
            <a href="#" className="hover:text-emerald-400 transition-colors">Voltar ao topo</a>
          </div>
          <div className="text-xs opacity-50">
            © 2024 GD Consultoria. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
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

export default App
# confirmar que as imagens estão no repo e não ignoradas
git ls-files | grep -i images

# checar se .gitignore está bloqueando
cat .gitignore | grep -i image
