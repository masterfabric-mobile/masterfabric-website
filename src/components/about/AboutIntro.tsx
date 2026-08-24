'use client'

import React from 'react'

export interface AboutIntroData {
  sectionTitle: string
  sectionDescription: { paragraph: string }[]
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
}

interface AboutIntroProps {
  data: AboutIntroData
}

export default function AboutIntro({ data }: AboutIntroProps) {
  const { sectionTitle, sectionDescription, heroTitle, heroSubtitle, heroDescription } = data

  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
        {sectionTitle}
      </p>
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent max-w-[80px] sm:max-w-[120px]" />
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent max-w-[80px] sm:max-w-[120px]" />
      </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
        {heroTitle}
      </h1>
      <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
        {heroSubtitle}
      </p>
      <div className="space-y-4 text-left">
        {sectionDescription.map((item, index) => (
          <p
            key={index}
            className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: item.paragraph }}
          />
        ))}
        <p
          className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-3xl mx-auto pt-2"
          dangerouslySetInnerHTML={{ __html: heroDescription }}
        />
      </div>
    </header>
  )
}
