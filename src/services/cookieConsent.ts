export interface CookieCategories {
  necessary: boolean; // Always true, cannot be changed
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentRecord {
  version: string;
  timestamp: string;
  categories: CookieCategories;
  status: 'accepted_all' | 'rejected_all' | 'customized';
}

const COOKIE_STORAGE_KEY = 'davide_lucano_cookie_consent_v2';
const CONSENT_VERSION = '2.0';
// 6 months validity according to Garante guidelines
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export const getStoredCookieConsent = (): CookieConsentRecord | null => {
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const parsed: CookieConsentRecord = JSON.parse(raw);
    
    // Check if valid version and not expired
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    const consentDate = new Date(parsed.timestamp).getTime();
    if (isNaN(consentDate) || Date.now() - consentDate > CONSENT_MAX_AGE_MS) {
      return null;
    }

    return parsed;
  } catch (e) {
    console.error('Errore nella lettura del consenso cookie:', e);
    return null;
  }
};

export const saveCookieConsent = (
  categories: Partial<CookieCategories>,
  status: 'accepted_all' | 'rejected_all' | 'customized'
): CookieConsentRecord => {
  const finalCategories: CookieCategories = {
    necessary: true,
    preferences: Boolean(categories.preferences),
    analytics: Boolean(categories.analytics),
    marketing: Boolean(categories.marketing),
  };

  const record: CookieConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: finalCategories,
    status,
  };

  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(record));
    // Trigger custom event for external scripts/analytics to react
    window.dispatchEvent(
      new CustomEvent('cookie_consent_updated', { detail: record })
    );
  } catch (e) {
    console.error('Errore nel salvataggio del consenso cookie:', e);
  }

  return record;
};

export const clearCookieConsent = () => {
  try {
    localStorage.removeItem(COOKIE_STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Inizializza Google Analytics solo ed esclusivamente se l'utente ha prestato consenso esplicito per la categoria "analytics"
 * e se è configurato un VITE_GA_MEASUREMENT_ID valido.
 */
export const initializeAnalyticsIfConsented = (measurementId?: string) => {
  if (!measurementId || typeof window === 'undefined') return;

  const consent = getStoredCookieConsent();
  if (!consent || !consent.categories.analytics) {
    return;
  }

  // Se già caricato, non reinserire
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true,
  });
};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
