import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center gap-2 justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300'

  const variants = {
    primary: 'bg-dourado-metalico text-verde-profundo hover:bg-dourado-claro hover:scale-105 shadow-lg',
    secondary: 'bg-verde-profundo text-branco-gelo hover:bg-verde-musgo border border-dourado-metalico/30',
    outline: 'bg-transparent border-2 border-branco-gelo/60 text-branco-gelo hover:bg-branco-gelo/10',
    whatsapp: 'bg-vermelho-destaque text-branco-gelo hover:bg-vermelho-suave hover:scale-105 shadow-lg',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
