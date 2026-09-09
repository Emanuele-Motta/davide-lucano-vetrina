import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { AboutSection } from './components/AboutSection';
import { TerritorySection } from './components/TerritorySection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { CookiePreferencesButton } from './components/CookiePreferencesButton';
import { useBookingToggle } from './context/FeatureToggleContext';
import { ConfirmedBooking, Service } from './types';
import { SERVICES } from './data/mockData';
import { useTranslation } from './i18n';
import { getOrderedSections, SiteSectionKey, siteConfig } from './config/siteConfig';
import { initializeAnalyticsIfConsented } from './services/cookieConsent';
import { injectDynamicStructuredData } from './utils/seoStructuredData';
import { setLenisInstance } from './utils/lenis';
import Lenis from 'lenis';

// Code-splitting of modals to minimize initial bundle size and optimize Core Web Vitals
const BookingSuccessModal = lazy(() =>
  import('./components/BookingSuccessModal').then((m) => ({ default: m.BookingSuccessModal }))
);
const BookingsListModal = lazy(() =>
  import('./components/BookingsListModal').then((m) => ({ default: m.BookingsListModal }))
);
const ServiceDetailModal = lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({ default: m.ServiceDetailModal }))
);
const LegalModal = lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);

const STORAGE_KEY = 'studio_milano_user_bookings';

export default function App() {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  // Selected service for the booking form
  const [selectedServiceId, setSelectedServiceId] = useState<string>('terapia-manuale');

  // Stored user bookings
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [newlyConfirmedBooking, setNewlyConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [isBookingsListOpen, setIsBookingsListOpen] = useState(false);
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'cookies' | 'terms' | null>(null);
  const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] = useState(false);

  // Initial loading state to show skeleton placeholders during initial load
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { offset: -90 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Inietta / aggiorna dinamicamente i dati strutturati Schema.org (JSON-LD)
    injectDynamicStructuredData();

    // Check and initialize analytics only if previous consent exists
    initializeAnalyticsIfConsented(siteConfig.analytics.gaMeasurementId);

    const handleConsentUpdate = () => {
      initializeAnalyticsIfConsented(siteConfig.analytics.gaMeasurementId);
    };
    window.addEventListener('cookie_consent_updated', handleConsentUpdate);

    // Brief initial load simulation to provide seamless perceived performance
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 600);

    return () => {
      window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings in localStorage', e);
    }
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('prenota');
    const srv = SERVICES.find(s => s.id === serviceId);
    if (srv) {
      if (isBookingEnabled) {
        showToast(`Selezionato: ${srv.title}. Scegli data e orario nel calendario.`);
      } else {
        showToast(`Selezionato: ${srv.title}. Contatta lo studio per concordare la visita.`);
      }
    }
  };

  const handleBookingConfirmed = (booking: ConfirmedBooking) => {
    setBookings(prev => [booking, ...prev]);
    setNewlyConfirmedBooking(booking);
    showToast(`Prenotazione confermata per il ${booking.selectedDate}!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast(t.modals.bookingsList.cancelSuccess);
  };

  // Sezioni abilitate e ordinate dinamicamente in base a siteConfig.sections
  const orderedSections = getOrderedSections();

  const renderSection = (key: SiteSectionKey) => {
    switch (key) {
      case 'hero':
        return (
          <Hero 
            key="hero"
            onBookClick={() => scrollToSection('prenota')}
            onExploreAbout={() => scrollToSection('chi-sono')}
            onExploreServices={() => scrollToSection('servizi')}
          />
        );
      case 'about':
        return (
          <AboutSection 
            key="about"
            onExploreServices={() => scrollToSection('servizi')}
            onBookClick={() => scrollToSection('prenota')}
          />
        );
      case 'services':
        return (
          <ServicesSection 
            key="services"
            isLoading={isInitialLoading}
            onSelectServiceForBooking={handleSelectServiceFromCard}
            onOpenServiceDetails={(service) => setActiveServiceDetail(service)}
          />
        );
      case 'territory':
        return (
          <TerritorySection 
            key="territory"
            onBookClick={() => scrollToSection('prenota')} 
          />
        );
      case 'reviews':
        return (
          <ReviewsSection 
            key="reviews"
            isLoading={isInitialLoading} 
          />
        );
      case 'booking':
        return (
          <BookingSection 
            key="booking"
            selectedServiceId={selectedServiceId}
            onServiceChange={(id) => setSelectedServiceId(id)}
            onBookingConfirmed={handleBookingConfirmed}
            onOpenPrivacy={() => setLegalModalType('privacy')}
          />
        );
      case 'location':
        return (
          <LocationSection 
            key="location"
          />
        );
      case 'faq':
        return (
          <FaqSection 
            key="faq"
            onBookClick={() => scrollToSection('prenota')} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f] flex flex-col font-sans antialiased">
      
      {/* Skip to main content link for screen readers & keyboard accessibility (WCAG 2.1 AAA) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full font-medium shadow-2xl ring-2 ring-[#006875] focus:outline-hidden text-[13px]"
      >
        Salta direttamente al contenuto principale
      </a>

      {/* Toast notification */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1d1d1f] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[13.5px] font-medium tracking-tight">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar 
        onBookClick={() => scrollToSection('prenota')}
        bookingCount={bookings.length}
        onViewBookings={() => setIsBookingsListOpen(true)}
      />

      {/* Main Content Sections with Accessible Landmark */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-hidden">
        {orderedSections.map(({ key }) => renderSection(key))}
      </main>

      {/* Footer */}
      <Footer 
        onOpenLegal={(type) => setLegalModalType(type)} 
        onOpenCookiePreferences={() => setIsCookiePreferencesOpen(true)}
      />

      {/* Lazy Loaded Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {isBookingEnabled && newlyConfirmedBooking && (
          <BookingSuccessModal 
            booking={newlyConfirmedBooking}
            onClose={() => setNewlyConfirmedBooking(null)}
          />
        )}

        {isBookingEnabled && isBookingsListOpen && (
          <BookingsListModal 
            bookings={bookings}
            onClose={() => setIsBookingsListOpen(false)}
            onCancelBooking={handleCancelBooking}
            onNewBookingClick={() => scrollToSection('prenota')}
          />
        )}

        {activeServiceDetail && (
          <ServiceDetailModal 
            service={activeServiceDetail}
            onClose={() => setActiveServiceDetail(null)}
            onBookThisService={handleSelectServiceFromCard}
          />
        )}

        {legalModalType && (
          <LegalModal 
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
            onOpenCookiePreferences={() => setIsCookiePreferencesOpen(true)}
          />
        )}
      </Suspense>

      {/* Cookie Banner & Consent Management (Garante Privacy & GDPR 2021) */}
      <CookieBanner 
        onOpenLegal={(type) => setLegalModalType(type)}
        forceOpen={isCookiePreferencesOpen}
        onCloseForceOpen={() => setIsCookiePreferencesOpen(false)}
      />

      {/* Persistent Cookie Preferences Trigger */}
      <CookiePreferencesButton 
        onClick={() => setIsCookiePreferencesOpen(true)}
      />

    </div>
  );
}
