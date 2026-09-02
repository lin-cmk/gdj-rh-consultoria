export default function SectionPartners() {
  const partners = [
    { nome: 'Recoloca.AI', logo: '/images/Logo_recolocai.png' },
    { nome: 'Sales Guardian', logo: '/images/logo_sistine_salesguardian.png' },
    { nome: 'VEX Tecnologia', logo: '/images/logo-vex.png' },
  ];

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block bg-verde-musgo/10 text-verde-musgo font-semibold text-sm px-4 py-1.5 rounded-full mb-4 border border-verde-musgo/20">
          🤝 Parcerias de confiança
        </span>
        <h2 className="text-3xl font-bold text-verde-profundo mb-10">
          Quem confia na GDJ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
          {partners.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-branco-gelo rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={p.logo}
                alt={p.nome}
                loading="lazy"
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
