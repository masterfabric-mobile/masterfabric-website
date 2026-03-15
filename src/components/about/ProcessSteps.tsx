'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'

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

function normalizeSteps(processSteps: ProcessStepItem[] | ProcessStepsData): { intro: string; steps: ProcessStepItem[] } {
  if (Array.isArray(processSteps)) {
    const steps = processSteps.slice(0, 4).map((s) => ({ ...s, outcomes: s.outcomes ?? [] }))
    return { intro: 'Four phases—Ideation, Design, Build, Launch—with AI and agentic practices in each.', steps }
  }
  const data = processSteps as ProcessStepsData
  const intro = data.intro ?? 'Four phases with AI and agentic practices in each.'
  return { intro, steps: (data.steps ?? []).map((s) => ({ ...s, outcomes: s.outcomes ?? [] })) }
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ processSteps }) => {
  const { intro, steps } = normalizeSteps(processSteps)
  const [active, setActive] = useState(0)

  if (steps.length === 0) return null

  const step = steps[active]

  return (
    <section
      className="px-4 sm:px-8 lg:px-[4rem] pt-8 sm:pt-10 pb-10 sm:pb-12 bg-white"
      aria-labelledby="how-we-work-heading"
    >
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">
            How we work
          </p>
          <h2 id="how-we-work-heading" className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
            AI & agentic from ideation to launch
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">{intro}</p>
        </header>

        {/* Horizontal stepper: 4 steps + one content panel */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`flex flex-col items-center gap-1.5 flex-1 min-w-0 group ${
                  active === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                aria-pressed={active === i}
                aria-label={`Phase ${i + 1}: ${s.title}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    active === i ? 'bg-emerald-500 text-white ring-2 ring-emerald-500/30' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-[11px] font-medium text-slate-700 truncate w-full text-center">
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={step.icon ?? 'mdi:circle-outline'} className="size-4 text-emerald-600" aria-hidden />
              <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            {step.outcomes && step.outcomes.length > 0 && (
              <ul className="list-none flex flex-wrap gap-x-3 gap-y-1 mt-3 text-xs text-slate-500">
                {step.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                    {outcome}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSteps
