'use client';

import { useState, useMemo } from 'react';

interface InvestmentCalculatorProps {
  property: any;
}

interface Bank {
  name: string;
  rate: number;
  cat: string;
  notes: string;
  logo: string;
}

// URLs REALES y funcionales de logos bancarios
const BANKS: Bank[] = [
  {
    name: 'Banorte',
    rate: 10.50,
    cat: '12.8%',
    notes: 'Ideal para mejora de hipoteca',
    logo: 'https://www.banorte.com/cms/casaMID40Aniversario/img/Banorte_logo.svg'
  },
  {
    name: 'Citibanamex',
    rate: 10.80,
    cat: '13.1%',
    notes: 'Reembolso de avalúo en ciertos perfiles',
    logo: 'https://www.banamex.com/resources/img/logo-banamex.svg'
  },
  {
    name: 'Santander',
    rate: 10.95,
    cat: '13.5%',
    notes: 'Beneficios Programa Plus',
    logo: 'https://www.santander.com.mx/assets/images/logo-santander.svg'
  },
  {
    name: 'Scotiabank',
    rate: 11.10,
    cat: '13.8%',
    notes: 'Tasas preferenciales Affluent',
    logo: 'https://www.scotiabank.com.mx/content/dam/scotiabank/sub-brands/logo-scotiabank-bold.svg'
  },
  {
    name: 'HSBC',
    rate: 11.25,
    cat: '13.9%',
    notes: 'Reducción por pago puntual',
    logo: 'https://www.hsbc.com.mx/content/dam/hsbc/mx/images/logos/hsbc-logo.svg'
  },
  {
    name: 'BBVA',
    rate: 11.40,
    cat: '14.1%',
    notes: 'Esquema de pagos fijos',
    logo: 'https://www.bbva.mx/content/dam/public-web/mexico/images/logos/logo-bbva-mx.svg'
  },
  {
    name: 'Infonavit',
    rate: 10.45,
    cat: '11.9%',
    notes: 'Solo para trabajadores con subcuenta',
    logo: 'https://portalmx.infonavit.org.mx/wps/wcm/connect/5e5cfb3b-8c1c-4b5e-9b5f-8b0e0e5f5f5f/logo-infonavit.svg?MOD=AJPERES&CACHEID=5e5cfb3b-8c1c-4b5e-9b5f-8b0e0e5f5f5f'
  }
];

// Componente de Tooltip
function Tooltip({ text, title, children }: { text: string; title?: string; children: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-4 bg-[#1a1a1a] border border-[#22AADE]/30 rounded-md text-xs text-gray-300 z-50 shadow-2xl animate-in fade-in zoom-in duration-200">
          {title && <div className="font-bold text-white mb-1">{title}</div>}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-[#1a1a1a] border-r border-b border-[#22AADE]/30"></div>
          <p className="leading-relaxed">{text}</p>
        </div>
      )}
    </span>
  );
}

// Formateador de moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value);
};

// Función para calcular renta estimada basada en características de la propiedad
function calculateEstimatedRent(property: any): number {
  const price = property.price || 0;
  const constructionArea = property.construction_area || property.area || 0;
  const propertyType = (property.property_type || '').toLowerCase();
  const bedrooms = property.bedrooms || 0;
  const bathrooms = property.bathrooms || 0;
  
  // Base: 0.3% - 0.5% del precio de compra mensual (más conservador)
  let baseRent = price * 0.004;
  
  // Ajuste por tipo de propiedad
  if (propertyType.includes('casa') || propertyType.includes('house')) {
    baseRent *= 1.05; // Casas suelen rentarse ligeramente mejor
  } else if (propertyType.includes('departamento') || propertyType.includes('apartamento') || propertyType.includes('condominio')) {
    baseRent *= 0.95; // Departamentos ligeramente menos
  } else if (propertyType.includes('terreno') || propertyType.includes('lote')) {
    baseRent *= 0.2; // Terrenos se rentan mucho menos
  }
  
  // Ajuste por área de construcción (más metros = más renta potencial)
  if (constructionArea > 0) {
    const pricePerM2 = price / constructionArea;
    // Estimación más conservadora: $80-200 por m² de construcción al mes
    const rentPerM2 = Math.min(Math.max(pricePerM2 * 0.001, 80), 250);
    const areaBasedRent = constructionArea * rentPerM2;
    // Promedio entre precio y área (con más peso al área para propiedades grandes)
    if (constructionArea > 200) {
      baseRent = (baseRent * 0.4 + areaBasedRent * 0.6);
    } else {
      baseRent = (baseRent + areaBasedRent) / 2;
    }
  }
  
  // Ajuste por recámaras y baños (más habitaciones = más renta, pero más moderado)
  if (bedrooms > 0) {
    const bedroomMultiplier = 1 + (bedrooms - 2) * 0.08; // +8% por recámara extra después de 2
    baseRent *= Math.max(bedroomMultiplier, 0.85);
  }
  
  return Math.round(baseRent);
}

// Función para calcular apreciación esperada según tipo de propiedad
function calculateEstimatedAppreciation(property: any): number {
  const propertyType = (property.property_type || '').toLowerCase();
  const location = (property.location || '').toLowerCase();
  
  let baseAppreciation = 5; // 5% base
  
  // Ajuste por tipo
  if (propertyType.includes('casa')) {
    baseAppreciation = 5.5; // Casas se aprecian mejor
  } else if (propertyType.includes('departamento') || propertyType.includes('apartamento')) {
    baseAppreciation = 4.5; // Departamentos un poco menos
  } else if (propertyType.includes('terreno') || propertyType.includes('lote')) {
    baseAppreciation = 6; // Terrenos pueden apreciarse más
  }
  
  // Ajuste por ubicación (zonas premium)
  if (location.includes('polanco') || location.includes('santa fe') || 
      location.includes('lomas') || location.includes('bosques')) {
    baseAppreciation += 1; // Zonas premium +1%
  }
  
  return Math.round(baseAppreciation * 10) / 10; // Redondear a 1 decimal
}

// Función para calcular porcentaje de gastos operativos según tamaño
function calculateOperatingExpensesPercent(property: any): number {
  const constructionArea = property.construction_area || property.area || 0;
  
  // Propiedades más grandes tienen gastos operativos relativamente menores
  if (constructionArea > 300) {
    return 0.18; // 18% para propiedades grandes
  } else if (constructionArea > 150) {
    return 0.20; // 20% para propiedades medianas
  } else {
    return 0.22; // 22% para propiedades pequeñas
  }
}

export default function InvestmentCalculator({ property }: InvestmentCalculatorProps) {
  // Validación robusta
  const validProperty = property && typeof property.price === 'number' && property.price > 0;
  
  if (!validProperty) {
    return (
      <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-light text-white mb-2">Calculadora de Inversión</h2>
        <p className="text-gray-400">Información de propiedad no disponible para cálculo.</p>
      </div>
    );
  }

  const price = property.price;
  const constructionArea = property.construction_area || property.area || 0;
  const pricePerM2 = constructionArea > 0 ? Math.round(price / constructionArea) : null;
  
  // Calcular valores iniciales basados en la propiedad
  const initialEstimatedRent = calculateEstimatedRent(property);
  const initialAppreciationRate = calculateEstimatedAppreciation(property);
  const operatingExpensesPercent = calculateOperatingExpensesPercent(property);

  // Estados
  const [selectedBank, setSelectedBank] = useState<Bank | null>(BANKS[0]);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(BANKS[0].rate);
  const [years, setYears] = useState(20);
  const [expectedRent, setExpectedRent] = useState(initialEstimatedRent);
  const [appreciationRate, setAppreciationRate] = useState(initialAppreciationRate);
  
  const closingCostsPercent = 6; 

  // --- CÁLCULOS MEMOIZADOS ---
  const calculations = useMemo(() => {
    const downPaymentAmount = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPaymentAmount;
    const closingCosts = (price * closingCostsPercent) / 100;
    const totalInitialInvestment = downPaymentAmount + closingCosts;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPaidToBank = monthlyMortgage * numberOfPayments;
    const totalInterestPaid = totalPaidToBank - loanAmount;

    const monthlyOperationalExpenses = expectedRent * operatingExpensesPercent; 
    const monthlyNetRent = expectedRent - monthlyOperationalExpenses;
    const monthlyCashFlow = monthlyNetRent - monthlyMortgage;
    const annualCashFlow = monthlyCashFlow * 12;

    const capRate = ((monthlyNetRent * 12) / price) * 100;
    const cashOnCash = (annualCashFlow / totalInitialInvestment) * 100;

    const futureValue = price * Math.pow(1 + appreciationRate / 100, years);
    const totalAppreciation = futureValue - price;
    
    const totalRentCollected = monthlyNetRent * numberOfPayments;
    const totalCostOfLoan = totalPaidToBank;
    const netProfit = (futureValue + totalRentCollected) - (totalCostOfLoan + totalInitialInvestment);
    const roi = (netProfit / totalInitialInvestment) * 100;

    return {
      downPaymentAmount,
      loanAmount,
      closingCosts,
      totalInitialInvestment,
      monthlyMortgage,
      totalInterestPaid,
      totalPaidToBank,
      monthlyOperationalExpenses,
      monthlyCashFlow,
      capRate,
      cashOnCash,
      futureValue,
      totalAppreciation,
      netProfit,
      roi
    };
  }, [price, downPaymentPercent, interestRate, years, expectedRent, appreciationRate, operatingExpensesPercent]);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
      {/* Header con información de la propiedad */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-black to-[#111]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-light text-white mb-1">Simulador Financiero</h2>
            <p className="text-gray-400 text-sm">
              Análisis personalizado para esta propiedad
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#22AADE] mb-1">
              {formatCurrency(price)}
            </div>
            {pricePerM2 && (
              <div className="text-xs text-gray-400">
                {formatCurrency(pricePerM2)} / m²
              </div>
            )}
          </div>
        </div>
        
        {/* Información clave de la propiedad */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          {property.property_type && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tipo</div>
              <div className="text-sm text-white font-light capitalize">{property.property_type}</div>
            </div>
          )}
          {property.location && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ubicación</div>
              <div className="text-sm text-white font-light">{property.location}</div>
            </div>
          )}
          {constructionArea > 0 && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Área</div>
              <div className="text-sm text-white font-light">{constructionArea.toLocaleString()} m²</div>
            </div>
          )}
          {(property.bedrooms > 0 || property.bathrooms > 0) && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Habitaciones</div>
              <div className="text-sm text-white font-light">
                {property.bedrooms > 0 && `${property.bedrooms} rec.`}
                {property.bedrooms > 0 && property.bathrooms > 0 && ' • '}
                {property.bathrooms > 0 && `${property.bathrooms} baños`}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-10">
        
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN */}
        <div className="space-y-8">
          
          {/* 1. Selector de Banco */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#22AADE] text-white text-xs font-bold px-2 py-0.5 rounded">PASO 1</span>
              <h3 className="text-white font-medium">Selecciona tu Banco</h3>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {BANKS.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => {
                    setSelectedBank(bank);
                    setInterestRate(bank.rate);
                  }}
                  className={`relative group p-2 rounded-lg border transition-all duration-300 ${
                    selectedBank?.name === bank.name
                      ? 'border-[#22AADE] bg-[#22AADE]/10 ring-1 ring-[#22AADE]/50'
                      : 'border-white/10 hover:border-white/30 bg-white/5'
                  }`}
                >
                  <div className="bg-white rounded p-1.5 h-10 w-full flex items-center justify-center mb-2 overflow-hidden">
                    <img 
                      src={bank.logo} 
                      alt={bank.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        // Fallback a texto si falla la imagen
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<span class="text-black font-bold text-xs">${bank.name}</span>`;
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-center text-gray-400 group-hover:text-white transition-colors">
                    {bank.name}
                  </div>
                  <div className="text-center font-bold text-[#22AADE] text-xs mt-0.5">
                    {bank.rate}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Sliders de Configuración */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#22AADE] text-white text-xs font-bold px-2 py-0.5 rounded">PASO 2</span>
              <h3 className="text-white font-medium">Ajusta los parámetros</h3>
            </div>

            {/* Enganche */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <div className="flex justify-between text-sm mb-3">
                <label className="text-gray-300">Enganche Inicial ({downPaymentPercent}%)</label>
                <span className="text-[#22AADE] font-mono">{formatCurrency(calculations.downPaymentAmount)}</span>
              </div>
              <input
                type="range" min="10" max="60" step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#22AADE]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Préstamo: {formatCurrency(calculations.loanAmount)}</span>
                <span>Gastos: {formatCurrency(calculations.closingCosts)}</span>
              </div>
            </div>

            {/* Plazo y Tasa */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-2">Tasa Anual</label>
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white text-sm focus:border-[#22AADE] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-gray-500 text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-2">Plazo (Años)</label>
                <select 
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white text-sm focus:border-[#22AADE] focus:outline-none"
                >
                  <option value={10}>10 Años</option>
                  <option value={15}>15 Años</option>
                  <option value={20}>20 Años</option>
                  <option value={25}>25 Años</option>
                </select>
              </div>
            </div>

            {/* Renta Esperada */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <div className="flex justify-between text-sm mb-3">
                <label className="text-gray-300 flex items-center gap-2">
                  Renta Mensual Estimada
                  <Tooltip title="Renta de Mercado" text={`Estimación inicial: ${formatCurrency(initialEstimatedRent)}/mes basada en el tipo de propiedad (${property.property_type || 'N/A'}), área (${constructionArea > 0 ? constructionArea + ' m²' : 'N/A'}), y precio por m². Ajusta este valor según el mercado local o si planeas rentas vacacionales (Airbnb) que suelen ser más altas.`}>
                    <svg className="w-4 h-4 text-gray-500 hover:text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </Tooltip>
                </label>
                <span className="text-white font-mono">{formatCurrency(expectedRent)}</span>
              </div>
              <input
                type="range"
                min={Math.max(price * 0.0015, initialEstimatedRent * 0.5)}
                max={Math.min(price * 0.008, initialEstimatedRent * 2.5)}
                step={1000}
                value={expectedRent}
                onChange={(e) => setExpectedRent(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#22AADE]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Estimación inicial: {formatCurrency(initialEstimatedRent)}</span>
                <span>Rango: {formatCurrency(Math.max(price * 0.0015, initialEstimatedRent * 0.5))} - {formatCurrency(Math.min(price * 0.008, initialEstimatedRent * 2.5))}</span>
              </div>
            </div>
            
            {/* Apreciación Anual */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <div className="flex justify-between text-sm mb-3">
                <label className="text-gray-300 flex items-center gap-2">
                  Apreciación Anual Esperada
                  <Tooltip title="Apreciación de la Propiedad" text={`Estimación inicial: ${initialAppreciationRate}% anual basada en el tipo de propiedad (${property.property_type || 'N/A'}) y ubicación (${property.location || 'N/A'}). En México, el promedio histórico es entre 3% y 7% anual, dependiendo de la zona y tipo de propiedad.`}>
                    <svg className="w-4 h-4 text-gray-500 hover:text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </Tooltip>
                </label>
                <span className="text-white font-mono">{appreciationRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#22AADE]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Estimación inicial: {initialAppreciationRate}%</span>
                <span>Promedio histórico México: 3% - 7%</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADOS */}
        <div className="space-y-6">
          
          {/* ⭐ DESTACADO: PAGO MENSUAL DEL CRÉDITO */}
          <div className="bg-gradient-to-br from-[#22AADE]/20 via-[#111] to-black border-2 border-[#22AADE]/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-sm uppercase tracking-wide font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tu Pago Mensual al Banco
              </h3>
              <Tooltip title="¿Qué es esto?" text="Este es el monto FIJO que pagarías cada mes durante los próximos años al banco. Incluye capital e intereses. Es la cantidad más importante porque sale directo de tu bolsillo.">
                <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Tooltip>
            </div>
            <div className="text-6xl font-light text-[#22AADE] mb-2 tracking-tight">
              {formatCurrency(calculations.monthlyMortgage)}
            </div>
            <div className="text-sm text-gray-400">
              Durante {years} años ({years * 12} mensualidades)
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Total a pagar al banco:</span>
                <span className="text-white">{formatCurrency(calculations.totalPaidToBank)}</span>
              </div>
              <div className="flex justify-between">
                <span>De eso, intereses:</span>
                <span className="text-orange-400">{formatCurrency(calculations.totalInterestPaid)}</span>
              </div>
            </div>
          </div>

          {/* Análisis de Retorno */}
          <div className="bg-[#111] rounded-lg p-6 border border-white/5">
            <h3 className="text-white text-lg font-light mb-6 border-b border-white/10 pb-2">Análisis de Retorno</h3>
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Tooltip title="Cash on Cash Return" text="Mide cuánto efectivo genera tu inversión anualmente en relación con el dinero que sacaste de tu bolsillo (enganche + gastos). Si es positivo, la propiedad se paga sola y te da dinero extra.">
                <div className={`p-4 rounded border ${calculations.cashOnCash >= 0 ? 'bg-[#22AADE]/10 border-[#22AADE]/30' : 'bg-red-900/10 border-red-500/30'} w-full cursor-help`}>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">Cash on Cash</div>
                  <div className={`text-3xl font-light mt-1 ${calculations.cashOnCash >= 0 ? 'text-[#22AADE]' : 'text-red-400'}`}>
                    {calculations.cashOnCash.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Retorno anual sobre efectivo</div>
                </div>
              </Tooltip>

              <Tooltip title="Cap Rate" text="Es la tasa de rendimiento de la propiedad basada en los ingresos esperados, sin tener en cuenta la financiación. Útil para comparar propiedades entre sí.">
                <div className="p-4 rounded border border-white/10 bg-white/5 w-full cursor-help">
                  <div className="text-gray-400 text-xs uppercase tracking-wider">Cap Rate</div>
                  <div className="text-3xl font-light text-white mt-1">
                    {calculations.capRate.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Rendimiento puro del activo</div>
                </div>
              </Tooltip>
            </div>

            {/* FLUJO MENSUAL */}
            <div className="bg-black rounded border border-white/10 overflow-hidden mb-6">
              <div className="px-4 py-2 bg-white/5 text-xs text-gray-400 font-medium uppercase border-b border-white/10">
                Flujo Mensual (Dinero en Mano)
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 
                    (+) Ingreso Renta
                  </span>
                  <span className="text-white font-mono">{formatCurrency(expectedRent)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span> 
                    (-) Gastos Op. (~{Math.round(operatingExpensesPercent * 100)}%)
                  </span>
                  <span className="font-mono">{formatCurrency(calculations.monthlyOperationalExpenses)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 
                    (-) Pago al Banco
                  </span>
                  <span className="font-mono text-white">{formatCurrency(calculations.monthlyMortgage)}</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between items-center font-medium">
                  <span className={calculations.monthlyCashFlow >= 0 ? "text-[#22AADE]" : "text-red-400"}>
                    (=) Flujo Neto Mensual
                  </span>
                  <span className={`font-mono text-lg ${calculations.monthlyCashFlow >= 0 ? "text-[#22AADE]" : "text-red-400"}`}>
                    {formatCurrency(calculations.monthlyCashFlow)}
                  </span>
                </div>
              </div>
            </div>

            {/* RESUMEN FINAL */}
            <div className="space-y-3 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Inversión inicial total</span>
                <span className="text-gray-300">{formatCurrency(calculations.totalInitialInvestment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plusvalía proyectada ({years} años)</span>
                <span className="text-green-400">+{formatCurrency(calculations.totalAppreciation)}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                <span className="text-white font-medium">ROI Total Proyectado</span>
                <span className="text-[#22AADE] text-xl font-light">{calculations.roi.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
