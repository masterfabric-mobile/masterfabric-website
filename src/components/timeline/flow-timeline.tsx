'use client'

import React, { useState } from 'react'
import projectFlowData from '@/data/project-flow.json'
import type { TimelinePhase, PhaseStatus } from '@/components/timeline/types'

const FlowTimeline: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const timelineData = projectFlowData.timeline
  const phases: TimelinePhase[] = timelineData.phases.map((phase) => ({
    ...phase,
    status: phase.status as PhaseStatus,
    milestones: phase.milestones.map((m) => ({ ...m, status: m.status as PhaseStatus })),
  }))

  const getPhaseIcon = (phaseId: string) => {
    const iconMap: Record<string, JSX.Element> = {
      discovery: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      design: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      development: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      testing: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      deployment: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      maintenance: (
        <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }
    return iconMap[phaseId] ?? iconMap.discovery
  }

  const currentPhase = phases[currentStep]

  return (
    <section className="px-4 sm:px-8 lg:px-[4rem] pt-10 sm:pt-12 pb-10 sm:pb-12 bg-white content-start border-b border-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Header — minimal */}
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {timelineData.subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            {timelineData.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            {timelineData.description}
          </p>
        </div>

        {/* Grid: 12 cols — steps | line | detail */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0 items-stretch"
          style={{ gridTemplateRows: 'repeat(2, auto)' }}
        >
          {/* Left: step list (cols 1–5) */}
          <div className="lg:col-start-1 lg:col-end-6 lg:pr-6 flex flex-col">
            {phases.map((phase: TimelinePhase, index: number) => {
              const isActive = index === currentStep
              const isPast = index < currentStep
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className="w-full text-left py-4 lg:py-5 border-b border-slate-100 last:border-b-0 flex items-center gap-4 transition-colors hover:bg-slate-50/50 -mx-2 px-2 rounded-lg"
                >
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-slate-400
                      ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : ''}
                      ${isPast ? 'border-emerald-500/60 bg-emerald-50/60 text-emerald-600' : ''}
                      ${!isActive && !isPast ? 'border-slate-200' : ''}
                    `}
                  >
                    <span className="size-4">{getPhaseIcon(phase.id)}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`
                        text-sm font-medium truncate
                        ${isActive ? 'text-slate-900' : 'text-slate-600'}
                      `}
                    >
                      {phase.shortTitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{phase.duration}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Vertical line — only on lg, col 6, spans rows */}
          <div
            className="hidden lg:block border-l border-blue-500/70 col-start-6 col-end-7 row-start-1 row-end-3 -ml-[1.11vw] min-h-[480px]"
            aria-hidden
          />

          {/* Right: selected phase detail (cols 7–12) */}
          <div className="lg:col-start-7 lg:col-end-13 row-start-1 row-end-3 lg:pl-8 pt-6 lg:pt-0">
            <div className="border border-slate-100 rounded-xl bg-slate-50/30 p-6 sm:p-8 lg:min-h-[420px]">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-50/80 text-blue-600">
                  <span className="size-5">{getPhaseIcon(currentPhase.id)}</span>
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {currentPhase.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{currentPhase.duration}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {currentPhase.description}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentPhase.details.objectives.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Objectives
                    </h4>
                    <ul className="space-y-2">
                      {currentPhase.details.objectives.map((obj, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-700">
                          <span className="mt-1.5 size-1 rounded-full bg-blue-500 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentPhase.details.deliverables.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {currentPhase.details.deliverables.map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-700">
                          <span className="mt-1.5 size-1 rounded-full bg-emerald-500 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlowTimeline
