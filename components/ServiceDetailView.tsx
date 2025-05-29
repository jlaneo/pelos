
import React from 'react';
import { Service } from '../types';

interface ServiceDetailViewProps {
  service: Service;
  onBook: (service: Service) => void; // May change if booking multiple services
  onBack: () => void;
}

// This component is not a primary part of the new multi-step booking flow.
// The new flow favors direct selection from a list rather than individual detail pages.
// It can be removed or repurposed.

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, onBook, onBack }) => {
  return (
    <div className="p-4 sm:p-8">
      <button 
        onClick={onBack} 
        className="mb-6 text-sm text-brand-accent hover:underline flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i> Volver
      </button>

      {service.imageUrl && (
        <img 
          src={service.imageUrl} 
          alt={service.nombre} 
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6" 
        />
      )}
      <h2 className="text-3xl font-bold text-brand-primary mb-3">{service.nombre}</h2>
      
      <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
        <span>
          <i className="fas fa-clock mr-1 text-brand-secondary"></i> Duración: {service.duracion} min
        </span>
        <span className="text-xl font-semibold text-brand-accent">
          <i className="fas fa-tag mr-1 text-brand-secondary"></i> Precio: €{service.precio.toFixed(2)}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-2">Categoría: {service.category}</p>
      
      <p className="text-brand-text leading-relaxed mb-6 whitespace-pre-wrap">
        {service.descripcion} 
        {'\n\n'}Este tratamiento está diseñado para ofrecerte los mejores resultados, utilizando productos de alta calidad y técnicas profesionales. Nuestro equipo de expertos se asegurará de que tu experiencia sea relajante y satisfactoria.
      </p>

      <button
        onClick={() => onBook(service)} // This onBook is for a single service, may need adjustment
        className="w-full bg-brand-accent text-white py-3 px-6 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 flex items-center justify-center"
      >
        <i className="far fa-calendar-check mr-2"></i>Reservar este Tratamiento (Individual)
      </button>
    </div>
  );
};

export default ServiceDetailView;
