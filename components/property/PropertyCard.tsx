import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  propertyType: string;
  status: 'venta' | 'renta';
}

export default function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  propertyType,
  status
}: PropertyCardProps) {
  return (
    <Link href={`/propiedades/${id}`} className="touch-manipulation">
      <div className="group bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/5 rounded-sm overflow-hidden hover:border-[#22AADE]/30 active:border-[#22AADE]/50 hover:shadow-[0_0_30px_rgba(34,170,222,0.2)] transition-all duration-500 cursor-pointer">
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 bg-[#22AADE] text-black px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
            {status === 'venta' ? 'Venta' : 'Renta'}
          </div>
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">Ver Detalles</span>
          </div>
        </div>
        
        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
            <h3 className="text-base sm:text-lg font-light text-white line-clamp-2 group-hover:text-[#22AADE] transition-colors flex-grow">{title}</h3>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium flex-shrink-0">{propertyType}</span>
          </div>
          
          <p className="text-2xl sm:text-3xl font-bold text-[#22AADE] mb-2 sm:mb-3">
            ${price.toLocaleString('es-MX')}
            {status === 'renta' && <span className="text-xs sm:text-sm text-gray-400 font-light">/mes</span>}
          </p>
          
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center font-light">
            <svg className="w-4 h-4 mr-2 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
          
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 border-t border-white/5 pt-3 sm:pt-4 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span className="font-light">{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
              </svg>
              <span className="font-light">{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22AADE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
              <span className="font-light">{area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}