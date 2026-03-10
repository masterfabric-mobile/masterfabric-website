'use client'

import React from 'react'
import { Layers, Workflow, Sparkles, Box, Code2, Cpu } from 'lucide-react'
import aboutData from '@/data/ai-first-about.json'

type StoryStep = { title: string; sentence: string }
type Pillar = { label: string; items: string }

const storyIcons = [Layers, Workflow, Sparkles]
const pillarIcons = [Box, Code2, Cpu]

export default function AiFirstSectionAbout() {
  const { headline, tagline, story, pillarTitle, pillars } = aboutData as {
    headline: string
    tagline: string
    story: StoryStep[]
    pillarTitle: string
    pillars: Pillar[]
  }

  return (
    <section className="mt-16" aria-labelledby="ai-first-about-headline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Same divider as AboutHeader */}
        <div className="flex items-center justify-center mb-8 px-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent min-w-[20px]" />
          <div className="mx-6 w-3 h-3 bg-green-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent min-w-[20px]" />
        </div>

        {/* Title + subtitle – same as AboutHeader -->
        <h2
          id="ai-first-about-headline"
          className="text-xl font-semibold text-gray-800 mb-4 text-center sm:text-lg"
        >
          {headline}
        </h2>
        <p className="text-slate-600 mb-10 text-center sm:text-sm">
          {tagline}
        </p>

        {/* 3 steps – ProcessSteps style: text-center, icon + title + description, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {story.map((step, index) => {
            const Icon = storyIcons[index] ?? Sparkles
            return (
              <div
                key={step.title}
                className="text-center transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-600 mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.sentence}
                </p>
              </div>
            )
          })}
        </div>

        {/* What we bring together – same pattern, compact */}
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center mb-6">
          {pillarTitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Box
            return (
              <div
                key={pillar.label}
                className="text-center transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-100 text-slate-600 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-gray-800 text-sm mb-1">{pillar.label}</h4>
                <p className="text-xs text-slate-500">{pillar.items}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
