import type Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const setLenisInstance = (instance: Lenis | null) => {
  globalLenis = instance;
  if (typeof window !== 'undefined') {
    (window as unknown as { __lenis?: Lenis | null }).__lenis = instance;
  }
};

export const getLenisInstance = (): Lenis | null => {
  return globalLenis;
};

export const stopLenis = () => {
  if (globalLenis) {
    try {
      globalLenis.stop();
    } catch {
      // safe fallback
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('lenis-stopped');
  }
};

export const startLenis = () => {
  if (globalLenis) {
    try {
      globalLenis.start();
    } catch {
      // safe fallback
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('lenis-stopped');
  }
};
