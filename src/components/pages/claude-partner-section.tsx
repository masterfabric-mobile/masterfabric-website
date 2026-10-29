import Link from 'next/link'
import ClaudeCodeSimulation from './claude-code-simulation'
import ClaudePartnerDisclosure from './claude-partner-disclosure'

const STEPS = [
  {
    n: '01',
    title: 'Take the brief',
    text: 'We start from the request: the process, the data, and what done means for an institution or a private client.',
  },
  {
    n: '02',
    title: 'Plan with Claude',
    text: 'Architecture, flows, and the agent plan are shaped with Claude before the production system is written.',
  },
  {
    n: '03',
    title: 'Build in review',
    text: 'Agents draft the work. Engineers stay in the loop for design, security, and the calls Claude should not make alone.',
  },
  {
    n: '04',
    title: 'Prove and hand over',
    text: 'Tests, fixes, and deploy are the same pass. The client leaves with software they own.',
  },
] as const

const SDLC_OUTCOMES = [
  {
    title: 'Faster from brief to diff',
    text: 'Routine work is drafted by the agent, so engineers spend their time on the hard calls.',
  },
  {
    title: 'Every change reviewed',
    text: 'Plans, diffs, and test runs stay visible. Nothing reaches production unseen.',
  },
  {
    title: 'Your team keeps the skill',
    text: 'We work inside your repositories and train your engineers on the same flow.',
  },
] as const

const PRACTICE = [
  {
    title: 'Institutions',
    text: 'The system is written around the process they already run, including the AI transformation they asked for. Claude is how we get there with more care, not a product we resell.',
  },
  {
    title: 'Private clients',
    text: 'Founders get bespoke software, not a package they have to bend. The partner network is the practice behind it: Claude for the thinking and the draft, MasterFabric for what has to live in production.',
  },
  {
    title: 'The studio',
    text: 'The AI SDLC we teach in MasterFabric Academy is the same one we deliver with. Teams see the plan, the review, and the deploy. Nothing is left as a black box.',
  },
] as const

export default function ClaudePartnerSection() {
  return (
    <section
      className="w-full max-w-5xl mx-auto pt-4 pb-2 md:pt-8 md:pb-4"
      aria-labelledby="claude-partner-title"
    >
      <div className="border-t border-gray-100 pt-10 md:pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-[#C45C3E]/15 bg-gradient-to-br from-[#FBF1EC] via-white to-white p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D97757]/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <img
            src="/assets/claude-mark.svg"
            alt=""
            width={72}
            height={68}
            className="h-16 w-16 shrink-0 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-[#C45C3E]/10"
          />
          <div className="min-w-0 text-left">
            <p className="text-sm font-medium tracking-wide text-[#C45C3E]">
              Claude Partner Network
            </p>
            <h2
              id="claude-partner-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              We are a{' '}
              <span className="text-[#C45C3E]">Claude Partner Network</span>
              {' '}partner
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 lg:text-lg">
              <span className="font-semibold text-slate-900">MasterFabric</span> designs and ships custom software with Claude. Institutions and private
              clients get a system written around their brief — planned, built, and reviewed with
              Claude in the loop.
            </p>
            <a
              href="https://claude.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 underline decoration-gray-300 underline-offset-4 hover:decoration-slate-900"
            >
              About the partner network
            </a>
          </div>
          </div>
        </div>

        <ClaudePartnerDisclosure
          title="How we work with Claude"
          description="The engagement, the AI-native SDLC with Claude Code, and what it looks like in our work."
        >

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            How an engagement runs
          </h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="group relative rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#C45C3E]/30 hover:shadow-md"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF1EC] text-xs font-semibold text-[#C45C3E] group-hover:bg-[#C45C3E] group-hover:text-white">{step.n}</span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <h3
            id="claude-code-sdlc"
            className="scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            AI-native SDLC with Claude
          </h3>
          <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Your team ships like an AI-native team,{' '}
                <span className="text-[#C45C3E]">without giving up control.</span>
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                We bring the same lifecycle into your organization with{' '}
                <span className="font-semibold text-slate-900">Claude Code</span>. An engineer
                states the task. Claude Code reads the repository, drafts the change, and runs the
                checks. The review — and every decision that matters — stays with your people.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Start your transformation
              </Link>
              <a
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-300 hover:bg-slate-50"
              >
                About Claude Code
              </a>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {SDLC_OUTCOMES.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FBF1EC] text-xs text-[#C45C3E]" aria-hidden="true">✓</span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-gray-600">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ClaudeCodeSimulation />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            What the program looks like in our work
          </h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {PRACTICE.map((item) => (
              <li key={item.title} className="rounded-xl border-l-2 border-[#C45C3E] bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-600">
            The same flow is what the studio shows next:{' '}
            <Link href="#ai-first-wizard-title" className="font-medium text-slate-900 underline decoration-gray-300 underline-offset-4 hover:decoration-slate-900">
              a project created step by step
            </Link>
            .
          </p>
        </div>

        </ClaudePartnerDisclosure>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#1F1E1D] px-6 py-10 sm:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D97757]/20 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-[#D97757]">
                MasterFabric × Claude
              </p>
              <h3 className="mt-2 text-2xl font-light tracking-tight text-white sm:text-3xl">
                Many projects shipped with <span className="font-bold">MasterFabric</span> expertise.{' '}
                <span className="font-semibold text-[#D97757]">Now it&apos;s your turn.</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                Institutions and private clients already run software we planned, built, and
                reviewed with Claude in the loop. Bring us your brief and we will start yours.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#D97757] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C45C3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97757] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F1E1D]"
            >
              Start your project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
