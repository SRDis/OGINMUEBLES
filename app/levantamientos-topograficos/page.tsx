import Link from 'next/link';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Levantamientos Topográficos | Planos, Mediciones y Estudios de Terreno',
  description: 'Servicio profesional de levantamientos topográficos. Planos de terrenos, mediciones con equipo de precisión, estudios altimétricos y planimétricos. Documentación técnica para tu propiedad.',
  alternates: {
    canonical: `${baseUrl}/levantamientos-topograficos`,
  },
  openGraph: {
    title: 'Levantamientos Topográficos Profesionales | Oliver López Guijoza',
    description: 'Levantamientos topográficos con equipo de última generación. Planos, mediciones y estudios técnicos para tu propiedad o terreno.',
    url: `${baseUrl}/levantamientos-topograficos`,
    type: 'website',
  },
};

const services = [
  {
    title: 'Levantamiento Planimétrico',
    desc: 'Medición precisa de los límites, forma y área de tu terreno. Generamos planos con coordenadas georeferenciadas, colindancias y superficie exacta para trámites legales y de construcción.',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
  {
    title: 'Levantamiento Altimétrico',
    desc: 'Determinación de elevaciones y desniveles del terreno mediante nivelación de precisión. Ideal para diseño de drenajes, terrazas, vialidades y proyectos arquitectónicos que requieren datos de alturas.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    title: 'Planos Topográficos Completos',
    desc: 'Elaboración de planos topográficos con curvas de nivel, puntos de control, infraestructura existente y todos los elementos del terreno. Entregables en formato digital (DWG, PDF) e impreso.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Subdivisión y Lotificación',
    desc: 'División técnica de terrenos en lotes con medidas exactas, áreas de donación, vialidades y servidumbres. Documentación lista para trámites municipales y registro público.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z',
  },
  {
    title: 'Deslinde y Amojonamiento',
    desc: 'Identificación y marcación física de los límites de tu propiedad con monumentos topográficos. Resolución de conflictos de linderos y verificación de escrituras vs. realidad del terreno.',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Estudios para Construcción',
    desc: 'Levantamientos especializados para proyectos de construcción: trazo y nivelación, control de obra, verificación de cimentaciones y monitoreo de movimientos de tierra durante la obra.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
];

const steps = [
  {
    num: '01',
    title: 'Consulta Inicial',
    desc: 'Analizamos tus necesidades: propósito del levantamiento, ubicación del terreno, documentación existente (escrituras, planos previos) y requerimientos específicos del proyecto.',
  },
  {
    num: '02',
    title: 'Trabajo de Campo',
    desc: 'Nuestro equipo de topógrafos realiza las mediciones in situ con estación total, GPS diferencial y drones. Capturamos todos los puntos, detalles y elementos relevantes del terreno.',
  },
  {
    num: '03',
    title: 'Procesamiento de Datos',
    desc: 'En gabinete procesamos las mediciones, calculamos áreas, generamos curvas de nivel, verificamos colindancias y elaboramos la representación gráfica técnica del terreno.',
  },
  {
    num: '04',
    title: 'Entrega de Planos y Reportes',
    desc: 'Recibes planos topográficos profesionales en formato digital (DWG, PDF) e impreso, reporte técnico con memoria de cálculo, y toda la documentación necesaria para tus trámites.',
  },
];

const faqs = [
  {
    question: '¿Para qué necesito un levantamiento topográfico?',
    answer: 'Es indispensable para compraventa de terrenos, trámites de escrituración, permisos de construcción, subdivisiones, fusiones, resolución de conflictos de linderos, y cualquier proyecto que requiera conocer con precisión las dimensiones y características de tu terreno.',
  },
  {
    question: '¿Cuánto tiempo toma un levantamiento?',
    answer: 'El trabajo de campo puede tomar de 1 día a 1 semana dependiendo del tamaño y complejidad del terreno. El procesamiento y entrega de planos generalmente toma de 3 a 5 días hábiles adicionales.',
  },
  {
    question: '¿Qué equipo utilizan?',
    answer: 'Utilizamos estación total de alta precisión, GPS diferencial (RTK), drones con cámaras de fotogrametría, niveles ópticos y software especializado de última generación para el procesamiento de datos.',
  },
  {
    question: '¿Los planos sirven para trámites legales?',
    answer: 'Sí. Nuestros planos cumplen con las especificaciones técnicas requeridas por el Registro Público de la Propiedad, catastro, notarías y autoridades municipales. Son elaborados y firmados por profesionales certificados.',
  },
  {
    question: '¿Trabajan en zonas rurales y boscosas?',
    answer: 'Sí, nuestro equipo tiene experiencia en todo tipo de terrenos: urbanos, rurales, boscosos, con pendientes pronunciadas, acceso limitado y cualquier condición topográfica. Nos adaptamos a cada situación.',
  },
];

/* ===========================
   COMPONENTE: Ejemplo de Plano Topográfico (SVG estilizado)
   =========================== */
function TopoPlanExample({ title, subtitle, type }: { title: string; subtitle: string; type: 'planimetric' | 'altimetric' | 'subdivision' }) {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-sm p-6 hover:border-[#22AADE]/40 transition-all duration-500 group">
      {/* Plano SVG */}
      <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden mb-6">
        {/* Grid de fondo */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${type}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#22AADE" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${type})`} />
        </svg>

        {type === 'planimetric' && (
          <svg viewBox="0 0 400 300" className="relative z-10 w-full h-full p-4">
            {/* Terreno irregular */}
            <polygon points="60,50 180,30 340,60 360,150 320,260 200,280 80,250 40,180" fill="none" stroke="#22AADE" strokeWidth="1.5" strokeDasharray="0" className="group-hover:stroke-white transition-colors duration-500" />
            {/* Vértices con etiquetas */}
            {[
              { x: 60, y: 50, label: 'V1' }, { x: 180, y: 30, label: 'V2' },
              { x: 340, y: 60, label: 'V3' }, { x: 360, y: 150, label: 'V4' },
              { x: 320, y: 260, label: 'V5' }, { x: 200, y: 280, label: 'V6' },
              { x: 80, y: 250, label: 'V7' }, { x: 40, y: 180, label: 'V8' },
            ].map((v, i) => (
              <g key={i}>
                <circle cx={v.x} cy={v.y} r="4" fill="#22AADE" className="group-hover:fill-white transition-colors duration-500" />
                <text x={v.x + 8} y={v.y - 8} fill="#22AADE" fontSize="10" fontFamily="monospace" className="group-hover:fill-white transition-colors duration-500">{v.label}</text>
              </g>
            ))}
            {/* Medidas en lados */}
            <text x="115" y="28" fill="#666" fontSize="9" fontFamily="monospace">42.30 m</text>
            <text x="265" y="35" fill="#666" fontSize="9" fontFamily="monospace">55.18 m</text>
            <text x="355" y="110" fill="#666" fontSize="9" fontFamily="monospace" transform="rotate(80, 355, 110)">30.72 m</text>
            <text x="345" y="215" fill="#666" fontSize="9" fontFamily="monospace" transform="rotate(-70, 345, 215)">38.45 m</text>
            <text x="250" y="283" fill="#666" fontSize="9" fontFamily="monospace">41.90 m</text>
            <text x="125" y="278" fill="#666" fontSize="9" fontFamily="monospace">33.62 m</text>
            <text x="42" y="220" fill="#666" fontSize="9" fontFamily="monospace" transform="rotate(-80, 42, 220)">24.80 m</text>
            <text x="35" y="120" fill="#666" fontSize="9" fontFamily="monospace" transform="rotate(-75, 35, 120)">44.15 m</text>
            {/* Norte */}
            <g transform="translate(350, 270)">
              <line x1="0" y1="20" x2="0" y2="-5" stroke="#22AADE" strokeWidth="1.5" />
              <polygon points="0,-5 -4,5 4,5" fill="#22AADE" />
              <text x="-3" y="-10" fill="#22AADE" fontSize="10" fontWeight="bold" fontFamily="monospace">N</text>
            </g>
            {/* Área */}
            <text x="160" y="165" fill="#22AADE" fontSize="14" fontWeight="bold" fontFamily="monospace" opacity="0.6">A = 2,847.35 m²</text>
          </svg>
        )}

        {type === 'altimetric' && (
          <svg viewBox="0 0 400 300" className="relative z-10 w-full h-full p-4">
            {/* Curvas de nivel */}
            {[
              { d: 'M30,260 Q100,250 160,255 Q220,260 300,250 Q360,245 390,250', label: '2,200' },
              { d: 'M40,220 Q110,200 170,210 Q240,220 310,205 Q370,195 390,200', label: '2,210' },
              { d: 'M50,180 Q120,155 180,165 Q250,175 320,155 Q370,145 385,150', label: '2,220' },
              { d: 'M60,140 Q130,110 190,125 Q260,135 330,110 Q365,100 380,105', label: '2,230' },
              { d: 'M80,100 Q150,70 210,85 Q280,95 340,70 Q365,60 380,65', label: '2,240' },
              { d: 'M110,65 Q180,35 240,48 Q300,55 350,35 Q370,28 380,32', label: '2,250' },
            ].map((curve, i) => (
              <g key={i}>
                <path d={curve.d} fill="none" stroke="#22AADE" strokeWidth={i % 2 === 0 ? '1.5' : '0.6'} opacity={i % 2 === 0 ? 0.8 : 0.4} className="group-hover:opacity-100 transition-opacity duration-500" />
                {i % 2 === 0 && (
                  <text x="10" y={260 - i * 40 + 4} fill="#666" fontSize="8" fontFamily="monospace">{curve.label}</text>
                )}
              </g>
            ))}
            {/* Puntos de control */}
            {[
              { x: 100, y: 240, elev: '2,203.45' },
              { x: 200, y: 180, elev: '2,218.72' },
              { x: 300, y: 120, elev: '2,232.10' },
              { x: 250, y: 60, elev: '2,248.33' },
              { x: 150, y: 130, elev: '2,226.87' },
            ].map((pt, i) => (
              <g key={i}>
                <line x1={pt.x - 4} y1={pt.y} x2={pt.x + 4} y2={pt.y} stroke="#22AADE" strokeWidth="1" />
                <line x1={pt.x} y1={pt.y - 4} x2={pt.x} y2={pt.y + 4} stroke="#22AADE" strokeWidth="1" />
                <text x={pt.x + 8} y={pt.y + 3} fill="#22AADE" fontSize="7" fontFamily="monospace" opacity="0.8">{pt.elev}</text>
              </g>
            ))}
            {/* Título de escala */}
            <text x="280" y="285" fill="#666" fontSize="8" fontFamily="monospace">Equidistancia: 10 m</text>
            {/* Norte */}
            <g transform="translate(370, 270)">
              <line x1="0" y1="15" x2="0" y2="-5" stroke="#22AADE" strokeWidth="1.5" />
              <polygon points="0,-5 -4,5 4,5" fill="#22AADE" />
              <text x="-3" y="-10" fill="#22AADE" fontSize="10" fontWeight="bold" fontFamily="monospace">N</text>
            </g>
          </svg>
        )}

        {type === 'subdivision' && (
          <svg viewBox="0 0 400 300" className="relative z-10 w-full h-full p-4">
            {/* Terreno principal */}
            <rect x="40" y="30" width="320" height="240" fill="none" stroke="#22AADE" strokeWidth="1.5" opacity="0.3" />
            {/* Lotes */}
            {[
              { x: 40, y: 30, w: 106, h: 120, label: 'Lote 1', area: '318 m²' },
              { x: 146, y: 30, w: 107, h: 120, label: 'Lote 2', area: '321 m²' },
              { x: 253, y: 30, w: 107, h: 120, label: 'Lote 3', area: '321 m²' },
              { x: 40, y: 170, w: 106, h: 100, label: 'Lote 4', area: '265 m²' },
              { x: 146, y: 170, w: 107, h: 100, label: 'Lote 5', area: '268 m²' },
              { x: 253, y: 170, w: 107, h: 100, label: 'Lote 6', area: '268 m²' },
            ].map((lot, i) => (
              <g key={i}>
                <rect x={lot.x} y={lot.y} width={lot.w} height={lot.h} fill="none" stroke="#22AADE" strokeWidth="1" strokeDasharray={i < 3 ? '0' : '4,2'} className="group-hover:stroke-white transition-colors duration-500" />
                <text x={lot.x + lot.w / 2} y={lot.y + lot.h / 2 - 6} fill="#22AADE" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle" className="group-hover:fill-white transition-colors duration-500">{lot.label}</text>
                <text x={lot.x + lot.w / 2} y={lot.y + lot.h / 2 + 8} fill="#666" fontSize="8" fontFamily="monospace" textAnchor="middle">{lot.area}</text>
              </g>
            ))}
            {/* Vialidad */}
            <rect x="40" y="150" width="320" height="20" fill="#22AADE" opacity="0.08" stroke="#22AADE" strokeWidth="0.5" strokeDasharray="4,2" />
            <text x="200" y="163" fill="#22AADE" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">VIALIDAD — 8.00 m</text>
            {/* Medidas perimetrales */}
            <text x="200" y="22" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="middle">80.00 m</text>
            <text x="200" y="284" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="middle">80.00 m</text>
            <text x="25" y="150" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 25, 150)">60.00 m</text>
            <text x="375" y="150" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(90, 375, 150)">60.00 m</text>
            {/* Área total */}
            <text x="200" y="296" fill="#22AADE" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.5">Área Total: 4,800.00 m²</text>
          </svg>
        )}

        {/* Sello técnico */}
        <div className="absolute bottom-2 right-2 bg-[#050505]/90 border border-white/10 rounded px-3 py-1.5 backdrop-blur-sm">
          <p className="text-[7px] text-gray-500 font-mono uppercase tracking-wider">Ejemplo ilustrativo</p>
        </div>
      </div>

      {/* Info */}
      <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wider group-hover:text-[#22AADE] transition-colors">{title}</h4>
      <p className="text-gray-500 font-light text-sm">{subtitle}</p>
    </div>
  );
}


export default function LevantamientosTopograficosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* ============================================= */}
      {/* 1. HERO SECTION */}
      {/* ============================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#22AADE]/3 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Topografía Profesional
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Levantamientos{' '}
              <span className="font-bold italic text-[#22AADE]">Topográficos</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Mediciones de precisión, planos profesionales y documentación técnica para tu terreno o propiedad.
              <strong className="text-white"> Datos exactos para decisiones seguras.</strong>
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 flex-wrap">
              {['Planimétricos', 'Altimétricos', 'Subdivisiones', 'Deslindes'].map((s) => (
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
                Solicitar Cotización
              </Link>
              <a
                href="#ejemplos"
                className="bg-white/5 border border-white/20 text-white px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Ver Ejemplos de Planos
              </a>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-light">
              Equipo de precisión GPS RTK y estación total. Entregables en DWG y PDF.
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
              { stat: 'GPS RTK', label: 'Alta Precisión', desc: 'Equipos de última generación con precisión milimétrica' },
              { stat: 'DWG + PDF', label: 'Entregables Profesionales', desc: 'Planos en formato editable e imprimible' },
              { stat: '100%', label: 'Válido Legalmente', desc: 'Documentación aceptada por notarías y catastro' },
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
      {/* 3. SERVICIOS */}
      {/* ============================================= */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Servicios Topográficos
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Mediciones de{' '}
              <span className="font-bold">precisión para tu propiedad</span>
            </h3>
            <p className="text-gray-500 font-light">
              Desde el levantamiento planimétrico básico hasta estudios complejos de subdivisión,
              cubrimos todas las necesidades topográficas de tu terreno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#050505] border border-white/5 p-8 hover:border-[#22AADE]/50 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{service.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 4. EJEMPLOS DE PLANOS TOPOGRÁFICOS */}
      {/* ============================================= */}
      <section id="ejemplos" className="py-12 sm:py-16 md:py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Ejemplos de Entregables
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Planos <span className="font-bold italic">Topográficos</span>
            </h3>
            <p className="text-gray-500 font-light">
              Estos son ejemplos ilustrativos del tipo de planos que elaboramos. Cada proyecto
              recibe documentación profesional completa y personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TopoPlanExample
              title="Plano Planimétrico"
              subtitle="Representación de la forma, vértices, colindancias y superficie del terreno con coordenadas georeferenciadas."
              type="planimetric"
            />
            <TopoPlanExample
              title="Plano Altimétrico"
              subtitle="Curvas de nivel y puntos de control que representan la elevación y los desniveles naturales del terreno."
              type="altimetric"
            />
            <TopoPlanExample
              title="Plano de Subdivisión"
              subtitle="División técnica del terreno en lotes con áreas, medidas, vialidades y áreas de donación definidas."
              type="subdivision"
            />
          </div>

          {/* Info adicional */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8">
              <h4 className="text-white text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Formatos de entrega incluidos</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { format: 'DWG', desc: 'AutoCAD editable' },
                  { format: 'PDF', desc: 'Impresión profesional' },
                  { format: 'KMZ', desc: 'Google Earth' },
                  { format: 'CSV', desc: 'Coordenadas tabuladas' },
                ].map((f, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-14 h-14 mx-auto bg-[#22AADE]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#22AADE]/20 transition-colors">
                      <span className="text-[#22AADE] font-mono font-bold text-sm">{f.format}</span>
                    </div>
                    <p className="text-gray-500 text-xs font-light">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 5. PROCESO */}
      {/* ============================================= */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Nuestro Proceso
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              De la medición al <span className="font-bold italic">plano profesional</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 group mb-2 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#0a0a0a] border border-white/10 group-hover:border-[#22AADE] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0">
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

          <div className="text-center mt-16">
            <Link
              href="/contacto"
              className="inline-block border-b border-[#22AADE] pb-1 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-white transition-all duration-300"
            >
              Solicitar Levantamiento Topográfico
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 6. FAQ */}
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
      {/* 7. CTA FINAL */}
      {/* ============================================= */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tighter">
            Conoce tu terreno con <br />
            <span className="font-bold italic">precisión milimétrica</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Datos exactos, planos profesionales y documentación técnica
            que respaldan tu inversión inmobiliaria.
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
              Ver Propiedades
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
