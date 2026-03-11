'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProcessStepItem {
  icon?: string
  title: string
  description: string
  outcomes?: string[]
}

interface ProcessStepsData {
  intro?: string
  subintro?: string
  steps?: ProcessStepItem[]
}

interface ProcessStepsProps {
  processSteps: ProcessStepItem[] | ProcessStepsData
  currentColor?: string
}

/** Backward compat: if processSteps is array (old format), treat as list of 5 steps and take first 4 for display */
function normalizeSteps(processSteps: ProcessStepItem[] | ProcessStepsData): { intro: string; subintro: string; steps: ProcessStepItem[] } {
  if (Array.isArray(processSteps)) {
    const steps = processSteps.slice(0, 4).map((s, i) => ({
      ...s,
      outcomes: s.outcomes ?? [],
    }))
    if (processSteps.length >= 2) {
      if (steps.length === 3 && processSteps[3]) {
        steps[2] = {
          ...steps[2],
          title: 'Build',
          description: [processSteps[2]?.description, processSteps[3]?.description].filter(Boolean).join(' '),
          outcomes: ['Platform modules and APIs', 'AI-assisted and agentic coding', 'Tests and quality gates'],
        }
      }
    }
    return {
      intro: 'We run projects in four phases—Ideation, Design, Build, and Launch—with AI and agentic practices embedded in each.',
      subintro: 'Hover or tap a phase to see what we do and what you can expect.',
      steps,
    }
  }
  const data = processSteps as ProcessStepsData
  return {
    intro: data.intro ?? 'We run projects in four phases, with AI and agentic practices embedded in each.',
    subintro: data.subintro ?? 'Hover or tap a phase to see what we do and what you can expect.',
    steps: (data.steps ?? []).map((s) => ({ ...s, outcomes: s.outcomes ?? [] })),
  }
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ processSteps }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { intro, subintro, steps } = normalizeSteps(processSteps)

  if (steps.length === 0) return null

  return (
    <section
      className="px-4 sm:px-8 lg:px-[4rem] pt-8 sm:pt-10 pb-10 sm:pb-12 bg-white"
      aria-labelledby="how-we-work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            How we work
          </p>
          <h2
            id="how-we-work-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
          >
            AI & agentic from ideation to launch
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {subintro}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-xs font-medium text-blue-800">
            <Icon icon="mdi:robot-outline" className="size-4" aria-hidden />
            <span>AI-native</span>
            <span className="text-blue-400">·</span>
            <Icon icon="mdi:account-group-outline" className="size-4" aria-hidden />
            <span>Agentic</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {steps.map((zone, index) => (
            <motion.article
              key={zone.title}
              className="group relative rounded-2xl border border-slate-100 bg-white overflow-hidden cursor-pointer select-none min-h-[200px] sm:min-h-[260px] hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex((prev) => (prev === index ? null : index))}
              initial={false}
              animate={{ scale: hoveredIndex === index ? 1.01 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            >
              <div className="p-5 sm:p-6 h-full flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors">
                      <Icon icon={zone.icon ?? 'mdi:circle-outline'} className="size-5 sm:size-6" aria-hidden />
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                      {zone.title}
                    </h3>
                  </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-3">
                  <AnimatePresence mode="wait">
                    {hoveredIndex === index ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="flex flex-col gap-3"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {zone.description}
                        </p>
                        {zone.outcomes && zone.outcomes.length > 0 && (
                          <ul className="list-none space-y-1.5" aria-label="Outcomes">
                            {zone.outcomes.map((outcome) => (
                              <li key={outcome} className="flex items-start gap-2 text-xs text-slate-600">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" aria-hidden />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                          {zone.description}
                        </p>
                        {zone.outcomes && zone.outcomes.length > 0 && (
                          <p className="text-[10px] sm:text-xs text-slate-400">
                            Tap or hover for outcomes →
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSteps
