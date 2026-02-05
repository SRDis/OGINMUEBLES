'use client';

import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Home, MapPin, Info, Image, CheckCircle, Sparkles } from 'lucide-react';

interface PropertyFormData {
  title: string;
  description: string;
  property_type: string;
  internal_id: string;
  capture_date: string;
  location: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  half_bathrooms: string;
  area: string;
  built_area: string;
  price: string;
  status: 'venta' | 'renta';
  parking_spaces: string;
  has_pool: boolean;
  has_jacuzzi: boolean;
  amenities: string;
  featured: boolean;
  main_image_id: string;
  google_drive_folder_id: string;
}

export default function PropertyFormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    property_type: 'Casa',
    internal_id: '',
    capture_date: new Date().toISOString().split('T')[0],
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    half_bathrooms: '0',
    area: '',
    built_area: '',
    price: '',
    status: 'venta',
    parking_spaces: '0',
    has_pool: false,
    has_jacuzzi: false,
    amenities: '',
    featured: false,
    main_image_id: '',
    google_drive_folder_id: '',
  });

  const steps = [
    {
      id: 'basic',
      title: 'Básico',
      icon: Home,
      fields: ['title', 'description', 'property_type', 'internal_id', 'capture_date']
    },
    {
      id: 'location',
      title: 'Ubicación',
      icon: MapPin,
      fields: ['location', 'address']
    },
    {
      id: 'details',
      title: 'Detalles',
      icon: Info,
      fields: ['bedrooms', 'bathrooms', 'half_bathrooms', 'area', 'built_area', 'price', 'status']
    },
    {
      id: 'amenities',
      title: 'Amenidades',
      icon: Sparkles,
      fields: ['parking_spaces', 'has_pool', 'has_jacuzzi', 'amenities']
    },
    {
      id: 'images',
      title: 'Imágenes',
      icon: Image,
      fields: ['featured', 'main_image_id', 'google_drive_folder_id']
    }
  ];

  const isStepValid = (stepIndex: number) => {
    const step = steps[stepIndex];
    return step.fields.every(field => {
      const value = formData[field as keyof PropertyFormData];
      if (typeof value === 'boolean') return true;
      if (field === 'half_bathrooms' || field === 'parking_spaces') return true;
      if (field === 'main_image_id' || field === 'google_drive_folder_id' || field === 'amenities') return true;
      return value !== '';
    });
  };

  const canProceed = isStepValid(currentStep);
  const isLastStep = currentStep === steps.length - 1;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (canProceed && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed) return;
    
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        address: formData.address,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        half_bathrooms: parseInt(formData.half_bathrooms),
        area: parseFloat(formData.area),
        built_area: parseFloat(formData.built_area),
        property_type: formData.property_type,
        status: formData.status,
        featured: formData.featured,
        internal_id: formData.internal_id,
        capture_date: formData.capture_date,
        parking_spaces: parseInt(formData.parking_spaces),
        has_pool: formData.has_pool,
        has_jacuzzi: formData.has_jacuzzi,
        main_image_id: formData.main_image_id || null,
        google_drive_folder_id: formData.google_drive_folder_id || null,
        amenities: amenitiesArray.length > 0 ? amenitiesArray : null,
      };

      console.log('Property data:', propertyData);
      
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setCurrentStep(0);
        setFormData({
          title: '',
          description: '',
          property_type: 'Casa',
          internal_id: '',
          capture_date: new Date().toISOString().split('T')[0],
          location: '',
          address: '',
          bedrooms: '',
          bathrooms: '',
          half_bathrooms: '0',
          area: '',
          built_area: '',
          price: '',
          status: 'venta',
          parking_spaces: '0',
          has_pool: false,
          has_jacuzzi: false,
          amenities: '',
          featured: false,
          main_image_id: '',
          google_drive_folder_id: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-bounce">
            <Check className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">¡Registro Exitoso!</h2>
          <p className="text-sm sm:text-base text-green-600">La propiedad ha sido guardada correctamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto">
        {/* Header con Progress - Sticky en mobile */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="p-4 sm:p-6">
           
            
            {/* Progress Bar */}
            <div className="mb-4">
              {/* Steps Desktop */}
              <div className="hidden sm:flex justify-between mb-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs text-center ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Steps Mobile - Solo icono activo */}
              <div className="flex sm:hidden items-center justify-center mb-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  
                  if (!isActive) return null;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-2 ring-4 ring-blue-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Paso {currentStep + 1} de {steps.length}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content - Con scroll */}
        <div className="bg-white mx-2 sm:mx-0 rounded-t-xl sm:rounded-none shadow-lg">
          <div className="p-4 sm:p-6 min-h-[60vh] sm:min-h-[500px]">
            {/* Step 0: Información Básica */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ID Interno *
                    </label>
                    <input
                      type="text"
                      name="internal_id"
                      required
                      value={formData.internal_id}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PROP-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Fecha de Captación *
                    </label>
                    <input
                      type="date"
                      name="capture_date"
                      required
                      value={formData.capture_date}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Título *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Casa moderna en zona residencial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tipo de Propiedad *
                  </label>
                  <select
                    name="property_type"
                    required
                    value={formData.property_type}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Local Comercial">Local Comercial</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe las características principales..."
                  />
                </div>
              </div>
            )}

            {/* Step 1: Ubicación */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ciudad/Colonia *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Polanco, CDMX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Av. Principal 123"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Detalles */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Recámaras *
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      required
                      min="0"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Baños *
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      required
                      min="0"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ½ Baños
                    </label>
                    <input
                      type="number"
                      name="half_bathrooms"
                      min="0"
                      value={formData.half_bathrooms}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Área Total (m²) *
                    </label>
                    <input
                      type="number"
                      name="area"
                      required
                      min="0"
                      step="0.01"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Área Construida (m²) *
                    </label>
                    <input
                      type="number"
                      name="built_area"
                      required
                      min="0"
                      step="0.01"
                      value={formData.built_area}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Precio *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3 text-gray-500 text-base">$</span>
                      <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Estado *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="venta">En Venta</option>
                      <option value="renta">En Renta</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Amenidades */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Estacionamientos
                  </label>
                  <input
                    type="number"
                    name="parking_spaces"
                    min="0"
                    value={formData.parking_spaces}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Características Especiales
                  </label>
                  
                  <label className="flex items-center p-3.5 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer active:scale-98">
                    <input
                      type="checkbox"
                      name="has_pool"
                      checked={formData.has_pool}
                      onChange={handleChange}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-base font-medium text-gray-700 flex-1">
                      🏊 Alberca
                    </span>
                  </label>

                  <label className="flex items-center p-3.5 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer active:scale-98">
                    <input
                      type="checkbox"
                      name="has_jacuzzi"
                      checked={formData.has_jacuzzi}
                      onChange={handleChange}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-base font-medium text-gray-700 flex-1">
                      🛁 Jacuzzi
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Otras Amenidades
                  </label>
                  <textarea
                    name="amenities"
                    rows={4}
                    value={formData.amenities}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Gimnasio, Seguridad 24/7, Jardín..."
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Separa cada amenidad con una coma
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Imágenes */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <label className="flex items-center p-3.5 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer active:scale-98">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-base font-medium text-gray-700 flex-1">
                    ⭐ Propiedad destacada
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ID Imagen Principal
                  </label>
                  <input
                    type="text"
                    name="main_image_id"
                    value={formData.main_image_id}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1ABC..."
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    ID del archivo en Google Drive (opcional)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ID Carpeta de Imágenes
                  </label>
                  <input
                    type="text"
                    name="google_drive_folder_id"
                    value={formData.google_drive_folder_id}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1XYZ..."
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    ID de la carpeta con todas las imágenes (opcional)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer - Sticky en mobile */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg mx-2 sm:mx-0 rounded-b-xl sm:rounded-none">
          <div className="p-4 sm:p-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'w-8 bg-blue-600' :
                    index < currentStep ? 'w-2 bg-green-500' :
                    'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white font-medium active:scale-95 transition-all text-sm sm:text-base ${
                  canProceed 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 sm:ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed || loading}
                className={`flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-white font-semibold active:scale-95 transition-all text-sm sm:text-base ${
                  canProceed && !loading
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin sm:mr-2" />
                    <span className="hidden sm:inline">Guardando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                    <span className="hidden sm:inline">Guardar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .active\:scale-95:active {
          transform: scale(0.95);
        }

        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}