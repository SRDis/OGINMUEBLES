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
  bathrooms: number;
  area: number;
  construction_area?: number;
  featured: boolean;
  created_at: string;
  description?: string;
  comision?: number;
  register_date?: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'venta' | 'renta'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'priority'>('newest');

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
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePriority = (property: Property): { level: 'prioritario' | 'alto' | 'medio' | 'bajo', score: number } => {
    let score = 0;

    const comision = property.comision || 0;
    score += Math.min((comision / 10) * 35, 35);

    if (property.register_date) {
      const days = Math.floor((Date.now() - new Date(property.register_date).getTime()) / 86400000);
      score += days > 180 ? 25 : days > 90 ? 20 : days > 60 ? 15 : days > 30 ? 10 : 5;
    }

    const constructionArea = property.construction_area || property.area;
    const ratio = constructionArea / property.area;
    score += Math.min(ratio * 15, 15);

    const pricePerM2 = property.price / constructionArea;
    score += Math.min(Math.max((35000 / pricePerM2) * 7.5, 0), 15);

    const comisionAmount = property.price * (comision / 100);
    score += Math.min((comisionAmount / 150000) * 10, 10);

    let level: any = 'bajo';
    if (score >= 75) level = 'prioritario';
    else if (score >= 55) level = 'alto';
    else if (score >= 35) level = 'medio';

    return { level, score: Math.round(score) };
  };

  const getPriorityStyles = (level: string) => ({
    prioritario: 'bg-red-100 text-red-800 border-red-300',
    alto: 'bg-orange-100 text-orange-800 border-orange-300',
    medio: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    bajo: 'bg-gray-100 text-gray-600 border-gray-300'
  }[level]);

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        `${p.title} ${p.location} ${p.property_type} ${p.description || ''}`
          .toLowerCase()
          .includes(s)
      );
    }

    if (statusFilter !== 'all') filtered = filtered.filter(p => p.status === statusFilter);
    if (typeFilter !== 'all') filtered = filtered.filter(p => p.property_type === typeFilter);
    if (priceRange !== 'all') {
      filtered = filtered.filter(p =>
        priceRange === 'low' ? p.price < 2000000 :
        priceRange === 'mid' ? p.price <= 5000000 :
        p.price > 5000000
      );
    }

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'priority') filtered.sort((a, b) => calculatePriority(b).score - calculatePriority(a).score);

    return filtered;
  }, [properties, searchTerm, statusFilter, typeFilter, priceRange, sortBy]);

  const propertyTypes = [...new Set(properties.map(p => p.property_type))];

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#22AADE] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Propiedades</h1>
          <p className="text-sm text-gray-500">
            {filteredProperties.length} visibles · {properties.length} totales
          </p>
        </div>

        <Link
          href="/admin/propiedades/nueva"
          className="bg-[#22AADE] hover:bg-[#1a8bb5] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm"
        >
          + Nueva propiedad
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border p-4 space-y-4">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Buscar por ubicación, tipo, palabras clave o descripción…"
          className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#22AADE] focus:outline-none"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="all" className='to-zinc-900' >Estado</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>

          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="all">Tipo</option>
            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select value={priceRange} onChange={e => setPriceRange(e.target.value as any)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="all">Precio</option>
            <option value="low">Menos de $2M</option>
            <option value="mid">$2M – $5M</option>
            <option value="high">Más de $5M</option>
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="newest">Más recientes</option>
            <option value="priority">Mayor prioridad</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Propiedad</th>
              <th className="px-4 py-3 text-left">Detalles</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3 text-center">Prioridad</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredProperties.map(p => {
              const pr = calculatePriority(p);
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.location}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-gray-800">{p.property_type}</div>
                    <div className="text-xs text-gray-500">
                      {p.bedrooms} rec · {p.bathrooms} baños · {p.area} m²
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right font-semibold">
                    ${p.price.toLocaleString('es-MX')}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === 'venta'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityStyles(pr.level)}`}>
                      {pr.level.toUpperCase()} · {pr.score}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right space-x-3">
                    <Link href={`/propiedades/${p.id}`} className="text-[#22AADE] font-medium">
                      Ver
                    </Link>
                    <Link href={`/admin/propiedades/${p.id}`} className="text-green-600 font-medium">
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
