import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - MasterFabric Inc.',
  description:
    'The MasterFabric blog is currently offline. Older posts were removed because they were outdated.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function BlogPage() {
  return (
    <Container>
      <SectionHead
        title="Blog"
        description="This section is not actively used right now. Previous posts were removed because they were outdated."
      />

      <main className="mt-12 max-w-2xl mx-auto text-center space-y-6 pb-20">
        <p className="text-gray-600 leading-relaxed">
          We took the blog front offline and cleared the old articles so visitors
          are not directed to stale or incomplete content. Fresh writing will
          return here when we have current material to publish.
        </p>
        <p className="text-sm text-gray-500">
          Removal reason: content was outdated and no longer actively maintained.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
    </Container>
  )
}
