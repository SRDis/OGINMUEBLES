'use client';

import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sendEmail, generatePersonalizedSearchEmailHTML } from '@/lib/email';
import Link from 'next/link';

interface PersonalizedSearchFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalizedSearchForm({ isOpen, onClose }: PersonalizedSearchFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    operation_type: 'ambas' as 'venta' | 'renta' | 'ambas',
    preferred_locations: [] as string[],
    location_priority: 'medium' as 'high' | 'medium' | 'low',
    property_types: [] as string[],
    min_bedrooms: 0,
    max_bedrooms: 10,
    min_bathrooms: 0,
    max_bathrooms: 10,
    min_area: 0,
    max_area: 10000,
    parking_spaces: 0,
    min_price: 0,
    max_price: 999999999,
    budget_flexibility: 'flexible' as 'strict' | 'flexible' | 'very-flexible',
    has_pool: false,
    has_garden: false,
    has_security: false,
    has_gym: false,
    has_elevator: false,
    other_amenities: '',
    urgency: '3-6months' as 'immediate' | '1-3months' | '3-6months' | '6+months',
    additional_notes: '',
    acceptPrivacy: false,
  });

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Guardar en base de datos
      const { error: dbError } = await supabase
        .from('personalized_searches')
        .insert([{
          ...formData,
          preferred_locations: formData.preferred_locations,
          property_types: formData.property_types,
        }]);

      if (dbError) throw dbError;

      // Enviar email
      await sendEmail({
        to: 'inmuebles.oliverlopezguijoza@gmail.com',
        subject: `Nueva Búsqueda Personalizada - ${formData.client_name}`,
        html: generatePersonalizedSearchEmailHTML(formData),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setCurrentStep(0);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la búsqueda. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-light text-white">
            Búsqueda <span className="font-bold italic">Personalizada</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${
                  i <= currentStep ? 'bg-[#22AADE]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center">
            Paso {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-[#22AADE] mx-auto mb-4" />
              <h3 className="text-2xl font-light text-white mb-2">¡Búsqueda Enviada!</h3>
              <p className="text-gray-400">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Información de Contacto */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Información de Contacto</h3>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Tipo de Operación */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">¿Qué buscas?</h3>
                  {['venta', 'renta', 'ambas'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, operation_type: type as any })}
                      className={`w-full p-4 text-left border rounded-sm transition-all ${
                        formData.operation_type === type
                          ? 'border-[#22AADE] bg-[#22AADE]/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-white capitalize">{type === 'ambas' ? 'Ambas opciones' : type}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Ubicación */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Ubicación Preferida</h3>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Zonas de interés (separadas por comas)</label>
                    <input
                      type="text"
                      value={formData.preferred_locations.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        preferred_locations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      placeholder="Valle de Bravo, CDMX, Polanco..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Prioridad de ubicación</label>
                    <select
                      value={formData.location_priority}
                      onChange={(e) => setFormData({ ...formData, location_priority: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Tipo de Propiedad */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Tipo de Propiedad</h3>
                  {['Casa', 'Departamento', 'Terreno', 'Local Comercial', 'Oficina'].map((type) => (
                    <label key={type} className="flex items-center gap-3 p-4 border border-white/10 rounded-sm hover:border-[#22AADE]/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.property_types.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, property_types: [...formData.property_types, type] });
                          } else {
                            setFormData({ ...formData, property_types: formData.property_types.filter(t => t !== type) });
                          }
                        }}
                        className="w-4 h-4 text-[#22AADE]"
                      />
                      <span className="text-white">{type}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 5: Recámaras y Baños */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-white mb-6">Recámaras y Baños</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Recámaras mínimas</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.min_bedrooms}
                        onChange={(e) => setFormData({ ...formData, min_bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Recámaras máximas</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.max_bedrooms}
                        onChange={(e) => setFormData({ ...formData, max_bedrooms: parseInt(e.target.value) || 10 })}
                        className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Baños mínimos</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.min_bathrooms}
                        onChange={(e) => setFormData({ ...formData, min_bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Baños máximos</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.max_bathrooms}
                        onChange={(e) => setFormData({ ...formData, max_bathrooms: parseInt(e.target.value) || 10 })}
                        className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Área y Precio */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-white mb-6">Área y Presupuesto</h3>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Área mínima (m²)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.min_area}
                      onChange={(e) => setFormData({ ...formData, min_area: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Área máxima (m²)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.max_area}
                      onChange={(e) => setFormData({ ...formData, max_area: parseFloat(e.target.value) || 10000 })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Presupuesto mínimo</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.min_price}
                      onChange={(e) => setFormData({ ...formData, min_price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Presupuesto máximo</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.max_price}
                      onChange={(e) => setFormData({ ...formData, max_price: parseFloat(e.target.value) || 999999999 })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Flexibilidad de presupuesto</label>
                    <select
                      value={formData.budget_flexibility}
                      onChange={(e) => setFormData({ ...formData, budget_flexibility: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    >
                      <option value="strict">Estricto</option>
                      <option value="flexible">Flexible</option>
                      <option value="very-flexible">Muy flexible</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 7: Amenidades */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Amenidades Deseadas</h3>
                  {[
                    { key: 'has_pool', label: 'Alberca' },
                    { key: 'has_garden', label: 'Jardín' },
                    { key: 'has_security', label: 'Seguridad 24/7' },
                    { key: 'has_gym', label: 'Gimnasio' },
                    { key: 'has_elevator', label: 'Elevador' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 p-4 border border-white/10 rounded-sm hover:border-[#22AADE]/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="w-4 h-4 text-[#22AADE]"
                      />
                      <span className="text-white">{label}</span>
                    </label>
                  ))}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Otras amenidades</label>
                    <textarea
                      value={formData.other_amenities}
                      onChange={(e) => setFormData({ ...formData, other_amenities: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 8: Urgencia y Notas */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Urgencia y Notas Adicionales</h3>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">¿Cuándo necesitas la propiedad?</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                    >
                      <option value="immediate">Inmediato</option>
                      <option value="1-3months">1-3 meses</option>
                      <option value="3-6months">3-6 meses</option>
                      <option value="6+months">Más de 6 meses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Notas adicionales</label>
                    <textarea
                      value={formData.additional_notes}
                      onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-sm text-white"
                      rows={4}
                      placeholder="Cualquier información adicional que consideres relevante..."
                    />
                  </div>
                </div>
              )}

              {/* Step 9: Privacidad y Envío */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-light text-white mb-6">Confirmación</h3>
                  <div className="bg-[#050505] border border-white/10 rounded-sm p-6 space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Resumen de tu búsqueda:</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Operación: {formData.operation_type === 'ambas' ? 'Venta y Renta' : formData.operation_type}</li>
                        <li>• Ubicaciones: {formData.preferred_locations.join(', ') || 'No especificadas'}</li>
                        <li>• Tipos: {formData.property_types.join(', ') || 'Todos'}</li>
                        <li>• Recámaras: {formData.min_bedrooms} - {formData.max_bedrooms}</li>
                        <li>• Presupuesto: ${formData.min_price.toLocaleString()} - ${formData.max_price.toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      required
                      checked={formData.acceptPrivacy}
                      onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#22AADE]"
                    />
                    <label htmlFor="acceptPrivacy" className="text-xs text-gray-400">
                      Acepto la{' '}
                      <Link href="/privacidad" className="text-[#22AADE] hover:underline">
                        Política de Privacidad
                      </Link>
                      {' '}y los{' '}
                      <Link href="/terminos" className="text-[#22AADE] hover:underline">
                        Términos y Condiciones
                      </Link>
                      . *
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-[#050505] border border-white/10 text-white rounded-sm hover:border-[#22AADE] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#22AADE] text-black rounded-sm hover:bg-white font-bold flex items-center gap-2"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !formData.acceptPrivacy}
                    className="px-6 py-3 bg-[#22AADE] text-black rounded-sm hover:bg-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Enviando...' : 'Enviar Búsqueda'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
