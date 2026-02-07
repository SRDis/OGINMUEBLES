'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { hasCookieConsent, setCookieConsent, setCookiePreferences, getCookiePreferences, type CookiePreferences } from '@/lib/cookies';
import { X, Settings, Check } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!hasCookieConsent()) {
      setShowBanner(true);
      setPreferences(getCookiePreferences());
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookiePreferences(allAccepted);
    setCookieConsent(true);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setCookiePreferences(onlyNecessary);
    setCookieConsent(true);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setCookiePreferences(preferences);
    setCookieConsent(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-[#0a0a0a] border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">🍪 Uso de Cookies</h3>
              <p className="text-gray-400 text-sm">
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido.
                Al continuar navegando, aceptas nuestro uso de cookies.{' '}
                <Link href="/privacidad" className="text-[#22AADE] hover:underline">
                  Política de Privacidad
                </Link>
                {' '}y{' '}
                <Link href="/terminos" className="text-[#22AADE] hover:underline">
                  Términos y Condiciones
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-[#050505] border border-white/10 text-white rounded-lg hover:border-[#22AADE] hover:bg-[#0f0f0f] transition-all text-sm font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Personalizar
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-[#050505] border border-white/10 text-white rounded-lg hover:border-white/20 transition-all text-sm font-medium"
              >
                Rechazar
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-[#22AADE] text-black rounded-lg hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
              >
                Aceptar Todo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Configuración de Cookies</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                <div>
                  <p className="text-white font-medium">Cookies Necesarias</p>
                  <p className="text-gray-400 text-xs">Siempre activas - Requeridas para el funcionamiento del sitio</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-[#22AADE]/20 rounded">
                  <Check className="w-5 h-5 text-[#22AADE]" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                <div>
                  <p className="text-white font-medium">Cookies Analíticas</p>
                  <p className="text-gray-400 text-xs">Nos ayudan a entender cómo los visitantes interactúan con el sitio</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22AADE]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#050505] rounded-lg">
                <div>
                  <p className="text-white font-medium">Cookies de Marketing</p>
                  <p className="text-gray-400 text-xs">Utilizadas para mostrar anuncios relevantes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22AADE]"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-2 bg-[#22AADE] text-black rounded-lg hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
              >
                Guardar Preferencias
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-[#050505] border border-white/10 text-white rounded-lg hover:border-white/20 transition-all text-sm font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
