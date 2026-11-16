import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from '../utils/lenis';

interface UseSmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
  offset?: number;
  anchorOffset?: number;
}

/**
 * Custom hook per implementare lo scroll fluido e inerziale stile Apple con Lenis.
 * Gestisce l'inizializzazione, il loop requestAnimationFrame, l'intercettazione degli anchor link
 * e fornisce un helper di navigazione fluida programmatico.
 */
export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  const {
    duration = 1.1,
    // Easing esponenziale fluido stile Apple
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
    touchMultiplier = 1.15,
  } = options;
  const offset = options.anchorOffset ?? options.offset ?? -88;

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Inizializza l'istanza Lenis
    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      touchMultiplier,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Gestione unificata e fluida di tutti i link interni (#id)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { 
            offset,
            duration: 1.0
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      setLenisInstance(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, easing, smoothWheel, touchMultiplier, offset]);

  /**
   * Helper programmatico per scorrere fluidamente a un elemento o ID
   */
  const scrollTo = useCallback((target: string | HTMLElement, customOffset?: number) => {
    if (lenisRef.current) {
      if (typeof target === 'string') {
        const el = document.querySelector(target.startsWith('#') ? target : `#${target}`);
        if (el) {
          lenisRef.current.scrollTo(el as HTMLElement, { 
            offset: customOffset !== undefined ? customOffset : offset,
            duration: 1.0 
          });
          return;
        }
      } else if (target instanceof HTMLElement) {
        lenisRef.current.scrollTo(target, { 
          offset: customOffset !== undefined ? customOffset : offset,
          duration: 1.0 
        });
        return;
      }
    }

    // Fallback nativo
    if (typeof target === 'string') {
      const el = document.getElementById(target.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [offset]);

  return {
    scrollTo,
    lenis: lenisRef.current
  };
};

export default useSmoothScroll;
