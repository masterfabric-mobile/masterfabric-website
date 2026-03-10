'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Bot, Cpu, ArrowRight } from 'lucide-react'
import aiFirstData from '@/data/ai-first.json'

const iconMap = {
  sparkles: Sparkles,
  bot: Bot,
  cpu: Cpu,
}

type Pillar = {
  id: string
  icon: keyof typeof iconMap
  title: string
  description: string
  highlights: string[]
}

export default function AiFirstSection() {
  const { section, pillars, cta } = aiFirstData as {
    section: { badge: string; title: string; subtitle: string; description: string }
    pillars: Pillar[]
    cta: { text: string; buttonLabel: string; buttonHref: string }
  }

  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-blue-50/40 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            {section.badge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4">
            <span className="block">{section.title}</span>
            <span className="block text-blue-600">{section.subtitle}</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {(pillars as Pillar[]).map((pillar) => {
            const IconComponent = iconMap[pillar.icon] ?? Sparkles
            return (
              <div
                key={pillar.id}
                className="group flex flex-col p-6 lg:p-8 rounded-2xl border border-gray-200/80 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors mb-5">
                  <IconComponent className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-5 flex-1">
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">{cta.text}</p>
          <Link
            href={cta.buttonHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            {cta.buttonLabel}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
