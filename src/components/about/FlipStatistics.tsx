'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Statistic {
  value: number | string
  label: string
  tooltip: string
  icon?: string
}

interface FlipStatisticsProps {
  statistics?: Statistic[]
  title?: string
  description?: string
}

const svgIcons: Record<string, JSX.Element> = {
  'trending-up': (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  users: (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  trophy: (
    <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
}

const defaultStats: Statistic[] = [
  { value: 150, label: 'Projects Delivered', tooltip: 'Mobile apps successfully launched', icon: 'trending-up' },
  { value: '98%', label: 'Client Satisfaction', tooltip: 'Based on post-project feedback', icon: 'trophy' },
  { value: 12, label: 'Global Offices', tooltip: 'Serving clients worldwide', icon: 'users' },
]

const FlipStatistics: React.FC<FlipStatisticsProps> = ({
  statistics,
  title = 'We Approach Applications with Passion.',
  description,
}) => {
  const [visible, setVisible] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const statsData = (statistics || defaultStats).map((stat, index) => ({
    ...stat,
    icon: stat.icon || (['trending-up', 'trophy', 'users'] as const)[index % 3],
  }))

  useEffect(() => {
    const observers = cardRefs.current
      .filter(Boolean)
      .map((el, index) => {
        if (!el) return null
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible((prev) => (prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)))
              }
            })
          },
          { rootMargin: '-10% 0px -15% 0px', threshold: 0.1 }
        )
        observer.observe(el)
        return observer
      })

    return () => observers.forEach((o) => o?.disconnect())
  }, [statsData.length])

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center mb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p
            className="mt-4 text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      {/* Vertical stack: each card reveals from top */}
      <div className="mx-auto max-w-2xl px-4 space-y-6">
        {statsData.map((stat, index) => {
          const iconKey = stat.icon || 'trending-up'
          const Icon = svgIcons[iconKey] || svgIcons['trending-up']
          const isVisible = visible.includes(index)

          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
              }}
            >
              <div className="flex gap-5 sm:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  {Icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-base font-medium text-slate-700">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {stat.tooltip}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlipStatistics
