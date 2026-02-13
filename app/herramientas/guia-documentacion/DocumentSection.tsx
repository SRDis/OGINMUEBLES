'use client';

import { useState } from 'react';
import DocumentCard from './DocumentCard';

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
};

type DocumentCategory = {
  category: string;
  items: DocumentItem[];
};

type Props = {
  category: DocumentCategory;
  color: string;
  defaultOpen?: boolean;
};

export default function DocumentSection({ category, color, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/5 rounded-sm overflow-hidden bg-[#050505]/30">
      {/* Header clickeable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 transition-all duration-300 group ${
          isOpen ? 'bg-white/5 border-b border-white/5' : 'hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isOpen ? 'scale-110' : ''
            }`}
            style={{ backgroundColor: isOpen ? `${color}25` : `${color}15` }}
          >
            <svg
              className="w-5 h-5 transition-transform duration-300"
              style={{ color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="text-left">
            <h3
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                isOpen ? '' : 'group-hover:text-[#22AADE]'
              }`}
              style={{ color: isOpen ? color : 'white' }}
            >
              {category.category}
            </h3>
            <p className="text-[10px] text-gray-500 font-light mt-1">
              {category.items.length} {category.items.length === 1 ? 'documento' : 'documentos'}
              {' • '}
              {category.items.filter(item => item.obligatorio).length} obligatorios
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isOpen && (
            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 animate-in fade-in">
              Ver {category.items.length} documentos
            </span>
          )}
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? 'text-[#22AADE] rotate-180' : 'text-gray-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Contenido desplegable */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transition: 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out'
        }}
      >
        <div className={`p-5 pt-0 space-y-3 border-t border-white/5 ${isOpen ? 'pb-5' : 'pb-0'}`}>
          {category.items.map((item, itemIdx) => (
            <DocumentCard key={itemIdx} item={item} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
}
