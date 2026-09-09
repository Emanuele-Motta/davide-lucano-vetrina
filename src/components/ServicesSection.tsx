import React from 'react';
import { Service } from '../types';
import { SERVICES } from '../data/mockData';
import { 
  Hand, 
  Activity, 
  Accessibility, 
  Zap, 
  Stethoscope, 
  ArrowRight,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenServiceDetails: (service: Service) => void;
  isLoading?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenServiceDetails,
  isLoading = false
}) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  // Get icon component based on string identifier
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HandMetal':
        return <Hand className="w-6 h-6 text-[#006875]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#006875]" />;
      case 'Accessibility':
        return <Accessibility className="w-6 h-6 text-[#006875]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#006875]" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#006875]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#006875]" />;
    }
  };

  // Filter the primary 4 featured services from SERVICES
  const featuredServices = SERVICES.slice(0, 4);

  if (isLoading) {
    return (
      <section 
        id="servizi" 
        aria-label="Caricamento trattamenti" 
        className="scroll-mt-28 py-8 sm:py-10 md:py-12 lg:py-14 border-t border-gray-100"
      >
        {/* Section Header Skeleton */}
        <div className="text-center mb-6 sm:mb-7 md:mb-8 px-4 sm:px-6">
          <div className="h-8 sm:h-9 md:h-10 w-60 sm:w-72 md:w-80 bg-gray-200/80 rounded-xl animate-pulse mx-auto mb-2 sm:mb-3" />
          <div className="h-4 sm:h-4.5 w-72 sm:w-96 max-w-full bg-gray-200/60 rounded-lg animate-pulse mx-auto" />
        </div>

        {/* 4 Skeleton Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white p-7 sm:p-8 rounded-[24px] apple-shadow border border-[#F5F5F7]/80 flex flex-col justify-between animate-pulse min-h-[300px]"
            >
              <div>
                {/* Icon Circle Skeleton */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gray-200/70" />
                </div>

                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-200/80 rounded-md mb-3" />

                {/* Short Description Skeleton lines */}
                <div className="space-y-2 mb-6">
                  <div className="h-3.5 w-full bg-gray-100 rounded" />
                  <div className="h-3.5 w-11/12 bg-gray-100 rounded" />
                  <div className="h-3.5 w-4/5 bg-gray-100 rounded" />
                </div>
              </div>

              {/* Bottom Actions Skeleton */}
              <div className="pt-4 border-t border-[#F5F5F7] flex items-center justify-between mt-auto">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-full" />
                  <div className="h-4 w-14 bg-gray-200/70 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pill Skeleton */}
        <div className="mt-14 sm:mt-16 md:mt-20 text-center px-4 sm:px-6">
          <div className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200/70 shadow-2xs animate-pulse max-w-xl mx-auto w-full">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="h-4 w-44 bg-gray-200/80 rounded" />
            <div className="h-4 w-52 bg-gray-100 rounded hidden sm:block" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="servizi" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12 px-4 sm:px-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium mb-3">
          <span>{t.services.badge}</span>
        </div>
        <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3 leading-[1.15]">
          {t.services.title}
        </h2>
        <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-[1.6]">
          {t.services.subtitle}
        </p>
      </div>

      {/* 4 Cards Grid - Apple minimal aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        {featuredServices.map((service) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-black/[0.06] shadow-2xs hover:border-black/[0.14] hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            <div>
              {/* Icon */}
              <div className="w-11 h-11 bg-[#f5f5f7] rounded-xl flex items-center justify-center mb-5 text-[#006875] group-hover:bg-[#006875]/10 group-hover:scale-105 transition-all duration-300">
                {getIcon(service.icon)}
              </div>

              {/* Title */}
              <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-2 group-hover:text-[#006875] transition-colors leading-snug">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-[13.5px] text-[#6e6e73] leading-[1.6] mb-6">
                {service.shortDesc}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-[12.5px] text-[#6e6e73]">
                <Clock className="w-3.5 h-3.5 text-[#006875]" />
                <span>{service.duration}</span>
                <span>•</span>
                <span className="font-medium text-[#1d1d1f]">{service.price}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenServiceDetails(service)}
                  className="p-1.5 text-[#5e5e62] hover:text-[#006875] transition-colors duration-200 rounded-full hover:bg-black/[0.04] active:scale-[0.95]"
                  title={t.services.clinicalDetails}
                  aria-label={`${t.services.clinicalDetails}: ${service.title}`}
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => isBookingEnabled ? onSelectServiceForBooking(service.id) : onOpenServiceDetails(service)}
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#006875] hover:text-[#004f58] transition-colors duration-200 active:scale-[0.97] group/btn"
                >
                  <span>{isBookingEnabled ? t.services.bookNow : 'Dettagli'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional note pill */}
      <div className="mt-12 text-center px-4">
        <p className="inline-flex items-center gap-2 text-[13px] text-[#6e6e73] bg-[#fbfbfd] px-5 py-2.5 rounded-full border border-black/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006875]" />
          <span className="font-medium text-[#1d1d1f]">Prima Visita di Valutazione</span>
          <span>(60 min) comprensiva di diagnosi funzionale e piano riabilitativo.</span>
        </p>
      </div>
    </section>
  );
};
