// app/admin/propiedades/nueva/page.tsx
'use client';

import PropertyForm from '@/components/admin/PropertyForm';
import Link from 'next/link';

export default function NewPropertyPage() {
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
          <h2 className="text-2xl font-bold text-gray-900">Nueva Propiedad</h2>
          <p className="text-gray-600 mt-1">Completa el formulario para agregar una nueva propiedad</p>
        </div>
      </div>

      <PropertyForm />
    </div>
  );
}