'use client'

import React from 'react'

interface AiCalloutStripProps {
  text: string
  pillars: string[]
}

export default function AiCalloutStrip({ text, pillars }: AiCalloutStripProps) {
  return (
    <div className="py-8 lg:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-slate-50/80 px-6 py-5 text-center">
          <p className="text-gray-700 font-medium mb-4">{text}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {pillars.map((pillar) => (
              <span
                key={pillar}
                className="inline-flex items-center rounded-full bg-white border border-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm"
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
