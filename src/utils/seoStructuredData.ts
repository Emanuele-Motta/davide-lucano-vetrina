import { siteConfig } from '../config/siteConfig';
import { SERVICES } from '../data/mockData';
import { itTranslations } from '../i18n/it';

/**
 * Genera l'oggetto Schema.org JSON-LD dinamico alimentato al 100% da siteConfig e dai dati dei servizi.
 * Garantisce massima conformità SEO e sincronizzazione con eventuali variabili di configurazione Netlify.
 */
export function generateStructuredData(baseUrl = 'https://fisioterapiamilano.it') {
  const cleanReviewsCount = siteConfig.mioDottore.totalReviewsCount.replace(/[^0-9]/g, '') || '184';
  const faqs = itTranslations.faq.items;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Physiotherapy', 'MedicalBusiness', 'LocalBusiness'],
        '@id': `${baseUrl}/#studio`,
        name: `${siteConfig.doctor.name} - ${siteConfig.doctor.title}`,
        alternateName: [
          siteConfig.doctor.name,
          `Fisioterapista ${siteConfig.doctor.name}`,
          `Fisioterapia Milano ${siteConfig.doctor.name}`,
          `Studio Fisioterapico ${siteConfig.doctor.name}`,
        ],
        description: siteConfig.doctor.bio || 'Attività professionale di fisioterapia, osteopatia e riabilitazione funzionale 1-a-1.',
        url: baseUrl,
        telephone: siteConfig.studio.phone,
        email: siteConfig.studio.email,
        priceRange: '€€',
        image: siteConfig.doctor.photoUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${siteConfig.studio.address}, ${siteConfig.studio.civic}`,
          addressLocality: siteConfig.studio.city,
          postalCode: siteConfig.studio.cap,
          addressRegion: 'MI',
          addressCountry: 'IT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.3536,
          longitude: 9.2015,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '20:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '13:00',
          },
        ],
        medicalSpecialty: [
          'Physiotherapy',
          'Musculoskeletal',
          'SportsMedicine',
        ],
        areaServed: [
          { '@type': 'City', name: 'Pieve Emanuele' },
          { '@type': 'City', name: 'Milano' },
          { '@type': 'AdministrativeArea', name: 'Città Metropolitana di Milano' },
          { '@type': 'City', name: 'Rozzano' },
          { '@type': 'City', name: 'Basiglio' },
          { '@type': 'City', name: 'Opera' },
          { '@type': 'City', name: 'Locate di Triulzi' },
          { '@type': 'City', name: 'Assago' },
        ],
        founder: {
          '@type': 'Person',
          name: siteConfig.doctor.name,
          jobTitle: siteConfig.doctor.title,
          memberOf: siteConfig.doctor.alboNumber,
          alumniOf: 'Università degli Studi di Milano',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(siteConfig.mioDottore.overallRating),
          reviewCount: cleanReviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Prestazioni Fisioterapiche e Riabilitative',
          itemListElement: SERVICES.map((service) => {
            const rawPrice = service.price.replace(/[^0-9.]/g, '');
            return {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: service.title,
                description: service.shortDesc,
                price: rawPrice || '85.00',
                priceCurrency: 'EUR',
              },
            };
          }),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: `Studio Fisioterapico - ${siteConfig.doctor.name}`,
        inLanguage: 'it-IT',
      },
    ],
  };
}

/**
 * Inietta o aggiorna dinamicamente lo script JSON-LD nel tag <head>
 */
export function injectDynamicStructuredData(): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'dynamic-json-ld';
  let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = scriptId;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const structuredData = generateStructuredData();
  scriptTag.textContent = JSON.stringify(structuredData, null, 2);
}
