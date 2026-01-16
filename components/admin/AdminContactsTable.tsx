'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Contact {
  id: string;
  property_id: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'closed';
  created_at: string;
}

interface Property {
  id: string;
  title: string;
}

export default function AdminContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [properties, setProperties] = useState<Record<string, Property>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'closed'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      
      // Fetch contacts
      let query = supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data: contactsData, error: contactsError } = await query;
      if (contactsError) throw contactsError;

      setContacts(contactsData || []);

      // Fetch properties for property_id references
      const propertyIds = [...new Set(contactsData?.map(c => c.property_id).filter(Boolean))];
      if (propertyIds.length > 0) {
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('id, title')
          .in('id', propertyIds);

        if (propertiesError) throw propertiesError;

        const propertiesMap: Record<string, Property> = {};
        propertiesData?.forEach(prop => {
          propertiesMap[prop.id] = prop;
        });
        setProperties(propertiesMap);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'closed') => {
    try {
      const { error } = await supabase
        .from('contact_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al actualizar el estado');
    }
  };

  const deleteContact = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el contacto de "${name}"?`)) return;

    try {
      const { error } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Contacto eliminado exitosamente');
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error al eliminar el contacto');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        {/* Filters */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({contacts.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('contacted')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'contacted'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Contactados
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === 'closed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cerrados
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propiedad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Ver mensaje
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800 block">
                          {contact.email}
                        </a>
                        <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-gray-900 block">
                          {contact.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {contact.property_id ? (
                        <Link
                          href={`/propiedades/${contact.property_id}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {properties[contact.property_id]?.title || 'Ver propiedad'}
                        </Link>
                      ) : (
                        <span className="text-gray-500">Consulta general</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(contact.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                          contact.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : contact.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="contacted">Contactado</option>
                        <option value="closed">Cerrado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => deleteContact(contact.id, contact.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No hay contactos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for message details */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Detalles del Mensaje</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Nombre</label>
                <p className="text-gray-900 font-medium">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:text-blue-800">
                    {selectedContact.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Teléfono</label>
                <p className="text-gray-900">
                  <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:text-blue-800">
                    {selectedContact.phone}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Fecha</label>
                <p className="text-gray-900">{formatDate(selectedContact.created_at)}</p>
              </div>
              {selectedContact.property_id && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Propiedad de Interés</label>
                  <p className="text-gray-900">
                    <Link
                      href={`/propiedades/${selectedContact.property_id}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {properties[selectedContact.property_id]?.title || 'Ver propiedad'}
                    </Link>
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Mensaje</label>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {selectedContact.message}
                </p>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cerrar
              </button>
              <a
                href={`mailto:${selectedContact.email}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Responder por Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}