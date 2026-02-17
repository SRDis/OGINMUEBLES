import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getRandomPropertyImage } from '@/lib/cloudinary';
import { Metadata } from 'next';
import FeaturedPropertiesCarousel from '@/components/property/FeaturedPropertiesCarousel';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oliverlguijoza.com';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Asesor inmobiliario profesional certificado AMPI. Propiedades exclusivas en Valle de Bravo y Ciudad de México. Venta, renta e inversión inmobiliaria con asesoría personalizada.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Oliver López Guijoza | Asesor Inmobiliario Profesional',
    description: 'Propiedades exclusivas en Valle de Bravo y CDMX. Venta, renta e inversión inmobiliaria.',
    url: baseUrl,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Oliver López Guijoza - Asesor Inmobiliario',
      },
    ],
  },
};

async function getFeaturedProperties() {
  // Obtener todas las propiedades destacadas
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true);

  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }

  // Si hay más de 6, seleccionar 6 aleatoriamente
  const allProperties = data || [];
  if (allProperties.length > 6) {
    const shuffled = [...allProperties].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }

  return allProperties;
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  
  // Obtener imágenes aleatorias para cada propiedad destacada
  const propertiesWithImages = await Promise.all(
    featuredProperties.map(async (property) => {
      const internalId = property.ID_interno || property.internal_id;
      let imageUrl = '';
      if (internalId && property.status) {
        try {
          imageUrl = await getRandomPropertyImage(internalId, property.status);
        } catch (error) {
          console.error('Error obteniendo imagen:', error);
        }
      }
      return { ...property, imageUrl };
    })
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">
      
      {/* 1. HERO SECTION: Cinemática y Autoridad */}
      <section className="relative h-[85vh] sm:h-[90vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Fondo con Efecto Parallax sutil */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay de oscurecimiento */}
          <img 
            src="/casa-minimalista-moderna-con-piscina-y-sillas-de-sol.jpg" 
            alt="Luxury Real Estate Hero"
            className="w-full h-full object-cover scale-105 animate-slow-zoom" 
            style={{ animationDuration: '20s' }}
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block py-1.5 px-3 sm:px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-4 sm:mb-6 backdrop-blur-md">
            Real Estate Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-[0.95] sm:leading-[0.9] mb-4 sm:mb-8 px-2">
           Tu Inversión Inmobiliaria <br className="hidden sm:block" />
            <span className="font-bold text-white drop-shadow-lg">Segura y Rentable</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
            Protegemos tu patrimonio mediante selección experta y datos transparentes que reducen riesgos al mínimo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center px-4">
            <Link
              href="/propiedades"
              className="bg-[#22AADE] text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(34,170,222,0.4)] touch-manipulation"
              style={{ minHeight: '48px' }}
            >
              Ver Propiedades
            </Link>
            <Link
              href="/contacto"
              className="bg-white/5 border border-white/20 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all duration-300 backdrop-blur-sm touch-manipulation"
              style={{ minHeight: '48px' }}
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH: La "Isla" de Cristal Oscuro */}
      <section className="relative z-30 -mt-16 sm:-mt-20 md:-mt-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {/* Opción 1: Comprar */}
            <Link
              href="/venta"
              className="group p-6 sm:p-8 flex flex-col items-center text-center hover:bg-[#22AADE]/5 active:bg-[#22AADE]/10 transition-colors duration-500 touch-manipulation"
              style={{ minHeight: '120px' }}
            >
              <div className="mb-4 text-[#22AADE] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              </div>
              <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-1">Comprar</h3>
              <p className="text-gray-500 text-xs font-light">Propiedades exclusivas en venta</p>
            </Link>

            {/* Opción 2: Rentar */}
            <Link
              href="/renta"
              className="group p-6 sm:p-8 flex flex-col items-center text-center hover:bg-[#22AADE]/5 active:bg-[#22AADE]/10 transition-colors duration-500 touch-manipulation"
              style={{ minHeight: '120px' }}
            >
              <div className="mb-3 sm:mb-4 text-[#22AADE] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
              </div>
              <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-1">Rentar</h3>
              <p className="text-gray-500 text-xs font-light">Estancias de largo y corto plazo</p>
            </Link>

            {/* Opción 3: Asesoría */}
            <Link
              href="/contacto"
              className="group p-6 sm:p-8 flex flex-col items-center text-center hover:bg-[#22AADE]/5 active:bg-[#22AADE]/10 transition-colors duration-500 touch-manipulation"
              style={{ minHeight: '120px' }}
            >
              <div className="mb-4 text-[#22AADE] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-1">Asesoría</h3>
              <p className="text-gray-500 text-xs font-light">Consulta privada y valuación</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES: Estilo Galería */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
                Portafolio Selecto
              </h2>
              <h3 className="text-3xl md:text-5xl font-extralight tracking-tight text-white">
                Propiedades <span className="font-bold italic">Destacadas</span>
              </h3>
            </div>
            <p className="text-gray-500 font-light max-w-sm text-sm text-right hidden md:block">
              Una selección curada de residencias que cumplen con los más altos estándares de calidad y plusvalía.
            </p>
          </div>

          {propertiesWithImages.length > 0 ? (
            <>
              <FeaturedPropertiesCarousel properties={propertiesWithImages} />

              <div className="text-center mt-20">
                <Link
                  href="/propiedades"
                  className="inline-block border-b border-[#22AADE] pb-1 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-white transition-all duration-300"
                >
                  Ver Catálogo Completo
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 border border-white/5 rounded-xl bg-white/5">
              <p className="text-gray-400 mb-6 font-light">Inventario exclusivo actualizándose.</p>
              <Link
                href="/propiedades"
                className="inline-block bg-[#22AADE] text-black px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
              >
                Ver Todas las Propiedades
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY CHOOSE US: Diseño Editorial Minimalista */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Luz de fondo sutil */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4 tracking-tight">
              ¿Por Qué <span className="font-bold">Elegirnos?</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#22AADE] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Feature 01 */}
            <div className="group p-6 border-l border-white/10 hover:border-[#22AADE] transition-colors duration-500">
              <div className="text-5xl font-black text-[#22AADE]/20 group-hover:text-[#22AADE] transition-colors duration-500 mb-4">01.</div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">100% Confiable</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Todas nuestras propiedades son verificadas legalmente. Garantizamos certeza jurídica en cada operación.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="group p-6 border-l border-white/10 hover:border-[#22AADE] transition-colors duration-500">
              <div className="text-5xl font-black text-[#22AADE]/20 group-hover:text-[#22AADE] transition-colors duration-500 mb-4">02.</div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Enfocado en la Eficiencia</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Tecnología de Datos Análisis de mercado optimizado por IA para garantizar transacciones inteligentes y el valor más competitivo del sector.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="group p-6 border-l border-white/10 hover:border-[#22AADE] transition-colors duration-500">
              <div className="text-5xl font-black text-[#22AADE]/20 group-hover:text-[#22AADE] transition-colors duration-500 mb-4">03.</div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Asesoría Experta</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Un equipo multidisciplinario te acompaña desde la primera visita hasta la firma de escrituras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION: High-Ticket Finale */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">
        {/* Gradiente de luz inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
            ¿Listo para Encontrar <br />
            <span className="font-bold italic">Tu Propiedad Ideal?</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Nuestros asesores senior están listos para ofrecerte una experiencia inmobiliaria sin contratiempos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/propiedades"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Explorar Propiedades
            </Link>
            <Link
              href="/contacto"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}