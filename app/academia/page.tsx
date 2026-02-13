'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   TIPOS
   ───────────────────────────────────────────────────────────── */

type Audiencia = 'asesor-nuevo' | 'asesor-pro' | 'comprador' | 'inversionista';
type TipoContenido = 'curso' | 'guia' | 'checklist' | 'video' | 'descargable' | 'plantilla';

type Recurso = {
  id: string;
  titulo: string;
  desc: string;
  audiencias: Audiencia[];
  tipo: TipoContenido;
  duracion: string;
  destacado?: boolean;
  premium?: boolean;
  href?: string;
};

/* ─────────────────────────────────────────────────────────────
   DATOS
   ───────────────────────────────────────────────────────────── */

const audienciaLabels: Record<Audiencia, { label: string; color: string; desc: string; icon: string }> = {
  'asesor-nuevo': {
    label: 'Nuevos Asesores',
    color: '#22AADE',
    desc: 'Empieza tu carrera inmobiliaria con bases sólidas. Scripts, técnicas de captación y documentación esencial.',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  },
  'asesor-pro': {
    label: 'Asesores Profesionales',
    color: '#a78bfa',
    desc: 'Escala tu negocio con funnels, automatización, branding personal y estrategias de cierre avanzado.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  comprador: {
    label: 'Compradores',
    color: '#4ade80',
    desc: 'Todo lo que necesitas saber antes de comprar tu primera propiedad. Créditos, gastos y errores comunes.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  inversionista: {
    label: 'Inversionistas',
    color: '#facc15',
    desc: 'Análisis de ROI, estrategias de renta, plusvalía, fideicomisos y due diligence para inversiones seguras.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
};

const tipoLabels: Record<TipoContenido, { label: string; icon: string }> = {
  curso: { label: 'Curso', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  guia: { label: 'Guía', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  checklist: { label: 'Checklist', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  video: { label: 'Video', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  descargable: { label: 'Descargable', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  plantilla: { label: 'Plantilla', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
};

const recursos: Recurso[] = [
  // ──── NUEVOS ASESORES ────
  {
    id: 'capt-prop',
    titulo: 'Cómo Captar Propiedades: Guía Paso a Paso',
    desc: 'Aprende las técnicas más efectivas para captar exclusivas inmobiliarias: prospección, pitch, presentación de servicios y cierre de captación.',
    audiencias: ['asesor-nuevo'],
    tipo: 'guia',
    duracion: '20 min',
    destacado: true,
  },
  {
    id: 'calif-prospectos',
    titulo: 'Cómo Calificar Prospectos Rápidamente',
    desc: 'Framework BANT adaptado al sector inmobiliario mexicano. Identifica compradores reales vs curiosos en los primeros 5 minutos de conversación.',
    audiencias: ['asesor-nuevo'],
    tipo: 'curso',
    duracion: '15 min',
  },
  {
    id: 'seguimiento',
    titulo: 'Sistema de Seguimiento que Genera Cierres',
    desc: 'Estructura de seguimiento por fases: 24h, 3 días, 7 días, 15 días, 30 días. Scripts por WhatsApp, llamada y email para cada etapa.',
    audiencias: ['asesor-nuevo'],
    tipo: 'curso',
    duracion: '25 min',
  },
  {
    id: 'visitas-efectivas',
    titulo: 'Cómo Hacer Visitas Efectivas a Propiedades',
    desc: 'Protocolo de visita profesional: preparación, recorrido, manejo de objeciones in situ, cierre emocional y seguimiento post-visita.',
    audiencias: ['asesor-nuevo'],
    tipo: 'guia',
    duracion: '18 min',
  },
  {
    id: 'negociacion-basica',
    titulo: 'Fundamentos de Negociación Inmobiliaria',
    desc: 'Técnicas de negociación adaptadas al mercado mexicano: anclaje de precio, BATNA, concesiones estratégicas y cierre win-win.',
    audiencias: ['asesor-nuevo'],
    tipo: 'curso',
    duracion: '30 min',
  },
  {
    id: 'docs-basica',
    titulo: 'Documentación Básica para Asesores (México)',
    desc: 'Todo lo que debes conocer sobre escrituras, constancias, certificados, impuestos y trámites notariales para asesorar con confianza.',
    audiencias: ['asesor-nuevo'],
    tipo: 'guia',
    duracion: '22 min',
    href: '/herramientas/guia-documentacion',
  },
  {
    id: 'scripts-ventas',
    titulo: 'Scripts de Ventas Inmobiliarias',
    desc: '12 scripts probados para: primera llamada, seguimiento, objeciones de precio, cierre por urgencia, referidos y reactivación de prospectos fríos.',
    audiencias: ['asesor-nuevo'],
    tipo: 'descargable',
    duracion: 'PDF · 8 págs',
    destacado: true,
  },
  {
    id: 'objeciones',
    titulo: 'Las 20 Objeciones Más Comunes y Cómo Manejarlas',
    desc: '"Está muy caro", "Lo voy a pensar", "Mi cuñado es abogado"... Cada objeción con análisis, respuesta sugerida y ejemplo real.',
    audiencias: ['asesor-nuevo'],
    tipo: 'descargable',
    duracion: 'PDF · 12 págs',
  },

  // ──── ASESORES PRO ────
  {
    id: 'branding',
    titulo: 'Branding Personal para Asesores Inmobiliarios',
    desc: 'Construye una marca personal que genere confianza: posicionamiento, identidad visual, tono de comunicación y presencia digital estratégica.',
    audiencias: ['asesor-pro'],
    tipo: 'curso',
    duracion: '35 min',
    destacado: true,
  },
  {
    id: 'funnels',
    titulo: 'Funnels de Captación Digital Inmobiliaria',
    desc: 'Diseña embudos de ventas desde Meta Ads → Landing → CRM → Cierre. Con métricas clave: CPL, tasa de conversión y ROI por campaña.',
    audiencias: ['asesor-pro'],
    tipo: 'curso',
    duracion: '40 min',
    premium: true,
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización para Asesores: CRM y Workflows',
    desc: 'Configura sistemas que trabajen por ti: autorespuestas, secuencias de email, recordatorios de seguimiento y pipeline automatizado.',
    audiencias: ['asesor-pro'],
    tipo: 'curso',
    duracion: '45 min',
    premium: true,
  },
  {
    id: 'contenido-estrategia',
    titulo: 'Estrategia de Contenido que Atrae Clientes',
    desc: 'Plan de contenido para redes sociales: pilares, formatos, frecuencia, hooks que funcionan y cómo convertir seguidores en prospectos.',
    audiencias: ['asesor-pro'],
    tipo: 'guia',
    duracion: '28 min',
  },
  {
    id: 'captacion-digital',
    titulo: 'Captación Digital: De Online a Mesa de Cierre',
    desc: 'El proceso completo desde la generación de leads digitales hasta el cierre presencial. Métricas, herramientas y casos de estudio reales.',
    audiencias: ['asesor-pro'],
    tipo: 'curso',
    duracion: '50 min',
    premium: true,
  },
  {
    id: 'cierres-avanzados',
    titulo: 'Técnicas de Cierre Avanzado',
    desc: 'Cierre por alternativa, cierre por asunción, cierre del balance, cierre del silencio y más. Con role-plays grabados y análisis detallado.',
    audiencias: ['asesor-pro'],
    tipo: 'video',
    duracion: '32 min',
    premium: true,
  },

  // ──── COMPRADORES ────
  {
    id: 'pasos-comprar',
    titulo: 'Los 10 Pasos para Comprar tu Primera Casa',
    desc: 'Desde definir tu presupuesto hasta recibir las llaves. Todo el proceso explicado en lenguaje simple, con tiempos y costos estimados.',
    audiencias: ['comprador'],
    tipo: 'guia',
    duracion: '15 min',
    destacado: true,
  },
  {
    id: 'credito-hipotecario',
    titulo: 'Crédito Hipotecario: Todo lo que Debes Saber',
    desc: 'Comparativa de créditos bancarios, INFONAVIT, FOVISSSTE y cofinavit. Tasas, plazos, requisitos y cómo elegir el mejor para tu perfil.',
    audiencias: ['comprador'],
    tipo: 'guia',
    duracion: '25 min',
  },
  {
    id: 'gastos-notariales',
    titulo: 'Gastos de Escrituración y Notariales en México',
    desc: 'Desglose completo: honorarios notariales, ISAI, derechos de registro, avalúo, certificados. Cuánto cuesta realmente escriturar.',
    audiencias: ['comprador'],
    tipo: 'guia',
    duracion: '12 min',
    href: '/herramientas/guia-documentacion',
  },
  {
    id: 'checklist-visita',
    titulo: 'Checklist de Visita a Propiedad',
    desc: '45 puntos que debes revisar al visitar una propiedad: estructura, instalaciones, humedad, orientación, servicios, vecindario y documentación.',
    audiencias: ['comprador'],
    tipo: 'checklist',
    duracion: 'PDF · 3 págs',
    href: '/herramientas/checklist-propiedad',
  },
  {
    id: 'preguntas-vendedor',
    titulo: '25 Preguntas Clave para Hacerle al Vendedor',
    desc: 'Las preguntas que un comprador inteligente SIEMPRE debe hacer: sobre el inmueble, la zona, los costos ocultos y el contexto legal.',
    audiencias: ['comprador'],
    tipo: 'descargable',
    duracion: 'PDF · 4 págs',
  },
  {
    id: 'riesgos-comprador',
    titulo: 'Errores y Riesgos Comunes al Comprar',
    desc: 'Los 15 errores más frecuentes: no verificar escrituras, no pedir certificado de gravamen, firmar sin notario, no comparar precios y más.',
    audiencias: ['comprador'],
    tipo: 'guia',
    duracion: '18 min',
  },

  // ──── INVERSIONISTAS ────
  {
    id: 'analisis-roi',
    titulo: 'Cómo Analizar el ROI de una Propiedad',
    desc: 'Fórmulas, métricas y ejemplos reales: cap rate, cash-on-cash return, TIR, VPN. Con calculadora incluida y escenarios comparativos.',
    audiencias: ['inversionista'],
    tipo: 'curso',
    duracion: '30 min',
    destacado: true,
  },
  {
    id: 'rentas-vs-plusvalia',
    titulo: 'Rentas vs Plusvalía: ¿Dónde Invertir?',
    desc: 'Análisis comparativo de estrategias: flujo de renta mensual vs apreciación a largo plazo. Zonas de alta renta vs zonas de alta plusvalía en EdoMex.',
    audiencias: ['inversionista'],
    tipo: 'guia',
    duracion: '20 min',
    href: '/herramientas/calculadora-plusvalia',
  },
  {
    id: 'airbnb-admin',
    titulo: 'Guía de Inversión en Renta Vacacional (Airbnb)',
    desc: 'Cómo evaluar una propiedad para renta corta: ocupación estimada, ingreso neto, costos operativos, regulación local y administración.',
    audiencias: ['inversionista'],
    tipo: 'curso',
    duracion: '35 min',
  },
  {
    id: 'due-diligence',
    titulo: 'Due Diligence Inmobiliario: Checklist del Inversionista',
    desc: 'Lista exhaustiva de verificaciones antes de invertir: legal, fiscal, técnica, ambiental, urbanística y financiera. Adaptado a México.',
    audiencias: ['inversionista'],
    tipo: 'checklist',
    duracion: 'PDF · 6 págs',
  },
  {
    id: 'fideicomisos',
    titulo: 'Fideicomisos Inmobiliarios en México',
    desc: 'Qué son, cuándo convienen, tipos (garantía, traslativo, FIBRAS), costos, ventajas fiscales y cuándo NO usar un fideicomiso.',
    audiencias: ['inversionista'],
    tipo: 'guia',
    duracion: '22 min',
  },
  {
    id: 'estructuras-inversion',
    titulo: 'Estructuras Legales para Inversión Inmobiliaria',
    desc: 'Persona física vs moral, copropiedad, SPV, FIBRAS, fideicomisos. Pros, contras y cuándo usar cada estructura según tu perfil.',
    audiencias: ['inversionista'],
    tipo: 'curso',
    duracion: '40 min',
    premium: true,
  },

  // ──── MULTI-AUDIENCIA ────
  {
    id: 'ejidos-guia',
    titulo: 'Guía Completa de Ejidos y Dominio Pleno',
    desc: 'Todo sobre propiedad ejidal: qué es, riesgos, proceso de conversión a propiedad privada paso a paso conforme a la Ley Agraria.',
    audiencias: ['comprador', 'inversionista', 'asesor-nuevo'],
    tipo: 'guia',
    duracion: '30 min',
    href: '/herramientas/guia-ejidos',
    destacado: true,
  },
  {
    id: 'plantilla-inversion',
    titulo: 'Plantilla de Evaluación de Inversión',
    desc: 'Hoja de cálculo con fórmulas pre-configuradas: ingreso bruto, gastos, NOI, cap rate, cash flow, ROI anual. Solo llena los datos.',
    audiencias: ['inversionista', 'asesor-pro'],
    tipo: 'plantilla',
    duracion: 'Excel · Editable',
  },
  {
    id: 'script-seguimiento-dl',
    titulo: 'Pack de Scripts de Seguimiento',
    desc: '8 scripts profesionales: primer contacto, post-visita, negociación, reactivación, referidos, cierre y post-venta. Listos para usar.',
    audiencias: ['asesor-nuevo', 'asesor-pro'],
    tipo: 'descargable',
    duracion: 'PDF · 10 págs',
  },
];

const cursosPremium = [
  {
    titulo: 'Masterclass: Captación y Cierre Inmobiliario',
    desc: 'Programa intensivo de 8 módulos para dominar todo el ciclo: desde la captación de propiedades hasta el cierre de la venta. Incluye scripts, role-plays, plantillas y acceso a comunidad privada.',
    modulos: 8,
    duracion: '4+ horas',
    precio: '$2,490 MXN',
    audiencias: ['Asesores nuevos y en desarrollo'],
    incluye: ['8 módulos en video', 'Scripts descargables', 'Plantillas editables', 'Acceso a comunidad', 'Certificado digital'],
  },
  {
    titulo: 'Programa: Marketing Digital Inmobiliario',
    desc: 'Aprende a generar leads calificados con Meta Ads, Google Ads, contenido orgánico y funnels automatizados. Con casos de estudio reales del mercado mexicano.',
    modulos: 12,
    duracion: '6+ horas',
    precio: '$3,990 MXN',
    audiencias: ['Asesores profesionales'],
    incluye: ['12 módulos en video', 'Funnels pre-diseñados', 'Templates de ads', 'Métricas y KPIs', 'Sesión grupal en vivo'],
  },
  {
    titulo: 'Curso: Inversión Inmobiliaria Inteligente',
    desc: 'Análisis financiero, due diligence, estructuras legales y estrategias de portafolio para inversionistas que buscan rendimientos superiores al mercado.',
    modulos: 10,
    duracion: '5+ horas',
    precio: '$4,490 MXN',
    audiencias: ['Inversionistas'],
    incluye: ['10 módulos en video', 'Calculadora de ROI avanzada', 'Checklist due diligence', 'Modelos financieros', 'Asesoría grupal'],
  },
];

const descargablesGratis = [
  {
    titulo: 'Checklist de Visita a Propiedad',
    desc: '45 puntos clave que revisar al visitar una propiedad. Imprimible y fácil de usar.',
    tipo: 'PDF',
    audiencia: 'Compradores',
    href: '/herramientas/checklist-propiedad',
  },
  {
    titulo: 'Plantilla de Evaluación de Inversión',
    desc: 'Hoja de cálculo con fórmulas de ROI, cap rate, cash flow y comparativos.',
    tipo: 'Excel',
    audiencia: 'Inversionistas',
    href: '#',
  },
  {
    titulo: 'Guía de Documentos para Compra',
    desc: 'Lista completa de documentos necesarios con referencias legales actualizadas.',
    tipo: 'PDF',
    audiencia: 'Compradores',
    href: '/herramientas/guia-documentacion',
  },
  {
    titulo: 'Pack de Scripts de Seguimiento',
    desc: '8 scripts para cada etapa del proceso de ventas inmobiliarias.',
    tipo: 'PDF',
    audiencia: 'Asesores',
    href: '#',
  },
];

const faqs = [
  {
    q: '¿Los recursos son realmente gratuitos?',
    a: 'Sí. La mayoría de nuestros recursos, guías, checklists y herramientas son completamente gratuitos. Solo algunos cursos avanzados con contenido premium tienen un costo, que está claramente indicado.',
  },
  {
    q: '¿Necesito experiencia previa en bienes raíces?',
    a: 'No. Nuestro contenido está organizado por nivel: tenemos recursos específicos para principiantes (nuevos asesores y compradores primerizos) y contenido avanzado para profesionales e inversionistas experimentados.',
  },
  {
    q: '¿El contenido aplica para todo México?',
    a: 'Sí, la mayoría del contenido aplica a nivel nacional. Sin embargo, tenemos recursos específicos para el Estado de México y zona metropolitana, especialmente en temas de plusvalía, precios de mercado y trámites locales.',
  },
  {
    q: '¿Puedo descargar los recursos para consultar después?',
    a: 'Sí. Los recursos marcados como "Descargable" incluyen archivos PDF o Excel que puedes guardar en tu dispositivo. Las guías y cursos online están disponibles 24/7.',
  },
  {
    q: '¿Ofrecen asesoría personalizada?',
    a: 'Sí. Si necesitas orientación específica para tu situación, ya sea como comprador, inversionista o asesor, puedes contactarnos directamente para una consulta personalizada sin costo.',
  },
  {
    q: '¿Con qué frecuencia agregan contenido nuevo?',
    a: 'Publicamos nuevo contenido cada semana: guías actualizadas, videos, herramientas y recursos basados en las preguntas más frecuentes de nuestra comunidad y cambios en la legislación.',
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTE
   ───────────────────────────────────────────────────────────── */

export default function AcademiaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroAudiencia, setFiltroAudiencia] = useState<Audiencia | 'todos'>('todos');
  const [filtroTipo, setFiltroTipo] = useState<TipoContenido | 'todos'>('todos');
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const recursosFiltrados = useMemo(() => {
    let resultado = recursos;

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      resultado = resultado.filter(
        (r) =>
          r.titulo.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)
      );
    }

    if (filtroAudiencia !== 'todos') {
      resultado = resultado.filter((r) => r.audiencias.includes(filtroAudiencia));
    }

    if (filtroTipo !== 'todos') {
      resultado = resultado.filter((r) => r.tipo === filtroTipo);
    }

    return resultado;
  }, [busqueda, filtroAudiencia, filtroTipo]);

  const recursosVisible = mostrarTodos ? recursosFiltrados : recursosFiltrados.slice(0, 9);

  const getAudienciaColor = (aud: Audiencia) => audienciaLabels[aud]?.color || '#22AADE';

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-[#22AADE]/5 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Cursos · Guías · Recursos · Herramientas
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-[0.95] mb-8">
              Academia{' '}
              <span className="font-bold italic text-[#22AADE]">Inmobiliaria</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-10">
              Contenido educativo diseñado para que tomes{' '}
              <strong className="text-white">mejores decisiones inmobiliarias</strong>, ya seas comprador, inversionista o asesor profesional.
              Recursos gratuitos y cursos premium creados por expertos del sector.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#recursos"
                className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:scale-105 transition-all duration-300 rounded-sm"
              >
                Explorar Recursos
              </a>
              <Link
                href="/contacto"
                className="px-10 py-4 border border-white/30 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:border-[#22AADE] hover:text-[#22AADE] transition-all duration-300 rounded-sm"
              >
                Hablar con un Asesor
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { stat: `${recursos.length}+`, label: 'Recursos', desc: 'Guías, cursos y herramientas' },
              { stat: '4', label: 'Audiencias', desc: 'Contenido segmentado' },
              { stat: '90%', label: 'Gratuito', desc: 'Sin costo la mayoría' },
              { stat: '24/7', label: 'Disponible', desc: 'Acceso ilimitado' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-sm">
                <p className="text-2xl md:text-3xl font-black text-[#22AADE] mb-1">{item.stat}</p>
                <p className="text-white font-bold text-xs uppercase tracking-wider">{item.label}</p>
                <p className="text-gray-600 text-[10px] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BUSCADOR + FILTROS ═══════════════ */}
      <section id="recursos" className="py-16 bg-[#0a0a0a] border-y border-white/5 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por tema, palabra clave..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
            {/* Audiencia */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setFiltroAudiencia('todos')}
                className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${
                  filtroAudiencia === 'todos'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'
                }`}
              >
                Todos
              </button>
              {(Object.entries(audienciaLabels) as [Audiencia, typeof audienciaLabels[Audiencia]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setFiltroAudiencia(key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${
                    filtroAudiencia === key
                      ? 'text-black'
                      : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'
                  }`}
                  style={filtroAudiencia === key ? { backgroundColor: val.color } : {}}
                >
                  {val.label}
                </button>
              ))}
            </div>

            <div className="hidden md:block w-[1px] h-6 bg-white/10" />

            {/* Tipo */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setFiltroTipo('todos')}
                className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${
                  filtroTipo === 'todos'
                    ? 'bg-[#22AADE] text-black'
                    : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'
                }`}
              >
                Todos
              </button>
              {(Object.entries(tipoLabels) as [TipoContenido, typeof tipoLabels[TipoContenido]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setFiltroTipo(key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    filtroTipo === key
                      ? 'bg-[#22AADE] text-black'
                      : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={val.icon} />
                  </svg>
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contador */}
          <p className="text-center text-xs text-gray-600 mt-4">
            {recursosFiltrados.length} recurso{recursosFiltrados.length !== 1 ? 's' : ''} encontrado{recursosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ═══════════════ GRID DE CONTENIDO ═══════════════ */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {recursosFiltrados.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Sin resultados</h3>
              <p className="text-gray-500 font-light">Intenta con otros filtros o términos de búsqueda.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recursosVisible.map((recurso) => (
                  <div
                    key={recurso.id}
                    className={`relative bg-[#0a0a0a] border rounded-sm p-6 flex flex-col transition-all duration-500 group hover:border-white/20 ${
                      recurso.premium ? 'border-purple-500/20' : recurso.destacado ? 'border-[#22AADE]/20' : 'border-white/5'
                    }`}
                  >
                    {/* Premium badge */}
                    {recurso.premium && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Tipo badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#22AADE]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#22AADE] transition-colors duration-500">
                        <svg className="w-4 h-4 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tipoLabels[recurso.tipo].icon} />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#22AADE] font-bold">{tipoLabels[recurso.tipo].label}</span>
                        <span className="text-[9px] text-gray-600 ml-2">{recurso.duracion}</span>
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-white font-bold mb-2 group-hover:text-[#22AADE] transition-colors line-clamp-2">{recurso.titulo}</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{recurso.desc}</p>

                    {/* Tags audiencia */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {recurso.audiencias.map((aud) => (
                        <span
                          key={aud}
                          className="text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            color: getAudienciaColor(aud),
                            borderColor: `${getAudienciaColor(aud)}30`,
                            backgroundColor: `${getAudienciaColor(aud)}08`,
                          }}
                        >
                          {audienciaLabels[aud].label}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {recurso.href ? (
                      <Link
                        href={recurso.href}
                        className={`block text-center py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.15em] transition-all ${
                          recurso.premium
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white'
                            : 'bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20 hover:bg-[#22AADE] hover:text-black'
                        }`}
                      >
                        {recurso.premium ? 'Acceder al Curso' : 'Ver Recurso'} →
                      </Link>
                    ) : (
                      <button
                        className={`w-full py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.15em] transition-all ${
                          recurso.premium
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white'
                            : 'bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20 hover:bg-[#22AADE] hover:text-black'
                        }`}
                      >
                        {recurso.premium ? 'Próximamente' : 'Ver Contenido'} →
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Ver más */}
              {recursosFiltrados.length > 9 && !mostrarTodos && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setMostrarTodos(true)}
                    className="px-8 py-3 border border-white/20 text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded-sm hover:border-[#22AADE] hover:text-[#22AADE] transition-all"
                  >
                    Ver todos los recursos ({recursosFiltrados.length})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ═══════════════ SECCIÓN POR AUDIENCIAS ═══════════════ */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Contenido Segmentado</h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white">
              Recursos para <span className="font-bold italic">tu perfil</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(Object.entries(audienciaLabels) as [Audiencia, typeof audienciaLabels[Audiencia]][]).map(([key, val]) => {
              const recursosAud = recursos.filter((r) => r.audiencias.includes(key)).slice(0, 3);
              return (
                <div key={key} className="bg-[#050505] border border-white/5 rounded-sm p-8 hover:border-white/15 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500"
                      style={{ backgroundColor: `${val.color}15` }}
                    >
                      <svg className="w-5 h-5" style={{ color: val.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={val.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{val.label}</h4>
                    </div>
                  </div>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">{val.desc}</p>

                  <div className="space-y-3 mb-6">
                    {recursosAud.map((r) => (
                      <div key={r.id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg hover:bg-white/5 transition-colors">
                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: val.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tipoLabels[r.tipo].icon} />
                        </svg>
                        <div className="min-w-0 flex-grow">
                          <p className="text-sm text-gray-300 font-medium truncate">{r.titulo}</p>
                          <p className="text-[10px] text-gray-600">{tipoLabels[r.tipo].label} · {r.duracion}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => { setFiltroAudiencia(key); setFiltroTipo('todos'); setBusqueda(''); setMostrarTodos(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full text-center py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.15em] transition-all border"
                    style={{
                      color: val.color,
                      borderColor: `${val.color}30`,
                      backgroundColor: `${val.color}08`,
                    }}
                  >
                    Ver todo para {val.label} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ DESCARGABLES GRATUITOS ═══════════════ */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Sin Costo</h2>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Descargables <span className="font-bold italic">Gratuitos</span>
            </h3>
            <p className="text-gray-500 font-light">
              Recursos listos para descargar, imprimir y usar. Sin registro, sin costo, sin trampas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {descargablesGratis.map((dl, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 hover:border-[#22AADE]/30 transition-colors group flex flex-col">
                <div className="w-12 h-12 bg-[#22AADE]/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#22AADE] transition-colors duration-500">
                  <svg className="w-6 h-6 text-[#22AADE] group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#22AADE]/10 text-[#22AADE] border border-[#22AADE]/20">{dl.tipo}</span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-gray-600">{dl.audiencia}</span>
                </div>

                <h4 className="text-white font-bold text-sm mb-2">{dl.titulo}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed mb-5 flex-grow">{dl.desc}</p>

                <Link
                  href={dl.href}
                  className="block text-center bg-[#22AADE]/10 text-[#22AADE] py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.15em] border border-[#22AADE]/20 hover:bg-[#22AADE] hover:text-black transition-all"
                >
                  Descargar Gratis →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CURSOS PREMIUM ═══════════════ */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-4 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              Acceso Premium
            </span>
            <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
              Cursos <span className="font-bold italic text-purple-400">Profesionales</span>
            </h3>
            <p className="text-gray-500 font-light">
              Programas completos con video, materiales descargables, plantillas y acceso a comunidad.
              Inversión con retorno inmediato en tu carrera inmobiliaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cursosPremium.map((curso, idx) => (
              <div key={idx} className="bg-[#050505] border border-purple-500/20 rounded-sm p-8 flex flex-col hover:border-purple-500/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {curso.modulos} módulos · {curso.duracion}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{curso.titulo}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">{curso.desc}</p>

                <div className="mb-6">
                  <h5 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Incluye:</h5>
                  <ul className="space-y-2">
                    {curso.incluye.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-xs text-gray-400 font-light">
                        <svg className="w-3 h-3 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-gray-600 uppercase tracking-wider">Desde</span>
                      <p className="text-2xl font-black text-white">{curso.precio}</p>
                    </div>
                    <span className="text-[9px] text-gray-600">{curso.audiencias.join(', ')}</span>
                  </div>

                  <button className="w-full py-3 rounded-sm font-bold text-[11px] uppercase tracking-[0.15em] bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all">
                    Próximamente
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm font-light">
              Los cursos premium estarán disponibles próximamente.{' '}
              <Link href="/contacto" className="text-[#22AADE] hover:text-white transition-colors font-medium">
                Regístrate para recibir acceso anticipado →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTENIDO RECOMENDADO ═══════════════ */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Más Popular</h2>
            <h3 className="text-3xl md:text-4xl font-extralight text-white">
              Contenido <span className="font-bold">Recomendado</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recursos.filter((r) => r.destacado).map((r) => (
              <div key={r.id} className="bg-[#0a0a0a] border border-[#22AADE]/20 rounded-sm p-6 hover:border-[#22AADE]/50 transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tipoLabels[r.tipo].icon} />
                  </svg>
                  <span className="text-[9px] text-[#22AADE] uppercase tracking-wider font-bold">{tipoLabels[r.tipo].label}</span>
                  <span className="text-[9px] text-gray-600 ml-auto">{r.duracion}</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-[#22AADE] transition-colors line-clamp-2">{r.titulo}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed line-clamp-2 mb-3">{r.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {r.audiencias.map((aud) => (
                    <span key={aud} className="text-[8px] uppercase tracking-wider font-bold" style={{ color: getAudienciaColor(aud) }}>
                      {audienciaLabels[aud].label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#22AADE] text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Resolvemos tus Dudas</h2>
            <h3 className="text-3xl md:text-4xl font-extralight text-white">
              Preguntas <span className="font-bold italic">Frecuentes</span>
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/5 hover:border-[#22AADE]/30 rounded-sm p-6 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-[#22AADE]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#22AADE] transition-colors duration-500">
                    <span className="text-[#22AADE] font-bold text-[10px] group-hover:text-black transition-colors duration-500">?</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                    <p className="text-gray-500 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tighter">
            ¿Quieres que te guiemos en tu{' '}
            <br className="hidden md:block" />
            <span className="font-bold italic">compra o inversión?</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 font-light max-w-2xl mx-auto">
            Nuestro equipo de asesores profesionales está listo para ayudarte.
            Consulta sin compromiso, sin costo y con total confidencialidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/525512345678?text=Hola%2C%20me%20interesa%20recibir%20asesor%C3%ADa%20inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#25d366] text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#128c3e] hover:scale-105 transition-all duration-300 rounded-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Directo
            </a>
            <Link
              href="/contacto"
              className="px-10 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] hover:scale-105 transition-all duration-300 rounded-sm"
            >
              Llenar Formulario
            </Link>
          </div>

          <p className="text-gray-600 text-xs mt-8">
            Respuesta en menos de 24 horas · Sin compromiso · Atención personalizada
          </p>
        </div>
      </section>
    </div>
  );
}
