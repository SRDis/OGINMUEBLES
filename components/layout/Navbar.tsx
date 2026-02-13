'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [herramientasOpen, setHerramientasOpen] = useState(false);
  // Secciones colapsables en mobile
  const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false);
  const [mobileHerramientasOpen, setMobileHerramientasOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const herramientasRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiciosOpen(false);
      }
      if (herramientasRef.current && !herramientasRef.current.contains(e.target as Node)) {
        setHerramientasOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/propiedades' },
    { name: 'Venta', href: '/venta' },
    { name: 'Renta', href: '/renta' },
    { name: 'Academia', href: '/academia' },
    { name: 'Nosotros', href: '/nosotros' },
  ];

  const serviciosItems = [
    {
      name: 'Mantenimiento de Terrenos',
      href: '/mantenimiento-terrenos',
      subtitle: 'Limpieza · Jardinería · Poda',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    {
      name: 'Levantamientos Topográficos',
      href: '/levantamientos-topograficos',
      subtitle: 'Planos · Mediciones · Deslindes',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    },
    {
      name: 'Locaciones TV y Cine',
      href: '/locaciones',
      subtitle: 'Filmación · Publicidad · Foto',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    },
    {
      name: 'Renders Arquitectónicos',
      href: '/renders',
      subtitle: 'Exteriores · Interiores · 360°',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  ];

  const herramientasItems = [
    {
      name: 'Checklist de Propiedad',
      href: '/herramientas/checklist-propiedad',
      subtitle: 'Evalúa tu propiedad gratis',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      name: 'Calculadora de Plusvalía',
      href: '/herramientas/calculadora-plusvalia',
      subtitle: 'Valor y plusvalía EdoMex',
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
    {
      name: 'Guía de Documentación',
      href: '/herramientas/guia-documentacion',
      subtitle: 'Compra · Venta · Renta',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      name: 'Guía de Ejidos',
      href: '/herramientas/guia-ejidos',
      subtitle: 'Ejidal → Propiedad privada',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    },
  ];

  const isServiciosActive = serviciosItems.some(item => pathname === item.href);
  const isHerramientasActive = herramientasItems.some(item => pathname === item.href) || pathname === '/herramientas';

  return (
    <>
      <header className="fixed w-full top-0 z-[100] px-4 py-4 md:py-6">
        <nav
          className={`
            mx-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            rounded-[24px] border border-white/10
            bg-black/60 backdrop-blur-xl
            ${isScrolled ? 'shadow-2xl' : 'shadow-none'}
            max-w-[95%] md:max-w-6xl
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
            <ul className="hidden lg:flex items-center gap-0">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`px-2.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all whitespace-nowrap ${
                      pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* DROPDOWN: Servicios */}
              <li ref={dropdownRef} className="relative">
                <button
                  onClick={() => setServiciosOpen(!serviciosOpen)}
                  onMouseEnter={() => setServiciosOpen(true)}
                  className={`px-2.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all whitespace-nowrap flex items-center gap-1 ${
                    isServiciosActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Servicios
                  <svg className={`w-3 h-3 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  onMouseLeave={() => setServiciosOpen(false)}
                  className={`absolute top-full right-0 mt-2 w-[260px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    serviciosOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="px-4 pt-3 pb-1.5">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">Nuestros Servicios</span>
                  </div>

                  {serviciosItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setServiciosOpen(false)}
                      className={`block px-4 py-2.5 transition-all border-b border-white/5 last:border-b-0 ${
                        pathname === item.href
                          ? 'text-[#22AADE] bg-[#22AADE]/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#22AADE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <span className="block font-bold text-[9px] uppercase tracking-[0.08em] leading-tight">{item.name}</span>
                          <span className="block text-[8px] text-gray-500 tracking-normal normal-case mt-0.5">{item.subtitle}</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <div className="px-4 py-2.5 bg-[#050505]/50 border-t border-white/5">
                    <Link
                      href="/contacto"
                      onClick={() => setServiciosOpen(false)}
                      className="flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#22AADE] hover:text-white transition-colors"
                    >
                      Consultar otro servicio
                    </Link>
                  </div>
                </div>
              </li>

              {/* DROPDOWN: Herramientas */}
              <li ref={herramientasRef} className="relative">
                <button
                  onClick={() => setHerramientasOpen(!herramientasOpen)}
                  onMouseEnter={() => setHerramientasOpen(true)}
                  className={`px-2.5 py-2 text-[10px] uppercase tracking-[0.12em] transition-all whitespace-nowrap flex items-center gap-1 ${
                    isHerramientasActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Herramientas
                  <svg className={`w-3 h-3 transition-transform duration-200 ${herramientasOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  onMouseLeave={() => setHerramientasOpen(false)}
                  className={`absolute top-full right-0 mt-2 w-[260px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    herramientasOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="px-4 pt-3 pb-1.5">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">Herramientas Gratis</span>
                  </div>

                  {herramientasItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setHerramientasOpen(false)}
                      className={`block px-4 py-2.5 transition-all border-b border-white/5 last:border-b-0 ${
                        pathname === item.href
                          ? 'text-[#22AADE] bg-[#22AADE]/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#22AADE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <span className="block font-bold text-[9px] uppercase tracking-[0.08em] leading-tight">{item.name}</span>
                          <span className="block text-[8px] text-gray-500 tracking-normal normal-case mt-0.5">{item.subtitle}</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <div className="px-4 py-2.5 bg-[#050505]/50 border-t border-white/5">
                    <Link
                      href="/herramientas"
                      onClick={() => setHerramientasOpen(false)}
                      className="flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#22AADE] hover:text-white transition-colors"
                    >
                      Ver todas las herramientas
                    </Link>
                  </div>
                </div>
              </li>
            </ul>

            {/* DESKTOP CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contacto"
                className="border border-white/20 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.15em] text-white hover:bg-white hover:text-black transition-all whitespace-nowrap"
              >
                Contacto
              </Link>
            </div>

            {/* MOBILE / TABLET TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 z-[110]"
              aria-label="Menú"
            >
              <span className={`bg-white h-0.5 w-5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`bg-white h-0.5 w-5 rounded-full mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ═══════ MOBILE MENU — FULLSCREEN OVERLAY ═══════ */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[380px] h-full bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-white/5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header del panel */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo-white.png" alt="Logo" className="w-28 h-auto" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido scrollable */}
          <div className="overflow-y-auto h-[calc(100vh-80px)] pb-20">
            <div className="px-6 py-6 space-y-1">

              {/* Navegación principal */}
              <div className="mb-4">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold block mb-3 px-1">Navegación</span>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'text-[#22AADE] bg-[#22AADE]/5 font-bold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[12px] uppercase tracking-[0.12em]">{item.name}</span>
                    {pathname === item.href && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22AADE]" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Servicios — colapsable */}
              <div className="border-t border-white/5 pt-4 mb-4">
                <button
                  onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)}
                  className="w-full flex items-center justify-between px-1 mb-3"
                >
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">Servicios</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${mobileServiciosOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`space-y-1 overflow-hidden transition-all duration-400 ease-in-out ${
                  mobileServiciosOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {serviciosItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'text-[#22AADE] bg-[#22AADE]/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="w-8 h-8 bg-[#22AADE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-[0.1em] font-medium leading-tight">{item.name}</span>
                        <span className="block text-[9px] text-gray-600 tracking-normal normal-case">{item.subtitle}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Herramientas — colapsable */}
              <div className="border-t border-white/5 pt-4 mb-4">
                <button
                  onClick={() => setMobileHerramientasOpen(!mobileHerramientasOpen)}
                  className="w-full flex items-center justify-between px-1 mb-3"
                >
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">Herramientas Gratis</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${mobileHerramientasOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`space-y-1 overflow-hidden transition-all duration-400 ease-in-out ${
                  mobileHerramientasOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {herramientasItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'text-[#22AADE] bg-[#22AADE]/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="w-8 h-8 bg-[#22AADE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-[0.1em] font-medium leading-tight">{item.name}</span>
                        <span className="block text-[9px] text-gray-600 tracking-normal normal-case">{item.subtitle}</span>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/herramientas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#22AADE] hover:text-white transition-colors py-3 mt-1"
                  >
                    Ver todas las herramientas →
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-white/5 pt-6 space-y-3">
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-[#22AADE] text-black py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-[0.15em] hover:bg-white transition-colors"
                >
                  Contacto Directo
                </Link>
                <a
                  href="https://wa.me/525512345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-center bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] py-3 rounded-xl font-bold text-[11px] uppercase tracking-[0.15em] hover:bg-[#25d366] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
