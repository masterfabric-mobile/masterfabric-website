import { LEGAL_NAME, ROUTES, SITE_URL, absoluteUrl } from '@/lib/seo'
import services from '@/data/services.json'

export function servicePageJsonLd(locale: 'en' | 'tr', pathOverride?: string) {
  const content = services[locale]
  const url = absoluteUrl(pathOverride ?? content.path)
  const inLanguage = locale === 'tr' ? 'tr-TR' : 'en-US'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.hero.title,
      serviceType:
        locale === 'tr' ? 'Yapay zeka dönüşümü ve özel yazılım' : 'AI transformation and custom software',
      description: content.meta.description,
      url,
      inLanguage,
      provider: {
        '@type': 'Organization',
        name: LEGAL_NAME,
        url: SITE_URL,
      },
      audience: [
        {
          '@type': 'Audience',
          audienceType: locale === 'tr' ? 'Kurumlar' : 'Institutions and enterprises',
        },
        {
          '@type': 'Audience',
          audienceType: locale === 'tr' ? 'Özel müşteriler' : 'Private clients',
        },
      ],
      areaServed: ['TR', 'Worldwide'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage,
      mainEntity: content.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'tr' ? 'Ana sayfa' : 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: content.hero.eyebrow,
          item: url,
        },
      ],
    },
  ]
}

export function serviceAlternates() {
  return {
    en: absoluteUrl(ROUTES.services),
    tr: absoluteUrl(ROUTES.aiTr),
    'x-default': absoluteUrl(ROUTES.services),
  }
}
