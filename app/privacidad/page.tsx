import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos personales conforme a la LFPDPPP de México.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#22AADE]" />
            <span className="text-[#22AADE] text-[10px] font-bold tracking-[0.4em] uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-2">
            Política de <span className="font-bold italic">Privacidad</span>
          </h1>
          <p className="text-gray-400 font-light">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-gray-300 leading-relaxed">
              Oliver López Guijoza, con domicilio en Valle de Bravo, Estado de México, es el responsable del tratamiento de sus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Datos Personales que Recopilamos</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Recopilamos los siguientes datos personales:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Mensajes y consultas</li>
              <li>Preferencias de búsqueda de propiedades</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Finalidad del Tratamiento</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Sus datos personales serán utilizados para:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Responder a sus consultas y solicitudes de información</li>
              <li>Proporcionar asesoría inmobiliaria personalizada</li>
              <li>Enviar información sobre propiedades de su interés</li>
              <li>Mejorar nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Derechos ARCO</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Acceder</strong> a sus datos personales</li>
              <li><strong>Rectificar</strong> datos inexactos o incompletos</li>
              <li><strong>Cancelar</strong> el tratamiento de sus datos</li>
              <li><strong>Oponerse</strong> al tratamiento de sus datos</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Para ejercer estos derechos, puede contactarnos en:{' '}
              <a href="mailto:inmuebles.oliverlopezguijoza@gmail.com" className="text-[#22AADE] hover:underline">
                inmuebles.oliverlopezguijoza@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Transferencia de Datos</h2>
            <p className="text-gray-300 leading-relaxed">
              Sus datos personales no serán transferidos a terceros, salvo cuando sea necesario para cumplir con obligaciones legales o cuando usted haya dado su consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Medidas de Seguridad</h2>
            <p className="text-gray-300 leading-relaxed">
              Implementamos medidas de seguridad técnicas y administrativas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Puede gestionar sus preferencias de cookies en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cambios a esta Política</h2>
            <p className="text-gray-300 leading-relaxed">
              Nos reservamos el derecho de modificar esta política de privacidad. Los cambios serán publicados en esta página con la fecha de última actualización.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Autoridad de Control</h2>
            <p className="text-gray-300 leading-relaxed">
              Si considera que sus derechos han sido vulnerados, puede presentar una denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
            </p>
            <p className="text-gray-400 text-sm mt-2">
              INAI: <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-[#22AADE] hover:underline">www.inai.org.mx</a>
            </p>
          </section>

          <div className="pt-6 border-t border-white/5">
            <Link
              href="/"
              className="text-[#22AADE] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
