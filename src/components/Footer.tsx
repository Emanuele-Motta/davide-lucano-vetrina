import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp, 
  MessageCircle, 
  ExternalLink,
  Award,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { siteConfig, getOrderedSections } from '../config/siteConfig';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'cookies' | 'terms') => void;
  onOpenCookiePreferences?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCookiePreferences }) => {
  const { t } = useTranslation();

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
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-black/[0.06]">
          
          {/* Column 1: Identity & Professional Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-11 sm:h-12 w-auto rounded-lg overflow-hidden bg-[#00b488] shadow-2xs ring-1 ring-black/[0.08]">
                <img 
                  src={LOGO_URL} 
                  alt="Logo Studio Medico Fisioterapico" 
                  width={130}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-[12.5px] text-[#6e6e73] leading-relaxed">
              Trattamenti specialistici individuali 1-a-1, riabilitazione funzionale e terapia manuale a Milano e Pieve Emanuele.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11.5px] text-[#86868b]">
              <span className="inline-flex items-center gap-1 font-mono text-[#515154]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {siteConfig.doctor.alboNumber}
              </span>
              <span>•</span>
              <a 
                href={siteConfig.mioDottore.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#006875] hover:underline"
              >
                <span>5.0 ★ MioDottore</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider block">
              Menu
            </span>
            <ul className="space-y-1.5 text-[12.5px]">
              {activeSections.map(({ config }) => (
                <li key={config.id}>
                  <a 
                    href={`#${config.id}`} 
                    className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors focus-visible:outline-hidden focus-visible:text-[#006875]"
                  >
                    {config.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Studio Details (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider block">
              Orari Studio
            </span>
            <div className="space-y-1 text-[12.5px]">
              {siteConfig.studio.openingHours.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-0.5">
                  <span className="text-[#86868b]">{item.days}</span>
                  <span className="font-medium text-[#1d1d1f]">{item.hours}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1.5 text-[11.5px] text-[#86868b]">
              <Clock className="w-3 h-3 text-[#006875] shrink-0" />
              <span>Visite solo previo appuntamento</span>
            </div>
          </div>

          {/* Column 4: Contacts & Studio Address (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider block">
              Contatti
            </span>
            <ul className="space-y-2 text-[12.5px]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#006875] shrink-0 mt-0.5" />
                <a 
                  href={siteConfig.studio.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors leading-snug"
                >
                  {siteConfig.studio.fullAddress}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#006875] shrink-0" />
                <a 
                  href={`tel:${siteConfig.studio.phone.replace(/\s+/g, '')}`}
                  className="text-[#1d1d1f] font-medium hover:text-[#006875] transition-colors"
                >
                  {siteConfig.studio.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a 
                  href={siteConfig.studio.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
                >
                  WhatsApp: {siteConfig.studio.whatsappNumber}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#006875] shrink-0" />
                <a 
                  href={`mailto:${siteConfig.studio.email}`}
                  className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                >
                  {siteConfig.studio.email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={handleBackToTop}
                aria-label="Torna all'inizio della pagina"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] text-[11.5px] font-medium transition-all cursor-pointer border border-black/[0.08] shadow-2xs active:scale-[0.97]"
              >
                <ArrowUp className="w-3 h-3 text-[#006875]" />
                <span>Torna su</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="py-4 text-[11px] text-[#86868b] flex items-start gap-2 border-b border-black/[0.06] leading-relaxed">
          <AlertCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
          <span>
            Le informazioni cliniche fornite hanno finalità puramente divulgative e non sostituiscono il parere medico. Per emergenze contattare il 112. Spese sanitarie detraibili al 19% (art. 10 DPR 633/72).
          </span>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11.5px] text-[#86868b] text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.doctor.name} • P.IVA {siteConfig.studio.piva} • {siteConfig.doctor.alboNumber}
          </p>

          <nav aria-label="Link legali e conformità normativa" className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer focus-visible:outline-hidden"
            >
              {t.footer.legal.privacy}
            </button>
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer focus-visible:outline-hidden"
            >
              {t.footer.legal.cookies}
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer focus-visible:outline-hidden"
            >
              {t.footer.legal.terms}
            </button>
            {onOpenCookiePreferences && (
              <button
                onClick={onOpenCookiePreferences}
                className="text-[#006875] hover:underline transition-all cursor-pointer font-medium focus-visible:outline-hidden"
              >
                Preferenze Cookie
              </button>
            )}
          </nav>
        </div>

      </div>
    </footer>
  );
};
