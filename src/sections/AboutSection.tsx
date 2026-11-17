import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  HeartHandshake,
  Music,
  Activity,
  MessageCircle
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { useBookingToggle } from '../context/FeatureToggleContext';
import { DOCTOR_DATA, STUDIO_DATA } from '../constants/data';

export interface AboutSectionProps {
  onBookClick?: () => void;
  onExploreServices?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookClick,
  onExploreServices
}) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  return (
    <section 
      id="chi-sono" 
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-12 sm:py-16 md:py-20 border-t border-black/[0.06] bg-[#fafafa]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Colonna Sinistra: Scheda Medico Professionale */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[28px] border border-black/[0.06] shadow-2xs p-5 sm:p-6 md:p-7 relative overflow-hidden">
              
              {/* Foto Professionale */}
              <div className="relative mb-5 overflow-hidden rounded-[20px] bg-[#f5f5f7] aspect-[4/4.5]">
                <div className="w-full h-full relative">
                  {!isPhotoLoaded && (
                    <div className="absolute inset-0 bg-[#f0f0f2] animate-pulse" />
                  )}
                  <img
                    src={DOCTOR_DATA.photoUrl}
                    alt={`${DOCTOR_DATA.name} - ${DOCTOR_DATA.title}`}
                    width={500}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsPhotoLoaded(true)}
                    className={`w-full h-full object-cover object-top transition-opacity duration-500 ease-out ${
                      isPhotoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badge galleggianti */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11.5px] font-medium text-[#1d1d1f] border border-white/60 shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Riceve a Milano</span>
                    </div>

                  </div>
                </div>
              </div>
              
              {/* Testata Medico */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-[22px] font-semibold text-[#1d1d1f] leading-snug">
                    {DOCTOR_DATA.name}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#006875]/10 text-[#006875] text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#006875]" />
                    <span>Abilitato FNOFI</span>
                  </span>
                </div>

                <p className="text-[14px] font-normal text-[#6e6e73] mb-2 leading-normal">
                  {DOCTOR_DATA.title}
                </p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium bg-black/[0.03] text-[#5e5e62]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#006875] shrink-0" />
                  <span>{DOCTOR_DATA.alboNumber}</span>
                </div>
              </div>

              {/* Statistiche Chiave */}
              <div className="grid grid-cols-2 gap-2 py-3 px-3 bg-[#fbfbfd] rounded-xl border border-black/[0.04] mb-4 text-center">
                <div>
                  <span className="block text-[16px] font-semibold text-[#1d1d1f] leading-tight">
                    {DOCTOR_DATA.experienceYears}
                  </span>
                  <span className="text-[11px] text-[#5e5e62] leading-tight font-medium">
                    Esperienza
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

              {/* Citazione Filosofica Ufficiale */}
              <div className="p-3.5 bg-[#fbfbfd] rounded-xl border border-black/[0.04] mb-4 text-[12.5px] text-[#48484a] leading-[1.6] italic border-l-2 border-l-[#006875]">
                &ldquo;{DOCTOR_DATA.quote}&rdquo;
              </div>

              {/* Credenziali Cliniche Ufficiali */}
              <div className="space-y-2 pt-3.5 border-t border-black/[0.06]">
                {DOCTOR_DATA.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[12.5px] text-[#333]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006875] shrink-0 mt-0.5" />
                    <span className="leading-snug">{cred}</span>
                  </div>
                ))}
              </div>

              {/* Azione Rapida WhatsApp */}
              <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <a
                  href={STUDIO_DATA.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 px-2 text-[12px] font-medium text-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp {STUDIO_DATA.whatsappNumber}</span>
                </a>

                <span className="inline-flex min-h-11 items-center gap-1 px-2 text-[11px] text-[#5e5e62] font-medium">
                  <MapPin className="w-3 h-3 text-[#006875] shrink-0" />
                  {STUDIO_DATA.address}, {STUDIO_DATA.city}
                </span>
              </div>

            </div>
          </div>

          {/* Colonna Destra: Biografia Dettagliata & Metodo Clinico */}
          <div className="lg:col-span-7">
            <span className="text-[12px] font-medium uppercase text-[#006875] bg-[#006875]/10 px-3 py-1 rounded-full">
              {t.about.badge}
            </span>
            <h2 
              id="about-heading"
              className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] mt-3 mb-4 leading-[1.15]"
            >
              {t.about.title}
            </h2>
            <p className="text-[16px] text-[#6e6e73] leading-[1.6] mb-6">
              {t.about.subtitle}
            </p>

            {/* Testo Biografico Ufficiale del Dott. Davide Lucano */}
            <div className="bg-white rounded-[24px] p-6 sm:p-7 md:p-8 border border-black/[0.06] shadow-2xs space-y-4 mb-8 text-[14px] sm:text-[14.5px] text-[#444] leading-[1.7]">
              
              <p>
                Si laurea in Fisioterapia presso l'<strong>Università degli Studi di Milano</strong> con una tesi focalizzata sulla teleriabilitazione delle lesioni da taglio della mano, e ha proseguito la sua formazione conseguendo il <strong>Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica</strong>, approfondendo in particolar modo lo studio e il trattamento delle patologie della colonna vertebrale e delle articolazioni.
              </p>

              <p>
                Nel corso della sua carriera ha maturato un'ampia e diversificata esperienza clinica presso importanti strutture sanitarie e centri riabilitativi dell'area milanese (tra cui la <strong>Fondazione Don Gnocchi</strong>, l'<strong>Ospedale San Carlo</strong> e il <strong>Pio Albergo Trivulzio</strong>), specializzandosi sia nella riabilitazione ortopedica e muscoloscheletrica che nella gestione dei disturbi neurologici e posturali.
              </p>

              <div className="p-4 bg-[#fbfbfd] rounded-2xl border border-black/[0.04] space-y-2.5 my-3">
                <p className="font-semibold text-[#1d1d1f] text-[14px]">
                  Un percorso efficace nasce dall'ascolto e dalla presa in carico globale. Ogni trattamento combina:
                </p>
                <ul className="space-y-2 text-[13.5px] text-[#555]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006875] mt-2 shrink-0" />
                    <span><strong>Terapia Manuale</strong> per lavorare sulla mobilità e sulla funzionalità articolare e muscolare.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006875] mt-2 shrink-0" />
                    <span><strong>Esercizio Terapeutico</strong> per il recupero funzionale attivo e la riatletizzazione.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006875] mt-2 shrink-0" />
                    <span><strong>Educazione e prevenzione</strong> per fornire indicazioni utili nella gestione delle attività quotidiane.</span>
                  </li>
                </ul>
              </div>

              <p className="italic text-[#5e5e62]">
                In ogni trattamento, la persona è sempre al centro, pertanto ascolto, pazienza ed empatia sono i suoi strumenti principali.
              </p>

              <div className="flex items-start gap-3 pt-2 text-[13.5px] text-[#6e6e73]">
                <Music className="w-4 h-4 text-[#006875] shrink-0 mt-1" />
                <p>
                  Al di fuori dell'ambito clinico, coltiva da anni una grande passione per la musica come cantante e polistrumentista. Un interesse che contribuisce a sviluppare doti di ascolto, precisione e armonia, valori che applica quotidianamente anche nella sua professione.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Punti di Forza Clinici (Senza Tecnologia Avanzata) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4">
          {DOCTOR_DATA.clinicalHighlights.map((highlight, index) => (
            <div
              key={index}
              className="h-full bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-2xs hover:border-black/[0.10] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#006875]/10 flex items-center justify-center text-[#006875] mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#006875]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1.5">
                {highlight.title}
              </h3>
              <p className="text-[13px] text-[#6e6e73] leading-relaxed">
                {highlight.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Azione */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onBookClick && (
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#006875] text-white px-6 rounded-full text-[13.5px] font-medium hover:bg-[#005560] transition-colors cursor-pointer shadow-xs"
            >
              {isBookingEnabled ? (
                <>
                  <Calendar className="w-4 h-4 text-white/80" />
                  <span>Prenota una Valutazione</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 text-white/80" />
                  <span>Contatta il Dott. Lucano</span>
                </>
              )}
            </button>
          )}

          {onExploreServices && (
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex h-12 items-center justify-center gap-1.5 bg-white border border-black/[0.10] text-[#1d1d1f] px-5 rounded-full text-[13.5px] font-medium hover:bg-[#f5f5f7] transition-colors cursor-pointer"
            >
              <span>Scopri le Terapie</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6e6e73]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
