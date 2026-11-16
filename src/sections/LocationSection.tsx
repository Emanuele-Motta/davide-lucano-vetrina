import React from 'react';
import { DOCTOR_DATA, STUDIO_DATA, TERRITORY_DATA } from '../constants/data';
import { MapPin, Phone, Mail, Clock, Navigation, Train, Car, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';

export interface LocationSectionProps {
  onBookClick?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onBookClick }) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  return (
    <section 
      id="dove-siamo" 
      aria-labelledby="location-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Intestazione Sezione */}
        <div className="text-center mb-10 sm:mb-12 px-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12.5px] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#006875]" />
            <span>{t.location.badge}</span>
          </div>
          <h2 
            id="location-heading"
            className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3 leading-[1.15]"
          >
            {t.location.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        {/* Griglia Principale a 2 Colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Colonna Sinistra: Studio, Orari, Contatti & Zone Servite */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[24px] border border-black/[0.06] shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Indirizzo & Accesso */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f]">{t.location.cards.addressTitle}</h3>
                  <p className="text-[13.5px] text-[#6e6e73] mt-0.5">{STUDIO_DATA.fullAddress}</p>
                  <p className="text-[12px] text-[#006875] font-medium mt-1 flex items-center gap-1">
                    <Train className="w-3.5 h-3.5" />
                    {STUDIO_DATA.metroInfo}
                  </p>
                  <p className="text-[12px] text-[#555] mt-0.5">
                    {STUDIO_DATA.accessibilityInfo}
                  </p>
                </div>
              </div>

              {/* Orari di Apertura */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-black/[0.04]">
                <div className="w-10 h-10 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1.5">{t.location.cards.hoursTitle}</h3>
                  <div className="space-y-1.5 text-[13px] text-[#6e6e73]">
                    {STUDIO_DATA.openingHours.map((h, i) => (
                      <div key={i} className="flex justify-between items-center py-0.5 border-b border-black/[0.03] last:border-0">
                        <span>{h.days}</span>
                        <span className="font-medium text-[#1d1d1f]">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contatti Diretti */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-black/[0.04]">
                <div className="w-10 h-10 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f]">{t.location.cards.contactsTitle}</h3>
                  <p className="text-[13.5px] text-[#6e6e73] mt-0.5">
                    <a 
                      href={STUDIO_DATA.phoneTel} 
                      className="hover:text-[#006875] transition-colors font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded"
                      title={`Chiama lo studio al ${STUDIO_DATA.phone}`}
                    >
                      {STUDIO_DATA.phone}
                    </a>
                  </p>
                  <p className="text-[13px] text-[#6e6e73] mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#006875]" />
                    <a 
                      href={STUDIO_DATA.emailMailto} 
                      className="hover:text-[#006875] transition-colors"
                    >
                      {STUDIO_DATA.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Zone e Hinterland Serviti */}
              <div className="pt-4 border-t border-black/[0.04]">
                <div className="flex items-center gap-2 mb-2.5">
                  <Navigation className="w-4 h-4 text-[#006875]" />
                  <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Milano Ovest & Hinterland Limitrofo</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {TERRITORY_DATA.mainDistricts.map((item, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center text-[12px] bg-[#f5f5f7] text-[#1d1d1f] px-2.5 py-1 rounded-full border border-black/[0.04]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {TERRITORY_DATA.surroundingTowns.slice(1, 5).map((town, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-[#fbfbfd] rounded-lg border border-black/[0.04]">
                      <span className="font-medium text-[#1d1d1f] truncate mr-1">{town.name}</span>
                      <span className="text-[#006875] font-semibold bg-white px-1.5 py-0.5 rounded text-[11px] shrink-0 border border-black/[0.04]">
                        ~{town.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Pulsanti Rapidi Indicazioni, WhatsApp & Prenota */}
            <div className="pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row gap-2.5">
              <a
                href={STUDIO_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1d1d1f] text-white py-2.5 px-4 rounded-full text-[13px] font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Calcola Percorso</span>
              </a>

              <a
                href={STUDIO_DATA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-50 text-emerald-800 border border-emerald-200 py-2.5 px-4 rounded-full text-[13px] font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {onBookClick && (
                <button
                  onClick={onBookClick}
                  className="flex-1 bg-[#006875] text-white py-2.5 px-4 rounded-full text-[13px] font-medium hover:bg-[#005560] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Prenota</span>
                </button>
              )}
            </div>

          </div>

          {/* Colonna Destra: Mappa Google Interattiva & Vantaggi */}
          <div className="lg:col-span-6 bg-white rounded-[24px] border border-black/[0.06] shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="w-full h-[360px] sm:h-[420px] lg:h-full relative min-h-[380px]">
              <iframe
                src={STUDIO_DATA.googleMapsEmbedUrl}
                title={`Mappa Studio ${DOCTOR_DATA.name} - ${STUDIO_DATA.address}`}
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Vantaggi di Accesso & Parcheggio */}
            <div className="p-4 sm:p-5 bg-[#fbfbfd] border-t border-black/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] text-[#555]">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#006875] shrink-0" />
                <span>{TERRITORY_DATA.advantages.parking}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#006875] shrink-0" />
                <span>{TERRITORY_DATA.advantages.transit}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
