'use client';

import { useMemo } from 'react';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  location: string;
}

export default function PropertyMap({ latitude, longitude, location }: PropertyMapProps) {
  // Agregar un offset aleatorio para no mostrar la ubicación exacta
  // Desplazamiento de ~300-500 metros
  const offsetLat = useMemo(() => (Math.random() - 0.5) * 0.008, []);
  const offsetLng = useMemo(() => (Math.random() - 0.5) * 0.008, []);

  const approximateLat = latitude + offsetLat;
  const approximateLng = longitude + offsetLng;

  // URL de OpenStreetMap sin marcador exacto, solo área general
  // Bbox más amplio para mostrar zona, no ubicación exacta
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${approximateLng - 0.015},${approximateLat - 0.015},${approximateLng + 0.015},${approximateLat + 0.015}&layer=mapnik`;

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#050505] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
      {/* Header mejorado */}
      <div className="p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] to-[#111]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#22AADE]/20 rounded-lg">
                <svg className="w-5 h-5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Ubicación General</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base font-light mb-2 pl-11">
              {location}
            </p>
            <div className="flex items-center gap-2 pl-11">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-xs italic">
                Zona aproximada mostrada por privacidad
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mapa con diseño mejorado */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-[#050505] to-black overflow-hidden group">
        {/* Efecto de overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent z-10 pointer-events-none" />
        
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="border-0 transition-transform duration-700 group-hover:scale-105"
          title="Mapa de ubicación"
          loading="lazy"
          style={{ 
            filter: 'invert(0.9) hue-rotate(200deg) contrast(1.2) brightness(0.85) saturate(0.8)',
          }}
        />
        
        {/* Overlay con círculo de área aproximada mejorado */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="relative">
            {/* Círculo exterior con pulso */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-[#22AADE]/40 animate-pulse"
              style={{
                width: '280px',
                height: '280px',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
              }}
            />
            {/* Círculo principal */}
            <div 
              className="rounded-full border-3 border-[#22AADE] shadow-2xl"
              style={{
                width: '250px',
                height: '250px',
                backgroundColor: 'rgba(34, 170, 222, 0.15)',
                borderWidth: '3px',
                boxShadow: '0 0 30px rgba(34, 170, 222, 0.5), inset 0 0 30px rgba(34, 170, 222, 0.2)',
              }}
            />
            {/* Punto central */}
            <div 
              className="absolute rounded-full bg-[#22AADE] shadow-lg"
              style={{
                width: '12px',
                height: '12px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(34, 170, 222, 0.8)',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Footer con link mejorado */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-[#050505] to-[#0a0a0a] border-t border-white/10">
        <a
          href={`https://www.openstreetmap.org/#map=13/${approximateLat}/${approximateLng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-[#22AADE] hover:text-white text-sm font-medium transition-all px-4 py-2 rounded-lg hover:bg-[#22AADE]/10"
        >
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Ver área completa en OpenStreetMap</span>
        </a>
      </div>
    </div>
  );
}
