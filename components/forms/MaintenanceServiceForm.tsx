'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function generateMaintenanceServiceEmailHTML(data: {
  name: string;
  email: string;
  phone: string;
  location: string;
  terrainType: string;
  terrainSize: string;
  services: string[];
  frequency: string;
  message: string;
}): string {
  const whatsappUrl = `https://wa.me/52${data.phone.replace(/\D/g, '')}?text=Hola ${data.name}, recibimos tu solicitud de mantenimiento de terrenos. Te contactaremos pronto.`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22AADE; color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 20px; }
        .button { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .info-table td { padding: 8px; vertical-align: top; }
        .info-table td:first-child { font-weight: bold; color: #333; white-space: nowrap; }
        .info-table td:last-child { color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nueva Solicitud - Mantenimiento de Terrenos</h1>
          <p>Limpieza, Jardinería, Desmalezado y más</p>
        </div>
        <div class="content">
          <h2>Datos del Propietario</h2>
          <table class="info-table" style="width: 100%; border-collapse: collapse;">
            <tr><td>Nombre:</td><td>${data.name}</td></tr>
            <tr><td>Email:</td><td>${data.email}</td></tr>
            <tr><td>Teléfono:</td><td>${data.phone}</td></tr>
          </table>

          <h2 style="margin-top: 24px;">Datos del Terreno</h2>
          <table class="info-table" style="width: 100%; border-collapse: collapse;">
            <tr><td>Ubicación / Zona:</td><td>${data.location}</td></tr>
            <tr><td>Tipo de Terreno:</td><td>${data.terrainType}</td></tr>
            <tr><td>Tamaño aprox.:</td><td>${data.terrainSize}</td></tr>
            <tr><td>Servicios solicitados:</td><td>${data.services.join(', ')}</td></tr>
            <tr><td>Frecuencia deseada:</td><td>${data.frequency}</td></tr>
          </table>

          ${data.message ? `
          <h2 style="margin-top: 24px;">Mensaje / Notas</h2>
          <p>${data.message}</p>
          ` : ''}

          <div style="text-align: center; margin: 30px 0;">
            <a href="${whatsappUrl}" class="button" target="_blank">
              📱 Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default function MaintenanceServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    terrainType: '',
    terrainSize: '',
    services: [] as string[],
    frequency: '',
    message: '',
    acceptPrivacy: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const serviceOptions = [
    'Limpieza general',
    'Jardinería y paisajismo',
    'Desmalezado y chapeo',
    'Poda de árboles',
    'Control de plagas',
    'Riego y mantenimiento de césped',
    'Cercado y delimitación',
    'Retiro de escombros',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && name === 'acceptPrivacy') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // 1. Guardar en la base de datos
      const { error: submitError } = await supabase
        .from('contact_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[Mantenimiento de Terrenos] Ubicación: ${formData.location} | Tipo: ${formData.terrainType} | Tamaño: ${formData.terrainSize} | Servicios: ${formData.services.join(', ')} | Frecuencia: ${formData.frequency} | Notas: ${formData.message}`,
          status: 'pending',
          source_section: 'mantenimiento-terrenos',
        }]);

      if (submitError) throw submitError;

      // 2. Enviar email
      const emailSent = await sendEmail({
        to: 'inmuebles.oliverlopezguijoza@gmail.com',
        subject: `Nueva solicitud - Mantenimiento de Terrenos - ${formData.name}`,
        html: generateMaintenanceServiceEmailHTML(formData),
      });

      if (!emailSent) {
        console.warn('⚠️ Email no pudo ser enviado, pero el contacto fue guardado en la BD');
      }

      setSuccess(true);
      setFormData({
        name: '', phone: '', email: '', location: '', terrainType: '',
        terrainSize: '', services: [], frequency: '',
        message: '', acceptPrivacy: false,
      });

      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      console.error('Error completo:', err);
      setError(err?.message || 'Hubo un error al enviar tu solicitud. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = 'w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all text-sm';
  const labelClasses = 'block text-sm font-medium text-gray-300 mb-2';
  const selectClasses = 'w-full px-4 py-3 bg-[#050505] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#22AADE] focus:border-[#22AADE] transition-all text-sm appearance-none';

  return (
    <div id="formulario" className="bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#050505] border border-white/10 rounded-lg p-6 md:p-10 shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#22AADE]/20 rounded-lg">
            <svg className="w-6 h-6 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-light text-white">
            Solicitar <span className="text-[#22AADE] italic font-bold">Cotización de Mantenimiento</span>
          </h3>
        </div>
        <p className="text-gray-400 text-sm font-light pl-11">
          Completa el formulario y nuestro equipo de mantenimiento te contactará en menos de 24 horas.
        </p>
      </div>

      {/* Estado de éxito */}
      {success && (
        <div className="mb-6 p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">¡Solicitud Recibida!</h4>
          <p className="text-gray-300 text-sm mb-4">
            Nuestro equipo revisará la información y te contactará con una cotización personalizada.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tiempo de respuesta: menos de 24 horas</span>
          </div>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="mt-name" className={labelClasses}>Nombre completo *</label>
              <input type="text" id="mt-name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Tu nombre completo" />
            </div>
            <div>
              <label htmlFor="mt-phone" className={labelClasses}>Teléfono *</label>
              <input type="tel" id="mt-phone" name="phone" required value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="55 1234 5678" />
            </div>
          </div>

          {/* Email y Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="mt-email" className={labelClasses}>Email *</label>
              <input type="email" id="mt-email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="tu@ejemplo.com" />
            </div>
            <div>
              <label htmlFor="mt-location" className={labelClasses}>Ubicación / zona del terreno *</label>
              <input type="text" id="mt-location" name="location" required value={formData.location} onChange={handleChange} className={inputClasses} placeholder="Ej: Valle de Bravo, Avándaro..." />
            </div>
          </div>

          {/* Tipo de terreno y Tamaño */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="mt-terrainType" className={labelClasses}>Tipo de terreno *</label>
              <div className="relative">
                <select id="mt-terrainType" name="terrainType" required value={formData.terrainType} onChange={handleChange} className={selectClasses}>
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Terreno baldío">Terreno baldío</option>
                  <option value="Jardín residencial">Jardín residencial</option>
                  <option value="Terreno con construcción">Terreno con construcción</option>
                  <option value="Terreno boscoso">Terreno boscoso</option>
                  <option value="Terreno campestre">Terreno campestre</option>
                  <option value="Otro">Otro</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="mt-terrainSize" className={labelClasses}>Tamaño aproximado (m²) *</label>
              <input type="text" id="mt-terrainSize" name="terrainSize" required value={formData.terrainSize} onChange={handleChange} className={inputClasses} placeholder="Ej: 500 m²" />
            </div>
          </div>

          {/* Servicios requeridos (checkboxes) */}
          <div>
            <label className={labelClasses}>Servicios requeridos *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                    formData.services.includes(service)
                      ? 'border-[#22AADE]/50 bg-[#22AADE]/10 text-white'
                      : 'border-white/10 bg-[#050505] text-gray-400 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="h-4 w-4 bg-[#0a0a0a] border border-white/20 rounded text-[#22AADE] focus:ring-[#22AADE] focus:ring-2"
                  />
                  <span className="text-sm font-light">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Frecuencia */}
          <div>
            <label htmlFor="mt-frequency" className={labelClasses}>Frecuencia deseada *</label>
            <div className="relative">
              <select id="mt-frequency" name="frequency" required value={formData.frequency} onChange={handleChange} className={selectClasses}>
                <option value="" disabled>Selecciona la frecuencia</option>
                <option value="Servicio único">Servicio único</option>
                <option value="Semanal">Semanal</option>
                <option value="Quincenal">Quincenal</option>
                <option value="Mensual">Mensual</option>
                <option value="Bimestral">Bimestral</option>
                <option value="Por definir">Por definir</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="mt-message" className={labelClasses}>Mensaje / notas adicionales</label>
            <textarea id="mt-message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-y`} placeholder="Cuéntanos más sobre tu terreno, estado actual, accesibilidad, necesidades especiales, etc." />
          </div>

          {/* Checkbox privacidad */}
          <div className="flex items-start gap-3 p-4 bg-[#050505] rounded-lg border border-white/10">
            <input
              type="checkbox"
              id="mt-acceptPrivacy"
              name="acceptPrivacy"
              required
              checked={formData.acceptPrivacy}
              onChange={handleChange}
              className="mt-0.5 h-5 w-5 bg-[#0a0a0a] border border-white/20 rounded text-[#22AADE] focus:ring-[#22AADE] focus:ring-2 flex-shrink-0"
            />
            <label htmlFor="mt-acceptPrivacy" className="text-xs text-gray-400 leading-relaxed">
              Acepto la{' '}
              <Link href="/privacidad" className="text-[#22AADE] hover:underline font-medium">
                Política de Privacidad
              </Link>
              {' '}y autorizo el uso de mis datos para recibir información sobre el servicio de mantenimiento de terrenos.
            </label>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading || !formData.acceptPrivacy || formData.services.length === 0}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Solicitar Cotización</span>
              </>
            )}
          </button>

          {/* Microcopy de confianza */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>100% Confidencial</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
