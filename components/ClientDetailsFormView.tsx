
import React from 'react';
import { ClientDetails } from './BookingWidget'; // Import ClientDetails type

interface ClientDetailsFormViewProps {
  clientDetails: ClientDetails;
  onClientDetailsChange: (details: ClientDetails) => void;
  isSubmitting: boolean;
}

const ClientDetailsFormView: React.FC<ClientDetailsFormViewProps> = ({
  clientDetails,
  onClientDetailsChange,
  isSubmitting,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      onClientDetailsChange({ ...clientDetails, [name]: checked });
    } else {
      onClientDetailsChange({ ...clientDetails, [name]: value });
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-6 text-center">Confirma Tus Datos</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text">Nombre *</label>
          <input type="text" name="name" id="name" value={clientDetails.name} onChange={handleChange} required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-text">Apellidos</label>
          <input type="text" name="lastName" id="lastName" value={clientDetails.lastName} onChange={handleChange}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-text">Teléfono *</label>
          <input type="tel" name="phone" id="phone" value={clientDetails.phone} onChange={handleChange} required
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text">Email</label>
          <input type="email" name="email" id="email" value={clientDetails.email} onChange={handleChange}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-brand-text">Comentarios Adicionales</label>
          <textarea name="comments" id="comments" value={clientDetails.comments} onChange={handleChange} rows={3}
                    placeholder="Alergias, preferencias, etc."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"/>
        </div>
        <div className="pt-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacyPolicyAccepted"
                name="privacyPolicyAccepted"
                type="checkbox"
                checked={clientDetails.privacyPolicyAccepted}
                onChange={handleChange}
                required
                className="focus:ring-brand-accent h-4 w-4 text-brand-accent border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="privacyPolicyAccepted" className="font-medium text-brand-text">
                He leído y acepto la <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">política de privacidad</a> *
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientDetailsFormView;
