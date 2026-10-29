import Link from 'next/link'

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

const CLAUDE_CODE_LOOP = [
  {
    label: 'Plan',
    text: 'The brief becomes a task in Claude Code. The repository and the constraints are read before files change.',
  },
  {
    label: 'Build',
    text: 'Claude Code drafts the diff in the working tree. The engineer stays on the decision.',
  },
  {
    label: 'Prove',
    text: 'Tests and checks run in that same session, not as a later handoff.',
  },
  {
    label: 'Review',
    text: 'Nothing ships because the agent wrote it. An engineer accepts the diff.',
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
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <img
            src="/assets/claude-mark.svg"
            alt=""
            width={72}
            height={68}
            className="h-16 w-16 shrink-0 rounded-2xl bg-white"
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

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            How an engagement runs
          </h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <span className="text-xs font-semibold tracking-wide text-[#C45C3E]">{step.n}</span>
                <p className="mt-2 text-sm font-semibold text-slate-900">{step.title}</p>
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
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
            The lifecycle runs in the terminal with{' '}
            <span className="font-semibold text-slate-900">Claude Code</span>.
            An engineer states the task. Claude Code reads the repository, drafts the change, and
            runs the checks. The review stays with the engineer.
          </p>
          <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-[#C45C3E]">Claude Code</p>
              <div className="mt-3 space-y-2 font-mono text-[13px] leading-relaxed text-slate-700">
                <p>
                  <span className="text-gray-400">$ </span>claude
                </p>
                <p className="text-slate-900">
                  <span className="text-[#C45C3E]">&gt; </span>
                  Plan the change from the brief, then implement it in review.
                </p>
                <ul className="space-y-1 border-t border-gray-100 pt-2 text-gray-600">
                  <li>Read the repository</li>
                  <li>Wrote the plan</li>
                  <li>Edited the implementation</li>
                  <li>Ran the tests</li>
                  <li className="text-slate-900">Ready for review</li>
                </ul>
              </div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CLAUDE_CODE_LOOP.map((item) => (
                <li key={item.label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            What the program looks like in our work
          </h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {PRACTICE.map((item) => (
              <li key={item.title} className="rounded-xl bg-slate-50 p-5">
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
      </div>
    </section>
  )
}
