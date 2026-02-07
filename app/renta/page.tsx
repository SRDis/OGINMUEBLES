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

      {/* 4. CALL TO ACTION (Contextualizado a Oliver) */}
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