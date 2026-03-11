'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
}

export interface PlatformItem {
  name: string
  icon: string
  description?: string
}

export interface TargetPlatformsBlockProps {
  eyebrow?: string
  title?: string
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

  const {
    eyebrow: servicesEyebrow = 'Services',
    title: servicesTitle = 'From mobile and web to backend, AI, CI/CD, and test',
    description: servicesDescription,
    ctaText = 'View all services',
    ctaHref = '/contact',
    cells = [],
  } = services

  const {
    title: platformsTitle = 'We build for',
    platforms = [],
  } = targetPlatforms

  const {
    titleAccent = 'we use',
    tools = [],
  } = toolsSection

  const byCategory = tools.reduce<Record<string, ToolItem[]>>((acc, tool) => {
    const cat = tool.category ?? 'Tools'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(tool)
    return acc
  }, {})

  const selectedCell = cells[selectedIndex]
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
        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {servicesEyebrow}
          </p>
          <h2
            id="services-and-tools-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight"
          >
            {servicesTitle}
          </h2>
          {servicesDescription && (
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              {servicesDescription}
            </p>
          )}
          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={ctaText}
          >
            {ctaText}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Combined: left = area selector, right = technologies for selected area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: service area selector */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">
              Choose an area
            </p>
            <div className="flex flex-col gap-2 sm:gap-3">
              {cells.map((cell, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`text-left rounded-xl border px-4 py-3 sm:px-5 sm:py-4 transition-all duration-200 ${
                    selectedIndex === index
                      ? 'border-blue-200 bg-blue-50/80 shadow-sm ring-1 ring-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                  aria-pressed={selectedIndex === index}
                  aria-label={`Show technologies for ${cell.title}`}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold ${
                      selectedIndex === index
                        ? 'text-blue-700'
                        : 'text-slate-800'
                    }`}
                  >
                    {cell.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: selected area detail + platforms + technologies */}
          <div className="lg:col-span-8 min-w-0">
            {selectedCell && (
              <>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {selectedCell.title}
                  </h3>
                  {selectedCell.detail && (
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {selectedCell.detail}
                    </p>
                  )}
                </div>

                {platforms.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">
                      {platformsTitle}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {platforms.map((platform) => (
                        <div
                          key={platform.name}
                          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-200 hover:border-blue-100 hover:shadow-sm"
                        >
                          <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <Icon
                              icon={platform.icon}
                              className="size-4"
                              aria-hidden
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {platform.name}
                            </p>
                            {platform.description && (
                              <p className="text-xs text-slate-500">
                                {platform.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">
                    Technologies {titleAccent} for {selectedCell.title}
                  </p>
                  {selectedCategories.length > 0 ? (
                    <div className="flex flex-col gap-4 sm:gap-5">
                      {selectedCategories.map((category) => {
                        const items = byCategory[category] ?? []
                        return (
                          <div
                            key={category}
                            className="rounded-xl border border-slate-100 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-slate-200 hover:shadow-sm"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-blue-600 border border-slate-100">
                                <Icon
                                  icon={
                                    CATEGORY_ICONS[category] ??
                                    'mdi:toolbox-outline'
                                  }
                                  className="size-5"
                                  aria-hidden
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {category}
                                </h4>
                                <p className="text-xs text-slate-500 leading-snug">
                                  {CATEGORY_DESC[category] ?? ''}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {items.map((tool) => (
                                <span
                                  key={tool.name}
                                  title={tool.usage ?? tool.name}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-100 hover:border-slate-200 hover:bg-slate-100 transition-colors"
                                >
                                  <Icon
                                    icon={tool.icon}
                                    className="size-3.5 shrink-0 text-slate-400"
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
                    <p className="text-sm text-slate-500 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                      No technology categories defined for this area.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
