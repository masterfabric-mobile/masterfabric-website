import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createPageMetadata } from '@/lib/seo'
import BlogReader from '@/components/pages/blog-reader'
import { blogPosts, getPost, readingMinutes } from '@/data/blog-posts'
import { getFormattedDate } from '@/utils/utils'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
  })
}

export default function BlogPostPage({ params }: Params) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <BlogReader
      title={post.title}
      category={post.category}
      date={post.publishDate}
      dateLabel={getFormattedDate(post.publishDate)}
      author={post.author}
      minutes={readingMinutes(post)}
      body={post.body}
    />
  )
}
