
import React, { useState, useEffect, useCallback } from 'react';
import { Service } from '../../types';
import { fetchServices, deleteService } from '../../services/apiService';
import ServiceForm from './ServiceForm';
import LoadingSpinner from '../LoadingSpinner';
import AlertMessage from '../AlertMessage';

const AdminServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      setError('Error al cargar los servicios.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleFormSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowForm(false);
    setEditingService(null);
    loadServices(); // Refresh the list
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.')) return;
    
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteService(serviceId);
      setSuccessMessage('Servicio eliminado con éxito.');
      loadServices(); // Refresh list
    } catch (err) {
      setError('Error al eliminar el servicio.');
      console.error(err);
    }
     setTimeout(() => setSuccessMessage(null), 3000);
  };

  const openAddForm = () => {
    setEditingService(null);
    setShowForm(true);
    setError(null);
    setSuccessMessage(null);
  };

  const openEditForm = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
    setError(null);
    setSuccessMessage(null);
  };

  if (isLoading && !showForm) {
    return <LoadingSpinner text="Cargando servicios..." />;
  }

  if (showForm) {
    return (
      <ServiceForm
        serviceToEdit={editingService}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowForm(false);
          setEditingService(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-brand-primary">Listado de Servicios</h2>
        <button
          onClick={openAddForm}
          className="bg-brand-accent text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          <i className="fas fa-plus mr-2"></i>Añadir Servicio
        </button>
      </div>

      {error && <AlertMessage message={error} type="error" onClose={() => setError(null)} />}
      {successMessage && <AlertMessage message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />}

      {services.length === 0 && !isLoading ? (
        <p className="text-brand-text">No hay servicios configurados.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Duración (min)</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Precio</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-brand-text">{service.nombre}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">{service.duracion}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-brand-text">€{service.precio.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => openEditForm(service)}
                      className="text-brand-secondary hover:text-brand-primary transition-colors text-xs py-1 px-2 border border-brand-secondary hover:bg-blue-50 rounded-md"
                      aria-label={`Editar servicio ${service.nombre}`}
                    >
                       <i className="fas fa-edit mr-1"></i>Editar
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-800 transition-colors text-xs py-1 px-2 border border-red-500 hover:bg-red-50 rounded-md"
                      aria-label={`Eliminar servicio ${service.nombre}`}
                    >
                      <i className="fas fa-trash-alt mr-1"></i>Eliminar
                    </button>
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

export default AdminServicesManager;
