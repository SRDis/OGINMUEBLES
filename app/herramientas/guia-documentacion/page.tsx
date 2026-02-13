import Link from 'next/link';
import { Metadata } from 'next';
import ChecklistDownloader from './ChecklistDownloader';
import DocumentCard from './DocumentCard';

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
          { 
            doc: 'Identificación oficial vigente (INE/IFE o pasaporte)', 
            obligatorio: true, 
            nota: 'Debe ser original y vigente. El notario debe verificar la identidad de los comparecientes. Si es extranjero, debe presentar pasaporte y forma migratoria vigente (FM2/FM3).',
            fundamento: 'Art. 27 Constitucional, Art. 100 Ley del Notariado EdoMex',
            tramite: {
              pasos: [
                'Verificar que tu identificación esté vigente y en buen estado',
                'Si tu INE está vencida o dañada, tramita una nueva en el módulo del INE más cercano',
                'Para extranjeros: verificar que la forma migratoria (FM2/FM3) esté vigente',
                'Presentar original y copia al notario al momento de la firma'
              ],
              donde: [
                'Módulo del INE para renovación (si aplica)',
                'Oficina de Migración para extranjeros (si aplica)',
                'Notaría pública (presentación)'
              ],
              tiempo: '1-3 semanas (si requiere renovación)',
              costo: '$0 - $500 MXN (renovación INE)'
            }
          },
          { 
            doc: 'CURP actualizada', 
            obligatorio: true, 
            nota: 'Clave Única de Registro de Población. Requerida por el SAT para trámites fiscales y por el notario para la escritura pública. Debe coincidir con la identificación oficial.',
            fundamento: 'Art. 27 Código Fiscal de la Federación',
            tramite: {
              pasos: [
                'Verificar tu CURP en el portal del RENAPO (www.gob.mx/curp)',
                'Si hay errores, solicita corrección en el módulo del RENAPO',
                'Descarga e imprime tu CURP actualizada',
                'Presenta copia al notario'
              ],
              donde: [
                'Portal web: www.gob.mx/curp',
                'Módulo del RENAPO (correcciones)',
                'Notaría pública (presentación)'
              ],
              tiempo: 'Inmediato (descarga) o 1-2 semanas (corrección)',
              costo: 'Gratuito'
            }
          },
          { 
            doc: 'Acta de nacimiento (copia certificada reciente)', 
            obligatorio: true, 
            nota: 'Para acreditar nacionalidad mexicana y estado civil. Si es extranjero, comprobante de legal estancia en el país (FM2/FM3 vigente o forma migratoria). No mayor a 6 meses de expedición.',
            fundamento: 'Art. 27 Constitucional (restricciones a extranjeros en zona restringida)'
          },
          { 
            doc: 'Acta de matrimonio o constancia de soltería', 
            obligatorio: true, 
            nota: 'Define el régimen patrimonial aplicable (sociedad conyugal o separación de bienes). Si está casado bajo sociedad conyugal, el cónyuge debe firmar aunque no aparezca como comprador. Vigencia: no mayor a 3 meses.',
            fundamento: 'Art. 2335-2349 Código Civil Federal (sociedad conyugal)'
          },
          { 
            doc: 'Comprobante de domicilio reciente (máx. 3 meses)', 
            obligatorio: true, 
            nota: 'Recibos de luz, agua, teléfono o estado de cuenta bancario. Debe estar a nombre del comprador o presentar carta de residencia avalada por el titular del servicio.',
            fundamento: 'Prevención de Lavado de Dinero (Art. 17 LFPIORPI)'
          },
        ],
      },
      {
        category: 'Fiscales y Financieros',
        items: [
          { 
            doc: 'RFC con homoclave', 
            obligatorio: true, 
            nota: 'Registro Federal de Contribuyentes — indispensable para la escrituración y pago del ISAI. El notario lo incluye en la escritura pública.',
            fundamento: 'Art. 27 Código Fiscal de la Federación'
          },
          { 
            doc: 'Constancia de Situación Fiscal (CSF)', 
            obligatorio: true, 
            nota: 'Emitida por el SAT con código QR, vigencia reciente (máx. 1 mes). Valida el domicilio fiscal y régimen tributario del comprador.',
            fundamento: 'Art. 27 Código Fiscal de la Federación',
            tramite: {
              pasos: [
                'Ingresa al portal del SAT (www.sat.gob.mx) con tu RFC y contraseña',
                'Ve a "Constancia de Situación Fiscal" en el menú',
                'Descarga la constancia con código QR (formato PDF)',
                'Verifica que la vigencia no sea mayor a 1 mes',
                'Imprime y presenta al notario'
              ],
              donde: [
                'Portal web del SAT: www.sat.gob.mx',
                'Oficinas del SAT (si no tienes acceso digital)',
                'Notaría pública (presentación)'
              ],
              tiempo: '5-10 minutos (digital) o 1-2 horas (presencial)',
              costo: 'Gratuito'
            }
          },
          { 
            doc: 'Comprobante de ingresos o estados de cuenta (últimos 3-6 meses)', 
            obligatorio: false, 
            nota: 'Necesario si se tramita crédito hipotecario. Recibos de nómina, estados de cuenta bancarios, declaraciones fiscales o constancia patronal.',
            fundamento: 'Circular Única de Bancos (requisitos de originación de crédito)'
          },
          { 
            doc: 'Pre-aprobación de crédito hipotecario', 
            obligatorio: false, 
            nota: 'Si aplica financiamiento (INFONAVIT, FOVISSSTE, bancario, Cofinavit). Incluye avalúo aprobado por la institución crediticia y monto máximo autorizado.',
            fundamento: 'Ley del INFONAVIT, Ley del ISSSTE, Ley de Instituciones de Crédito'
          },
          { 
            doc: 'Certificado de no adeudo fiscal municipal', 
            obligatorio: false, 
            nota: 'Algunos municipios lo solicitan para validar que el comprador no tiene adeudos de predial en otras propiedades dentro del mismo municipio.',
            fundamento: 'Código Financiero del Estado de México (Libro Segundo)'
          },
          { 
            doc: 'Constancia de origen lícito de recursos', 
            obligatorio: true, 
            nota: 'Declaración bajo protesta de decir verdad sobre el origen de los recursos utilizados para la compra. Obligatorio para operaciones mayores a 8,025 veces la UMA (~$805,000 MXN en 2024).',
            fundamento: 'Art. 17 y 32 Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita'
          },
        ],
      },
      {
        category: 'Documentos de la Operación',
        items: [
          { 
            doc: 'Contrato de promesa de compraventa', 
            obligatorio: true, 
            nota: 'Acuerdo previo que establece precio, plazos, condiciones, penalizaciones y arras. Puede ser firmado ante notario para mayor certeza jurídica. Define las obligaciones de ambas partes antes de la firma de la escritura definitiva.',
            fundamento: 'Art. 2243-2247 Código Civil Federal (contratos preparatorios)'
          },
          { 
            doc: 'Avalúo bancario, comercial o fiscal vigente', 
            obligatorio: true, 
            nota: 'Realizado por valuador certificado o institución bancaria. Vigencia máxima de 6 meses. Determina el valor real del inmueble para efectos del crédito hipotecario (si aplica) y del ISAI.',
            fundamento: 'Art. 173 Ley de Instituciones de Crédito, NIF C-15 (valuación de inmuebles)'
          },
          { 
            doc: 'Depósito o pago de enganche (comprobante)', 
            obligatorio: true, 
            nota: 'Transferencia bancaria (SPEI), cheque certificado o depósito bancario con comprobante. Nunca en efectivo para montos significativos. Generalmente 10-30% del valor total.',
            fundamento: 'Art. 17 LFPIORPI (prevención de lavado de dinero)'
          },
          { 
            doc: 'Póliza de seguro de daños (si aplica crédito)', 
            obligatorio: false, 
            nota: 'Seguro contra incendio, terremoto y daños estructurales. Obligatorio cuando hay crédito hipotecario. El banco es beneficiario preferente.',
            fundamento: 'Circular Única de Bancos (cobertura de garantías hipotecarias)'
          },
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
          { 
            doc: 'Escritura pública inscrita en el Registro Público de la Propiedad', 
            obligatorio: true, 
            nota: 'Título de propiedad que acredita la titularidad legal. DEBE estar inscrita en el RPP del Estado de México. Si la escritura es muy antigua, puede requerirse una certificación de existencia y vigencia por el notario.',
            fundamento: 'Art. 3011-3019 Código Civil Federal (inscripción en el RPP)'
          },
          { 
            doc: 'Certificado de Libertad de Gravamen vigente (máx. 30 días)', 
            obligatorio: true, 
            nota: 'Emitido por el Registro Público de la Propiedad, confirma que el inmueble está libre de hipotecas, embargos, gravámenes o litigios. Vigencia de 30 días naturales.',
            fundamento: 'Art. 3005 Código Civil Federal, Reglamento del RPP del Estado de México',
            tramite: {
              pasos: [
                'Acudir al Registro Público de la Propiedad del municipio donde está ubicado el inmueble',
                'Presentar solicitud con: número de folio real, ubicación del inmueble, identificación del solicitante',
                'Pagar derechos de expedición ($500-$1,500 MXN según municipio)',
                'Recibir el certificado (generalmente el mismo día o en 24-48 horas)',
                'Verificar que la vigencia no sea mayor a 30 días al momento de la escrituración'
              ],
              donde: [
                'Registro Público de la Propiedad del municipio correspondiente',
                'Oficinas de Catastro municipal (algunos municipios)'
              ],
              tiempo: '1-3 días hábiles',
              costo: '$500 - $1,500 MXN'
            }
          },
          { 
            doc: 'Boletas de impuesto predial al corriente (últimos 5-10 años)', 
            obligatorio: true, 
            nota: 'Impuesto predial municipal pagado y actualizado. Algunos notarios solicitan constancia de no adeudo de hasta 10 años. En caso de adeudo, debe liquidarse antes de la escrituración.',
            fundamento: 'Art. 115, fracción IV Constitución Política de los Estados Unidos Mexicanos',
            tramite: {
              pasos: [
                'Acudir a la Tesorería Municipal o módulo de recaudación',
                'Solicitar copias certificadas de las boletas de predial de los últimos 5-10 años',
                'Si hay adeudos, liquidarlos con recargos y multas',
                'Obtener constancia de no adeudo (si aplica)',
                'Presentar boletas y constancia al notario'
              ],
              donde: [
                'Tesorería Municipal',
                'Módulos de recaudación municipal',
                'Portal web del municipio (algunos permiten descarga)'
              ],
              tiempo: '1-3 días hábiles',
              costo: '$50 - $200 MXN (copias certificadas) + adeudos pendientes'
            }
          },
          { 
            doc: 'Boletas de agua al corriente o constancia de no adeudo', 
            obligatorio: true, 
            nota: 'Constancia expedida por el organismo operador de agua del municipio (CAEM, ODAPAS, etc.). En caso de adeudo, debe liquidarse antes de la firma ante notario.',
            fundamento: 'Ley del Agua del Estado de México'
          },
          { 
            doc: 'Plano catastral, cédula o cartografía catastral vigente', 
            obligatorio: true, 
            nota: 'Emitido por la Dirección de Catastro municipal. Identifica ubicación exacta, medidas, superficies, colindancias y clave catastral del inmueble. Vigencia: generalmente 1 año.',
            fundamento: 'Código Financiero del Estado de México (Libro Segundo - Del Catastro)'
          },
          { 
            doc: 'Constancia de no adeudo de cuotas de mantenimiento', 
            obligatorio: false, 
            nota: 'Aplica si el inmueble está en régimen de condominio o fraccionamiento privado. Emitida por la administración del condominio o asociación de colonos. Incluye pagos de mantenimiento, vigilancia, jardinería, etc.',
            fundamento: 'Ley de Propiedad en Condominio del Estado de México'
          },
          { 
            doc: 'Licencia de construcción y/o uso de suelo', 
            obligatorio: false, 
            nota: 'Si el inmueble tiene construcciones, es recomendable contar con la licencia de construcción o constancia de terminación de obra. Verifica que el uso de suelo sea habitacional, comercial o mixto según corresponda.',
            fundamento: 'Código Administrativo del Estado de México (Libro Quinto - Desarrollo Urbano)'
          },
          { 
            doc: 'Manifestación de construcción o constancia de alineamiento', 
            obligatorio: false, 
            nota: 'Documento expedido por el municipio que valida que la construcción cumple con las normas de construcción y no invade vía pública.',
            fundamento: 'Reglamento de Construcción del Estado de México'
          },
        ],
      },
      {
        category: 'Identificación del Vendedor',
        items: [
          { 
            doc: 'Identificación oficial vigente de todos los propietarios', 
            obligatorio: true, 
            nota: 'Si hay copropietarios o copropiedad, TODOS deben firmar ante notario. Si uno no puede acudir, debe otorgar poder notarial especial para actos de dominio.',
            fundamento: 'Art. 100 Ley del Notariado del Estado de México'
          },
          { 
            doc: 'CURP de todos los propietarios', 
            obligatorio: true, 
            nota: 'Requerida para trámites fiscales ante el SAT y para la escritura pública.',
            fundamento: 'Art. 27 Código Fiscal de la Federación'
          },
          { 
            doc: 'RFC con homoclave', 
            obligatorio: true, 
            nota: 'Necesario para el cálculo y pago del ISR por enajenación de inmueble. El notario retiene el impuesto correspondiente.',
            fundamento: 'Art. 126 Ley del Impuesto Sobre la Renta'
          },
          { 
            doc: 'Constancia de Situación Fiscal (CSF)', 
            obligatorio: true, 
            nota: 'Emitida por el SAT con código QR. Vigencia: máximo 1 mes de antigüedad.',
            fundamento: 'Art. 27 Código Fiscal de la Federación'
          },
          { 
            doc: 'Acta de matrimonio vigente (si aplica)', 
            obligatorio: true, 
            nota: 'El cónyuge debe firmar si el inmueble fue adquirido durante el matrimonio bajo sociedad conyugal, aunque no aparezca en la escritura. Vigencia: no mayor a 3 meses.',
            fundamento: 'Art. 172-183 Código Civil Federal (régimen patrimonial del matrimonio)'
          },
          { 
            doc: 'Poder notarial especial o general para actos de dominio', 
            obligatorio: false, 
            nota: 'Si el propietario no firma directamente. Debe ser poder notarial con facultades expresas para vender inmuebles, inscrito en el RPP y vigente. El notario verificará su validez.',
            fundamento: 'Art. 2554-2556 Código Civil Federal (mandato y representación)'
          },
          { 
            doc: 'Testamento protocolizado o acta de adjudicación (si aplica sucesión)', 
            obligatorio: false, 
            nota: 'Si el vendedor heredó la propiedad. Debe incluir: testamento público abierto, acta de defunción del causante, declaración de herederos y adjudicación de bienes ante notario.',
            fundamento: 'Art. 1295-1310 Código Civil Federal (sucesión testamentaria)'
          },
        ],
      },
      {
        category: 'Fiscales y Legales',
        items: [
          { 
            doc: 'Avalúo bancario, fiscal o comercial actualizado', 
            obligatorio: true, 
            nota: 'Base para el cálculo del ISR (vendedor) y del ISAI (comprador). Vigencia máxima: 6 meses. Debe ser realizado por valuador certificado inscrito en el Padrón Nacional de Peritos Valuadores.',
            fundamento: 'Art. 126 LISR, Art. 7.2 Código Financiero EdoMex (base del ISAI)'
          },
          { 
            doc: 'Cancelación de hipoteca o gravamen (si existe)', 
            obligatorio: false, 
            nota: 'Carta de cancelación del banco acreedor, convenio de finiquito y trámite de liberación ante el RPP. El notario verifica que esté debidamente cancelada e inscrita antes de la operación.',
            fundamento: 'Art. 2941-2943 Código Civil Federal (extinción de hipoteca)'
          },
          { 
            doc: 'Declaración del ISR por enajenación ante el SAT', 
            obligatorio: true, 
            nota: 'Art. 126 LISR — el notario calcula, retiene y entera el impuesto. Exención de hasta 700,000 UDIS (~$5.6 millones MXN) si es casa habitación y el vendedor no ha usado esta exención en los últimos 3 años. Si no aplica exención, se paga el 35% sobre la ganancia.',
            fundamento: 'Art. 93, fracción XIX y Art. 126 Ley del Impuesto Sobre la Renta'
          },
          { 
            doc: 'Comprobante de pago del ISAI por el comprador', 
            obligatorio: true, 
            nota: 'Aunque lo paga el comprador, el notario verifica su entero. En el Estado de México la tasa es del 4.5% sobre el valor más alto entre: precio de venta, avalúo catastral o avalúo comercial.',
            fundamento: 'Art. 7.2 Código Financiero del Estado de México'
          },
          { 
            doc: 'Factura o CFDI de la operación', 
            obligatorio: false, 
            nota: 'Si el vendedor es persona moral (empresa) o si el comprador lo solicita para efectos de deducibilidad fiscal. El notario puede emitir el CFDI de honorarios notariales.',
            fundamento: 'Art. 29 y 29-A Código Fiscal de la Federación'
          },
          { 
            doc: 'Constancia de no inhabilitación (si el vendedor es servidor público)', 
            obligatorio: false, 
            nota: 'Servidores públicos deben presentar declaración patrimonial y de conflicto de interés si adquirieron el bien durante su encargo.',
            fundamento: 'Ley General de Responsabilidades Administrativas'
          },
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
          { 
            doc: 'Escritura pública del inmueble o título de propiedad', 
            obligatorio: true, 
            nota: 'Acredita la titularidad y el derecho legal a arrendar. Si el arrendador es apoderado, debe presentar poder notarial con facultades expresas para arrendar.',
            fundamento: 'Art. 2398 Código Civil Federal (arrendamiento)'
          },
          { 
            doc: 'Identificación oficial vigente', 
            obligatorio: true, 
            nota: 'INE/IFE o pasaporte vigente del propietario o representante legal.',
            fundamento: 'Art. 100 Ley del Notariado (aunque no sea ante notario, es requisito de identificación)'
          },
          { 
            doc: 'RFC con homoclave', 
            obligatorio: true, 
            nota: 'Obligatorio para emitir CFDI de arrendamiento (factura electrónica). El arrendador DEBE facturar mensualmente la renta al inquilino. Régimen fiscal: "Arrendamiento".',
            fundamento: 'Art. 114 Ley del Impuesto Sobre la Renta, Art. 29 y 29-A Código Fiscal de la Federación'
          },
          { 
            doc: 'Constancia de Situación Fiscal (CSF)', 
            obligatorio: true, 
            nota: 'Actualizada ante el SAT. Confirma que el arrendador está dado de alta en el régimen de arrendamiento.',
            fundamento: 'Art. 27 Código Fiscal de la Federación'
          },
          { 
            doc: 'Comprobante de domicilio del arrendador', 
            obligatorio: true, 
            nota: 'Recibo de servicios a nombre del propietario (luz, agua, teléfono). No mayor a 3 meses.',
            fundamento: 'Prevención de Lavado de Dinero (Art. 17 LFPIORPI)'
          },
          { 
            doc: 'Recibos de servicios al corriente del inmueble a rentar', 
            obligatorio: true, 
            nota: 'Luz, agua, predial, gas. Establece el punto de partida para que el inquilino se haga cargo. Debe especificarse en el contrato quién pagará cada servicio.',
            fundamento: 'Art. 2424 Código Civil Federal (obligaciones del arrendatario)'
          },
          { 
            doc: 'Certificado de no adeudo de predial', 
            obligatorio: false, 
            nota: 'Algunos inquilinos lo solicitan para validar que la propiedad no tiene adeudos fiscales que puedan derivar en embargo.',
            fundamento: 'Art. 115 fracción IV Constitución (predial municipal)'
          },
        ],
      },
      {
        category: 'Documentos del Arrendatario (Inquilino)',
        items: [
          { 
            doc: 'Identificación oficial vigente', 
            obligatorio: true, 
            nota: 'INE/IFE o pasaporte. Si son varios inquilinos (roommates), todos deben presentar identificación.',
            fundamento: 'Art. 2398 Código Civil Federal'
          },
          { 
            doc: 'Comprobante de ingresos (últimos 3-6 meses)', 
            obligatorio: true, 
            nota: 'Recibos de nómina, estados de cuenta bancarios, declaraciones fiscales anuales o constancia patronal. Se recomienda que el ingreso mensual sea al menos 3 veces la renta.',
            fundamento: 'Práctica comercial para evaluar capacidad de pago'
          },
          { 
            doc: 'Comprobante de domicilio actual', 
            obligatorio: true, 
            nota: 'Recibo de servicios (luz, agua, teléfono) no mayor a 3 meses. Si vive con familiares, carta de residencia.',
            fundamento: 'Identificación del arrendatario'
          },
          { 
            doc: 'Referencias personales y laborales (2-3)', 
            obligatorio: true, 
            nota: 'Nombre completo, teléfono, relación y domicilio. El arrendador puede verificarlas. Referencias laborales: carta de la empresa, teléfono de RRHH.',
            fundamento: 'Práctica comercial para evaluar solvencia moral y económica'
          },
          { 
            doc: 'Fiador con propiedad en la misma entidad (o póliza jurídica)', 
            obligatorio: true, 
            nota: 'Fiador solidario: presenta escritura pública de propiedad libre de gravamen, identificación oficial, comprobante de domicilio, predial al corriente, comprobante de ingresos, RFC y constancia de situación fiscal. Alternativa moderna: póliza jurídica de arrendamiento.',
            fundamento: 'Art. 2794-2823 Código Civil Federal (fianza)'
          },
          { 
            doc: 'Depósito de garantía (equivalente a 1-2 meses de renta)', 
            obligatorio: true, 
            nota: 'Se devuelve al término del contrato si no hay adeudos ni daños al inmueble. Debe especificarse claramente en el contrato las condiciones de devolución.',
            fundamento: 'Art. 2398 Código Civil Federal'
          },
          { 
            doc: 'Aval obligado solidario (si aplica)', 
            obligatorio: false, 
            nota: 'Persona que se compromete a responder solidariamente con el inquilino. Presenta los mismos documentos que el fiador pero puede no tener propiedad.',
            fundamento: 'Art. 2787-2792 Código Civil Federal (aval)'
          },
        ],
      },
      {
        category: 'Contrato de Arrendamiento',
        items: [
          { 
            doc: 'Contrato de arrendamiento por escrito (mínimo 2 ejemplares)', 
            obligatorio: true, 
            nota: 'Debe incluir: identificación de las partes, descripción del inmueble, plazo del contrato (forzoso y voluntario), monto de renta, forma y fecha de pago, depósito en garantía, destino del inmueble (habitacional/comercial), causas de rescisión, responsabilidades de mantenimiento. Cada parte conserva un original firmado.',
            fundamento: 'Art. 2398-2496 Código Civil Federal (título sexto - arrendamiento)'
          },
          { 
            doc: 'Inventario detallado y estado del inmueble', 
            obligatorio: true, 
            nota: 'Anexo fotográfico completo (mínimo 20-30 fotos) y descriptivo del estado del inmueble, muebles (si aplica), instalaciones, acabados, etc. Firmado por ambas partes al inicio del contrato. Protege a ambas partes en caso de controversia.',
            fundamento: 'Art. 2412 Código Civil Federal (obligación de conservación)'
          },
          { 
            doc: 'Póliza jurídica de arrendamiento', 
            obligatorio: false, 
            nota: 'Alternativa al fiador tradicional. Cubre adeudos de renta (generalmente hasta 12 meses), daños al inmueble y gastos legales de desalojo. Prima anual: 30-40% de una mensualidad. Empresas: Seguros Atlas, Monterrey, AXA.',
            fundamento: 'Ley de Instituciones de Seguros y de Fianzas'
          },
          { 
            doc: 'Cláusula de actualización o incremento de renta', 
            obligatorio: true, 
            nota: 'Debe especificar el mecanismo de incremento anual: INPC (Índice Nacional de Precios al Consumidor), porcentaje fijo (3-5%), o negociación anual. Sin esta cláusula, el arrendador no puede aumentar la renta legalmente.',
            fundamento: 'Art. 2448 Código Civil Federal (actualización de obligaciones)'
          },
          { 
            doc: 'Cláusula de rescisión y penalizaciones', 
            obligatorio: true, 
            nota: 'Causas de terminación anticipada, penalizaciones (generalmente 1-2 meses de renta), plazos de aviso (30-60 días), procedimiento de entrega del inmueble.',
            fundamento: 'Art. 2489-2491 Código Civil Federal (terminación del arrendamiento)'
          },
          { 
            doc: 'Reglamento interno (si es condominio o edificio)', 
            obligatorio: false, 
            nota: 'Anexar el reglamento interno del condominio o fraccionamiento que el inquilino debe cumplir (horarios, mascotas, uso de áreas comunes, estacionamiento, etc.).',
            fundamento: 'Ley de Propiedad en Condominio'
          },
          { 
            doc: 'Constancia de pago de renta mensual (CFDI o recibo)', 
            obligatorio: true, 
            nota: 'El arrendador DEBE emitir factura electrónica (CFDI) por cada pago mensual recibido. El inquilino puede deducir hasta 12 veces la UMA mensual (~$12,000 MXN) si es su casa habitación.',
            fundamento: 'Art. 151, fracción V LISR (deducciones personales), Art. 29-A CFF (comprobantes fiscales)'
          },
        ],
      },
    ],
  },
];

const impuestos = [
  {
    nombre: 'ISR por Enajenación de Inmueble',
    aplica: 'Venta',
    tasa: 'Hasta 35% sobre ganancia',
    desc: 'El vendedor paga el Impuesto Sobre la Renta por la ganancia obtenida (precio de venta menos costo de adquisición actualizado). El notario lo calcula, retiene y entera al SAT dentro de los 15 días siguientes a la firma.',
    exencion: 'Casa habitación: Exención total si la ganancia es menor a 700,000 UDIS (~$5.6 MDP en 2024). Esta exención solo aplica una vez cada 3 años y el vendedor debe haber habitado el inmueble.',
    base: 'Art. 93 fracción XIX, Art. 119-126 Ley del Impuesto Sobre la Renta',
  },
  {
    nombre: 'ISAI (Impuesto sobre Adquisición de Inmuebles)',
    aplica: 'Compra',
    tasa: '4.5% en Estado de México',
    desc: 'Lo paga el comprador al momento de la firma ante notario. Se calcula sobre el valor más alto entre: precio de operación pactado, avalúo catastral o avalúo comercial. El notario lo recauda y entera a la Secretaría de Finanzas del Estado.',
    exencion: 'Exención para adquisiciones de vivienda cuyo valor no exceda de 15 veces el Salario Mínimo General elevado al año (alrededor de $1.5 MDP en 2024), aplicable solo si es la primera adquisición del comprador en el Estado.',
    base: 'Art. 7.2-7.6 del Código Financiero del Estado de México',
  },
  {
    nombre: 'Derechos de Registro Público de la Propiedad',
    aplica: 'Compra',
    tasa: 'Variable según municipio',
    desc: 'Costo de inscripción de la escritura pública en el Registro Público de la Propiedad. Es un trámite obligatorio para que la operación tenga efectos contra terceros. El costo varía según el valor del inmueble y el municipio (aproximadamente 0.5-1% del valor).',
    exencion: 'En algunos casos existe exención para vivienda de interés social o programas específicos de gobierno.',
    base: 'Art. 3005-3019 Código Civil Federal, Código Financiero del Estado de México (Libro Segundo)',
  },
  {
    nombre: 'Honorarios Notariales',
    aplica: 'Compra/Venta',
    tasa: 'Según arancel notarial',
    desc: 'El notario cobra honorarios por: elaboración de la escritura pública, gestión de impuestos (ISR e ISAI), trámites ante el RPP, certificados, testimonios y demás actuaciones. El arancel está regulado por el Estado y varía según el valor de la operación (aprox. 1-3% del valor).',
    exencion: 'No hay exenciones. El arancel es fijo y está regulado por ley estatal.',
    base: 'Art. 137-148 de la Ley del Notariado del Estado de México (arancel notarial)',
  },
  {
    nombre: 'Gastos de Escrituración',
    aplica: 'Compra/Venta',
    tasa: 'Variable',
    desc: 'Incluye: avalúo comercial ($3,000-$8,000), certificado de libertad de gravamen ($500-$1,500), certificado catastral ($200-$800), copias certificadas, testimonios notariales, y otros gastos administrativos. Total aproximado: $15,000-$40,000 MXN dependiendo del valor del inmueble.',
    exencion: 'No aplican exenciones.',
    base: 'Diversos ordenamientos (aranceles registrales, valuadores certificados, catastro municipal)',
  },
  {
    nombre: 'ISR por Arrendamiento',
    aplica: 'Renta (Arrendador)',
    tasa: 'Progresivo según ingresos',
    desc: 'El arrendador debe declarar mensualmente los ingresos por renta en el régimen de arrendamiento. Paga ISR según la tarifa del Art. 152 LISR (progresivo, desde 1.92% hasta 35% según ingresos anuales). Puede deducir: predial, mantenimiento, seguros, intereses hipotecarios (si hay crédito) y depreciación del 3% anual del inmueble.',
    exencion: 'Exención para ingresos por arrendamiento menores a 4 SMG anuales (aproximadamente $180,000 MXN en 2024), aplicable solo a personas físicas.',
    base: 'Art. 114-118 Ley del Impuesto Sobre la Renta, Art. 151 fracción V (deducción para arrendatarios)',
  },
  {
    nombre: 'IVA en Arrendamiento Comercial',
    aplica: 'Renta Comercial',
    tasa: '16%',
    desc: 'La renta de inmuebles destinados a uso comercial, industrial u oficinas está gravada con IVA del 16%. El arrendador debe trasladar el IVA al inquilino en la factura mensual y enterarlo al SAT. La renta de casa habitación está EXENTA de IVA.',
    exencion: 'Exención total para arrendamiento de casa habitación (uso exclusivamente habitacional).',
    base: 'Art. 20 fracción II de la Ley del Impuesto al Valor Agregado',
  },
  {
    nombre: 'Impuesto Predial',
    aplica: 'Propiedad (anual)',
    tasa: 'Variable por municipio',
    desc: 'Impuesto anual que grava la propiedad inmobiliaria. Lo recauda el municipio y su tasa varía según: ubicación, valor catastral, uso de suelo (habitacional, comercial, industrial) y superficie. Se paga anualmente o de forma trimestral con descuentos por pronto pago (10-15% en enero-febrero).',
    exencion: 'Exenciones para: adultos mayores (60-65 años según municipio), personas con discapacidad, jubilados, predios de bajo valor catastral. Cada municipio tiene su propia normativa.',
    base: 'Art. 115 fracción IV Constitución Política de los Estados Unidos Mexicanos, Código Financiero del Estado de México',
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
                      <DocumentCard key={itemIdx} item={item} color={op.color} />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {impuestos.map((imp, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 rounded-sm p-6 hover:border-[#22AADE]/30 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-base mb-1">{imp.nombre}</h4>
                    {imp.tasa && (
                      <p className="text-[#22AADE] text-xs font-bold uppercase tracking-wider">
                        {imp.tasa}
                      </p>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20 flex-shrink-0 ml-3">
                    {imp.aplica}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors mb-3">
                  {imp.desc}
                </p>

                {imp.exencion && (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded px-3 py-2 mb-3">
                    <p className="text-emerald-400 text-xs font-light leading-relaxed">
                      <span className="font-bold uppercase tracking-wider text-[10px]">Exención:</span> {imp.exencion}
                    </p>
                  </div>
                )}
                
                <p className="text-[10px] text-[#22AADE] uppercase tracking-wider font-bold mt-4 pt-3 border-t border-white/5">
                  {imp.base}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE DE TRÁMITES */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Timeline
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Proceso de <span className="font-bold italic">Compraventa</span>
            </h3>
            <p className="text-gray-500 font-light">
              Tiempos estimados y orden recomendado de trámites para una operación exitosa.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { etapa: '01', titulo: 'Preparación y Revisión', tiempo: '1-2 semanas', desc: 'Reunir documentos personales, verificar situación fiscal, obtener constancias de no adeudo, revisar escritura del vendedor.' },
              { etapa: '02', titulo: 'Negociación y Contrato', tiempo: '1-2 semanas', desc: 'Firmar promesa de compraventa, definir condiciones, establecer plazos, acordar precio y forma de pago.' },
              { etapa: '03', titulo: 'Avalúo y Verificaciones', tiempo: '2-3 semanas', desc: 'Avalúo bancario o comercial, verificación de gravámenes, revisión de predial y servicios, inspección física del inmueble.' },
              { etapa: '04', titulo: 'Trámites Notariales', tiempo: '2-4 semanas', desc: 'Elaboración de escritura pública, cálculo de impuestos, revisión de documentos, programación de firma.' },
              { etapa: '05', titulo: 'Firma y Escrituración', tiempo: '1 día', desc: 'Firma ante notario, pago de impuestos y honorarios, entrega de llaves, recepción de copias certificadas.' },
              { etapa: '06', titulo: 'Registro e Inscripción', tiempo: '2-4 semanas', desc: 'Inscripción en el Registro Público de la Propiedad, actualización de predial, cambio de servicios a nombre del comprador.' },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 md:gap-10 group mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#050505] border border-white/10 group-hover:border-[#22AADE] rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0">
                    <span className="text-[#22AADE] font-black text-sm">{step.etapa}</span>
                  </div>
                  {idx < 5 && (
                    <div className="w-[1px] h-full min-h-[60px] bg-white/10 group-hover:bg-[#22AADE]/30 transition-colors" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-[#22AADE] transition-colors uppercase tracking-wider">
                      {step.titulo}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20">
                      {step.tiempo}
                    </span>
                  </div>
                  <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTOS FRECUENTEMENTE OLVIDADOS */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">
              Errores Comunes
            </h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Documentos Frecuentemente <span className="font-bold italic">Olvidados</span>
            </h3>
            <p className="text-gray-500 font-light">
              Estos documentos suelen causar retrasos porque no se consideran hasta el último momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                doc: 'Constancia de Situación Fiscal (CSF) con código QR',
                problema: 'Muchos la solicitan sin código QR o con más de 1 mes de antigüedad',
                solucion: 'Descárgala del portal del SAT con código QR. Vigencia máxima: 1 mes.',
                critico: true,
              },
              {
                doc: 'Acta de matrimonio o constancia de soltería reciente',
                problema: 'Se presenta con más de 3 meses de antigüedad o no se incluye al cónyuge',
                solucion: 'Obtén una copia certificada reciente (máx. 3 meses). Si estás casado bajo sociedad conyugal, tu cónyuge debe firmar.',
                critico: true,
              },
              {
                doc: 'Comprobante de origen lícito de recursos',
                problema: 'No se prepara cuando la operación supera $805,000 MXN',
                solucion: 'Declaración bajo protesta de decir verdad. Incluye estados de cuenta, comprobantes de ingresos o constancia de venta de otro inmueble.',
                critico: true,
              },
              {
                doc: 'Boletas de predial de los últimos 5-10 años',
                problema: 'Solo se presenta el año actual, pero algunos notarios piden hasta 10 años',
                solucion: 'Solicita copias certificadas en el municipio. Si hay adeudos, liquídalos antes de la escrituración.',
                critico: false,
              },
              {
                doc: 'Constancia de no adeudo de servicios (agua, luz)',
                problema: 'Se olvida verificar que no haya adeudos pendientes',
                solucion: 'Obtén constancias de no adeudo del organismo operador de agua (CAEM, ODAPAS) y de CFE.',
                critico: false,
              },
              {
                doc: 'Poder notarial especial para actos de dominio',
                problema: 'Si no puedes firmar personalmente, el poder debe estar inscrito y con facultades expresas',
                solucion: 'El poder debe estar inscrito en el RPP y especificar claramente la facultad de vender. Vigencia: verifica que esté vigente.',
                critico: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#0a0a0a] border rounded-sm p-6 transition-colors ${
                  item.critico
                    ? 'border-red-500/30 hover:border-red-500/60'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.critico ? 'bg-red-500/10' : 'bg-[#22AADE]/10'
                  }`}>
                    <span className={`text-xs font-bold ${item.critico ? 'text-red-400' : 'text-[#22AADE]'}`}>
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-bold mb-2">{item.doc}</h4>
                    {item.critico && (
                      <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 mb-2 inline-block">
                        Crítico
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-11 space-y-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">⚠️ Problema común:</p>
                    <p className="text-gray-400 text-xs font-light">{item.problema}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-green-400 font-bold mb-1">✅ Solución:</p>
                    <p className="text-gray-300 text-xs font-light">{item.solucion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST DESCARGABLE */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#050505] border-2 border-[#22AADE]/30 rounded-sm p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#22AADE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-extralight text-white mb-3">
                Checklist <span className="font-bold italic">Descargable</span>
              </h3>
              <p className="text-gray-400 font-light">
                Descarga una lista verificable de todos los documentos necesarios según tu tipo de operación.
              </p>
            </div>

            <ChecklistDownloader operaciones={operaciones} />

            <p className="text-[10px] text-gray-600 text-center">
              Puedes marcar los documentos conforme los vayas obteniendo. Guarda este archivo para referencia durante tu proceso.
            </p>
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
