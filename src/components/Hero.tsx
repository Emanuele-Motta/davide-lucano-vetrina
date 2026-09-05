import React, { useState } from 'react';
import { HERO_BG_URL } from '../data/mockData';
import { ShieldCheck, Award, Clock, Phone } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
  onExploreAbout: () => void;
  onExploreServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreAbout, onExploreServices }) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  return (
    <header 
      id="hero"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-18 px-5 md:px-16 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Optimized Background Image Container with Smooth Scale & Fade-In Animation */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: isBgLoaded ? 0.7 : 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img 
          src={HERO_BG_URL}
          alt=""
          role="presentation"
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setIsBgLoaded(true)}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Subtle Ambient Radial Glow for Apple-style Key Visual Depth */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[300px] sm:h-[420px] bg-gradient-to-tr from-[#006875]/15 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0.4, 0.7, 0.4], 
          scale: [0.98, 1.05, 0.98] 
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Soft gradient overlay to blend into the main canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-[#fafafa] z-0 pointer-events-none" />

      {/* Content Container with Apple Staggered Reveal */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Pill Tag */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] text-[#1d1d1f] text-[12.5px] font-medium tracking-tight mb-5 border border-black/[0.06] shadow-2xs backdrop-blur-xs"
          initial={{ opacity: 0, y: -12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#006875] animate-pulse" />
          <span>{t.hero.pill}</span>
        </motion.div>

        {/* Primary SEO H1 Headline */}
        <motion.h1 
          className="text-[36px] sm:text-[50px] md:text-[62px] lg:text-[68px] font-semibold text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] mb-5"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.titleStart}{' '}
          <span className="text-[#006875] block sm:inline">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-[17px] sm:text-[19px] text-[#6e6e73] max-w-xl leading-[1.6] mb-8 font-normal"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={onBookClick}
            id="hero-cta-prenota"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto bg-[#1d1d1f] text-white px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:bg-black transition-colors shadow-2xs hover:shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            {!isBookingEnabled && <Phone className="w-4 h-4 text-white/80" />}
            <span>{isBookingEnabled ? t.hero.ctaBook : 'Contatta lo Studio'}</span>
          </motion.button>
          <motion.button
            onClick={onExploreServices || onExploreAbout}
            id="hero-cta-chi-sono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto bg-white border border-[#d2d2d7]/80 text-[#1d1d1f] px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-colors cursor-pointer shadow-2xs"
          >
            {t.hero.ctaServices}
          </motion.button>
        </motion.div>

        {/* Trust Badges - Apple Minimalist Row */}
        <motion.div 
          className="mt-12 pt-7 border-t border-black/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13px] text-[#6e6e73]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Award className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="font-medium text-[#1d1d1f]">{t.hero.badges.alboTitle}</span>
            <span className="text-[#86868b]">{t.hero.badges.alboDesc}</span>
          </div>

          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Clock className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="font-medium text-[#1d1d1f]">{t.hero.badges.taxTitle}</span>
            <span className="text-[#86868b]">{t.hero.badges.taxDesc}</span>
          </div>

          <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <ShieldCheck className="w-4 h-4 text-[#006875] shrink-0" />
            <span className="font-medium text-[#1d1d1f]">{t.hero.badges.locationTitle}</span>
            <span className="text-[#86868b]">{t.hero.badges.locationDesc}</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
