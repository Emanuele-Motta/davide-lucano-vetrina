import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import Cal, { getCalApi } from '@calcom/embed-react';
import { BookingContactDirectSection } from './BookingContactDirectSection';
import { Calendar, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { ConfirmedBooking } from '../types';

interface BookingSectionProps {
  selectedServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
  onBookingConfirmed?: (booking: ConfirmedBooking) => void;
  onOpenPrivacy?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = () => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  const [hasCalError, setHasCalError] = useState(false);
  const [showDirectFallback, setShowDirectFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: 'visita' });
        if (!isMounted) return;
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          theme: 'light',
        });
      } catch (err) {
        console.warn('Cal.com non raggiungibile o bloccato, attivazione fallback diretto:', err);
        if (isMounted) {
          setHasCalError(true);
        }
      }
    })();

    // Rileva disconnessione di rete
    const handleOffline = () => setHasCalError(true);
    window.addEventListener('offline', handleOffline);

    return () => {
      isMounted = false;
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Se le prenotazioni sono disattivate da toggle o se Cal.com riscontra errori/offline,
  // viene mostrata la sezione di contatto diretto dello studio.
  if (!isBookingEnabled || hasCalError || showDirectFallback) {
    return <BookingContactDirectSection />;
  }

  return (
    <section id="prenota" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-2xs p-6 sm:p-8 md:p-10">
          
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10 px-2">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#006875]" />
                <span>{t.booking.badge}</span>
              </div>
            </div>

            <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-2">
              {t.booking.title}
            </h2>
            <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-relaxed">
              {t.booking.subtitle}
            </p>
          </div>

          {/* Cal.com Embed Container */}
          <div 
            className="w-full rounded-xl overflow-hidden bg-white border border-black/[0.04] min-h-[640px] sm:min-h-[700px] relative"
            tabIndex={0}
            aria-label="Calendario prenotazioni Cal.com"
          >
            <Cal
              namespace="visita"
              calLink="emanuele-motta-advnc8/visita"
              style={{ width: '100%', height: '100%', minHeight: '680px', overflow: 'auto' }}
              config={{
                layout: 'month_view',
                useSlotsViewOnSmallScreen: 'true',
                theme: 'light',
              }}
            />
          </div>

          {/* Fallback Assistance Bar */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#6e6e73]">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#006875] shrink-0" />
              <span>Hai difficoltà con il calendario online o preferisci concordare la visita telefonicamente?</span>
            </span>
            <button
              type="button"
              onClick={() => setShowDirectFallback(true)}
              className="inline-flex items-center gap-1.5 text-[#006875] font-semibold hover:underline cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Visualizza canali diretti (WhatsApp & Telefono)</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
