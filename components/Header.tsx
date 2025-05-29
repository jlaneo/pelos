
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary text-white p-6 shadow-md">
      <div className="container mx-auto flex flex-col items-center text-center">
        <i className="fas fa-cut text-4xl mb-2"></i>
        <h1 className="text-4xl font-bold tracking-tight">Peluquería Pilar Ayala</h1>
        <p className="text-lg text-brand-secondary mt-1">Tu belleza, nuestra pasión.</p>
      </div>
    </header>
  );
};

export default Header;
    