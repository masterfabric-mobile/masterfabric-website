'use client'

import React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import aiFirstHomeData from '@/data/ai-first-home.json'

function openContactModal() {
  window.dispatchEvent(new CustomEvent('openContactModal'))
}

export default function ContactAiFirstPanel() {
  const data = aiFirstHomeData as {
    badge: string
    title: string
    lead: string
    projectOverlays: string[]
    cta: { buttonLabel: string; buttonHref: string }
  }
  const bullets = (data.projectOverlays ?? []).slice(0, 5)

  return (
    <div
      className="relative h-full flex flex-col rounded-xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:shadow-blue-50/30 hover:border-blue-200/70 transition-all duration-200"
      aria-labelledby="ai-first-panel-title"
    >
      <div className="flex-1 flex flex-col p-6 lg:p-7">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full w-fit mb-3">
          <Sparkles className="w-3.5 h-3.5" aria-hidden />
          {data.badge}
        </span>

        <h3
          id="ai-first-panel-title"
          className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight mb-2"
        >
          {data.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {data.lead}
        </p>

        <ul className="space-y-1.5 mb-4">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openContactModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md w-fit mt-auto"
        >
          {data.cta.buttonLabel}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
