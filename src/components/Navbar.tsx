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
        {/* Brand Identity / Logo */}
        <a 
          href="#hero" 
          id="nav-brand-logo"
          aria-label={`${siteConfig.doctor.name} - Torna alla Home`}
          className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded-xl p-1"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-2xs ring-1 ring-black/[0.08] bg-white p-0.5">
            <img 
              src={LOGO_URL} 
              alt="Logo Studio Dott. Davide Lucano" 
              width={36}
              height={36}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[16px] sm:text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#006875] tracking-tight transition-colors block leading-tight">
              {siteConfig.doctor.name}
            </span>
            <span className="text-[11px] sm:text-[12px] font-normal text-[#6e6e73] tracking-normal block leading-tight">
              {siteConfig.doctor.title}
            </span>
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
            className="p-2 rounded-xl text-[#1d1d1f] hover:bg-black/[0.04] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] cursor-pointer"
            aria-label={mobileMenuOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#1d1d1f]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione mobile"
          className="lg:hidden fixed inset-x-0 top-18 sm:top-20 bottom-0 bg-white/98 backdrop-blur-xl border-t border-gray-200 z-40 overflow-y-auto animate-in slide-in-from-top-4 duration-200 px-6 py-6 flex flex-col justify-between"
        >
          <div className="flex flex-col space-y-1">
            <div className="text-[11px] font-medium uppercase tracking-wider text-[#86868b] px-3 py-1 mb-1">
              Menu
            </div>

            {navSections.map(({ config }) => {
              const isActive = activeSection === config.id;
              return (
                <a 
                  key={config.id}
                  href={`#${config.id}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14.5px] transition-colors ${
                    isActive 
                      ? 'bg-black/[0.05] text-[#1d1d1f] font-medium' 
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.02]'
                  }`}
                >
                  <span>{config.name}</span>
                  <span className="text-[12px] text-[#86868b]">#{config.navLabel}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-5 border-t border-black/[0.06] mt-6 space-y-2.5">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-[#1d1d1f] text-white py-3 rounded-full text-[14px] font-medium text-center hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-[0.98]"
            >
              {isBookingEnabled ? (
                <>
                  <Calendar className="w-3.5 h-3.5 text-white/80" />
                  <span>{t.nav.bookOnline}</span>
                </>
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5 text-white/80" />
                  <span>Richiedi Appuntamento</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border border-black/[0.08] text-[#1d1d1f] text-[12.5px] font-medium bg-[#f5f5f7] hover:bg-[#e8e8ed]"
              >
                <Phone className="w-3 h-3 text-[#006875]" />
                <span>Chiama Studio</span>
              </a>

              <a
                href={siteConfig.studio.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border border-emerald-200 text-emerald-800 text-[12.5px] font-medium bg-emerald-50 hover:bg-emerald-100"
              >
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-2 text-[11.5px] text-[#86868b]">
              {siteConfig.studio.fullAddress}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
