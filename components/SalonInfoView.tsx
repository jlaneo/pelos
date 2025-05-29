
import React from 'react';

// This view is no longer accessible via the main tabs in BookingWidget in the new flow.
// It's kept for now but would need a new way to be displayed if still required.
const SalonInfoView: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 text-brand-text">
      <h2 className="text-3xl font-bold text-brand-primary mb-6 text-center">Sobre Peluquería Pilar Ayala</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-brand-secondary mb-2">Nuestra Filosofía</h3>
          <p className="leading-relaxed">
            En Peluquería Pilar Ayala, creemos que la belleza es una forma de arte y autoexpresión. Nuestra misión es realzar tu belleza natural y ayudarte a sentirte con confianza y radiante. Nos dedicamos a proporcionar servicios de la más alta calidad en un ambiente acogedor y profesional.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-brand-secondary mb-2">Nuestros Expertos</h3>
          <p className="leading-relaxed">
            Contamos con un equipo de estilistas apasionados y altamente cualificados, con años de experiencia en las últimas tendencias y técnicas de peluquería y estética. Nos mantenemos en constante formación para ofrecerte lo mejor en cortes, coloración, tratamientos capilares y mucho más.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-brand-secondary mb-2">Compromiso con la Calidad</h3>
          <p className="leading-relaxed">
            Utilizamos solo productos de las mejores marcas, seleccionados cuidadosamente por su eficacia y respeto por la salud de tu cabello y piel. Tu satisfacción y bienestar son nuestra máxima prioridad.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-brand-secondary mb-2">Visítanos</h3>
          <p className="leading-relaxed">
            Te invitamos a visitarnos y descubrir una experiencia de belleza única.
          </p>
          <p className="mt-2">
            <i className="fas fa-map-marker-alt mr-2 text-brand-accent"></i>Calle Ficticia 123, Ciudad Ejemplo, CP 08000
          </p>
          <p>
            <i className="fas fa-phone mr-2 text-brand-accent"></i>+34 900 123 456
          </p>
          <p>
            <i className="fas fa-envelope mr-2 text-brand-accent"></i>info@pilarrayala.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default SalonInfoView;
