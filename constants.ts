
import { Service, ServiceCategory, Professional } from './types';

export const SERVICE_CATEGORIES_ORDERED: { key: ServiceCategory, name: string }[] = [
  { key: 'PELUQUERIA_MUJER', name: 'Peluquería Mujer' },
  { key: 'COLOR', name: 'Color' },
  { key: 'TRATAMIENTOS_CAPILARES', name: 'Tratamientos Capilares' },
  { key: 'PELUQUERIA_HOMBRE', name: 'Peluquería Hombre' },
  { key: 'PELUQUERIA_NINOS', name: 'Peluquería Niños' },
];

export const MOCK_SERVICES: Service[] = [
  // PELUQUERÍA MUJER
  {
    id: 'mujer_lavar_secar_corto',
    nombre: 'Lavar y Secar Pelo Corto',
    descripcion: 'Lavado y secado para cabello corto de mujer.',
    duracion: 30,
    precio: 17,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,short hair,salon',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_secar_medio',
    nombre: 'Lavar y Secar Pelo Medio',
    descripcion: 'Lavado y secado para cabello de longitud media de mujer.',
    duracion: 40,
    precio: 20,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,medium hair,styling',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_secar_largo',
    nombre: 'Lavar y Secar Pelo Largo',
    descripcion: 'Lavado y secado para cabello largo de mujer.',
    duracion: 50,
    precio: 23,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,long hair,blowout',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_peinar_corto',
    nombre: 'Lavar y Peinar Pelo Corto',
    descripcion: 'Lavado y peinado profesional para cabello corto de mujer.',
    duracion: 45,
    precio: 25,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,short hairstyle,hair salon',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_peinar_medio',
    nombre: 'Lavar y Peinar Pelo Medio',
    descripcion: 'Lavado y peinado profesional para cabello de longitud media de mujer.',
    duracion: 55,
    precio: 29,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,medium hairstyle,professional hairstyling',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_peinar_largo',
    nombre: 'Lavar y Peinar Pelo Largo',
    descripcion: 'Lavado y peinado profesional para cabello largo de mujer.',
    duracion: 65,
    precio: 32,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,long hairstyle,elegant hair',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_corte',
    nombre: 'Lavar y Corte',
    descripcion: 'Lavado y corte de cabello para mujer. No incluye peinado elaborado.',
    duracion: 45,
    precio: 20,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,haircut,scissors',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_corte_secar',
    nombre: 'Lavar, Corte y Secar',
    descripcion: 'Servicio completo de lavado, corte y secado para mujer.',
    duracion: 60,
    precio: 35,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,haircut,blowdry',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_lavar_corte_peinar',
    nombre: 'Lavar, Corte y Peinar',
    descripcion: 'Servicio completo de lavado, corte y peinado profesional para mujer.',
    duracion: 75,
    precio: 40,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,full haircut,styling session',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_recogido',
    nombre: 'Recogido',
    descripcion: 'Peinado recogido para eventos especiales. Precio base, puede variar.',
    duracion: 90,
    precio: 40,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,updo,event hairstyle',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_semirecogido',
    nombre: 'Semirecogido',
    descripcion: 'Peinado semirecogido, ideal para un look elegante y casual. Precio base.',
    duracion: 75,
    precio: 35,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?woman,half-updo,bridal hair',
    category: 'PELUQUERIA_MUJER'
  },
  {
    id: 'mujer_trenzas',
    nombre: 'Trenzas',
    descripcion: 'Elaboración de trenzas. Precio base, varía según complejidad.',
    duracion: 60,
    precio: 20,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?braids,hairstyle,woman',
    category: 'PELUQUERIA_MUJER'
  },

  // COLOR
  {
    id: 'color_tinte',
    nombre: 'Color / Tinte',
    descripcion: 'Aplicación de color o tinte en el cabello.',
    duracion: 90,
    precio: 32,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair color,hair dyeing,salon',
    category: 'COLOR'
  },
  {
    id: 'color_tinte_sin_amoniaco',
    nombre: 'Color / Tinte Sin Amoniaco',
    descripcion: 'Aplicación de color o tinte sin amoniaco, más suave para tu cabello.',
    duracion: 90,
    precio: 35,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?ammonia-free hair color,natural hair dye',
    category: 'COLOR'
  },
  {
    id: 'color_bano_de_color',
    nombre: 'Color / Baño de Color',
    descripcion: 'Baño de color para reavivar el tono y aportar brillo.',
    duracion: 75,
    precio: 27,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair gloss,color treatment,shiny hair',
    category: 'COLOR'
  },
  {
    id: 'color_mechas_tradicionales',
    nombre: 'Mechas Tradicionales',
    descripcion: 'Realización de mechas con técnica tradicional.',
    duracion: 120,
    precio: 42,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair highlights,foil,salon highlights',
    category: 'COLOR'
  },
  {
    id: 'color_mechas_balayage_babylight',
    nombre: 'Mechas Balayage / Babylight',
    descripcion: 'Técnicas de mechas Balayage o Babylight para un look natural y luminoso. Precio base.',
    duracion: 180,
    precio: 70,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?balayage,babylights,hair painting',
    category: 'COLOR'
  },
  {
    id: 'color_decoloracion',
    nombre: 'Decoloración',
    descripcion: 'Proceso de decoloración del cabello. Precio base, según necesidad.',
    duracion: 120,
    precio: 40,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair bleaching,blonde,lighten hair',
    category: 'COLOR'
  },
  {
    id: 'color_matiz',
    nombre: 'Matiz',
    descripcion: 'Aplicación de matiz para corregir o neutralizar tonos no deseados.',
    duracion: 30,
    precio: 18,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair toner,color correction,ash blonde',
    category: 'COLOR'
  },
  {
    id: 'color_olaplex',
    nombre: 'Tratamiento Olaplex (en coloración)',
    descripcion: 'Tratamiento Olaplex para proteger y reparar el cabello durante procesos químicos.',
    duracion: 20, 
    precio: 25,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?olaplex,hair repair,bond treatment',
    category: 'COLOR'
  },

  // TRATAMIENTOS
  {
    id: 'tratamiento_hidratacion',
    nombre: 'Tratamiento de Hidratación',
    descripcion: 'Tratamiento intensivo para hidratar profundamente el cabello.',
    duracion: 45,
    precio: 25,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hydrating hair mask,deep conditioning,hair spa',
    category: 'TRATAMIENTOS_CAPILARES'
  },
  {
    id: 'tratamiento_reconstruccion',
    nombre: 'Tratamiento de Reconstrucción',
    descripcion: 'Tratamiento reparador para cabello dañado, fortaleciendo la fibra capilar.',
    duracion: 60,
    precio: 30,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?hair reconstruction,protein treatment,damaged hair care',
    category: 'TRATAMIENTOS_CAPILARES'
  },
  {
    id: 'tratamiento_keratina',
    nombre: 'Tratamiento de Keratina',
    descripcion: 'Alisado y tratamiento de keratina para reducir el frizz y suavizar. Precio base.',
    duracion: 180,
    precio: 120,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?keratin treatment,hair smoothing,frizz control',
    category: 'TRATAMIENTOS_CAPILARES'
  },

  // PELUQUERÍA HOMBRE
  {
    id: 'hombre_lavar_corte',
    nombre: 'Lavar y Corte (Hombre)',
    descripcion: 'Lavado y corte de cabello para hombre.',
    duracion: 30,
    precio: 19,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?men haircut,barber shop,male grooming',
    category: 'PELUQUERIA_HOMBRE'
  },
  {
    id: 'hombre_corte_degradado',
    nombre: 'Corte Degradado (Hombre)',
    descripcion: 'Corte de cabello con técnica de degradado para hombre.',
    duracion: 45,
    precio: 22,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?men fade haircut,taper fade,barber style',
    category: 'PELUQUERIA_HOMBRE'
  },
  {
    id: 'hombre_arreglo_barba',
    nombre: 'Arreglo de Barba',
    descripcion: 'Perfilado y arreglo de barba.',
    duracion: 20,
    precio: 10,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?beard trim,beard grooming,barber razor',
    category: 'PELUQUERIA_HOMBRE'
  },
  {
    id: 'hombre_afeitado',
    nombre: 'Afeitado Clásico',
    descripcion: 'Afeitado tradicional con navaja o maquinilla.',
    duracion: 30,
    precio: 15,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?classic shave,straight razor,barber shave',
    category: 'PELUQUERIA_HOMBRE'
  },
  {
    id: 'hombre_color',
    nombre: 'Color (Hombre)',
    descripcion: 'Aplicación de color o tinte para hombre.',
    duracion: 60,
    precio: 25,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?men hair color,men dye,male hair fashion',
    category: 'PELUQUERIA_HOMBRE'
  },

  // PELUQUERÍA NIÑOS
  {
    id: 'ninos_corte',
    nombre: 'Corte Niño/a',
    descripcion: 'Corte de cabello para niños y niñas.',
    duracion: 30,
    precio: 15,
    imageUrl: 'https://source.unsplash.com/featured/300x200/?child haircut,kids salon,children hairstyle',
    category: 'PELUQUERIA_NINOS'
  }
];

export const MOCK_PROFESSIONALS: Professional[] = [
  { id: 'any', name: 'Cualquier Profesional' },
  { id: 'pilar', name: 'Pilar Ayala' },
  { id: 'laura', name: 'Laura Gómez' },
  { id: 'carlos', name: 'Carlos Fernández' },
];

export const TIME_SLOTS_TEMPLATE: string[] = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];
