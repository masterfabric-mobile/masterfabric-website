import type { Metadata } from 'next'
import ServicesContent from '@/components/pages/services-content'
import JsonLd from '@/components/seo/json-ld'
import { createPageMetadata } from '@/lib/seo'
import { servicePageJsonLd } from '@/lib/structured-data'
import services from '@/data/services.json'

const content = services.en

export const metadata: Metadata = createPageMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: '/yapay-zeka-donusumu/',
  keywords: content.meta.keywords,
})

export default function YapayZekaDonusumuPage() {
  return (
    <>
      <JsonLd data={servicePageJsonLd('en', '/yapay-zeka-donusumu/')} />
      <ServicesContent locale="en" />
    </>
  )
}
