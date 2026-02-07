'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navegación con teclado en modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
      }
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, images.length]);

  const nextImage = () => {
    setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  const prevImage = () => {
    setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-lg overflow-hidden">
      {/* Main Image */}
      <div 
        className="relative h-[450px] md:h-[600px] bg-[#050505] cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={images[selectedImage]}
          alt="Imagen principal de la propiedad"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
          priority
          quality={90}
        />
        
        {/* Overlay con información */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-medium">
                    {selectedImage + 1} / {images.length}
                  </span>
                </div>
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="bg-[#22AADE] text-black px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Ver Galería
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navegación con flechas - Siempre visible si hay más de 1 imagen */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#22AADE] hover:text-black transition-all z-10"
              aria-label="Imagen anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#22AADE] hover:text-black transition-all z-10"
              aria-label="Imagen siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores de puntos (dots) - Solo si hay más de 1 imagen */}
        {images.length > 1 && images.length <= 10 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`transition-all ${
                  selectedImage === index
                    ? 'w-8 h-2 bg-[#22AADE] rounded-full'
                    : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Full Screen - Mejorado */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-[#22AADE] z-30 transition-all bg-black/80 backdrop-blur-sm rounded-full p-3 hover:bg-[#22AADE]/20"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white hover:text-[#22AADE] bg-black/80 backdrop-blur-sm rounded-full p-4 transition-all hover:bg-[#22AADE]/20 z-30"
                aria-label="Imagen anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white hover:text-[#22AADE] bg-black/80 backdrop-blur-sm rounded-full p-4 transition-all hover:bg-[#22AADE]/20 z-30"
                aria-label="Imagen siguiente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[selectedImage]}
                alt={`Imagen ${selectedImage + 1} en pantalla completa`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
                priority
              />
            </div>
          </div>

          {/* Counter y controles */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm flex items-center gap-4">
              <span className="text-[#22AADE] font-semibold">{selectedImage + 1}</span>
              <span className="text-gray-400">de</span>
              <span>{images.length}</span>
            </div>
          </div>

          {/* Indicadores de puntos en modal */}
          {images.length > 1 && images.length <= 15 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`transition-all ${
                    selectedImage === index
                      ? 'w-8 h-2 bg-[#22AADE] rounded-full'
                      : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Indicador de teclado (solo desktop) */}
          <div className="absolute bottom-6 right-6 text-gray-500 text-xs hidden md:block z-30">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
              <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">← →</kbd>
              <span className="text-gray-400">Navegar</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-[10px] ml-2">ESC</kbd>
              <span className="text-gray-400">Salir</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
