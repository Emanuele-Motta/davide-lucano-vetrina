import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  AlertCircle, 
  MessageCircle, 
  ExternalLink, 
  RefreshCw,
  ShieldCheck,
  CalendarCheck,
  Phone
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { BOOKING_DATA, DOCTOR_DATA, STUDIO_DATA } from '../constants/data';
import { BookingContactDirectSection } from '../components/BookingContactDirectSection';
import { Button } from '../components/common/Button';
import { ConfirmedBooking } from '../types';

export interface BookingSectionProps {
  selectedServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
  onBookingConfirmed?: (booking: ConfirmedBooking) => void;
  onOpenPrivacy?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = () => {
  const { t } = useTranslation();
  
  // Stato caricamento iframe Cal.com
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [hasIframeError, setHasIframeError] = useState(false);
  const [showDirectFallback, setShowDirectFallback] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Monitora lo stato di connessione online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setHasIframeError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Se l'utente richiede esplicitamente il fallback diretto o se c'è un errore di rete persistente
  if (showDirectFallback || hasIframeError && !isOnline) {
    return <BookingContactDirectSection onBackToCalendar={() => { setShowDirectFallback(false); setHasIframeError(false); }} />;
  }

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  const handleRetry = () => {
    setIsIframeLoading(true);
    setHasIframeError(false);
  };

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12.5px] font-medium mb-3.5 border border-[#006875]/15">
              <CalendarIcon className="w-3.5 h-3.5 text-[#006875]" />
              <span>Agenda Cal.com 24/7</span>
            </div>

            <h2 
              id="booking-section-heading"
              className="text-[30px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-tight leading-[1.15] mb-3"
            >
              Prenota la Tua Seduta con Cal.com
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed">
              Scegli comodamente data e orario in tempo reale nell'agenda ufficiale Cal.com del Dott. Davide Lucano.
            </p>

            {/* Micro-promemoria trasparenza fiscale */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-[#555]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006875] shrink-0" />
              <span>Visite individuali 60 min • Detraibili al 19% come spesa sanitaria</span>
            </div>
          </div>

          {/* Area Widget Cal.com con Skeleton Loader */}
          <div className="relative w-full rounded-[20px] overflow-hidden bg-[#fbfbfd] border border-black/[0.06] min-h-[640px] sm:min-h-[720px]">
            
            {/* SKELETON LOADER MINIMAL DURANTE IL CARICAMENTO DELL'IFRAME */}
            {isIframeLoading && !hasIframeError && (
              <div 
                role="status" 
                aria-live="polite"
                aria-label={BOOKING_DATA.loadingMessage}
                className="absolute inset-0 z-10 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center"
              >
                {/* Spinner Minimal */}
                <div className="relative mb-5">
                  <div className="w-12 h-12 rounded-full border-2 border-black/[0.08] border-t-[#006875] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-[#006875]" />
                  </div>
                </div>

                <div className="text-[15px] font-medium text-[#1d1d1f] tracking-tight mb-1">
                  Caricamento Agenda Cal.com...
                </div>
                <p className="text-[13px] text-[#6e6e73] max-w-sm">
                  Connessione in tempo reale al sistema di prenotazione Cal.com del Dott. Davide Lucano.
                </p>

                {/* Shimmer Placeholder Bars (Skeleton) */}
                <div className="w-full max-w-md mt-6 space-y-3 px-4 pointer-events-none opacity-60">
                  <div className="h-5 bg-stone-200/70 rounded-full animate-pulse w-3/4 mx-auto" />
                  <div className="h-10 bg-stone-200/50 rounded-xl animate-pulse" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-12 bg-stone-200/60 rounded-lg animate-pulse" />
                    <div className="h-12 bg-stone-200/60 rounded-lg animate-pulse" />
                    <div className="h-12 bg-stone-200/60 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* STATO DI ERRORE O RETE ASSENTE */}
            {hasIframeError && (
              <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">
                  Impossibile caricare il calendario Cal.com
                </h3>
                <p className="text-[14px] text-[#6e6e73] max-w-md mb-6 leading-relaxed">
                  {!isOnline 
                    ? "Sembra che il tuo dispositivo sia attualmente offline. Controlla la tua connessione o visualizza i contatti diretti." 
                    : "Il widget Cal.com non è momentaneamente raggiungibile a causa delle impostazioni di rete o del server."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRetry}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Riprova Caricamento
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowDirectFallback(true)}
                    leftIcon={<Phone className="w-3.5 h-3.5" />}
                  >
                    Visualizza Contatti Diretti
                  </Button>
                </div>
              </div>
            )}

            {/* IFRAME CAL.COM EMBED WIDGET */}
            <iframe
              src={BOOKING_DATA.calUrl}
              title={`Agenda Cal.com - ${DOCTOR_DATA.name}`}
              className="w-full h-full min-h-[640px] sm:min-h-[720px] border-0"
              onLoad={handleIframeLoad}
              onError={() => setHasIframeError(true)}
              loading="lazy"
              allow="camera; microphone; fullscreen"
            />
          </div>

          {/* Barra di Assistenza e Azioni Rapide Stile Apple */}
          <div className="mt-7 pt-6 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#6e6e73]">
            <div className="flex items-center gap-2 text-center md:text-left">
              <Phone className="w-4 h-4 text-[#006875] shrink-0" />
              <span>{BOOKING_DATA.phoneAssistanceText}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Apri esternamente in nuova scheda */}
              <a
                href={`https://cal.com/${BOOKING_DATA.calLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.08] transition-colors font-medium text-[12.5px]"
              >
                <span>Apri in Cal.com</span>
                <ExternalLink className="w-3 h-3 text-[#6e6e73]" />
              </a>

              {/* Tasto Fallback / Contatto Diretto */}
              <button
                type="button"
                onClick={() => setShowDirectFallback(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#006875] bg-[#006875]/8 hover:bg-[#006875]/15 transition-colors font-medium text-[12.5px] cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Preferisci Contatto Diretto?</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;
