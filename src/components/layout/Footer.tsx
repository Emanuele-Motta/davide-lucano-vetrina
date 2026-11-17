import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp, 
  MessageCircle, 
  ExternalLink
} from 'lucide-react';
import { siteConfig, getOrderedSections } from '../../config/siteConfig';
import { DOCTOR_DATA, STUDIO_DATA, ASSETS, SERVICES_DATA } from '../../constants/data';

export interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'cookies' | 'terms') => void;
  onOpenCookiePreferences?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCookiePreferences }) => {
  const activeSections = getOrderedSections();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      aria-labelledby="footer-heading"
      className="w-full bg-[#f5f5f7] text-[#6e6e73] pt-14 pb-10 border-t border-black/[0.08] relative z-10"
    >
      <h2 id="footer-heading" className="sr-only">Informazioni legali, studio e navigazione piè di pagina</h2>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        {/* Griglia Principale a 4 Colonne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-black/[0.06]">
          
          {/* Colonna 1: Identità & Credenziali Mediche (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-11 sm:h-12 w-auto rounded-lg overflow-hidden bg-[#006875] shadow-2xs ring-1 ring-black/[0.08]">
                <img 
                  src={ASSETS.logoFull} 
                  alt={`Logo Studio ${DOCTOR_DATA.name}`} 
                  width={130}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-[13px] text-[#6e6e73] leading-relaxed">
              Fisioterapia e riabilitazione a Milano. Consulta le informazioni su trattamenti, sede e appuntamenti.
            </p>

            <div className="space-y-1.5 pt-1 text-[12px] text-[#555]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006875] shrink-0" />
                <span className="font-medium text-[#1d1d1f]">{DOCTOR_DATA.name}</span>
                <span>• {DOCTOR_DATA.alboNumber}</span>
              </div>
              {STUDIO_DATA.piva && (
                <p className="text-[#6e6e73] pl-5.5">
                  {STUDIO_DATA.piva}
                </p>
              )}
            </div>
          </div>

          {/* Colonna 2: Navigazione Veloce (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[12px] font-semibold text-[#1d1d1f] uppercase">
              Navigazione
            </div>
            <ul className="space-y-2 text-[13px]">
              {activeSections.map(({ config }) => (
                <li key={config.id}>
                  <a 
                    href={`#${config.id}`} 
                    className="hover:text-[#006875] transition-colors inline-block py-0.5"
                  >
                    {config.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3: Trattamenti & Prestazioni (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-semibold text-[#1d1d1f] uppercase">
              Trattamenti Principali
            </div>
            <ul className="space-y-2 text-[13px]">
              {SERVICES_DATA.slice(0, 5).map(service => (
                <li key={service.id}>
                  <a 
                    href="#servizi" 
                    className="hover:text-[#006875] transition-colors inline-block py-0.5"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 4: Recapiti Studio & Orari (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-semibold text-[#1d1d1f] uppercase">
              Studio & Contatti
            </div>
            <ul className="space-y-2.5 text-[13px]">
              <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2">
                <MapPin className="w-4 h-4 text-[#006875] shrink-0 mt-0.5" />
                <span className="min-w-0">{STUDIO_DATA.fullAddress}</span>
              </li>
              <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2">
                <Phone className="w-4 h-4 text-[#006875] shrink-0 mt-0.5" />
                <a 
                  href={STUDIO_DATA.phoneTel} 
                  className="min-w-0 break-words hover:text-[#006875] transition-colors"
                >
                  {STUDIO_DATA.phone}
                </a>
              </li>
              <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <a 
                  href={STUDIO_DATA.whatsappLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 break-words hover:text-emerald-700 transition-colors"
                >
                  WhatsApp: {STUDIO_DATA.whatsappNumber}
                </a>
              </li>
              <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2">
                <Mail className="w-4 h-4 text-[#006875] shrink-0 mt-0.5" />
                <a 
                  href={STUDIO_DATA.emailMailto} 
                  className="min-w-0 break-words hover:text-[#006875] transition-colors"
                >
                  {STUDIO_DATA.email}
                </a>
              </li>
              <li className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-2 pt-1 border-t border-black/[0.04]">
                <Clock className="w-4 h-4 text-[#6e6e73] shrink-0 mt-0.5" />
                <div className="text-[12px] leading-relaxed">
                  {STUDIO_DATA.openingHours.map(({ days, hours }) => (
                    <div key={days}>{days}: {hours}</div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferiore: Copyright, Legale & Torna su */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#86868b]">
          <div>
            © {new Date().getFullYear()} {DOCTOR_DATA.name}. Tutti i diritti riservati.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              Termini & Condizioni
            </button>
            {onOpenCookiePreferences && (
              <button
                type="button"
                onClick={onOpenCookiePreferences}
                className="hover:text-[#006875] transition-colors cursor-pointer"
              >
                Preferenze Cookie
              </button>
            )}
            <a
              href="https://www.ordinefisioterapistimilano.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#1d1d1f] transition-colors"
            >
              <span>FNOFI</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div>
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Torna all'inizio della pagina"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] font-medium transition-colors cursor-pointer"
            >
              <span>Torna su</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
