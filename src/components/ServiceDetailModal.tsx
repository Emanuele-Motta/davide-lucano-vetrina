import React from 'react';
import { Service } from '../types';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { X, Clock, CheckCircle, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookThisService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookThisService
}) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  useBodyScrollLock(!!service);
  if (!service) return null;

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
          aria-label={t.modals.serviceDetail.close}
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[12px] font-bold uppercase tracking-wider text-[#006875] bg-[#00E5FF]/15 px-3 py-1 rounded-full">
          {service.category}
        </span>

        <h3 className="text-[26px] font-bold text-[#121212] tracking-tight mt-3 mb-2">
          {service.title}
        </h3>

        <div className="flex items-center gap-3 text-[14px] text-[#5f5e5e] mb-6">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#006875]" />
            {service.duration}
          </span>
          <span>•</span>
          <span className="font-semibold text-[#121212] text-[15px]">{service.price}</span>
        </div>

        <p className="text-[15px] text-[#5f5e5e] leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        <div className="mb-6">
          <h4 className="text-[14px] font-bold text-[#121212] uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#006875]" />
            {t.modals.serviceDetail.objectivesTitle}
          </h4>
          <ul className="space-y-2.5">
            {service.benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#121212]">
                <CheckCircle className="w-4 h-4 text-[#006875] shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => {
              onBookThisService(service.id);
              onClose();
            }}
            className="flex-1 bg-[#00E5FF] text-[#121212] py-3 px-6 rounded-full text-[14px] font-bold hover:bg-[#00d0e6] transition-colors interactive flex items-center justify-center gap-2 shadow-sm"
          >
            {isBookingEnabled ? (
              <>
                <span>{t.modals.serviceDetail.bookThis} ({service.title})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 text-[#006875]" />
                <span>Richiedi Trattamento ({service.title})</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-full border border-gray-300 text-[14px] font-medium text-[#121212] hover:bg-gray-50"
          >
            {t.modals.serviceDetail.close}
          </button>
        </div>

      </div>
    </div>
  );
};
