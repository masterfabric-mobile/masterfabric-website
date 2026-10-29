import type { Metadata } from 'next'
import NotFoundGuide from '@/components/pages/not-found-guide'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return <NotFoundGuide />
}
