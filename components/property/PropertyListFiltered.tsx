'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters, { FilterValues } from './PropertyFilters';
import { supabase } from '@/lib/supabase';
import { getRandomPropertyImageClient, getMainImageUrl } from '@/lib/cloudinary';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking_spaces?: number;
  property_type: string;
  status: 'venta' | 'renta';
  main_image_id: string | null;
  ID_interno?: string | null;
  internal_id?: string | null;
}

interface PropertyListFilteredProps {
  status: 'venta' | 'renta';
}

export default function PropertyListFiltered({ status }: PropertyListFilteredProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

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

  const loadRandomImages = async (props: Property[]) => {
    const imagePromises = props.map(async (property) => {
      const internalId = property.ID_interno || property.internal_id;
      if (internalId && property.status) {
        try {
          const imageUrl = await getRandomPropertyImageClient(internalId, property.status);
          if (imageUrl) {
            return { propertyId: property.id, imageUrl };
          }
        } catch (error) {
          console.error(`Error loading image for property ${property.id}:`, error);
        }
      }
      // Fallback a main_image_id si no hay imagen aleatoria
      if (property.main_image_id) {
        return { propertyId: property.id, imageUrl: getMainImageUrl(property.main_image_id) };
      }
      return { propertyId: property.id, imageUrl: '/images/placeholder.jpg' };
    });

    const images = await Promise.all(imagePromises);
    const imageMap: Record<string, string> = {};
    images.forEach(({ propertyId, imageUrl }) => {
      imageMap[propertyId] = imageUrl;
    });
    setImageUrls(imageMap);
  };

  // Cargar imágenes aleatorias de Cloudinary cuando cambian las propiedades
  useEffect(() => {
    if (properties.length > 0) {
      loadRandomImages(properties);
    }
  }, [properties.map(p => p.id).join(',')]);

  // Aplicar filtros adicionales
  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...properties];

    // Filtro de tipo de propiedad
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.property_type === filters.propertyType);
    }

    // Filtro de ubicación - Búsqueda flexible y no estricta
    if (filters.location) {
      const searchTerms = filters.location
        .toLowerCase()
        .trim()
        .split(/\s+/) // Dividir por espacios
        .filter(term => term.length > 0); // Eliminar términos vacíos
      
      if (searchTerms.length > 0) {
        filtered = filtered.filter(p => {
          // Normalizar texto: quitar acentos y convertir a minúsculas
          const normalize = (text: string) => 
            text.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
                .trim();
          
          const locationNormalized = normalize(p.location || '');
          const addressNormalized = normalize((p as any).address || '');
          
          // Buscar si TODOS los términos están presentes en location o address
          return searchTerms.every(term => {
            const termNormalized = normalize(term);
            return locationNormalized.includes(termNormalized) || 
                   addressNormalized.includes(termNormalized);
          });
        });
      }
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

    // Filtro de baños
    if (filters.bathrooms) {
      filtered = filtered.filter(p => (p.bathrooms || 0) >= Number(filters.bathrooms));
    }

    // Filtro de estacionamientos
    if (filters.parkingSpaces) {
      filtered = filtered.filter(p => (p.parking_spaces || 0) >= Number(filters.parkingSpaces));
    }

    // Filtro de área mínima
    if (filters.minArea) {
      filtered = filtered.filter(p => (p.area || 0) >= Number(filters.minArea));
    }

    // Filtro de área máxima
    if (filters.maxArea) {
      filtered = filtered.filter(p => (p.area || 0) <= Number(filters.maxArea));
    }

    setFilteredProperties(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22AADE] mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-light">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/10 rounded-sm p-8 text-center">
        <svg className="w-12 h-12 text-[#22AADE] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-white font-medium mb-4">{error}</p>
        <button
          onClick={fetchProperties}
          className="mt-4 bg-[#22AADE] text-black px-6 py-3 rounded-sm hover:bg-white transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
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
        <p className="text-gray-400 text-sm font-light">
          Mostrando <span className="font-medium text-white">{filteredProperties.length}</span> 
          {filteredProperties.length === 1 ? ' propiedad' : ' propiedades'} en <span className="font-medium text-[#22AADE]">{status}</span>
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
              imageUrl={imageUrls[property.id] || '/images/placeholder.jpg'}
              propertyType={property.property_type}
              status={property.status}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/5 rounded-sm p-12 text-center">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-light text-white mb-2">
            No se encontraron propiedades
          </h3>
          <p className="text-gray-400 mb-4 text-sm font-light">
            No hay propiedades en <span className="text-[#22AADE]">{status}</span> que coincidan con tus criterios de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}