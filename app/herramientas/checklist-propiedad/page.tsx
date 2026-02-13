'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   DATOS DEL CHECKLIST
   ───────────────────────────────────────────────────────────── */

type ChecklistCategory = {
  title: string;
  icon: string;
  items: string[];
};

const checklistData: ChecklistCategory[] = [
  {
    title: 'Documentación Legal',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    items: [
      'Escritura pública inscrita en el Registro Público',
      'Certificado de libertad de gravamen vigente',
      'Predial al corriente (últimos 5 años)',
      'Boletas de agua y servicios al corriente',
      'Identificación oficial del propietario',
      'RFC y constancia de situación fiscal',
      'Plano catastral o número de cuenta catastral',
      'Régimen de condominio (si aplica)',
    ],
  },
  {
    title: 'Estado Físico del Inmueble',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    items: [
      'Pintura interior en buen estado',
      'Pintura exterior / fachada en buen estado',
      'Pisos sin daños, grietas ni manchas',
      'Sin humedad ni filtraciones visibles',
      'Instalación eléctrica funcionando correctamente',
      'Instalación hidráulica sin fugas',
      'Puertas y ventanas cerrando correctamente',
      'Techos y azotea impermeabilizada',
    ],
  },
  {
    title: 'Presentación y Home Staging',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z',
    items: [
      'Espacios despejados y sin objetos personales excesivos',
      'Limpieza profunda realizada (incluye ventanas y clósets)',
      'Iluminación adecuada en todos los espacios',
      'Jardín o áreas exteriores en buen estado',
      'Baños y cocina impecables',
      'Aromas neutros y agradables',
      'Mobiliario en buen estado (si se entrega amueblado)',
      'Garaje/estacionamiento limpio y despejado',
    ],
  },
  {
    title: 'Servicios e Instalaciones',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    items: [
      'Calentador de agua (boiler) funcionando',
      'Gas LP o natural con instalación certificada',
      'Internet / TV cable con cableado oculto',
      'Aire acondicionado / calefacción funcional (si tiene)',
      'Cisterna o tinaco en buen estado',
      'Bomba de agua funcionando (si aplica)',
      'Sistema de seguridad / alarma (si tiene)',
      'Interfón o control de acceso funcionando',
    ],
  },
  {
    title: 'Marketing y Fotografía',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    items: [
      'Fotografía profesional de la propiedad (mínimo 15 fotos)',
      'Video o recorrido virtual grabado',
      'Descripción atractiva y detallada del inmueble',
      'Precio competitivo definido (análisis de mercado)',
      'Publicación en portales inmobiliarios principales',
      'Redes sociales del asesor con publicación activa',
    ],
  },
  {
    title: 'Aspectos Fiscales y Legales',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    items: [
      'Avalúo bancario actualizado (máx. 6 meses)',
      'Contrato de compraventa o renta revisado por abogado',
      'Conocimiento del ISR o impuesto por venta',
      'Notario público seleccionado',
      'Poder notarial (si el propietario no firma directamente)',
      'Cancelación de hipoteca (si la propiedad tenía crédito)',
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

  // Score label
  const getScoreLabel = () => {
    if (percentage >= 90) return { label: 'Excelente', color: '#22AADE', desc: '¡Tu propiedad está prácticamente lista para el mercado!' };
    if (percentage >= 70) return { label: 'Muy Bien', color: '#4ade80', desc: 'Estás muy cerca. Completa los puntos pendientes.' };
    if (percentage >= 50) return { label: 'En Progreso', color: '#facc15', desc: 'Buen avance, pero hay aspectos importantes por resolver.' };
    if (percentage >= 25) return { label: 'Necesita Trabajo', color: '#fb923c', desc: 'Aún hay bastantes puntos por atender antes de salir al mercado.' };
    return { label: 'Inicio', color: '#ef4444', desc: 'Comienza a evaluar tu propiedad marcando los puntos que ya tienes listos.' };
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
        cat.items.forEach((item, iIdx) => {
          const isChecked = checked[`${cIdx}-${iIdx}`];
          lines.push(`  ${isChecked ? '✅' : '⬜'} ${item}`);
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
      <section className="relative pt-32 pb-16 overflow-hidden no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-6 text-xs text-gray-500">
              <Link href="/herramientas" className="hover:text-[#22AADE] transition-colors">Herramientas</Link>
              <span>/</span>
              <span className="text-gray-400">Checklist de Propiedad</span>
            </div>

            <span className="inline-block py-1 px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[10px] tracking-[0.4em] uppercase font-bold mb-8 backdrop-blur-md">
              Herramienta Gratuita
            </span>

            <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter leading-[0.95] mb-8">
              ¿Tu propiedad está lista para{' '}
              <span className="font-bold italic text-[#22AADE]">{mode === 'venta' ? 'venderse' : 'rentarse'}?</span>
            </h1>

            <p className="text-lg text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-8">
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
                <p className="text-[10px] text-gray-500 mt-1 hidden md:block">{score.desc}</p>
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

                      return (
                        <label
                          key={itemIdx}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                            isChecked
                              ? 'bg-[#22AADE]/5 border border-[#22AADE]/20'
                              : 'bg-white/[0.02] border border-transparent hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
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
                          <span className={`text-sm font-light transition-colors ${
                            isChecked ? 'text-white line-through opacity-70' : 'text-gray-400'
                          }`}>
                            {item}
                          </span>
                        </label>
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
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
              {score.desc}
            </p>
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
