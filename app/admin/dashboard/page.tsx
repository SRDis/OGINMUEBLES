// app/admin/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 ¡Dashboard!
          </h1>
          <p className="text-gray-600 mb-6">
            Has iniciado sesión exitosamente como: <strong>{user?.email}</strong>
          </p>
          
          <button
            onClick={signOut}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}