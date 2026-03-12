'use client'

import React from 'react'
import { Icon } from '@iconify/react'

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

interface TargetPlatformsProps {
  eyebrow?: string
  title?: string
  description?: string
  platforms?: PlatformItem[]
}

interface ToolsSectionProps {
  label?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  tools?: ToolItem[]
}

interface TargetPlatformsAndToolsProps {
  targetPlatforms: TargetPlatformsProps
  toolsSection: ToolsSectionProps
}

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

const MAX_TOOLS_VISIBLE = 5

export default function TargetPlatformsAndTools({
  targetPlatforms,
  toolsSection,
}: TargetPlatformsAndToolsProps) {
  const {
    eyebrow: platformsEyebrow = 'Target platforms',
    title: platformsTitle = 'We build for',
    description: platformsDescription,
    platforms = [],
  } = targetPlatforms

  const {
    label: toolsLabel = 'Technology & tools',
    title: toolsTitle = 'Technologies',
    titleAccent = 'we use',
    subtitle = '',
    tools = [],
  } = toolsSection

  const byCategory = tools.reduce<Record<string, ToolItem[]>>((acc, tool) => {
    const cat = tool.category ?? 'Tools'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(tool)
    return acc
  }, {})

  const categories = CATEGORY_ORDER.filter((c) => byCategory[c]?.length)

  return (
    <section
      className="px-4 sm:px-8 lg:px-[4rem] pt-10 sm:pt-12 pb-12 sm:pb-16 bg-white border-b border-slate-100"
      aria-labelledby="target-platforms-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Target platforms — description above, icons only below */}
        <div className="mb-10 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {platformsEyebrow}
          </p>
          <h2
            id="target-platforms-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-3"
          >
            {platformsTitle}
          </h2>
          {platformsDescription && (
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed mb-6">
              {platformsDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6" aria-label="Platform icons">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                title={[platform.name, platform.description].filter(Boolean).join(' — ')}
                className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-100 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-100 hover:shadow-sm"
              >
                <Icon icon={platform.icon} className="size-6 sm:size-7" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        {/* Technology & tools — scrollable cards */}
        <div>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
              {toolsLabel}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-3">
              <span className="block">{toolsTitle}</span>
              <span className="block text-blue-600">{titleAccent}</span>
            </h3>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <div className="overflow-x-auto overflow-y-hidden pb-2 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-[4rem] lg:px-[4rem]">
            <div className="flex gap-4 sm:gap-6 w-max min-w-full snap-x snap-mandatory scroll-smooth">
              {categories.map((category) => {
                const items = byCategory[category]
                const visible = items.slice(0, MAX_TOOLS_VISIBLE)
                const rest = items.length - MAX_TOOLS_VISIBLE
                return (
                  <div
                    key={category}
                    className="group shrink-0 w-[280px] sm:w-[320px] snap-start rounded-2xl border border-slate-100 bg-slate-50/30 p-5 sm:p-6 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm border border-slate-100">
                        <Icon
                          icon={CATEGORY_ICONS[category] ?? 'mdi:toolbox-outline'}
                          className="size-5"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-slate-900 leading-tight">
                          {category}
                        </h4>
                        <p className="text-xs text-slate-500 leading-snug mt-0.5">
                          {CATEGORY_DESC[category] ?? ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {visible.map((tool) => (
                        <span
                          key={tool.name}
                          title={tool.usage ?? tool.name}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                          <Icon
                            icon={tool.icon}
                            className="size-3.5 shrink-0 text-slate-400"
                          />
                          {tool.name}
                        </span>
                      ))}
                      {rest > 0 && (
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-500">
                          +{rest}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
