'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters, { FilterValues } from './PropertyFilters';
import { supabase } from '@/lib/supabase';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: string;
  status: 'venta' | 'renta';
  main_image_id: string | null;
}

interface PropertyListFilteredProps {
  status: 'venta' | 'renta';
}

export default function PropertyListFiltered({ status }: PropertyListFilteredProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar propiedades filtradas por status
  useEffect(() => {
    fetchProperties();
  }, [status]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Error al cargar las propiedades');
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros adicionales
  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...properties];

    // Filtro de tipo de propiedad
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.property_type === filters.propertyType);
    }

    // Filtro de ubicación
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filtro de precio mínimo
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }

    // Filtro de precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Filtro de recámaras
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= Number(filters.bedrooms));
    }

    setFilteredProperties(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-800 font-semibold mb-2">{error}</p>
        <button
          onClick={fetchProperties}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filtros - ocultamos el filtro de status ya que está pre-aplicado */}
      <PropertyFilters onFilterChange={handleFilterChange} />

      {/* Resultados */}
      <div className="mb-6">
        <p className="text-gray-600">
          Mostrando <span className="font-semibold text-gray-900">{filteredProperties.length}</span> 
          {filteredProperties.length === 1 ? ' propiedad' : ' propiedades'} en {status}
        </p>
      </div>

      {/* Grid de propiedades */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              imageUrl={
                property.main_image_id
                  ? `https://drive.google.com/thumbnail?id=${property.main_image_id}&sz=w1000`
                  : '/images/placeholder.jpg'
              }
              propertyType={property.property_type}
              status={property.status}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No se encontraron propiedades
          </h3>
          <p className="text-gray-600 mb-4">
            No hay propiedades en {status} que coincidan con tus criterios de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}