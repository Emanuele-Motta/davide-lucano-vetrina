import React, { useState } from 'react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Sparkles,
  MessageCircle,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { siteConfig } from '../config/siteConfig';

interface AboutSectionProps {
  onExploreServices?: () => void;
  onBookClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreServices, onBookClick }) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  return (
    <section id="chi-sono" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 md:gap-16 items-center">
          
          {/* Left Column: Doctor Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-black/[0.06] shadow-xs hover:border-black/[0.12] transition-all duration-300 ease-out">
              
              {/* Doctor's Photo Container with Skeleton & Smooth Image Loading */}
              <div className="relative mb-5">
                <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-stone-100 ring-1 ring-black/[0.06]">
                  {/* Subtle Shimmer Skeleton while loading */}
                  {!isPhotoLoaded && (
                    <div className="absolute inset-0 bg-stone-200/70 animate-pulse" />
                  )}

                  <img 
                    src={siteConfig.doctor.photoUrl} 
                    alt={`Foto ufficiale del ${siteConfig.doctor.name}`}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsPhotoLoaded(true)}
                    className={`w-full h-full object-cover object-top transition-opacity duration-500 ease-out ${
                      isPhotoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle bottom tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11.5px] font-medium text-[#1d1d1f] border border-white/60 shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Riceve in Studio</span>
                    </div>

                    <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white border border-white/20 shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>5.0 (184+)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Doctor Identity Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                    {siteConfig.doctor.name}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#006875]/10 text-[#006875] text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#006875]" />
                    <span>Certificato</span>
                  </span>
                </div>

                <p className="text-[14px] font-normal text-[#6e6e73] mb-2 leading-normal">
                  {siteConfig.doctor.title}
                </p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium bg-black/[0.03] text-[#5e5e62]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#006875] shrink-0" />
                  <span>{siteConfig.doctor.alboNumber}</span>
                </div>
              </div>

              {/* Key Numbers / Trust Row */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#fbfbfd] rounded-xl border border-black/[0.04] mb-4 text-center">
                <div>
                  <span className="block text-[16px] font-semibold text-[#1d1d1f] leading-tight">
                    {siteConfig.doctor.experienceYears}
                  </span>
                  <span className="text-[11px] text-[#5e5e62] leading-tight font-medium">
                    Anni Esperienza
                  </span>
                </div>
                <div className="border-x border-black/[0.06]">
                  <span className="block text-[16px] font-semibold text-[#006875] leading-tight">
                    {siteConfig.doctor.ratingScore} ★
                  </span>
                  <span className="text-[11px] text-[#5e5e62] leading-tight font-medium">
                    Recensioni
                  </span>
                </div>
                <div>
                  <span className="block text-[16px] font-semibold text-[#1d1d1f] leading-tight">
                    1-a-1
                  </span>
                  <span className="text-[11px] text-[#5e5e62] leading-tight font-medium">
                    Visite Esclusive
                  </span>
                </div>
              </div>

              {/* Bio text */}
              <p className="text-[13.5px] text-[#515154] leading-[1.65] mb-4">
                {siteConfig.doctor.bio}
              </p>

              {/* Clinical Philosophy Quote Box */}
              <div className="p-3 bg-[#fbfbfd] rounded-xl border border-black/[0.04] mb-4 text-[12px] text-[#5e5e62] leading-[1.55] italic">
                &ldquo;{siteConfig.doctor.quote}&rdquo;
              </div>

              {/* Credentials list */}
              <div className="space-y-2 pt-3.5 border-t border-black/[0.06]">
                {siteConfig.doctor.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[12.5px] text-[#333]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006875] shrink-0 mt-0.5" />
                    <span className="leading-snug">{cred}</span>
                  </div>
                ))}
              </div>

              {/* Card Quick Action */}
              <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex items-center justify-between gap-3">
                <a
                  href={siteConfig.studio.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scrivi su WhatsApp</span>
                </a>

                <span className="text-[11px] text-[#5e5e62] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#006875]" />
                  {siteConfig.studio.city}
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Philosophy & Clinical Approach */}
          <div className="lg:col-span-7">
            <span className="text-[12px] font-medium tracking-wide uppercase text-[#006875] bg-[#006875]/10 px-3 py-1 rounded-full">
              {t.about.badge}
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mt-3 mb-4 leading-[1.15]">
              {t.about.title}
            </h2>
            <p className="text-[16px] text-[#6e6e73] leading-[1.6] mb-8">
              {t.about.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/[0.14] hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006875]" />
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">{t.about.highlights.evidence.title}</h3>
                </div>
                <p className="text-[13.5px] text-[#6e6e73] leading-[1.6]">
                  {t.about.highlights.evidence.desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/[0.14] hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006875]" />
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">{t.about.highlights.technology.title}</h3>
                </div>
                <p className="text-[13.5px] text-[#6e6e73] leading-[1.6]">
                  {t.about.highlights.technology.desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/[0.14] hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006875]" />
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">{t.about.highlights.punctuality.title}</h3>
                </div>
                <p className="text-[13.5px] text-[#6e6e73] leading-[1.6]">
                  {t.about.highlights.punctuality.desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/[0.14] hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006875]" />
                  <h3 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug">{t.about.highlights.exercises.title}</h3>
                </div>
                <p className="text-[13.5px] text-[#6e6e73] leading-[1.6]">
                  {t.about.highlights.exercises.desc}
                </p>
              </div>
            </div>

            {/* In-flow CTA row */}
            {(onExploreServices || onBookClick) && (
              <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center gap-3">
                {onExploreServices && (
                  <button
                    onClick={onExploreServices}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1d1d1f] text-white px-6 py-3 rounded-full text-[13.5px] font-medium hover:bg-black transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.97]"
                  >
                    <span>{t.services.title}</span>
                    <ArrowRight className="w-4 h-4 text-white/80" />
                  </button>
                )}
                {onBookClick && (
                  <button
                    onClick={onBookClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1d1d1f] border border-[#d2d2d7]/80 px-6 py-3 rounded-full text-[13.5px] font-medium hover:bg-[#f5f5f7] transition-all duration-200 cursor-pointer active:scale-[0.97] shadow-2xs"
                  >
                    {isBookingEnabled ? (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-[#006875]" />
                        <span>{t.hero.ctaBook}</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-3.5 h-3.5 text-[#006875]" />
                        <span>Contatta lo Studio</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
