import Link from 'next/link';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Herramientas Inmobiliarias | Recursos Gratuitos',
  description: 'Herramientas gratuitas para propietarios e inversionistas. Evalúa tu propiedad, calcula plusvalía y prepárate para vender o rentar con éxito.',
  alternates: {
    canonical: `${baseUrl}/herramientas`,
  },
  openGraph: {
    title: 'Herramientas Inmobiliarias | Oliver López Guijoza',
    description: 'Recursos y herramientas gratuitas para propietarios. Autoevalúa tu propiedad y prepárate para el mercado inmobiliario.',
    url: `${baseUrl}/herramientas`,
    type: 'website',
  },
};

const herramientas = [
  {
    title: 'Checklist de Preparación',
    subtitle: 'Venta & Renta',
    desc: 'Autoevalúa qué tan lista está tu propiedad para salir al mercado. Revisa cada aspecto clave: documentación, estado físico, presentación y más. Obtén un puntaje de preparación y recomendaciones personalizadas.',
    href: '/herramientas/checklist-propiedad',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    tags: ['Gratuito', 'PDF Descargable', 'Resultados inmediatos'],
    color: '#22AADE',
    available: true,
  },
  {
    title: 'Calculadora de Plusvalía',
    subtitle: 'Estado de México',
    desc: 'Estima el valor actual de tu propiedad y proyecta su plusvalía a futuro, basado en datos del mercado inmobiliario del Estado de México. Incluye zonas como Valle de Bravo, Metepec, Toluca y más.',
    href: '/herramientas/calculadora-plusvalia',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    tags: ['Gratuito', 'Mercado mexicano', 'Interactiva'],
    color: '#22AADE',
    available: true,
  },
  {
    title: 'Guía de Documentación',
    subtitle: 'Ley Mexicana',
    desc: 'Lista completa de documentos necesarios para comprar, vender o rentar una propiedad en México. Requisitos legales, notariales y fiscales actualizados conforme a la legislación vigente.',
    href: '/herramientas/guia-documentacion',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    tags: ['Gratuito', 'Compra · Venta · Renta', 'Referencias legales'],
    color: '#22AADE',
    available: true,
  },
  {
    title: 'Guía de Ejidos',
    subtitle: 'Propiedad Ejidal → Privada',
    desc: 'Todo sobre ejidos en México: qué son, cómo funcionan, tipos de derechos ejidales, proceso de dominio pleno para convertir tierra ejidal en propiedad privada, riesgos legales y preguntas frecuentes.',
    href: '/herramientas/guia-ejidos',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    tags: ['Gratuito', 'Ley Agraria', 'Dominio Pleno'],
    color: '#22AADE',
    available: true,
  },
];

export default function HerramientasPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* HERO */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1.5 px-3 sm:px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-6 sm:mb-8 backdrop-blur-md">
              Recursos Gratuitos
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tighter leading-[0.95] mb-6 sm:mb-8 px-2">
              Herramientas{' '}
              <span className="font-bold italic text-[#22AADE]">Inmobiliarias</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6 px-4">
              Recursos diseñados para ayudarte a tomar mejores decisiones inmobiliarias.
              Evalúa, planifica y prepárate con herramientas profesionales{' '}
              <strong className="text-white">completamente gratuitas.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS GRID */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-[#22AADE] text-[9px] sm:text-[10px] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">
              Explora las Herramientas
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white px-4">
              Selecciona una herramienta para <span className="font-bold">comenzar</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* CARD DESTACADO: ACADEMIA */}
            <Link
              href="/academia"
              className="relative bg-gradient-to-br from-[#22AADE]/10 to-purple-600/10 border-2 border-[#22AADE]/40 rounded-sm p-8 flex flex-col transition-all duration-500 group hover:border-[#22AADE] hover:scale-[1.02] cursor-pointer md:col-span-2 xl:col-span-1"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#22AADE] text-black">
                  Nuevo
                </span>
              </div>

              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 bg-gradient-to-br from-[#22AADE] to-purple-600 group-hover:scale-110">
                <svg className="w-7 h-7 text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 text-[#22AADE]">
                Academia Inmobiliaria
              </span>

              <h3 className="text-xl font-bold text-white mb-3">Cursos y Recursos Educativos</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 flex-grow">
                Cursos, guías, tutoriales y recursos descargables para asesores, compradores e inversionistas. Contenido profesional y gratuito.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border border-[#22AADE]/30 text-[#22AADE] bg-[#22AADE]/10">
                  Cursos
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/10">
                  Guías
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border border-[#22AADE]/30 text-[#22AADE] bg-[#22AADE]/10">
                  Gratuito
                </span>
              </div>

              <div className="block text-center bg-gradient-to-r from-[#22AADE] to-purple-600 text-white py-3 rounded-sm font-bold text-[11px] uppercase tracking-[0.15em] hover:from-white hover:to-white hover:text-black transition-all duration-300">
                Explorar Academia →
              </div>
            </Link>

            {herramientas.map((tool, idx) => (
              <div
                key={idx}
                className={`relative bg-[#050505] border rounded-sm p-8 flex flex-col transition-all duration-500 group ${
                  tool.available
                    ? 'border-[#22AADE]/20 hover:border-[#22AADE]/60 cursor-pointer'
                    : 'border-white/5 opacity-60'
                }`}
              >
                {/* Ícono */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${
                  tool.available ? 'bg-[#22AADE]/10 group-hover:bg-[#22AADE]' : 'bg-white/5'
                }`}>
                  <svg className={`w-7 h-7 transition-colors duration-500 ${
                    tool.available ? 'text-[#22AADE] group-hover:text-black' : 'text-gray-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tool.icon} />
                  </svg>
                </div>

                {/* Subtitle */}
                <span className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 ${
                  tool.available ? 'text-[#22AADE]' : 'text-gray-600'
                }`}>
                  {tool.subtitle}
                </span>

                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                  {tool.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${
                      tool.available
                        ? 'border-[#22AADE]/20 text-[#22AADE] bg-[#22AADE]/5'
                        : 'border-white/10 text-gray-600 bg-white/5'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {tool.available ? (
                  <Link
                    href={tool.href}
                    className="block text-center bg-[#22AADE] text-black py-3 rounded-sm font-bold text-[11px] uppercase tracking-[0.15em] hover:bg-white transition-all duration-300"
                  >
                    Usar Herramienta →
                  </Link>
                ) : (
                  <div className="text-center bg-white/5 text-gray-600 py-3 rounded-sm font-bold text-[11px] uppercase tracking-[0.15em] cursor-not-allowed">
                    Próximamente
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="py-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0a0a0a] border border-[#22AADE]/20 rounded-sm p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-3">¿Necesitas asesoría personalizada?</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-4">
                  Estas herramientas son un punto de partida. Si necesitas un análisis profesional de tu propiedad,
                  valuación formal o asesoría para vender, rentar o invertir, estamos para ayudarte.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-[#22AADE] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors"
                >
                  Contactar a un Asesor
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO ACADEMIA */}
      <section className="py-24 bg-gradient-to-br from-[#22AADE]/5 to-purple-600/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-[#0a0a0a] border-2 border-[#22AADE]/30 rounded-sm p-10 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block py-1 px-3 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] tracking-[0.3em] uppercase font-bold mb-4">
                  Nuevo
                </span>
                <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4 tracking-tighter">
                  <span className="font-bold italic text-[#22AADE]">Academia Inmobiliaria</span>
                  <br />
                  Cursos y Recursos Educativos
                </h2>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  Más de <strong className="text-white">26 recursos educativos</strong> organizados por audiencia:
                  nuevos asesores, profesionales, compradores e inversionistas. Guías, cursos, checklists,
                  plantillas y contenido descargable — <strong className="text-white">90% completamente gratuito</strong>.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['Cursos', 'Guías', 'Checklists', 'Videos', 'Plantillas', 'Scripts'].map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-[#22AADE]/20 text-[#22AADE] bg-[#22AADE]/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/academia"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#22AADE] to-purple-600 text-white font-bold text-[11px] uppercase tracking-[0.15em] hover:from-white hover:to-white hover:text-black transition-all duration-300 rounded-sm"
                >
                  Explorar Academia
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#22AADE]/10 to-purple-600/10 border border-[#22AADE]/20 rounded-sm p-8">
                  <div className="space-y-4">
                    {[
                      { label: 'Nuevos Asesores', count: '8 recursos', color: '#22AADE' },
                      { label: 'Asesores Pro', count: '6 recursos', color: '#a78bfa' },
                      { label: 'Compradores', count: '6 recursos', color: '#4ade80' },
                      { label: 'Inversionistas', count: '6 recursos', color: '#facc15' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-300 font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 tracking-tighter">
            Toma decisiones inmobiliarias{' '}
            <br />
            <span className="font-bold italic">con información</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Herramientas gratuitas diseñadas por profesionales del sector inmobiliario
            para que tengas la información que necesitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/herramientas/checklist-propiedad"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Comenzar Checklist
            </Link>
            <Link
              href="/contacto"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
            >
              Hablar con Asesor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
