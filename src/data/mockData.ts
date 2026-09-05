import { Service, Testimonial, TimeSlot } from '../types';
import { itTranslations } from '../i18n/it';
import { getAllReviews } from './reviewsConfig';
import { siteConfig } from '../config/siteConfig';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1Wt_fwtjIcEAhAChyTvASEVN8OfTOSxg4WF3Bunz7Ec6n-2pEU17d0I7wWUL8LINwVA2xnFxLIu3g9xqfWc_WJNxAjQVhTdSusfJ5tC0WxnkzOWC7r3RkSb4h_zLdn3wYJqEXQU0HnyF098mhnRSvbKmC0psdte12MXNfZjLyFJWYmSWycPkQURz5I26IsFjNXefVxyAc2zLw9mzWj7dfeHAoGk8jzJwTAzT-ePq5kDgxGywMM2XqLOc5LQ";

export const HERO_BG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA72HboJfwpGNx_IeuxhWziI3niXCw4HJR3neBpYuhMia-NSOq1lHAgazO-RCWsRo_zbjintUxGU3HHo64-T9YKfJ4wwQVe3cwOqpwZ16k_8LxVHld8AH40DhOOjOb1F3TDRZDbYMiFxlkTz4zhAs2hZ3Mn1Yfj7Xe56iQPnX_oO32WkPteXSCNoM2Fv3m0P36jLKO1qRYc29IVfB63ktRwSGYYlYD0kfbdop7oJZegZGZyLJZaW-PoEA";

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
