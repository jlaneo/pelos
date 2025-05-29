
import React, { useState } from 'react';
import AdminAppointmentsManager from './AdminAppointmentsManager';
import AdminServicesManager from './AdminServicesManager';

interface AdminViewProps {
  onExitAdminMode: () => void;
}

type AdminTab = 'appointments' | 'services';

const AdminView: React.FC<AdminViewProps> = ({ onExitAdminMode }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('appointments');

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-brand-primary">Panel de Administración</h1>
        <button
          onClick={onExitAdminMode}
          className="bg-brand-secondary text-white py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors text-sm"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>Salir del Panel
        </button>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'appointments'
                ? 'border-brand-accent text-brand-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <i className="fas fa-calendar-check mr-2"></i>Gestionar Citas
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'services'
                ? 'border-brand-accent text-brand-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <i className="fas fa-cut mr-2"></i>Gestionar Servicios
          </button>
        </nav>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl min-h-[500px]">
        {activeTab === 'appointments' && <AdminAppointmentsManager />}
        {activeTab === 'services' && <AdminServicesManager />}
      </div>
    </div>
  );
};

export default AdminView;
