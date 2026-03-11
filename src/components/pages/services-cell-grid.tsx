'use client'

import React from 'react'
import Link from 'next/link'

export interface ServiceCell {
  title: string
  detail?: string
  subtitle?: string
  href?: string
}

interface ServicesCellGridProps {
  eyebrow?: string
  title?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  cells?: ServiceCell[]
}

const defaultEyebrow = 'Services'
const defaultTitle = 'From mobile and web to backend, AI, CI/CD, and test'
const defaultCtaText = 'View all services'
const defaultCtaHref = '/contact'

export default function ServicesCellGrid({
  eyebrow = defaultEyebrow,
  title = defaultTitle,
  description,
  ctaText = defaultCtaText,
  ctaHref = defaultCtaHref,
  cells = [],
}: ServicesCellGridProps) {
  if (cells.length === 0) return null

  return (
    <section
      className="px-4 sm:px-8 lg:px-[4rem] pt-8 sm:pt-10 pb-10 sm:pb-12 bg-white border-b border-slate-100 overflow-hidden"
      aria-labelledby="services-cell-grid-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {eyebrow}
          </p>
          <h2
            id="services-cell-grid-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={ctaText}
          >
            {ctaText}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 6 bölmeli tablo – kaydırılmaz; başta sadece title, hover'da kısa detay */}
        <div className="grid grid-cols-6 gap-0 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
          {cells.slice(0, 6).map((cell, index) => (
            <div
              key={index}
              className="group relative border-r border-slate-200 last:border-r-0 h-[88px] sm:h-[100px] flex items-center justify-center px-2 sm:px-3 text-center transition-colors duration-200 hover:bg-white hover:shadow-inner"
            >
              <span className="text-sm sm:text-base font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                {cell.href ? (
                  <Link href={cell.href} className="hover:underline focus:outline-none focus:underline">
                    {cell.title}
                  </Link>
                ) : (
                  cell.title
                )}
              </span>
              {cell.detail && (
                <p className="absolute inset-0 flex items-center justify-center bg-white px-2 py-3 text-[10px] sm:text-xs text-slate-600 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-4">
                  {cell.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
