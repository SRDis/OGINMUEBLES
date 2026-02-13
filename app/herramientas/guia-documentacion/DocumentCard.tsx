'use client';

import { useState } from 'react';

type DocumentItem = {
  doc: string;
  obligatorio: boolean;
  nota?: string;
  fundamento?: string;
  tramite?: {
    pasos: string[];
    donde: string[];
    tiempo: string;
    costo?: string;
  };
  detalle?: string;
};

type Props = {
  item: DocumentItem;
  color: string;
};

export default function DocumentCard({ item, color }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-[#050505]/50 border border-white/5 rounded-sm p-5 hover:border-white/10 transition-all group cursor-pointer"
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
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="text-white font-medium text-sm group-hover:text-[#22AADE] transition-colors">{item.doc}</h4>
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

            {item.fundamento && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">Fundamento Legal</p>
                <p className="text-amber-300 text-xs font-medium">{item.fundamento}</p>
              </div>
            )}

            {item.tramite && (
              <div className="mt-3 flex items-center gap-2 text-[10px] text-[#22AADE] font-bold uppercase tracking-wider">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver detalles del trámite →
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${
                  item.obligatorio ? 'bg-red-500/10' : 'bg-white/5'
                }`}>
                  {item.obligatorio ? (
                    <span className="text-red-400 text-sm font-black">!</span>
                  ) : (
                    <span className="text-gray-600 text-sm">○</span>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{item.doc}</h3>
                  <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    item.obligatorio
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-white/5 text-gray-600 border border-white/10'
                  }`}>
                    {item.obligatorio ? 'Obligatorio' : 'Opcional'}
                  </span>
                </div>
              </div>

              {item.nota && (
                <div className="bg-[#050505] border border-white/5 rounded-sm p-4 mb-4">
                  <p className="text-gray-300 text-sm font-light leading-relaxed">{item.nota}</p>
                </div>
              )}

              {item.fundamento && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-sm p-4 mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-2">Fundamento Legal</p>
                  <p className="text-amber-300 text-sm font-medium">{item.fundamento}</p>
                </div>
              )}
            </div>

            {item.tramite && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Pasos del Trámite
                  </h4>
                  <ol className="space-y-2">
                    {item.tramite.pasos.map((paso, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                        <span className="w-6 h-6 rounded-full bg-[#22AADE]/10 text-[#22AADE] font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="flex-grow">{paso}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dónde se Realiza
                  </h4>
                  <ul className="space-y-2">
                    {item.tramite.donde.map((lugar, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                        <svg className="w-5 h-5 text-[#22AADE] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{lugar}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#050505] border border-white/5 rounded-sm p-4">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Tiempo Estimado</p>
                    <p className="text-white font-bold">{item.tramite.tiempo}</p>
                  </div>
                  {item.tramite.costo && (
                    <div className="bg-[#050505] border border-white/5 rounded-sm p-4">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Costo Aproximado</p>
                      <p className="text-white font-bold">{item.tramite.costo}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
