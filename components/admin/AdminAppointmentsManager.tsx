
import React, { useState, useEffect, useCallback } from 'react';
import { Appointment } from '../../types';
import { fetchAppointments, updateAppointmentStatus } from '../../services/apiService';
import LoadingSpinner from '../LoadingSpinner';
import AlertMessage from '../AlertMessage';

const AdminAppointmentsManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAppointments();
      setAppointments(data.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime())); // Show most recent first
    } catch (err) {
      setError('Error al cargar las citas.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) return;
    
    setError(null);
    setSuccessMessage(null);
    try {
      const updatedAppointment = await updateAppointmentStatus(appointmentId, 'cancelled');
      if (updatedAppointment) {
        setAppointments(prev => prev.map(app => app.id === appointmentId ? updatedAppointment : app));
        setSuccessMessage('Cita cancelada con éxito.');
      } else {
        setError('No se pudo encontrar la cita para cancelar.');
      }
    } catch (err) {
      setError('Error al cancelar la cita.');
      console.error(err);
    }
     setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (isLoading) {
    return <LoadingSpinner text="Cargando citas..." />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-brand-primary mb-6">Listado de Citas</h2>
      {error && <AlertMessage message={error} type="error" onClose={() => setError(null)} />}
      {successMessage && <AlertMessage message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />}

      {appointments.length === 0 ? (
        <p className="text-brand-text">No hay citas programadas.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Servicios</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Profesional</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha y Hora</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {appointments.map(app => (
                <tr key={app.id} className={`${app.status === 'cancelled' ? 'bg-red-50 opacity-70 hover:opacity-90' : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">{app.clientName} {app.clientLastName || ''}</td>
                  <td className="px-4 py-3 text-brand-text">
                    {app.bookedServices.map(s => s.serviceName).join(', ')}
                    {app.bookedServices.length > 2 ? ` (+${app.bookedServices.length -2} más)`: ''}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">{app.professionalName || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">{new Intl.DateTimeFormat('es-ES', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(app.fechaHora))}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">{app.clientPhone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">€{app.totalPrice.toFixed(2)} ({app.totalDuration} min)</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${app.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''} 
                      ${app.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}`}>
                      {app.status === 'confirmed' ? 'Confirmada' : app.status === 'cancelled' ? 'Cancelada' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {app.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        className="text-red-600 hover:text-red-800 transition-colors text-xs py-1 px-2 border border-red-500 hover:bg-red-50 rounded-md"
                        aria-label={`Cancelar cita de ${app.clientName}`}
                      >
                        <i className="fas fa-times-circle mr-1"></i>Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsManager;
