'use client';

export default function AMPISeal() {
  return (
    <div className="flex flex-col items-center md:items-end gap-2 md:gap-3">
      {/* Sello de garantía con diseño premium */}
      <div className="relative group">
        {/* Efecto de brillo/sello */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#22AADE]/20 via-transparent to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Contenedor del logo con borde tipo sello */}
        <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border-2 border-[#22AADE]/30 rounded-full p-4 md:p-5 shadow-2xl backdrop-blur-sm group-hover:border-[#22AADE]/50 transition-all duration-300 group-hover:scale-105">
          {/* Círculo decorativo interno */}
          <div className="absolute inset-2 border border-[#22AADE]/20 rounded-full" />
          
          {/* Logo AMPI */}
          <div className="relative z-10">
            <img 
              src="/logo_ampi-white.png" 
              alt="Logo AMPI - Asociación Mexicana de Profesionales Inmobiliarios" 
              className="w-24 h-auto md:w-32 lg:w-40 transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          
          {/* Punto decorativo superior */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#22AADE] rounded-full shadow-lg" />
        </div>
      </div>
      
      {/* Texto del sello */}
      <div className="text-center md:text-right">
        <p className="text-[#22AADE] text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold mb-1">
          Sello de Garantía
        </p>
        <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-wider font-light">
          Certificado AMPI
        </p>
      </div>
    </div>
  );
}
