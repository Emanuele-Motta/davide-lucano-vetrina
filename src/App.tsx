import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar, Footer } from './components/layout';
import { 
  Hero, 
  AboutSection, 
  ServicesSection, 
  BookingSection, 
  ReviewsSection, 
  LocationSection, 
  FaqSection 
} from './sections';
import { CookieBanner } from './components/CookieBanner';
import { CookiePreferencesButton } from './components/CookiePreferencesButton';
import { useBookingToggle } from './context/FeatureToggleContext';
import { ConfirmedBooking } from './types';
import { useTranslation } from './i18n';
import { getOrderedSections, SiteSectionKey, siteConfig } from './config/siteConfig';
import { initializeAnalyticsIfConsented } from './services/cookieConsent';
import { injectDynamicStructuredData } from './utils/seoStructuredData';
import { injectSectionMeta } from './utils/dynamicMetaTags';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Code-splitting dei modali per minimizzare il bundle size iniziale
const BookingSuccessModal = lazy(() =>
  import('./components/BookingSuccessModal').then((m) => ({ default: m.BookingSuccessModal }))
);
const BookingsListModal = lazy(() =>
  import('./components/BookingsListModal').then((m) => ({ default: m.BookingsListModal }))
);
const LegalModal = lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);

const STORAGE_KEY = 'studio_milano_user_bookings';

export default function App() {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  // Scroll fluido inerziale stile Apple con Lenis
  const { scrollTo } = useSmoothScroll({
    duration: 1.1,
    smoothWheel: true,
    anchorOffset: 0,
  });

  // Servizio selezionato per la richiesta/prenotazione
  const [selectedServiceId, setSelectedServiceId] = useState<string>('terapia-manuale');

  // Storico prenotazioni utente salvate in localStorage
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stati modali
  const [newlyConfirmedBooking, setNewlyConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [isBookingsListOpen, setIsBookingsListOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'cookies' | 'terms' | null>(null);
  const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] = useState(false);

  // Stato di caricamento iniziale
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    injectSectionMeta('hero');

    // Iniezione dinamica dati strutturati Schema.org (JSON-LD)
    injectDynamicStructuredData();

    // Inizializza analytics solo se precedentemente acconsentito
    initializeAnalyticsIfConsented(siteConfig.analytics.gaMeasurementId);

    const handleConsentUpdate = () => {
      initializeAnalyticsIfConsented(siteConfig.analytics.gaMeasurementId);
    };
    window.addEventListener('cookie_consent_updated', handleConsentUpdate);

    // Perceived performance delay
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);

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

  const handleScrollTo = (sectionId: string) => {
    scrollTo(`#${sectionId}`);
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
            onBookClick={() => handleScrollTo('prenota')}
            onExploreAbout={() => handleScrollTo('chi-sono')}
            onExploreServices={() => handleScrollTo('servizi')}
          />
        );
      case 'about':
        return (
          <AboutSection 
            key="about"
            onExploreServices={() => handleScrollTo('servizi')}
            onBookClick={() => handleScrollTo('prenota')}
          />
        );
      case 'services':
        return (
          <ServicesSection 
            key="services"
            isLoading={isInitialLoading}
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
            onBookClick={() => handleScrollTo('prenota')}
          />
        );
      case 'faq':
        return (
          <FaqSection 
            key="faq"
            onBookClick={() => handleScrollTo('prenota')} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f] flex flex-col font-sans antialiased selection:bg-[#006875]/20 selection:text-[#006875]">
      
      {/* Skip link accessibilità (WCAG 2.1 AAA) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full font-medium shadow-2xl ring-2 ring-[#006875] focus:outline-hidden text-[13px]"
      >
        Salta direttamente al contenuto principale
      </a>

      {/* Toast Notifiche */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1d1d1f] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[13.5px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Navbar di Layout */}
      <Navbar 
        onBookClick={() => handleScrollTo('prenota')}
        bookingCount={bookings.length}
        onViewBookings={() => setIsBookingsListOpen(true)}
      />

      {/* Landmark Semantico Contenuto Principale */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-hidden">
        {orderedSections.map(({ key }) => renderSection(key))}
      </main>

      {/* Footer di Layout */}
      <Footer 
        onOpenLegal={(type) => setLegalModalType(type)} 
        onOpenCookiePreferences={() => setIsCookiePreferencesOpen(true)}
      />

      {/* Modali Lazy con Suspense */}
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
            onNewBookingClick={() => handleScrollTo('prenota')}
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

      {/* Cookie Banner & Gestione Consenso GDPR */}
      <CookieBanner 
        onOpenLegal={(type) => setLegalModalType(type)}
        forceOpen={isCookiePreferencesOpen}
        onCloseForceOpen={() => setIsCookiePreferencesOpen(false)}
      />

      {/* Trigger Preferenze Cookie */}
      <CookiePreferencesButton 
        onClick={() => setIsCookiePreferencesOpen(true)}
      />

    </div>
  );
}
