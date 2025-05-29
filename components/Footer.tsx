
import React from 'react';

interface FooterProps {
  onToggleAdminMode: () => void; // Renamed for clarity from toggleAdminMode
  isAdminMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ onToggleAdminMode, isAdminMode }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-12">
      <div className="container mx-auto">
        <button
          onClick={onToggleAdminMode}
          className="text-sm text-brand-secondary hover:text-white underline mb-4"
          aria-label={isAdminMode ? "Salir del panel de administración" : "Acceder al panel de administración"}
        >
          {isAdminMode ? 'Salir del Panel de Administración' : 'Panel de Administración'}
        </button>
        <p>&copy; {new Date().getFullYear()} Peluquería Pilar Ayala. Todos los derechos reservados.</p>
        <p className="text-sm mt-1">Diseñado con <i className="fas fa-heart text-red-500"></i> para ti.</p>
      </div>
    </footer>
  );
};

export default Footer;
