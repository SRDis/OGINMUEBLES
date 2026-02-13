import Link from 'next/link';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Renders Arquitectónicos | Visualización 3D Profesional',
  description: 'Servicio de renders 3D arquitectónicos para proyectos inmobiliarios. Visualización fotorrealista de interiores, exteriores, desarrollos y remodelaciones.',
  alternates: {
    canonical: `${baseUrl}/renders`,
  },
  openGraph: {
    title: 'Renders Arquitectónicos | Oliver López Guijoza',
    description: 'Renders 3D fotorrealistas para visualizar tu propiedad antes de construir. Interiores, exteriores y recorridos virtuales.',
    url: `${baseUrl}/renders`,
    type: 'website',
  },
};

const renderTypes = [
  {
    title: 'Render Exterior',
    desc: 'Visualización fotorrealista de fachadas, jardines, terrazas y entorno completo de tu propiedad. Incluye vegetación, iluminación natural y materiales reales para una presentación impecable.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    features: ['Fachadas principales y laterales', 'Jardines y paisajismo', 'Iluminación diurna y nocturna', 'Contexto urbano o natural'],
  },
  {
    title: 'Render Interior',
    desc: 'Diseño y visualización de espacios interiores con acabados, mobiliario, textura e iluminación realista. Ideal para pre-venta, remodelación o diseño de interiores.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z',
    features: ['Salas, recámaras y cocinas', 'Acabados y materiales reales', 'Mobiliario y decoración', 'Iluminación artificial y natural'],
  },
  {
    title: 'Render de Desarrollo',
    desc: 'Presentación visual de proyectos de desarrollo inmobiliario completos: conjuntos residenciales, edificios, fraccionamientos y áreas comunes antes de que existan.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    features: ['Master plan visual', 'Áreas comunes y amenidades', 'Volumetría del conjunto', 'Material para inversionistas'],
  },
  {
    title: 'Recorrido Virtual 360°',
    desc: 'Experiencia inmersiva que permite al cliente explorar la propiedad desde cualquier ángulo. Compatible con dispositivos móviles y realidad virtual para una experiencia completa.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    features: ['Navegación interactiva', 'Compatible con VR', 'Embeddable en sitio web', 'Puntos de interés marcados'],
  },
  {
    title: 'Planta Arquitectónica 3D',
    desc: 'Transformamos planos 2D en plantas arquitectónicas tridimensionales que muestran la distribución de espacios, flujo de circulación y proporciones reales del proyecto.',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    features: ['Distribución de espacios', 'Acotaciones y medidas', 'Mobiliario incluido', 'Vista isométrica y superior'],
  },
  {
    title: 'Render para Marketing',
    desc: 'Material visual optimizado para campañas publicitarias, brochures, sitios web y redes sociales. Imágenes de alto impacto que venden antes de construir.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    features: ['Alta resolución (4K+)', 'Optimizado para digital e impreso', 'Branding integrado', 'Entregas en múltiples formatos'],
  },
];

const steps = [
  {
    num: '01',
    title: 'Briefing del Proyecto',
    desc: 'Recopilamos planos, referencias visuales, paleta de materiales y toda la información necesaria para entender la visión de tu proyecto.',
  },
  {
    num: '02',
    title: 'Modelado 3D',
    desc: 'Creamos el modelo tridimensional de tu propiedad con dimensiones exactas, estructura arquitectónica y distribución de espacios.',
  },
  {
    num: '03',
    title: 'Texturizado e Iluminación',
    desc: 'Aplicamos materiales realistas, acabados, mobiliario y configuramos la iluminación para lograr un resultado fotorrealista.',
  },
  {
    num: '04',
    title: 'Revisión y Ajustes',
    desc: 'Te presentamos una vista preliminar para que revises y solicites ajustes en ángulos, materiales, colores o cualquier detalle.',
  },
  {
    num: '05',
    title: 'Entrega Final',
    desc: 'Entregamos las imágenes en alta resolución en los formatos que necesites, listas para impresión, web o presentaciones a inversionistas.',
  },
];

const faqs = [
  {
    question: '¿Qué necesitan para empezar un render?',
    answer: 'Necesitamos los planos arquitectónicos (de preferencia en formato CAD o PDF), referencias visuales del estilo deseado, especificaciones de materiales/acabados y cualquier requerimiento especial. Si no tienes planos, podemos trabajar con bocetos o fotografías de referencia.',
  },
  {
    question: '¿Cuánto tiempo tarda un render?',
    answer: 'El tiempo varía según la complejidad: un render exterior básico toma entre 5-7 días hábiles, un interior 3-5 días, y un proyecto de desarrollo completo puede tomar 2-3 semanas. Los recorridos virtuales requieren 2-4 semanas adicionales.',
  },
  {
    question: '¿Cuántas revisiones incluye el servicio?',
    answer: 'Incluimos 2 rondas de revisiones en cada proyecto. La primera es sobre el modelo 3D (estructura y distribución) y la segunda sobre materiales, iluminación y acabados finales. Revisiones adicionales tienen un costo separado.',
  },
  {
    question: '¿En qué formatos entregan los renders?',
    answer: 'Entregamos en JPG o PNG de alta resolución (4K o superior). Para impresión proporcionamos archivos TIFF a 300 DPI. Los recorridos virtuales se entregan como enlaces web embeddables compatibles con cualquier plataforma.',
  },
  {
    question: '¿Pueden renderizar propiedades existentes para remodelación?',
    answer: 'Sí, podemos tomar como base fotografías y medidas de una propiedad existente para visualizar cómo se vería con remodelaciones, ampliaciones o cambios de diseño interior antes de ejecutar la obra.',
  },
  {
    question: '¿Sirve para pre-venta de desarrollos?',
    answer: 'Absolutamente. Los renders son una herramienta fundamental para la pre-venta de desarrollos inmobiliarios. Permiten al comprador visualizar el proyecto terminado, generando confianza y acelerando la decisión de compra.',
  },
];

export default function RendersPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* ============================================= */}
      {/* 1. HERO SECTION */}
      {/* ============================================= */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#22AADE]/3 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Renders Arquitectónicos · Visualización 3D
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Visualiza tu proyecto{' '}
              <span className="font-bold italic text-[#22AADE]">antes de construirlo</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Renders fotorrealistas que transforman planos en experiencias visuales.
              Exteriores, interiores y recorridos virtuales para vender, convencer y construir.
              <strong className="text-white"> Tu visión, hecha imagen.</strong>
            </p>

            {/* Tags de servicios */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 flex-wrap">
              {['Exteriores', 'Interiores', 'Desarrollos', '360° Virtual'].map((service) => (
                <span key={service} className="text-gray-500 text-sm md:text-base font-light border border-white/10 px-4 py-2 rounded-full bg-white/5 hover:border-[#22AADE]/30 hover:text-white transition-all">
                  {service}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/contacto"
                className="bg-[#22AADE] text-black px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(34,170,222,0.4)]"
              >
                Solicitar Cotización
              </Link>
              <a
                href="#proceso"
                className="bg-white/5 border border-white/20 text-white px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Ver Proceso
              </a>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-light">
              Cotización personalizada. Entrega de vista previa en 5 días hábiles.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 2. PROPUESTA DE VALOR */}
      {/* ============================================= */}
      <section className="py-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { stat: '4K+', label: 'Resolución', desc: 'Imágenes fotorrealistas en ultra alta definición' },
              { stat: '360°', label: 'Inmersión', desc: 'Recorridos virtuales interactivos navegables' },
              { stat: '100%', label: 'Personalización', desc: 'Cada render adaptado a tu proyecto específico' },
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
      {/* 3. EJEMPLO VISUAL — Antes/Después SVG */}
      {/* ============================================= */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Del Plano al Render
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Transformamos ideas en{' '}
              <span className="font-bold">realidad visual</span>
            </h3>
          </div>

          {/* Ejemplo SVG — Comparativa Plano vs Render */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Arquitectónico */}
            <div className="bg-[#050505] border border-white/10 rounded-sm p-6 hover:border-[#22AADE]/30 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-xs">01</span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Plano Original</span>
              </div>
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                <rect x="0" y="0" width="400" height="300" fill="#080808" stroke="#1a1a1a" strokeWidth="1"/>
                {/* Muros exteriores */}
                <rect x="40" y="40" width="320" height="220" fill="none" stroke="#333" strokeWidth="3"/>
                {/* Divisiones interiores */}
                <line x1="200" y1="40" x2="200" y2="180" stroke="#333" strokeWidth="2"/>
                <line x1="40" y1="180" x2="360" y2="180" stroke="#333" strokeWidth="2"/>
                <line x1="120" y1="180" x2="120" y2="260" stroke="#333" strokeWidth="2"/>
                <line x1="280" y1="180" x2="280" y2="260" stroke="#333" strokeWidth="2"/>
                {/* Puertas */}
                <path d="M 195 180 A 20 20 0 0 1 175 200" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,2"/>
                <line x1="195" y1="180" x2="175" y2="180" stroke="#22AADE" strokeWidth="1.5"/>
                <path d="M 125 180 A 20 20 0 0 0 145 200" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="3,2"/>
                <line x1="125" y1="180" x2="145" y2="180" stroke="#22AADE" strokeWidth="1.5"/>
                {/* Ventanas */}
                <line x1="80" y1="40" x2="160" y2="40" stroke="#22AADE" strokeWidth="2"/>
                <line x1="240" y1="40" x2="320" y2="40" stroke="#22AADE" strokeWidth="2"/>
                {/* Etiquetas */}
                <text x="120" y="118" textAnchor="middle" fill="#555" fontSize="11" fontFamily="system-ui">SALA</text>
                <text x="300" y="118" textAnchor="middle" fill="#555" fontSize="11" fontFamily="system-ui">COMEDOR</text>
                <text x="80" y="228" textAnchor="middle" fill="#555" fontSize="10" fontFamily="system-ui">RECÁMARA</text>
                <text x="200" y="228" textAnchor="middle" fill="#555" fontSize="10" fontFamily="system-ui">BAÑO</text>
                <text x="320" y="228" textAnchor="middle" fill="#555" fontSize="10" fontFamily="system-ui">COCINA</text>
                {/* Cotas */}
                <line x1="40" y1="280" x2="360" y2="280" stroke="#22AADE" strokeWidth="0.5" strokeDasharray="4,3"/>
                <text x="200" y="295" textAnchor="middle" fill="#22AADE" fontSize="9" fontFamily="system-ui">12.00 m</text>
                <line x1="380" y1="40" x2="380" y2="260" stroke="#22AADE" strokeWidth="0.5" strokeDasharray="4,3"/>
                <text x="390" y="155" fill="#22AADE" fontSize="9" fontFamily="system-ui" transform="rotate(90, 390, 155)">8.50 m</text>
              </svg>
            </div>

            {/* Render Fotorrealista (SVG representativo) */}
            <div className="bg-[#050505] border border-[#22AADE]/20 rounded-sm p-6 hover:border-[#22AADE]/50 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#22AADE]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#22AADE] font-bold text-xs">02</span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#22AADE] font-bold">Render 3D</span>
              </div>
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a2a3a"/>
                    <stop offset="100%" stopColor="#22AADE" stopOpacity="0.15"/>
                  </linearGradient>
                  <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5f0eb"/>
                    <stop offset="100%" stopColor="#d4ccc3"/>
                  </linearGradient>
                  <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d3530"/>
                    <stop offset="100%" stopColor="#2a2420"/>
                  </linearGradient>
                  <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2d4a2e"/>
                    <stop offset="100%" stopColor="#1a3a1c"/>
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#22AADE" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#22AADE" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Cielo */}
                <rect x="0" y="0" width="400" height="200" fill="url(#skyGrad)"/>
                {/* Césped */}
                <rect x="0" y="200" width="400" height="100" fill="url(#grassGrad)"/>
                {/* Camino */}
                <path d="M 180 300 L 190 200 L 210 200 L 220 300 Z" fill="#8a8070" opacity="0.7"/>
                {/* Casa — cuerpo principal */}
                <rect x="80" y="100" width="240" height="100" fill="url(#wallGrad)"/>
                {/* Techo */}
                <polygon points="60,100 200,40 340,100" fill="url(#roofGrad)"/>
                {/* Ventanas con glow */}
                <rect x="110" y="120" width="50" height="40" fill="#22AADE" opacity="0.25" rx="2"/>
                <rect x="112" y="122" width="46" height="36" fill="#1a2a3a" rx="1"/>
                <rect x="240" y="120" width="50" height="40" fill="#22AADE" opacity="0.25" rx="2"/>
                <rect x="242" y="122" width="46" height="36" fill="#1a2a3a" rx="1"/>
                {/* Puerta */}
                <rect x="185" y="140" width="30" height="60" fill="#3d3530" rx="2"/>
                <circle cx="210" cy="172" r="2" fill="#c0a060"/>
                {/* Luz puerta */}
                <ellipse cx="200" cy="200" rx="40" ry="8" fill="url(#glowGrad)"/>
                {/* Árbol izq */}
                <rect x="38" y="150" width="8" height="50" fill="#4a3a2e"/>
                <circle cx="42" cy="135" r="25" fill="#2d5a30" opacity="0.8"/>
                <circle cx="35" cy="145" r="18" fill="#3d6a3e" opacity="0.6"/>
                {/* Árbol der */}
                <rect x="348" y="140" width="8" height="60" fill="#4a3a2e"/>
                <circle cx="352" cy="125" r="30" fill="#2d5a30" opacity="0.7"/>
                <circle cx="360" cy="138" r="20" fill="#3d6a3e" opacity="0.5"/>
                {/* Estrellas */}
                <circle cx="50" cy="20" r="1" fill="white" opacity="0.5"/>
                <circle cx="120" cy="15" r="1" fill="white" opacity="0.3"/>
                <circle cx="300" cy="25" r="1" fill="white" opacity="0.4"/>
                <circle cx="370" cy="12" r="1" fill="white" opacity="0.6"/>
                {/* Label */}
                <rect x="10" y="270" width="80" height="20" rx="3" fill="#22AADE" opacity="0.15"/>
                <text x="50" y="284" textAnchor="middle" fill="#22AADE" fontSize="8" fontFamily="system-ui" fontWeight="bold">RENDER 3D</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 4. TIPOS DE RENDER (Grid) */}
      {/* ============================================= */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Tipos de Render
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Soluciones visuales para cada{' '}
              <span className="font-bold">necesidad</span>
            </h3>
            <p className="text-gray-500 font-light">
              Desde una fachada fotorrealista hasta recorridos virtuales inmersivos,
              ofrecemos la visualización que tu proyecto necesita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-white/5 p-8 hover:border-[#22AADE]/50 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={type.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{type.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm mb-6">
                  {type.desc}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-3 h-3 text-[#22AADE] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 5. PROCESO (Timeline) */}
      {/* ============================================= */}
      <section id="proceso" className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Nuestro Proceso
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              De la idea al <span className="font-bold italic">render final</span>
            </h3>
            <p className="text-gray-500 font-light">
              Un proceso claro y ordenado que garantiza resultados de la más alta calidad
              con tu aprobación en cada etapa.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 group mb-2 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#050505] border border-white/10 group-hover:border-[#22AADE] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0">
                    <span className="text-[#22AADE] font-black text-sm">{step.num}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-[1px] h-full min-h-[40px] bg-white/10 group-hover:bg-[#22AADE]/30 transition-colors" />
                  )}
                </div>
                <div className="pb-10">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#22AADE] transition-colors uppercase tracking-wider">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 6. FORMATOS DE ENTREGA */}
      {/* ============================================= */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Formatos de Entrega
            </h2>
            <h3 className="text-2xl md:text-3xl font-extralight text-white">
              Archivos listos para <span className="font-bold">cualquier plataforma</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { format: 'JPG / PNG', desc: 'Alta resolución web', color: '#22AADE' },
              { format: 'TIFF', desc: '300 DPI impresión', color: '#22AADE' },
              { format: 'MP4 / MOV', desc: 'Recorridos en video', color: '#22AADE' },
              { format: 'HTML / Web', desc: 'Tours 360° interactivos', color: '#22AADE' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 text-center hover:border-[#22AADE]/30 transition-colors group">
                <p className="text-xl font-black text-white mb-1 tracking-tight group-hover:text-[#22AADE] transition-colors">{item.format}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 7. FAQ */}
      {/* ============================================= */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
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
                className="bg-[#050505] border border-white/5 hover:border-[#22AADE]/30 rounded-sm p-6 md:p-8 transition-colors duration-500 group"
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
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
            Dale vida a tu proyecto con{' '}
            <br />
            <span className="font-bold italic">renders profesionales</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Convierte planos en imágenes que venden. Visualiza, convence y construye con confianza.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/propiedades"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
            >
              Ver Portafolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
