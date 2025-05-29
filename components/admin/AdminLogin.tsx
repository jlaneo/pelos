
import React, { useState } from 'react';
import AlertMessage from '../AlertMessage';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void; // To return to client view
}

const ADMIN_PASSWORD = "peluqueria"; // Hardcoded password

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API call for password check
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-brand-primary text-center mb-6">Acceso al Panel de Administración</h2>
        {error && <AlertMessage message={error} type="error" onClose={() => setError(null)} />}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-text">
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </div>
              ) : 'Entrar'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={onGoBack}
            className="text-sm text-brand-secondary hover:underline"
          >
            Volver al sitio principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
