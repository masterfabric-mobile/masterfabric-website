import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - MasterFabric Inc.',
  description: 'Read our latest thoughts and insights about mobile app development.',
}

// This would typically fetch from a CMS or markdown files
const blogPosts = [
  {
    slug: 'mobile-app-trends-2024',
    title: 'Mobile App Development Trends in 2024',
    excerpt: 'Explore the latest trends shaping mobile app development in 2024.',
    author: 'MasterFabric Team',
    publishDate: '2024-01-15',
    category: 'Technology',
    tags: ['mobile', 'trends', '2024'],
    image: '/blog/mobile-trends-2024.jpg'
  },
  {
    slug: 'cross-platform-vs-native',
    title: 'Cross-Platform vs Native: Making the Right Choice',
    excerpt: 'A comprehensive guide to choosing between cross-platform and native development.',
    author: 'MasterFabric Team', 
    publishDate: '2024-01-10',
    category: 'Development',
    tags: ['cross-platform', 'native', 'guide'],
    image: '/blog/cross-platform-native.jpg'
  }
]

export default function BlogPage() {
  return (
    <Container>
      <SectionHead
        title="Our Blog"
        description="We write about building startups and thoughts going on our mind."
      />
      
      <main className="mt-16">
        <ul className="grid gap-16 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <li key={index}>
              <Link href={`/blog/${post.slug}`}>
                <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-center hover:shadow-lg transition-shadow p-6 rounded-lg">
                  <div className="aspect-video bg-gray-200 rounded-lg"></div>
                  <div>
                    <span className="text-blue-400 uppercase tracking-wider text-sm font-medium">
                      {post.category}
                    </span>
                    <h2 className="text-3xl font-semibold leading-snug tracking-tight mt-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mt-3">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-gray-400">
                        {post.author}
                      </span>
                      <span className="text-gray-400">• </span>
                      <time className="text-gray-400" dateTime={post.publishDate}>
                        {new Date(post.publishDate).toDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  )
}
