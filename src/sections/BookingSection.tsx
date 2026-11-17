import React, { useEffect, useRef, useState } from 'react';
import { Calendar as CalendarIcon, Phone } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { BookingContactDirectSection } from '../components/BookingContactDirectSection';
import { ConfirmedBooking } from '../types';
import { siteConfig } from '../config/siteConfig';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { getStoredCookieConsent } from '../services/cookieConsent';

export interface BookingSectionProps {
  selectedServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
  onBookingConfirmed?: (booking: ConfirmedBooking) => void;
  onOpenPrivacy?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = () => {
  const { isBookingEnabled } = useBookingToggle();
  const [canLoadCal, setCanLoadCal] = useState(
    () => getStoredCookieConsent()?.categories.marketing === true
  );
  const [calStatus, setCalStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const calContainerRef = useRef<HTMLDivElement>(null);
  const calLink = siteConfig.booking.calLink
    .trim()
    .replace(/^https?:\/\/cal\.com\//i, '')
    .replace(/^\/+|\/+$/g, '');

  useEffect(() => {
    const updateCalConsent = () => {
      setCanLoadCal(getStoredCookieConsent()?.categories.marketing === true);
    };

    window.addEventListener('cookie_consent_updated', updateCalConsent);
    return () => window.removeEventListener('cookie_consent_updated', updateCalConsent);
  }, []);

  useEffect(() => {
    if (!isBookingEnabled || !calLink || !canLoadCal) return;
    setCalStatus('loading');

    let active = true;
    let iframeLoaded = false;
    const container = calContainerRef.current;
    const markReady = () => {
      iframeLoaded = true;
      if (active) setCalStatus('ready');
    };
    const markFailed = () => {
      if (active) setCalStatus('failed');
    };
    const timeoutId = window.setTimeout(() => {
      if (!iframeLoaded) markFailed();
    }, 20_000);
    const observeIframe = () => {
      const iframe = container?.querySelector('iframe');
      if (!iframe || iframe.dataset.loadObserved) return;
      iframe.dataset.loadObserved = 'true';
      iframe.addEventListener('load', markReady, { once: true });
      iframe.addEventListener('error', markFailed, { once: true });
    };
    const observer = container
      ? new MutationObserver(observeIframe)
      : null;

    if (container && observer) {
      observer.observe(container, { childList: true, subtree: true });
      observeIframe();
    }

    getCalApi().catch(markFailed);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [calLink, canLoadCal, isBookingEnabled]);

  if (!isBookingEnabled || !calLink || !canLoadCal || calStatus === 'failed') {
    return <BookingContactDirectSection />;
  }

  return (
    <section 
      id="prenota" 
      aria-labelledby="booking-section-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Card Contenitore Principale Stile Apple */}
        <div className="bg-white rounded-[28px] border border-black/[0.06] shadow-xs p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300">
          
          {/* Intestazione Sezione */}
          <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12.5px] font-medium mb-3.5 border border-[#006875]/15">
              <CalendarIcon className="w-3.5 h-3.5 text-[#006875]" />
              <span>Prenotazione online</span>
            </div>

            <h2 
              id="booking-section-heading"
              className="text-[30px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] leading-[1.15] mb-3"
            >
              Prenota un appuntamento
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed">
              Consulta le disponibilità e scegli data e orario direttamente qui.
            </p>
          </div>

          <div
            ref={calContainerRef}
            className="relative min-h-[680px] overflow-hidden rounded-xl border border-black/[0.08] bg-white"
          >
            <Cal
              calLink={calLink}
              config={{ layout: 'month_view', theme: 'light' }}
              style={{ width: '100%', height: '680px', overflow: 'auto' }}
            />
            {calStatus === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white text-sm text-[#6e6e73]">
                Caricamento calendario...
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#6e6e73]">
            <Phone className="h-3.5 w-3.5 text-[#006875]" />
            <span>Per assistenza, puoi contattare direttamente lo studio.</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;
