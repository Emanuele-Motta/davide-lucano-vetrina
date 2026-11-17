import React from 'react';
import { SERVICES_DATA, DOCTOR_DATA } from '../constants/data';
import { 
  Hand, 
  Activity, 
  Accessibility, 
  Stethoscope, 
  Sparkles,
  Clock,
  ShieldCheck,
  HeartPulse,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n';

export interface ServicesSectionProps {
  isLoading?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isLoading = false
}) => {
  const { t } = useTranslation();

  const getIcon = (id: string) => {
    switch (id) {
      case 'terapia-manuale':
        return <Hand className="w-5 h-5 text-[#006875]" />;
      case 'riabilitazione-ortopedica':
      case 'riabilitazione-sportiva':
        return <Activity className="w-5 h-5 text-[#006875]" />;
      case 'rieducazione-posturale':
      case 'posturale':
        return <Accessibility className="w-5 h-5 text-[#006875]" />;
      case 'riabilitazione-neurologica':
        return <ShieldCheck className="w-5 h-5 text-[#006875]" />;
      case 'massoterapia-linfodrenaggio':
        return <HeartPulse className="w-5 h-5 text-[#006875]" />;
      case 'prima-visita':
        return <Stethoscope className="w-5 h-5 text-[#006875]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#006875]" />;
    }
  };

  if (isLoading) {
    return (
      <section 
        id="servizi" 
        aria-label="Caricamento trattamenti" 
        className="scroll-mt-24 py-12 sm:py-16 border-t border-black/[0.06]"
      >
        <div className="text-center mb-8 px-4">
          <div className="h-8 w-64 bg-gray-200/80 rounded-xl animate-pulse mx-auto mb-2" />
          <div className="h-4 w-96 max-w-full bg-gray-200/60 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto px-5 sm:px-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white p-7 rounded-[24px] border border-black/[0.06] flex flex-col justify-between animate-pulse min-h-[280px]"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full mb-4" />
              <div className="h-5 w-3/4 bg-gray-200/80 rounded mb-3" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section 
      id="servizi" 
      aria-labelledby="services-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Intestazione Sezione */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <span className="text-[12px] font-medium uppercase text-[#006875] bg-[#006875]/10 px-3 py-1 rounded-full">
            {t.services.badge}
          </span>
          <h2 
            id="services-heading"
            className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] mt-3 mb-3 leading-[1.15]"
          >
            {t.services.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] leading-[1.6]">
            {t.services.subtitle}
          </p>
        </div>

        {/* Griglia Card Percorsi Clinici (Costi e Tecar rimossi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 sm:p-7 rounded-[24px] border border-black/[0.06] shadow-2xs hover:border-black/[0.12] hover:shadow-xs transition-all duration-300 group"
            >
              <div>
                {/* Header Card: Icona & Durata Seduta (Senza Costi) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875]">
                    {getIcon(service.id)}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] text-[#555] text-[12px] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#006875]" />
                    <span>{service.duration || '60 min'}</span>
                  </div>
                </div>

                {/* Titolo Trattamento */}
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#006875] transition-colors">
                  {service.title}
                </h3>

                {/* Descrizione Breve */}
                <p className="text-[13.5px] text-[#6e6e73] leading-[1.6] mb-5">
                  {service.shortDesc || service.shortDescription}
                </p>

                {/* Patologie & Categorie Trattate (Chips) */}
                {service.pathologyChips && service.pathologyChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.pathologyChips.map((chip, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center gap-1 text-[11.5px] font-medium bg-[#006875]/8 text-[#006875] px-2.5 py-1 rounded-full border border-[#006875]/15"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#006875]" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
