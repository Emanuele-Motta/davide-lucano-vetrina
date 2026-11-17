import { siteConfig } from '../config/siteConfig';
import { SERVICES } from '../data/mockData';
import { itTranslations } from '../i18n/it';

/**
 * Genera i dati strutturati usando i dati verificabili disponibili nella configurazione.
 */
export function generateStructuredData(baseUrl = siteConfig.siteUrl) {
  const faqs = itTranslations.faq.items;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Physiotherapy', 'MedicalBusiness', 'LocalBusiness'],
        '@id': `${baseUrl}/#studio`,
        name: `${siteConfig.doctor.name} - ${siteConfig.doctor.title}`,
        description: siteConfig.doctor.bio || 'Attività professionale di fisioterapia, terapia manuale e riabilitazione funzionale 1-a-1.',
        url: baseUrl,
        telephone: siteConfig.studio.phone,
        email: siteConfig.studio.email,
        image: siteConfig.doctor.photoUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${siteConfig.studio.address}, ${siteConfig.studio.civic}`,
          addressLocality: siteConfig.studio.city,
          postalCode: siteConfig.studio.cap,
          addressRegion: 'MI',
          addressCountry: 'IT',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
            opens: '15:00',
            closes: '20:00',
          },
        ],
        medicalSpecialty: [
          'Physiotherapy',
          'Musculoskeletal',
          'Orthopedics',
          'Neurology',
        ],
        areaServed: [
          { '@type': 'City', name: 'Milano' },
          { '@type': 'AdministrativeArea', name: 'Città Metropolitana di Milano' },
          { '@type': 'City', name: 'Corsico' },
          { '@type': 'City', name: 'Cesano Boscone' },
          { '@type': 'City', name: 'Trezzano sul Naviglio' },
          { '@type': 'City', name: 'Buccinasco' },
          { '@type': 'City', name: 'Settimo Milanese' },
          { '@type': 'City', name: 'Assago' },
        ],
        founder: {
          '@type': 'Person',
          name: siteConfig.doctor.name,
          jobTitle: siteConfig.doctor.title,
          memberOf: siteConfig.doctor.alboNumber,
          alumniOf: 'Università degli Studi di Milano',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Prestazioni Fisioterapiche e Riabilitative',
          itemListElement: SERVICES.map((service) => {
            return {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: service.title,
                description: service.shortDesc,
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
