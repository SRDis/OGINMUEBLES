import ContactForm from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Consultoría Inmobiliaria | Contacto Oliver López Guijoza',
  description: 'Solicita una asesoría estratégica para tu próxima inversión inmobiliaria en Valle de Bravo. Atención personalizada y confidencial.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#22AADE] selection:text-black">
      
      {/* 1. HERO SECTION: Direct & Professional */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#22AADE]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none mb-6">
            Iniciemos una <br />
            <span className="font-bold italic text-white text-[#22AADE]">Conversación</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Ya sea una inversión patrimonial o la venta de una propiedad exclusiva, 
            estoy aquí para diseñar la estrategia que necesitas.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* 2. CONTACT INFO: Minimalist Cards */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Direct Channels */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm group hover:border-[#22AADE]/30 transition-all">
              <h3 className="text-[#22AADE] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Canales Directos</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">WhatsApp & Tel</p>
                  <a href="tel:+525512345678" className="text-xl font-light hover:text-[#22AADE] transition-colors tracking-tight">
                    +52 55 1234 5678
                  </a>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Email Profesional</p>
                  <a href="mailto:oliver@tu-dominio.com" className="text-xl font-light hover:text-[#22AADE] transition-colors tracking-tight">
                    oliver@tu-dominio.com
                  </a>
                </div>
              </div>
            </div>

            {/* Valle de Bravo Presence */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm">
              <h3 className="text-[#22AADE] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Ubicación Estratégica</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Presencia activa en <span className="text-white">Valle de Bravo</span> y <span className="text-white">CDMX</span>.<br />
                Atención presencial bajo previa cita para garantizar total confidencialidad.
              </p>
              
              <div className="mt-8 flex gap-4">
                {/* Social Icons Simplified */}
                {['FB', 'IG', 'LI'].map((social) => (
                  <a key={social} href="#" className="text-[10px] font-bold text-gray-500 hover:text-white border border-white/10 w-10 h-10 flex items-center justify-center rounded-full transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick FAQ / Info */}
            <div className="p-8 border-l border-[#22AADE]/20 bg-[#22AADE]/5">
              <p className="text-xs text-[#22AADE] font-bold uppercase tracking-widest mb-2">Tiempo de respuesta</p>
              <p className="text-sm text-gray-400 font-light italic">
                "Priorizo la calidad sobre la inmediatez. Recibirás una respuesta personalizada en menos de 24 horas."
              </p>
            </div>
          </div>

          {/* 3. CONTACT FORM: The "Briefing" Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-2xl relative">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#22AADE]/20" />
              
              <div className="mb-10">
                <h2 className="text-3xl font-light text-white mb-2">Cuéntame sobre tu proyecto</h2>
                <p className="text-gray-500 font-light">
                  Completa el siguiente formulario para entender mejor tus objetivos inmobiliarios.
                </p>
              </div>

              {/* El ContactForm debe ser estilizado con Tailwind para encajar en el modo oscuro (inputs negros, bordes sutiles) */}
              <div className="dark-form-wrapper">
                <ContactForm />
              </div>
            </div>

            {/* Benefits of Contacting Oliver */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
              <div className="flex gap-4">
                <div className="text-[#22AADE] font-bold text-xl">/</div>
                <p className="text-sm text-gray-400 font-light">Asesoría gratuita inicial para perfilamiento de inversión.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-[#22AADE] font-bold text-xl">/</div>
                <p className="text-sm text-gray-400 font-light">Acceso a inventario exclusivo 'Off-Market' en Valle de Bravo.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}