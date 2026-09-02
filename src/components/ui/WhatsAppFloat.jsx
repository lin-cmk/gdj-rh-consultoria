import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppFloat({
  message = 'Olá! Quero conhecer as soluções da GDJ Vertex!',
  phone = '5511966810215',
}) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-vermelho-destaque text-branco-gelo shadow-2xl hover:bg-vermelho-suave hover:scale-110 transition-all duration-300"
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  )
}
