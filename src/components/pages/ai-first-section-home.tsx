'use client'

import React from 'react'
import { Sparkles, Bot, Cpu } from 'lucide-react'
import homeData from '@/data/ai-first-home.json'

const iconMap = { sparkles: Sparkles, bot: Bot, cpu: Cpu } as const

type AiFirstHomeCard = {
  id: string
  icon: keyof typeof iconMap
  title: string
  description: string
}

type AiFirstHomeSector = {
  id: string
  label: string
  description: string
}

type AiFirstHomeData = {
  badge: string
  title: string
  subtitle: string
  lead: string
  sectors: AiFirstHomeSector[]
  cards: AiFirstHomeCard[]
}

export default function AiFirstSectionHome() {
  const data = homeData as AiFirstHomeData

  return (
    <section
      className="py-12 lg:py-20 relative bg-white border-t border-gray-100"
      aria-labelledby="ai-first-home-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header – same pattern as SuperchargeExperience, References */}
        <div className="text-center mb-12 lg:mb-14">
          <span className="inline-block px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            {data.badge}
          </span>
          <h2
            id="ai-first-home-title"
            className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4"
          >
            <span className="block">{data.title}</span>
            <span className="block text-blue-600">{data.subtitle}</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.lead}
          </p>
        </div>

        {/* Cards – same style as SuperchargeExperience */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {data.cards.map((card) => {
            const Icon = iconMap[card.icon] ?? Sparkles
            return (
              <div
                key={card.id}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-200/70 hover:border-gray-300 transition-all duration-200 hover:-translate-y-1 bg-white"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg ring-1 ring-blue-100 text-blue-700 bg-blue-50 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{card.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sectors – codebase-aligned pills, more spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-4">
            We deliver AI-first and agentic solutions across sectors
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {data.sectors.map((sector) => (
              <span
                key={sector.id}
                className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
                title={sector.description}
              >
                {sector.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
