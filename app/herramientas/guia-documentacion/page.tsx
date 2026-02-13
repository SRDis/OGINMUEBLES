import Link from 'next/link';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  title: 'Guía de Documentación Inmobiliaria | Ley Mexicana',
  description: 'Lista completa de documentos necesarios para comprar, vender o rentar una propiedad en México. Requisitos legales, notariales y fiscales actualizados conforme a la legislación vigente.',
  alternates: { canonical: `${baseUrl}/herramientas/guia-documentacion` },
};

/* ─────────────────────────────────────────────────────────────
   DATOS: DOCUMENTACIÓN POR TIPO DE OPERACIÓN
   ───────────────────────────────────────────────────────────── */

const operaciones = [
  {
    id: 'compra',
    title: 'Compra de Inmueble',
    subtitle: 'Documentos del comprador',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    color: '#22AADE',
    documentos: [
      {
        category: 'Identificación Personal',
        items: [
          { doc: 'Identificación oficial vigente (INE/IFE o pasaporte)', obligatorio: true, nota: 'Art. 27 Constitucional y Ley del Notariado' },
          { doc: 'CURP actualizada', obligatorio: true, nota: 'Requerida por el SAT y el notario público' },
          { doc: 'Acta de nacimiento (copia certificada)', obligatorio: true, nota: 'Para acreditar nacionalidad mexicana' },
          { doc: 'Acta de matrimonio o constancia de soltería', obligatorio: true, nota: 'Define el régimen patrimonial aplicable (sociedad conyugal o separación de bienes)' },
          { doc: 'Comprobante de domicilio reciente (máx. 3 meses)', obligatorio: true, nota: 'Recibos de luz, agua, teléfono o estado de cuenta bancario' },
        ],
      },
      {
        category: 'Fiscales y Financieros',
        items: [
          { doc: 'RFC con homoclave', obligatorio: true, nota: 'Registro Federal de Contribuyentes — necesario para escrituración' },
          { doc: 'Constancia de Situación Fiscal (CSF)', obligatorio: true, nota: 'Emitida por el SAT, vigencia reciente' },
          { doc: 'Comprobante de ingresos o estados de cuenta', obligatorio: false, nota: 'Necesario si se tramita crédito hipotecario' },
          { doc: 'Pre-aprobación de crédito hipotecario', obligatorio: false, nota: 'Si aplica financiamiento bancario (INFONAVIT, FOVISSSTE, bancario)' },
          { doc: 'Carta de no adeudo fiscal municipal', obligatorio: false, nota: 'Algunos municipios la solicitan para el trámite notarial' },
        ],
      },
      {
        category: 'Documentos de la Operación',
        items: [
          { doc: 'Contrato de promesa de compraventa', obligatorio: true, nota: 'Acuerdo previo que establece precio, plazos y condiciones — Art. 2243-2247 del Código Civil Federal' },
          { doc: 'Avalúo bancario o comercial vigente', obligatorio: true, nota: 'Realizado por valuador certificado, vigencia máxima de 6 meses' },
          { doc: 'Depósito o pago de enganche (comprobante)', obligatorio: true, nota: 'Transferencia bancaria o cheque certificado con comprobante' },
        ],
      },
    ],
  },
  {
    id: 'venta',
    title: 'Venta de Inmueble',
    subtitle: 'Documentos del vendedor',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: '#4ade80',
    documentos: [
      {
        category: 'Documentos de la Propiedad',
        items: [
          { doc: 'Escritura pública inscrita en el Registro Público de la Propiedad', obligatorio: true, nota: 'Título de propiedad que acredita la titularidad legal — debe estar inscrita en el RPP del Estado de México' },
          { doc: 'Certificado de Libertad de Gravamen vigente', obligatorio: true, nota: 'Emitido por el Registro Público, confirma que el inmueble está libre de hipotecas, embargos o litigios. Vigencia: 30 días' },
          { doc: 'Boletas de predial al corriente (últimos 5 años)', obligatorio: true, nota: 'Impuesto predial municipal — Art. 115 Constitucional. Algunos notarios piden hasta 10 años' },
          { doc: 'Boletas de agua al corriente', obligatorio: true, nota: 'Constancia de no adeudo del organismo operador de agua local' },
          { doc: 'Plano catastral o cédula catastral', obligatorio: true, nota: 'Emitido por la Dirección de Catastro municipal — identifica ubicación, medidas y colindancias' },
          { doc: 'Constancia de no adeudo de cuotas de mantenimiento', obligatorio: false, nota: 'Aplica si el inmueble está en régimen de condominio o fraccionamiento privado' },
        ],
      },
      {
        category: 'Identificación del Vendedor',
        items: [
          { doc: 'Identificación oficial vigente de todos los propietarios', obligatorio: true, nota: 'Si hay copropietarios, todos deben firmar ante notario' },
          { doc: 'CURP de todos los propietarios', obligatorio: true, nota: '' },
          { doc: 'RFC con homoclave', obligatorio: true, nota: 'Necesario para el cálculo del ISR por enajenación de inmueble' },
          { doc: 'Constancia de Situación Fiscal', obligatorio: true, nota: 'Emitida por el SAT' },
          { doc: 'Acta de matrimonio (si aplica)', obligatorio: true, nota: 'El cónyuge debe firmar si el inmueble fue adquirido en sociedad conyugal' },
          { doc: 'Poder notarial (si no firma directamente el propietario)', obligatorio: false, nota: 'Poder especial o general para actos de dominio — debe estar vigente e inscrito' },
        ],
      },
      {
        category: 'Fiscales y Legales',
        items: [
          { doc: 'Avalúo bancario o fiscal actualizado', obligatorio: true, nota: 'Base para el cálculo del ISR y del ISAI (Impuesto sobre Adquisición de Inmuebles)' },
          { doc: 'Cancelación de hipoteca (si la tiene)', obligatorio: false, nota: 'Carta de cancelación del banco acreedor y trámite ante el RPP' },
          { doc: 'Declaración del ISR por enajenación', obligatorio: true, nota: 'Art. 126 LISR — el notario retiene y entera el impuesto. Exención de hasta 700,000 UDIS si es casa habitación (una vez cada 3 años)' },
          { doc: 'Factura o CFDI de la operación', obligatorio: false, nota: 'Si el vendedor es persona moral o lo solicita el comprador' },
        ],
      },
    ],
  },
  {
    id: 'renta',
    title: 'Renta de Inmueble',
    subtitle: 'Documentos de arrendador y arrendatario',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
    color: '#a78bfa',
    documentos: [
      {
        category: 'Documentos del Arrendador (Propietario)',
        items: [
          { doc: 'Escritura pública del inmueble', obligatorio: true, nota: 'Acredita la titularidad y el derecho a arrendar' },
          { doc: 'Identificación oficial vigente', obligatorio: true, nota: '' },
          { doc: 'RFC con homoclave', obligatorio: true, nota: 'Obligatorio para emitir CFDI de arrendamiento — Art. 114 LISR' },
          { doc: 'Comprobante de domicilio', obligatorio: true, nota: '' },
          { doc: 'Recibos de servicios al corriente del inmueble', obligatorio: true, nota: 'Luz, agua, predial, gas — establecen el punto de partida para el inquilino' },
        ],
      },
      {
        category: 'Documentos del Arrendatario (Inquilino)',
        items: [
          { doc: 'Identificación oficial vigente', obligatorio: true, nota: '' },
          { doc: 'Comprobante de ingresos (últimos 3 meses)', obligatorio: true, nota: 'Recibos de nómina, estados de cuenta o declaraciones fiscales' },
          { doc: 'Comprobante de domicilio actual', obligatorio: true, nota: '' },
          { doc: 'Referencias personales y laborales', obligatorio: true, nota: 'Nombre, teléfono y relación — generalmente 2-3 referencias' },
          { doc: 'Fiador con propiedad en la misma entidad (o póliza jurídica)', obligatorio: true, nota: 'El fiador presenta: escritura, identificación, comprobante de domicilio, predial al corriente y comprobante de ingresos. Alternativa: póliza jurídica de arrendamiento' },
          { doc: 'Depósito de garantía', obligatorio: true, nota: 'Generalmente equivalente a 1 o 2 meses de renta — se devuelve al término del contrato si no hay adeudos ni daños' },
        ],
      },
      {
        category: 'Contrato de Arrendamiento',
        items: [
          { doc: 'Contrato de arrendamiento por escrito', obligatorio: true, nota: 'Art. 2398-2496 del Código Civil Federal. Debe incluir: partes, inmueble, plazo, renta, depósito, causas de rescisión' },
          { doc: 'Inventario de condiciones del inmueble', obligatorio: true, nota: 'Anexo fotográfico y descriptivo del estado del inmueble al inicio del contrato' },
          { doc: 'Póliza jurídica de arrendamiento', obligatorio: false, nota: 'Alternativa al fiador — cubre adeudos de renta, daños y gastos legales de desalojo' },
          { doc: 'Cláusula de actualización de renta', obligatorio: true, nota: 'Debe especificar el mecanismo de incremento anual (INPC, porcentaje fijo, etc.)' },
        ],
      },
    ],
  },
];

const impuestos = [
  {
    nombre: 'ISR por Enajenación de Inmueble',
    aplica: 'Venta',
    desc: 'El vendedor paga el Impuesto Sobre la Renta por la ganancia obtenida. El notario lo calcula, retiene y entera al SAT. Exención para casa habitación de hasta 700,000 UDIS (~$5.6 MDP) una vez cada 3 años.',
    base: 'Art. 120-128 LISR',
  },
  {
    nombre: 'ISAI (Impuesto sobre Adquisición de Inmuebles)',
    aplica: 'Compra',
    desc: 'Lo paga el comprador. En el Estado de México la tasa es del 4.5% sobre el valor más alto entre: precio de operación, avalúo o valor catastral.',
    base: 'Código Financiero del Estado de México',
  },
  {
    nombre: 'Derechos de Registro Público',
    aplica: 'Compra',
    desc: 'Costo de inscripción de la escritura en el Registro Público de la Propiedad. Varía según el valor del inmueble y el municipio.',
    base: 'Código Financiero del Estado de México',
  },
  {
    nombre: 'Honorarios Notariales',
    aplica: 'Compra/Venta',
    desc: 'El notario cobra honorarios por la elaboración de la escritura pública, gestión de impuestos y trámites de registro. Regulados por el arancel notarial estatal.',
    base: 'Ley del Notariado del Estado de México',
  },
  {
    nombre: 'ISR por Arrendamiento',
    aplica: 'Renta',
    desc: 'El arrendador debe declarar los ingresos por renta y pagar ISR. Puede deducir gastos como predial, mantenimiento, seguros y depreciación del inmueble.',
    base: 'Art. 114-118 LISR',
  },
  {
    nombre: 'IVA en Arrendamiento Comercial',
    aplica: 'Renta Comercial',
    desc: 'La renta de inmuebles para uso comercial está gravada con IVA del 16%. La renta de casa habitación está exenta.',
    base: 'Art. 20, fracción II LIVA',
  },
];

export default function GuiaDocumentacionPage() {
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
              <span className="text-gray-400">Guía de Documentación</span>
            </div>

            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8">
              Legislación Mexicana Vigente
            </span>

            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Guía de{' '}
              <span className="font-bold italic text-[#22AADE]">Documentación</span>
            </h1>

            <p className="text-lg text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6">
              Lista completa y actualizada de todos los documentos necesarios para{' '}
              <strong className="text-white">comprar, vender o rentar</strong> un inmueble en México,
              con referencias a la legislación aplicable.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {['Código Civil Federal', 'LISR', 'Ley del Notariado', 'Código Financiero EdoMex'].map((ley) => (
                <span key={ley} className="text-gray-500 text-xs font-light border border-white/10 px-3 py-1 rounded-full bg-white/5">
                  {ley}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTACIÓN POR OPERACIÓN */}
      {operaciones.map((op, opIdx) => (
        <section key={op.id} className={`py-24 ${opIdx % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#050505]'} border-t border-white/5 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: `${op.color}08` }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${op.color}15` }}>
                <svg className="w-7 h-7" style={{ color: op.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={op.icon} />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extralight text-white">
                  <span className="font-bold">{op.title}</span>
                </h2>
                <p className="text-sm text-gray-500 font-light">{op.subtitle}</p>
              </div>
            </div>

            {/* Categorías de documentos */}
            <div className="space-y-10">
              {op.documentos.map((cat, catIdx) => (
                <div key={catIdx}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: op.color }}>
                    {cat.category}
                  </h3>

                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-[#050505]/50 border border-white/5 rounded-sm p-5 hover:border-white/10 transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            item.obligatorio ? 'bg-red-500/10' : 'bg-white/5'
                          }`}>
                            {item.obligatorio ? (
                              <span className="text-red-400 text-[10px] font-black">!</span>
                            ) : (
                              <span className="text-gray-600 text-[10px]">○</span>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="text-white font-medium text-sm">{item.doc}</h4>
                              <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                item.obligatorio
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  : 'bg-white/5 text-gray-600 border border-white/10'
                              }`}>
                                {item.obligatorio ? 'Obligatorio' : 'Opcional'}
                              </span>
                            </div>
                            {item.nota && (
                              <p className="text-gray-500 text-xs font-light mt-2 leading-relaxed group-hover:text-gray-400 transition-colors">
                                {item.nota}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* IMPUESTOS Y COSTOS */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Impuestos y Costos
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Obligaciones <span className="font-bold italic">Fiscales</span>
            </h3>
            <p className="text-gray-500 font-light">
              Conoce los impuestos y costos asociados a cada tipo de operación inmobiliaria en México.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impuestos.map((imp, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 rounded-sm p-6 hover:border-[#22AADE]/30 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-bold text-sm">{imp.nombre}</h4>
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20">
                    {imp.aplica}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed group-hover:text-gray-400 transition-colors mb-3">
                  {imp.desc}
                </p>
                <p className="text-[10px] text-[#22AADE] uppercase tracking-wider font-bold">
                  Base legal: {imp.base}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER Y RECOMENDACIONES */}
      <section className="py-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-sm p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 text-lg">⚖️</span>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3">Aviso Legal Importante</h3>
                <div className="space-y-3 text-sm text-gray-400 font-light leading-relaxed">
                  <p>
                    Esta guía es <strong className="text-white">informativa y de referencia general</strong>. Los requisitos pueden variar
                    según el municipio, la notaría y las circunstancias específicas de cada operación.
                  </p>
                  <p>
                    La legislación aplicable incluye: <strong className="text-gray-300">Código Civil Federal, Ley del Impuesto Sobre la Renta (LISR),
                    Ley del IVA (LIVA), Código Financiero del Estado de México, Ley del Notariado del Estado de México</strong> y
                    la normativa municipal correspondiente.
                  </p>
                  <p>
                    Siempre consulta con un <strong className="text-white">notario público</strong> y/o un <strong className="text-white">abogado
                    especializado en derecho inmobiliario</strong> antes de realizar cualquier operación de compraventa o arrendamiento.
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
            ¿Necesitas asesoría{' '}
            <span className="font-bold italic">legal inmobiliaria?</span>
          </h2>
          <p className="text-lg mb-10 text-gray-400 font-light max-w-2xl mx-auto">
            Te conectamos con notarios y abogados especializados para que tu operación sea
            segura, legal y transparente desde el primer documento.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contacto"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] transition-all rounded-sm"
            >
              Contactar Asesor Legal
            </Link>
            <Link
              href="/herramientas/checklist-propiedad"
              className="px-10 py-4 border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all rounded-sm"
            >
              Evaluar Mi Propiedad
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
