import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/common/FloatingButtons';
import { ClientProviders } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oliver L. Guijoza - Negocios Inmobiliarios',
  description: 'Plataforma líder de bienes raíces en México. Encuentra casas, departamentos y propiedades en venta o renta. Asesoría profesional personalizada.',
  keywords: 'bienes raíces, propiedades, casas, departamentos, venta, renta, México',
  authors: [{ name: 'RealEstate' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.realestate.com',
    siteName: 'RealEstate',
    title: 'RealEstate - Encuentra tu Propiedad Ideal',
    description: 'Plataforma líder de bienes raíces en México',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RealEstate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RealEstate - Encuentra tu Propiedad Ideal',
    description: 'Plataforma líder de bienes raíces en México',
    images: ['/images/og-image.jpg'],
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
        </ClientProviders>
      </body>
    </html>
  );
}