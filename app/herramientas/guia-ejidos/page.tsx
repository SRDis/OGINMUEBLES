import Link from 'next/link';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Guía Completa de Ejidos | Cómo Funciona y Conversión a Propiedad Privada',
  description: 'Todo sobre ejidos en México: qué son, cómo funcionan, tipos de derechos ejidales, proceso de dominio pleno para convertir a propiedad privada, riesgos legales y más.',
  alternates: { canonical: `${baseUrl}/herramientas/guia-ejidos` },
};

/* ─────────────────────────────────────────────────────────────
   DATOS DEL CONTENIDO
   ───────────────────────────────────────────────────────────── */

const conceptosBasicos = [
  {
    titulo: '¿Qué es un Ejido?',
    contenido: 'Un ejido es una porción de tierra que el Estado mexicano otorgó a un grupo de campesinos (ejidatarios) para su explotación agrícola, ganadera o forestal. Surge de la Reforma Agraria derivada del Artículo 27 de la Constitución Política de los Estados Unidos Mexicanos. Los ejidos son administrados por una Asamblea Ejidal y regulados por la Ley Agraria vigente desde 1992.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  },
  {
    titulo: '¿Quién es un Ejidatario?',
    contenido: 'Es la persona que tiene reconocidos derechos agrarios dentro de un ejido por la Asamblea Ejidal y el Registro Agrario Nacional (RAN). Los ejidatarios tienen derecho a una parcela individual, al uso de tierras comunes y a participar en las decisiones del ejido. La calidad de ejidatario se acredita con el Certificado de Derechos Agrarios o el Certificado Parcelario expedido por el RAN.',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    titulo: 'Órganos de Gobierno del Ejido',
    contenido: 'El ejido se gobierna por tres órganos: 1) La Asamblea Ejidal — máxima autoridad, integrada por todos los ejidatarios; 2) El Comisariado Ejidal — órgano ejecutivo que representa al ejido y administra sus bienes; 3) El Consejo de Vigilancia — supervisa las acciones del Comisariado. Las decisiones más importantes (como el dominio pleno) requieren aprobación de la Asamblea con mayoría calificada.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

const tiposTierra = [
  {
    tipo: 'Tierras Parceladas',
    desc: 'Parcelas individuales asignadas a cada ejidatario para su uso y aprovechamiento exclusivo. El ejidatario tiene un Certificado Parcelario que acredita su derecho. Puede heredarlas, aportar su uso a sociedades o, bajo ciertas condiciones, enajenarlas a otros ejidatarios del mismo núcleo.',
    derechos: ['Uso y aprovechamiento individual', 'Puede heredarse (lista de sucesión)', 'Enajenación solo a ejidatarios del mismo núcleo (Art. 80 Ley Agraria)', 'Puede adoptar dominio pleno'],
    base: 'Art. 76-86 Ley Agraria',
    color: '#22AADE',
  },
  {
    tipo: 'Tierras de Uso Común',
    desc: 'Áreas del ejido que pertenecen a todos los ejidatarios de forma colectiva. Se utilizan para actividades comunales: pastoreo, recolección de leña, conservación ecológica. No se pueden parcelar individualmente ni adoptar dominio pleno. Solo la Asamblea puede decidir sobre su uso.',
    derechos: ['Uso colectivo de todos los ejidatarios', 'No se pueden parcelar individualmente', 'La Asamblea decide su destino', 'Pueden aportarse a sociedades mercantiles'],
    base: 'Art. 73-75 Ley Agraria',
    color: '#facc15',
  },
  {
    tipo: 'Parcela Escolar y del Poblado',
    desc: 'La parcela escolar se destina a investigación y enseñanza. El asentamiento humano (zona urbana del ejido) comprende los solares donde habitan los ejidatarios. Los solares pueden ser titulados a favor de sus poseedores como propiedad plena directamente.',
    derechos: ['Solares del asentamiento son titulables como propiedad', 'Parcela escolar es inalienable', 'El asentamiento se rige por normas municipales', 'Se puede obtener título de propiedad del solar'],
    base: 'Art. 63-72 Ley Agraria',
    color: '#4ade80',
  },
];

const procesoDominioPleno = [
  {
    paso: '01',
    titulo: 'Certificación PROCEDE / FANAR',
    desc: 'El ejido debe estar certificado por el programa PROCEDE (ahora FANAR — Fondo de Apoyo para Núcleos Agrarios sin Regularizar). Esto significa que las parcelas están medidas, delimitadas y cada ejidatario tiene su Certificado Parcelario emitido por el RAN. Si el ejido no está certificado, este es el primer paso obligatorio.',
    requisitos: ['Solicitud del Comisariado Ejidal al RAN', 'Asamblea de delimitación de tierras', 'Medición y levantamiento topográfico por el INEGI/RAN', 'Emisión de certificados parcelarios'],
  },
  {
    paso: '02',
    titulo: 'Convocatoria a Asamblea Ejidal',
    desc: 'Se convoca a Asamblea Ejidal con las formalidades de ley (Art. 24-28 Ley Agraria): convocatoria con al menos 30 días de anticipación, publicación en lugares visibles del ejido, y con la asistencia de un representante de la Procuraduría Agraria y un fedatario público.',
    requisitos: ['Convocatoria con 30 días de anticipación mínimo', 'Publicación en lugares visibles del ejido', 'Presencia de representante de la Procuraduría Agraria', 'Presencia de fedatario público (notario o equivalente)'],
  },
  {
    paso: '03',
    titulo: 'Resolución de la Asamblea — Dominio Pleno',
    desc: 'La Asamblea Ejidal aprueba la adopción del dominio pleno de las parcelas. Se requiere el voto favorable de las dos terceras partes de los ejidatarios asistentes (mayoría calificada). La resolución debe constar en acta formal firmada por los asistentes y el fedatario público.',
    requisitos: ['Quórum: tres cuartas partes de los ejidatarios en primera convocatoria', 'Voto favorable de dos terceras partes de los asistentes', 'Acta formal ante fedatario público', 'El ejidatario individual puede decidir si adopta o no el dominio pleno'],
  },
  {
    paso: '04',
    titulo: 'Cancelación del Certificado Parcelario',
    desc: 'Una vez aprobado el dominio pleno, el ejidatario solicita al RAN la cancelación de su Certificado Parcelario. El RAN expide la cancelación y notifica al Registro Público de la Propiedad correspondiente.',
    requisitos: ['Solicitud por escrito al RAN', 'Acta de Asamblea que autorizó el dominio pleno', 'Certificado Parcelario original', 'Identificación del ejidatario'],
  },
  {
    paso: '05',
    titulo: 'Inscripción en el Registro Público de la Propiedad',
    desc: 'La parcela se inscribe en el Registro Público de la Propiedad y de Comercio (RPP) como propiedad privada plena. El RAN expide el título de propiedad correspondiente. A partir de este momento, la parcela deja de ser ejidal y se convierte en propiedad privada, sujeta al derecho civil.',
    requisitos: ['Notificación del RAN al RPP', 'Pago de derechos de inscripción', 'Emisión de título de propiedad', 'La parcela queda sujeta a derecho civil ordinario'],
  },
  {
    paso: '06',
    titulo: 'Escrituración ante Notario Público',
    desc: 'Con el título de propiedad y la inscripción en el RPP, el ex-ejidatario puede vender libremente la propiedad a cualquier persona. La compraventa se formaliza ante notario público como cualquier propiedad privada, con escritura pública, pago de impuestos y registro.',
    requisitos: ['Título de propiedad del RPP', 'Avalúo bancario o comercial', 'Pago de ISR, ISAI y derechos notariales', 'Escritura pública ante notario', 'Inscripción a nombre del comprador en el RPP'],
  },
];

const riesgos = [
  {
    titulo: 'Comprar tierra ejidal sin dominio pleno',
    desc: 'La compraventa de parcelas ejidales sin dominio pleno es NULA de pleno derecho. El Art. 27 Constitucional fracción VII establece que las tierras ejidales son inalienables, imprescriptibles e inembargables mientras conserven su carácter ejidal. Cualquier "contrato" de compraventa de tierra ejidal sin dominio pleno NO tiene validez legal.',
    severidad: 'crítico',
    base: 'Art. 27 Constitucional, Art. 80-84 Ley Agraria',
  },
  {
    titulo: 'Cesión de derechos vs. venta real',
    desc: 'Existe la "cesión de derechos parcelarios" que solo puede hacerse entre ejidatarios del mismo núcleo (Art. 80 Ley Agraria). Muchos intermediarios ofrecen "cesiones de derechos" a personas externas al ejido — esto es irregular y puede ser anulado por los tribunales agrarios.',
    severidad: 'alto',
    base: 'Art. 80 Ley Agraria',
  },
  {
    titulo: 'Posesión no es propiedad',
    desc: 'Tener una "posesión" o "constancia de posesión" de tierra ejidal NO equivale a propiedad. Los posesionarios tienen derechos limitados y no pueden vender, hipotecar ni escriturar el terreno. Solo el proceso de dominio pleno convierte la posesión en propiedad plena.',
    severidad: 'alto',
    base: 'Art. 23 fracción VIII Ley Agraria',
  },
  {
    titulo: 'Tierras de uso común no se privatizan',
    desc: 'Las tierras de uso común del ejido NO pueden adoptar dominio pleno. Solo las parcelas individuales certificadas pueden pasar a propiedad privada. Si alguien ofrece vender "tierras comunes" del ejido, es una operación ilegal.',
    severidad: 'crítico',
    base: 'Art. 74-75 Ley Agraria',
  },
  {
    titulo: 'Prescripción positiva',
    desc: 'Aunque las tierras ejidales son técnicamente imprescriptibles, existe debate jurídico. En la práctica, la prescripción positiva (usucapión) NO aplica sobre tierras ejidales mientras mantengan su régimen. No se puede "ganar" propiedad ejidal por posesión prolongada.',
    severidad: 'medio',
    base: 'Art. 27 Constitucional fracción VII',
  },
  {
    titulo: 'Derechos de preferencia (derecho del tanto)',
    desc: 'Al vender derechos parcelarios, el cónyuge, hijos, otros ejidatarios del núcleo y el propio ejido tienen derecho de preferencia (derecho del tanto) por 30 días. Si no se respeta, la venta puede ser anulada por un Tribunal Unitario Agrario.',
    severidad: 'alto',
    base: 'Art. 80-84 Ley Agraria',
  },
];

const faqs = [
  {
    q: '¿Puedo comprar un terreno ejidal como persona que no es ejidatario?',
    a: 'No directamente. La ley solo permite la enajenación de parcelas entre ejidatarios del mismo núcleo (Art. 80 Ley Agraria). Para que una persona externa pueda comprar, primero se debe adoptar el dominio pleno (con aprobación de la Asamblea y trámites ante el RAN), convertir la parcela en propiedad privada, y después sí venderla libremente.',
  },
  {
    q: '¿Cuánto tiempo tarda el proceso de dominio pleno?',
    a: 'El proceso completo puede tomar de 6 meses a 2 años o más, dependiendo de: si el ejido ya está certificado por PROCEDE/FANAR, la disposición de la Asamblea Ejidal, los tiempos del RAN para cancelar certificados, y los trámites de inscripción en el Registro Público de la Propiedad. Es un proceso que requiere paciencia y seguimiento constante.',
  },
  {
    q: '¿Qué es un Certificado Parcelario y un Certificado de Derechos Agrarios?',
    a: 'El Certificado Parcelario (emitido en PROCEDE) acredita los derechos del ejidatario sobre una parcela específica con medidas y colindancias. El Certificado de Derechos Agrarios es el documento original que acredita la calidad de ejidatario. Ambos son emitidos por el RAN y son los documentos más importantes de la propiedad ejidal.',
  },
  {
    q: '¿Qué pasa si un ejidatario fallece?',
    a: 'El ejidatario debe registrar una "lista de sucesión" ante el RAN, designando a quién heredará sus derechos. Si no hay lista de sucesión, los derechos se transmiten según un orden de preferencia establecido en el Art. 17 de la Ley Agraria: cónyuge, concubina(o), hijos, dependientes económicos. Si hay conflicto, se resuelve ante el Tribunal Unitario Agrario.',
  },
  {
    q: '¿Un ejidatario puede hipotecar su parcela?',
    a: 'No mientras sea ejidal. Las parcelas ejidales son inembargables y no se pueden hipotecar ante instituciones bancarias. Solo después de adoptar el dominio pleno y convertirla en propiedad privada, el terreno puede usarse como garantía hipotecaria. Sin embargo, el ejidatario puede otorgar el usufructo de la parcela como garantía de un crédito (Art. 46 Ley Agraria).',
  },
  {
    q: '¿Qué instituciones están involucradas?',
    a: 'Las principales instituciones son: RAN (Registro Agrario Nacional) — lleva el registro de ejidos y comunidades; Procuraduría Agraria — asesora y representa a ejidatarios; Tribunales Unitarios Agrarios — resuelven controversias; SEDATU (Secretaría de Desarrollo Agrario, Territorial y Urbano) — política agraria; y el Registro Público de la Propiedad — inscripción final de propiedades con dominio pleno.',
  },
  {
    q: '¿Qué diferencia hay entre ejido y comunidad agraria?',
    a: 'Ambos son formas de propiedad social. La diferencia principal es el origen: los ejidos se crearon por dotación o ampliación durante la Reforma Agraria, mientras que las comunidades agrarias tienen un origen ancestral o por restitución de tierras. Las comunidades tienen reglas más restrictivas: sus tierras son imprescriptibles, inalienables e inembargables sin excepción, y NO pueden adoptar dominio pleno.',
  },
];

export default function GuiaEjidosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6 text-xs text-gray-500">
              <Link href="/herramientas" className="hover:text-[#22AADE] transition-colors">Herramientas</Link>
              <span>/</span>
              <span className="text-gray-400">Guía de Ejidos</span>
            </div>

            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8">
              Art. 27 Constitucional · Ley Agraria
            </span>

            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Guía Completa de{' '}
              <span className="font-bold italic text-[#22AADE]">Ejidos</span>
            </h1>

            <p className="text-lg text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Todo lo que necesitas saber sobre la propiedad ejidal en México:
              qué es, cómo funciona, tipos de derechos, y el proceso legal completo para
              <strong className="text-white"> convertir tierra ejidal en propiedad privada.</strong>
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {['Ley Agraria', 'Art. 27 Constitucional', 'RAN', 'Dominio Pleno', 'PROCEDE'].map((tag) => (
                <span key={tag} className="text-gray-500 text-xs font-light border border-white/10 px-3 py-1 rounded-full bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPTOS BÁSICOS */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Fundamentos</h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white">
              Conceptos <span className="font-bold">Básicos</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conceptosBasicos.map((concepto, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 rounded-sm p-8 hover:border-[#22AADE]/30 transition-colors group">
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={concepto.icon} />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg mb-4">{concepto.titulo}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {concepto.contenido}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOS DE TIERRA EJIDAL */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Clasificación</h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Tipos de <span className="font-bold italic">Tierra Ejidal</span>
            </h3>
            <p className="text-gray-500 font-light">
              La Ley Agraria clasifica las tierras del ejido en tres categorías, cada una con reglas distintas.
            </p>
          </div>

          <div className="space-y-8">
            {tiposTierra.map((tierra, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 hover:border-white/10 transition-colors">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tierra.color }} />
                      <h4 className="text-xl font-bold text-white">{tierra.tipo}</h4>
                    </div>
                    <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">{tierra.desc}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: tierra.color }}>
                      Base legal: {tierra.base}
                    </p>
                  </div>
                  <div className="lg:w-80 flex-shrink-0">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Derechos y Restricciones</h5>
                    <ul className="space-y-2">
                      {tierra.derechos.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-sm text-gray-400 font-light">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: tierra.color }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO DE DOMINIO PLENO */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Paso a Paso
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Proceso de{' '}
              <span className="font-bold italic">Dominio Pleno</span>
            </h3>
            <p className="text-gray-500 font-light">
              El dominio pleno es el procedimiento legal que convierte una parcela ejidal
              en propiedad privada. Estos son los pasos conforme a la Ley Agraria (Art. 81-86).
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {procesoDominioPleno.map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 group mb-2 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#050505] border border-white/10 group-hover:border-[#22AADE] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0">
                    <span className="text-[#22AADE] font-black text-sm">{step.paso}</span>
                  </div>
                  {idx < procesoDominioPleno.length - 1 && (
                    <div className="w-[1px] h-full min-h-[40px] bg-white/10 group-hover:bg-[#22AADE]/30 transition-colors" />
                  )}
                </div>
                <div className="pb-10">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#22AADE] transition-colors uppercase tracking-wider">
                    {step.titulo}
                  </h4>
                  <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors mb-4 text-sm">
                    {step.desc}
                  </p>
                  <div className="bg-[#050505] border border-white/5 rounded-sm p-4">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#22AADE] font-bold mb-3">Requisitos</h5>
                    <ul className="space-y-2">
                      {step.requisitos.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs text-gray-400 font-light">
                          <svg className="w-3 h-3 text-[#22AADE] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGRAMA VISUAL DEL PROCESO */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Diagrama</h2>
            <h3 className="text-2xl md:text-3xl font-extralight text-white">
              De <span className="font-bold">Ejido</span> a <span className="font-bold">Propiedad Privada</span>
            </h3>
          </div>

          <svg viewBox="0 0 800 120" className="w-full h-auto">
            {/* Flechas de conexión */}
            {[160, 320, 480, 640].map((x, i) => (
              <g key={i}>
                <line x1={x - 10} y1="60" x2={x + 10} y2="60" stroke="#22AADE" strokeWidth="2" strokeDasharray="4,3" />
                <polygon points={`${x + 10},55 ${x + 20},60 ${x + 10},65`} fill="#22AADE" />
              </g>
            ))}
            {/* Nodos */}
            {[
              { x: 80, label: 'Parcela\nEjidal', sub: 'Cert. Parcelario' },
              { x: 240, label: 'Asamblea\nEjidal', sub: '⅔ votos' },
              { x: 400, label: 'Dominio\nPleno', sub: 'Cancelación RAN' },
              { x: 560, label: 'Registro\nPúblico', sub: 'Inscripción RPP' },
              { x: 720, label: 'Propiedad\nPrivada', sub: 'Escritura Pública' },
            ].map((node, i) => (
              <g key={i}>
                <rect x={node.x - 60} y="20" width="120" height="50" rx="8" fill={i === 4 ? '#22AADE' : '#0a0a0a'} stroke={i === 4 ? '#22AADE' : '#333'} strokeWidth="1.5" />
                {node.label.split('\n').map((line, lIdx) => (
                  <text key={lIdx} x={node.x} y={40 + lIdx * 14} textAnchor="middle" fill={i === 4 ? 'black' : 'white'} fontSize="10" fontWeight="bold" fontFamily="system-ui">
                    {line}
                  </text>
                ))}
                <text x={node.x} y="90" textAnchor="middle" fill="#22AADE" fontSize="8" fontFamily="system-ui">{node.sub}</text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* RIESGOS Y ADVERTENCIAS */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-red-400 text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Precaución
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Riesgos y <span className="font-bold italic text-red-400">Advertencias</span>
            </h3>
            <p className="text-gray-500 font-light">
              Operaciones comunes que representan un riesgo legal serio para compradores no informados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riesgos.map((riesgo, idx) => (
              <div
                key={idx}
                className={`bg-[#050505] border rounded-sm p-6 transition-colors ${
                  riesgo.severidad === 'crítico'
                    ? 'border-red-500/30 hover:border-red-500/60'
                    : riesgo.severidad === 'alto'
                    ? 'border-amber-500/20 hover:border-amber-500/50'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    riesgo.severidad === 'crítico'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : riesgo.severidad === 'alto'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    Riesgo {riesgo.severidad}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-2">{riesgo.titulo}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-3">{riesgo.desc}</p>
                <p className="text-[10px] text-[#22AADE] uppercase tracking-wider font-bold">
                  {riesgo.base}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Resolvemos tus Dudas</h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white">
              Preguntas <span className="font-bold italic">Frecuentes</span>
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 hover:border-[#22AADE]/30 rounded-sm p-6 md:p-8 transition-colors duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#22AADE] transition-colors duration-500">
                    <span className="text-[#22AADE] font-bold text-xs group-hover:text-black transition-colors duration-500">?</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 text-base md:text-lg">{faq.q}</h4>
                    <p className="text-gray-500 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#050505] border border-amber-500/20 rounded-sm p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 text-lg">⚖️</span>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3">Aviso Legal</h3>
                <div className="space-y-3 text-sm text-gray-400 font-light leading-relaxed">
                  <p>
                    Esta guía es <strong className="text-white">informativa y educativa</strong>. No constituye asesoría legal.
                    La materia agraria es compleja y cada ejido tiene circunstancias particulares.
                  </p>
                  <p>
                    <strong className="text-white">NUNCA</strong> realices operaciones con tierra ejidal sin la asesoría de un
                    abogado agrario certificado, la consulta del Registro Agrario Nacional (RAN) y la verificación
                    del estatus legal del terreno y del ejido.
                  </p>
                  <p>
                    Las leyes citadas incluyen: Art. 27 Constitucional, Ley Agraria (reformas vigentes),
                    reglamentos del RAN y normativa complementaria aplicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extralight text-white mb-6 tracking-tighter">
            ¿Estás considerando comprar{' '}
            <span className="font-bold italic">terreno ejidal?</span>
          </h2>
          <p className="text-lg mb-10 text-gray-400 font-light max-w-2xl mx-auto">
            Te asesoramos en la verificación legal, el proceso de dominio pleno y la adquisición
            segura de propiedades con antecedentes ejidales.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] transition-all rounded-sm"
            >
              Asesoría Legal Agraria
            </Link>
            <Link
              href="/herramientas/guia-documentacion"
              className="px-10 py-4 border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all rounded-sm"
            >
              Ver Guía de Documentación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
