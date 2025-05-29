
import React, { useState } from 'react';
import { Service, ServiceCategory } from '../types';

interface ServiceItemProps {
  service: Service;
  onAddService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
  isSelected: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onAddService, onRemoveService, isSelected }) => {
  return (
    <div className="flex justify-between items-center py-3 px-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div>
        <h4 className="font-medium text-brand-text text-sm">{service.nombre}</h4>
        <p className="text-xs text-gray-500">{service.duracion} min - €{service.precio.toFixed(2)}</p>
      </div>
      <button
        onClick={() => isSelected ? onRemoveService(service.id) : onAddService(service)}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all
                    ${isSelected 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-brand-secondary text-white hover:bg-brand-primary'}`}
        aria-pressed={isSelected}
        aria-label={isSelected ? `Quitar ${service.nombre}` : `Añadir ${service.nombre}`}
      >
        {isSelected ? <i className="fas fa-minus-circle mr-1"></i> : <i className="fas fa-plus-circle mr-1"></i>}
        {isSelected ? 'Quitar' : 'Añadir'}
      </button>
    </div>
  );
};

interface ServiceCategoryAccordionProps {
  categoryName: string;
  services: Service[];
  selectedServices: Service[];
  onAddService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
  defaultOpen?: boolean;
}

const ServiceCategoryAccordion: React.FC<ServiceCategoryAccordionProps> = ({ 
  categoryName, services, selectedServices, onAddService, onRemoveService, defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`category-${categoryName.replace(/\s+/g, '-')}`}
      >
        <h3 className="text-md font-semibold text-brand-primary">{categoryName}</h3>
        <i className={`fas fa-chevron-down transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}></i>
      </button>
      {isOpen && (
        <div id={`category-${categoryName.replace(/\s+/g, '-')}`} className="bg-white">
          {services.map(service => (
            <ServiceItem 
              key={service.id} 
              service={service} 
              onAddService={onAddService}
              onRemoveService={onRemoveService}
              isSelected={!!selectedServices.find(s => s.id === service.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


interface ServiceSelectionViewProps {
  services: Service[];
  categories: { key: ServiceCategory, name: string }[];
  selectedServices: Service[];
  onAddService: (service: Service) => void;
  onRemoveService: (serviceId: string) => void;
}

const ServiceSelectionView: React.FC<ServiceSelectionViewProps> = ({
  services,
  categories,
  selectedServices,
  onAddService,
  onRemoveService,
}) => {
  if (services.length === 0) {
    return <p className="text-center text-brand-text py-10">No hay servicios disponibles en este momento.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-2 text-center">Elige Tu Servicio</h1>
      <p className="text-center text-gray-600 mb-6 text-sm">Selecciona uno o más tratamientos que desees reservar.</p>
      {categories.map((category) => {
        const servicesForCategory = services.filter(s => s.category === category.key);
        if (servicesForCategory.length === 0) return null;
        return (
          <ServiceCategoryAccordion
            key={category.key}
            categoryName={category.name}
            services={servicesForCategory}
            selectedServices={selectedServices}
            onAddService={onAddService}
            onRemoveService={onRemoveService}
            defaultOpen={false} // Changed from index === 0 to false
          />
        );
      })}
    </div>
  );
};

export default ServiceSelectionView;
