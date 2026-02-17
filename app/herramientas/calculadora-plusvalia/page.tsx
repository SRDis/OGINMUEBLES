'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   DATOS DE MERCADO — ESTADO DE MÉXICO / VALLE DE BRAVO
   ───────────────────────────────────────────────────────────── */

type ZonaData = {
  name: string;
  precioM2Min: number;
  precioM2Max: number;
  plusvaliaAnual: number; // porcentaje promedio anual
  desc: string;
};

const zonas: Record<string, ZonaData> = {
  'valle-bravo-premium': {
    name: 'Valle de Bravo — Zona Premium (La Peña, Avándaro Centro, Vista al Lago)',
    precioM2Min: 18000,
    precioM2Max: 45000,
    plusvaliaAnual: 8.5,
    desc: 'Zonas más exclusivas con vista al lago, cercanía a club de golf, marinas y servicios premium. Alta demanda de compradores de alto poder adquisitivo.',
  },
  'valle-bravo-residencial': {
    name: 'Valle de Bravo — Residencial (Avándaro, El Santuario)',
    precioM2Min: 12000,
    precioM2Max: 25000,
    plusvaliaAnual: 7.2,
    desc: 'Fraccionamientos residenciales establecidos con servicios completos y seguridad.',
  },
  'valle-bravo-centro': {
    name: 'Valle de Bravo — Centro Histórico',
    precioM2Min: 10000,
    precioM2Max: 22000,
    plusvaliaAnual: 6.8,
    desc: 'Zona colonial con alto valor turístico, comercios y restaurantes.',
  },
  'valle-bravo-periferia': {
    name: 'Valle de Bravo — Periferia y Comunidades',
    precioM2Min: 3000,
    precioM2Max: 10000,
    plusvaliaAnual: 5.5,
    desc: 'Terrenos en comunidades aledañas, zonas de crecimiento con potencial.',
  },
  'metepec': {
    name: 'Metepec',
    precioM2Min: 12000,
    precioM2Max: 30000,
    plusvaliaAnual: 7.0,
    desc: 'Zona residencial consolidada con alta demanda, cercana a Toluca.',
  },
  'toluca-centro': {
    name: 'Toluca — Centro y Zonas Consolidadas',
    precioM2Min: 8000,
    precioM2Max: 20000,
    plusvaliaAnual: 5.8,
    desc: 'Capital del estado, zona comercial y de servicios con infraestructura desarrollada.',
  },
  'lerma-ocoyoacac': {
    name: 'Lerma / Ocoyoacac / San Mateo Atenco',
    precioM2Min: 6000,
    precioM2Max: 16000,
    plusvaliaAnual: 6.5,
    desc: 'Corredor industrial y residencial con crecimiento acelerado por cercanía a CDMX.',
  },
  'huixquilucan-interlomas': {
    name: 'Huixquilucan / Interlomas',
    precioM2Min: 25000,
    precioM2Max: 55000,
    plusvaliaAnual: 6.0,
    desc: 'Zona residencial de lujo, desarrollo vertical y comercial de alta gama.',
  },
  'naucalpan-satmex': {
    name: 'Naucalpan / Satélite / Lomas Verdes',
    precioM2Min: 14000,
    precioM2Max: 32000,
    plusvaliaAnual: 5.2,
    desc: 'Zonas residenciales consolidadas con acceso a servicios y vías rápidas.',
  },
  'atizapan-nicolasmx': {
    name: 'Atizapán / Nicolás Romero / Zona Norte',
    precioM2Min: 5000,
    precioM2Max: 14000,
    plusvaliaAnual: 5.8,
    desc: 'Zonas en crecimiento, opciones de inversión accesibles con plusvalía en ascenso.',
  },
  'ecatepec-tecamac': {
    name: 'Ecatepec / Tecámac / Zona Oriente',
    precioM2Min: 4000,
    precioM2Max: 12000,
    plusvaliaAnual: 4.5,
    desc: 'Alta densidad poblacional, vivienda de interés social a medio, buena conectividad.',
  },
  'ixtapan-tonatico': {
    name: 'Ixtapan de la Sal / Tonatico',
    precioM2Min: 4000,
    precioM2Max: 12000,
    plusvaliaAnual: 5.0,
    desc: 'Zona turística con aguas termales, potencial vacacional y de retiro.',
  },
  'malinalco': {
    name: 'Malinalco',
    precioM2Min: 6000,
    precioM2Max: 18000,
    plusvaliaAnual: 6.5,
    desc: 'Pueblo mágico con desarrollo residencial campestre de alta plusvalía.',
  },
  'zona-metropolitana-toluca': {
    name: 'Zona Metropolitana Toluca (San Mateo, Metepec, Zinacantepec)',
    precioM2Min: 10000,
    precioM2Max: 28000,
    plusvaliaAnual: 6.8,
    desc: 'Corredor de alta demanda residencial y comercial, excelente conectividad y servicios.',
  },
  'santa-fe-cuajimalpa': {
    name: 'Santa Fe / Cuajimalpa (límite CDMX-EdoMex)',
    precioM2Min: 30000,
    precioM2Max: 70000,
    plusvaliaAnual: 5.5,
    desc: 'Zona de lujo con desarrollo vertical, corporativos y alta plusvalía consolidada.',
  },
  'tlalnepantla-atizapan': {
    name: 'Tlalnepantla / Atizapán de Zaragoza',
    precioM2Min: 8000,
    precioM2Max: 22000,
    plusvaliaAnual: 5.5,
    desc: 'Zona residencial consolidada con buena infraestructura y acceso a CDMX.',
  },
  'coacalco-tultitlan': {
    name: 'Coacalco / Tultitlán / Cuautitlán',
    precioM2Min: 4500,
    precioM2Max: 13000,
    plusvaliaAnual: 5.0,
    desc: 'Zona en crecimiento con vivienda media y acceso a corredores industriales.',
  },
  'texcoco-chimalhuacan': {
    name: 'Texcoco / Chimalhuacán / Nezahualcóyotl',
    precioM2Min: 5000,
    precioM2Max: 15000,
    plusvaliaAnual: 4.8,
    desc: 'Zona oriente con alta densidad, vivienda de interés social a medio, en proceso de consolidación.',
  },
  'zona-sur-valle-bravo': {
    name: 'Zona Sur Valle de Bravo (Comunidades aledañas, terrenos campestres)',
    precioM2Min: 2500,
    precioM2Max: 8000,
    plusvaliaAnual: 6.0,
    desc: 'Terrenos en comunidades aledañas a Valle de Bravo, ideal para desarrollo campestre y segunda residencia.',
  },
};

const tiposPropiedad = [
  { value: 'casa', label: 'Casa Habitación', factor: 1.0 },
  { value: 'departamento', label: 'Departamento', factor: 0.95 },
  { value: 'terreno', label: 'Terreno / Lote', factor: 0.7 },
  { value: 'comercial', label: 'Local Comercial', factor: 1.1 },
  { value: 'oficina', label: 'Oficina', factor: 1.05 },
  { value: 'bodega', label: 'Bodega / Industrial', factor: 0.65 },
];

const estadoFisico = [
  { value: 'excelente', label: 'Excelente — Recién construido o remodelado', factor: 1.15 },
  { value: 'bueno', label: 'Bueno — Bien mantenido', factor: 1.0 },
  { value: 'regular', label: 'Regular — Necesita mejoras menores', factor: 0.85 },
  { value: 'malo', label: 'Malo — Requiere remodelación', factor: 0.65 },
];

const amenidadesDisponibles = [
  { id: 'vista', label: 'Vista panorámica / al lago / montaña', factor: 1.15 },
  { id: 'alberca', label: 'Alberca privada o comunitaria', factor: 1.10 },
  { id: 'acabados', label: 'Acabados de lujo (mármol, granito, porcelanato)', factor: 1.12 },
  { id: 'seguridad', label: 'Seguridad 24/7 / Caseta de vigilancia', factor: 1.08 },
  { id: 'jardin', label: 'Jardín amplio y bien diseñado', factor: 1.06 },
  { id: 'estacionamiento', label: 'Estacionamiento techado (2+ espacios)', factor: 1.05 },
  { id: 'areas_comunes', label: 'Áreas comunes / Club house / Gimnasio', factor: 1.07 },
  { id: 'terraza', label: 'Terraza / Roof garden / Área de asador', factor: 1.06 },
  { id: 'paneles_solares', label: 'Paneles solares / Energía alternativa', factor: 1.08 },
  { id: 'domotica', label: 'Domótica / Casa inteligente', factor: 1.05 },
  { id: 'cocina_equipada', label: 'Cocina completamente equipada (alta gama)', factor: 1.04 },
  { id: 'bodega', label: 'Bodega / Cuarto de servicio amplio', factor: 1.03 },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTE
   ───────────────────────────────────────────────────────────── */

export default function CalculadoraPlusvaliaPage() {
  const [zona, setZona] = useState('');
  const [tipo, setTipo] = useState('casa');
  const [metros, setMetros] = useState('');
  const [estado, setEstado] = useState('bueno');
  const [antiguedad, setAntiguedad] = useState('');
  const [amenidades, setAmenidades] = useState<string[]>([]);
  const [proyeccion, setProyeccion] = useState(5);
  const [ubicacionEspecifica, setUbicacionEspecifica] = useState('');
  const [cercaniaServicios, setCercaniaServicios] = useState('buena');
  const [resultado, setResultado] = useState<{
    valorActualMin: number;
    valorActualMax: number;
    valorEstimado: number;
    plusvaliaProyectada: number;
    valorFuturo: number;
    plusvaliaAnual: number;
    precioM2: number;
    factoresAplicados: string[];
  } | null>(null);

  const toggleAmenidad = (id: string) => {
    setAmenidades((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calcular = () => {
    if (!zona || !metros) return;

    const zonaData = zonas[zona];
    const tipoData = tiposPropiedad.find((t) => t.value === tipo)!;
    const estadoData = estadoFisico.find((e) => e.value === estado)!;
    const m2 = parseFloat(metros);
    const years = parseInt(antiguedad) || 0;

    // Precio base por m² (promedio ponderado)
    const precioBase = (zonaData.precioM2Min + zonaData.precioM2Max) / 2;

    // Factor de tipo de propiedad
    let precioAjustado = precioBase * tipoData.factor;

    // Factor de estado físico
    precioAjustado *= estadoData.factor;

    // Factor de antigüedad (depreciación 1% por año, máx 25%)
    const depreciacion = Math.min(years * 0.01, 0.25);
    if (tipo !== 'terreno') {
      precioAjustado *= (1 - depreciacion);
    }

    // Factor de amenidades
    const factoresAplicados: string[] = [];
    amenidades.forEach((amenId) => {
      const amen = amenidadesDisponibles.find((a) => a.id === amenId);
      if (amen) {
        precioAjustado *= amen.factor;
        factoresAplicados.push(amen.label);
      }
    });

    // Factor de cercanía a servicios
    const factorServicios = cercaniaServicios === 'excelente' ? 1.08 : 
                           cercaniaServicios === 'buena' ? 1.04 : 
                           cercaniaServicios === 'regular' ? 0.98 : 0.95;
    precioAjustado *= factorServicios;
    if (cercaniaServicios === 'excelente' || cercaniaServicios === 'buena') {
      factoresAplicados.push(`Cercanía a servicios: ${cercaniaServicios}`);
    }

    // Factor de ubicación específica (si es premium dentro de la zona)
    if (ubicacionEspecifica === 'premium') {
      precioAjustado *= 1.12;
      factoresAplicados.push('Ubicación premium dentro de la zona');
    } else if (ubicacionEspecifica === 'regular') {
      precioAjustado *= 0.95;
    }

    const valorActualMin = zonaData.precioM2Min * m2 * tipoData.factor * estadoData.factor * factorServicios;
    const valorActualMax = zonaData.precioM2Max * m2 * tipoData.factor * estadoData.factor * factorServicios;
    const valorEstimado = precioAjustado * m2;

    // Plusvalía proyectada
    const plusvaliaAnual = zonaData.plusvaliaAnual;
    const valorFuturo = valorEstimado * Math.pow(1 + plusvaliaAnual / 100, proyeccion);
    const plusvaliaProyectada = valorFuturo - valorEstimado;

    setResultado({
      valorActualMin,
      valorActualMax,
      valorEstimado,
      plusvaliaProyectada,
      valorFuturo,
      plusvaliaAnual,
      precioM2: precioAjustado,
      factoresAplicados,
    });
  };

  const formatMoney = (n: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">

      {/* HERO */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-xs text-gray-500 px-4">
              <Link href="/herramientas" className="hover:text-[#22AADE] transition-colors touch-manipulation">Herramientas</Link>
              <span>/</span>
              <span className="text-gray-400">Calculadora de Plusvalía</span>
            </div>

            <span className="inline-block py-1.5 px-3 sm:px-4 border border-[#22AADE]/30 rounded-full bg-[#22AADE]/10 text-[#22AADE] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-6 sm:mb-8">
              Estado de México · Mercado Mexicano
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter leading-[0.95] mb-6 sm:mb-8 px-4">
              Calculadora de{' '}
              <span className="font-bold italic text-[#22AADE]">Plusvalía</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Estima el valor actual de tu propiedad y proyecta su plusvalía a futuro,
              basado en datos del mercado inmobiliario del <strong className="text-white">Estado de México</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* FORMULARIO */}
            <div className="lg:col-span-2 space-y-8">

              {/* Zona */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">1. Ubicación</h3>
                <p className="text-gray-500 text-xs mb-6">Selecciona la zona más cercana a tu propiedad</p>

                <select
                  value={zona}
                  onChange={(e) => setZona(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#22AADE] transition-colors appearance-none"
                >
                  <option value="">Seleccionar zona...</option>
                  {Object.entries(zonas).map(([key, z]) => (
                    <option key={key} value={key}>{z.name}</option>
                  ))}
                </select>

                {zona && (
                  <div className="mt-4 p-4 bg-[#22AADE]/5 border border-[#22AADE]/20 rounded-lg">
                    <p className="text-sm text-gray-300 font-light">{zonas[zona].desc}</p>
                    <div className="flex gap-6 mt-3">
                      <span className="text-[10px] text-[#22AADE] uppercase tracking-wider">
                        Rango: {formatMoney(zonas[zona].precioM2Min)} — {formatMoney(zonas[zona].precioM2Max)} /m²
                      </span>
                      <span className="text-[10px] text-[#22AADE] uppercase tracking-wider">
                        Plusvalía anual: ~{zonas[zona].plusvaliaAnual}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tipo y metros */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">2. Características</h3>
                <p className="text-gray-500 text-xs mb-6">Tipo de propiedad y superficie</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Tipo de propiedad
                    </label>
                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#22AADE] transition-colors appearance-none"
                    >
                      {tiposPropiedad.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Superficie (m²)
                    </label>
                    <input
                      type="number"
                      value={metros}
                      onChange={(e) => setMetros(e.target.value)}
                      placeholder="Ej: 250"
                      min="1"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Estado físico
                    </label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#22AADE] transition-colors appearance-none"
                    >
                      {estadoFisico.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Antigüedad (años)
                    </label>
                    <input
                      type="number"
                      value={antiguedad}
                      onChange={(e) => setAntiguedad(e.target.value)}
                      placeholder="Ej: 5"
                      min="0"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#22AADE] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Amenidades */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">3. Amenidades</h3>
                <p className="text-gray-500 text-xs mb-6">Selecciona las que apliquen a tu propiedad</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenidadesDisponibles.map((amen) => (
                    <label
                      key={amen.id}
                      onClick={() => toggleAmenidad(amen.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        amenidades.includes(amen.id)
                          ? 'bg-[#22AADE]/5 border border-[#22AADE]/20'
                          : 'bg-white/[0.02] border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenidades.includes(amen.id)}
                        onChange={() => toggleAmenidad(amen.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        amenidades.includes(amen.id)
                          ? 'bg-[#22AADE] border-[#22AADE]'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}>
                        {amenidades.includes(amen.id) && (
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-400 font-light flex-grow">{amen.label}</span>
                      <span className="text-[9px] text-[#22AADE] ml-auto font-bold">+{Math.round((amen.factor - 1) * 100)}%</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ubicación y servicios */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">4. Ubicación Específica</h3>
                <p className="text-gray-500 text-xs mb-6">Detalles adicionales sobre la ubicación dentro de la zona</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Tipo de ubicación
                    </label>
                    <select
                      value={ubicacionEspecifica}
                      onChange={(e) => setUbicacionEspecifica(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#22AADE] transition-colors appearance-none"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="premium">Premium (mejor ubicación de la zona)</option>
                      <option value="buena">Buena (ubicación estándar)</option>
                      <option value="regular">Regular (ubicación menos privilegiada)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                      Cercanía a servicios
                    </label>
                    <select
                      value={cercaniaServicios}
                      onChange={(e) => setCercaniaServicios(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#22AADE] transition-colors appearance-none"
                    >
                      <option value="excelente">Excelente (a menos de 500m de todo)</option>
                      <option value="buena">Buena (a menos de 1km de servicios principales)</option>
                      <option value="regular">Regular (a 1-3km de servicios)</option>
                      <option value="lejana">Lejana (más de 3km de servicios)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Proyección */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">5. Proyección</h3>
                <p className="text-gray-500 text-xs mb-6">¿A cuántos años quieres proyectar la plusvalía?</p>

                <div className="space-y-4">
                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={proyeccion}
                      onChange={(e) => setProyeccion(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#22AADE] slider"
                      style={{
                        background: `linear-gradient(to right, #22AADE 0%, #22AADE ${((proyeccion - 1) / 19) * 100}%, #1a1a1a ${((proyeccion - 1) / 19) * 100}%, #1a1a1a 100%)`
                      }}
                    />
                    <style jsx>{`
                      .slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #22AADE;
                        cursor: pointer;
                        border: 2px solid #050505;
                        box-shadow: 0 0 10px rgba(34, 170, 222, 0.5);
                      }
                      .slider::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #22AADE;
                        cursor: pointer;
                        border: 2px solid #050505;
                        box-shadow: 0 0 10px rgba(34, 170, 222, 0.5);
                      }
                    `}</style>
                  </div>
                  
                  {/* Marcadores y valor */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">1 año</span>
                    <div className="flex-1 mx-4 relative">
                      <div className="absolute inset-0 flex items-center justify-between">
                        {[1, 5, 10, 15, 20].map((mark) => (
                          <div key={mark} className="flex flex-col items-center">
                            <div className={`w-1 h-4 ${proyeccion === mark ? 'bg-[#22AADE]' : 'bg-white/10'}`} />
                            <span className={`text-[9px] mt-1 ${proyeccion === mark ? 'text-[#22AADE] font-bold' : 'text-gray-600'}`}>
                              {mark}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">20 años</span>
                  </div>
                  
                  {/* Valor seleccionado destacado */}
                  <div className="text-center pt-4 border-t border-white/5">
                    <span className="text-2xl font-black text-[#22AADE]">{proyeccion}</span>
                    <span className="text-sm text-gray-400 ml-2">{proyeccion === 1 ? 'año' : 'años'}</span>
                  </div>
                </div>
              </div>

              {/* Botón Calcular */}
              <button
                onClick={calcular}
                disabled={!zona || !metros}
                className={`w-full py-5 rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  zona && metros
                    ? 'bg-[#22AADE] text-black hover:bg-white shadow-[0_0_30px_rgba(34,170,222,0.3)]'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
              >
                Calcular Valor y Plusvalía
              </button>
            </div>

            {/* RESULTADO */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">

                {resultado ? (
                  <>
                    {/* Valor estimado */}
                    <div className="bg-[#0a0a0a] border border-[#22AADE]/20 rounded-sm p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#22AADE] font-bold block mb-4">Valor Estimado Actual</span>
                      <p className="text-3xl md:text-4xl font-black text-white mb-2">{formatMoney(resultado.valorEstimado)}</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Rango: {formatMoney(resultado.valorActualMin)} — {formatMoney(resultado.valorActualMax)}
                      </p>
                      <div className="h-[1px] bg-white/5 mb-4" />
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Precio por m²</span>
                        <span className="text-white font-bold">{formatMoney(resultado.precioM2)}</span>
                      </div>
                    </div>

                    {/* Plusvalía */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#22AADE] font-bold block mb-4">
                        Proyección a {proyeccion} {proyeccion === 1 ? 'año' : 'años'}
                      </span>
                      <p className="text-3xl md:text-4xl font-black text-[#22AADE] mb-2">{formatMoney(resultado.valorFuturo)}</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Ganancia estimada: <span className="text-green-400 font-bold">+{formatMoney(resultado.plusvaliaProyectada)}</span>
                      </p>
                      <div className="h-[1px] bg-white/5 mb-4" />
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500">Plusvalía anual promedio</span>
                        <span className="text-[#22AADE] font-bold">{resultado.plusvaliaAnual}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Incremento total</span>
                        <span className="text-green-400 font-bold">
                          +{Math.round(((resultado.valorFuturo / resultado.valorEstimado) - 1) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Factores aplicados */}
                    {resultado && resultado.factoresAplicados && resultado.factoresAplicados.length > 0 && (
                      <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#22AADE] font-bold block mb-4">Factores de Valor Agregado</span>
                        <div className="space-y-2">
                          {resultado.factoresAplicados.map((factor, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                              <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {factor}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gráfica mejorada */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold block mb-4">Proyección de Crecimiento</span>
                      <div className="space-y-3">
                        {/* Valor actual */}
                        <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                          <span className="text-[10px] text-gray-500 w-16 text-right">Hoy</span>
                          <div className="flex-grow h-4 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                            <div
                              className="h-full bg-gradient-to-r from-[#22AADE] to-[#22AADE]/80 rounded-full"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <span className="text-[10px] text-white font-bold w-28 text-right">{formatMoney(resultado.valorEstimado)}</span>
                        </div>
                        {/* Años proyectados */}
                        {Array.from({ length: Math.min(proyeccion, 8) }, (_, i) => {
                          const year = i + 1;
                          const val = resultado.valorEstimado * Math.pow(1 + resultado.plusvaliaAnual / 100, year);
                          const maxVal = resultado.valorEstimado * Math.pow(1 + resultado.plusvaliaAnual / 100, Math.min(proyeccion, 8));
                          const incremento = val - resultado.valorEstimado;
                          const width = ((incremento) / (maxVal - resultado.valorEstimado)) * 100;
                          return (
                            <div key={year} className="flex items-center gap-3">
                              <span className="text-[10px] text-gray-500 w-16 text-right">+{year} año{year > 1 ? 's' : ''}</span>
                              <div className="flex-grow h-4 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                                <div
                                  className="h-full bg-gradient-to-r from-[#22AADE] to-[#4ade80] rounded-full transition-all duration-700"
                                  style={{ width: `${Math.max(width, 2)}%` }}
                                />
                              </div>
                              <div className="w-28 text-right">
                                <span className="text-[10px] text-white font-bold block">{formatMoney(val)}</span>
                                <span className="text-[9px] text-green-400">+{formatMoney(incremento)}</span>
                              </div>
                            </div>
                          );
                        })}
                        {/* Valor final si hay más años */}
                        {proyeccion > 8 && (
                          <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                            <span className="text-[10px] text-[#22AADE] font-bold w-16 text-right">+{proyeccion} años</span>
                            <div className="flex-grow h-4 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                              <div
                                className="h-full bg-gradient-to-r from-[#22AADE] to-[#4ade80] rounded-full"
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div className="w-28 text-right">
                              <span className="text-[10px] text-[#22AADE] font-black block">{formatMoney(resultado.valorFuturo)}</span>
                              <span className="text-[9px] text-green-400 font-bold">+{formatMoney(resultado.plusvaliaProyectada)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-sm p-5">
                      <p className="text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-2">⚠️ Aviso Importante</p>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        Esta es una estimación referencial basada en promedios del mercado. El valor real puede variar según condiciones
                        específicas del inmueble, negociación, oferta y demanda local. Para un avalúo formal, consulta a un valuador certificado.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-sm p-8 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2">Completa los datos</h3>
                    <p className="text-gray-500 text-sm font-light">
                      Selecciona zona, tipo de propiedad y superficie para obtener tu estimación de valor y plusvalía.
                    </p>
                  </div>
                )}

                <Link
                  href="/contacto"
                  className="block text-center bg-white/5 border border-white/10 py-4 rounded-sm text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#22AADE] hover:border-[#22AADE] transition-all"
                >
                  ¿Necesitas un avalúo formal? →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-[#22AADE] text-[9px] sm:text-[10px] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">Metodología</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white px-4">
              ¿Cómo <span className="font-bold">calculamos?</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: 'Datos de Mercado', desc: 'Precios por m² basados en transacciones reales y análisis del mercado inmobiliario del Estado de México.' },
              { title: 'Factores de Ajuste', desc: 'Tipo de propiedad, estado físico, antigüedad y amenidades ajustan el valor base según las condiciones reales.' },
              { title: 'Plusvalía Histórica', desc: 'Tasas de apreciación calculadas con base en tendencias del mercado local de los últimos 5 años.' },
              { title: 'Proyección Compuesta', desc: 'Interés compuesto aplicado sobre la tasa de plusvalía anual para proyectar el valor a futuro.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-10 h-10 bg-[#22AADE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#22AADE] font-black text-sm">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-gradient-to-t from-[#22AADE]/10 to-transparent blur-[80px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-white mb-4 sm:mb-6 tracking-tighter px-4">
            ¿Quieres un análisis{' '}
            <span className="font-bold italic">profesional?</span>
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-10 text-gray-400 font-light max-w-2xl mx-auto px-4">
            Esta calculadora es una referencia. Para un avalúo bancario certificado o un análisis
            comparativo de mercado personalizado, contáctanos.
          </p>
          <Link
            href="/contacto"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#22AADE] active:scale-95 transition-all duration-300 rounded-sm inline-block touch-manipulation"
            style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
          >
            Solicitar Avalúo Profesional
          </Link>
        </div>
      </section>
    </div>
  );
}
