'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  status: 'venta' | 'renta';
  bedrooms: number;
  featured: boolean;
  created_at: string;
}

export default function AdminPropertiesTable() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'venta' | 'renta'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** 🔍 FILTRO + BUSQUEDA INTELIGENTE */
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchStatus =
        filter === 'all' ? true : p.status === filter;

      const query = search.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.property_type.toLowerCase().includes(query);

      return matchStatus && matchSearch;
    });
  }, [properties, filter, search]);

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('properties').update({ featured: !current }).eq('id', id);
    fetchProperties();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return;
    await supabase.from('properties').delete().eq('id', id);
    fetchProperties();
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 mx-auto rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border">

      {/* 🔍 SEARCH + FILTER BAR */}
      <div className="p-4 border-b flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Buscar por título, zona o tipo…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex gap-2">
          {['all', 'venta', 'renta'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              {f === 'all' ? 'Todas' : f === 'venta' ? 'Venta' : 'Renta'}
            </button>
          ))}
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Propiedad</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">★</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((p) => (
                <tr key={p.id} className="group hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.location}</div>
                  </td>

                  <td className="px-6 py-4">{p.property_type}</td>

                  <td className="px-6 py-4 font-semibold">
                    ${p.price.toLocaleString('es-MX')}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${p.status === 'venta'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button onClick={() => toggleFeatured(p.id, p.featured)}>
                      <span className={`text-xl ${p.featured ? 'text-yellow-500' : 'text-gray-300'}`}>
                        ★
                      </span>
                    </button>
                  </td>

                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition space-x-3">
                    <Link href={`/propiedades/${p.id}`} target="_blank" className="text-blue-600">
                      Ver
                    </Link>
                    <Link href={`/admin/propiedades/${p.id}`} className="text-green-600">
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(p.id, p.title)} className="text-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No se encontraron propiedades
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
