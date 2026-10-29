import { Metadata } from 'next'
import Contact from '@/components/forms/contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Start a custom software or AI transformation project with MasterFabric. Institutions and private clients — Ankara studio, worldwide delivery.',
  path: '/contact/',
  keywords: [
    'contact MasterFabric',
    'custom software quote',
    'AI transformation consultation',
    'custom software quote',
    'hire mobile app developers',
    'Flutter agency Ankara',
  ],
})

export default function ContactPage() {
  return <Contact />
}
