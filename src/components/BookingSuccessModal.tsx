import React from 'react';
import { ConfirmedBooking } from '../types';
import { STUDIO_INFO } from '../data/mockData';
import { useTranslation } from '../i18n';
import { 
  getGoogleCalendarConfig, 
  generateGoogleCalendarWebLink 
} from '../services/googleCalendar';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  User, 
  CreditCard,
  ExternalLink
} from 'lucide-react';

interface BookingSuccessModalProps {
  booking: ConfirmedBooking;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, onClose }) => {
  const { t } = useTranslation();
  useBodyScrollLock(true);
  const calendarConfig = getGoogleCalendarConfig();
  const googleCalendarWebUrl = generateGoogleCalendarWebLink(booking);

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    const [year, month, day] = booking.selectedDate.split('-');
    const [hour, minute] = booking.selectedTime.split(':');
    
    const startHour = parseInt(hour, 10);
    const startMin = parseInt(minute, 10);
    const endHour = startHour + 1; // 1 hr default

    const startISO = `${year}${month}${day}T${String(startHour).padStart(2, '0')}${String(startMin).padStart(2, '0')}00`;
    const endISO = `${year}${month}${day}T${String(endHour).padStart(2, '0')}${String(startMin).padStart(2, '0')}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dott. Davide Lucano//Fisioterapia//IT',
      'BEGIN:VEVENT',
      `UID:${booking.id}@fisioterapiamilano.it`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startISO}`,
      `DTEND:${endISO}`,
      `SUMMARY:${booking.serviceTitle} - Dott. Davide Lucano`,
      `DESCRIPTION:Appuntamento per ${booking.serviceTitle} con il Dott. Davide Lucano.\\nPaziente: ${booking.fullName}\\nCodice: ${booking.id}`,
      `LOCATION:${STUDIO_INFO.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appuntamento-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 apple-shadow relative border border-gray-100 max-h-[90vh] overflow-y-auto overscroll-contain modal-scrollable-content">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={t.modals.bookingSuccess.closeButton}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 text-[#006875] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-[#006875]" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-[24px] font-bold text-[#121212] tracking-tight">
            {t.modals.bookingSuccess.title}
          </h3>
          <p className="text-[14px] text-[#5f5e5e] mt-1">
            {t.modals.bookingSuccess.subtitle}
          </p>
        </div>

        {/* Google Calendar Status Pill */}
        <div className="mb-4 flex items-center justify-center">
          {calendarConfig.isConfigured ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google Calendar sincronizzato ({calendarConfig.calendarId})</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#006875] border border-sky-200 text-[12px] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#006875]" />
              <span>Predisposizione Google Calendar attiva (1-Click Add disponibile)</span>
            </div>
          )}
        </div>

        {/* Appointment Recap Card */}
        <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-200/80 mb-6 space-y-3.5">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
            <span className="text-[12px] font-bold tracking-wider uppercase text-[#006875]">
              {t.modals.bookingSuccess.codeLabel}
            </span>
            <span className="font-mono font-bold text-[14px] text-[#121212] bg-white px-2.5 py-1 rounded-md border border-gray-200">
              {booking.id}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212]">
            <Calendar className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="font-semibold">{booking.serviceTitle}</span>
            <span className="text-[#5f5e5e]">({booking.serviceDuration})</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212]">
            <Clock className="w-4 h-4 text-[#006875] shrink-0" />
            <span>{t.modals.bookingSuccess.dateLabel}: <strong>{booking.selectedDate}</strong> alle <strong>{booking.selectedTime}</strong></span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212]">
            <User className="w-4 h-4 text-[#006875] shrink-0" />
            <span>{t.modals.bookingSuccess.patientLabel}: {booking.fullName}</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212]">
            <MapPin className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="text-[13px] text-[#5f5e5e]">{STUDIO_INFO.address}</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212] pt-2 border-t border-gray-200/60">
            <CreditCard className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="text-[13px] text-[#5f5e5e]">
              {t.modals.bookingSuccess.rateLabel}: <strong className="text-[#121212]">{booking.servicePrice}</strong> (saldo al termine della seduta, detraibile al 19%)
            </span>
          </div>
        </div>

        {/* Calendar Action Buttons */}
        <div className="space-y-2.5">
          {/* Direct Google Calendar Web link (works instantly for all devices) */}
          <a
            href={googleCalendarWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#00E5FF] text-[#121212] rounded-full text-[14px] font-semibold hover:bg-[#00d0e6] transition-colors interactive shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Aggiungi a Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleDownloadICS}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FAFAFA] border border-gray-300 text-[#121212] rounded-full text-[13.5px] font-medium hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4 text-[#006875]" />
              <span>Scarica File .ics (Apple / Outlook)</span>
            </button>
            
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-white border border-gray-300 text-[#121212] rounded-full text-[13.5px] font-medium hover:bg-[#FAFAFA] transition-colors"
            >
              {t.modals.bookingSuccess.closeButton}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

