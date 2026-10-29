import fs from 'fs'
import path from 'path'

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  author: string
  publishDate: string
  category: string
  tags: string[]
  body: BlogBlock[]
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

// Front matter holds flat `key: value` lines; arrays use `[a, b]`.
function parseFrontMatter(raw: string) {
  const data: Record<string, string | string[]> = {}
  for (const line of raw.split('\n')) {
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (!match) continue
    const value = match[2].trim()
    data[match[1]] = value.startsWith('[')
      ? value.slice(1, -1).split(',').map((item) => item.trim()).filter(Boolean)
      : value.replace(/^"(.*)"$/, '$1')
  }
  return data
}

// Supports the subset the reader renders: paragraphs, ##, -, >, and ``` fences.
function parseBody(markdown: string): BlogBlock[] {
  const blocks: BlogBlock[] = []
  const fences = markdown.split(/^```[^\n]*\n([\s\S]*?)^```\s*$/m)
  fences.forEach((chunk, index) => {
    if (index % 2 === 1) {
      blocks.push({ type: 'code', text: chunk.replace(/\n$/, '') })
      return
    }
    for (const para of chunk.split(/\n\s*\n/)) {
      const text = para.trim()
      if (!text) continue
      if (text.startsWith('## ')) blocks.push({ type: 'h2', text: text.slice(3).trim() })
      else if (text.startsWith('- '))
        blocks.push({ type: 'ul', items: text.split('\n').map((line) => line.replace(/^-\s+/, '').trim()) })
      else if (text.startsWith('> '))
        blocks.push({ type: 'quote', text: text.split('\n').map((line) => line.replace(/^>\s?/, '')).join(' ') })
      else blocks.push({ type: 'p', text: text.replace(/\n/g, ' ') })
    }
  })
  return blocks
}

function loadPost(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw new Error(`Missing front matter in ${file}`)
  const data = parseFrontMatter(match[1])
  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title ?? ''),
    excerpt: String(data.excerpt ?? ''),
    author: String(data.author ?? 'MasterFabric Team'),
    publishDate: String(data.publishDate ?? ''),
    category: String(data.category ?? 'General'),
    tags: Array.isArray(data.tags) ? data.tags : [],
    body: parseBody(match[2]),
  }
}

export const blogPosts: BlogPost[] = fs
  .readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .map(loadPost)

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function readingMinutes(post: BlogPost) {
  const words = post.body
    .map((block) => ('items' in block ? block.items.join(' ') : block.text))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function sortedPosts() {
  return [...blogPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}
