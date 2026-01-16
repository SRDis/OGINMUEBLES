'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Lógica de cierre de sesión mejorada
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // AQUÍ IRÍA TU LÓGICA DE BACKEND
      // Ejemplo con Supabase:
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;
      
      // Simulación de llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar datos locales si es necesario
      localStorage.removeItem('token'); // Ejemplo
      
      console.log('Sesión cerrada exitosamente');
      
      // Redirigir al login
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión. Por favor intenta nuevamente.');
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const navigation = [
    {
      group: 'Gestión Principal',
      items: [
        { name: 'Inicio', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Propiedades', href: '/admin/propiedades', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { name: 'Agregar Propiedad', href: '/admin/propiedades/nueva', icon: 'M12 4v16m8-8H4' },
        { name: 'Contactos web', href: '/admin/contactos', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      ]
    },
    {
      group: 'Inteligencia de Negocio',
      items: [
        { name: 'Estadísticas & KPIs', href: '/admin/analisis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Conectar CRM', href: '/admin/crm', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
      ]
    }
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <aside className="w-64 bg-[#050505] text-gray-400 fixed h-screen border-r border-white/5 flex flex-col z-50">
        {/* Header & Logo */}
        <div className="p-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <img src="/logo-white.png" alt="Logo" className="h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity"/>
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22AADE] rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Panel Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          {navigation.map((section) => (
            <div key={section.group}>
              <h3 className="px-4 text-[9px] uppercase tracking-[0.3em] font-bold text-gray-600 mb-4">
                {section.group}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'bg-[#22AADE]/10 text-[#22AADE] border-l-2 border-[#22AADE]'
                        : 'hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <svg className={`w-5 h-5 transition-colors ${isActive(item.href) ? 'text-[#22AADE]' : 'text-gray-500 group-hover:text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon}/>
                    </svg>
                    <span className="text-sm font-light tracking-wide">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#22AADE] to-blue-800 flex items-center justify-center text-white font-bold text-xs border border-white/10 shadow-lg">
              OL
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white truncate">Oliver López</span>
              <span className="text-[9px] text-[#22AADE] uppercase tracking-tighter font-semibold">Admin / AMPI</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <Link
              href="/"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-2 rounded-sm text-gray-500 hover:bg-white/5 hover:text-white transition-all text-xs group w-full"
            >
              <svg className="w-4 h-4 text-gray-600 group-hover:text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium tracking-widest uppercase text-[9px]">Ver Portal</span>
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-sm text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all text-xs group text-left"
            >
              <svg className="w-4 h-4 text-gray-600 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium tracking-widest uppercase text-[9px]">Finalizar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de Confirmación de Cierre de Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Icono de advertencia */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Título */}
            <h3 className="text-xl font-bold text-white text-center mb-3">
              ¿Cerrar Sesión?
            </h3>

            {/* Descripción */}
            <p className="text-gray-400 text-center text-sm mb-8">
              Estás a punto de finalizar tu sesión. Tendrás que volver a iniciar sesión para acceder al panel de administración.
            </p>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cerrando...
                  </>
                ) : (
                  'Sí, Cerrar Sesión'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}