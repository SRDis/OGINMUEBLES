import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso del sitio web.',
};

export default function TerminosPage() {
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
            Términos y <span className="font-bold italic">Condiciones</span>
          </h1>
          <p className="text-gray-400 font-light">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-300 leading-relaxed">
              Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Uso del Sitio</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Usted se compromete a utilizar este sitio web de manera legal y de acuerdo con estos términos. Está prohibido:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Utilizar el sitio para fines ilegales o no autorizados</li>
              <li>Intentar acceder a áreas restringidas del sitio</li>
              <li>Interferir con el funcionamiento del sitio</li>
              <li>Reproducir, duplicar o copiar el contenido sin autorización</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Propiedad Intelectual</h2>
            <p className="text-gray-300 leading-relaxed">
              Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Oliver López Guijoza y está protegido por las leyes de propiedad intelectual de México.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Información de Propiedades</h2>
            <p className="text-gray-300 leading-relaxed">
              La información sobre propiedades publicada en este sitio se proporciona únicamente con fines informativos. Nos esforzamos por mantener la información actualizada, pero no garantizamos su exactitud, integridad o actualidad. Los precios, disponibilidad y características de las propiedades están sujetos a cambios sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-gray-300 leading-relaxed">
              No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar este sitio web o su contenido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces a Terceros</h2>
            <p className="text-gray-300 leading-relaxed">
              Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido de estos sitios y no asumimos responsabilidad por ellos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Modificaciones</h2>
            <p className="text-gray-300 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Ley Aplicable</h2>
            <p className="text-gray-300 leading-relaxed">
              Estos términos y condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de México.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contacto</h2>
            <p className="text-gray-300 leading-relaxed">
              Para cualquier pregunta sobre estos términos y condiciones, puede contactarnos en:{' '}
              <a href="mailto:inmuebles.oliverlopezguijoza@gmail.com" className="text-[#22AADE] hover:underline">
                inmuebles.oliverlopezguijoza@gmail.com
              </a>
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
