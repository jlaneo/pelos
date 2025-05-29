
import { Service, Appointment, AvailabilitySlot, Professional, BookedServiceDetail } from '../types';
import { MOCK_SERVICES as initialMockServices, TIME_SLOTS_TEMPLATE, MOCK_PROFESSIONALS } from '../constants';

// Simulate API delay
const apiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let MOCK_SERVICES: Service[] = [...initialMockServices]; // Make services mutable
let mockAppointments: Appointment[] = [];

export const fetchServices = async (): Promise<Service[]> => {
  await apiDelay(300);
  return [...MOCK_SERVICES]; // Return a copy
};

export const fetchProfessionals = async (): Promise<Professional[]> => {
  await apiDelay(100);
  return [...MOCK_PROFESSIONALS];
};

export const addService = async (serviceData: Omit<Service, 'id'>): Promise<Service> => {
  await apiDelay(400);
  const newService: Service = {
    ...serviceData,
    id: Math.random().toString(36).substr(2, 9),
  };
  MOCK_SERVICES.push(newService);
  return newService;
};

export const updateService = async (serviceId: string, serviceData: Partial<Omit<Service, 'id'>>): Promise<Service | null> => {
  await apiDelay(400);
  const serviceIndex = MOCK_SERVICES.findIndex(s => s.id === serviceId);
  if (serviceIndex > -1) {
    MOCK_SERVICES[serviceIndex] = { ...MOCK_SERVICES[serviceIndex], ...serviceData };
    return MOCK_SERVICES[serviceIndex];
  }
  return null;
};

export const deleteService = async (serviceId: string): Promise<void> => {
  await apiDelay(300);
  MOCK_SERVICES = MOCK_SERVICES.filter(s => s.id !== serviceId);
};


export const fetchAvailability = async (date: Date, totalDuration: number, professionalId?: string): Promise<AvailabilitySlot[]> => {
  await apiDelay(700);
  console.log(`Fetching availability for date: ${date.toDateString()}, duration: ${totalDuration}min, professional: ${professionalId || 'Any'}`);
  // Mock logic: less availability if duration is longer
  const availabilityFactor = Math.max(0.2, 1 - (totalDuration / 240)); // e.g. 4hr service has low availability factor

  return TIME_SLOTS_TEMPLATE.map(time => ({
    time,
    available: Math.random() < (0.6 * availabilityFactor) // Random availability, influenced by duration
  }));
};

export const createAppointment = async (
  appointmentData: Omit<Appointment, 'id' | 'status'>
): Promise<Appointment> => {
  await apiDelay(1000);
  const newAppointment: Appointment = {
    ...appointmentData,
    id: Math.random().toString(36).substr(2, 9),
    status: 'confirmed', 
  };
  mockAppointments.push(newAppointment);
  console.log('Mock appointments:', mockAppointments);
  return newAppointment;
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  await apiDelay(600);
  return [...mockAppointments].sort((a,b) => a.fechaHora.getTime() - b.fechaHora.getTime()); 
};

export const updateAppointmentStatus = async (appointmentId: string, status: Appointment['status']): Promise<Appointment | null> => {
  await apiDelay(400);
  const appointmentIndex = mockAppointments.findIndex(a => a.id === appointmentId);
  if (appointmentIndex > -1) {
    mockAppointments[appointmentIndex].status = status;
    return mockAppointments[appointmentIndex];
  }
  return null;
};
