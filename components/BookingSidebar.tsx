
import React from 'react';
import { Service } from '../types';
import LoadingSpinner from './LoadingSpinner'; // For button loading state

interface BookingSidebarProps {
  selectedServices: Service[];
  totalPrice: number;
  totalDuration: number;
  onRemoveService: (serviceId: string) => void;
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled: boolean;
  isLoading: boolean;
  currentStep: string; // To show/hide certain info based on step
  selectedProfessionalName?: string;
  selectedDate?: Date | null;
  selectedTime?: string | null;
}

const SelectedServiceItem: React.FC<{ service: Service, onRemove: (id: string) => void }> = ({ service, onRemove }) => {
  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-brand-text">{service.nombre}</p>
        <p className="text-xs text-gray-500">{service.duracion} min</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-brand-accent mr-3">€{service.precio.toFixed(2)}</p>
        <button 
          onClick={() => onRemove(service.id)} 
          className="text-red-500 hover:text-red-700 text-xs"
          aria-label={`Eliminar ${service.nombre}`}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
};

const BookingSidebar: React.FC<BookingSidebarProps> = ({
  selectedServices,
  totalPrice,
  totalDuration,
  onRemoveService,
  buttonText,
  onButtonClick,
  isButtonDisabled,
  isLoading,
  currentStep,
  selectedProfessionalName,
  selectedDate,
  selectedTime,
}) => {
  return (
    <div className="sticky top-0 p-4 sm:p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-brand-primary mb-4 border-b pb-3">Tu Reserva</h2>
      
      {selectedServices.length === 0 ? (
        <p className="text-sm text-gray-500 flex-grow">Selecciona uno o más servicios para comenzar.</p>
      ) : (
        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-400px)] sm:max-h-[300px] lg:max-h-none mb-4 pr-1 custom-scrollbar">
          <ul className="divide-y divide-gray-200">
            {selectedServices.map(service => (
              <SelectedServiceItem key={service.id} service={service} onRemove={onRemoveService} />
            ))}
          </ul>
        </div>
      )}

      {selectedServices.length > 0 && (
        <div className="mt-auto border-t border-gray-200 pt-4">
          {currentStep !== 'SERVICE_SELECTION' && selectedProfessionalName && (
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Profesional:</span>
              <span className="font-medium text-brand-text">{selectedProfessionalName}</span>
            </div>
          )}
          {currentStep !== 'SERVICE_SELECTION' && selectedDate && selectedTime && (
             <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Fecha y Hora:</span>
              <span className="font-medium text-brand-text">
                {new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(selectedDate)} a las {selectedTime}
              </span>
            </div>
          )}

          <div className="flex justify-between font-semibold text-brand-text mb-1">
            <span>Duración Total:</span>
            <span>{totalDuration} min</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-brand-primary mb-4">
            <span>Precio Total:</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onButtonClick}
            disabled={isButtonDisabled || isLoading}
            className={`w-full bg-brand-accent text-white py-3 px-4 rounded-lg font-semibold transition-opacity
                        ${(isButtonDisabled || isLoading) ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </div>
            ) : buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSidebar;
