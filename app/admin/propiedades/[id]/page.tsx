import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PropertyEditForm from '@/components/admin/PropertyEditForm';
import Link from 'next/link';

async function getProperty(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Editar Propiedad</h2>
          <p className="text-gray-600 mt-1">{property.title}</p>
        </div>
        <Link
          href="/admin/propiedades"
          className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Volver</span>
        </Link>
      </div>

      {/* Form */}
      <PropertyEditForm property={property} />
    </div>
  );
}