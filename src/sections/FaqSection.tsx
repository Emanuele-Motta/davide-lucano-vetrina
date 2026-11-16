import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { STUDIO_DATA } from '../constants/data';

export interface FaqSectionProps {
  onBookClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]"
    >
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8">
        
        {/* Intestazione Sezione */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12.5px] font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#006875]" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 
            id="faq-heading"
            className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3 leading-[1.15]"
          >
            {t.faq.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion FAQ Accessibile WCAG 2.1 */}
        <div className="space-y-3">
          {(t.faq.items || []).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-[20px] border transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-black/[0.12] bg-white shadow-2xs' 
                    : 'border-black/[0.06] bg-white hover:border-black/[0.1]'
                }`}
              >
                <button
                  id={`faq-question-${index}`}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded-[20px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[15px] sm:text-[16px] font-medium text-[#1d1d1f] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#006875]/10 text-[#006875] rotate-180' : 'bg-black/[0.04] text-[#6e6e73]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 text-[14px] text-[#6e6e73] leading-[1.65] border-t border-black/[0.04] pt-3 animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Box di Contatto per altre domande */}
        <div className="mt-10 p-6 rounded-[22px] bg-white border border-black/[0.06] text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="text-left">
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">Hai altre domande specifiche?</h3>
            <p className="text-[13px] text-[#6e6e73] mt-0.5">Il Dott. Davide Lucano risponde direttamente su WhatsApp</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={STUDIO_DATA.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[13px] font-medium hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scrivi su WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium hover:bg-black transition-colors cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-white/80" />
              <span>Prenota</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
