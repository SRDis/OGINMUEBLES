'use client';

import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { sendEmail, generateContactEmailHTML } from '@/lib/email';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
  propertyInternalId?: string;
  sourceSection?: string;
}

export default function ContactForm({ propertyId, propertyTitle, propertyInternalId, sourceSection }: ContactFormProps) {
  const pathname = usePathname();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    acceptPrivacy: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [detectedPropertyInternalId, setDetectedPropertyInternalId] = useState<string | null>(null);
  const [detectedPropertyId, setDetectedPropertyId] = useState<string | null>(null);
  const [detectedPropertyData, setDetectedPropertyData] = useState<any>(null);
  
  // Detectar automáticamente la propiedad desde la URL o prop
  useEffect(() => {
    const detectProperty = async () => {
      let propertyIdToUse: string | null = null;
      
      // 1. Si ya tenemos propertyId como prop, usarlo
      if (propertyId) {
        propertyIdToUse = propertyId;
      }
      // 2. Si estamos en una página de propiedad (/propiedades/[id]), obtener el ID de la URL
      else if (pathname?.startsWith('/propiedades/') && params?.id) {
        propertyIdToUse = params.id as string;
      }
      
      // Si encontramos un propertyId, obtener TODA la información de la propiedad
      if (propertyIdToUse) {
        setDetectedPropertyId(propertyIdToUse);
        
        try {
          const { data: property, error: propError } = await supabase
            .from('properties')
            .select('*')
            .eq('id', propertyIdToUse)
            .single();

          if (!propError && property) {
            setDetectedPropertyData(property);
            setDetectedPropertyInternalId(property.ID_interno || property.internal_id || null);
          }
        } catch (err) {
          console.error('Error al obtener datos de la propiedad:', err);
        }
      }
    };

    detectProperty();
  }, [pathname, params, propertyId]);
  
  const getSourceSection = (): string => {
    if (sourceSection) return sourceSection;
    if (propertyId || detectedPropertyId) return 'propiedad-detail';
    if (pathname === '/contacto') return 'contacto-page';
    if (pathname === '/propiedades') return 'propiedades-page';
    if (pathname === '/venta') return 'venta-page';
    if (pathname === '/renta') return 'renta-page';
    if (pathname === '/') return 'home-page';
    return 'unknown';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const section = getSourceSection();
    
    // Usar el propertyId detectado (de prop o de URL)
    const finalPropertyId = propertyId || detectedPropertyId;
    const finalPropertyInternalId = propertyInternalId || detectedPropertyInternalId;

    try {
      // 1. Guardar en la base de datos
      const { data: savedData, error: submitError } = await supabase
        .from('contact_requests')
        .insert([
          {
            property_id: finalPropertyId || null,
            property_internal_id: finalPropertyInternalId || null,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            status: 'pending',
            source_section: section,
          }
        ])
        .select()
        .single();

      if (submitError) throw submitError;

      // 2. Enviar email
      const emailSent = await sendEmail({
        to: 'inmuebles.oliverlopezguijoza@gmail.com',
        subject: `Nuevo contacto${propertyTitle || detectedPropertyData?.title ? ` - ${propertyTitle || detectedPropertyData?.title}` : ''} - ${formData.name}`,
        html: generateContactEmailHTML({
          ...formData,
          propertyId: finalPropertyId || undefined,
          propertyTitle: propertyTitle || detectedPropertyData?.title || undefined,
          propertyInternalId: finalPropertyInternalId || undefined,
          propertyData: detectedPropertyData || undefined,
          sourceSection: section,
        }),
      });

      if (!emailSent) {
        console.warn('⚠️ Email no pudo ser enviado, pero el contacto fue guardado en la BD');
      } else {
        console.log('✅ Email enviado correctamente');
      }

      // 3. Sincronizar con HubSpot si está configurado (en segundo plano, no bloquea)
      try {
        const hubspotToken = typeof window !== 'undefined' ? localStorage.getItem('hubspot_access_token') : null;
        if (hubspotToken) {
          fetch('/api/hubspot/create-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              phone: formData.phone,
              message: formData.message,
              propertyId: finalPropertyId || undefined,
              propertyTitle: propertyTitle || detectedPropertyData?.title || undefined,
              accessToken: hubspotToken,
            }),
          }).catch(err => {
            console.warn('⚠️ Error al sincronizar con HubSpot (no crítico):', err);
          });
        }
      } catch (hubspotError) {
        console.warn('⚠️ Error al sincronizar con HubSpot:', hubspotError);
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', acceptPrivacy: false });
      
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      console.error('Error completo:', err);
      
      let errorMessage = 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.';
      
      if (err?.message?.includes('row-level security')) {
        errorMessage = 'Error de permisos. Por favor contacta al administrador.';
      } else if (err?.message?.includes('violates')) {
        errorMessage = 'Error de validación. Verifica que todos los campos estén completos.';
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#050505] border border-white/10 rounded-lg p-6 md:p-8 shadow-2xl">
      {/* Header mejorado */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#22AADE]/20 rounded-lg">
            <svg className="w-6 h-6 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-light text-white">
            ¿Interesado en esta <span className="text-[#22AADE] italic font-bold">propiedad</span>?
          </h3>
        </div>
        <p className="text-gray-400 text-sm font-light pl-11 mb-4">
          Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas
        </p>
        {(propertyTitle || detectedPropertyData?.title) && (
          <div className="pl-11 p-4 bg-gradient-to-r from-[#22AADE]/10 to-transparent rounded-lg border border-[#22AADE]/30">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#22AADE] font-semibold text-xs uppercase tracking-wider">Propiedad Seleccionada</span>
            </div>
            <p className="text-white font-medium text-sm">{propertyTitle || detectedPropertyData?.title}</p>
          </div>
        )}
      </div>

      {success && (
        <div className="mb-6 p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">¡Mensaje Enviado!</h4>
          <p className="text-gray-300 text-sm mb-4">
            Gracias por tu interés. Nos pondremos en contacto contigo en las próximas 24 horas.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tiempo de respuesta: 24 horas</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all"
              placeholder="tu@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all"
              placeholder="55 1234 5678"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Tu Mensaje
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all resize-y"
              placeholder="Me gustaría saber más sobre esta propiedad, agendar una visita, o recibir información sobre financiamiento..."
            />
          </div>

          {/* Checkbox de privacidad mejorado */}
          <div className="flex items-start gap-3 p-4 bg-[#050505] rounded-lg border border-white/10">
            <input
              type="checkbox"
              id="acceptPrivacy"
              required
              checked={formData.acceptPrivacy}
              onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
              className="mt-0.5 h-5 w-5 bg-[#0a0a0a] border border-white/20 rounded text-[#22AADE] focus:ring-[#22AADE] focus:ring-2 flex-shrink-0"
            />
            <label htmlFor="acceptPrivacy" className="text-xs text-gray-400 leading-relaxed">
              Acepto la{' '}
              <Link href="/privacidad" className="text-[#22AADE] hover:underline font-medium">
                Política de Privacidad
              </Link>
              {' '}y autorizo el uso de mis datos para contactarme
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.acceptPrivacy}
            className="w-full bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black font-bold py-4 px-6 rounded-lg hover:from-[#1a9ad6] hover:to-[#22AADE] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] duration-300 text-sm uppercase tracking-wider"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Enviar Solicitud</span>
              </>
            )}
          </button>
          
          {/* Trust indicators */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Respuesta 24h</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
