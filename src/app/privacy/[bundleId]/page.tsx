import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createPageMetadata } from '@/lib/seo'
import { buildPolicy } from '@/lib/privacy-policy'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import { apps, getApp } from '@/data/apps'

type Params = { params: { bundleId: string } }

export function generateStaticParams() {
  return apps.map((a) => ({ bundleId: a.bundleId }))
}

export function generateMetadata({ params }: Params): Metadata {
  const app = getApp(params.bundleId)
  if (!app) return {}
  const meta = createPageMetadata({
    title: `${app.name} Privacy Policy`,
    description: `How ${app.name} collects, uses and protects your information.`,
    path: `/privacy/${app.bundleId}/`,
  })
  return app.draft ? { ...meta, robots: { index: false, follow: false } } : meta
}

/** Turns bare URLs in policy text into links. */
function linkify(text: string) {
  return text.split(/(https?:\/\/\S+?)(?=[.,;)]?(?:\s|$))/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
    ) : (
      part
    )
  )
}

export default function AppPrivacyPage({ params }: Params) {
  const app = getApp(params.bundleId)
  if (!app) notFound()
  const sections = buildPolicy(app)

  return (
    <Container>
      <SectionHead title={`${app.name} Privacy Policy`} description={app.tagline} />


      <div className="mx-auto max-w-4xl mt-10 prose prose-lg">
        <p className="text-sm text-gray-600">
          <strong>Bundle ID:</strong> {app.bundleId} · <strong>Version {app.version}</strong> · <strong>Last updated:</strong> {app.effectiveDate}
        </p>
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2>{`${i + 1}. ${s.title}`}</h2>
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{linkify(b)}</li>)}</ul>}
          </section>
        ))}
        <p>
          See also the <Link href="/privacy/">General Privacy Notice</Link> that applies to all MasterFabric apps.
        </p>
        <h2>Version history</h2>
        <ul>
          {app.history.map((h) => (
            <li key={h.version}>
              <strong>v{h.version}</strong> ({h.date}): {h.summary}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
