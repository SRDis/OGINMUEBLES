import PropertyListFiltered from '@/components/property/PropertyListFiltered'
export const metadata = {
  title: 'Propiedades en Venta | RealEstate',
  description: 'Encuentra casas y departamentos en venta. Las mejores opciones para comprar tu próxima propiedad.',
};

export default function VentaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold">
              Propiedades en Venta
            </h1>
          </div>
          <p className="text-blue-100 text-lg">
            Invierte en tu futuro. Encuentra la propiedad perfecta para comprar.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyListFiltered status="venta" />
      </div>
    </div>
  );
}