
import React from 'react';
import { Appointment } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

// This component is largely replaced by ConfirmationView.tsx for the main booking flow.
// It can be removed or adapted if needed for other purposes.

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  // Fallback to bookedServices if single serviceName is not present (new Appointment structure)
  const serviceNameDisplay = appointment.bookedServices?.[0]?.serviceName || 'Servicio Desconocido';
  const servicePriceDisplay = appointment.totalPrice || appointment.bookedServices?.[0]?.price || 0;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all scale-100 opacity-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <i className="fas fa-check text-3xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-brand-primary mb-3">¡Reserva Confirmada!</h2>
          <p className="text-brand-text mb-1">Gracias por reservar con nosotros, {appointment.clientName}.</p>
          <p className="text-brand-text mb-4">Tu cita ha sido programada con éxito.</p>
        </div>
        
        <div className="bg-brand-bg-light p-4 rounded-lg space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-brand-text">Servicio(s):</span>
            <span className="text-brand-accent">{appointment.bookedServices && appointment.bookedServices.length > 1 ? `${appointment.bookedServices.length} servicios` : serviceNameDisplay}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-brand-text">Fecha y Hora:</span>
            <span className="text-brand-accent">
              {new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(appointment.fechaHora))}
            </span>
          </div>
           <div className="flex justify-between">
            <span className="font-semibold text-brand-text">Precio Total:</span>
            <span className="text-brand-accent font-bold">€{servicePriceDisplay.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
        >
          Cerrar
        </button>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Recibirás un recordatorio antes de tu cita.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
