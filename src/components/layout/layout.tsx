'use client'

import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import Script from 'next/script';

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({ 
  children, 
  title = "MasterFabric Inc. - Mobile App Development Agency",
  description = "MasterFabric Co. is a mobile app agency specializing in developing applications."
}: LayoutProps) {
  const makeTitle = title === "MasterFabric Inc." ? title : `${title} - MasterFabric Inc.`
  const canonicalURL = typeof window !== 'undefined' ? window.location.href : ''
  
  return (
    <>
      <Head>
        <title>{makeTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="masterfabric-repository" content="https://github.com/masterfabric/masterfabric-website" />
        <meta name="masterfabric-version" content="1.0.0" />
        <meta name="masterfabric-author" content="Gürkan Fikret Günak" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href={canonicalURL} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:title" content={makeTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/opengraph.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalURL} />
        <meta property="twitter:title" content={makeTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/opengraph.png" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2VN4H4QK6S"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2VN4H4QK6S');
          `,
        }}
      />
    </>
  )
}
