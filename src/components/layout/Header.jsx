import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/blog', label: 'Blog' },
    { to: '/contato', label: 'Contato' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-verde-profundo shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/design-1.png" alt="GDJ Vertex" className="h-24 md:h-32 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-branco-gelo font-medium hover:text-dourado-claro transition"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5511966810215?text=Olá!%20Quero%20conhecer%20as%20soluções%20da%20GDJ%20Vertex!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dourado-metalico text-verde-profundo font-semibold px-5 py-2 rounded-lg hover:bg-dourado-claro transition"
          >
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  )
}
