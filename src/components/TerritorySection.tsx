import React from 'react';
import { MapPin, Navigation, Car, Train, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';

interface TerritorySectionProps {
  onBookClick: () => void;
}

export const TerritorySection: React.FC<TerritorySectionProps> = ({ onBookClick }) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  const districts = t.territory.districtsList || t.territory.districts || [];
  const pathologies = t.territory.pathologiesList || t.territory.pathologies || [];
  const surroundingTowns = t.territory.surroundingTowns || [];
  const surroundingTitle = t.territory.surroundingTitle || t.territory.surroundingHeading || "Hinterland & Comuni Limitrofi";
  const parkingAdvantage = t.territory.advantages?.parking || t.territory.parkingAdvantage || "Parcheggio comodo e accesso senza ZTL complessa";
  const transitAdvantage = t.territory.advantages?.transit || t.territory.transitAdvantage || "Collegamenti urbani e metropolitana";
  const ctaText = isBookingEnabled 
    ? (t.territory.ctaBookEvaluation || t.territory.cta || "Prenota una Valutazione Fisioterapica")
    : "Contatta il Dott. Davide Lucano";

  return (
    <section id="zone-servite" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#006875]" />
            <span>{t.territory.badge}</span>
          </div>
          <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3">
            {t.territory.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] leading-relaxed">
            {t.territory.subtitle}
          </p>
        </div>

        {/* 2-Column Territory & Access Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Milano & Limitrofi */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.06] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#006875]">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f]">{t.territory.districtsTitle}</h3>
                  <p className="text-[13px] text-[#6e6e73]">{t.territory.districtsSubtitle}</p>
                </div>
              </div>

              {/* Districts Pills */}
              <div className="mb-5">
                <div className="flex flex-wrap gap-1.5">
                  {districts.map((district, idx) => (
                    <span 
                      key={idx}
                      className="text-[12.5px] font-medium bg-[#f5f5f7] text-[#1d1d1f] px-2.5 py-1 rounded-lg"
                    >
                      {district}
                    </span>
                  ))}
                </div>
              </div>

              {/* Surrounding Towns */}
              <div>
                <h4 className="text-[12px] font-medium text-[#6e6e73] uppercase tracking-wider mb-2">
                  {surroundingTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {surroundingTowns.map((town, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-[#fbfbfd] rounded-xl border border-black/[0.04] text-[13px]"
                    >
                      <span className="font-medium text-[#1d1d1f]">{town.name}</span>
                      <span className="text-[#006875] font-medium bg-white px-2 py-0.5 rounded text-[12px] border border-black/[0.04]">
                        ~{town.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Advantage footer */}
            <div className="mt-6 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px] text-[#6e6e73]">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#006875]" />
                <span>{parkingAdvantage}</span>
              </div>
              <div className="flex items-center gap-2">
                <Train className="w-4 h-4 text-[#006875]" />
                <span>{transitAdvantage}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pathologies & Clinical Focus */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.06] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f]">{t.territory.pathologiesTitle}</h3>
                  <p className="text-[13px] text-[#6e6e73]">{t.territory.pathologiesSubtitle}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {pathologies.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-[#333] leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006875] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06]">
              <button
                onClick={onBookClick}
                className="w-full flex items-center justify-center gap-2 bg-[#1d1d1f] text-white py-3 px-5 rounded-full text-[13.5px] font-medium hover:bg-black transition-colors cursor-pointer interactive shadow-2xs active:scale-[0.98]"
              >
                {!isBookingEnabled ? (
                  <Phone className="w-3.5 h-3.5 text-white/80" />
                ) : null}
                <span>{ctaText}</span>
                {isBookingEnabled && <ArrowRight className="w-3.5 h-3.5 text-white/80" />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
