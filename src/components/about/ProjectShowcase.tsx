'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface AttributeItem {
  flag: string
  location: string
  name: string
  detail?: string
  ux?: number
  performance?: number
  scale?: number
}

interface CodeItem {
  flag: string
  location: string
  name: string
  detail?: string
}

interface MetricsItem {
  flag: string
  location: string
  name: string
  detail?: string
}

type PanelItem = AttributeItem | CodeItem | MetricsItem

interface AttributesPanel {
  number: number
  title: string
  description: string
  type: 'attributes'
  items?: AttributeItem[]
  category?: 'mobile' | 'web' | 'backend'
  displayCount?: number
  attributeLabels?: { ux: string; performance: string; scale: string }
}

interface CodePanel {
  number: number
  title: string
  description: string
  type: 'code'
  items?: CodeItem[]
  category?: 'mobile' | 'web' | 'backend'
  displayCount?: number
  codeSnippet?: string
}

interface MetricsPanel {
  number: number
  title: string
  description: string
  type: 'metrics'
  items?: MetricsItem[]
  category?: 'mobile' | 'web' | 'backend'
  displayCount?: number
  metricsLabel?: string
  metricsNote?: string
}

type Panel = AttributesPanel | CodePanel | MetricsPanel

export interface SharedProjectsPool {
  mobile?: AttributeItem[]
  web?: CodeItem[]
  backend?: MetricsItem[]
}

export interface ProjectShowcaseData {
  label: string
  title: string
  subtitle?: string
  panels: Panel[]
}

interface ProjectShowcaseProps {
  data: ProjectShowcaseData
  sharedProjects?: SharedProjectsPool
  showSectionHeader?: boolean
  compact?: boolean
  /** When set, only render these panel indices (0-based). Enables splitting panels across columns. */
  panelIndices?: number[]
}

function pickFromPool<T>(pool: T[], count: number): T[] {
  if (pool.length <= count) return [...pool]
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function resolvePanelItems(panel: Panel, sharedProjects?: SharedProjectsPool): PanelItem[] {
  const category = panel.category as 'mobile' | 'web' | 'backend' | undefined
  const displayCount = panel.displayCount ?? 3
  if (category && sharedProjects?.[category]) {
    return pickFromPool(sharedProjects[category] as PanelItem[], displayCount)
  }
  if (panel.type === 'attributes' && (panel as AttributesPanel).items) return (panel as AttributesPanel).items!
  if (panel.type === 'code' && (panel as CodePanel).items) return (panel as CodePanel).items!
  if (panel.type === 'metrics' && (panel as MetricsPanel).items) return (panel as MetricsPanel).items!
  return []
}

function AttributeBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-medium text-slate-500 tabular-nums w-4">{value}/{max}</span>
    </div>
  )
}

function ProjectShowcase({ data, sharedProjects, showSectionHeader = true, compact = false, panelIndices }: ProjectShowcaseProps) {
  const { label, title, subtitle, panels: allPanels } = data
  const panels = panelIndices
    ? panelIndices.map((i) => allPanels[i]).filter(Boolean)
    : allPanels

  const [rotationSeed, setRotationSeed] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRotationSeed((s) => s + 1), 8000)
    return () => clearInterval(t)
  }, [])

  const resolvedItemsPerPanel = useMemo(
    () => panels.map((panel) => resolvePanelItems(panel, sharedProjects)),
    [panels, sharedProjects, rotationSeed]
  )

  return (
    <div className={`relative ${showSectionHeader ? 'mb-8' : 'h-full'}`}>
      {showSectionHeader && (
        <div className={`text-center ${compact ? 'mb-4' : 'mb-6'}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            {label}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight max-w-3xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* File-area style panels */}
      <div className={`grid ${compact ? 'gap-2 sm:gap-2' : 'gap-4 sm:gap-4'} ${showSectionHeader ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {panels.map((panel, panelIndex) => {
          const items = resolvedItemsPerPanel[panelIndex] ?? []
          return (
          <div
            key={panel.number}
            className={`rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col ${compact ? 'min-h-0' : 'min-h-[280px]'}`}
          >
            {/* File-style title bar */}
            <div className={`flex items-center gap-2 bg-white border-b border-slate-200 shrink-0 ${compact ? 'px-3 py-1.5' : 'px-4 py-2.5'}`}>
              <div className="flex gap-1">
                <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
                <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
                <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
              </div>
              <span className={`font-medium text-slate-500 ml-1 flex-1 min-w-0 truncate ${compact ? 'text-[10px]' : 'text-xs'}`}>
                {panel.number} {panel.title}
              </span>
              <span className="relative flex shrink-0 items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" aria-hidden />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Live</span>
              </span>
            </div>

            <div className={`flex-1 flex flex-col ${compact ? 'p-2.5' : 'p-4'}`}>
              <p className={`text-slate-600 leading-relaxed ${compact ? 'text-[10px] mb-2' : 'text-xs mb-4'}`}>
                {panel.description}
              </p>

              {panel.type === 'attributes' && (
                <div className={`flex-1 ${compact ? 'space-y-2' : 'space-y-4'}`}>
                  {(items as AttributeItem[]).map((item, i) => (
                    <div key={i} className={`rounded-lg bg-white border border-slate-100 ${compact ? 'p-2' : 'p-3'}`}>
                      <div className={`flex items-center gap-2 ${compact ? 'mb-1' : 'mb-2'}`}>
                        <span className={compact ? 'text-sm' : 'text-base'}>{item.flag}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] text-slate-500 truncate">{item.location}</div>
                          <div className={`font-medium text-slate-800 truncate ${compact ? 'text-xs' : 'text-sm'}`}>{item.name}</div>
                          {item.detail && (
                            <div className="text-[10px] text-slate-500 mt-0.5">{item.detail}</div>
                          )}
                        </div>
                      </div>
                      <div className={`space-y-1.5 ${compact ? 'mt-1' : 'mt-2'}`}>
                        {['ux', 'performance', 'scale'].map((key) => {
                          const val = (item as AttributeItem)[key as keyof AttributeItem]
                          if (typeof val !== 'number') return null
                          const label = (panel as AttributesPanel).attributeLabels?.[key as 'ux' | 'performance' | 'scale'] ?? key
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider w-16 shrink-0">{label}</span>
                              <AttributeBar value={val} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {panel.type === 'code' && (
                <div className="space-y-3 flex-1">
                  <div className="space-y-2">
                    {(items as CodeItem[]).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span>{item.flag}</span>
                        <span className="text-slate-500 text-xs">{item.location}</span>
                        <span className="font-medium text-slate-800">{item.name}</span>
                        {item.detail && <span className="text-slate-400 text-xs hidden sm:inline">— {item.detail}</span>}
                      </div>
                    ))}
                  </div>
                  {(panel as CodePanel).codeSnippet && (
                    <div className="rounded-lg bg-slate-800 text-slate-100 p-3 font-mono text-[11px] leading-relaxed overflow-x-auto mt-2">
                      <pre className="whitespace-pre-wrap break-all">
                        {(panel as CodePanel).codeSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {panel.type === 'metrics' && (
                <div className="space-y-3 flex-1">
                  <div className="space-y-2">
                    {(items as MetricsItem[]).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-base shrink-0">{item.flag}</span>
                        <div className="min-w-0">
                          <div className="text-[10px] text-slate-500">{item.location}</div>
                          <div className="text-sm font-medium text-slate-800">{item.name}</div>
                          {item.detail && <div className="text-xs text-slate-500">{item.detail}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  {(panel as MetricsPanel).metricsLabel && (
                    <div className="mt-3 pt-3 border-t border-slate-200 rounded-lg bg-white/80 p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 mb-1">
                        {(panel as MetricsPanel).metricsLabel}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {(panel as MetricsPanel).metricsNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom dot indicator (like reference image) */}
            <div className={`flex justify-center gap-1 ${compact ? 'pb-1' : 'pb-2'}`}>
              {panels.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i + 1 === panel.number ? 'bg-slate-400' : 'bg-slate-200'}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default ProjectShowcase
