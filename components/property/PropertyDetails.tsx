'use client';

interface PropertyDetailsProps {
  property: {
    description: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    property_type: string;
    address: string;
    amenities?: string[] | null;
  };
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-5">
      {/* Description */}
      {property.description && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 md:p-6">
          <h2 className="text-lg font-light text-white mb-4">
            Descripción
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
            {property.description}
          </p>
        </div>
      )}

      {/* Address */}
      {property.address && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 md:p-6">
          <h3 className="text-lg font-light text-white mb-3">Dirección</h3>
          <p className="text-gray-300 text-sm">{property.address}</p>
          {property.property_type && (
            <p className="text-gray-500 text-xs mt-2">Tipo: {property.property_type}</p>
          )}
        </div>
      )}

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 md:p-6">
          <h2 className="text-lg font-light text-white mb-4">
            Amenidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {property.amenities.map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <svg className="w-4 h-4 text-[#22AADE] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
