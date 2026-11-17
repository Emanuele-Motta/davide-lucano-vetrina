import { Service, Testimonial, TimeSlot } from '../types';
import { itTranslations } from '../i18n/it';
import { getAllReviews } from './reviewsConfig';
import { siteConfig } from '../config/siteConfig';
import heroBackground from '../assets/images/doctor_davide_lucano_800.webp';

export const LOGO_URL = "/logo-full.svg";
export const LOGO_ICON_URL = "/logo.svg";

export const HERO_BG_URL = heroBackground;

export const SERVICES: Service[] = itTranslations.services.items;

export const TESTIMONIALS: Testimonial[] = getAllReviews();

// Slot orari feriali standard collegati a siteConfig
export const TIME_SLOTS: TimeSlot[] = siteConfig.booking.weekdaySlots;

export const STUDIO_INFO = {
  name: siteConfig.doctor.name,
  fullName: `${siteConfig.doctor.name} - ${siteConfig.doctor.title}`,
  address: siteConfig.studio.fullAddress,
  metro: siteConfig.studio.metroInfo,
  phone: siteConfig.studio.phone,
  whatsapp: siteConfig.studio.whatsappNumber,
  email: siteConfig.studio.email,
  hours: siteConfig.studio.openingHours.map(h => ({ days: h.days, time: h.hours })),
  piva: siteConfig.studio.piva,
  director: `${siteConfig.doctor.name} - ${siteConfig.doctor.alboNumber}`
};
