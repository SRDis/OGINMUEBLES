import Link from 'next/link';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { getRandomPropertyImage } from '@/lib/cloudinary';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Locaciones para TV y Cine | Propiedades para Filmación',
  description: 'Encuentra la locación perfecta para tu producción de TV, cine, publicidad o sesiones fotográficas. Propiedades exclusivas disponibles para filmación en Valle de Bravo y CDMX.',
  alternates: {
    canonical: `${baseUrl}/locaciones`,
  },
  openGraph: {
    title: 'Locaciones para Producciones | Oliver López Guijoza',
    description: 'Propiedades exclusivas disponibles como locaciones para TV, cine, publicidad y fotografía profesional.',
    url: `${baseUrl}/locaciones`,
    type: 'website',
  },
};

const advantages = [
  {
    title: 'Propiedades Exclusivas',
    desc: 'Acceso a casas de lujo, cabañas, terrenos, fincas y departamentos con arquitectura única. Espacios que aportan carácter y autenticidad a cualquier producción audiovisual.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    title: 'Ubicaciones Cinematográficas',
    desc: 'Valle de Bravo, bosques, lagos, arquitectura colonial y moderna. Locaciones que ofrecen la diversidad visual que tu proyecto necesita: desde lo rústico hasta lo ultra contemporáneo.',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Gestión Integral',
    desc: 'Nos encargamos de toda la logística: permisos del propietario, acceso a la propiedad, coordinación de horarios y protección del inmueble durante la producción.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    title: 'Scouting Personalizado',
    desc: 'Si no encuentras la locación ideal en nuestro catálogo, realizamos búsqueda personalizada según las necesidades específicas de tu guion, dirección de arte o brief creativo.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    title: 'Producción Fotográfica',
    desc: 'Locaciones perfectas para sesiones de moda, catálogos, publicidad editorial y contenido digital. Espacios con iluminación natural excepcional y ambientes de revista.',
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Flexibilidad Total',
    desc: 'Disponibilidad para filmaciones de un día, producciones de semanas o uso recurrente. Adaptamos horarios, accesos y condiciones a los requerimientos de cada producción.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

const productionTypes = [
  {
    title: 'Cine y Series',
    desc: 'Largometrajes, cortometrajes, series de TV y plataformas de streaming. Locaciones con el carácter y la versatilidad que requiere la narrativa cinematográfica.',
    icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  },
  {
    title: 'Comerciales y Publicidad',
    desc: 'Spots publicitarios para TV, digital y redes sociales. Propiedades que comunican aspiración, estilo de vida y exclusividad para posicionar tu marca.',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    title: 'Fotografía Editorial',
    desc: 'Sesiones para revistas, catálogos de moda, lookbooks, fotografía de arquitectura y decoración. Espacios con estética impecable e iluminación natural.',
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Eventos y Contenido Digital',
    desc: 'Grabación de podcasts, contenido para YouTube, TikTok, Instagram. Sesiones de branding personal, workshops creativos y eventos exclusivos.',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  },
];

const faqs = [
  {
    question: '¿Qué tipo de propiedades están disponibles?',
    answer: 'Contamos con un portafolio diverso: casas de lujo modernas y coloniales, cabañas en el bosque, departamentos con vistas panorámicas, terrenos abiertos, fincas campestres, jardines y espacios con alberca. Cada propiedad tiene características únicas para diferentes estilos visuales.',
  },
  {
    question: '¿Cómo funciona el proceso de reserva?',
    answer: 'Compartes tu brief o necesidades, te presentamos opciones disponibles, coordinamos una visita de scouting si lo requieres, y una vez seleccionada la locación, formalizamos con un contrato de uso que incluye horarios, condiciones y seguro.',
  },
  {
    question: '¿Cuánto cuesta rentar una locación?',
    answer: 'El costo varía según la propiedad, duración de la producción, tamaño del equipo y servicios adicionales. Ofrecemos tarifas por día, medio día o por hora. Solicita una cotización personalizada con los detalles de tu proyecto.',
  },
  {
    question: '¿Se pueden hacer modificaciones en la propiedad?',
    answer: 'Dependiendo del propietario y la propiedad, se permiten modificaciones temporales de set design y decoración. Todo se acuerda previamente y la propiedad debe quedar en su estado original al finalizar la producción.',
  },
  {
    question: '¿Ofrecen servicios adicionales?',
    answer: 'Sí, podemos coordinar servicios complementarios: catering, estacionamiento para equipo de producción, generadores eléctricos, seguridad privada, limpieza post-producción y hospedaje para el crew en propiedades cercanas.',
  },
  {
    question: '¿Trabajan con producciones internacionales?',
    answer: 'Sí, tenemos experiencia coordinando con equipos de producción nacionales e internacionales. Ofrecemos asistencia bilingüe y conocemos los requerimientos logísticos de producciones de gran escala.',
  },
];

async function getLocationProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .limit(6)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties for locations:', error);
    return [];
  }

  const properties = data || [];
  
  const propsWithImages = await Promise.all(
    properties.map(async (property) => {
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

  return propsWithImages;
}

export default async function LocacionesPage() {
  const properties = await getLocationProperties();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* ============================================= */}
      {/* 1. HERO SECTION */}
      {/* ============================================= */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22AADE]/3 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Locaciones para Producciones
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Propiedades para{' '}
              <span className="font-bold italic text-[#22AADE]">TV y Cine</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Encuentra la locación perfecta para tu producción audiovisual. 
              Propiedades exclusivas con carácter cinematográfico en las mejores ubicaciones.
              <strong className="text-white"> Tu set, nuestras propiedades.</strong>
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 flex-wrap">
              {['Cine', 'Series', 'Publicidad', 'Fotografía'].map((s) => (
                <span key={s} className="text-gray-500 text-sm md:text-base font-light border border-white/10 px-4 py-2 rounded-full bg-white/5 hover:border-[#22AADE]/30 hover:text-white transition-all">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/contacto"
                className="bg-[#22AADE] text-black px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(34,170,222,0.4)]"
              >
                Solicitar Scouting
              </Link>
              <a
                href="#propiedades"
                className="bg-white/5 border border-white/20 text-white px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Ver Propiedades Disponibles
              </a>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-light">
              Gestión integral: permisos, logística y coordinación para tu producción.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 2. STATS */}
      {/* ============================================= */}
      <section className="py-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { stat: '24/7', label: 'Disponibilidad', desc: 'Locaciones disponibles las 24 horas del día, los 365 días del año' },
              { stat: '360°', label: 'Gestión Integral', desc: 'Permisos, logística, seguros y coordinación total' },
              { stat: '100%', label: 'Confianza', desc: 'Locaciones con carácter cinematográfico en las mejores ubicaciones' },
            ].map((item, idx) => (
              <div key={idx} className="p-8 text-center group">
                <p className="text-4xl md:text-5xl font-black text-[#22AADE] mb-2">{item.stat}</p>
                <p className="text-white font-bold uppercase tracking-wider text-sm mb-2">{item.label}</p>
                <p className="text-gray-500 font-light text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 3. TIPOS DE PRODUCCIÓN */}
      {/* ============================================= */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Para Todo Tipo de Producción
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Tu escenario{' '}
              <span className="font-bold">ideal existe aquí</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productionTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-[#050505] border border-white/5 p-8 hover:border-[#22AADE]/50 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={type.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{type.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 4. PROPIEDADES DISPONIBLES */}
      {/* ============================================= */}
      <section id="propiedades" className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Catálogo de Locaciones
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Propiedades <span className="font-bold italic">disponibles</span>
            </h3>
            <p className="text-gray-500 font-light">
              Explora algunas de nuestras propiedades disponibles como locación.
              Cada una ofrece un ambiente y estilo únicos para tu producción.
            </p>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, idx) => (
                <div key={idx} className="group bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden hover:border-[#22AADE]/40 transition-all duration-500">
                  {/* Imagen */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
                    {property.imageUrl ? (
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#22AADE] text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Disponible
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h4 className="text-white font-bold mb-1 text-sm uppercase tracking-wider group-hover:text-[#22AADE] transition-colors">
                      {property.title}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                      <svg className="w-3.5 h-3.5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="font-light">{property.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {property.property_type && (
                        <span className="border border-white/10 px-2 py-0.5 rounded-full">{property.property_type}</span>
                      )}
                      {property.bedrooms && (
                        <span>{property.bedrooms} recámaras</span>
                      )}
                      {property.area && (
                        <span>{property.area} m²</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/5 rounded-sm bg-white/5">
              <p className="text-gray-400 mb-6 font-light">Catálogo de locaciones actualizándose.</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              href="/propiedades"
              className="inline-block border-b border-[#22AADE] pb-1 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-white transition-all duration-300"
            >
              Ver Todas las Propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 5. VENTAJAS */}
      {/* ============================================= */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Ventajas de trabajar <span className="font-bold italic">con nosotros</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => (
              <div
                key={idx}
                className="bg-[#050505] border border-white/5 p-8 hover:border-[#22AADE]/50 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={adv.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{adv.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 6. SERVICIO ALIADO — CHEF EN CASA & CATERING */}
      {/* ============================================= */}
      <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-4 border border-amber-400/30 rounded-full bg-amber-400/10 text-amber-400 text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              Servicio Aliado para Producciones
            </span>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Chef en Casa &{' '}
              <span className="font-bold italic">Catering Profesional</span>
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Completa tu producción con un servicio gastronómico de primer nivel. Nuestro aliado ofrece
              catering profesional diseñado para sets de filmación, wrap parties, comidas de crew
              y eventos relacionados con tu proyecto audiovisual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Catering para Crew',
                desc: 'Alimentación profesional para el equipo de producción: desayunos, comidas y snacks durante las jornadas de filmación. Menús variados y energéticos para mantener al equipo al 100%.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              },
              {
                title: 'Eventos en Locación',
                desc: 'Cenas de pre-producción, wrap parties, lanzamientos de temporada y eventos corporativos para marcas. Montaje completo con chef, meseros, barra y ambientación gastronómica.',
                icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546M12 2v4m0 0a2 2 0 100 4 2 2 0 000-4zm-8 8h16',
              },
              {
                title: 'Experiencias Gourmet',
                desc: 'Menús degustación exclusivos, cocina de autor, maridaje con vinos y experiencias culinarias temáticas. Perfecto para clientes VIP, inversionistas o eventos de marca premium.',
                icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-amber-500/30 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-500">
                  <svg className="w-6 h-6 text-amber-400 group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA con nota */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-white font-bold mb-1">¿Necesitas catering para tu producción?</h4>
                  <p className="text-gray-500 text-sm font-light">
                    Coordinamos todo con nuestro aliado gastronómico. Desde box lunches para el crew
                    hasta cenas de gala — con la misma calidad que exiges en tus producciones.
                  </p>
                </div>
                <Link
                  href="/contacto"
                  className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:from-amber-400 hover:to-amber-500 transition-all whitespace-nowrap"
                >
                  Solicitar Catering
                </Link>
              </div>
              <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-6 pt-4 border-t border-white/5">
                Servicio operado por aliado gastronómico certificado · Cotización personalizada sin compromiso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 7. FAQ */}
      {/* ============================================= */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Resolvemos tus Dudas
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Preguntas <span className="font-bold italic">Frecuentes</span>
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-white/5 hover:border-[#22AADE]/30 rounded-sm p-6 md:p-8 transition-colors duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#22AADE] transition-colors duration-500">
                    <span className="text-[#22AADE] font-bold text-xs group-hover:text-black transition-colors duration-500">?</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 text-base md:text-lg">{faq.question}</h4>
                    <p className="text-gray-500 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 8. CTA FINAL */}
      {/* ============================================= */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
            La locación perfecta <br />
            <span className="font-bold italic">para tu producción</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto y te presentamos las mejores opciones
            de locación con gestión integral incluida.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Solicitar Scouting
            </Link>
            <Link
              href="/propiedades"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
            >
              Ver Propiedades
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
