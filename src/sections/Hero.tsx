import React, { useState } from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Award, Clock } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { motion } from 'motion/react';
import { HERO_BG_URL } from '../data/mockData';
import { DOCTOR_DATA, TRUST_BADGES } from '../constants/data';

export interface HeroProps {
  onBookClick: () => void;
  onExploreAbout: () => void;
  onExploreServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreAbout, onExploreServices }) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  return (
    <section 
      id="hero"
      aria-label={`Presentazione e Introduzione del ${DOCTOR_DATA.name}`}
      className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-18 px-5 md:px-16 flex flex-col items-center justify-center text-center overflow-hidden min-h-[580px] md:min-h-[640px]"
    >
      {/* Background decorativo ottimizzato con animazione fade-in fluida */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: isBgLoaded ? 0.65 : 0 }}
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

      {/* Luce d'ambiente radiale per profondità visiva stile Apple */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[300px] sm:h-[420px] bg-[radial-gradient(ellipse_at_center,_rgba(0,104,117,0.09),_rgba(0,104,117,0.01)_45%,_transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Overlay gradiente morbido per sfumare sul canvas della pagina */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-[#fafafa] z-0 pointer-events-none" />

      {/* Contenitore Contenuti Principali */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

        {/* Titolo Principale SEO H1 */}
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

        {/* Sottotitolo Descrittivo */}
        <motion.p 
          className="text-[17px] sm:text-[19px] text-[#6e6e73] max-w-xl leading-[1.6] mb-8 font-normal"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Pulsanti di Azione Primari Stile Apple */}
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
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto bg-[#1d1d1f] text-white px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:bg-black transition-colors shadow-2xs hover:shadow-xs cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#006875] focus-visible:outline-hidden"
          >
            {isBookingEnabled ? (
              <>
                <Calendar className="w-4 h-4 text-white/80" />
                <span>{t.hero.ctaBook}</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 text-white/80" />
                <span>Contatta lo Studio</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            onClick={onExploreServices || onExploreAbout}
            id="hero-cta-chi-sono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto bg-white border border-[#d2d2d7]/80 text-[#1d1d1f] px-7 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-colors cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-hidden"
          >
            {t.hero.ctaServices}
          </motion.button>
        </motion.div>

        {/* Indicatori di Valore Sanitari (Micro-badges) */}
        <motion.div 
          className="mt-10 pt-6 border-t border-black/[0.06] flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-[12.5px] text-[#6e6e73]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#006875] shrink-0" />
            <span className="font-medium text-[#1d1d1f]">{DOCTOR_DATA.alboNumber}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006875] shrink-0" />
            <span>Spesa Sanitaria Detraibile 19%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#006875] shrink-0" />
            <span>Sedute Esclusive 1-a-1</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
