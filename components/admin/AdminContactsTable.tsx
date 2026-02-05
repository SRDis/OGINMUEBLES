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

  // Helper para generar link de WhatsApp limpio
  const getWhatsAppUrl = (phone: string) => {
    // Elimina todo lo que no sea número
    const cleanPhone = phone.replace(/\D/g, ''); 
    return `https://wa.me/${cleanPhone}`;
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
        {/* Filtros */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'contacted', 'closed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? `Todos (${contacts.length})` : f}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones de Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propiedad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
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
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          Ver mensaje
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        {/* Email Row */}
                        <div className="flex items-center justify-between group">
                          <span className="text-sm text-gray-600 truncate max-w-[150px]">{contact.email}</span>
                          <a 
                            href={`mailto:${contact.email}`} 
                            className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                            title="Enviar correo"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                          </a>
                        </div>
                        {/* Phone Row */}
                        <div className="flex items-center justify-between group">
                          <span className="text-sm text-gray-600">{contact.phone}</span>
                          <a 
                            href={getWhatsAppUrl(contact.phone)} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-green-100 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                            title="Enviar WhatsApp"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.082.899 2.503.719 2.949.676.446-.043 1.436-.587 1.639-1.153.204-.566.204-1.05.143-1.154z"/></svg>
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {contact.property_id ? (
                        <Link
                          href={`/propiedades/${contact.property_id}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                          {properties[contact.property_id]?.title || 'Ver propiedad'}
                        </Link>
                      ) : (
                        <span className="text-gray-500 italic">Consulta general</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(contact.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${
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
                        title="Eliminar contacto"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

      {/* Modal Detalles */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all">
            <div className="p-6 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
              <h3 className="text-xl font-bold text-gray-900">Mensaje de {selectedContact.name}</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <p className="text-gray-900 mt-1">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Teléfono</label>
                  <p className="text-gray-900 mt-1">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</label>
                  <p className="text-gray-900 mt-1">{formatDate(selectedContact.created_at)}</p>
                </div>
                {selectedContact.property_id && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Interés en</label>
                    <p className="text-blue-600 font-medium mt-1 truncate">
                      {properties[selectedContact.property_id]?.title || 'Ver propiedad'}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Mensaje del cliente</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-lg flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-white transition-colors font-medium"
              >
                Cerrar
              </button>
              
              <a
                href={getWhatsAppUrl(selectedContact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.082.899 2.503.719 2.949.676.446-.043 1.436-.587 1.639-1.153.204-.566.204-1.05.143-1.154z"/></svg>
                WhatsApp
              </a>

              <a
                href={`mailto:${selectedContact.email}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Responder Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}