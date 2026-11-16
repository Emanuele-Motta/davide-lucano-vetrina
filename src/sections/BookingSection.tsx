import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ExternalLink, 
  MessageCircle, 
  ShieldCheck,
  CalendarCheck,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles
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
  const [showDirectFallback, setShowDirectFallback] = useState(false);

  // Se l'utente richiede esplicitamente il fallback diretto
  if (showDirectFallback) {
    return <BookingContactDirectSection onBackToCalendar={() => setShowDirectFallback(false)} />;
  }

  const calcomUrl = `https://cal.com/${BOOKING_DATA.calLink}`;

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
              <span>Agenda Cal.com 24/7</span>
            </div>

            <h2 
              id="booking-section-heading"
              className="text-[30px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] tracking-tight leading-[1.15] mb-3"
            >
              Prenota la Tua Seduta con Cal.com
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#6e6e73] leading-relaxed">
              Accedi all'agenda ufficiale Cal.com del {DOCTOR_DATA.name} per scegliere in tempo reale il giorno e l'orario della tua visita individuale.
            </p>

            {/* Micro-promemoria trasparenza fiscale */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-[#555]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006875] shrink-0" />
              <span>Visite individuali 60 min • Detraibili al 19% come spesa sanitaria</span>
            </div>
          </div>

          {/* Cal.com Direct Action Card (Evita blocchi X-Frame-Options su Netlify) */}
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#fbfbfd] to-white rounded-[24px] border border-black/[0.08] p-8 sm:p-10 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#006875]/10 text-[#006875] flex items-center justify-center mx-auto mb-5 shadow-2xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-[22px] sm:text-[24px] font-bold text-[#1d1d1f] mb-2 tracking-tight">
              Agenda Ufficiale Cal.com
            </h3>
            <p className="text-[14.5px] text-[#6e6e73] mb-8 max-w-lg mx-auto leading-relaxed">
              Per garantire la massima fluidità e compatibilità di sicurezza su tutti i dispositivi, la prenotazione si apre direttamente sull'agenda protetta Cal.com.
            </p>

            <div className="space-y-3 mb-8 text-left max-w-md mx-auto bg-white p-5 rounded-2xl border border-black/[0.06]">
              <div className="flex items-center gap-3 text-[13.5px] text-[#333]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prima Visita e Valutazione Specialistica (60 min)</span>
              </div>
              <div className="flex items-center gap-3 text-[13.5px] text-[#333]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terapia Manuale e Riabilitazione Ortopedica</span>
              </div>
              <div className="flex items-center gap-3 text-[13.5px] text-[#333]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conferma immediata via email e promemoria</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={calcomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#006875] text-white py-3.5 px-8 rounded-full text-[14.5px] font-semibold hover:bg-[#005560] transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Apri Agenda Cal.com e Prenota</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            </div>
          </div>

          {/* Barra di Assistenza e Azioni Rapide Stile Apple */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#6e6e73]">
            <div className="flex items-center gap-2 text-center md:text-left">
              <Phone className="w-4 h-4 text-[#006875] shrink-0" />
              <span>{BOOKING_DATA.phoneAssistanceText}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={STUDIO_DATA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors font-medium text-[13px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Scrivi su WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowDirectFallback(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[#006875] bg-[#006875]/8 hover:bg-[#006875]/15 transition-colors font-medium text-[13px] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Visualizza Tutti i Contatti</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;
