'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'

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

const CATEGORY_ICONS: Record<string, string> = {
  'Editors & IDEs': 'mdi:monitor-edit',
  'Version control': 'mdi:source-branch',
  'Cloud & DevOps': 'mdi:cloud-outline',
  'Frameworks': 'mdi:package-variant',
  'Languages': 'mdi:code-tags',
  'Frontend & tooling': 'mdi:palette-outline',
  'Testing': 'mdi:test-tube',
  'AI': 'mdi:robot-outline',
  'Our tools': 'mdi:console-line',
}

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
  'px-4 sm:px-8 lg:px-[4rem] pt-8 sm:pt-10 pb-10 sm:pb-12 sm:pt-12 sm:pb-16 bg-white border-b border-slate-100 overflow-hidden'

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
  }, [])

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

        {/* We build for — codebase title pattern + improved platform cards */}
        {platforms.length > 0 && (
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
              {platformsEyebrow}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-3">
              <span className="block">We build</span>
              <span className="block text-blue-600">for</span>
            </h3>
            {platformsDescription && (
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-6 leading-relaxed">
                {platformsDescription}
              </p>
            )}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm"
                >
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:ring-blue-100 transition-colors">
                    <Icon icon={platform.icon} className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {platform.name}
                    </p>
                    {platform.description && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {platform.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid: static size (Web = max), fixed height ~30rem so all 6 areas visible without cutting off */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:h-[30rem] lg:min-h-[30rem]">
          {/* Left: area list — scrollable so Web (last) is never cut off */}
          <div className="lg:col-span-4 flex flex-col min-h-0 lg:h-full">
            <div className="rounded-2xl border border-slate-200/80 bg-white flex-1 min-h-0 flex flex-col h-full overflow-hidden">
              <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 shrink-0">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-1.5">
                  Choose an area
                </p>
                <p className="text-sm text-slate-500 mb-4 leading-snug">
                  Choose the area that fits your needs.
                </p>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-5">
                <div className="flex flex-col gap-0">
                  {sortedCells.map((cell, index) => (
                    <React.Fragment key={cell.title}>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`min-h-[2.75rem] w-full text-left py-2.5 sm:py-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedIndex === index
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                        aria-pressed={selectedIndex === index}
                        aria-label={`Show technologies for ${cell.title}`}
                      >
                        {cell.title}
                      </button>
                      {index < sortedCells.length - 1 && (
                        <div className="shrink-0 border-b border-slate-100" aria-hidden />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: fixed height on lg, content scrolls if needed */}
          <div className="lg:col-span-8 min-w-0 flex flex-col lg:h-full">
            {selectedCell && (
              <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden w-full max-w-full h-full flex flex-col min-h-0">
                <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 border-b border-slate-100 shrink-0">
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-1.5">
                    Technologies {titleAccent} for {selectedCell.title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                    We combine these tools with an <strong className="text-slate-800">agentic development workflow</strong>—AI-assisted coding, iterative refinement, and automated quality checks—so we ship faster without sacrificing quality.
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-6 sm:py-5 w-full max-w-full flex-1 min-h-0 overflow-y-auto">
                  {selectedCategories.length > 0 ? (
                    <div className="flex flex-col gap-4 w-full max-w-full">
                      {selectedCategories.map((category) => {
                        const rawItems = byCategory[category] ?? []
                        const items = selectedCell
                          ? rawItems.filter(
                              (tool) =>
                                !tool.areas || tool.areas.includes(selectedCell.title)
                            )
                          : rawItems
                        if (items.length === 0) return null
                        return (
                          <div
                            key={category}
                            className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-3 last:border-0 last:pb-0 w-full max-w-full"
                          >
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide shrink-0 w-28 sm:w-32">
                              {category}
                            </span>
                            <div className="flex flex-wrap gap-1.5 min-w-0 flex-1">
                              {items.map((tool) => (
                                <span
                                  key={tool.name}
                                  title={tool.usage ?? tool.name}
                                  className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 border border-slate-100"
                                >
                                  <Icon
                                    icon={tool.icon}
                                    className="size-3 shrink-0 text-slate-400"
                                  />
                                  {tool.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                      No technology categories defined for this area.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
