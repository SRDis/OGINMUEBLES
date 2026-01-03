import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';

async function getProperty(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getPropertyImages(propertyId: string) {
  const { data, error } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', propertyId)
    .order('display_order', { ascending: true });

  if (error) {
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    return {
      title: 'Propiedad no encontrada | RealEstate',
    };
  }

  return {
    title: `${property.title} - ${property.location} | RealEstate`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  const images = await getPropertyImages(params.id);

  // Construir array de URLs de imágenes
  const imageUrls = images.map(img => 
    `https://drive.google.com/thumbnail?id=${img.google_drive_file_id}&sz=w1000`
  );

  // Si no hay imágenes en la tabla, usar la imagen principal
  if (imageUrls.length === 0 && property.main_image_id) {
    imageUrls.push(`https://drive.google.com/thumbnail?id=${property.main_image_id}&sz=w1000`);
  }

  // Si aún no hay imágenes, usar placeholder
  if (imageUrls.length === 0) {
    imageUrls.push('/images/placeholder.jpg');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/propiedades" className="hover:text-blue-600">Propiedades</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl font-bold text-blue-600">
                ${property.price.toLocaleString('es-MX')}
                {property.status === 'renta' && <span className="text-lg text-gray-600">/mes</span>}
              </div>
              <div className="mt-2">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  property.status === 'venta' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {property.status === 'venta' ? 'En Venta' : 'En Renta'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={imageUrls} />

            {/* Details */}
            <PropertyDetails property={property} />
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm 
                propertyId={property.id} 
                propertyTitle={property.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}