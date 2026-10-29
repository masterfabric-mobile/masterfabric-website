import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import BlogList from '@/components/pages/blog-list'
import { readingMinutes, sortedPosts } from '@/data/blog-posts'

export const metadata: Metadata = createPageMetadata({
  title: 'Blog',
  description: 'Notes from MasterFabric on AI-native software delivery, Claude Code, and building custom software.',
  path: '/blog/',
})

export default function BlogPage() {
  const posts = sortedPosts().map((post) => ({ ...post, minutes: readingMinutes(post) }))

  return (
    <Container>
      <SectionHead
        title="Blog"
        description="Notes on AI-native delivery, Claude Code, and building software that lasts."
      />
      <main className="mt-12 pb-20">
        <BlogList posts={posts} />
      </main>
    </Container>
  )
}
