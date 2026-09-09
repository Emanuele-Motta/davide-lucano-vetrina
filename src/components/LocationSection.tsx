import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Phone, Mail, Clock, Navigation, Train, MessageCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

export const LocationSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="dove-siamo" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#006875]" />
            <span>{t.location.badge}</span>
          </div>
          <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3">
            {t.location.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Contact & Hours Details */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.06] shadow-2xs flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#006875] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-[#1d1d1f]">{t.location.cards.addressTitle}</h3>
                  <p className="text-[13.5px] text-[#6e6e73] mt-0.5">{siteConfig.studio.fullAddress}</p>
                  <p className="text-[12px] text-[#006875] font-medium mt-1 flex items-center gap-1">
                    <Train className="w-3.5 h-3.5" />
                    {siteConfig.studio.metroInfo}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#006875] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14.5px] font-semibold text-[#1d1d1f] mb-1.5">{t.location.cards.hoursTitle}</h3>
                  <div className="space-y-1 text-[13px] text-[#6e6e73]">
                    {siteConfig.studio.openingHours.map((h, i) => (
                      <div key={i} className="flex justify-between items-center py-0.5 border-b border-black/[0.04] last:border-0">
                        <span>{h.days}</span>
                        <span className="font-medium text-[#1d1d1f]">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center text-[#006875] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14.5px] font-semibold text-[#1d1d1f]">{t.location.cards.contactsTitle}</h3>
                  <p className="text-[13.5px] text-[#6e6e73] mt-0.5">
                    <a 
                      href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`} 
                      className="hover:text-[#006875] transition-colors font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded"
                      title={`Chiama lo studio al ${siteConfig.studio.phone}`}
                    >
                      {siteConfig.studio.phone}
                    </a>
                  </p>
                  <p className="text-[13px] text-[#6e6e73] mt-0.5">
                    <a 
                      href={`mailto:${siteConfig.studio.email}`} 
                      className="hover:text-[#006875] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded"
                      title={`Invia un'email a ${siteConfig.studio.email}`}
                    >
                      {siteConfig.studio.email}
                    </a>
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Quick Action Buttons */}
            <div className="pt-6 mt-6 border-t border-black/[0.06] grid grid-cols-2 gap-2.5">
              <a
                id="location-call-btn"
                href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`}
                aria-label={`Chiama subito il numero dello studio: ${siteConfig.studio.phone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-full text-[13px] font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[#006875]" />
                Chiama Ora
              </a>
              <a
                id="location-whatsapp-btn"
                href={siteConfig.studio.whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Contatta il Dott. Davide Lucano direttamente su WhatsApp"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full text-[13px] font-medium transition-colors border border-emerald-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Stylized Minimalist Map & Access Instructions */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-black/[0.06] shadow-2xs overflow-hidden flex flex-col justify-between">
            
            {/* Interactive map visualization */}
            <div className="relative h-[240px] sm:h-[280px] bg-[#f5f5f7] flex items-center justify-center p-6 text-center border-b border-black/[0.06]">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1d1d1f_1px,transparent_1px)] [background-size:20px_20px]" />
              
              {/* Center Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="mt-3 bg-white px-4 py-1.5 rounded-full shadow-2xs border border-black/[0.06]">
                  <span className="text-[12.5px] font-medium text-[#1d1d1f]">
                    {siteConfig.doctor.name} • {siteConfig.studio.address}, {siteConfig.studio.city}
                  </span>
                </div>
              </div>

              {/* Metro / Area Badges */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11.5px] font-medium text-[#1d1d1f] shadow-2xs flex items-center gap-1.5 border border-black/[0.04]">
                <span className="w-2 h-2 rounded-full bg-[#006875]" />
                <span>{siteConfig.studio.city} ({siteConfig.studio.province})</span>
              </div>
            </div>

            {/* Bottom Map Info */}
            <div className="p-6 md:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[15px] font-semibold text-[#1d1d1f]">{t.location.mapInfo.directionsTitle}</h3>
                <p className="text-[13.5px] text-[#6e6e73] mt-0.5 leading-relaxed">
                  {t.location.mapInfo.directionsDesc}
                </p>
              </div>

              <a
                id="location-google-maps-btn"
                href={siteConfig.studio.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Apri in Google Maps: indicazioni stradali per lo studio di ${siteConfig.studio.fullAddress}`}
                className="shrink-0 inline-flex items-center gap-2 bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-[13px] font-medium hover:bg-black transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] shadow-2xs active:scale-[0.98]"
              >
                <Navigation className="w-3.5 h-3.5 opacity-80" />
                {t.location.mapInfo.openMaps}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
