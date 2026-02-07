'use client';

interface PropertyHighlightsProps {
  property: {
    bedrooms: number;
    bathrooms: number;
    parking_spaces: number;
    area: number;
    construction_area: number;
    property_type: string;
    status: 'venta' | 'renta';
  };
}

export default function PropertyHighlights({ property }: PropertyHighlightsProps) {
  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Certificación AMPI',
      description: 'Propiedad verificada y gestionada bajo estándares profesionales',
      color: 'text-[#22AADE]'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Documentación Completa',
      description: 'Todos los documentos legales en orden y listos para revisión',
      color: 'text-green-400'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Proceso Ágil',
      description: property.status === 'venta' 
        ? 'Financiamiento disponible y proceso de compra optimizado'
        : 'Contrato flexible y proceso de arrendamiento simplificado',
      color: 'text-yellow-400'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Asesoría Personalizada',
      description: 'Acompañamiento profesional durante todo el proceso',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 md:p-6">
      <h2 className="text-xl font-light text-white mb-5">
        ¿Por qué elegir esta propiedad?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="p-4 bg-[#050505] border border-white/5 rounded"
          >
            <div className={`${highlight.color} mb-2 opacity-80`}>
              {highlight.icon}
            </div>
            <h3 className="text-white font-medium mb-1.5 text-sm">{highlight.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
