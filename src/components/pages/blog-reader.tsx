'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Minus, Plus } from 'lucide-react'
import type { BlogBlock } from '@/data/blog-posts'

type Props = {
  title: string
  category: string
  date: string
  dateLabel: string
  author: string
  minutes: number
  body: BlogBlock[]
}

const SIZES = ['prose-base', 'prose-lg', 'prose-xl'] as const

export default function BlogReader({ title, category, date, dateLabel, author, minutes, body }: Props) {
  const [progress, setProgress] = useState(0)
  const [focus, setFocus] = useState(false)
  const [size, setSize] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`transition-colors duration-300 ${focus ? 'bg-[#FBF8F3]' : ''}`}>
      <div
        className="fixed left-0 top-0 z-[60] h-1 bg-blue-600 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <article className="mx-auto max-w-2xl px-5 pb-24 pt-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All posts
          </Link>

          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setSize((s) => Math.max(0, s - 1))}
              disabled={size === 0}
              aria-label="Smaller text"
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setSize((s) => Math.min(SIZES.length - 1, s + 1))}
              disabled={size === SIZES.length - 1}
              aria-label="Larger text"
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setFocus((f) => !f)}
              aria-pressed={focus}
              className={`ml-1 inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors ${
                focus ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Read mode
            </button>
          </div>
        </div>

        <header className="mt-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">{category}</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            {author} · <time dateTime={date}>{dateLabel}</time> · {minutes} min read
          </p>
        </header>

        <div
          className={`prose prose-slate mt-10 max-w-none ${SIZES[size]} ${
            focus ? 'font-serif prose-p:leading-loose' : ''
          } prose-headings:tracking-tight prose-blockquote:border-l-blue-600 prose-blockquote:font-normal prose-pre:bg-[#1F1E1D]`}
        >
          {body.map((block, i) => {
            switch (block.type) {
              case 'h2':
                return <h2 key={i}>{block.text}</h2>
              case 'ul':
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              case 'quote':
                return <blockquote key={i}><p>{block.text}</p></blockquote>
              case 'code':
                return <pre key={i}><code>{block.text}</code></pre>
              default:
                return <p key={i}>{block.text}</p>
            }
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <p className="font-semibold text-slate-900">Want this flow in your team?</p>
          <p className="mt-1 text-sm text-gray-600">Tell us about your brief and we will plan it with you.</p>
          <Link
            href="/contact/"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Contact us
          </Link>
        </div>
      </article>
    </div>
  )
}
