import React, { useState, useRef } from 'react';
import { Star, CheckCircle, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import { MIO_DOTTORE_CONFIG, getAllReviews, getReviewsOverview } from '../data/reviewsConfig';
import { Testimonial } from '../types';

export interface ReviewsSectionProps {
  isLoading?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isLoading = false }) => {
  const { t } = useTranslation();
  const reviewsOverview = getReviewsOverview();
  const allReviews = getAllReviews();
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { id: 'all', label: `Tutte (${allReviews.length})` },
    { id: 'miodottore', label: `MioDottore (${reviewsOverview.mioDottoreCount})` },
    { id: 'altre', label: `Studio & Google (${reviewsOverview.additionalCount})` },
    { id: 'Terapia Manuale', label: 'Terapia Manuale' },
    { id: 'Riabilitazione Sportiva', label: 'Riabilitazione Sportiva' },
    { id: 'Massoterapia', label: 'Massoterapia & Linfodrenaggi' },
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

  const displayList = filteredReviews.length > 0 ? filteredReviews : allReviews;
  const repeatCount = displayList.length <= 2 ? 4 : displayList.length <= 4 ? 3 : 2;
  const marqueeItems = Array.from({ length: repeatCount }, () => displayList).flat();

  const handleScrollMobile = (direction: 'left' | 'right') => {
    if (!mobileScrollRef.current) return;
    const scrollAmount = mobileScrollRef.current.clientWidth * 0.82;
    mobileScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const renderReviewCard = (review: Testimonial, isMarquee = false) => (
    <div
      className={`h-full bg-white p-5 sm:p-6 rounded-[20px] border border-black/[0.06] shadow-2xs flex flex-col justify-between select-none ${
        isMarquee 
          ? 'w-[300px] sm:w-[350px] md:w-[380px] shrink-0 hover:border-black/[0.14] hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-out group' 
          : 'w-full'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>

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

        <p className="text-[13.5px] text-[#333] leading-[1.65] mb-5 italic">
          &ldquo;{review.content}&rdquo;
        </p>
      </div>

      <div className="pt-3.5 border-t border-black/[0.06]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13.5px] font-semibold text-[#1d1d1f]">{review.author || review.name}</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[11.5px] text-[#6e6e73] font-medium">{review.treatment}</span>
          </div>

          <span className="text-[11px] text-[#86868b]">{review.date}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="recensioni" 
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        {/* Intestazione Sezione */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <span className="text-[12px] font-medium tracking-wide uppercase text-[#006875] bg-[#006875]/10 px-3 py-1 rounded-full">
            {t.reviews?.badge || "Recensioni Verificate"}
          </span>
          <h2 
            id="reviews-heading"
            className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mt-3 mb-3 leading-[1.15]"
          >
            {t.reviews?.title || "Cosa dicono i pazienti."}
          </h2>
          <p className="text-[16px] text-[#6e6e73] leading-[1.6]">
            {t.reviews?.subtitle || "Esperienze reali di recupero e percorsi clinici individuali."}
          </p>

          {/* Badge MioDottore Ufficiale */}
          <div className="mt-4 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-black/[0.06] shadow-2xs text-[12.5px]">
            <span className="font-semibold text-[#1d1d1f]">MioDottore.it:</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span>★ 5.0</span>
              <span className="text-[#6e6e73] font-normal">({reviewsOverview.mioDottoreCount} recensioni verificate)</span>
            </div>
            <a
              href={MIO_DOTTORE_CONFIG.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006875] hover:underline font-medium inline-flex items-center gap-1 ml-1"
            >
              <span>Vedi profilo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Filtri Recensioni */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors shrink-0 cursor-pointer ${
                selectedFilter === opt.id
                  ? 'bg-[#1d1d1f] text-white'
                  : 'bg-white border border-black/[0.08] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.02]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

      </div>

      {/* Marquee Recensioni Continuo */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex gap-4 animate-marquee py-2 px-4 hover:[animation-play-state:paused]">
          {marqueeItems.map((review, idx) => (
            <div key={`${review.id}-${idx}`}>
              {renderReviewCard(review, true)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
