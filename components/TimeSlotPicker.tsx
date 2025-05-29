import React from 'react';
import { AvailabilitySlot } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface TimeSlotPickerProps {
  availability: AvailabilitySlot[];
  isLoading: boolean;
  error: string | null;
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
  selectedDate: Date | null; // To know if we should render
  selectedServiceId: string | null; // To know if we should render
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  availability,
  isLoading,
  error,
  selectedTime,
  onTimeChange,
  selectedDate,
  selectedServiceId
}) => {
  if (!selectedDate || !selectedServiceId) {
    return null; // Don't render if no date or service is selected
  }

  if (isLoading) {
    return <LoadingSpinner text="Cargando horarios..." size="sm" />;
  }
  if (error) {
    return <p className="text-red-500 text-sm py-2">{error}</p>;
  }

  if (availability.length === 0) {
    return <p className="text-brand-text mt-2 text-sm py-2">No hay horarios disponibles para este día. Por favor, selecciona otra fecha.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {availability.map((slot) => (
          <button
            key={slot.time}
            onClick={() => onTimeChange(slot.time)}
            disabled={!slot.available}
            className={`p-2.5 border rounded-md text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent
              ${slot.available 
                ? (selectedTime === slot.time 
                    ? 'bg-brand-primary text-white scale-105 shadow-md ring-2 ring-brand-primary ring-offset-1' 
                    : 'bg-white hover:bg-brand-secondary hover:text-white border-gray-300') 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
      {availability.every(slot => !slot.available) && (
         <p className="text-brand-text mt-2 text-sm">Todos los horarios para este día están ocupados. Por favor, selecciona otra fecha.</p>
      )}
    </div>
  );
};

export default TimeSlotPicker;