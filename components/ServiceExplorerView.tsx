
import React from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import LoadingSpinner from './LoadingSpinner';
import AlertMessage from './AlertMessage';

interface ServiceExplorerViewProps {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  onViewDetails: (service: Service) => void;
  clearError: () => void;
}

// This component is no longer used as the primary service browsing UI in BookingWidget.
// It has been replaced by ServiceSelectionView.tsx for the multi-step flow.
// It can be removed or repurposed.

const ServiceExplorerView: React.FC<ServiceExplorerViewProps> = ({ services, isLoading, error, onViewDetails, clearError }) => {
  if (isLoading) {
    return <div className="p-6"><LoadingSpinner text="Cargando tratamientos..." /></div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <AlertMessage message={error} type="error" onClose={clearError} />
      </div>
    );
  }

  if (services.length === 0) {
    return <p className="p-6 text-center text-brand-text">No hay tratamientos disponibles en este momento.</p>;
  }

  return (
    <section className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-brand-primary mb-6 text-center">Nuestros Tratamientos (Old View)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceExplorerView;
