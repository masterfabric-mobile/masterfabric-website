import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import CookieBanner from '@/components/cookie/CookieBanner'
import SplashScreenWrapper from '@/components/wrapper/splash-screen-wrapper'
// import { ThemeProvider } from 'next-themes'
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MasterFabric Inc. - Custom Mobile App Development',
  description: 'MasterFabric Co. is a mobile app agency specializing in developing innovative cross-platform applications for businesses.',
  keywords: ['mobile app development', 'custom apps', 'cross-platform', 'iOS', 'Android', 'React Native', 'Flutter'],
  authors: [{ name: 'MasterFabric Inc.' }],
  openGraph: {
    title: 'MasterFabric Inc. - Custom Mobile App Development',
    description: 'MasterFabric Co. is a mobile app agency specializing in developing innovative cross-platform applications for businesses.',
    url: 'https://masterfabric.co',
    siteName: 'MasterFabric Inc.',
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'MasterFabric Inc.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MasterFabric Inc. - Custom Mobile App Development',
    description: 'MasterFabric Co. is a mobile app agency specializing in developing innovative cross-platform applications for businesses.',
    images: ['/opengraph.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
