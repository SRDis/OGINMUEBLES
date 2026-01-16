'use client';

import { useState } from 'react';

export default function AdminHeader({ title = "Panel de Control" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm);
    // Aquí conectarías con tu lógica de filtro o API
  };

  return (
    <header className="h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-white text-lg font-light tracking-tight">
          {title} <span className="text-[#22AADE] font-bold">.</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Barra de búsqueda funcional */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full focus-within:border-[#22AADE]/50 focus-within:bg-white/10 transition-all">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar propiedad o lead..." 
            className="bg-transparent text-xs text-gray-300 focus:outline-none w-48 font-light placeholder-gray-600"
          />
        </form>

        {/* Botón de Notificaciones con Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 transition-colors ${showNotifications ? 'text-[#22AADE]' : 'text-gray-400 hover:text-[#22AADE]'}`}
          >
            {/* Indicador de "Nueva Notificación" */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#22AADE] rounded-full border-2 border-[#050505] animate-pulse"></div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Menú Dropdown de Notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-sm shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-white/5">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Recientes</span>
              </div>
              <div className="max-h-48 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors">
                  <p className="text-xs text-white">Nuevo lead en Valle de Bravo</p>
                  <p className="text-[10px] text-gray-500 mt-1">Hace 5 min</p>
                </div>
                <div className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors">
                  <p className="text-xs text-white">Cita confirmada: Casa Avándaro</p>
                  <p className="text-[10px] text-gray-500 mt-1">Hace 2 horas</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}