'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  hideStatusFilter?: boolean;
}

export interface FilterValues {
  status: 'all' | 'venta' | 'renta';
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  parkingSpaces: string;
  minArea: string;
  maxArea: string;
  location: string;
}

export default function PropertyFilters({ onFilterChange, hideStatusFilter = false }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    status: 'all',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpaces: '',
    minArea: '',
    maxArea: '',
    location: ''
  });

  const [locationInput, setLocationInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Debounce para ubicación
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prevFilters => {
        if (locationInput !== prevFilters.location) {
          const newFilters = { ...prevFilters, location: locationInput };
          onFilterChange(newFilters);
          return newFilters;
        }
        return prevFilters;
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [locationInput, onFilterChange]);

  useEffect(() => {
    if (filters.location === '') {
      setLocationInput('');
    }
  }, [filters.location]);

  const handleChange = useCallback((field: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleLocationChange = useCallback((value: string) => {
    setLocationInput(value);
  }, []);

  const handleReset = useCallback(() => {
    const resetFilters: FilterValues = {
      status: 'all',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      parkingSpaces: '',
      minArea: '',
      maxArea: '',
      location: ''
    };
    setFilters(resetFilters);
    setLocationInput('');
    onFilterChange(resetFilters);
  }, [onFilterChange]);

  const removeFilter = useCallback((field: keyof FilterValues) => {
    const defaultValue = field === 'status' ? 'all' : '';
    handleChange(field, defaultValue);
  }, [handleChange]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.propertyType) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.parkingSpaces) count++;
    if (filters.minArea) count++;
    if (filters.maxArea) count++;
    if (filters.location) count++;
    return count;
  }, [filters]);

  const activeFilters = useMemo(() => {
    const active: Array<{ field: keyof FilterValues; label: string; value: string }> = [];
    if (filters.status !== 'all') active.push({ field: 'status', label: 'Operación', value: filters.status === 'venta' ? 'Venta' : 'Renta' });
    if (filters.propertyType) active.push({ field: 'propertyType', label: 'Tipo', value: filters.propertyType });
    if (filters.minPrice) active.push({ field: 'minPrice', label: 'Precio Mín', value: `$${parseInt(filters.minPrice).toLocaleString('es-MX')}` });
    if (filters.maxPrice) active.push({ field: 'maxPrice', label: 'Precio Máx', value: `$${parseInt(filters.maxPrice).toLocaleString('es-MX')}` });
    if (filters.bedrooms) active.push({ field: 'bedrooms', label: 'Recámaras', value: `${filters.bedrooms}+` });
    if (filters.bathrooms) active.push({ field: 'bathrooms', label: 'Baños', value: `${filters.bathrooms}+` });
    if (filters.parkingSpaces) active.push({ field: 'parkingSpaces', label: 'Estacionamientos', value: `${filters.parkingSpaces}+` });
    if (filters.minArea) active.push({ field: 'minArea', label: 'Área Mín', value: `${filters.minArea} m²` });
    if (filters.maxArea) active.push({ field: 'maxArea', label: 'Área Máx', value: `${filters.maxArea} m²` });
    if (filters.location) active.push({ field: 'location', label: 'Ubicación', value: filters.location });
    return active;
  }, [filters]);

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const num = parseInt(value);
    if (isNaN(num)) return '';
    return `$${num.toLocaleString('es-MX')}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#050505] backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden mb-8 shadow-2xl">
      {/* Header mejorado */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] to-[#111]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#22AADE]/20 to-[#22AADE]/10 rounded-lg border border-[#22AADE]/30 shadow-lg">
              <svg className="w-6 h-6 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold mb-1">Filtros de Búsqueda</h2>
              <p className="text-gray-400 text-xs">Personaliza tu búsqueda para encontrar la propiedad ideal</p>
            </div>
            {activeFiltersCount > 0 && (
              <div className="relative">
                <span className="bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black text-xs font-bold px-3 py-1.5 rounded-full min-w-[28px] text-center shadow-lg animate-pulse">
                  {activeFiltersCount}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all px-4 py-2 rounded-lg hover:bg-white/5 group"
              aria-label={isExpanded ? 'Contraer' : 'Expandir'}
            >
              <span className="text-xs font-medium">{isExpanded ? 'Ocultar' : 'Mostrar'}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={handleReset}
              disabled={activeFiltersCount === 0}
              className={`text-xs uppercase tracking-wider font-bold transition-all px-5 py-2.5 rounded-lg ${
                activeFiltersCount > 0
                  ? 'bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black hover:from-[#1a9ad6] hover:to-[#22AADE] shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
                  : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              Limpiar Todo
            </button>
          </div>
        </div>

        {/* Active Filters Chips mejorados */}
        {activeFilters.length > 0 && (
          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-xs text-gray-400 font-medium">Filtros activos:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div
                  key={filter.field}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#22AADE]/15 to-[#22AADE]/5 border border-[#22AADE]/40 rounded-full px-4 py-2 text-xs hover:from-[#22AADE]/25 hover:to-[#22AADE]/10 transition-all shadow-md hover:shadow-lg"
                >
                  <span className="text-gray-300 font-medium">{filter.label}:</span>
                  <span className="text-white font-semibold">{filter.value}</span>
                  <button
                    onClick={() => removeFilter(filter.field)}
                    className="ml-1 text-gray-400 hover:text-white transition-colors p-0.5 rounded-full hover:bg-[#22AADE]/20"
                    aria-label="Eliminar filtro"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters Content con mejor diseño */}
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-6 space-y-8 bg-gradient-to-b from-transparent to-[#050505]/50">
          {/* Row 1: Status, Property Type, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status */}
            {!hideStatusFilter && (
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
                  <div className="p-1.5 bg-[#22AADE]/20 rounded">
                    <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Operación
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                >
                  <option value="all" className="bg-[#050505]">Todas las operaciones</option>
                  <option value="venta" className="bg-[#050505]">En Venta</option>
                  <option value="renta" className="bg-[#050505]">En Renta</option>
                </select>
              </div>
            )}

            {/* Property Type */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
                <div className="p-1.5 bg-[#22AADE]/20 rounded">
                  <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                Tipo de Propiedad
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
              >
                <option value="" className="bg-[#050505]">Todos los tipos</option>
                <option value="Casa" className="bg-[#050505]">Casa</option>
                <option value="Departamento" className="bg-[#050505]">Departamento</option>
                <option value="Condominio" className="bg-[#050505]">Condominio</option>
                <option value="Terreno" className="bg-[#050505]">Terreno</option>
                <option value="Local Comercial" className="bg-[#050505]">Local Comercial</option>
                <option value="Oficina" className="bg-[#050505]">Oficina</option>
                <option value="Bodega" className="bg-[#050505]">Bodega</option>
                <option value="Edificio" className="bg-[#050505]">Edificio</option>
              </select>
            </div>

            {/* Location mejorado */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
                <div className="p-1.5 bg-[#22AADE]/20 rounded">
                  <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Ubicación
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  placeholder="Ej: Polanco, CDMX, Santa Fe..."
                  className="w-full px-4 py-3.5 pl-11 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-500 italic">Búsqueda flexible: encuentra por colonia, ciudad o zona</p>
            </div>
          </div>

          {/* Row 2: Price Range mejorado */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
              <div className="p-1.5 bg-[#22AADE]/20 rounded">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Rango de Precio
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  placeholder="Precio mínimo"
                  className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                />
                {filters.minPrice && (
                  <p className="text-xs text-[#22AADE] mt-2 font-medium">{formatCurrency(filters.minPrice)}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  placeholder="Precio máximo"
                  className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                />
                {filters.maxPrice && (
                  <p className="text-xs text-[#22AADE] mt-2 font-medium">{formatCurrency(filters.maxPrice)}</p>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Bedrooms, Bathrooms, Parking mejorados */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
              <div className="p-1.5 bg-[#22AADE]/20 rounded">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Características
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bedrooms */}
              <div>
                <label className="block text-xs text-gray-400 mb-3 font-medium">Recámaras</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleChange('bedrooms', filters.bedrooms === String(num) ? '' : String(num))}
                      className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                        filters.bedrooms === String(num)
                          ? 'bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black shadow-lg scale-105'
                          : 'bg-[#050505] border border-white/10 text-white hover:border-[#22AADE]/50 hover:bg-white/5'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs text-gray-400 mb-3 font-medium">Baños</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleChange('bathrooms', filters.bathrooms === String(num) ? '' : String(num))}
                      className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                        filters.bathrooms === String(num)
                          ? 'bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black shadow-lg scale-105'
                          : 'bg-[#050505] border border-white/10 text-white hover:border-[#22AADE]/50 hover:bg-white/5'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Parking Spaces */}
              <div>
                <label className="block text-xs text-gray-400 mb-3 font-medium">Estacionamientos</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleChange('parkingSpaces', filters.parkingSpaces === String(num) ? '' : String(num))}
                      className={`flex-1 px-4 py-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                        filters.parkingSpaces === String(num)
                          ? 'bg-gradient-to-r from-[#22AADE] to-[#1a9ad6] text-black shadow-lg scale-105'
                          : 'bg-[#050505] border border-white/10 text-white hover:border-[#22AADE]/50 hover:bg-white/5'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Area Range mejorado */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
              <div className="p-1.5 bg-[#22AADE]/20 rounded">
                <svg className="w-4 h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              Rango de Área (m²)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={filters.minArea}
                  onChange={(e) => handleChange('minArea', e.target.value)}
                  placeholder="Área mínima"
                  className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={filters.maxArea}
                  onChange={(e) => handleChange('maxArea', e.target.value)}
                  placeholder="Área máxima"
                  className="w-full px-4 py-3.5 bg-[#050505] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22AADE] focus:ring-2 focus:ring-[#22AADE]/30 transition-all hover:border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
