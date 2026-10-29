import Link from 'next/link'
import Container from '@/components/layout/container'
import GitHubProjects, { OpenSourceManifesto } from '@/components/about/github-projects'
import referencesData from '@/data/references.json'

const FOCUS = [
  {
    title: 'Custom software',
    text: 'Bespoke systems written for one organization — following the process it already runs, owned by it when the project ends.',
  },
  {
    title: 'AI transformation',
    text: 'Production assistants, automation, document intelligence, and decision support connected to your own data.',
  },
  {
    title: 'Mobile and web',
    text: 'Products for iOS, Android, HarmonyOS, and the browser — Flutter and React Native, with Swift and Kotlin where needed.',
  },
  {
    title: 'Integrations and modernization',
    text: 'APIs, admin consoles, data layers, and performance-focused refactors of the systems you depend on.',
  },
] as const

const WHERE = [
  {
    label: 'Turkey and Europe',
    text: 'We deliver projects through strong business partnerships in Turkey and Europe.',
  },
  {
    label: 'Public institutions',
    text: 'In Turkey we are a stakeholder in the digital transformation of public institutions, especially in education and military.',
  },
  {
    label: 'Energy transformation',
    text: 'We deliver qualified projects for organizations changing how energy is produced, moved, or used.',
  },
] as const

const PROCESS = [
  { n: '01', title: 'Discover', text: 'Map the workflow, the data, and the outcome you asked for.' },
  { n: '02', title: 'Design', text: 'Architecture, interfaces, and where AI belongs — before production code.' },
  { n: '03', title: 'Build', text: 'Mobile, web, backend, and models in short, reviewed cycles.' },
  { n: '04', title: 'Operate', text: 'Handover, training, and ongoing improvement. The software is yours.' },
] as const

const STACK = ['Flutter', 'React Native', 'Swift', 'Kotlin', 'TypeScript', 'NestJS', 'Node.js', 'Firebase', 'AWS', 'Claude Code', 'Figma']

export default function AboutPage() {
  return (
    <>
      <Container>
        {/* Hero */}
        <section className="pt-12 pb-16 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              About MasterFabric
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We build the software{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                you asked for.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              MasterFabric is an Ankara-based studio that builds custom software and AI transformation
              systems for institutions and private clients. We do not sell a packaged platform — we write
              the system that fits the brief, and if a ready-made tool already solves it, we say so.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Start a project
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                See our services
              </Link>
            </div>
          </div>
        </section>

        {/* Claude partner strip */}
        <section className="pb-16">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-[#C45C3E]/15 bg-gradient-to-br from-[#FBF1EC] via-white to-white p-6 sm:flex-row sm:items-center sm:p-8">
            <img
              src="/assets/claude-mark.svg"
              alt=""
              width={48}
              height={45}
              className="h-12 w-12 shrink-0 rounded-xl bg-white p-2 shadow-sm ring-1 ring-[#C45C3E]/10"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#C45C3E]">Claude Partner Network</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                We plan, build, and review custom software with Claude in the loop.
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Claude is part of how we deliver — not a product we resell. Engineers stay on every decision.
              </p>
            </div>
            <Link
              href="/#claude-partner-title"
              className="shrink-0 text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
            >
              How we work with Claude
            </Link>
          </div>
        </section>

        {/* What we do */}
        <section className="pb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">What we do</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              One studio, from the brief to production
            </h2>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {FOCUS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
              >
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 leading-relaxed text-slate-600">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Where we work */}
        <section className="pb-16">
          <div className="overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">Where we work</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white">
              Partnerships, public institutions, and energy
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {WHERE.map((item) => (
                <li key={item.label} className="border-l-2 border-blue-400/60 pl-5">
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="pb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">How we work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">A process you can follow</h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <li key={step.n} className="relative rounded-2xl bg-slate-50 p-6">
                <span className="text-3xl font-bold text-blue-600/20">{step.n}</span>
                <p className="mt-2 font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack + Academy */}
        <section className="grid gap-4 pb-16 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Technology</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">The stack we ship with</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {STACK.map((name) => (
                <li key={name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">MasterFabric Academy</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">We teach what we deliver</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Agentic AI Developer training and the AI SDLC — DevOps, SecOps, and LLMOps — for working
              engineers and private company cohorts.
            </p>
            <a
              href="https://academy.masterfabric.co"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Visit the Academy →
            </a>
          </div>
        </section>

        {/* References */}
        <section className="pb-16">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Teams we have worked with
          </p>
          <ul className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {referencesData.references.map((ref) => (
              <li key={ref.id} className="flex justify-center">
                <a href={ref.website} target="_blank" rel="noopener noreferrer" title={ref.name}>
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="h-10 w-auto max-w-[140px] opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Office + CTA */}
        <section className="pb-20">
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Have a brief? Let&apos;s talk.</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                Tell us the problem, who owns it, and what done looks like. We reply within one business day.
              </p>
              <Link
                href="/contact/"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Contact us
              </Link>
            </div>
            <div className="rounded-2xl bg-white/80 p-6 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-900">Ankara office</p>
              <p className="mt-2 leading-relaxed">
                Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Turkey
              </p>
              <p className="mt-3">Mon–Fri 09:00–18:00 · Sat 10:00–16:00</p>
              <a href="mailto:info@masterfabric.co" className="mt-3 inline-block font-medium text-blue-600 hover:text-blue-700">
                info@masterfabric.co
              </a>
            </div>
          </div>
        </section>
      </Container>

      <div className="w-full overflow-x-hidden border-t border-slate-100 bg-white">
        <OpenSourceManifesto compact />
        <GitHubProjects />
      </div>
    </>
  )
}
