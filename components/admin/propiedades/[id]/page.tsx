// app/admin/propiedades/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PropertyEditForm from '@/components/admin/PropertyEditForm';
import Link from 'next/link';

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      if (!data) {
        alert('Propiedad no encontrada');
        router.push('/admin/propiedades');
        return;
      }

      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      alert('Error al cargar la propiedad');
      router.push('/admin/propiedades');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/propiedades"
          className="text-gray-600 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Editar Propiedad</h2>
          <p className="text-gray-600 mt-1">Actualiza la información de la propiedad</p>
        </div>
      </div>

      <PropertyEditForm property={property} />
    </div>
  );
}