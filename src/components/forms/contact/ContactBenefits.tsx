'use client'

import React from 'react'
import contactData from '@/data/contact-section.json'

interface Benefit {
  title: string
  description: string
  bgColor?: string
}

const iconPaths: Record<string, string> = {
  'AI & Agentic': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'Mobile Excellence': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  'Fast Delivery': 'M13 10V3L4 14h7v7l9-11h-7z',
  '24/7 Support': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  'Scalable Solutions': 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
  'Quality & Security': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
}

export default function ContactBenefits() {
  const benefits = contactData.benefits as Benefit[]

  return (
    <div className="grid grid-cols-2 gap-3">
      {benefits.map((benefit, index) => {
        const d = iconPaths[benefit.title]
        return (
          <div
            key={index}
            className="group relative flex gap-3 p-3.5 rounded-xl border border-gray-200 bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center ring-1 ring-blue-100 group-hover:bg-blue-50 group-hover:ring-blue-200 transition-colors">
              {d ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                </svg>
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {benefit.title}
              </p>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                {benefit.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
