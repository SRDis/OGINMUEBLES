import PropertyListFiltered from '@/components/property/PropertyListFiltered';

export const metadata = {
  title: 'Propiedades en Renta | RealEstate',
  description: 'Encuentra casas y departamentos en renta. Las mejores opciones de arrendamiento disponibles.',
};

export default function RentaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold">
              Propiedades en Renta
            </h1>
          </div>
          <p className="text-green-100 text-lg">
            Encuentra el lugar ideal para vivir. Opciones de renta flexibles y accesibles.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyListFiltered status="renta" />
      </div>
    </div>
  );
}