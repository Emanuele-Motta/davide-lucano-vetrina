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
      data-lenis-prevent
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-black/[0.08] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {/* Expanded Preferences Drawer (shown only if user clicks Personalizza) */}
      {showPreferences && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-4 pb-3 border-b border-black/[0.06] animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <div>
              <h3 className="text-[13px] font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#006875]" />
                <span>Gestione Consensi Cookie</span>
              </h3>
              <p className="text-[11.5px] text-[#6e6e73]">
                Gestisci le categorie opzionali e consulta le preferenze salvate.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="text-[#5e5e62] hover:text-[#1d1d1f] text-[12px] font-medium cursor-pointer"
            >
              Nascondi
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-2">
            {/* 1. Necessary */}
            <div className="p-2.5 bg-[#f5f5f7] rounded-xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="font-semibold text-[12px] text-[#1d1d1f] block">
                  Tecnici & Sicurezza
                </span>
                <span className="text-[10.5px] text-[#5e5e62] block">Sempre attivi (indispensabili)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium shrink-0">
                Attivi
              </span>
            </div>

            {/* 2. Preferences */}
            <div className="p-2.5 bg-[#f5f5f7] rounded-xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="font-semibold text-[12px] text-[#1d1d1f] block">
                  Preferenze
                </span>
                <span className="text-[10.5px] text-[#6e6e73] block">Lingua e filtri</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-label="Cookie di preferenza"
                aria-checked={preferences.preferences}
                onClick={() => setPreferences(prev => ({ ...prev, preferences: !prev.preferences }))}
                className={`w-8 h-4.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  preferences.preferences ? 'bg-[#006875]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                    preferences.preferences ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* 3. Analytics */}
            <div className="p-2.5 bg-[#f5f5f7] rounded-xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="font-semibold text-[12px] text-[#1d1d1f] block">
                  Statistiche
                </span>
                <span className="text-[10.5px] text-[#6e6e73] block">Metriche aggregate</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-label="Cookie analitici"
                aria-checked={preferences.analytics}
                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                className={`w-8 h-4.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  preferences.analytics ? 'bg-[#006875]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                    preferences.analytics ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* 4. Marketing */}
            <div className="p-2.5 bg-[#f5f5f7] rounded-xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="font-semibold text-[12px] text-[#1d1d1f] block">
                  Servizi Terzi
                </span>
                <span className="text-[10.5px] text-[#6e6e73] block">Mappe e media</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-label="Servizi di terze parti, incluse le mappe"
                aria-checked={preferences.marketing}
                onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                className={`w-8 h-4.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  preferences.marketing ? 'bg-[#006875]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                    preferences.marketing ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Thin Sticky Bottom Bar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-[12.5px] text-[#4a4a4a]">
        
        {/* Left: Non-intrusive text */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <Cookie className="w-4 h-4 text-[#5e5e62] shrink-0 hidden sm:block" />
          <p className="leading-snug text-[#515154]">
            Questo sito utilizza cookie tecnici e, previo consenso, cookie analitici.
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="text-[#0071e3] hover:underline font-medium ml-1.5 cursor-pointer inline-flex items-center gap-0.5"
            >
              <span>Cookie Policy</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </p>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          {showPreferences ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className="bg-[#006875] text-white py-1.5 px-4 rounded-full text-[12px] font-medium hover:bg-[#005560] transition-colors cursor-pointer shadow-2xs"
            >
              Salva scelte
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="py-1.5 px-3 rounded-full text-[12px] font-medium text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>Personalizza</span>
              </button>

              <button
                type="button"
                onClick={handleRejectAll}
                className="bg-white text-[#1d1d1f] border border-black/[0.12] hover:bg-[#f5f5f7] py-1.5 px-3.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Solo essenziali
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleAcceptAll}
            className="bg-[#006875] text-white py-1.5 px-4.5 rounded-full text-[12px] font-medium hover:bg-[#005560] transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            Accetta tutti
          </button>

          {/* Close X: Reject all non-technical cookies per Garante 2021 */}
          <button
            type="button"
            onClick={handleRejectAll}
            className="p-1.5 text-[#5e5e62] hover:text-[#1d1d1f] rounded-full hover:bg-black/[0.04] transition-colors shrink-0 cursor-pointer ml-0.5"
            title="Chiudi e continua solo con i cookie essenziali"
            aria-label="Chiudi e continua solo con i cookie tecnici essenziali"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
