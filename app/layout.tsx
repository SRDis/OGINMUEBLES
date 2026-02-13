import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/common/FloatingButtons';
import CookieBanner from '@/components/common/CookieBanner';
import { ClientProviders } from './providers';
import StructuredData from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oginmuebles.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Oliver López Guijoza | Asesor Inmobiliario en Valle de Bravo y CDMX',
    template: '%s | Oliver López Guijoza',
  },
  description: 'Asesor inmobiliario profesional certificado AMPI. Especialista en propiedades exclusivas en Valle de Bravo y Ciudad de México. Venta, renta e inversión inmobiliaria con asesoría personalizada y certeza jurídica.',
  keywords: [
    'Oliver López Guijoza',
    'asesor inmobiliario',
    'propiedades Valle de Bravo',
    'bienes raíces CDMX',
    'casas en venta',
    'propiedades en renta',
    'inversión inmobiliaria',
    'AMPI',
    'asesoría inmobiliaria profesional',
    'propiedades exclusivas',
    'Valle de Bravo real estate',
    'inmobiliaria México',
  ],
  authors: [{ name: 'Oliver López Guijoza' }],
  creator: 'Oliver López Guijoza',
  publisher: 'Oliver López Guijoza',
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/Recurso 7logo_crew@4x.png', sizes: 'any' },
      { url: '/Recurso 7logo_crew@4x.png', type: 'image/png', sizes: '32x32' },
      { url: '/Recurso 7logo_crew@4x.png', type: 'image/png', sizes: '16x16' },
      { url: '/Recurso 7logo_crew@4x.png', type: 'image/png', sizes: '192x192' },
      { url: '/Recurso 7logo_crew@4x.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/Recurso 7logo_crew@4x.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: baseUrl,
    siteName: 'Oliver López Guijoza - Asesor Inmobiliario',
    title: 'Oliver López Guijoza | Asesor Inmobiliario Profesional',
    description: 'Asesor inmobiliario profesional certificado AMPI. Especialista en propiedades exclusivas en Valle de Bravo y Ciudad de México.',
    images: [
      {
        url: '/og_icono.png',
        width: 1200,
        height: 630,
        alt: 'Oliver López Guijoza - Asesor Inmobiliario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oliver López Guijoza | Asesor Inmobiliario Profesional',
    description: 'Asesor inmobiliario profesional certificado AMPI. Especialista en propiedades exclusivas.',
    images: ['/og_icono.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Oliver López Guijoza',
  },
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow bg-gray-50">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Floating Buttons (WhatsApp & Scroll to Top) */}
          <FloatingButtons />
          
          {/* Cookie Banner */}
          <CookieBanner />
        </ClientProviders>
        
        {/* Structured Data - LocalBusiness */}
        <StructuredData
          type="LocalBusiness"
          data={{
            name: 'Oliver López Guijoza - Asesor Inmobiliario',
            image: `${baseUrl}/og_icono.png`,
            '@id': baseUrl,
            url: baseUrl,
            telephone: '+52-55-XXXX-XXXX',
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Valle de Bravo',
              addressRegion: 'Estado de México',
              addressCountry: 'MX',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '19.1936',
              longitude: '-100.1306',
            },
            sameAs: [
              // Agregar redes sociales si las tienes
            ],
          }}
        />
      </body>
    </html>
  );
}