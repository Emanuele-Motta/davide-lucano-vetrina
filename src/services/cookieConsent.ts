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
