import PropertyList from '@/components/property/PropertyList';

export const metadata = {
  title: 'Portafolio Inmobiliario Completo | Oliver López Guijoza',
  description: 'Explore una curaduría exclusiva de propiedades en Valle de Bravo y las mejores zonas de México. Venta, renta y oportunidades de inversión.',
};

export default function PropiedadesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">
      
      {/* 1. MINIMALIST & TECH HEADER */}
      <header className="relative pt-32 pb-12 border-b border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#22AADE]/5 blur-[100px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#22AADE]" />
                <span className="text-[#22AADE] text-[10px] font-bold tracking-[0.4em] uppercase">
                  Catálogo Global
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter leading-none mb-4">
                Portafolio <br />
                <span className="font-bold italic">Inmobiliario</span>
              </h1>
              <p className="text-gray-400 font-light text-base md:text-lg max-w-xl">
                Explora una selección estratégica de activos residenciales y comerciales gestionados con rigor profesional y visión de mercado.
              </p>
            </div>
            
            {/* Contador / Badge de confianza (UX Trust) */}
            <div className="hidden lg:block border-l border-white/10 pl-8 pb-2">
              <img src="./logo_ampi-white.png" alt="Logo AMPI" className="w-40 h-auto mb-0" />
              <p className="text-[#22AADE] text-[10px] uppercase tracking-widest font-medium ml-3">Sello de Garantía</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GALLERY SECTION */}
      <main className="relative z-10">
        {/* Sutil textura de ruido para el look "Luxury" */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* PropertyList debe renderizar las tarjetas con bordes suaves y hover states cian */}
          <div className="relative group">
            <PropertyList />
          </div>
        </div>
      </main>

      {/* 3. CONTEXTUAL NAVIGATION (UX de ayuda) */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-light text-white mb-4">¿Buscas algo <span className="text-[#22AADE] italic font-medium">específico</span>?</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                Nuestra red de contactos a nivel nacional nos permite acceder a propiedades que aún no figuran en el mercado abierto. Si no encuentras lo que buscas, diseñamos una búsqueda a tu medida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <a href="/contacto" className="inline-block bg-white text-black text-center px-8 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#22AADE] hover:text-black transition-all duration-300">
                Solicitar Búsqueda Personalizada
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}