
import React from 'react';
import { Appointment } from '../types';

interface ConfirmationViewProps {
  appointment: Appointment;
  onNewBooking: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ appointment, onNewBooking }) => {
  const { clientName, clientLastName, fechaHora, bookedServices, totalPrice, totalDuration, professionalName, clientEmail, clientPhone, comments } = appointment;

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
          <i className="fas fa-check text-4xl text-green-600"></i>
        </div>
        <h1 className="text-3xl font-bold text-brand-primary mb-2">¡Reserva Confirmada!</h1>
        <p className="text-brand-text text-lg">Gracias, {clientName}. Tu cita ha sido programada con éxito.</p>
      </div>
      
      <div className="bg-brand-bg-light p-4 sm:p-6 rounded-lg shadow-md space-y-3 mb-8 text-sm">
        <h2 className="text-lg font-semibold text-brand-primary mb-3 border-b pb-2">Detalles de tu Cita</h2>
        
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Cliente:</span>
          <span className="text-brand-text">{clientName} {clientLastName || ''}</span>
        </div>
         {clientEmail && (
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-brand-text">{clientEmail}</span>
            </div>
         )}
        <div className="flex justify-between">
            <span className="font-medium text-gray-600">Teléfono:</span>
            <span className="text-brand-text">{clientPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Fecha y Hora:</span>
          <span className="text-brand-text">
            {new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(fechaHora))}
          </span>
        </div>
        {professionalName && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Profesional:</span>
            <span className="text-brand-text">{professionalName}</span>
          </div>
        )}

        <div className="pt-2">
            <h4 className="font-medium text-gray-600 mb-1">Servicios:</h4>
            <ul className="list-disc list-inside pl-4 text-brand-text space-y-0.5">
                {bookedServices.map(bs => (
                    <li key={bs.serviceId}>{bs.serviceName} (€{bs.price.toFixed(2)})</li>
                ))}
            </ul>
        </div>
        
        <div className="flex justify-between pt-2 border-t mt-2">
          <span className="font-medium text-gray-600">Duración Total Estimada:</span>
          <span className="text-brand-text">{totalDuration} min</span>
        </div>
        <div className="flex justify-between font-bold text-base">
          <span className="text-gray-700">Precio Total:</span>
          <span className="text-brand-primary">€{totalPrice.toFixed(2)}</span>
        </div>
         {comments && (
            <div className="pt-2 border-t mt-2">
                <span className="font-medium text-gray-600">Comentarios:</span>
                <p className="text-brand-text whitespace-pre-wrap text-xs mt-1">{comments}</p>
            </div>
        )}
      </div>

      <button
        onClick={onNewBooking}
        className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 text-base font-semibold"
      >
        Realizar Otra Reserva
      </button>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Recibirás un email/SMS de confirmación con los detalles de tu cita.
      </p>
    </div>
  );
};

export default ConfirmationView;
