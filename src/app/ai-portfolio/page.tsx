import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'
import { repos, latestSnapshotDate } from '@/data/ai-portfolio/repos'
import { RepoCard } from '@/components/ai-portfolio/RepoCard'
import { Hero } from '@/components/ai-portfolio/Hero'
import { Reveal } from '@/components/ai-portfolio/Reveal'
import { Gallery } from '@/components/ai-portfolio/Gallery'
import { SectionHead } from '@/components/ai-portfolio/SectionHead'
import { Privacy } from '@/components/ai-portfolio/Privacy'
import { Sims } from '@/components/ai-portfolio/sims/Sims'

export const metadata: Metadata = createPageMetadata({
  title: 'AI-Portfolio',
  description:
    'Nine public MasterFabric repositories: a hands-on, measured, on-prem and local-first data and AI architecture portfolio.',
  path: '/ai-portfolio/',
})

export default function AiPortfolioPage() {
  return (
    <>
      <Hero repoCount={repos.length} snapshotDate={latestSnapshotDate} />

      <section id="labs-in-motion" className="section wrap scroll-mt-24 pb-0 md:pb-0" aria-label="Labs in motion">
        <SectionHead eyebrow="Labs in motion" title="Simulations from measured results">
          Every animation here is a simulation. Every figure shown as a result
          comes from the measured snapshots of each repository and is quoted
          from them; nothing is invented or extrapolated.
        </SectionHead>
        <Sims />
        <Privacy />
      </section>

      <section className="pb-4 pt-16 md:pt-24" aria-label="Charts and diagrams from the repositories">
        <div className="hairline" />
        <div className="py-12 md:py-16">
          <p className="label mb-8 text-center text-ap-ink-faint">
            From the repositories &middot; measured charts &amp; diagrams
          </p>
          <Gallery />
        </div>
        <div className="hairline" />
      </section>

      <section id="repositories" className="section wrap scroll-mt-24">
        <SectionHead eyebrow="Work" title="The Repositories" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, index) => (
            <Reveal key={repo.slug} delay={(index % 3) * 0.06} className="h-full">
              <RepoCard repo={repo} index={index} />
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-ap-ink-faint">
          Figures on this page reflect each repository&rsquo;s main branch at
          copy time (latest snapshot: {latestSnapshotDate}). They can be
          refreshed whenever the source repositories change.
        </p>
      </section>
    </>
  )
}
