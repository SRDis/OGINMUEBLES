'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import PersonalizedSearchForm from '@/components/forms/PersonalizedSearchForm';

export default function PersonalizedSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-[#22AADE] text-black px-6 py-3 rounded-sm hover:bg-white transition-all duration-300 text-[11px] font-black uppercase tracking-widest"
      >
        <Search className="w-4 h-4" />
        Búsqueda Personalizada
      </button>

      {isOpen && (
        <PersonalizedSearchForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
