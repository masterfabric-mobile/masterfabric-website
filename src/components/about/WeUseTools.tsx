'use client'

import React from 'react'
import { Icon } from '@iconify/react'

export interface ToolItem {
  name: string
  icon: string
  category?: string
  usage?: string
}

interface WeUseToolsProps {
  label?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  tools?: ToolItem[]
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

const defaultTools: ToolItem[] = [
  { name: 'Cursor', icon: 'simple-icons:cursor', category: 'Editors & IDEs', usage: 'Primary IDE, AI-assisted coding' },
  { name: 'VS Code', icon: 'simple-icons:visualstudiocode', category: 'Editors & IDEs', usage: 'Lightweight editing, extensions' },
  { name: 'Visual Studio', icon: 'simple-icons:visualstudio', category: 'Editors & IDEs', usage: 'Enterprise .NET & C#' },
  { name: 'JetBrains', icon: 'simple-icons:jetbrains', category: 'Editors & IDEs', usage: 'Kotlin, Swift, IDEs' },
  { name: 'GitHub', icon: 'simple-icons:github', category: 'Version control', usage: 'Repos, Actions, Copilot' },
  { name: 'GitLab', icon: 'simple-icons:gitlab', category: 'Version control', usage: 'CI/CD, self-hosted' },
  { name: 'Azure DevOps', icon: 'simple-icons:azuredevops', category: 'Version control', usage: 'Pipelines, boards' },
  { name: 'Bitbucket', icon: 'simple-icons:bitbucket', category: 'Version control', usage: 'Git, Jira' },
  { name: 'Azure', icon: 'simple-icons:microsoftazure', category: 'Cloud & DevOps', usage: 'Hosting, APIs' },
  { name: 'Firebase', icon: 'simple-icons:firebase', category: 'Cloud & DevOps', usage: 'Auth, Firestore, hosting' },
  { name: 'Vercel', icon: 'simple-icons:vercel', category: 'Cloud & DevOps', usage: 'Next.js, edge' },
  { name: 'Docker', icon: 'simple-icons:docker', category: 'Cloud & DevOps', usage: 'Containers' },
  { name: 'GitHub Actions', icon: 'simple-icons:githubactions', category: 'Cloud & DevOps', usage: 'CI/CD' },
  { name: 'Flutter', icon: 'simple-icons:flutter', category: 'Frameworks', usage: 'Cross-platform mobile & web' },
  { name: 'React', icon: 'simple-icons:react', category: 'Frameworks', usage: 'Web UI' },
  { name: 'Next.js', icon: 'simple-icons:nextdotjs', category: 'Frameworks', usage: 'SSR, App Router' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs', category: 'Frameworks', usage: 'Backend' },
  { name: 'NestJS', icon: 'simple-icons:nestjs', category: 'Frameworks', usage: 'API services' },
  { name: 'TypeScript', icon: 'simple-icons:typescript', category: 'Languages', usage: 'Type-safe JS' },
  { name: 'Dart', icon: 'simple-icons:dart', category: 'Languages', usage: 'Flutter' },
  { name: 'Swift', icon: 'simple-icons:swift', category: 'Languages', usage: 'Native iOS' },
  { name: 'Kotlin', icon: 'simple-icons:kotlin', category: 'Languages', usage: 'Native Android' },
  { name: 'Python', icon: 'simple-icons:python', category: 'Languages', usage: 'Scripts, ML' },
  { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', category: 'Frontend & tooling', usage: 'Utility CSS' },
  { name: 'Iconify', icon: 'simple-icons:iconify', category: 'Frontend & tooling', usage: 'Icons' },
  { name: 'Sharp', icon: 'simple-icons:sharp', category: 'Frontend & tooling', usage: 'Images' },
  { name: 'MDX', icon: 'simple-icons:mdx', category: 'Frontend & tooling', usage: 'Content' },
  { name: 'Jest', icon: 'simple-icons:jest', category: 'Testing', usage: 'Unit & integration' },
  { name: 'Vitest', icon: 'simple-icons:vitest', category: 'Testing', usage: 'Fast unit tests' },
  { name: 'Playwright', icon: 'simple-icons:playwright', category: 'Testing', usage: 'E2E, cross-browser' },
  { name: 'Cypress', icon: 'simple-icons:cypress', category: 'Testing', usage: 'E2E testing' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary', category: 'Testing', usage: 'Component tests' },
  { name: 'Flutter test', icon: 'simple-icons:flutter', category: 'Testing', usage: 'Dart/Flutter tests' },
  { name: 'OpenAI', icon: 'simple-icons:openai', category: 'AI', usage: 'GPT, APIs' },
  { name: 'Anthropic', icon: 'simple-icons:anthropic', category: 'AI', usage: 'Claude' },
  { name: 'Google Gemini', icon: 'simple-icons:gemini', category: 'AI', usage: 'Multimodal' },
  { name: 'Ollama', icon: 'simple-icons:ollama', category: 'AI', usage: 'Local LLMs' },
  { name: 'Hugging Face', icon: 'simple-icons:huggingface', category: 'AI', usage: 'Models' },
  { name: 'GitHub Copilot', icon: 'simple-icons:github', category: 'AI', usage: 'In-editor' },
  { name: 'Masterfabric CLI', icon: 'mdi:console', category: 'Our tools', usage: 'Unified CLI, MVVM & scaffolds' },
  { name: 'Mobile CLI', icon: 'mdi:cellphone', category: 'Our tools', usage: 'Flutter/Dart codegen, features' },
  { name: 'Web CLI', icon: 'mdi:web', category: 'Our tools', usage: 'Next.js, API & page scaffolds' },
]

const WeUseTools: React.FC<WeUseToolsProps> = ({
  label = 'Technology & tools',
  title = 'Technologies',
  titleAccent = 'we use',
  subtitle = 'From editors and version control to cloud, frameworks, and AI—here’s the stack and our own CLIs we use to build and ship platform-based, AI-first products.',
  tools = defaultTools,
}) => {
  const byCategory = tools.reduce<Record<string, ToolItem[]>>((acc, tool) => {
    const cat = tool.category ?? 'Tools'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(tool)
    return acc
  }, {})

  const categories = CATEGORY_ORDER.filter((c) => byCategory[c]?.length)

  const MAX_TOOLS_VISIBLE = 5

  return (
    <section className="px-4 sm:px-8 lg:px-[4rem] pt-10 sm:pt-12 pb-12 sm:pb-16 bg-white" aria-labelledby="we-use-heading">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
            {label}
          </p>
          <h2
            id="we-use-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-3"
          >
            <span className="block">{title}</span>
            <span className="block text-blue-600">{titleAccent}</span>
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => {
            const items = byCategory[category]
            const visible = items.slice(0, MAX_TOOLS_VISIBLE)
            const rest = items.length - MAX_TOOLS_VISIBLE
            return (
              <div
                key={category}
                className="group rounded-2xl border border-slate-100 bg-slate-50/30 p-6 lg:p-7 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm border border-slate-100">
                    <Icon icon={CATEGORY_ICONS[category] ?? 'mdi:toolbox-outline'} className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 leading-tight">
                      {category}
                    </h3>
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
                      <Icon icon={tool.icon} className="size-3.5 shrink-0 text-slate-400" />
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
    </section>
  )
}

export default WeUseTools
