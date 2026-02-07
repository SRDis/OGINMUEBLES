import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyStats from '@/components/property/PropertyStats';
import PropertyHighlights from '@/components/property/PropertyHighlights';
import PropertyProcess from '@/components/property/PropertyProcess';
import ContactForm from '@/components/forms/ContactForm';
import InvestmentCalculator from '@/components/property/InvestmentCalculator';
import PropertyMap from '@/components/property/PropertyMap';
import { getImagesByInternalId, getMainImageUrl } from '@/lib/cloudinary';
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
  const propertyData = await getProperty(params.id);

  if (!propertyData) {
    notFound();
  }

  // Extraer valores primitivos del objeto de Supabase
  const id = String(propertyData.id || '');
  const title = String(propertyData.title || '');
  const description = String(propertyData.description || '');
  const location = String(propertyData.location || '');
  const address = String(propertyData.address || '');
  const price = Number(propertyData.price) || 0;
  const status = String(propertyData.status || 'venta') as 'venta' | 'renta';
  const bedrooms = Number(propertyData.bedrooms) || 0;
  const bathrooms = Number(propertyData.bathrooms) || 0;
  const halfBathrooms = Number(propertyData.half_bathrooms) || 0;
  const parkingSpaces = Number(propertyData.parking_spaces) || 0;
  const area = Number(propertyData.area) || 0;
  const constructionArea = Number(propertyData.construction_area) || 0;
  const propertyType = String(propertyData.property_type || '');
  const mainImageId = propertyData.main_image_id ? String(propertyData.main_image_id) : '';
  const internalId = propertyData.ID_interno || propertyData.internal_id ? String(propertyData.ID_interno || propertyData.internal_id) : '';
  const latitude = typeof propertyData.latitude === 'number' && !isNaN(propertyData.latitude) ? propertyData.latitude : null;
  const longitude = typeof propertyData.longitude === 'number' && !isNaN(propertyData.longitude) ? propertyData.longitude : null;

  // Procesar amenities
  let amenities: string[] = [];
  if (propertyData.amenities) {
    if (Array.isArray(propertyData.amenities)) {
      amenities = propertyData.amenities.map((a: unknown) => String(a || '')).filter((a: string) => a.length > 0);
    } else if (typeof propertyData.amenities === 'string') {
      try {
        const parsed = JSON.parse(propertyData.amenities);
        if (Array.isArray(parsed)) {
          amenities = parsed.map((a: unknown) => String(a || '')).filter((a: string) => a.length > 0);
        } else {
          amenities = [String(propertyData.amenities)];
        }
      } catch {
        amenities = [String(propertyData.amenities)];
      }
    }
  }

  // Obtener imágenes
  let imageUrls: string[] = [];
  if (internalId && status) {
    imageUrls = await getImagesByInternalId(internalId, status);
  }

  if (imageUrls.length === 0) {
    const images = await getPropertyImages(id);
    imageUrls = images
      .map(img => {
        if (img.cloudinary_url) return String(img.cloudinary_url);
        if (img.cloudinary_id) return getMainImageUrl(String(img.cloudinary_id));
        return null;
      })
      .filter((url): url is string => url !== null && url.length > 0);
  }

  if (imageUrls.length === 0 && mainImageId) {
    const mainImageUrl = getMainImageUrl(mainImageId);
    if (mainImageUrl && mainImageUrl !== '/images/placeholder.jpg') {
      imageUrls.push(mainImageUrl);
    }
  }

  if (imageUrls.length === 0) {
    imageUrls.push('/images/placeholder.jpg');
  }

  // Crear objetos serializables para componentes client
  const propertyForStats = {
    bedrooms,
    bathrooms,
    half_bathrooms: halfBathrooms,
    parking_spaces: parkingSpaces,
    area,
    construction_area: constructionArea,
    price,
  };

  const propertyForDetails = {
    description,
    bedrooms,
    bathrooms,
    area,
    property_type: propertyType,
    address,
    amenities: amenities.length > 0 ? amenities : null,
  };

  const propertyForHighlights = {
    bedrooms,
    bathrooms,
    parking_spaces: parkingSpaces,
    area,
    construction_area: constructionArea,
    property_type: propertyType,
    status,
  };

  const propertyForCalculator = {
    price,
    construction_area: constructionArea,
    area,
    property_type: propertyType,
    location,
    bedrooms,
    bathrooms,
  };

  const hasCoordinates = latitude !== null && longitude !== null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb - Simplificado */}
      <div className="border-b border-white/5 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
            <Link href="/" className="hover:text-[#22AADE] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-[#22AADE] transition-colors">Propiedades</Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs md:max-w-none">{title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header - Simplificado */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-white mb-2">
                {title}
              </h1>
              <div className="flex items-center text-gray-400 text-sm">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-3xl font-light text-[#22AADE] mb-1.5">
                ${price.toLocaleString('es-MX')}
                {status === 'renta' && <span className="text-base text-gray-400 font-light">/mes</span>}
              </div>
              <span className={`inline-block px-3 py-1 rounded text-xs font-medium uppercase ${
                status === 'venta' 
                  ? 'bg-[#22AADE] text-black' 
                  : 'bg-green-500 text-white'
              }`}>
                {status === 'venta' ? 'En Venta' : 'En Renta'}
              </span>
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <PropertyStats property={propertyForStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={imageUrls} />

            {/* Highlights - Nueva sección que facilita la venta */}
            <PropertyHighlights property={propertyForHighlights} />

            {/* Details - Sin información repetitiva */}
            <PropertyDetails property={propertyForDetails} />

            {/* Calculadora de Inversión - Solo para propiedades en venta */}
            {status === 'venta' && (
              <InvestmentCalculator property={propertyForCalculator} />
            )}

            {/* Proceso de Compra/Renta - Nueva sección */}
            <PropertyProcess status={status} />

            {/* Mapa - Solo si hay coordenadas */}
            {hasCoordinates && latitude !== null && longitude !== null && (
              <PropertyMap 
                latitude={latitude} 
                longitude={longitude} 
                location={location}
              />
            )}
          </div>

          {/* Right Column - Contact Form Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <ContactForm 
                propertyId={id} 
                propertyTitle={title}
                propertyInternalId={internalId || undefined}
                sourceSection="propiedad-detail"
              />
              
              {/* Trust Badge - Simplificado */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 text-center">
                <svg className="w-8 h-8 text-[#22AADE] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-white font-medium mb-1.5 text-sm">Certificación AMPI</h3>
                <p className="text-gray-500 text-xs">Propiedad verificada profesionalmente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
