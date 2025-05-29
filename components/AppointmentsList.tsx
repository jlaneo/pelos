
import React from 'react';
import { Appointment } from '../types';

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div className="mt-8 text-center p-6 bg-white rounded-lg shadow">
        <i className="fas fa-calendar-times text-4xl text-brand-secondary mb-3"></i>
        <p className="text-brand-text">Aún no tienes citas programadas.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-brand-primary mb-6 text-center">Mis Próximas Citas</h2>
      <div className="space-y-4">
        {appointments.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-lg shadow-lg border-l-4 border-brand-primary hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-brand-accent">Cita ID: {app.id.substring(0,7)}</h3>
                <p className="text-sm text-brand-text">Cliente: {app.clientName} {app.clientLastName || ''}</p>
                 {app.professionalName && <p className="text-sm text-brand-text">Profesional: {app.professionalName}</p>}
              </div>
              <div className="mt-2 sm:mt-0 sm:text-right">
                <p className="text-md font-medium text-brand-text">
                  <i className="fas fa-calendar-alt mr-2 text-brand-secondary"></i>
                  {new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(app.fechaHora))}
                </p>
                <p className="text-sm text-gray-500">Estado: <span className={`font-semibold ${app.status === 'confirmed' ? 'text-green-600' : app.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{app.status === 'confirmed' ? 'Confirmada' : app.status === 'cancelled' ? 'Cancelada' : 'Pendiente'}</span></p>
              </div>
            </div>

            <div className="my-3 border-t border-gray-200 pt-3">
              <h4 className="text-sm font-semibold text-brand-text mb-1">Servicios Reservados:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                {app.bookedServices.map(bs => (
                  <li key={bs.serviceId}>{bs.serviceName} (€{bs.price.toFixed(2)})</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                <p className="text-sm text-gray-500">
                    <i className="fas fa-clock mr-1"></i> Duración Total: {app.totalDuration} min
                </p>
                <p className="text-right text-lg font-bold text-brand-primary">
                    Total: €{app.totalPrice.toFixed(2)}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
