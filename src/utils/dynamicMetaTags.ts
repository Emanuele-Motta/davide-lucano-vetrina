import { useEffect, useState, useRef, useMemo } from 'react';
import { siteConfig, getOrderedSections, SiteSectionKey, SectionItemConfig } from '../config/siteConfig';

export interface SectionSeoMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
  keywords?: string[];
}

export const BASE_SITE_URL = siteConfig.siteUrl;

export const DEFAULT_SEO_METADATA: SectionSeoMetadata = {
  id: 'hero',
  title: 'Dott. Davide Lucano | Fisioterapista a Milano',
  description: 'Fisioterapia a Milano con il Dott. Davide Lucano: valutazione fisioterapica, terapia manuale e percorsi di riabilitazione personalizzati.',
  url: `${BASE_SITE_URL}/`,
  keywords: [
    'fisioterapista milano',
    'fisioterapia milano',
    'riabilitazione milano',
    'terapia manuale milano',
    'davide lucano fisioterapista',
  ],
};

/**
 * Risolve la configurazione SEO per un dato id o chiave di sezione.
 * Se la sezione non è specificata o corrisponde a 'hero', restituisce i metadati di default.
 */
export function getSectionSeo(sectionIdOrKey?: string): SectionSeoMetadata {
  if (!sectionIdOrKey || sectionIdOrKey === 'hero') {
    return { ...DEFAULT_SEO_METADATA };
  }

  // Cerca per chiave diretta (es. 'about', 'services') o per id HTML (es. 'chi-sono', 'servizi')
  const sections = siteConfig.sections;
  const matchEntry = Object.entries(sections).find(([key, cfg]) => {
    return key === sectionIdOrKey || cfg.id === sectionIdOrKey;
  }) as [SiteSectionKey, SectionItemConfig] | undefined;

  if (matchEntry) {
    const [, cfg] = matchEntry;
    const title = cfg.seoTitle || `${cfg.name} | Dott. Davide Lucano Fisioterapista Milano`;
    const description = cfg.seoDescription || DEFAULT_SEO_METADATA.description;
    const url = cfg.id === 'hero' ? `${BASE_SITE_URL}/` : `${BASE_SITE_URL}/#${cfg.id}`;

    return {
      id: cfg.id,
      title,
      description,
      url,
    };
  }

  return { ...DEFAULT_SEO_METADATA };
}

/**
 * Helper per impostare o creare un tag <meta> nell'<head>.
 */
function setMetaElement(selector: string, attributeName: string, attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Inietta dinamicamente i tag di titolo, descrizione e OpenGraph/Twitter nell'<head>.
 */
export function injectDynamicMetaTags(metadata: SectionSeoMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Aggiorna document.title
  if (document.title !== metadata.title) {
    document.title = metadata.title;
  }

  // 2. Aggiorna meta description
  setMetaElement('meta[name="description"]', 'name', 'description', metadata.description);

  // 3. Aggiorna OpenGraph Title & Description & URL
  setMetaElement('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  setMetaElement('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  setMetaElement('meta[property="og:url"]', 'property', 'og:url', metadata.url);
  setMetaElement('meta[property="og:image"]', 'property', 'og:image', `${BASE_SITE_URL}/doctor_davide_lucano.jpg`);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `${BASE_SITE_URL}/`;

  // 4. Aggiorna Twitter Card Title & Description
  setMetaElement('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
  setMetaElement('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);
  setMetaElement('meta[name="twitter:image"]', 'name', 'twitter:image', `${BASE_SITE_URL}/doctor_davide_lucano.jpg`);

  // 5. Notifica eventi personalizzati (utile per tracking analitico / debug)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('section_meta_updated', { detail: metadata }));
  }
}

/**
 * Inietta direttamente i metadati SEO per una sezione specifica.
 */
export function injectSectionMeta(sectionIdOrKey?: string): SectionSeoMetadata {
  const seo = getSectionSeo(sectionIdOrKey);
  injectDynamicMetaTags(seo);
  return seo;
}

/**
 * Ripristina i metadati predefiniti del sito.
 */
export function resetDefaultMeta(): SectionSeoMetadata {
  return injectSectionMeta('hero');
}

/**
 * Restituisce la mappa di tutti i metadati SEO configurati per tutte le sezioni abilitate.
 */
export function getAllConfiguredSectionsSeo(): SectionSeoMetadata[] {
  return getOrderedSections().map(({ key }) => getSectionSeo(key));
}

export interface UseActiveSectionMetaOptions {
  enabled?: boolean;
  offsetPx?: number;
  syncHash?: boolean;
}

/**
 * Hook React che osserva lo scorrimento e la sezione correntemente visibile nella viewport dell'utente,
 * iniettando automaticamente i meta tag unici (title, description, og:title, og:description) corrispondenti.
 */
export function useActiveSectionMeta(options: UseActiveSectionMetaOptions = {}) {
  const { enabled = true, offsetPx = 180, syncHash = false } = options;
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [activeSeo, setActiveSeo] = useState<SectionSeoMetadata>(() => getSectionSeo('hero'));
  const lastActiveRef = useRef<string>('hero');

  // Elenco delle sezioni abilitate e ordinate
  const orderedSections = useMemo(() => getOrderedSections(), []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // 1. Controllo immediato per hash presente nell'URL (es. arrivo diretto su #servizi)
    if (window.location.hash) {
      const initialId = window.location.hash.replace('#', '');
      const initialSeo = getSectionSeo(initialId);
      if (initialSeo.id !== 'hero') {
        setActiveSectionId(initialSeo.id);
        setActiveSeo(initialSeo);
        injectDynamicMetaTags(initialSeo);
        lastActiveRef.current = initialSeo.id;
      }
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;

        const scrollY = window.scrollY;

        // Se siamo vicini alla cima della pagina, la sezione attiva è 'hero'
        if (scrollY < 120) {
          if (lastActiveRef.current !== 'hero') {
            lastActiveRef.current = 'hero';
            const seo = getSectionSeo('hero');
            setActiveSectionId('hero');
            setActiveSeo(seo);
            injectDynamicMetaTags(seo);
            if (syncHash && window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }
          return;
        }

        // Rileva la sezione attualmente visibile nella viewport
        const sectionElements = orderedSections
          .map((s) => ({
            id: s.config.id,
            key: s.key,
            element: document.getElementById(s.config.id),
          }))
          .filter((item): item is { id: string; key: SiteSectionKey; element: HTMLElement } => Boolean(item.element));

        const probePoint = scrollY + offsetPx;
        let currentActive = 'hero';

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const sec = sectionElements[i];
          if (sec.element.offsetTop <= probePoint) {
            currentActive = sec.id;
            break;
          }
        }

        if (currentActive !== lastActiveRef.current) {
          lastActiveRef.current = currentActive;
          const seo = getSectionSeo(currentActive);
          setActiveSectionId(currentActive);
          setActiveSeo(seo);
          injectDynamicMetaTags(seo);

          if (syncHash && currentActive !== 'hero') {
            window.history.replaceState(null, '', `#${currentActive}`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Esecuzione immediata
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, offsetPx, syncHash, orderedSections]);

  return {
    activeSectionId,
    activeSeo,
  };
}
