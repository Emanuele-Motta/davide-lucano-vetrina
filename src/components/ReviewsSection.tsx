import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { useTranslation } from '../i18n';
import { MIO_DOTTORE_CONFIG, getAllReviews, getReviewsOverview } from '../data/reviewsConfig';

interface ReviewsSectionProps {
  isLoading?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isLoading = false }) => {
  const { t } = useTranslation();
  const reviewsOverview = getReviewsOverview();
  const allReviews = getAllReviews();

  const filterOptions = [
    { id: 'all', label: `Tutte (${allReviews.length})` },
    { id: 'miodottore', label: `MioDottore (${reviewsOverview.mioDottoreCount})` },
    { id: 'altre', label: `Studio & Google (${reviewsOverview.additionalCount})` },
    { id: 'Terapia Manuale', label: 'Terapia Manuale' },
    { id: 'Riabilitazione Sportiva', label: 'Riabilitazione Sportiva' },
    { id: 'Tecar Terapia', label: 'Tecar Terapia' },
    { id: 'Rieducazione Posturale', label: 'Rieducazione Posturale' },
  ];

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredReviews = allReviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'miodottore') return r.source === 'miodottore';
    if (selectedFilter === 'altre') return r.source !== 'miodottore';
    return r.treatment.toLowerCase().includes(selectedFilter.toLowerCase()) ||
           selectedFilter.toLowerCase().includes(r.treatment.toLowerCase());
  });

  // Ensure enough items for seamless infinite horizontal loop
  const displayList = filteredReviews.length > 0 ? filteredReviews : allReviews;
  const repeatCount = displayList.length <= 2 ? 4 : displayList.length <= 4 ? 3 : 2;
  const marqueeItems = Array.from({ length: repeatCount }, () => displayList).flat();

  if (isLoading) {
    return (
      <section 
        id="recensioni" 
        aria-label="Caricamento recensioni ed esperienze cliniche"
        className="scroll-mt-28 py-8 sm:py-10 md:py-12 lg:py-14 border-t border-gray-100 overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
          <div className="text-center mb-6 px-4">
            <div className="h-7 w-64 bg-gray-200/70 rounded-full mx-auto mb-2.5 animate-pulse" />
            <div className="h-8 sm:h-9 w-48 sm:w-56 bg-gray-200/80 rounded-xl mx-auto mb-2 animate-pulse" />
            <div className="h-4 w-72 sm:w-96 max-w-full bg-gray-200/60 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recensioni" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium mb-3">
            <Star className="w-3.5 h-3.5 fill-[#006875] text-[#006875]" />
            <span>Valutazione {reviewsOverview.overallRating} su 5.0 • {MIO_DOTTORE_CONFIG.totalReviewsCount} Recensioni</span>
          </div>

          <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3 leading-[1.15]">
            {t.reviews.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-[1.6]">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Official MioDottore Trust & Verification Banner */}
        <div className="mb-8 p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            
            {/* Left: MioDottore Rating summary */}
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-11 h-11 rounded-xl bg-[#006875] text-white flex flex-col items-center justify-center shrink-0">
                <span className="text-[15px] font-bold leading-none">5.0</span>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 fill-white text-white" />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-[#1d1d1f]">
                    MioDottore.it
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#006875]/10 text-[#006875]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verificato</span>
                  </span>
                </div>
                <p className="text-[12.5px] text-[#6e6e73] mt-0.5 leading-snug">
                  <strong className="text-[#1d1d1f] font-medium">{MIO_DOTTORE_CONFIG.totalReviewsCount} opinioni certificate</strong> di pazienti
                </p>
              </div>
            </div>

            {/* Center: Highlights */}
            <div className="flex items-center gap-6 text-[13px] text-[#515154] border-y md:border-y-0 md:border-x border-black/[0.06] py-2.5 md:py-0 px-0 md:px-6 w-full md:w-auto justify-around md:justify-start">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#006875]" />
                <span><strong>100%</strong> raccomandato</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Puntualità: <strong>Massima</strong></span>
              </div>
            </div>

            {/* Right: Link to doctor's official profile on MioDottore */}
            <div className="w-full md:w-auto shrink-0 flex justify-center md:justify-end">
              <a
                id="reviews-miodottore-link"
                href={MIO_DOTTORE_CONFIG.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vedi tutte le recensioni verificate del Dott. Davide Lucano su MioDottore.it"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-[12.5px] font-medium transition-all shadow-2xs w-full sm:w-auto focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] active:scale-[0.97]"
                title="Apri il profilo ufficiale del Dott. Davide Lucano su MioDottore.it"
              >
                <span>Vedi su MioDottore</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] ${
                selectedFilter === opt.id
                  ? 'bg-[#1d1d1f] text-white shadow-2xs'
                  : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] border border-black/[0.06]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Scroll Container */}
      <div className="relative w-full overflow-hidden marquee-container py-2">
        {/* Soft edge gradients for seamless fading in and out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 md:w-36 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 md:w-36 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />

        {/* Moving Track with pause on hover */}
        <div className="animate-marquee flex gap-5 px-4">
          {marqueeItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 bg-white p-5 sm:p-6 rounded-2xl border border-black/[0.06] shadow-2xs flex flex-col justify-between hover:border-black/[0.14] hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-out select-none group"
            >
              <div>
                {/* Header with Source Badge & 5 stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Source Tag */}
                  {review.source === 'miodottore' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#006875]/10 text-[#006875]">
                      <ShieldCheck className="w-3 h-3 text-[#006875]" />
                      <span>MioDottore</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-black/[0.04] text-[#6e6e73]">
                      <span>{review.source === 'google' ? 'Google' : 'Studio'}</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-[13.5px] text-[#333] leading-[1.65] mb-5 italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author & Treatment Footer */}
              <div className="pt-3.5 border-t border-black/[0.06]">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#1d1d1f] flex items-center gap-1 leading-snug">
                      {review.name}
                      {review.verifiedPatient && (
                        <CheckCircle className="w-3 h-3 text-[#006875] shrink-0" title="Paziente verificato" />
                      )}
                    </h4>
                    <p className="text-[11.5px] text-[#86868b] leading-normal">{review.role || review.date}</p>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#6e6e73] shrink-0">
                    {review.treatment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
