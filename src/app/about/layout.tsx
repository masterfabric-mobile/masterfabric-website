import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'About — Custom Software & AI Transformation',
  description:
    'MasterFabric builds custom software and AI transformation systems for institutions and private clients. A product studio in Ankara, shipping worldwide.',
  path: '/about/',
  keywords: [
    'MasterFabric',
    'custom software company',
    'AI transformation',
    'bespoke software company',
    'enterprise AI transformation',
    'mobile app studio Ankara',
  ],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
