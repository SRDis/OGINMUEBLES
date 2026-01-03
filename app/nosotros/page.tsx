import Link from 'next/link';

export const metadata = {
  title: 'Sobre Nosotros | RealEstate',
  description: 'Conoce más sobre RealEstate, tu socio confiable en bienes raíces. Nuestro equipo, misión y valores.',
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Más que una inmobiliaria, somos tu aliado para encontrar el hogar de tus sueños
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed">
                Facilitar el proceso de compra, venta y renta de propiedades, brindando un servicio 
                personalizado, transparente y profesional. Nos comprometemos a hacer realidad los 
                sueños inmobiliarios de nuestros clientes con integridad y excelencia.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
              <p className="text-gray-700 leading-relaxed">
                Ser la inmobiliaria líder en México, reconocida por nuestra innovación tecnológica, 
                servicio al cliente excepcional y compromiso con la transparencia. Aspiramos a transformar 
                la experiencia inmobiliaria a través de soluciones digitales y atención personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            Nuestra Historia
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              RealEstate nació en 2015 con una visión clara: revolucionar el mercado inmobiliario mexicano 
              mediante la combinación de tecnología de vanguardia y atención personalizada. Fundada por un 
              equipo de profesionales con más de 20 años de experiencia combinada en el sector inmobiliario, 
              comenzamos con una pequeña oficina en la Ciudad de México.
            </p>
            <p>
              A lo largo de los años, hemos crecido orgánicamente gracias a la confianza de nuestros clientes 
              y al compromiso inquebrantable de nuestro equipo. Hoy en día, contamos con una cartera de más 
              de 500 propiedades activas y hemos ayudado a más de 2,000 familias a encontrar su hogar ideal.
            </p>
            <p>
              Nuestra plataforma digital, desarrollada internamente, permite a nuestros clientes explorar 
              propiedades con filtros avanzados, realizar visitas virtuales y recibir asesoría profesional 
              desde la comodidad de su hogar. Mantenemos nuestro compromiso con la innovación mientras 
              preservamos los valores fundamentales de transparencia, honestidad y servicio excepcional.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Integridad</h3>
              <p className="text-gray-600">
                Actuamos con honestidad y transparencia en cada transacción, construyendo relaciones basadas en la confianza.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compromiso</h3>
              <p className="text-gray-600">
                Dedicados a superar las expectativas de nuestros clientes, brindando atención personalizada en cada paso.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovación</h3>
              <p className="text-gray-600">
                Implementamos tecnología de punta para ofrecer la mejor experiencia inmobiliaria del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">9+</div>
              <div className="text-blue-100">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2,000+</div>
              <div className="text-blue-100">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Propiedades Activas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Índice de Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team (Optional - you can add real team members later) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Contamos con un equipo de profesionales altamente capacitados y comprometidos con tu satisfacción
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member placeholders */}
            {[
              { role: 'Agentes Certificados', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { role: 'Asesores Legales', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { role: 'Equipo Administrativo', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon}/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.role}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para Encontrar tu Propiedad Ideal?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Permítenos ayudarte a hacer realidad el sueño de tu hogar perfecto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/propiedades"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Ver Propiedades
            </Link>
            <Link
              href="/contacto"
              className="bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors inline-block"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}