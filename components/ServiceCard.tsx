
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void; // This might become onSelect or similar if reused
}

// This component is not directly used in the new multi-step booking flow.
// It's kept for potential future use or if parts of the old UI are repurposed.

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out transform hover:shadow-xl border border-gray-200"
    >
      <div>
        {service.imageUrl && (
          <img className="w-full h-40 object-cover" src={service.imageUrl} alt={service.nombre} />
        )}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-brand-primary mb-2">{service.nombre}</h3>
          <p className="text-sm text-brand-text mb-1 h-10 overflow-hidden">{service.descripcion}</p>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-500">
              <i className="fas fa-clock mr-1"></i> {service.duracion} min
            </p>
            <p className="text-lg font-bold text-brand-accent">
              €{service.precio.toFixed(2)}
            </p>
          </div>
           <p className="text-xs text-gray-400 mt-1">Categoría: {service.category}</p>
        </div>
      </div>
      <div className="p-5 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(service)}
          className="w-full bg-brand-secondary text-white py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 text-sm font-medium"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
