
import React, { useState, useEffect, useCallback } from 'react';
import { Service, Appointment, Professional, BookedServiceDetail, AvailabilitySlot } from '../types';
import { fetchServices, createAppointment, fetchAppointments, fetchProfessionals, fetchAvailability } from '../services/apiService';

import BookingSidebar from './BookingSidebar';
import ServiceSelectionView from './ServiceSelectionView';
import ProfessionalDateTimeView from './ProfessionalDateTimeView';
import ClientDetailsFormView from './ClientDetailsFormView';
import ConfirmationView from './ConfirmationView';

import LoadingSpinner from './LoadingSpinner';
import AlertMessage from './AlertMessage';
import AppointmentsList from './AppointmentsList';
import { SERVICE_CATEGORIES_ORDERED } from '../constants';


type BookingStep = 'SERVICE_SELECTION' | 'PROFESSIONAL_DATE_TIME' | 'CLIENT_DETAILS' | 'CONFIRMATION';

export interface ClientDetails {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  comments: string;
  privacyPolicyAccepted: boolean;
}

const BookingWidget: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('SERVICE_SELECTION');
  
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [allProfessionals, setAllProfessionals] = useState<Professional[]>([]);
  
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '', lastName: '', phone: '', email: '', comments: '', privacyPolicyAccepted: false
  });

  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  const loadInitialData = useCallback(async () => {
    setIsLoadingInitialData(true);
    setGlobalError(null);
    try {
      const [servicesData, professionalsData] = await Promise.all([
        fetchServices(),
        fetchProfessionals()
      ]);
      setAllServices(servicesData);
      setAllProfessionals(professionalsData);
      if (professionalsData.length > 0) {
        setSelectedProfessional(professionalsData.find(p => p.id === 'any') || professionalsData[0]); // Default to 'any' or first
      }
    } catch (err) {
      setGlobalError('Error al cargar datos iniciales. Inténtalo de nuevo más tarde.');
      console.error(err);
    } finally {
      setIsLoadingInitialData(false);
    }
  }, []);
  
  const loadAppointments = useCallback(async () => {
    setIsLoadingAppointments(true);
    try {
      const apps = await fetchAppointments();
      setBookedAppointments(apps);
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setIsLoadingAppointments(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
    loadAppointments();
  }, [loadInitialData, loadAppointments]);

  useEffect(() => {
    const newTotalPrice = selectedServices.reduce((sum, srv) => sum + srv.precio, 0);
    const newTotalDuration = selectedServices.reduce((sum, srv) => sum + srv.duracion, 0);
    setTotalPrice(newTotalPrice);
    setTotalDuration(newTotalDuration);
    // If services change, reset date/time as availability might differ
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailability([]);
  }, [selectedServices]);

  const handleAddService = (service: Service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };
  
  const getProfessionalName = (profId?: string) => {
    return allProfessionals.find(p => p.id === profId)?.name || 'Cualquiera';
  }

  const handleGetAvailability = useCallback(async () => {
    if (!selectedDate || totalDuration === 0) {
      setAvailability([]);
      return;
    }
    setIsLoadingAvailability(true);
    setAvailabilityError(null);
    try {
      const data = await fetchAvailability(selectedDate, totalDuration, selectedProfessional?.id);
      setAvailability(data);
       if (data.every(slot => !slot.available) && data.length > 0) {
        setAvailabilityError('No hay horarios disponibles. Prueba otra fecha o profesional.');
      }
    } catch (err) {
      setAvailabilityError('No se pudo cargar la disponibilidad.');
      console.error(err);
    } finally {
      setIsLoadingAvailability(false);
    }
  }, [selectedDate, totalDuration, selectedProfessional]);

  useEffect(() => {
    if (currentStep === 'PROFESSIONAL_DATE_TIME' && selectedDate && totalDuration > 0) {
      handleGetAvailability();
    }
  }, [currentStep, selectedDate, totalDuration, selectedProfessional, handleGetAvailability]);


  const handleDateTimeSelectionComplete = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('CLIENT_DETAILS');
       window.scrollTo(0, 0);
    } else {
      // This should be handled by disabling the button in ProfessionalDateTimeView
      console.error("Date or Time not selected");
    }
  };
  
  const resetBookingProcess = () => {
      setSelectedServices([]);
      setSelectedProfessional(allProfessionals.find(p => p.id === 'any') || allProfessionals[0] || null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailability([]);
      setClientDetails({ name: '', lastName: '', phone: '', email: '', comments: '', privacyPolicyAccepted: false });
      setConfirmedAppointment(null);
      setGlobalError(null);
      setCurrentStep('SERVICE_SELECTION');
      window.scrollTo(0, 0);
  };

  const handleFinalSubmit = async () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      setGlobalError("Faltan detalles de la reserva.");
      return;
    }
    setIsSubmittingBooking(true);
    setGlobalError(null);

    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const bookedServicesDetails: BookedServiceDetail[] = selectedServices.map(s => ({
      serviceId: s.id,
      serviceName: s.nombre,
      price: s.precio,
      duration: s.duracion
    }));

    try {
      const newAppointmentData: Omit<Appointment, 'id' | 'status'> = {
        fechaHora: appointmentDateTime,
        clientName: clientDetails.name,
        clientLastName: clientDetails.lastName,
        clientPhone: clientDetails.phone,
        clientEmail: clientDetails.email,
        bookedServices: bookedServicesDetails,
        totalPrice,
        totalDuration,
        professionalId: selectedProfessional?.id === 'any' ? undefined : selectedProfessional?.id,
        professionalName: selectedProfessional?.id === 'any' ? 'Cualquiera' : selectedProfessional?.name,
        comments: clientDetails.comments,
      };
      const appointment = await createAppointment(newAppointmentData);
      setConfirmedAppointment(appointment);
      setCurrentStep('CONFIRMATION');
      loadAppointments(); // Refresh appointments list
    } catch (err) {
      setGlobalError('Error al confirmar la reserva. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmittingBooking(false);
       window.scrollTo(0, 0);
    }
  };
  
  const renderStepView = () => {
    if (isLoadingInitialData) {
      return <div className="p-10 flex justify-center items-center min-h-[400px]"><LoadingSpinner text="Cargando configuraciónde reservas..." /></div>;
    }
     if (globalError && currentStep !== 'CONFIRMATION') {
        return <div className="p-4"><AlertMessage message={globalError} type="error" onClose={() => setGlobalError(null)} /></div>;
    }

    switch (currentStep) {
      case 'SERVICE_SELECTION':
        return <ServiceSelectionView 
                  services={allServices}
                  categories={SERVICE_CATEGORIES_ORDERED}
                  selectedServices={selectedServices}
                  onAddService={handleAddService}
                  onRemoveService={handleRemoveService}
                />;
      case 'PROFESSIONAL_DATE_TIME':
        return <ProfessionalDateTimeView
                  professionals={allProfessionals}
                  selectedProfessional={selectedProfessional}
                  onProfessionalChange={setSelectedProfessional}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  availability={availability}
                  isLoadingAvailability={isLoadingAvailability}
                  availabilityError={availabilityError}
                  totalDuration={totalDuration}
                  onClearAvailabilityError={() => setAvailabilityError(null)}
                />;
      case 'CLIENT_DETAILS':
        return <ClientDetailsFormView
                  clientDetails={clientDetails}
                  onClientDetailsChange={setClientDetails}
                  isSubmitting={isSubmittingBooking}
                />;
      case 'CONFIRMATION':
        if (!confirmedAppointment) {
            // Should not happen, but as a fallback
            return <div className="p-4"><AlertMessage message="Error: No se encontró la confirmación de la reserva." type="error" /></div>;
        }
        return <ConfirmationView 
                  appointment={confirmedAppointment} 
                  onNewBooking={resetBookingProcess} 
                />;
      default:
        return <p>Error: Paso desconocido.</p>;
    }
  };
  
  const sidebarButtonAction = () => {
    setGlobalError(null); // Clear global errors on step change attempt
    if (currentStep === 'SERVICE_SELECTION') setCurrentStep('PROFESSIONAL_DATE_TIME');
    else if (currentStep === 'PROFESSIONAL_DATE_TIME') handleDateTimeSelectionComplete();
    else if (currentStep === 'CLIENT_DETAILS') handleFinalSubmit();
     window.scrollTo(0, 0);
  };

  const getSidebarButtonText = () => {
    if (currentStep === 'SERVICE_SELECTION') return 'Elegir Profesional y Fecha';
    if (currentStep === 'PROFESSIONAL_DATE_TIME') return 'Continuar';
    if (currentStep === 'CLIENT_DETAILS') return 'Confirmar Reserva';
    return '';
  }

  const isSidebarButtonDisabled = () => {
    if (currentStep === 'SERVICE_SELECTION' && selectedServices.length === 0) return true;
    if (currentStep === 'PROFESSIONAL_DATE_TIME' && (!selectedDate || !selectedTime || isLoadingAvailability)) return true;
    if (currentStep === 'CLIENT_DETAILS' && (!clientDetails.name || !clientDetails.phone || !clientDetails.privacyPolicyAccepted || isSubmittingBooking)) return true;
    return false;
  }
  
  const handleGoBack = () => {
    setGlobalError(null);
    if (currentStep === 'PROFESSIONAL_DATE_TIME') {
      setCurrentStep('SERVICE_SELECTION');
    } else if (currentStep === 'CLIENT_DETAILS') {
      setCurrentStep('PROFESSIONAL_DATE_TIME');
    }
     window.scrollTo(0, 0);
  }


  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className={`lg:w-2/3 ${currentStep === 'CONFIRMATION' ? 'lg:w-full' : ''}`}>
          {/* Main content area */}
          <div className="p-4 sm:p-6 min-h-[calc(100vh-250px)]"> {/* Adjust min-height as needed */}
             {currentStep !== 'SERVICE_SELECTION' && currentStep !== 'CONFIRMATION' && (
                <button onClick={handleGoBack} className="mb-4 text-sm text-brand-accent hover:underline flex items-center">
                    <i className="fas fa-arrow-left mr-2"></i> Volver
                </button>
            )}
            {renderStepView()}
          </div>
        </div>
        
        {currentStep !== 'CONFIRMATION' && (
          <div className="lg:w-1/3 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
            {/* Sidebar */}
            <BookingSidebar
              selectedServices={selectedServices}
              totalPrice={totalPrice}
              totalDuration={totalDuration}
              onRemoveService={handleRemoveService}
              buttonText={getSidebarButtonText()}
              onButtonClick={sidebarButtonAction}
              isButtonDisabled={isSidebarButtonDisabled()}
              isLoading={currentStep === 'CLIENT_DETAILS' && isSubmittingBooking}
              currentStep={currentStep}
              selectedProfessionalName={selectedProfessional?.name}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        )}
      </div>
      
      {/* Appointments List (outside the main booking flow card) */}
       <div className="max-w-4xl mx-auto mt-12">
        {isLoadingAppointments ? (
          <LoadingSpinner text="Cargando tus citas..." />
        ) : (
          <AppointmentsList appointments={bookedAppointments} />
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
