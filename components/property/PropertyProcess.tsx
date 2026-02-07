'use client';

interface PropertyProcessProps {
  status: 'venta' | 'renta';
}

export default function PropertyProcess({ status }: PropertyProcessProps) {
  const processSteps = status === 'venta' 
    ? [
        {
          step: '01',
          title: 'Consulta Inicial',
          description: 'Agendamos una reunión para entender tus necesidades y presupuesto',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        },
        {
          step: '02',
          title: 'Visita y Evaluación',
          description: 'Recorrido presencial de la propiedad y revisión de documentación',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )
        },
        {
          step: '03',
          title: 'Financiamiento',
          description: 'Asesoría en opciones de crédito hipotecario y análisis de capacidad de pago',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          step: '04',
          title: 'Cierre y Entrega',
          description: 'Firma de escrituras, transferencia de propiedad y entrega de llaves',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      ]
    : [
        {
          step: '01',
          title: 'Consulta y Requisitos',
          description: 'Revisamos tus necesidades y los requisitos para el arrendamiento',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          step: '02',
          title: 'Visita y Selección',
          description: 'Recorrido de la propiedad y selección del inmueble que mejor se adapte',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )
        },
        {
          step: '03',
          title: 'Contrato y Garantías',
          description: 'Elaboración de contrato, revisión de garantías y documentación necesaria',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )
        },
        {
          step: '04',
          title: 'Entrega y Bienvenida',
          description: 'Entrega de llaves, inventario y orientación sobre la propiedad',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        }
      ];

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 md:p-6">
      <h2 className="text-xl font-light text-white mb-5">
        Proceso de {status === 'venta' ? 'Compra' : 'Renta'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {processSteps.map((step, index) => (
          <div
            key={index}
            className="bg-[#050505] border border-white/5 rounded p-4"
          >
            <div className="text-[#22AADE] mb-3 opacity-80">
              {step.icon}
            </div>
            <div className="text-xs text-gray-500 mb-2 font-medium">{step.step}</div>
            <h3 className="text-white font-medium mb-1.5 text-sm">{step.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
