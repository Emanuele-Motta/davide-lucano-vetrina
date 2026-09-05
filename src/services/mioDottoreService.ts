import { Testimonial } from '../types';
import { MIO_DOTTORE_CONFIG, MIO_DOTTORE_REVIEWS, getAllReviews } from '../data/reviewsConfig';

/**
 * Servizio di sincronizzazione recensioni MioDottore.
 * Gestisce il caricamento da endpoint API automatico se configurato,
 * con fallback immediato e sicuro sul dataset certificato in reviewsConfig.ts.
 */
export async function fetchLiveReviews(): Promise<{
  reviews: Testimonial[];
  isLiveSynced: boolean;
  source: string;
}> {
  if (!MIO_DOTTORE_CONFIG.autoFetchApiUrl) {
    return {
      reviews: getAllReviews(),
      isLiveSynced: false,
      source: 'reviewsConfig.ts',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(MIO_DOTTORE_CONFIG.autoFetchApiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // Unisci i dati live ricevuti con le recensioni manuali aggiuntive
        const additional = getAllReviews().filter(r => r.source !== 'miodottore');
        return {
          reviews: [...data, ...additional],
          isLiveSynced: true,
          source: 'MioDottore API Live',
        };
      }
    }
  } catch (err) {
    console.info('Utilizzo recensioni certificate locali da reviewsConfig.ts:', err);
  }

  return {
    reviews: getAllReviews(),
    isLiveSynced: false,
    source: 'reviewsConfig.ts',
  };
}
