
export type ServiceCategory = 
  | 'PELUQUERIA_MUJER' 
  | 'COLOR' 
  | 'TRATAMIENTOS_CAPILARES'
  | 'PELUQUERIA_HOMBRE' 
  | 'PELUQUERIA_NINOS'
  | 'ESTETICA_FACIAL' // Example, if needed
  | 'ESTETICA_CORPORAL'; // Example, if needed

export interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: number; // in minutes
  precio: number; // in currency units
  imageUrl?: string;
  category: ServiceCategory;
}

export interface Client {
  id:string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface BookedServiceDetail {
  serviceId: string;
  serviceName: string;
  price: number;
  duration: number;
}

export interface Appointment {
  id: string;
  fechaHora: Date;
  clientName: string;
  clientLastName?: string; // Added
  clientPhone: string;
  clientEmail?: string; // Added
  bookedServices: BookedServiceDetail[];
  totalPrice: number;
  totalDuration: number;
  professionalId?: string;
  professionalName?: string;
  comments?: string; // Added
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface AvailabilitySlot {
  time: string; // e.g., "09:00"
  available: boolean;
}

export interface Professional {
  id: string;
  name: string;
}
