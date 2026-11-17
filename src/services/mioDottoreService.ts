import { Testimonial } from '../types';
import { getAllReviews } from '../data/reviewsConfig';

interface ReviewsResponse {
  reviews?: Testimonial[];
}

export async function fetchLiveReviews(signal?: AbortSignal): Promise<Testimonial[]> {
  const response = await fetch('/.netlify/functions/reviews', {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Reviews endpoint returned ${response.status}`);
  }

  const data = await response.json() as ReviewsResponse;
  return Array.isArray(data.reviews) ? data.reviews : getAllReviews();
}
