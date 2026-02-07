import PropertyListFiltered from '@/components/property/PropertyListFiltered';
import AMPISeal from '@/components/property/AMPISeal';

export const metadata = {
  title: 'Portafolio de Inversión | Propiedades en Venta',
  description: 'Explora nuestra curaduría exclusiva de propiedades en venta en Valle de Bravo y México.',
};

export default function VentaPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">
      
      {/* 1. ELEGANT HEADER */}
      <header className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        {/* Glow de fondo para profundidad tecnológica */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-[#22AADE]" />
                <span className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase">
                  Adquisición & Patrimonio
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none mb-6">
                Propiedades en <br />
                <span className="font-bold italic text-white">Venta</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                Curaduría de residencias y terrenos con alto potencial de plusvalía. 
                Utilizamos <span className="text-white font-medium">inteligencia de mercado</span> para garantizar que tu inversión sea sólida y segura.
              </p>
            </div>
            
            {/* Sello de Garantía AMPI */}
            <div className="w-full md:w-auto flex justify-center md:justify-end md:border-l md:border-white/10 md:pl-8 md:pb-2">
              <AMPISeal />
            </div>
          </div>
        </div>
      </header>

      {/* 2. FILTER & LIST SECTION */}
      <main className="relative z-10">
        {/* Decoración lateral de línea */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-transparent to-transparent hidden lg:block ml-8" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* PropertyListFiltered heredará los estilos del contenedor padre. 
              Asegúrate de que las tarjetas dentro de este componente usen 
              el diseño de "PropertyCard" que definimos antes.
          */}
          <div className="bg-[#0a0a0a]/40 backdrop-blur-sm rounded-sm p-2 md:p-6 border border-white/5 shadow-2xl">
            <PropertyListFiltered status="venta" />
          </div>
        </div>
      </main>

      {/* 3. TRUST BANNER (UX para reducir la fricción de venta) */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-[#22AADE] text-xs font-bold uppercase tracking-widest">Certeza Jurídica</h4>
              <p className="text-gray-500 text-sm font-light">Cada propiedad en venta pasa por una auditoría legal exhaustiva antes de publicarse.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[#22AADE] text-xs font-bold uppercase tracking-widest">Valuación Real</h4>
              <p className="text-gray-500 text-sm font-light">Precios alineados a la realidad del mercado mediante análisis predictivo de datos.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[#22AADE] text-xs font-bold uppercase tracking-widest">Gestión AMPI</h4>
              <p className="text-gray-500 text-sm font-light">Operaciones respaldadas por el estándar ético de la Asociación Mexicana de Profesionales Inmobiliarios.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}