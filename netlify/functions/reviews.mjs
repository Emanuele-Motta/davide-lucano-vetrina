const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const validRating = (value) => Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 5;

async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return [];

  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=it`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'id,googleMapsUri,reviews',
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Google Places returned ${response.status}`);

  const place = await response.json();
  return (Array.isArray(place.reviews) ? place.reviews : []).flatMap((review, index) => {
    const content = review.text?.text;
    const rating = Number(review.rating);
    if (typeof content !== 'string' || !content.trim() || !validRating(rating)) return [];

    return [{
      id: review.name || `google-${index}`,
      name: review.authorAttribution?.displayName || 'Utente Google',
      author: review.authorAttribution?.displayName || 'Utente Google',
      role: 'Recensione Google',
      rating,
      content: content.trim(),
      treatment: 'Recensione Google',
      date: review.relativePublishTimeDescription || review.publishTime || '',
      source: 'google',
      profileUrl: review.authorAttribution?.uri || place.googleMapsUri || '',
      verifiedPatient: false,
    }];
  });
}

async function getMioDottoreReviews() {
  const feedUrl = process.env.MIODOTTORE_REVIEWS_FEED_URL;
  if (!feedUrl) return [];

  const parsedUrl = new URL(feedUrl);
  if (parsedUrl.protocol !== 'https:') throw new Error('Docplanner feed must use HTTPS');

  const response = await fetch(parsedUrl, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Docplanner feed returned ${response.status}`);

  const payload = await response.json();
  const reviews = Array.isArray(payload) ? payload : payload.reviews;
  if (!Array.isArray(reviews)) return [];

  return reviews.flatMap((review, index) => {
    const content = typeof review.content === 'string' ? review.content : review.text;
    const rating = Number(review.rating);
    if (typeof content !== 'string' || !content.trim() || !validRating(rating)) return [];

    const author = review.author || review.name || 'Utente MioDottore';
    return [{
      id: String(review.id || `miodottore-${index}`),
      name: author,
      author,
      role: 'Recensione MioDottore',
      rating,
      content: content.trim(),
      treatment: review.treatment || review.service || 'Recensione MioDottore',
      date: review.date || review.publishedAt || '',
      source: 'miodottore',
      profileUrl: typeof review.url === 'string' && review.url.startsWith('https://') ? review.url : '',
      verifiedPatient: review.verifiedPatient === true,
    }];
  });
}

export default async (request) => {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const results = await Promise.allSettled([getGoogleReviews(), getMioDottoreReviews()]);
  const reviews = results.flatMap((result) => result.status === 'fulfilled' ? result.value : []);

  return jsonResponse({
    reviews,
    sources: {
      google: results[0].status === 'fulfilled' ? 'ok' : 'unavailable',
      miodottore: results[1].status === 'fulfilled' ? 'ok' : 'unavailable',
    },
  });
};