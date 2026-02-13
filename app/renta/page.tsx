import PropertyListFiltered from '@/components/property/PropertyListFiltered';
import AMPISeal from '@/components/property/AMPISeal';

export const metadata = {
  title: 'Luxury Rentals | Propiedades en Renta',
  description: 'Descubre residencias exclusivas en renta. Estancias de alto nivel con gestión profesional en Valle de Bravo.',
};

export default function RentaPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">
      
      {/* 1. CINEMATIC HEADER */}
      <header className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        {/* Glow de fondo esmeralda muy sutil para diferenciar de Venta */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#22AADE]" />
                <span className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase">
                  Estilo de Vida & Confort
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none mb-6">
                Propiedades en <br />
                <span className="font-bold italic text-white">Renta</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                Selección exclusiva de propiedades gestionadas bajo estándares de <span className="text-white font-medium">hospitalidad premium</span>. 
                Encuentra el refugio perfecto con la seguridad de un proceso transparente.
              </p>
            </div>
            
            {/* Sello de Garantía AMPI */}
            <div className="w-full md:w-auto flex justify-center md:justify-end md:border-l md:border-white/10 md:pl-8 md:pb-2">
              <AMPISeal />
            </div>
          </div>
        </div>
        
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Contenedor de la lista con efecto de profundidad */}
          <div className="bg-[#0a0a0a]/60 backdrop-blur-md rounded-sm p-2 md:p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <PropertyListFiltered status="renta" />
          </div>
        </div>
      </main>

      {/* 3. RENTAL EXPERIENCE (Diferenciadores de Servicio) */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Experiencia de Arrendamiento</h3>
              <div className="w-12 h-1 bg-[#22AADE]" />
            </div>
            
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div className="space-y-3">
                <span className="text-[#22AADE] font-mono text-sm">01.</span>
                <h4 className="text-white font-medium uppercase text-xs tracking-widest">Contratos Blindados</h4>
                <p className="text-gray-500 text-sm font-light">Seguridad jurídica total para arrendadores y arrendatarios mediante pólizas jurídicas avanzadas.</p>
              </div>
              
              <div className="space-y-3">
                <span className="text-[#22AADE] font-mono text-sm">02.</span>
                <h4 className="text-white font-medium uppercase text-xs tracking-widest">Mantenimiento Certificado</h4>
                <p className="text-gray-500 text-sm font-light">Gestión activa de la propiedad para asegurar que tu estancia sea impecable desde el primer día.</p>
              </div>
              
              <div className="space-y-3">
                <span className="text-[#22AADE] font-mono text-sm">03.</span>
                <h4 className="text-white font-medium uppercase text-xs tracking-widest">Atención 24/7</h4>
                <p className="text-gray-500 text-sm font-light">Canal directo de comunicación para resolver cualquier eventualidad técnica o administrativa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICIO ALIADO — CHEF EN CASA & CATERING */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Contenido */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full bg-amber-400/10">
                  Servicio Aliado
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-extralight text-white mb-4 leading-tight">
                Chef en Casa &{' '}
                <span className="font-bold italic">Catering Profesional</span>
              </h3>

              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Complementa tu experiencia de arrendamiento con un servicio gastronómico de primer nivel.
                Nuestro servicio aliado ofrece chefs profesionales que preparan experiencias culinarias
                personalizadas directamente en tu propiedad — desde cenas íntimas hasta eventos de gran formato.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Cenas Privadas', desc: 'Menú degustación diseñado por chef, servido en la comodidad de tu propiedad.' },
                  { title: 'Eventos Sociales', desc: 'Catering completo para reuniones, celebraciones y eventos corporativos.' },
                  { title: 'Brunch & Desayunos', desc: 'Experiencias matutinas gourmet ideales para fines de semana en Valle de Bravo.' },
                  { title: 'Parrilladas Premium', desc: 'Cortes selectos y cocina al aire libre con servicio profesional completo.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-amber-400/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-white text-sm font-bold block">{item.title}</span>
                      <span className="text-gray-500 text-xs font-light">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/contacto"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Solicitar Chef en Casa
              </a>
            </div>

            {/* Visual — Card decorativa */}
            <div className="relative">
              <div className="bg-[#050505] border border-white/5 rounded-sm p-8 md:p-10 relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500">
                {/* Glow decorativo */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-amber-500/20 transition-colors" />

                {/* Ícono central */}
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-500 transition-colors duration-500">
                  <svg className="w-10 h-10 text-amber-400 group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h4 className="text-center text-white font-bold text-lg mb-3">Experiencia Gastronómica Completa</h4>
                <p className="text-center text-gray-500 font-light text-sm mb-8 max-w-sm mx-auto">
                  Desde la selección del menú hasta el servicio de mesa y limpieza posterior. Tú solo disfruta.
                </p>

                {/* Features list */}
                <div className="space-y-4">
                  {[
                    'Menús personalizados según preferencias y restricciones alimentarias',
                    'Chef profesional con experiencia en alta cocina',
                    'Servicio de meseros, cristalería y montaje incluido',
                    'Desde 2 hasta 200+ comensales',
                    'Cocina mexicana, internacional, fusión y especialidades',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-400 text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Nota */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                    Servicio operado por aliado gastronómico certificado
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (Contextualizado a Oliver) */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-400 font-light italic text-lg mb-8">
            "Mi compromiso es que cada renta sea el inicio de una relación de confianza, 
            garantizando que la gestión de la propiedad sea tan profesional como la propiedad misma."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#22AADE]/50" />
            <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">Oliver López Guijoza</span>
            <div className="h-[1px] w-8 bg-[#22AADE]/50" />
          </div>
        </div>
      </section>

    </div>
  );
}