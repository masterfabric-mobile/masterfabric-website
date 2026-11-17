import React from 'react'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import { getChangelog } from '@/data/changelog'
import { REPO_URL, SITE_COMMIT_SHA, SITE_VERSION } from '@/lib/version'

export const metadata: Metadata = createPageMetadata({
  title: 'Changelog',
  description: 'Release notes for masterfabric.co: what changed in each version of the site.',
  path: '/changelog/',
})

// Renders the inline Markdown used in CHANGELOG.md: [links](url) and `code`.
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    if (match[1]) {
      const external = /^https?:\/\//.test(match[2])
      nodes.push(
        <a
          key={match.index}
          href={match[2]}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {match[1]}
        </a>
      )
    } else {
      nodes.push(<code key={match.index}>{match[3]}</code>)
    }
    last = pattern.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function ChangelogPage() {
  const releases = getChangelog()

  return (
    <Container>
      <SectionHead
        title="Changelog"
        description={
          <>
            Release notes for this site. Current version{' '}
            <span className="font-semibold text-gray-900">v{SITE_VERSION}</span>
            {SITE_COMMIT_SHA && (
              <>
                {' '}(
                <a
                  href={`${REPO_URL}/commit/${SITE_COMMIT_SHA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-base underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                >
                  {SITE_COMMIT_SHA}
                </a>
                )
              </>
            )}
            .
          </>
        }
      />

      <div className="mx-auto max-w-3xl mt-16 mb-24 space-y-14">
        {releases.map((release) => (
          <section key={release.version} id={`v${release.version}`} className="scroll-mt-28">
            <div className="flex flex-wrap items-baseline gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-2xl font-bold text-gray-900">
                <a href={`#v${release.version}`} className="hover:underline">
                  v{release.version}
                </a>
              </h2>
              {release.date && (
                <time dateTime={release.date} className="text-sm text-gray-500">
                  {release.date}
                </time>
              )}
              {release.version === SITE_VERSION && (
                <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                  Current
                </span>
              )}
            </div>
            <div className="prose prose-gray mt-6 max-w-none">
              {release.sections.map((section) => (
                <div key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item, i) => (
                      <li key={i}>{renderInline(item)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  )
}
