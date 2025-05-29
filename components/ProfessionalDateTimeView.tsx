
import React from 'react';
import { Professional, AvailabilitySlot } from '../types';
import TimeSlotPicker from './TimeSlotPicker';
import AlertMessage from './AlertMessage'; // For availability errors

interface ProfessionalDateTimeViewProps {
  professionals: Professional[];
  selectedProfessional: Professional | null;
  onProfessionalChange: (professional: Professional | null) => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  selectedTime: string | null;
  onTimeChange: (time: string | null) => void;
  availability: AvailabilitySlot[];
  isLoadingAvailability: boolean;
  availabilityError: string | null;
  totalDuration: number;
  onClearAvailabilityError: () => void;
}

const ProfessionalDateTimeView: React.FC<ProfessionalDateTimeViewProps> = ({
  professionals,
  selectedProfessional,
  onProfessionalChange,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  availability,
  isLoadingAvailability,
  availabilityError,
  totalDuration,
  onClearAvailabilityError,
}) => {

  const minDate = new Date();
  minDate.setHours(0,0,0,0);

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    // Ensure date is treated as local for input[type=date]
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return localDate.toISOString().split('T')[0];
  };

  const handleDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.valueAsDate;
    if (dateValue) {
      // Compensate for timezone offset from input[type=date]
      const adjustedDate = new Date(dateValue.getTime() + dateValue.getTimezoneOffset() * 60000);
      onDateChange(adjustedDate);
    } else {
      onDateChange(null);
    }
    onTimeChange(null); // Reset time when date changes
    onClearAvailabilityError();
  };
  
  const handleProfessionalSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const profId = event.target.value;
    const prof = professionals.find(p => p.id === profId) || null;
    onProfessionalChange(prof);
    onTimeChange(null); // Reset time
    onClearAvailabilityError();
  };


  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-6 text-center">Elige Profesional y Fecha</h1>

      {/* Professional Selection */}
      <div className="mb-6">
        <label htmlFor="professional" className="block text-sm font-semibold text-brand-text mb-1">
          <i className="fas fa-user-tie mr-2 text-brand-secondary"></i>Elige profesional
        </label>
        <select
          id="professional"
          value={selectedProfessional?.id || ''}
          onChange={handleProfessionalSelectChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm"
        >
          {professionals.map(prof => (
            <option key={prof.id} value={prof.id}>{prof.name}</option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label htmlFor="date-picker" className="block text-sm font-semibold text-brand-text mb-1">
          <i className="far fa-calendar-alt mr-2 text-brand-secondary"></i>Elige fecha
        </label>
        <input 
          type="date" 
          id="date-picker" 
          value={formatDateForInput(selectedDate)}
          min={formatDateForInput(minDate)}
          onChange={handleDateInputChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary text-sm appearance-none"
          aria-label="Seleccionar fecha"
          disabled={totalDuration === 0}
        />
        {totalDuration === 0 && <p className="text-xs text-red-500 mt-1">Por favor, selecciona al menos un servicio primero.</p>}
      </div>

      {/* Time Selection */}
      {selectedDate && totalDuration > 0 && (
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2">
             <i className="far fa-clock mr-2 text-brand-secondary"></i>Elige la hora (Duración estimada: {totalDuration} min)
          </label>
           {availabilityError && !isLoadingAvailability && (
            <AlertMessage message={availabilityError} type="error" onClose={onClearAvailabilityError} />
          )}
          <TimeSlotPicker 
            availability={availability}
            isLoading={isLoadingAvailability}
            error={null} // Error is handled by AlertMessage above
            selectedTime={selectedTime}
            onTimeChange={onTimeChange}
            selectedDate={selectedDate} // Pass selectedDate for context
            selectedServiceId={"multi-service"} // Pass a generic ID or handle differently if needed
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionalDateTimeView;
