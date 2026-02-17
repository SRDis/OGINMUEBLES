'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   DATOS DEL CHECKLIST
   ───────────────────────────────────────────────────────────── */

type ChecklistItem = {
  text: string;
  tip?: string;
  prioridad: 'alta' | 'media' | 'baja';
};

type ChecklistCategory = {
  title: string;
  icon: string;
  items: ChecklistItem[];
  descripcion?: string;
};

const checklistData: ChecklistCategory[] = [
  {
    title: 'Documentación Legal',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    descripcion: 'Documentos esenciales que validan la propiedad y permiten la operación legal',
    items: [
      { 
        text: 'Escritura pública inscrita en el Registro Público de la Propiedad', 
        prioridad: 'alta',
        tip: 'Debe estar inscrita en el RPP del Estado de México. Verifica la inscripción con el número de folio real.'
      },
      { 
        text: 'Certificado de libertad de gravamen vigente (máx. 30 días)', 
        prioridad: 'alta',
        tip: 'Confirma que no hay hipotecas, embargos o litigios. Se obtiene en el RPP. Costo: $500-$1,500 MXN.'
      },
      { 
        text: 'Boletas de predial al corriente (últimos 5-10 años)', 
        prioridad: 'alta',
        tip: 'Algunos notarios solicitan hasta 10 años. Si hay adeudo, debe liquidarse antes de la escrituración.'
      },
      { 
        text: 'Boletas de agua y servicios al corriente', 
        prioridad: 'alta',
        tip: 'Constancia de no adeudo del organismo operador de agua (CAEM, ODAPAS, etc.) y servicios públicos.'
      },
      { 
        text: 'Identificación oficial vigente de todos los propietarios', 
        prioridad: 'alta',
        tip: 'INE/IFE o pasaporte vigente. Si hay copropietarios, todos deben presentar identificación.'
      },
      { 
        text: 'RFC con homoclave y Constancia de Situación Fiscal (CSF)', 
        prioridad: 'alta',
        tip: 'CSF con código QR, vigencia máxima 1 mes. Necesaria para trámites fiscales y escrituración.'
      },
      { 
        text: 'Plano catastral, cédula catastral o cartografía catastral vigente', 
        prioridad: 'alta',
        tip: 'Emitido por Catastro municipal. Identifica ubicación, medidas y colindancias. Vigencia: generalmente 1 año.'
      },
      { 
        text: 'Constancia de no adeudo de cuotas de mantenimiento (si aplica)', 
        prioridad: 'media',
        tip: 'Aplica para condominios o fraccionamientos privados. Emitida por la administración del condominio.'
      },
      { 
        text: 'Acta de matrimonio vigente (si aplica régimen conyugal)', 
        prioridad: 'alta',
        tip: 'El cónyuge debe firmar si el inmueble fue adquirido durante el matrimonio bajo sociedad conyugal.'
      },
      { 
        text: 'Licencia de construcción y/o uso de suelo', 
        prioridad: 'media',
        tip: 'Si el inmueble tiene construcciones, verifica que tenga licencia de construcción o constancia de terminación.'
      },
      { 
        text: 'Cancelación de hipoteca (si la propiedad tenía crédito)', 
        prioridad: 'alta',
        tip: 'Carta de cancelación del banco y trámite de liberación ante el RPP. Verifica que esté debidamente inscrita.'
      },
    ],
  },
  {
    title: 'Estado Físico del Inmueble',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    descripcion: 'Condición estructural y de acabados que impacta directamente el valor y la percepción del comprador',
    items: [
      { 
        text: 'Pintura interior en buen estado (sin manchas, desconchados ni humedad)', 
        prioridad: 'alta',
        tip: 'Usa colores neutros (blanco, beige, gris claro) para maximizar el atractivo. Evita colores muy personalizados.'
      },
      { 
        text: 'Pintura exterior / fachada en buen estado y sin grietas', 
        prioridad: 'alta',
        tip: 'La primera impresión es crucial. Una fachada bien mantenida puede aumentar el valor percibido hasta 10%.'
      },
      { 
        text: 'Pisos sin daños, grietas, manchas ni desgaste excesivo', 
        prioridad: 'alta',
        tip: 'Si los pisos están muy desgastados, considera pulirlos o cambiar solo las áreas más visibles (sala, entrada).'
      },
      { 
        text: 'Sin humedad ni filtraciones visibles en techos, muros o sótanos', 
        prioridad: 'alta',
        tip: 'Las filtraciones son una de las objeciones más comunes. Resuélvelas antes de mostrar la propiedad.'
      },
      { 
        text: 'Instalación eléctrica funcionando correctamente (tomas, interruptores, iluminación)', 
        prioridad: 'alta',
        tip: 'Verifica que todas las tomas funcionen. Considera actualizar a interruptores modernos si son muy antiguos.'
      },
      { 
        text: 'Instalación hidráulica sin fugas (llaves, tuberías, drenajes)', 
        prioridad: 'alta',
        tip: 'Revisa especialmente baños y cocina. Una fuga pequeña puede generar desconfianza en el comprador.'
      },
      { 
        text: 'Puertas y ventanas cerrando correctamente (herrajes, cerraduras, marcos)', 
        prioridad: 'media',
        tip: 'Asegúrate de que todas las cerraduras funcionen. La seguridad es una preocupación importante.'
      },
      { 
        text: 'Techos y azotea impermeabilizada y sin goteras', 
        prioridad: 'alta',
        tip: 'Una azotea bien impermeabilizada puede durar 5-10 años. Si está próxima a vencer, considera renovarla.'
      },
      { 
        text: 'Muros y columnas sin grietas estructurales visibles', 
        prioridad: 'alta',
        tip: 'Las grietas finas (< 2mm) son normales. Grietas mayores requieren evaluación de un ingeniero estructural.'
      },
      { 
        text: 'Ventilación adecuada en todos los espacios (ventanas, extractores)', 
        prioridad: 'media',
        tip: 'Los espacios mal ventilados generan humedad y malos olores. Asegura flujo de aire natural.'
      },
      { 
        text: 'Acabados de calidad (mármol, granito, porcelanato según el nivel de la propiedad)', 
        prioridad: 'media',
        tip: 'Los acabados premium justifican precios más altos. Si son básicos, considera mejoras estratégicas.'
      },
    ],
  },
  {
    title: 'Presentación y Home Staging',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z',
    descripcion: 'La presentación puede aumentar el valor percibido hasta 15% y acelerar la venta',
    items: [
      { 
        text: 'Espacios despejados y sin objetos personales excesivos (fotos, recuerdos, decoración muy personal)', 
        prioridad: 'alta',
        tip: 'El comprador debe poder visualizarse viviendo ahí. Retira 30-40% del mobiliario y objetos personales.'
      },
      { 
        text: 'Limpieza profunda profesional realizada (incluye ventanas, clósets, electrodomésticos, techos)', 
        prioridad: 'alta',
        tip: 'Considera contratar limpieza profesional antes de las visitas. Incluye: alfombras, cortinas, persianas.'
      },
      { 
        text: 'Iluminación adecuada en todos los espacios (natural y artificial)', 
        prioridad: 'alta',
        tip: 'Abre todas las cortinas durante visitas. Usa focos LED cálidos (3000K) para crear ambiente acogedor.'
      },
      { 
        text: 'Jardín o áreas exteriores en buen estado (césped cortado, plantas cuidadas, sin maleza)', 
        prioridad: 'media',
        tip: 'El jardín es la primera impresión. Invierte en poda, riego y plantas de temporada si es necesario.'
      },
      { 
        text: 'Baños y cocina impecables (sin moho, grasa, sarro ni olores)', 
        prioridad: 'alta',
        tip: 'Estas son las áreas más críticas. Considera reemplazar sellos de bañera/regadera si están deteriorados.'
      },
      { 
        text: 'Aromas neutros y agradables (evita olores fuertes de comida, mascotas, tabaco)', 
        prioridad: 'alta',
        tip: 'Usa aromatizantes neutros (vainilla, cítricos suaves) o simplemente airea bien. Evita perfumes fuertes.'
      },
      { 
        text: 'Mobiliario en buen estado y bien distribuido (si se entrega amueblado)', 
        prioridad: 'media',
        tip: 'Si el mobiliario está muy desgastado, considera retirarlo o reemplazarlo con piezas básicas modernas.'
      },
      { 
        text: 'Garaje/estacionamiento limpio, despejado y bien iluminado', 
        prioridad: 'media',
        tip: 'Un garaje desordenado sugiere falta de mantenimiento general. Organiza y limpia antes de visitas.'
      },
      { 
        text: 'Decoración neutral y moderna (cojines, cuadros, plantas decorativas)', 
        prioridad: 'baja',
        tip: 'Agrega toques decorativos mínimos: plantas verdes, cojines neutros, espejos. Evita sobrecargar.'
      },
      { 
        text: 'Mascotas y sus accesorios fuera de vista durante visitas', 
        prioridad: 'media',
        tip: 'Aunque ames a tus mascotas, algunos compradores pueden tener alergias o fobias. Retira todo rastro.'
      },
    ],
  },
  {
    title: 'Servicios e Instalaciones',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    descripcion: 'Servicios funcionales que agregan valor y comodidad al inmueble',
    items: [
      { 
        text: 'Calentador de agua (boiler) funcionando correctamente y con mantenimiento reciente', 
        prioridad: 'alta',
        tip: 'Verifica que caliente adecuadamente. Si tiene más de 10 años, considera mencionar que puede requerir reemplazo pronto.'
      },
      { 
        text: 'Gas LP o natural con instalación certificada y válvulas de seguridad', 
        prioridad: 'alta',
        tip: 'La instalación de gas debe cumplir con NOM-003-SEDG. Presenta certificado de instalación si lo tienes.'
      },
      { 
        text: 'Internet / TV cable con cableado oculto y organizado', 
        prioridad: 'media',
        tip: 'Los cables visibles dan sensación de desorden. Considera ocultarlos o usar canaletas decorativas.'
      },
      { 
        text: 'Aire acondicionado / calefacción funcional y con mantenimiento (si tiene)', 
        prioridad: 'media',
        tip: 'Si tiene más de 5 años, considera servicio de limpieza de filtros y verificación antes de mostrar.'
      },
      { 
        text: 'Cisterna o tinaco en buen estado, limpio y con tapa segura', 
        prioridad: 'alta',
        tip: 'Limpia la cisterna/tinaco antes de mostrar. El agua es un tema sensible para compradores.'
      },
      { 
        text: 'Bomba de agua funcionando correctamente (si aplica)', 
        prioridad: 'alta',
        tip: 'Verifica presión y ruido. Una bomba muy ruidosa puede ser una objeción importante.'
      },
      { 
        text: 'Sistema de seguridad / alarma funcionando (si tiene)', 
        prioridad: 'baja',
        tip: 'Si tienes alarma, muéstrala funcionando. La seguridad es un valor agregado importante.'
      },
      { 
        text: 'Interfón, portero eléctrico o control de acceso funcionando', 
        prioridad: 'media',
        tip: 'Verifica que todos los botones funcionen. Un interfón roto sugiere falta de mantenimiento.'
      },
      { 
        text: 'Sistema de riego automático (si tiene jardín amplio)', 
        prioridad: 'baja',
        tip: 'Un sistema de riego automático es un valor agregado que puede justificar un precio más alto.'
      },
      { 
        text: 'Paneles solares o sistema de energía alternativa (si tiene)', 
        prioridad: 'baja',
        tip: 'Destaca este tipo de instalaciones. Son un diferenciador importante en el mercado actual.'
      },
    ],
  },
  {
    title: 'Marketing y Fotografía',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    descripcion: 'La presentación digital es la primera impresión. Invierte en marketing profesional',
    items: [
      { 
        text: 'Fotografía profesional de alta calidad (mínimo 20-25 fotos: exteriores, interiores, detalles)', 
        prioridad: 'alta',
        tip: 'Usa fotógrafo profesional con equipo especializado. Las fotos profesionales pueden aumentar el interés hasta 300%.'
      },
      { 
        text: 'Video o recorrido virtual 360° grabado profesionalmente', 
        prioridad: 'alta',
        tip: 'Los recorridos virtuales aumentan el engagement 400%. Incluye narración destacando las mejores características.'
      },
      { 
        text: 'Descripción atractiva, detallada y con palabras clave SEO', 
        prioridad: 'alta',
        tip: 'Incluye: ubicación, características, amenidades, cercanía a servicios, orientación, vistas. Mínimo 200 palabras.'
      },
      { 
        text: 'Precio competitivo definido mediante análisis comparativo de mercado (CMA)', 
        prioridad: 'alta',
        tip: 'Un precio 5-10% sobre el mercado puede hacer que la propiedad no se venda. Consulta con tu asesor inmobiliario.'
      },
      { 
        text: 'Publicación en portales inmobiliarios principales (Inmuebles24, Vivanuncios, Propiedades.com, etc.)', 
        prioridad: 'alta',
        tip: 'Publica en al menos 3-5 portales principales. El 85% de compradores inician su búsqueda en línea.'
      },
      { 
        text: 'Redes sociales del asesor con publicación activa y profesional', 
        prioridad: 'media',
        tip: 'Facebook, Instagram y LinkedIn. Usa hashtags relevantes (#propiedades #inmuebles #venta #renta + ubicación).'
      },
      { 
        text: 'Plano o distribución del inmueble incluido en la publicación', 
        prioridad: 'media',
        tip: 'Los planos ayudan a los compradores a visualizar el espacio. Incluye medidas y distribución de ambientes.'
      },
      { 
        text: 'Ubicación en Google Maps con Street View actualizado', 
        prioridad: 'media',
        tip: 'Verifica que Google Maps muestre correctamente la ubicación. Los compradores revisan la zona antes de visitar.'
      },
      { 
        text: 'Señalamiento físico en la propiedad (si es permitido y estratégico)', 
        prioridad: 'baja',
        tip: 'Un letrero profesional puede generar leads locales. Verifica regulaciones municipales sobre señalización.'
      },
      { 
        text: 'Material impreso profesional (flyers, brochures) para visitas', 
        prioridad: 'baja',
        tip: 'Un flyer bien diseñado que los visitantes puedan llevarse aumenta el recuerdo de la propiedad.'
      },
    ],
  },
  {
    title: 'Aspectos Fiscales y Legales',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    descripcion: 'Preparación legal y fiscal para una operación segura y sin contratiempos',
    items: [
      { 
        text: 'Avalúo bancario, comercial o fiscal actualizado (máx. 6 meses de vigencia)', 
        prioridad: 'alta',
        tip: 'El avalúo determina el valor para créditos hipotecarios y cálculo de impuestos. Realizado por valuador certificado.'
      },
      { 
        text: 'Contrato de compraventa o renta revisado y aprobado por abogado especializado', 
        prioridad: 'alta',
        tip: 'Un contrato bien redactado protege tus intereses. Incluye cláusulas de penalización, plazos y condiciones claras.'
      },
      { 
        text: 'Conocimiento del ISR por enajenación y exenciones aplicables', 
        prioridad: 'alta',
        tip: 'Casa habitación: exención de hasta 700,000 UDIS (~$5.6 MDP) una vez cada 3 años. Consulta con contador.'
      },
      { 
        text: 'Notario público seleccionado y consultado sobre costos estimados', 
        prioridad: 'alta',
        tip: 'Los honorarios notariales varían según el valor. Solicita cotización previa para presupuestar correctamente.'
      },
      { 
        text: 'Poder notarial especial para actos de dominio (si el propietario no firma directamente)', 
        prioridad: 'media',
        tip: 'El poder debe estar vigente, inscrito en el RPP y con facultades expresas para vender. Verifica con notario.'
      },
      { 
        text: 'Cancelación de hipoteca debidamente inscrita en el RPP (si la propiedad tenía crédito)', 
        prioridad: 'alta',
        tip: 'Verifica que la cancelación esté inscrita. Un certificado de libertad de gravamen lo confirma.'
      },
      { 
        text: 'Constancia de origen lícito de recursos (si la operación supera $805,000 MXN)', 
        prioridad: 'alta',
        tip: 'Obligatorio por prevención de lavado de dinero. Declaración bajo protesta de decir verdad sobre el origen.'
      },
      { 
        text: 'Presupuesto de gastos notariales e impuestos (ISAI, derechos de registro, honorarios)', 
        prioridad: 'media',
        tip: 'En Estado de México: ISAI 4.5%, honorarios notariales 1-3%, derechos de registro 0.5-1%. Total: ~6-8% del valor.'
      },
      { 
        text: 'Asesoría fiscal para optimizar el pago de impuestos (si aplica)', 
        prioridad: 'media',
        tip: 'Un contador puede ayudarte a estructurar la operación para minimizar el impacto fiscal legalmente.'
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ───────────────────────────────────────────────────────────── */

export default function ChecklistPropiedadPage() {
  // Checked items: { [categoryIdx-itemIdx]: boolean }
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<'venta' | 'renta'>('venta');

  // Contacto modal
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    emailConfirm: '',
    telefono: '',
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [pendingAction, setPendingAction] = useState<'guardar' | 'imprimir' | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  // Toggle check
  const toggleCheck = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Stats
  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItems) * 100);
  
  // Items por prioridad
  const itemsAlta = checklistData.reduce((acc, cat) => 
    acc + cat.items.filter(item => item.prioridad === 'alta').length, 0
  );
  const itemsAltaChecked = checklistData.reduce((acc, cat) => 
    acc + cat.items.filter((item, iIdx) => {
      const catIdx = checklistData.indexOf(cat);
      return item.prioridad === 'alta' && checked[`${catIdx}-${iIdx}`];
    }).length, 0
  );

  // Score label y recomendaciones
  const getScoreLabel = () => {
    if (percentage >= 90) {
      return { 
        label: 'Excelente', 
        color: '#22AADE', 
        desc: '¡Tu propiedad está prácticamente lista para el mercado!',
        recomendaciones: [
          'Tu propiedad está en excelente estado. Considera hacer una última revisión de detalles menores.',
          'Enfócate en el marketing: fotografía profesional, video tour y descripción optimizada.',
          'Asegúrate de tener todos los documentos legales listos para agilizar la operación.',
          'Considera hacer un staging profesional para maximizar el impacto visual.',
        ]
      };
    }
    if (percentage >= 70) {
      return { 
        label: 'Muy Bien', 
        color: '#4ade80', 
        desc: 'Estás muy cerca. Completa los puntos pendientes.',
        recomendaciones: [
          'Prioriza los items de prioridad ALTA que aún no has completado.',
          'Revisa especialmente documentación legal y estado físico del inmueble.',
          'Considera hacer mejoras menores que tengan alto impacto visual (pintura, limpieza profunda).',
          'Una vez completados los puntos críticos, estarás listo para salir al mercado.',
        ]
      };
    }
    if (percentage >= 50) {
      return { 
        label: 'En Progreso', 
        color: '#facc15', 
        desc: 'Buen avance, pero hay aspectos importantes por resolver.',
        recomendaciones: [
          'Enfócate primero en completar TODOS los items de prioridad ALTA antes de continuar.',
          'La documentación legal es crítica: sin ella no podrás realizar la operación.',
          'El estado físico del inmueble impacta directamente el precio. Invierte en reparaciones necesarias.',
          'Considera contratar profesionales para mantenimiento, limpieza y fotografía.',
        ]
      };
    }
    if (percentage >= 25) {
      return { 
        label: 'Necesita Trabajo', 
        color: '#fb923c', 
        desc: 'Aún hay bastantes puntos por atender antes de salir al mercado.',
        recomendaciones: [
          'Tu propiedad necesita trabajo significativo antes de salir al mercado.',
          'Crea un plan de acción priorizando: 1) Documentación legal, 2) Estado físico crítico, 3) Presentación.',
          'Considera hacer un presupuesto para mejoras necesarias y evalúa el ROI de cada inversión.',
          'No salgas al mercado hasta completar al menos el 70% de los items, especialmente los de prioridad alta.',
        ]
      };
    }
    return { 
      label: 'Inicio', 
      color: '#ef4444', 
      desc: 'Comienza a evaluar tu propiedad marcando los puntos que ya tienes listos.',
      recomendaciones: [
        'Estás en las primeras etapas de preparación. No te desanimes, cada propiedad requiere trabajo.',
        'Comienza por la documentación legal: es el fundamento de cualquier operación inmobiliaria.',
        'Haz una evaluación profesional del estado físico para identificar qué necesita reparación urgente.',
        'Considera contratar un asesor inmobiliario profesional que te guíe en el proceso completo.',
      ]
    };
  };

  const score = getScoreLabel();

  // Validar contacto
  const validateContact = () => {
    const errors: Record<string, string> = {};
    if (!contactForm.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
    if (!contactForm.email.trim()) {
      errors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = 'Ingresa un correo válido';
    }
    if (contactForm.email !== contactForm.emailConfirm) {
      errors.emailConfirm = 'Los correos no coinciden';
    }
    if (!contactForm.telefono.trim()) {
      errors.telefono = 'El teléfono es obligatorio';
    } else if (contactForm.telefono.replace(/\D/g, '').length < 10) {
      errors.telefono = 'Ingresa un teléfono de al menos 10 dígitos';
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle guardar/imprimir
  const handleAction = (action: 'guardar' | 'imprimir') => {
    if (contactSubmitted) {
      executeAction(action);
    } else {
      setPendingAction(action);
      setShowContactModal(true);
    }
  };

  const handleContactSubmit = () => {
    if (!validateContact()) return;
    setContactSubmitted(true);
    setShowContactModal(false);
    if (pendingAction) {
      executeAction(pendingAction);
      setPendingAction(null);
    }
  };

  const executeAction = (action: 'guardar' | 'imprimir') => {
    if (action === 'imprimir') {
      window.print();
    } else {
      // Generar texto del checklist
      const lines: string[] = [
        `CHECKLIST DE PREPARACIÓN PARA ${mode.toUpperCase()}`,
        `Fecha: ${new Date().toLocaleDateString('es-MX')}`,
        `Puntaje: ${percentage}% — ${score.label}`,
        `Contacto: ${contactForm.nombre} | ${contactForm.email} | ${contactForm.telefono}`,
        '',
        '──────────────────────────────────────',
        '',
      ];

      checklistData.forEach((cat, cIdx) => {
        lines.push(`📋 ${cat.title.toUpperCase()}`);
        if (cat.descripcion) {
          lines.push(`   ${cat.descripcion}`);
          lines.push('');
        }
        cat.items.forEach((item, iIdx) => {
          const isChecked = checked[`${cIdx}-${iIdx}`];
          const prioridad = `[${item.prioridad.toUpperCase()}]`;
          lines.push(`  ${isChecked ? '✅' : '⬜'} ${prioridad} ${item.text}`);
          if (item.tip && !isChecked) {
            lines.push(`     💡 ${item.tip}`);
          }
        });
        lines.push('');
      });

      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `checklist-propiedad-${mode}-${new Date().toISOString().slice(0, 10)}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, footer, .no-print { display: none !important; }
          .print-block { display: block !important; }
        }
      `}</style>

      {/* ============================================= */}
      {/* HERO */}
      {/* ============================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-xs text-gray-500 px-4">
              <Link href="/herramientas" className="hover:text-[#22AADE] transition-colors touch-manipulation">Herramientas</Link>
              <span>/</span>
              <span className="text-gray-400">Checklist de Propiedad</span>
            </div>

            <span className="inline-block py-1.5 px-3 sm:px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-6 sm:mb-8 backdrop-blur-md">
              Herramienta Gratuita
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter leading-[0.95] mb-6 sm:mb-8 px-4">
              ¿Tu propiedad está lista para{' '}
              <span className="font-bold italic text-[#22AADE]">{mode === 'venta' ? 'venderse' : 'rentarse'}?</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Revisa cada punto de esta checklist profesional para evaluar qué tan preparada está tu propiedad
              para salir al mercado. Al finalizar, podrás descargar o imprimir tu evaluación.
            </p>

            {/* Toggle Venta / Renta */}
            <div className="inline-flex bg-[#0a0a0a] border border-white/10 rounded-full p-1">
              <button
                onClick={() => setMode('venta')}
                className={`px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${
                  mode === 'venta'
                    ? 'bg-[#22AADE] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Para Venta
              </button>
              <button
                onClick={() => setMode('renta')}
                className={`px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${
                  mode === 'renta'
                    ? 'bg-[#22AADE] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Para Renta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* BARRA DE PROGRESO STICKY */}
      {/* ============================================= */}
      <div className="sticky top-20 z-50 no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-5 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Score */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={score.color}
                      strokeWidth="3"
                      strokeDasharray={`${percentage}, 100`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-black" style={{ color: score.color }}>
                    {percentage}%
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">{score.label}</span>
                  <span className="block text-[10px] text-gray-500">{checkedCount} de {totalItems} puntos</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex-grow w-full">
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%`, backgroundColor: score.color }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] text-gray-500 hidden md:block">{score.desc}</p>
                  <p className="text-[10px] text-gray-600">
                    {itemsAltaChecked}/{itemsAlta} prioridad alta
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={() => handleAction('guardar')}
                  className="px-5 py-2 bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg hover:border-[#22AADE] hover:text-[#22AADE] transition-all"
                >
                  💾 Guardar
                </button>
                <button
                  onClick={() => handleAction('imprimir')}
                  className="px-5 py-2 bg-[#22AADE] text-black text-[10px] uppercase tracking-wider font-bold rounded-lg hover:bg-white transition-all"
                >
                  🖨️ Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* CHECKLIST CATEGORIES */}
      {/* ============================================= */}
      <section className="py-16" ref={printRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {checklistData.map((category, catIdx) => {
              const catChecked = category.items.filter((_, iIdx) => checked[`${catIdx}-${iIdx}`]).length;
              const catTotal = category.items.length;
              const catPercent = Math.round((catChecked / catTotal) * 100);

              return (
                <div
                  key={catIdx}
                  className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8 hover:border-[#22AADE]/20 transition-colors duration-500"
                >
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base uppercase tracking-wider">{category.title}</h3>
                        <span className="text-[10px] text-gray-500">{catChecked} de {catTotal} completados</span>
                        {category.descripcion && (
                          <p className="text-[10px] text-gray-600 mt-1 italic">{category.descripcion}</p>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-sm font-black px-3 py-1 rounded-full"
                      style={{
                        color: catPercent === 100 ? '#22AADE' : catPercent >= 50 ? '#facc15' : '#ef4444',
                        backgroundColor: catPercent === 100 ? 'rgba(34,170,222,0.1)' : catPercent >= 50 ? 'rgba(250,204,21,0.1)' : 'rgba(239,68,68,0.1)',
                      }}
                    >
                      {catPercent}%
                    </span>
                  </div>

                  {/* Mini progress */}
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${catPercent}%`,
                        backgroundColor: catPercent === 100 ? '#22AADE' : catPercent >= 50 ? '#facc15' : '#ef4444',
                      }}
                    />
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {category.items.map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isChecked = checked[key] || false;
                      const prioridadColor = item.prioridad === 'alta' ? 'red' : item.prioridad === 'media' ? 'amber' : 'gray';

                      return (
                        <div
                          key={itemIdx}
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            isChecked
                              ? 'bg-[#22AADE]/5 border border-[#22AADE]/20'
                              : 'bg-white/[0.02] border border-transparent hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <label className="flex items-start gap-3 cursor-pointer">
                            <div className="flex-shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCheck(catIdx, itemIdx)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                isChecked
                                  ? 'bg-[#22AADE] border-[#22AADE]'
                                  : 'border-gray-600 hover:border-gray-400'
                              }`}>
                                {isChecked && (
                                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-start justify-between gap-2">
                                <span className={`text-sm font-light transition-colors flex-grow ${
                                  isChecked ? 'text-white line-through opacity-70' : 'text-gray-300'
                                }`}>
                                  {item.text}
                                </span>
                                <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                                  item.prioridad === 'alta'
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : item.prioridad === 'media'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                                }`}>
                                  {item.prioridad}
                                </span>
                              </div>
                              {item.tip && !isChecked && (
                                <div className="mt-2 ml-7 p-2 bg-[#22AADE]/5 border border-[#22AADE]/10 rounded text-xs text-gray-400 font-light leading-relaxed">
                                  <span className="text-[#22AADE] font-bold text-[10px] uppercase tracking-wider">💡 Tip:</span> {item.tip}
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* RESULTADO FINAL */}
      {/* ============================================= */}
      <section className="py-16 bg-[#0a0a0a] border-y border-white/5 no-print">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={score.color}
                  strokeWidth="2"
                  strokeDasharray={`${percentage}, 100`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-black" style={{ color: score.color }}>
                {percentage}%
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
              Tu puntaje: <span className="font-bold" style={{ color: score.color }}>{score.label}</span>
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto mb-8">
              {score.desc}
            </p>

            {/* Recomendaciones personalizadas */}
            {score.recomendaciones && (
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8 max-w-3xl mx-auto mb-8">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recomendaciones Personalizadas
                </h3>
                <ul className="space-y-3">
                  {score.recomendaciones.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 font-light leading-relaxed">
                      <span className="text-[#22AADE] font-bold text-xs mt-0.5">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleAction('guardar')}
              className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all rounded-sm"
            >
              💾 Descargar Resultados
            </button>
            <button
              onClick={() => handleAction('imprimir')}
              className="px-8 py-4 bg-[#22AADE] text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all rounded-sm"
            >
              🖨️ Imprimir Checklist
            </button>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all rounded-sm text-center"
            >
              Asesoría Profesional
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* CTA FINAL */}
      {/* ============================================= */}
      <section className="py-24 bg-[#050505] relative overflow-hidden no-print">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extralight text-white mb-6 tracking-tighter">
            ¿Necesitas ayuda para preparar tu propiedad?
          </h2>
          <p className="text-lg mb-10 text-gray-400 font-light max-w-2xl mx-auto">
            Nuestro equipo puede ayudarte a completar cada punto de esta checklist:
            mantenimiento, fotografía profesional, documentación legal y más.
          </p>

          <Link
            href="/contacto"
            className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:text-black hover:scale-105 transition-all duration-300 rounded-sm inline-block"
          >
            Hablar con un Asesor
          </Link>
        </div>
      </section>

      {/* ============================================= */}
      {/* MODAL DE CONTACTO */}
      {/* ============================================= */}
      {showContactModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => { setShowContactModal(false); setPendingAction(null); }}
          />

          {/* Modal */}
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in-95">
            {/* Close */}
            <button
              onClick={() => { setShowContactModal(false); setPendingAction(null); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#22AADE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Información de Contacto</h3>
              <p className="text-gray-500 text-sm font-light">
                Para {pendingAction === 'imprimir' ? 'imprimir' : 'descargar'} tu checklist, necesitamos verificar tu información de contacto.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                  Nombre completo <span className="text-[#22AADE]">*</span>
                </label>
                <input
                  type="text"
                  value={contactForm.nombre}
                  onChange={(e) => setContactForm(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Tu nombre completo"
                  className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors ${
                    contactErrors.nombre ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {contactErrors.nombre && (
                  <p className="text-red-400 text-xs mt-1">{contactErrors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                  Correo electrónico <span className="text-[#22AADE]">*</span>
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="correo@ejemplo.com"
                  className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors ${
                    contactErrors.email ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {contactErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{contactErrors.email}</p>
                )}
              </div>

              {/* Confirmar email */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                  Confirmar correo <span className="text-[#22AADE]">*</span>
                </label>
                <input
                  type="email"
                  value={contactForm.emailConfirm}
                  onChange={(e) => setContactForm(prev => ({ ...prev, emailConfirm: e.target.value }))}
                  placeholder="Repite tu correo"
                  className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors ${
                    contactErrors.emailConfirm ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {contactErrors.emailConfirm && (
                  <p className="text-red-400 text-xs mt-1">{contactErrors.emailConfirm}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                  Teléfono <span className="text-[#22AADE]">*</span>
                </label>
                <input
                  type="tel"
                  value={contactForm.telefono}
                  onChange={(e) => setContactForm(prev => ({ ...prev, telefono: e.target.value }))}
                  placeholder="+52 55 1234 5678"
                  className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors ${
                    contactErrors.telefono ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {contactErrors.telefono && (
                  <p className="text-red-400 text-xs mt-1">{contactErrors.telefono}</p>
                )}
              </div>

              {/* Privacy */}
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Al enviar tu información, aceptas nuestro{' '}
                <Link href="/privacidad" className="text-[#22AADE] hover:underline">aviso de privacidad</Link>.
                Tu información se usará exclusivamente para contacto relacionado con servicios inmobiliarios.
              </p>

              {/* Submit */}
              <button
                onClick={handleContactSubmit}
                className="w-full bg-[#22AADE] text-black py-4 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 mt-2"
              >
                Confirmar y {pendingAction === 'imprimir' ? 'Imprimir' : 'Descargar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
