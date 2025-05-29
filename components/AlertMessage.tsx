
import React from 'react';

interface AlertMessageProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type, onClose }) => {
  const baseClasses = "p-4 rounded-md shadow-md flex items-start";
  const typeClasses = {
    error: "bg-red-100 border-l-4 border-red-500 text-red-700",
    success: "bg-green-100 border-l-4 border-green-500 text-green-700",
    info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
  };

  const Icon = () => {
    switch (type) {
      case 'error': return <i className="fas fa-exclamation-circle mr-3 mt-1"></i>;
      case 'success': return <i className="fas fa-check-circle mr-3 mt-1"></i>;
      case 'info': return <i className="fas fa-info-circle mr-3 mt-1"></i>;
      default: return null;
    }
  }

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type]} my-4`} role="alert">
      <Icon />
      <div className="flex-grow">
        <p className="font-semibold">
          {type === 'error' ? 'Error' : type === 'success' ? 'Éxito' : 'Información'}
        </p>
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-lg font-semibold hover:text-gray-800">&times;</button>
      )}
    </div>
  );
};

export default AlertMessage;
    