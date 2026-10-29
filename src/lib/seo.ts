import type { Metadata } from 'next'

export const SITE_URL = 'https://masterfabric.co'
export const SITE_NAME = 'MasterFabric Inc.'
export const LEGAL_NAME = 'MasterFabric Information Technology Inc.'
export const DEFAULT_TITLE = 'Custom Software & AI Transformation'
export const DEFAULT_DESCRIPTION =
  'MasterFabric builds custom software and AI transformation systems for institutions and private clients. Bespoke products — including iOS, Android, and HarmonyOS apps — designed around the brief you send us.'

export const ROUTES = {
  home: '/',
  services: '/services/',
  aiTr: '/yapay-zeka-donusumu/',
  about: '/about/',
  contact: '/contact/',
  jobs: '/jobs/',
  blog: '/blog/',
  privacy: '/privacy-policy/',
  terms: '/terms-of-use/',
} as const

export const SEO = {
  url: SITE_URL,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  tagline: 'Custom Software & AI Development Studio',
  description: DEFAULT_DESCRIPTION,
  locale: 'en_US',
  language: 'en',
  email: 'info@masterfabric.co',
  privacyEmail: 'privacy@masterfabric.co',
  legalEmail: 'legal@masterfabric.co',
  address: {
    street: 'Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227',
    locality: 'Altındağ',
    region: 'Ankara',
    country: 'TR',
    countryName: 'Turkey',
  },
  geo: {
    latitude: 39.94227,
    longitude: 32.85668,
  },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '10:00', closes: '16:00' },
  ],
  sameAs: [
    'https://github.com/masterfabric-mobile',
    'https://www.linkedin.com/company/masterfabric',
  ],
  keywords: [
    'custom software development',
    'AI transformation',
    'bespoke software',
    'enterprise AI',
    'private client software',
    'mobile app development',
    'custom mobile apps',
    'Flutter development company',
    'React Native agency',
    'iOS app development',
    'Android app development',
    'HarmonyOS apps',
    'cross-platform mobile development',
    'NestJS backend',
    'app modernization',
    'mobile app studio Ankara',
    'MasterFabric',
  ],
} as const

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
  locale?: string
  languages?: Record<string, string>
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  locale,
  languages,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const ogTitle = `${title} | ${SITE_NAME}`

  return {
    title,
    description,
    keywords: keywords ?? [...SEO.keywords],
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale ?? SEO.locale,
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${DEFAULT_TITLE}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: ['/opengraph-image'],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

export function getSiteJsonLd(): Record<string, unknown> {
  const organizationId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': organizationId,
        name: SITE_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/assets/masterfabric-logo.svg'),
        image: absoluteUrl('/opengraph-image'),
        email: SEO.email,
        description: SEO.description,
        slogan: SEO.tagline,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO.address.street,
          addressLocality: SEO.address.locality,
          addressRegion: SEO.address.region,
          addressCountry: SEO.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO.geo.latitude,
          longitude: SEO.geo.longitude,
        },
        areaServed: 'Worldwide',
        knowsLanguage: ['en', 'tr'],
        openingHoursSpecification: SEO.openingHours.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
        sameAs: [...SEO.sameAs],
        knowsAbout: [
          'AI transformation',
          'Custom software development',
          'Bespoke software',
          'Enterprise software',
          'Flutter',
          'React Native',
          'Swift',
          'Kotlin',
          'NestJS',
          'Firebase',
          'TypeScript',
          'Mobile application modernization',
        ],
        audience: [
          { '@type': 'Audience', audienceType: 'Institutions and enterprises' },
          { '@type': 'Audience', audienceType: 'Private clients' },
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Transformation',
              serviceType:
                'Production AI systems for institutions and private clients — assistants, automation, and decision support',
              url: absoluteUrl(ROUTES.aiTr),
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Software',
              serviceType:
                'Bespoke software written for a single institution or private client — not off-the-shelf products',
              url: absoluteUrl(ROUTES.services),
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Mobile App Development',
              serviceType: 'iOS, Android, and HarmonyOS application development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cross-Platform Development',
              serviceType: 'Flutter and React Native product engineering',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Application Modernization',
              serviceType: 'Legacy mobile app refactoring and performance upgrades',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Backend and Cloud Engineering',
              serviceType: 'NestJS APIs, Firebase, and CI/CD for mobile products',
            },
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: SEO.email,
            contactType: 'sales',
            availableLanguage: ['English', 'Turkish'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SEO.description,
        inLanguage: SEO.language,
        publisher: { '@id': organizationId },
      },
    ],
  }
}
