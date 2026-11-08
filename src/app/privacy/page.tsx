import { Metadata } from 'next'
import Link from 'next/link'
import { createPageMetadata } from '@/lib/seo'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import { publishedApps } from '@/data/apps'
import { GENERAL_PRIVACY, generalPrivacySections } from '@/data/general-privacy'

export const metadata: Metadata = createPageMetadata({
  title: 'App Privacy Policies',
  description: 'Privacy policies for every mobile app published by MasterFabric.',
  path: '/privacy/',
})

export default function PrivacyIndexPage() {
  return (
    <Container>
      <SectionHead
        title="App Privacy Policies"
        description="Pick an app to read its privacy policy. For masterfabric.co itself, see the website policy."
      />
      <div className="mx-auto max-w-4xl mt-12 grid gap-4 sm:grid-cols-2">
        {publishedApps.map((app) => (
          <Link
            key={app.bundleId}
            href={`/privacy/${app.bundleId}/`}
            className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{app.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{app.tagline}</p>
            <p className="text-xs text-gray-500 mt-3">{app.bundleId} · Updated {app.effectiveDate}</p>
          </Link>
        ))}
        {publishedApps.length === 0 && <p className="text-gray-600">No apps published yet.</p>}
      </div>
      <div className="mx-auto max-w-4xl mt-16 prose prose-lg">
        <h2>General Privacy Notice (all apps)</h2>
        <p className="text-sm text-gray-600">
          <strong>Version {GENERAL_PRIVACY.version}</strong> · <strong>Last updated:</strong> {GENERAL_PRIVACY.effectiveDate}
        </p>
        {generalPrivacySections.map((s, i) => (
          <section key={s.title}>
            <h3>{`${i + 1}. ${s.title}`}</h3>
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
      </div>
      <p className="mx-auto max-w-4xl mt-8 text-sm">
        <Link href="/privacy-policy/" className="underline">Website privacy policy →</Link>
      </p>
    </Container>
  )
}
