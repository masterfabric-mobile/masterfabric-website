'use client'

import { useState } from 'react'

type ProcessStep = {
  title: string
  description: string
  contrast: string
}

type ProcessTab = {
  label: string
  kicker: string
  summary: string
  steps: ProcessStep[]
}

type GlanceRow = {
  label: string
  classic: string
  ai: string
}

type ProcessCompare = {
  title: string
  intro: string
  glanceTitle: string
  glance: GlanceRow[]
  tabs: {
    classic: ProcessTab
    ai: ProcessTab
  }
}

type HowWeWorkProps = {
  locale: 'en' | 'tr'
  content: ProcessCompare
}

const TAB_IDS = ['classic', 'ai'] as const
type TabId = (typeof TAB_IDS)[number]

function ProcessAbstract({ mode }: { mode: TabId }) {
  if (mode === 'classic') {
    return (
      <div className="mx-auto mt-6 flex h-36 max-w-md items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 280 72" className="h-16 w-full text-slate-400" fill="none">
          <line x1="28" y1="36" x2="252" y2="36" stroke="currentColor" strokeWidth="1.5" />
          {[40, 107, 173, 240].map((x) => (
            <rect key={x} x={x - 8} y="28" width="16" height="16" rx="2" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="1.25" />
          ))}
        </svg>
      </div>
    )
  }

  return (
    <div className="ai-abstract mx-auto mt-6 flex h-36 max-w-md items-center justify-center" aria-hidden="true">
      <div className="ai-scene">
        <span className="ai-floor-shadow" />
        <span className="ai-orb">
          <span className="ai-orb-highlight" />
        </span>
        <span className="ai-ring ai-ring-a">
          <span className="ai-sat ai-sat-sky" />
        </span>
        <span className="ai-ring ai-ring-b">
          <span className="ai-sat ai-sat-amber" />
          <span className="ai-sat ai-sat-cyan" />
        </span>
        <span className="ai-ring ai-ring-c">
          <span className="ai-sat ai-sat-violet" />
        </span>
      </div>
    </div>
  )
}

export default function HowWeWork({ locale, content }: HowWeWorkProps) {
  const [activeTab, setActiveTab] = useState<TabId>('classic')
  const tab = content.tabs[activeTab]
  const isAi = activeTab === 'ai'
  const contrastLabel = isAi
    ? locale === 'tr'
      ? 'Klasik SDLC’den farkı'
      : 'Unlike classic SDLC'
    : locale === 'tr'
      ? 'AI-SDLC’den farkı'
      : 'Unlike AI-SDLC'

  return (
    <section className="mt-20" aria-labelledby="how-we-work-heading">
      <h2 id="how-we-work-heading" className="text-center text-3xl font-bold text-gray-900">
        {content.title}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
        {content.intro}
      </p>

      <div
        role="tablist"
        aria-label={content.title}
        className="mx-auto mt-8 flex w-full max-w-md rounded-xl border border-gray-200 bg-slate-50 p-1"
      >
        {TAB_IDS.map((id) => {
          const selected = activeTab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`process-tab-${id}`}
              aria-selected={selected}
              aria-controls={`process-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(id)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                selected
                  ? id === 'ai'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-900 shadow-sm'
                  : 'text-slate-600 hover:text-gray-900'
              }`}
            >
              {content.tabs[id].label}
            </button>
          )
        })}
      </div>

      <ProcessAbstract mode={activeTab} />

      <div
        role="tabpanel"
        id={`process-panel-${activeTab}`}
        aria-labelledby={`process-tab-${activeTab}`}
        className="mt-8"
      >
        <div
          className={`rounded-2xl border px-6 py-5 ${
            isAi ? 'border-blue-100 bg-blue-50/60' : 'border-gray-200 bg-slate-50'
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wider ${isAi ? 'text-blue-700' : 'text-slate-500'}`}>
            {tab.kicker}
          </p>
          <p className="mt-2 text-base leading-relaxed text-slate-700">{tab.summary}</p>
        </div>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tab.steps.map((step, index) => (
            <li
              key={`${activeTab}-${step.title}`}
              className={`rounded-xl border p-6 ${
                isAi ? 'border-blue-100 bg-white' : 'border-gray-200/70 bg-white'
              }`}
            >
              <span className={`text-sm font-semibold ${isAi ? 'text-blue-600' : 'text-slate-500'}`}>
                0{index + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              <p className="mt-4 border-t border-gray-100 pt-3 text-xs leading-relaxed text-slate-500">
                <span className="font-semibold text-slate-700">{contrastLabel}: </span>
                {step.contrast}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200">
        <div className="border-b border-gray-200 bg-slate-50 px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-900">{content.glanceTitle}</h3>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {content.glance.map((row) => (
            <div key={row.label} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{row.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-gray-800">{content.tabs.classic.label}. </span>
                {row.classic}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-blue-700">{content.tabs.ai.label}. </span>
                {row.ai}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
