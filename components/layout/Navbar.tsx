'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // LÓGICA AGREGADA: No renderizar si la ruta comienza con /admin
  if (pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/propiedades' },
    { name: 'Venta', href: '/venta' },
    { name: 'Renta', href: '/renta' },
    { name: 'Nosotros', href: '/nosotros' },
  ];

  return (
    <header className="fixed w-full top-0 z-[100] px-4 py-4 md:py-6">
      <nav 
        className={`
          mx-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          rounded-[24px] border border-white/10
          bg-black/60 backdrop-blur-xl
          ${mobileMenuOpen ? 'w-full rounded-[32px]' : 'max-w-[95%] md:max-w-6xl'}
          ${isScrolled ? 'shadow-2xl' : 'shadow-none'}
        `}
      >
        <div className={`flex items-center justify-between transition-all ${isScrolled ? 'px-6 py-3' : 'px-8 py-5'}`}>
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 z-[110]">
            <img
              src="/logo-white.png"
              alt="RealEstate Logo"
              className={`h-8 md:h-auto transition-all ${isScrolled ? 'w-28 md:w-32' : 'w-32 md:w-36'}`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-[12px] uppercase tracking-[0.2em] transition-all ${
                    pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="border border-white/20 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"
            >
              Contacto
            </Link>
          </div>

          {/* MOBILE TOGGLE (HAMBURGER) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[110]"
          >
            <span className={`bg-white h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`bg-white h-0.5 w-5 rounded-full mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
          </button>
        </div>

        {/* MOBILE MENU (DESPLEGABLE) */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-8 pb-8 flex flex-col gap-5 border-t border-white/5 pt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[11px] uppercase tracking-[0.2em] ${
                  pathname === item.href ? 'text-white font-bold' : 'text-gray-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center border border-blue-500/50 bg-blue-600/10 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] text-white"
            >
              Contacto Directo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}