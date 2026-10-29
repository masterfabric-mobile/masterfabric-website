import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/refactor-application.css'
import '../styles/iphone-frame.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import CookieBanner from '@/components/cookie/CookieBanner'
import SplashScreenWrapper from '@/components/wrapper/splash-screen-wrapper'
import JsonLd from '@/components/seo/json-ld'
import { DEFAULT_TITLE, getSiteJsonLd, SEO, SITE_NAME, SITE_URL } from '@/lib/seo'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SEO.legalName,
  publisher: SEO.legalName,
  category: 'technology',
  classification: 'Custom Software and AI Transformation',
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      'x-default': SITE_URL,
    },
    types: {
      'text/plain': `${SITE_URL}/llm.txt`,
    },
  },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${DEFAULT_TITLE}`,
    description: SEO.description,
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
    title: `${SITE_NAME} — ${DEFAULT_TITLE}`,
    description: SEO.description,
    images: ['/opengraph-image'],
  },
  robots: {
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
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'geo.region': 'TR-06',
    'geo.placename': 'Ankara',
    'geo.position': `${SEO.geo.latitude};${SEO.geo.longitude}`,
    ICBM: `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" href={`${SITE_URL}/llms.txt`} />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llm.txt`} title="LLM context" />
        <JsonLd data={getSiteJsonLd()} />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2VN4H4QK6S"
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2VN4H4QK6S');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <SplashScreenWrapper>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </SplashScreenWrapper>
          <CookieBanner />
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
