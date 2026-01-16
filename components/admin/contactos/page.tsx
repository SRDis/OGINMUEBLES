// app/admin/propiedades/page.tsx
'use client';

import AdminPropertiesTable from '@/components/admin/AdminPropertiesTable';
import Link from 'next/link';

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Propiedades</h2>
          <p className="text-gray-600 mt-1">Gestiona todas las propiedades del sistema</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span>Nueva Propiedad</span>
        </Link>
      </div>

      <AdminPropertiesTable />
    </div>
  );
}