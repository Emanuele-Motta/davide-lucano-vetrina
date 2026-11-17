export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  shortDescription?: string;
  fullDesc: string;
  duration: string;
  price: string;
  category: string;
  icon: string; // identifier for Lucide icon
  benefits: string[];
  indications?: string[];
  pathologyChips?: string[];
}

export interface BookingFormData {
  serviceId: string;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ConfirmedBooking extends BookingFormData {
  id: string;
  createdAt: string;
  serviceTitle: string;
  servicePrice: string;
  serviceDuration: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type ReviewSource = 'miodottore' | 'google' | 'diretta';

export interface Testimonial {
  id: string;
  name: string;
  author?: string;
  role: string;
  rating: number;
  content: string;
  treatment: string;
  date: string;
  source?: ReviewSource;
  verifiedPatient?: boolean;
  profileUrl?: string;
  verifiedBadge?: string;
}

export interface MioDottoreConfig {
  profileUrl: string;
  doctorSlug: string;
  verifiedStatus: string;
  autoFetchApiUrl?: string;
}

