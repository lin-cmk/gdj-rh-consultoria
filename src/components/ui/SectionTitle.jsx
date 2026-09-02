export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const titleColor = light ? 'text-branco-gelo' : 'text-verde-profundo'
  const subtitleColor = light ? 'text-branco-gelo/70' : 'text-verde-musgo/80'

  return (
    <div className={`${alignClass} mb-12`}>
      <h2 className={`text-3xl md:text-5xl font-black mb-4 ${titleColor}`}>
        {title}
        <span className="block w-16 h-1 bg-dourado-metalico mt-4 rounded-full mx-auto md:mx-0" />
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl ${subtitleColor} max-w-2xl ${align === 'left' ? '' : 'mx-auto'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
