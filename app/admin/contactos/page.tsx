import AdminContactsTable from '@/components/admin/AdminContactsTable';

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Contactos</h2>
        <p className="text-gray-600 mt-1">Administra las solicitudes de información de los clientes</p>
      </div>

      {/* Table */}
      <AdminContactsTable />
    </div>
  );
}