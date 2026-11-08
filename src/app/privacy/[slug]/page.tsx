import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createPageMetadata } from '@/lib/seo'
import { buildPolicy } from '@/lib/privacy-policy'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import { apps, getApp, publishedApps } from '@/data/apps'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const app = getApp(params.slug)
  if (!app) return {}
  const meta = createPageMetadata({
    title: `${app.name} Privacy Policy`,
    description: `How ${app.name} collects, uses and protects your information.`,
    path: `/privacy/${app.slug}/`,
  })
  return app.draft ? { ...meta, robots: { index: false, follow: false } } : meta
}

export default function AppPrivacyPage({ params }: Params) {
  const app = getApp(params.slug)
  if (!app) notFound()
  const sections = buildPolicy(app)

  return (
    <Container>
      <SectionHead title={`${app.name} Privacy Policy`} description={app.tagline} />

      <nav className="mx-auto max-w-4xl mt-8 flex flex-wrap gap-2 text-sm" aria-label="Apps">
        {publishedApps.map((a) => (
          <Link
            key={a.slug}
            href={`/privacy/${a.slug}/`}
            className={`rounded-full border px-3 py-1 ${a.slug === app.slug ? 'bg-black text-white' : 'border-gray-300'}`}
          >
            {a.name}
          </Link>
        ))}
      </nav>

      <div className="mx-auto max-w-4xl mt-10 prose prose-lg">
        <p className="text-sm text-gray-600">
          <strong>Version {app.version}</strong> · <strong>Last updated:</strong> {app.effectiveDate}
        </p>
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2>{`${i + 1}. ${s.title}`}</h2>
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
        <p>
          See also the <Link href="/privacy/">General Privacy Notice</Link> that applies to all MasterFabric apps.
        </p>
        <h2>Version history</h2>
        <ul>
          {app.history.map((h) => (
            <li key={h.version}>
              <strong>v{h.version}</strong> ({h.date}){h.minAppVersion ? ` — app ${h.minAppVersion}+` : ''}: {h.summary}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
