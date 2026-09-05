import React, { useState, useEffect } from 'react';
import { 
  CookieCategories, 
  CookieConsentRecord, 
  getStoredCookieConsent, 
  saveCookieConsent 
} from '../services/cookieConsent';
import { 
  ShieldCheck, 
  Cookie, 
  Sliders, 
  Check, 
  X, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Lock
} from 'lucide-react';

interface CookieBannerProps {
  onOpenLegal: (type: 'privacy' | 'cookies' | 'terms') => void;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ 
  onOpenLegal,
  forceOpen = false,
  onCloseForceOpen
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Granular categories state
  const [preferences, setPreferences] = useState<CookieCategories>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  // Check consent on mount or when forceOpen changes
  useEffect(() => {
    if (forceOpen) {
      const stored = getStoredCookieConsent();
      if (stored) {
        setPreferences(stored.categories);
      }
      setShowPreferences(true);
      setIsOpen(true);
      return;
    }

    const stored = getStoredCookieConsent();
    if (!stored) {
      // Delay slightly for smooth entering animation
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setPreferences(stored.categories);
      setIsOpen(false);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    saveCookieConsent(
      { necessary: true, preferences: true, analytics: true, marketing: true },
      'accepted_all'
    );
    setIsOpen(false);
    setShowPreferences(false);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  const handleRejectAll = () => {
    // Garante 2021: equivalent to "Continua senza accettare" / only technical
    saveCookieConsent(
      { necessary: true, preferences: false, analytics: false, marketing: false },
      'rejected_all'
    );
    setIsOpen(false);
    setShowPreferences(false);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  const handleSaveCustom = () => {
    saveCookieConsent(preferences, 'customized');
    setIsOpen(false);
    setShowPreferences(false);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  if (!isOpen) return null;

  return (
    <aside 
      role="region"
      aria-label="Informativa Cookie e Consenso"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-auto right-3 sm:right-5 z-40 max-w-xl w-auto pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div 
        className="pointer-events-auto bg-white/98 backdrop-blur-md rounded-[22px] sm:rounded-[26px] shadow-2xl border border-gray-200/90 overflow-hidden flex flex-col max-h-[85vh] transition-all"
      >
        {/* Header with Title and Garante-compliant X (Continua senza accettare) */}
        <div className="px-4 sm:px-5 pt-4 pb-2.5 flex items-start justify-between gap-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/20 text-[#006875] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h2 id="cookie-banner-title" className="text-[15px] font-bold text-[#121212] tracking-tight">
                Informativa Cookie
              </h2>
              <span className="text-[11px] text-[#006875] font-semibold">
                Dott. Davide Lucano • Conforme Garante Privacy 2021 & GDPR
              </span>
            </div>
          </div>

          {/* Close 'X' Button: As mandated by Italian Garante Guidelines (June 2021),
              closing via 'X' equals rejecting all non-technical cookies */}
          <button
            type="button"
            onClick={handleRejectAll}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
            title="Continua senza accettare (solo cookie tecnici essenziali)"
            aria-label="Chiudi e continua solo con i cookie tecnici essenziali"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable / Compact Content Body */}
        <div className="px-4 sm:px-5 py-3 overflow-y-auto space-y-2.5 text-[12.5px] sm:text-[13px] text-[#4a4a4a] leading-relaxed max-h-[50vh] overscroll-contain">
          <p>
            Questo sito utilizza cookie tecnici necessari per il corretto funzionamento e la sicurezza della navigazione. Previo tuo consenso, possono essere impiegati anche cookie di preferenza, analitici e di profilazione per migliorare l&apos;esperienza.
          </p>

          <p className="text-[11.5px] text-[#666]">
            Cliccando su <strong>&ldquo;Accetta tutti&rdquo;</strong> acconsenti a tutti i cookie. Chiudendo con la <strong>&ldquo;X&rdquo;</strong> o cliccando su <strong>&ldquo;Solo essenziali&rdquo;</strong>, la navigazione continuerà solo con i cookie tecnici indispensabili.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[11.5px] pt-0.5">
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="text-[#006875] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Cookie Policy estesa</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="text-[#006875] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Informativa Privacy</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Granular Preferences Accordion */}
          {showPreferences && (
            <div className="pt-2 border-t border-gray-100 space-y-2.5 animate-in fade-in duration-200">
              <h3 className="text-[13px] font-bold text-[#121212] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#006875]" />
                <span>Gestione granulare del consenso</span>
              </h3>

              {/* 1. Necessary (Always Active) */}
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/70 flex items-start justify-between gap-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[12.5px] text-[#121212]">
                      Cookie Tecnici & Necessari
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#00E5FF]/20 text-[#006875]">
                      Sempre Attivi
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    Indispensabili per sicurezza, prenotazione e sessione. Non disattivabili.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <div className="w-7 h-4 bg-[#006875] rounded-full flex items-center justify-end px-1 opacity-70 cursor-not-allowed">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>

              {/* 2. Preferences / Functional */}
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/70 flex items-start justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="font-bold text-[12.5px] text-[#121212] block">
                    Preferenze & Funzionali
                  </span>
                  <p className="text-[11px] text-[#666] leading-snug">
                    Memorizzano la lingua e le impostazioni dell&apos;interfaccia.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.preferences}
                    onClick={() => setPreferences(prev => ({ ...prev, preferences: !prev.preferences }))}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      preferences.preferences ? 'bg-[#006875]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        preferences.preferences ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 3. Analytics / Statistics */}
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/70 flex items-start justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="font-bold text-[12.5px] text-[#121212] block">
                    Statistici & Analitici (Anonimizzati)
                  </span>
                  <p className="text-[11px] text-[#666] leading-snug">
                    Misurano le visite in forma anonima per ottimizzare il servizio.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.analytics}
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      preferences.analytics ? 'bg-[#006875]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 4. Marketing & Profiling */}
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/70 flex items-start justify-between gap-2.5">
                <div className="space-y-0.5">
                  <span className="font-bold text-[12.5px] text-[#121212] block">
                    Marketing & Servizi Terzi
                  </span>
                  <p className="text-[11px] text-[#666] leading-snug">
                    Integrazione con mappe e strumenti multimediali esterni.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.marketing}
                    onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      preferences.marketing ? 'bg-[#006875]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="px-4 sm:px-5 py-3 bg-gray-50/90 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
          
          {/* Toggle preferences view button */}
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-[12px] font-semibold text-[#006875] hover:bg-[#006875]/10 transition-colors cursor-pointer"
          >
            <Sliders className="w-3 h-3" />
            <span>{showPreferences ? 'Meno opzioni' : 'Personalizza'}</span>
            {showPreferences ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="bg-[#006875] text-white py-1.5 px-4 rounded-full text-[12.5px] font-bold hover:bg-[#004f58] transition-colors cursor-pointer shadow-xs"
              >
                Salva scelte
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRejectAll}
                className="bg-white text-[#444] border border-gray-300 hover:bg-gray-100 py-1.5 px-3.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                Solo essenziali
              </button>
            )}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="bg-[#00E5FF] text-[#121212] py-1.5 px-4 rounded-full text-[12.5px] font-bold hover:bg-[#00d0e6] transition-colors cursor-pointer shadow-xs"
            >
              Accetta tutti
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};
