import React from 'react';
import { ConfirmedBooking } from '../types';
import { siteConfig } from '../config/siteConfig';
import { useTranslation } from '../i18n';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  User, 
  ShieldCheck
} from 'lucide-react';

interface BookingSuccessModalProps {
  booking: ConfirmedBooking;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, onClose }) => {
  const { t } = useTranslation();
  useBodyScrollLock(true);

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
      `PRODID:-//${siteConfig.doctor.name}//Fisioterapia//IT`,
      'BEGIN:VEVENT',
      `UID:${booking.id}@fisioterapiamilano.it`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startISO}`,
      `DTEND:${endISO}`,
      `SUMMARY:${booking.serviceTitle} - ${siteConfig.doctor.name}`,
      `DESCRIPTION:Appuntamento per ${booking.serviceTitle} con il ${siteConfig.doctor.name}.\\nPaziente: ${booking.fullName}\\nCodice: ${booking.id}`,
      `LOCATION:${siteConfig.studio.fullAddress}`,
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
    <div 
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain"
    >
      <div 
        data-lenis-prevent
        className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 apple-shadow relative border border-gray-100 max-h-[90vh] overflow-y-auto overscroll-contain modal-scrollable-content"
      >
        
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
            <span className="text-[13px] text-[#5f5e5e]">{siteConfig.studio.fullAddress}</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#121212] pt-2 border-t border-gray-200/60">
            <ShieldCheck className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="text-[13px] text-[#5f5e5e]">
              Prestazione sanitaria esente IVA (art. 10 DPR 633/72) e detraibile fiscalmente al 19%
            </span>
          </div>
        </div>

        {/* Calendar Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleDownloadICS}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#006875] text-white rounded-full text-[14px] font-semibold hover:bg-[#004f58] transition-colors interactive shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Aggiungi al Calendario (Scarica .ics)</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-2.5 px-6 bg-white border border-gray-300 text-[#121212] rounded-full text-[13.5px] font-medium hover:bg-[#FAFAFA] transition-colors cursor-pointer"
          >
            {t.modals.bookingSuccess.closeButton}
          </button>
        </div>

      </div>
    </div>
  );
};

