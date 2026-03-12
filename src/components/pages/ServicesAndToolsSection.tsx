'use client'

import React, { useState } from 'react'
import {
  Boxes,
  Code2,
  Cog,
  Cloud,
  FlaskConical,
  Sparkles,
  SquareKanban,
  Wrench,
} from 'lucide-react'

// --- Services types ---
export interface ServiceCell {
  title: string
  detail?: string
  subtitle?: string
  href?: string
  toolCategories?: string[]
}

export interface ServicesBlockProps {
  eyebrow?: string
  title?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  cells?: ServiceCell[]
}

// --- Tools types ---
export interface ToolItem {
  name: string
  icon: string
  category?: string
  usage?: string
  /** If set, tool is only shown for these areas (e.g. ["Mobile", "Web"]). Omit = show for all. */
  areas?: string[]
}

export interface PlatformItem {
  name: string
  icon: string
  description?: string
}

export interface TargetPlatformsBlockProps {
  eyebrow?: string
  title?: string
  description?: string
  platforms?: PlatformItem[]
}

export interface ToolsBlockProps {
  label?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  tools?: ToolItem[]
}

export interface ServicesAndToolsSectionProps {
  services: ServicesBlockProps
  targetPlatforms: TargetPlatformsBlockProps
  toolsSection: ToolsBlockProps
}

// --- Tools constants ---
const CATEGORY_ORDER = [
  'Editors & IDEs',
  'Version control',
  'Cloud & DevOps',
  'Frameworks',
  'Languages',
  'Frontend & tooling',
  'Testing',
  'AI',
  'Our tools',
] as const

const CATEGORY_ICONS = {
  'Editors & IDEs': Boxes,
  'Version control': SquareKanban,
  'Cloud & DevOps': Cloud,
  'Frameworks': Wrench,
  'Languages': Code2,
  'Frontend & tooling': Cog,
  Testing: FlaskConical,
  AI: Sparkles,
  'Our tools': Boxes,
} as const

const CATEGORY_DESC: Record<string, string> = {
  'Editors & IDEs': 'AI-assisted editing and multi-file context.',
  'Version control': 'Repos, branching, code review, CI/CD.',
  'Cloud & DevOps': 'Hosting, APIs, containers, deployment.',
  'Frameworks': 'Cross-platform mobile, web, and APIs.',
  'Languages': 'Dart, TypeScript, Swift, Kotlin, Python.',
  'Frontend & tooling': 'UI libs, images, content tooling.',
  'Testing': 'Unit, integration, E2E and test automation.',
  'AI': 'Assistive coding, agents, AI-native features.',
  'Our tools': 'Our CLIs for mobile, web, code generation.',
}

const SECTION_CLASS =
  'px-4 sm:px-8 lg:px-[4rem] pt-10 sm:pt-12 pb-12 sm:pb-16 bg-white border-b border-slate-100'

export default function ServicesAndToolsSection({
  services,
  targetPlatforms,
  toolsSection,
}: ServicesAndToolsSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { cells = [] } = services
  const sortedCells = React.useMemo(
    () => [...cells].sort((a, b) => a.title.localeCompare(b.title, 'en')),
    [cells]
  )

  const {
    eyebrow: platformsEyebrow = 'Platforms',
    title: platformsTitle = 'We build for',
    description: platformsDescription,
    platforms = [],
  } = targetPlatforms

  const {
    label: toolsLabel = 'Technology & tools',
    title: toolsTitle = 'Technologies',
    titleAccent = 'we use',
    subtitle: toolsSubtitle,
    tools = [],
  } = toolsSection

  const byCategory = tools.reduce<Record<string, ToolItem[]>>((acc, tool) => {
    const cat = tool.category ?? 'Tools'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(tool)
    return acc
  }, {})

  const selectedCell = sortedCells[selectedIndex]
  const selectedCategories = selectedCell?.toolCategories?.length
    ? CATEGORY_ORDER.filter((c) =>
        selectedCell.toolCategories!.includes(c)
      )
    : []

  return (
    <section
      className={SECTION_CLASS}
      aria-labelledby="services-and-tools-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header: codebase pattern — title + accent, stronger subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {toolsLabel}
          </p>
          <h2
            id="services-and-tools-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-3"
          >
            <span className="block">{toolsTitle}</span>
            <span className="block text-blue-600">{titleAccent}</span>
          </h2>
          {toolsSubtitle && (
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {toolsSubtitle}
            </p>
          )}
        </div>

        {/* Yeni tasarım: üstte yatay sekmeler, altta kart grid — daha sade ve hizalı */}
        <div className="border border-gray-200/80 rounded-2xl bg-white shadow-sm">
          {/* Tabs bar */}
          <div className="border-b border-slate-100 px-3 sm:px-4 pt-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Choose an area
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Select the product area to see the tools we rely on.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2 pb-1">
                {sortedCells.map((cell, index) => {
                  const isActive = selectedIndex === index
                  return (
                    <button
                      key={cell.title}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`inline-flex items-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      aria-pressed={isActive}
                      aria-label={`Show technologies for ${cell.title}`}
                    >
                      <span className="truncate">{cell.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          {selectedCell && (
            <div className="px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                    Technologies {titleAccent} for {selectedCell.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                    We combine these tools with an{' '}
                    <strong className="text-slate-800">agentic development workflow</strong>—AI-assisted
                    coding, iterative refinement, and automated quality checks—so we ship faster without
                    sacrificing quality.
                  </p>
                  {platforms.length > 0 && (
                    <p className="pt-1 text-[11px] sm:text-xs text-slate-500">
                      We build for{' '}
                      {platforms.map((platform, index) => {
                        const isLast = index === platforms.length - 1
                        const isSecondLast = index === platforms.length - 2
                        const separator = isLast ? '' : isSecondLast ? ' and ' : ', '
                        return (
                          <span key={platform.name}>
                            <span className="font-medium text-slate-700">{platform.name}</span>
                            {separator}
                          </span>
                        )
                      })}
                      .
                    </p>
                  )}
                </div>
                {selectedCell.detail && (
                  <div className="mt-1 sm:mt-0">
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600">
                      {selectedCell.detail}
                    </span>
                  </div>
                )}
              </div>

              {selectedCategories.length > 0 ? (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {selectedCategories.map((category) => {
                    const rawItems = byCategory[category] ?? []
                    const items = selectedCell
                      ? rawItems.filter(
                          (tool) => !tool.areas || tool.areas.includes(selectedCell.title)
                        )
                      : rawItems
                    if (items.length === 0) return null

                    const iconName = CATEGORY_ICONS[category] ?? 'mdi:folder-outline'
                    const description = CATEGORY_DESC[category]

                    return (
                      <div
                        key={category}
                        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-3.5 sm:px-4 sm:py-4 flex flex-col gap-2"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                            {(() => {
                              const IconCmp = CATEGORY_ICONS[category] ?? Boxes
                              return <IconCmp className="size-4" aria-hidden />
                            })()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-800">
                              {category}
                            </p>
                            {description && (
                              <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-2">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {items.map((tool) => (
                            <span
                              key={tool.name}
                              title={tool.usage ?? tool.name}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 border border-gray-200"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              <span>{tool.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                  No technology categories defined for this area.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
