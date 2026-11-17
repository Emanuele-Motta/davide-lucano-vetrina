import { Testimonial, MioDottoreConfig } from '../types';
import { siteConfig } from '../config/siteConfig';

export const MIO_DOTTORE_CONFIG: MioDottoreConfig = {
  profileUrl: siteConfig.mioDottore.profileUrl,
  doctorSlug: siteConfig.mioDottore.doctorSlug,
  verifiedStatus: siteConfig.mioDottore.badgeLabel,
  autoFetchApiUrl: '',
};

export const MIO_DOTTORE_REVIEWS: Testimonial[] = [];
export const ADDITIONAL_REVIEWS: Testimonial[] = [];

export function getAllReviews(): Testimonial[] {
  return [];
}

export function getReviewsOverview(reviews: Testimonial[] = getAllReviews()) {
  const mioDottoreCount = reviews.filter((review) => review.source === 'miodottore').length;
  const additionalCount = reviews.filter((review) => review.source !== 'miodottore').length;

  return {
    totalCount: reviews.length,
    mioDottoreCount,
    additionalCount,
    profileUrl: MIO_DOTTORE_CONFIG.profileUrl,
  };
}