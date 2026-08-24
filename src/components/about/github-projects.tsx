'use client'

import React, { useState, useEffect } from 'react'
import { Github, Star, GitFork, ExternalLink, X, Copy, Globe, Calendar, GitBranch } from 'lucide-react'

export interface GitHubProject {
  name: string
  description: string
  url: string
  clone_url?: string
  homepage?: string
  language: string
  stars: number
  forks: number
  topics: string[]
  updated_at?: string
  default_branch?: string
}

interface GitHubApiRepo {
  name: string
  description: string | null
  html_url: string
  clone_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
  updated_at: string
  default_branch: string
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Dart: '#0175c2',
  Shell: '#89e051',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
  Python: '#3572A5',
  Go: '#00ADD8',
  Nextjs: '#ff5d01',
}

const FALLBACK_MOBILE: GitHubProject[] = [
  {
    name: 'masterfabric-website',
    description: 'Official website for MasterFabric Inc.',
    url: 'https://github.com/masterfabric-mobile/masterfabric-website',
    clone_url: 'https://github.com/masterfabric-mobile/masterfabric-website.git',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    topics: ['nextjs', 'typescript', 'website'],
  },
]

const FALLBACK_FABRIC: GitHubProject[] = [
  {
    name: 'one-hundered-days',
    description: 'Public roadmaps and MasterFabric Academy MCP for interactive learning.',
    url: 'https://github.com/masterfabric/one-hundered-days',
    clone_url: 'https://github.com/masterfabric/one-hundered-days.git',
    language: 'Unknown',
    stars: 0,
    forks: 0,
    topics: ['mcp', 'academy', 'open-source'],
  },
]

export function OpenSourceManifesto({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 sm:pt-12 sm:pb-8" aria-labelledby="open-source-heading">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-2">
          Open source
        </p>
        <h2 id="open-source-heading" className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight mb-2">
          We support open source and ship for the community
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Public repositories, libraries, and demos—beyond our sectoral and client work. We release
          reusable packages, demo apps, and tooling so the wider community can build better, faster.
          Everything below is under <strong className="text-slate-800">MasterFabric Mobile</strong> and{' '}
          <strong className="text-slate-800">MasterFabric</strong> on GitHub.
        </p>
      </section>
    )
  }

  return (
    <section className="text-center mt-12" aria-labelledby="open-source-heading">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
        Open source
      </p>
      <h2 id="open-source-heading" className="text-xl font-semibold text-gray-800 mb-4 sm:text-lg">
        We support open source and ship for the community
      </h2>
      <p className="text-slate-600 mb-8 sm:text-sm max-w-2xl mx-auto">
        Public repositories, libraries, and demos—beyond our sectoral and client work.
      </p>
    </section>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: GitHubProject
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/card flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl p-6 border transition-all duration-300 flex flex-col bg-white border-gray-200/80 shadow-sm hover:bg-white hover:border-gray-300 hover:shadow-xl hover:-translate-y-0.5 text-left cursor-pointer"
    >
      <div className="flex gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 transition-colors group-hover/card:bg-blue-50/80 group-hover/card:border-blue-100">
          <Github className="w-5 h-5 text-gray-500 transition-colors group-hover/card:text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate mb-0.5 transition-colors group-hover/card:text-blue-600">
            {project.name}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: languageColors[project.language] || '#9ca3af',
              }}
              aria-hidden
            />
            <span>{project.language}</span>
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.topics.slice(0, 3).map((topic, topicIndex) => (
          <span
            key={topicIndex}
            className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
          >
            {topic}
          </span>
        ))}
        {project.topics.length > 3 && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-400 text-xs rounded-md font-medium">
            +{project.topics.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover/card:border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500/80" />
            {project.stars}
          </span>
          <span className="flex items-center gap-1.5">
            <GitFork className="w-4 h-4 text-gray-400" />
            {project.forks}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover/card:text-blue-700">
          Details
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </button>
  )
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: GitHubProject
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const cloneUrl = project.clone_url || `${project.url}.git`

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const copyCloneUrl = async () => {
    try {
      await navigator.clipboard.writeText(cloneUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const homepageHref = project.homepage
    ? project.homepage.startsWith('http')
      ? project.homepage
      : `https://${project.homepage}`
    : null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col w-full h-full bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-500 truncate">
          github.com → {project.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden mb-8">
            <div className="aspect-video flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4">
                <Github className="w-8 h-8 text-gray-600" />
              </div>
              <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {project.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-lg line-clamp-2 mb-4">
                {project.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-700">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: languageColors[project.language] || '#94a3b8' }}
                    aria-hidden
                  />
                  {project.language}
                </span>
                {project.default_branch && (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                    <GitBranch className="w-3.5 h-3.5" />
                    {project.default_branch}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-amber-500/80 shrink-0" />
                  <span>{project.stars} stars</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <GitFork className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{project.forks} forks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 col-span-2">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Last updated: {formatDate(project.updated_at)}</span>
                </div>
              </div>

              {homepageHref && (
                <a
                  href={homepageHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span className="truncate">{project.homepage}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}

              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Clone URL</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-gray-700 truncate bg-white px-3 py-2 rounded-lg border border-gray-200">
                    {cloneUrl}
                  </code>
                  <button
                    type="button"
                    onClick={copyCloneUrl}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 sm:p-8 border-t border-gray-100 bg-gray-50/50">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold transition-colors"
              >
                <Github className="w-5 h-5" />
                Go to repo
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapRepos(repos: GitHubApiRepo[]): GitHubProject[] {
  return repos.map((repo) => ({
    name: repo.name,
    description: repo.description || 'No description available',
    url: repo.html_url,
    clone_url: repo.clone_url,
    homepage: repo.homepage || undefined,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics || [],
    updated_at: repo.updated_at,
    default_branch: repo.default_branch,
  }))
}

async function fetchOrgRepos(org: string): Promise<GitHubProject[]> {
  const response = await fetch(
    `https://api.github.com/orgs/${org}/repos?sort=updated&per_page=10`
  )
  if (!response.ok) return []
  const repos = (await response.json()) as GitHubApiRepo[]
  return mapRepos(repos)
}

function CarouselRow({
  projects,
  duplicated,
  isLoading,
  reverse,
  onCardClick,
}: {
  projects: GitHubProject[]
  duplicated: GitHubProject[]
  isLoading: boolean
  reverse?: boolean
  onCardClick: (project: GitHubProject) => void
}) {
  return (
    <div className="mb-16 lg:mb-20 last:mb-0">
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-400" />
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="carousel-track-wrap group w-full">
          <div
            className={`flex gap-6 w-max pb-4 will-change-transform ${reverse ? 'animate-scroll-infinite-reverse' : 'animate-scroll-infinite'}`}
          >
            {duplicated.map((project, index) => (
              <ProjectCard
                key={`${project.name}-${index}`}
                project={project}
                onClick={() => onCardClick(project)}
              />
            ))}
          </div>
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          No public repositories yet.
        </div>
      )}
    </div>
  )
}

export default function GitHubProjects() {
  const [mobileProjects, setMobileProjects] = useState<GitHubProject[]>([])
  const [fabricProjects, setFabricProjects] = useState<GitHubProject[]>([])
  const [isLoadingMobile, setIsLoadingMobile] = useState(true)
  const [isLoadingFabric, setIsLoadingFabric] = useState(true)
  const [selectedProject, setSelectedProject] = useState<GitHubProject | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [mobile, fabric] = await Promise.all([
          fetchOrgRepos('masterfabric-mobile'),
          fetchOrgRepos('masterfabric'),
        ])
        setMobileProjects(mobile.length > 0 ? mobile : FALLBACK_MOBILE)
        setFabricProjects(fabric.length > 0 ? fabric : FALLBACK_FABRIC)
      } catch (e) {
        console.error('Error fetching GitHub repos:', e)
        setMobileProjects(FALLBACK_MOBILE)
        setFabricProjects(FALLBACK_FABRIC)
      } finally {
        setIsLoadingMobile(false)
        setIsLoadingFabric(false)
      }
    }
    load()
  }, [])

  const duplicatedMobile = [...mobileProjects, ...mobileProjects]
  const duplicatedFabric = [...fabricProjects, ...fabricProjects]

  return (
    <section className="w-full bg-white overflow-x-hidden py-12 lg:py-16" aria-labelledby="our-open-source-projects-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 id="our-open-source-projects-heading" className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight text-center">
          Our open source projects
        </h2>
      </div>

      <div className="carousel-isolate">
        <CarouselRow
          projects={mobileProjects}
          duplicated={duplicatedMobile}
          isLoading={isLoadingMobile}
          onCardClick={setSelectedProject}
        />

        <CarouselRow
          projects={fabricProjects}
          duplicated={duplicatedFabric}
          isLoading={isLoadingFabric}
          reverse
          onCardClick={setSelectedProject}
        />
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/masterfabric-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>MasterFabric Mobile on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/masterfabric"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>MasterFabric on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
