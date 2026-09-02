import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-verde-profundo text-branco-gelo pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src="/images/design-1.png" alt="GDJ Vertex" className="h-12 mb-4" />
          <p className="text-branco-gelo/70 text-sm">
            Consultoria em Recursos Humanos: recrutamento, seleção e departamento pessoal.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-dourado-metalico mb-4">Navegacao</h4>
          <ul className="space-y-2 text-sm text-branco-gelo/80">
            <li><Link to="/sobre" className="hover:text-dourado-claro">Sobre</Link></li>
            <li><Link to="/blog" className="hover:text-dourado-claro">Blog</Link></li>
            <li><Link to="/nr1" className="hover:text-dourado-claro">Manual NR1</Link></li>
            <li><Link to="/contato" className="hover:text-dourado-claro">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-dourado-metalico mb-4">Parcerias</h4>
          <ul className="space-y-2 text-sm text-branco-gelo/80">
            <li>Recoloca</li>
            <li>Sales Guardian</li>
            <li>VEX</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-dourado-metalico mb-4">Contato</h4>
          <a
            href="https://wa.me/5511966810215"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-branco-gelo/80 hover:text-dourado-claro"
          >
            (11) 96681-0215
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-branco-gelo/10 text-center text-xs text-branco-gelo/50">
        (c) 2026 GDJ Vertex Consultoria em RH. Todos os direitos reservados.
      </div>
    </footer>
  )
}
