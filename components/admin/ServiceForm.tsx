
import React, { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../../types';
import { addService, updateService } from '../../services/apiService';
import AlertMessage from '../AlertMessage';
import { SERVICE_CATEGORIES_ORDERED } from '../../constants'; // Import categories

interface ServiceFormProps {
  serviceToEdit?: Service | null;
  onSuccess: (message: string) => void;
  onCancel: () => void;
}

const initialFormData: Omit<Service, 'id'> = {
  nombre: '',
  descripcion: '',
  duracion: 0,
  precio: 0,
  imageUrl: '',
  category: SERVICE_CATEGORIES_ORDERED[0]?.key || 'PELUQUERIA_MUJER', // Default category
};

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceToEdit, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Service, 'id'>>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        nombre: serviceToEdit.nombre,
        descripcion: serviceToEdit.descripcion,
        duracion: serviceToEdit.duracion,
        precio: serviceToEdit.precio,
        imageUrl: serviceToEdit.imageUrl || '',
        category: serviceToEdit.category,
      });
    } else {
      setFormData(initialFormData); // Reset for new form
    }
  }, [serviceToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError(null); // Clear error on change
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracion' || name === 'precio' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.nombre.trim() || formData.duracion <= 0 || formData.precio <= 0) {
      setError('Nombre, duración (mayor que 0) y precio (mayor que 0) son campos requeridos.');
      return;
    }
    if (formData.nombre.length < 3) {
       setError('El nombre del servicio debe tener al menos 3 caracteres.');
      return;
    }
     if (formData.descripcion.length > 500) {
       setError('La descripción no puede exceder los 500 caracteres.');
      return;
    }
    if (!formData.category) {
      setError('Por favor, selecciona una categoría para el servicio.');
      return;
    }


    setIsSubmitting(true);
    try {
      if (serviceToEdit) {
        await updateService(serviceToEdit.id, formData);
        onSuccess('Servicio actualizado con éxito.');
      } else {
        await addService(formData);
        onSuccess('Servicio añadido con éxito.');
      }
    } catch (err) {
      setError(serviceToEdit ? 'Error al actualizar el servicio.' : 'Error al añadir el servicio.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-brand-primary mb-6">
        {serviceToEdit ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}
      </h2>
      {error && <AlertMessage message={error} type="error" onClose={() => setError(null)} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-brand-text">Nombre del Servicio</label>
          <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-brand-text">Categoría</label>
          <select 
            name="category" 
            id="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
          >
            {SERVICE_CATEGORIES_ORDERED.map(cat => (
              <option key={cat.key} value={cat.key}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-brand-text">Descripción</label>
          <textarea name="descripcion" id="descripcion" value={formData.descripcion} onChange={handleChange} rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duracion" className="block text-sm font-medium text-brand-text">Duración (minutos)</label>
            <input type="number" name="duracion" id="duracion" value={formData.duracion} onChange={handleChange} required min="1"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="precio" className="block text-sm font-medium text-brand-text">Precio (€)</label>
            <input type="number" name="precio" id="precio" value={formData.precio} onChange={handleChange} required min="0.01" step="0.01"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-brand-text">URL de la Imagen (Opcional)</label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange}
                 placeholder="https://ejemplo.com/imagen.jpg"
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:opacity-50"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50"
          >
            {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </div>
              ) : (serviceToEdit ? 'Guardar Cambios' : 'Añadir Servicio')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
