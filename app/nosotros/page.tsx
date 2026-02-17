import Link from 'next/link';

export const metadata = {
  title: 'Oliver López Guijoza | Luxury Real Estate',
  description: 'Asesor Inmobiliario en Valle de Bravo. Estrategia, confianza y resultados en bienes raíces.',
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-[#22AADE] selection:text-black font-sans">
      
      {/* 1. HERO SECTION: Personal Branding */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-black/60 z-10" />
          {/* Placeholder para foto de Oliver o paisaje de Valle de Bravo */}
          <img 
            src="/images/valle-de-bravo-luxury.jpg" 
            alt="Valle de Bravo Landscape"
            className="w-full h-full object-cover scale-105 opacity-50" 
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block py-1.5 px-3 sm:px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-6 sm:mb-8 backdrop-blur-md animate-fade-in">
            Valle de Bravo • México
          </span>
          
          <img src="./logo-white.png" alt="Oliver López Guijoza" className="w-64 sm:w-80 h-auto mx-auto shadow-lg" />
          
          <div className="w-20 sm:w-24 h-[2px] bg-[#22AADE] mx-auto mb-6 sm:mb-8" />
          
          <p className="text-base sm:text-lg md:text-2xl font-light text-white tracking-wide max-w-3xl mx-auto px-4">
            "Estrategia, confianza y resultados en bienes raíces."
          </p>
        </div>
      </section>

      {/* 2. BIO & PHILOSOPHY: Editorial Layout */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Columna de Texto */}
            <div>
              <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-6">
                Perfil Profesional
              </h2>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
                Diseñando estrategias inteligentes que generan <span className="font-bold text-white border-b-2 border-[#22AADE]">valor real.</span>
              </h3>
              
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base text-justify">
                <p>
                  Soy <strong className="text-white">Oliver López Guijoza</strong>, asesor inmobiliario con más de cinco años de experiencia en Valle de Bravo. Mi enfoque no es transaccional, es estratégico. Me especializo en compras, ventas y gestión inmobiliaria donde cada parte se siente respaldada.
                </p>
                <p>
                  Mi trabajo va más allá de cerrar operaciones. Me dedico a crear negociaciones claras, seguras y bien estructuradas. Creo firmemente que cada propiedad tiene una historia, y mi misión es conectar a las personas con el lugar ideal para construir la suya, ya sea como hogar, inversión o proyecto patrimonial.
                </p>
              </div>

              {/* Firma / Credencial */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-1 bg-[#22AADE]" />
                <div>
                  <p className="text-white font-bold uppercase tracking-widest text-sm">Presidente AMPI</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Sección Valle de Bravo</p>
                </div>
              </div>
            </div>

            {/* Columna Visual / Imagen de Perfil */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[#0a0a0a] border border-none relative overflow-hidden group">
                 {/* Aquí iría la foto de perfil de Oliver */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img 
                  src="./ChatGPT Image 8 ene 2026, 05_55_47 p.m..png" 
                  alt="Oliver López Guijoza" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white text-4xl font-black">5+</p>
                  <p className="text-[#22AADE] text-xs uppercase tracking-[0.3em]">Años de Trayectoria</p>
                </div>
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#22AADE]/20 -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. DIFFERENTIATORS: Grid Oscuro "Why Choose Me" */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Lo que me <span className="font-bold">Distingue</span>
            </h2>
            <p className="text-gray-500 font-light">
              Un estándar de servicio basado en la transparencia, el análisis de datos y las relaciones humanas a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Estrategia y Negociación',
                desc: 'Busco siempre el equilibrio entre el valor de la propiedad y las necesidades de cada parte, logrando acuerdos funcionales y transparentes.',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
              {
                title: 'Conocimiento Local',
                desc: 'Dominio de las zonas de Valle de Bravo. Identifico áreas con mayor plusvalía y oportunidades de inversión alineadas a tu presupuesto.',
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              },
              {
                title: 'Alcance Nacional',
                desc: 'Relaciones estratégicas con asesores y desarrolladores en todo México, abriendo oportunidades fuera del mercado local.',
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064'
              },
              {
                title: 'Acceso Off-Market',
                desc: 'Alianzas sólidas que facilitan el acceso a propiedades exclusivas que no siempre se encuentran en canales tradicionales.',
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 p-10 hover:border-[#22AADE]/50 transition-colors duration-500 group">
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon}/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES LIST: Clean & Professional */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Soluciones Integrales</h2>
              <p className="text-4xl font-light text-white">Servicios <span className="font-bold italic">Inmobiliarios</span></p>
            </div>
            <p className="text-gray-500 text-sm max-w-md text-right hidden md:block">
              Desde la consultoría legal hasta el marketing estratégico, cubrimos cada ángulo de tu inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {[
              "Asesoría en compra y venta",
              "Gestión integral de propiedades",
              "Marketing inmobiliario estratégico",
              "Análisis de mercado y plusvalía",
              "Mantenimiento de terrenos",
              "Levantamientos topográficos",
              "Locaciones para TV y cine",
              "Renders arquitectónicos",
              "Consultoría legal inmobiliaria",
              "Fotografía profesional"
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-default">
                <span className="w-2 h-2 bg-[#22AADE] rounded-full group-hover:scale-150 transition-transform"/>
                <span className="text-gray-400 font-light text-lg group-hover:text-white transition-colors">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. APTITUDES & LEADERSHIP */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block p-8 border border-[#22AADE]/30 bg-[#22AADE]/5 relative">
            {/* Esquinas decorativas */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#22AADE]" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#22AADE]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#22AADE]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#22AADE]" />
            
            <h3 className="text-2xl md:text-3xl font-light text-white mb-2">Liderazgo en el Sector</h3>
            <p className="text-[#22AADE] uppercase tracking-[0.2em] font-bold text-xs mb-6">AMPI Valle de Bravo</p>
            <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Actualmente soy Presidente de AMPI Valle de Bravo , participo activamente en el fortalecimiento y profesionalización del sector inmobiliario a nivel local y nacional.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
            ¿Por qué elegir a <br />
            <span className="font-bold italic">Oliver López Guijoza?</span>
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto border-l-2 border-[#22AADE] pl-6">
            "Porque no me limito a vender propiedades: diseño soluciones inmobiliarias personalizadas, alineadas a tus objetivos financieros y personales."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="bg-[#22AADE] text-black px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-black hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(34,170,222,0.2)]"
            >
              Iniciar Conversación
            </Link>
            <Link
              href="/propiedades"
              className="border border-white/20 text-white px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-500"
            >
              Ver Portafolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}