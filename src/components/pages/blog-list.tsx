'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, List } from 'lucide-react'
import type { BlogPost } from '@/data/blog-posts'
import { getFormattedDate } from '@/utils/utils'

type Props = {
  posts: (BlogPost & { minutes: number })[]
}

type View = 'grid' | 'list'

export default function BlogList({ posts }: Props) {
  const [view, setView] = useState<View>('grid')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  )
  const visible = category === 'All' ? posts : posts.filter((post) => post.category === category)

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                category === name
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="inline-flex self-start rounded-lg border border-gray-200 p-1 sm:self-auto" role="group" aria-label="View">
          {([
            ['grid', LayoutGrid, 'Grid view'],
            ['list', List, 'List view'],
          ] as const).map(([value, Icon, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setView(value)}
              aria-pressed={view === value}
              aria-label={label}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                view === value ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 uppercase tracking-wider text-blue-600">
                    {post.category}
                  </span>
                  <span className="text-gray-400">{post.minutes} min read</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-slate-900 group-hover:text-blue-700">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
                  <time dateTime={post.publishDate}>{getFormattedDate(post.publishDate)}</time>
                  <span className="font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Read →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-8 divide-y divide-gray-100 border-y border-gray-100">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time dateTime={post.publishDate} className="w-32 shrink-0 text-sm text-gray-400">
                  {getFormattedDate(post.publishDate)}
                </time>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-slate-900 group-hover:text-blue-700">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">{post.excerpt}</span>
                </span>
                <span className="shrink-0 text-xs text-gray-400">
                  {post.category} · {post.minutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
