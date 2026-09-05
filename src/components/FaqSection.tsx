import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Calendar, MessageCircle } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';

interface FaqSectionProps {
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
    <section id="faq" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]">
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#006875]" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-3">
            {t.faq.title}
          </h2>
          <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {(t.faq.items || []).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-black/[0.12] bg-white shadow-2xs' 
                    : 'border-black/[0.06] bg-white hover:border-black/[0.1]'
                }`}
              >
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875] rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[15px] sm:text-[16px] font-medium text-[#1d1d1f] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#1d1d1f] text-white rotate-180' : 'bg-[#f5f5f7] text-[#86868b]'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-[14.5px] text-[#6e6e73] leading-relaxed border-t border-black/[0.04] pt-3.5"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Contact Banner */}
        {(() => {
          const banner = t.faq.contactBanner || t.faq.banner || {
            title: "Hai una domanda specifica sul tuo caso clinico?",
            subtitle: "Il Dott. Davide Lucano risponde alle tue necessità con trasparenza e chiarezza.",
            call: "Chiama",
            bookOnline: "Prenota Online"
          };
          return (
            <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.06] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-[15px] font-semibold text-[#1d1d1f]">{banner.title}</h4>
                <p className="text-[13.5px] text-[#6e6e73] mt-0.5">{banner.subtitle}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={`tel:${t.brand.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-full text-[13px] font-medium transition-colors active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#006875]" />
                  {banner.call}
                </a>
                {isBookingEnabled ? (
                  <button
                    onClick={onBookClick}
                    className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#1d1d1f] hover:bg-black text-white rounded-full text-[13px] font-medium transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#006875]" />
                    {banner.bookOnline}
                  </button>
                ) : (
                  <a
                    href={`https://wa.me/390284921104?text=${encodeURIComponent('Buongiorno Dott. Lucano, vorrei richiedere informazioni per una visita.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-full text-[13px] font-medium border border-emerald-200 transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Scrivi su WhatsApp
                  </a>
                )}
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
