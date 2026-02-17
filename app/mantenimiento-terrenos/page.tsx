import Link from 'next/link';
import { Metadata } from 'next';
import MaintenanceServiceForm from '@/components/forms/MaintenanceServiceForm';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Mantenimiento de Terrenos | Limpieza, Jardinería y Cuidado Integral',
  description: 'Servicio profesional de mantenimiento de terrenos. Limpieza, jardinería, desmalezado, poda, control de plagas y más. Mantén tu propiedad en óptimas condiciones todo el año.',
  alternates: {
    canonical: `${baseUrl}/mantenimiento-terrenos`,
  },
  openGraph: {
    title: 'Mantenimiento de Terrenos | Oliver López Guijoza',
    description: 'Servicio integral de mantenimiento de terrenos: limpieza, jardinería, desmalezado y más. Tu terreno siempre en perfectas condiciones.',
    url: `${baseUrl}/mantenimiento-terrenos`,
    type: 'website',
  },
};

const benefits = [
  {
    title: 'Limpieza General de Terrenos',
    desc: 'Retiro de maleza, basura, escombros y materiales acumulados. Dejamos tu terreno limpio, despejado y listo para cualquier uso o visita de inversores.',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  },
  {
    title: 'Jardinería y Paisajismo',
    desc: 'Diseño, plantación y mantenimiento de jardines. Creamos espacios verdes que aumentan el valor estético y comercial de tu propiedad con plantas adaptadas a la región.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'Desmalezado y Chapeo',
    desc: 'Eliminación profesional de hierba alta, maleza invasiva y vegetación no deseada. Utilizamos maquinaria especializada para terrenos de cualquier tamaño y condición.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'Poda y Cuidado de Árboles',
    desc: 'Poda profesional de árboles y arbustos para mantener su salud, forma y seguridad. Incluye retiro de ramas secas, formación de copa y prevención de riesgos.',
    icon: 'M3 21h18M5 21V7l8-4v18M13 21V11l6-3v13M9 9h.01M9 13h.01M9 17h.01',
  },
  {
    title: 'Control de Plagas y Fumigación',
    desc: 'Detección y control de plagas que afectan tu terreno y vegetación. Aplicamos tratamientos seguros y ecológicos para proteger el entorno natural de tu propiedad.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Riego y Mantenimiento de Césped',
    desc: 'Instalación y mantenimiento de sistemas de riego. Cuidado integral del césped: fertilización, aireación, resiembra y control de enfermedades para un verde impecable.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    title: 'Cercado y Delimitación',
    desc: 'Instalación y reparación de cercas, bardas perimetrales y señalización de linderos. Protege tu inversión y marca los límites de tu propiedad de forma profesional.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z',
  },
  {
    title: 'Retiro de Escombros y Nivelación',
    desc: 'Limpieza profunda con retiro de materiales de construcción, piedras y residuos. Nivelación del terreno para prepararlo para construcción, venta o mantenimiento continuo.',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2',
  },
];

const steps = [
  {
    num: '01',
    title: 'Visita de Diagnóstico',
    desc: 'Realizamos una inspección presencial de tu terreno para evaluar su estado actual, extensión, tipo de vegetación, accesibilidad y necesidades específicas de mantenimiento.',
  },
  {
    num: '02',
    title: 'Plan de Mantenimiento Personalizado',
    desc: 'Diseñamos un plan a medida con los servicios necesarios, frecuencia de visitas, cronograma de actividades y presupuesto detallado adaptado a tu terreno.',
  },
  {
    num: '03',
    title: 'Ejecución Profesional',
    desc: 'Nuestro equipo especializado ejecuta los trabajos con herramientas y maquinaria profesional, siguiendo los más altos estándares de calidad y seguridad.',
  },
  {
    num: '04',
    title: 'Supervisión y Reporte',
    desc: 'Supervisamos cada servicio y te enviamos reportes fotográficos del antes y después. Mantienes el control total del estado de tu propiedad en todo momento.',
  },
  {
    num: '05',
    title: 'Mantenimiento Continuo',
    desc: 'Programamos visitas periódicas según la frecuencia acordada para que tu terreno se mantenga en condiciones óptimas durante todo el año, sin que tengas que preocuparte.',
  },
];

const servicePlans = [
  {
    name: 'Servicio Único',
    tag: 'Puntual',
    desc: 'Ideal para terrenos que necesitan una limpieza inicial o un trabajo específico por única vez.',
    features: [
      'Limpieza o servicio por única vez',
      'Sin compromiso de permanencia',
      'Ideal para preparar terrenos en venta',
      'Cotización personalizada',
      'Reporte fotográfico incluido',
    ],
    note: 'Perfecto para propietarios que necesitan dejar su terreno en condiciones óptimas de forma puntual.',
  },
  {
    name: 'Plan de Mantenimiento',
    tag: 'Recomendado',
    desc: 'Programa de mantenimiento periódico para mantener tu terreno en perfectas condiciones todo el año.',
    features: [
      'Visitas programadas (semanal a mensual)',
      'Servicios integrales incluidos',
      'Supervisión y reportes periódicos',
      'Tarifa preferencial por contrato',
      'Atención prioritaria ante emergencias',
    ],
    note: 'La frecuencia y servicios incluidos se definen según el tamaño, ubicación y necesidades del terreno.',
  },
  {
    name: 'Plan Integral Premium',
    tag: 'Todo Incluido',
    desc: 'Gestión completa del terreno: mantenimiento, vigilancia del estado, mejoras paisajísticas y coordinación total.',
    features: [
      'Todos los servicios de mantenimiento',
      'Paisajismo y mejoras estéticas',
      'Coordinación con proveedores',
      'Informes mensuales detallados',
      'Gestión integral sin preocupaciones',
    ],
    note: 'Diseñado para propietarios que desean una administración total del mantenimiento sin involucrarse en la operación.',
  },
];

const faqs = [
  {
    question: '¿Qué tipo de terrenos atienden?',
    answer: 'Atendemos todo tipo de terrenos: baldíos, residenciales, campestres, boscosos, con o sin construcción. Nos adaptamos a las necesidades específicas de cada propiedad sin importar su tamaño o condición actual.',
  },
  {
    question: '¿Trabajan en Valle de Bravo y alrededores?',
    answer: 'Sí, nuestro principal radio de operación incluye Valle de Bravo, Avándaro, y zonas aledañas. También atendemos propiedades en otras ubicaciones bajo consulta previa.',
  },
  {
    question: '¿Necesito estar presente durante el servicio?',
    answer: 'No es necesario. Coordinamos el acceso al terreno y te enviamos reportes fotográficos detallados del antes y después de cada servicio. Puedes monitorear el estado de tu propiedad a distancia.',
  },
  {
    question: '¿Cómo se determina el costo del servicio?',
    answer: 'El presupuesto se define tras la visita de diagnóstico, considerando el tamaño del terreno, estado actual, servicios requeridos y frecuencia deseada. Siempre ofrecemos una cotización transparente y sin sorpresas.',
  },
  {
    question: '¿Ofrecen servicio de emergencia?',
    answer: 'Sí, para clientes con plan de mantenimiento activo ofrecemos atención prioritaria ante emergencias como caída de árboles, inundaciones o daños por clima. La respuesta es en menos de 24 horas.',
  },
  {
    question: '¿Incluyen retiro de residuos?',
    answer: 'Sí, todos nuestros servicios incluyen el retiro y disposición adecuada de los residuos generados: maleza cortada, ramas podadas, escombros y cualquier material removido del terreno.',
  },
];

export default function MantenimientoTerrenosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* ============================================= */}
      {/* 1. HERO SECTION */}
      {/* ============================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#22AADE]/3 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Mantenimiento Profesional de Terrenos
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Tu terreno siempre en{' '}
              <span className="font-bold italic text-[#22AADE]">perfectas condiciones</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Limpieza, jardinería, desmalezado, poda y más. Nos encargamos del cuidado integral de tu terreno
              para que mantenga su valor y presencia.
              <strong className="text-white"> Tú eres el dueño, nosotros el cuidado.</strong>
            </p>

            {/* Servicios principales */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 flex-wrap">
              {['Limpieza', 'Jardinería', 'Desmalezado', 'Poda'].map((service) => (
                <span key={service} className="text-gray-500 text-sm md:text-base font-light border border-white/10 px-4 py-2 rounded-full bg-white/5 hover:border-[#22AADE]/30 hover:text-white transition-all">
                  {service}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="#formulario"
                className="bg-[#22AADE] text-black px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(34,170,222,0.4)]"
              >
                Solicitar Cotización Gratuita
              </a>
              <a
                href="#como-funciona"
                className="bg-white/5 border border-white/20 text-white px-10 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Conocer el Proceso
              </a>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-light">
              Sin compromiso. Respuesta en menos de 24 horas.
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
              { stat: '100%', label: 'Profesional', desc: 'Equipo capacitado con herramientas y maquinaria especializada' },
              { stat: '24h', label: 'Respuesta rápida', desc: 'Cotización y programación en menos de un día hábil' },
              { stat: '★★★★★', label: 'Calidad garantizada', desc: 'Reportes fotográficos del antes y después de cada servicio' },
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
      {/* 3. SERVICIOS (Grid 2 cols) */}
      {/* ============================================= */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Servicios Integrales
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Todo lo que tu terreno{' '}
              <span className="font-bold">necesita para lucir impecable</span>
            </h3>
            <p className="text-gray-500 font-light">
              Ofrecemos una gama completa de servicios de mantenimiento para terrenos de cualquier tipo y tamaño,
              con el profesionalismo que tu inversión merece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#050505] border border-white/5 p-8 hover:border-[#22AADE]/50 transition-colors duration-500 group rounded-sm"
              >
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{benefit.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 4. CÓMO FUNCIONA (Timeline / Pasos) */}
      {/* ============================================= */}
      <section id="como-funciona" className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Nuestro Proceso
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              De terreno descuidado a <span className="font-bold italic">propiedad impecable</span>
            </h3>
            <p className="text-gray-500 font-light">
              Desde la primera visita hasta el mantenimiento continuo, cada paso está diseñado
              para que tu terreno se mantenga en las mejores condiciones posibles.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 group mb-2 last:mb-0">
                {/* Línea y número */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#0a0a0a] border border-white/10 group-hover:border-[#22AADE] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0">
                    <span className="text-[#22AADE] font-black text-sm">{step.num}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-[1px] h-full min-h-[40px] bg-white/10 group-hover:bg-[#22AADE]/30 transition-colors" />
                  )}
                </div>

                {/* Contenido */}
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

          {/* CTA intermedio */}
          <div className="text-center mt-16">
            <a
              href="#formulario"
              className="inline-block border-b border-[#22AADE] pb-1 text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-white transition-all duration-300"
            >
              Quiero Mantener Mi Terreno Impecable
            </a>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 5. PLANES DE SERVICIO (Cards comparativas) */}
      {/* ============================================= */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Planes de Servicio
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Esquemas de <span className="font-bold italic">Mantenimiento</span>
            </h3>
            <p className="text-gray-500 font-light">
              Ofrecemos esquemas flexibles adaptados a cada terreno y necesidad.
              La propuesta final se personaliza tras la visita de diagnóstico.
            </p>
          </div>

          {/* Cards de planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {servicePlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-[#050505] border rounded-sm p-8 flex flex-col transition-all duration-500 hover:border-[#22AADE]/50 ${
                  idx === 1 ? 'border-[#22AADE]/30' : 'border-white/5'
                }`}
              >
                {/* Tag */}
                <span className={`inline-block self-start text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-6 ${
                  idx === 1
                    ? 'bg-[#22AADE]/20 text-[#22AADE] border border-[#22AADE]/30'
                    : 'bg-white/5 text-gray-400 border border-white/10'
                }`}>
                  {plan.tag}
                </span>

                <h4 className="text-xl font-bold text-white mb-3">{plan.name}</h4>
                <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed">{plan.desc}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <svg className="w-4 h-4 text-[#22AADE] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-400 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gray-600 font-light italic border-t border-white/5 pt-4">
                  {plan.note}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#050505] border border-[#22AADE]/20 rounded-sm p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-light leading-relaxed mb-3">
                    El costo y plan de mantenimiento se definen tras la visita de diagnóstico,
                    considerando el tamaño del terreno, estado actual, servicios requeridos, frecuencia y accesibilidad.
                    Cada cotización es personalizada para tu propiedad específica.
                  </p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-[#22AADE] font-bold uppercase tracking-wider">
                      Transparencia total: cotización detallada y sin costos ocultos.
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
      {/* 7. FORMULARIO DE SOLICITUD */}
      {/* ============================================= */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Info lateral */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
                  Siguiente Paso
                </h2>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                  Mantén tu terreno en <span className="font-bold italic">óptimas condiciones</span>
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Completa el formulario y nuestro equipo de mantenimiento te contactará
                  con una cotización personalizada para el cuidado de tu terreno.
                </p>
              </div>

              {/* Trust card */}
              <div className="bg-[#050505] border border-white/5 p-6 rounded-sm">
                <h4 className="text-white text-[10px] font-bold tracking-[0.4em] uppercase mb-4">El servicio incluye</h4>
                <ul className="space-y-3">
                  {[
                    'Visita de diagnóstico sin costo',
                    'Cotización detallada y transparente',
                    'Equipo profesional y maquinaria',
                    'Reportes fotográficos antes/después',
                    'Sin compromiso ni pagos anticipados',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-light">
                      <svg className="w-4 h-4 text-[#22AADE] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Microcopy */}
              <div className="p-6 border-l border-[#22AADE]/20 bg-[#22AADE]/5">
                <p className="text-xs text-[#22AADE] font-bold uppercase tracking-widest mb-2">Tiempo de respuesta</p>
                <p className="text-sm text-gray-400 font-light italic">
                  &ldquo;Recibirás una respuesta personalizada en menos de 24 horas con toda la información que necesitas para mantener tu terreno en las mejores condiciones.&rdquo;
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-2">
              <MaintenanceServiceForm />
            </div>

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
            Tu terreno merece el <br />
            <span className="font-bold italic">mejor cuidado</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Deja el mantenimiento en manos de profesionales.
            Nosotros cuidamos tu terreno, tú disfrutas los resultados.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#formulario"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Solicitar Cotización Gratuita
            </a>
            <Link
              href="/contacto"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
