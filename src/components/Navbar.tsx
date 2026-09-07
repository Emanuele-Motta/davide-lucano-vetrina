import React, { useState, useEffect, useMemo } from 'react';
import { LOGO_URL } from '../data/mockData';
import { 
  Menu, 
  X, 
  CalendarCheck2, 
  Phone, 
  MessageCircle, 
  ShieldCheck,
  Calendar,
  Clock
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { siteConfig, getOrderedSections } from '../config/siteConfig';

interface NavbarProps {
  onBookClick: () => void;
  bookingCount: number;
  onViewBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, bookingCount, onViewBookings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  // Sezioni configurate e abilitate da mostrare nella navigazione (escludendo l'hero che è il logo)
  const navSections = useMemo(() => {
    return getOrderedSections().filter(({ key }) => key !== 'hero');
  }, []);

  // Gestione scroll e rilevamento della sezione attiva per accessibilità visiva
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Trova la sezione visibile corrente
      const sections = navSections.map(s => document.getElementById(s.config.id)).filter(Boolean) as HTMLElement[];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navSections]);

  // Gestione chiusura menu mobile con tasto Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Blocca scroll body quando menu mobile aperto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80' 
          : 'bg-[#f9f9f9]/90 backdrop-blur-md border-b border-gray-200/50'
      }`}
    >
      {/* Main Navigation Bar */}
      <nav 
        aria-label="Navigazione principale del sito"
        className="max-w-[1200px] mx-auto flex justify-between items-center h-16 sm:h-17 px-4 sm:px-6 md:px-8 xl:px-0"
      >
        {/* Brand Identity / Official Logo */}
        <a 
          href="#hero" 
          id="nav-brand-logo"
          aria-label={`${siteConfig.doctor.name} - Torna alla Home`}
          className="flex items-center group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded-xl p-0.5"
        >
          <div className="relative h-9 sm:h-10 md:h-11 w-auto rounded-lg overflow-hidden shadow-2xs ring-1 ring-black/[0.08] hover:opacity-95 transition-opacity bg-[#006875]">
            <img 
              src={LOGO_URL} 
              alt={`Logo Studio ${siteConfig.doctor.name} - Fisioterapista`} 
              width={110}
              height={44}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-auto object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navSections.map(({ config }) => {
            const isActive = activeSection === config.id;
            return (
              <a 
                key={config.id}
                href={`#${config.id}`} 
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-1.5 text-[13px] font-medium transition-all rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] ${
                  isActive 
                    ? 'text-[#1d1d1f] font-semibold bg-black/[0.05]' 
                    : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                }`}
              >
                {config.navLabel}
              </a>
            );
          })}
        </div>

        {/* Header CTAs & Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Quick WhatsApp link */}
          <a
            href={siteConfig.studio.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[#6e6e73] hover:text-emerald-700 hover:bg-emerald-50 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
            title="Scrivi su WhatsApp al Dott. Lucano"
            aria-label="Contatta lo studio su WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* User Bookings count button */}
          {isBookingEnabled && bookingCount > 0 && (
            <button
              onClick={onViewBookings}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#006875] bg-[#006875]/10 hover:bg-[#006875]/15 rounded-full transition-colors cursor-pointer"
              title={t.nav.myBookings}
              aria-label={`Visualizza le tue ${bookingCount} prenotazioni attive`}
            >
              <CalendarCheck2 className="w-3.5 h-3.5 text-[#006875]" />
              <span>{bookingCount}</span>
            </button>
          )}

          {/* Primary CTA button */}
          <button 
            onClick={onBookClick}
            id="nav-cta-prenota"
            className="bg-[#1d1d1f] text-white px-4.5 py-2 rounded-full text-[13px] font-medium hover:bg-black transition-all cursor-pointer shadow-2xs active:scale-[0.98] flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875]"
          >
            {isBookingEnabled ? (
              <>
                <Calendar className="w-3.5 h-3.5 text-white/80" />
                <span>{t.nav.bookOnline}</span>
              </>
            ) : (
              <>
                <Phone className="w-3.5 h-3.5 text-white/80" />
                <span>Contatta</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Nav Trigger & Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {isBookingEnabled && bookingCount > 0 && (
            <button
              onClick={onViewBookings}
              className="p-2 text-[#006875] bg-[#006875]/10 rounded-full cursor-pointer"
              aria-label={`Visualizza le tue ${bookingCount} prenotazioni`}
            >
              <CalendarCheck2 className="w-4 h-4" />
            </button>
          )}

          <a
            href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`}
            className="p-2 rounded-full bg-black/[0.04] text-[#1d1d1f] hover:bg-black/[0.08] transition-colors"
            aria-label={`Chiama lo studio al numero ${siteConfig.studio.phone}`}
          >
            <Phone className="w-4 h-4 text-[#006875]" />
          </a>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#1d1d1f] hover:bg-black/[0.04] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#1d1d1f]" /> : <Menu className="w-6 h-6 text-[#1d1d1f]" />}
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Drawer Navigation - Positioned OUTSIDE <header> to ensure full viewport height on mobile */}
    {mobileMenuOpen && (
      <div 
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione mobile"
        className="lg:hidden fixed inset-x-0 top-16 sm:top-[68px] bottom-0 z-50 bg-white/98 backdrop-blur-2xl border-t border-gray-200 overflow-y-auto px-6 py-6 flex flex-col justify-between shadow-2xl"
        style={{ height: 'calc(100dvh - 64px)' }}
      >
        <div className="flex flex-col space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] px-3.5 py-1 mb-2 text-center">
            Menu di Navigazione
          </div>

          {navSections.map(({ config }) => {
            const isActive = activeSection === config.id;
            return (
              <a 
                key={config.id}
                href={`#${config.id}`} 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center text-center px-4 py-3.5 rounded-xl text-[16px] font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#006875]/10 text-[#006875] font-semibold' 
                    : 'text-[#1d1d1f] hover:bg-black/[0.04]'
                }`}
              >
                <span>{config.name}</span>
              </a>
            );
          })}
        </div>

        <div className="pt-6 border-t border-black/[0.06] mt-6 space-y-3 pb-8">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="w-full bg-[#1d1d1f] text-white py-3.5 rounded-full text-[14px] font-medium text-center hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            {isBookingEnabled ? (
              <>
                <Calendar className="w-4 h-4 text-white/80" />
                <span>{t.nav.bookOnline}</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 text-white/80" />
                <span>Richiedi Appuntamento</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full border border-black/[0.08] text-[#1d1d1f] text-[13px] font-medium bg-[#f5f5f7] hover:bg-[#e8e8ed]"
            >
              <Phone className="w-3.5 h-3.5 text-[#006875]" />
              <span>Chiama Studio</span>
            </a>

            <a
              href={siteConfig.studio.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full border border-emerald-200 text-emerald-800 text-[13px] font-medium bg-emerald-50 hover:bg-emerald-100"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="text-center pt-2 text-[12px] text-[#86868b] leading-tight">
            {siteConfig.studio.fullAddress}
          </div>
        </div>
      </div>
    )}
    </>
  );
};
