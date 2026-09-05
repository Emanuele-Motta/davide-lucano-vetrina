import React from 'react';
import { ConfirmedBooking } from '../types';
import { STUDIO_INFO } from '../data/mockData';
import { useTranslation } from '../i18n';
import { generateGoogleCalendarWebLink } from '../services/googleCalendar';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { X, Calendar, Clock, MapPin, Trash2, CalendarCheck2, ExternalLink } from 'lucide-react';

interface BookingsListModalProps {
  bookings: ConfirmedBooking[];
  onClose: () => void;
  onCancelBooking: (id: string) => void;
  onNewBookingClick: () => void;
}

export const BookingsListModal: React.FC<BookingsListModalProps> = ({
  bookings,
  onClose,
  onCancelBooking,
  onNewBookingClick,
}) => {
  const { t } = useTranslation();
  useBodyScrollLock(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 apple-shadow relative border border-gray-100 max-h-[90vh] flex flex-col overscroll-contain">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={t.modals.bookingsList.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#006875]">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#121212]">
              {t.modals.bookingsList.title}
            </h3>
            <p className="text-[13px] text-[#5f5e5e]">
              {t.modals.bookingsList.subtitle}
            </p>
          </div>
        </div>

        <div className="overflow-y-auto space-y-4 pr-1 flex-1 overscroll-contain modal-scrollable-content">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-[#5f5e5e]">
              <p className="text-[15px] mb-4">{t.modals.bookingsList.emptyState}</p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="bg-[#00E5FF] text-[#121212] px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-[#00d0e6] transition-colors"
              >
                {t.modals.bookingsList.bookNow}
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-4.5 space-y-2 relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#006875] bg-white px-2 py-0.5 rounded border border-gray-200">
                      {b.id}
                    </span>
                    <h4 className="text-[16px] font-bold text-[#121212] mt-1.5">
                      {b.serviceTitle}
                    </h4>
                  </div>
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title={t.modals.bookingsList.confirmCancel}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[13px] text-[#5f5e5e] space-y-1 pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#006875]" />
                    <span>Data: <strong>{b.selectedDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#006875]" />
                    <span>Orario: <strong>{b.selectedTime}</strong> ({b.serviceDuration})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#006875]" />
                    <span className="text-[12px]">{STUDIO_INFO.address}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200/50 flex justify-end">
                    <a
                      href={generateGoogleCalendarWebLink(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#006875] hover:text-[#004f59] bg-[#00E5FF]/15 px-2.5 py-1 rounded-full border border-[#00daf3]/30 transition-colors"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Google Calendar</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {bookings.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => {
                onClose();
                onNewBookingClick();
              }}
              className="text-[13px] font-semibold text-[#006875] hover:underline"
            >
              + {t.modals.bookingsList.newBooking}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-gray-300 text-[13px] font-medium text-[#121212] hover:bg-gray-50"
            >
              {t.modals.bookingsList.close}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
