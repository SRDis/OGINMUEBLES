import PropertyList from '@/components/property/PropertyList';

export const metadata = {
  title: 'Propiedades en Venta y Renta | RealEstate',
  description: 'Explora nuestro catálogo completo de propiedades en venta y renta. Encuentra casas, departamentos, terrenos y más.',
};

export default function PropiedadesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Todas las Propiedades
          </h1>
          <p className="text-gray-600">
            Encuentra la propiedad perfecta entre nuestra amplia selección
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyList />
      </div>
    </div>
  );
}