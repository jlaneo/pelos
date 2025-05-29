
import React, { useState, useEffect, useCallback } from 'react';
import { Service, Appointment, AvailabilitySlot } from '../types';
// import { createAppointment, fetchServiceById, fetchAvailability } from '../services/apiService'; // Imports for old logic
import TimeSlotPicker from './TimeSlotPicker';
import LoadingSpinner from './LoadingSpinner';
import AlertMessage from './AlertMessage';

interface BookingProcessViewProps {
  serviceToBook: Service; // This was for a single service
  onBookingComplete: (appointment: Appointment) => void;
  onBookingError: (error: string) => void;
  onCancel: () => void;
}

// This component is no longer used in the primary client booking flow.
// It has been replaced by ProfessionalDateTimeView.tsx and ClientDetailsFormView.tsx.
// It can be removed or repurposed.

const BookingProcessView: React.FC<BookingProcessViewProps> = ({ 
  serviceToBook, 
  onBookingComplete, 
  onBookingError,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // ... (rest of the old state and logic) ...

  // Return a placeholder or null as this view is obsolete for the new flow
  return (
    <div className="p-6">
      <h2 className="text-xl text-red-500">Old Booking Process View - Obsolete</h2>
      <p>This view has been replaced by a new multi-step booking process.</p>
      <button onClick={onCancel} className="mt-4 bg-gray-200 p-2 rounded">Back (Test)</button>
    </div>
  );
};

export default BookingProcessView;
