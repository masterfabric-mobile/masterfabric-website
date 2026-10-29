'use client'

import React, { useEffect, useRef, useState } from 'react'

const LOOP = [
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

type Phase = 0 | 1 | 2 | 3
type Line = { phase: Phase; tool: string; text: string; detail?: string }

const SCENARIOS: {
  sector: string
  repo: string
  prompt: string
  lines: Line[]
}[] = [
  {
    sector: 'Fintech',
    repo: '~/bank-core',
    prompt: 'Add instant refund to the payments flow, with an audit trail.',
    lines: [
      { phase: 0, tool: 'Read', text: 'src/payments/**', detail: '38 files' },
      { phase: 0, tool: 'Plan', text: 'refund service, ledger entry, audit event' },
      { phase: 1, tool: 'Edit', text: 'src/payments/refund.ts', detail: '+86 −4' },
      { phase: 1, tool: 'Edit', text: 'db/migrations/0042_audit_log.sql', detail: '+22' },
      { phase: 2, tool: 'Bash', text: 'npm test -- payments', detail: '✓ 214 passed' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 3 files changed' },
    ],
  },
  {
    sector: 'Healthcare',
    repo: '~/clinic-portal',
    prompt: 'Let patients reschedule appointments; keep records KVKK-compliant.',
    lines: [
      { phase: 0, tool: 'Read', text: 'app/appointments/**', detail: '21 files' },
      { phase: 0, tool: 'Plan', text: 'slot lookup, consent check, notification' },
      { phase: 1, tool: 'Edit', text: 'app/appointments/reschedule.tsx', detail: '+64 −9' },
      { phase: 1, tool: 'Edit', text: 'lib/privacy/mask-patient.ts', detail: '+18' },
      { phase: 2, tool: 'Bash', text: 'pnpm test && pnpm lint', detail: '✓ 97 passed' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 2 files changed' },
    ],
  },
  {
    sector: 'Logistics',
    repo: '~/fleet-tracker',
    prompt: 'Recalculate delivery ETAs when a route is delayed.',
    lines: [
      { phase: 0, tool: 'Read', text: 'services/routing/**', detail: '17 files' },
      { phase: 0, tool: 'Plan', text: 'delay event → ETA job → driver push' },
      { phase: 1, tool: 'Edit', text: 'services/routing/eta.go', detail: '+71 −15' },
      { phase: 1, tool: 'Edit', text: 'services/routing/eta_test.go', detail: '+40' },
      { phase: 2, tool: 'Bash', text: 'go test ./services/...', detail: '✓ ok' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 2 files changed' },
    ],
  },
  {
    sector: 'E-commerce',
    repo: '~/storefront',
    prompt: 'Show stock per store on the product page, cached for 60s.',
    lines: [
      { phase: 0, tool: 'Read', text: 'src/product/**', detail: '26 files' },
      { phase: 0, tool: 'Plan', text: 'inventory API, cache layer, store picker' },
      { phase: 1, tool: 'Edit', text: 'src/product/StockByStore.tsx', detail: '+92' },
      { phase: 1, tool: 'Edit', text: 'src/api/inventory.ts', detail: '+33 −6' },
      { phase: 2, tool: 'Bash', text: 'npm run test:e2e', detail: '✓ 48 passed' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 4 files changed' },
    ],
  },
  {
    sector: 'Public sector',
    repo: '~/municipal-services',
    prompt: 'Digitize the permit application with document upload.',
    lines: [
      { phase: 0, tool: 'Read', text: 'modules/permits/**', detail: '29 files' },
      { phase: 0, tool: 'Plan', text: 'form steps, file scan, case number' },
      { phase: 1, tool: 'Edit', text: 'modules/permits/ApplicationForm.vue', detail: '+118' },
      { phase: 1, tool: 'Edit', text: 'modules/permits/upload.service.ts', detail: '+45' },
      { phase: 2, tool: 'Bash', text: 'npm test && npm run a11y', detail: '✓ 132 passed' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 5 files changed' },
    ],
  },
  {
    sector: 'Mobile',
    repo: '~/loyalty-app',
    prompt: 'Add offline mode to the loyalty card screen in Flutter.',
    lines: [
      { phase: 0, tool: 'Read', text: 'lib/features/card/**', detail: '14 files' },
      { phase: 0, tool: 'Plan', text: 'local cache, sync queue, offline banner' },
      { phase: 1, tool: 'Edit', text: 'lib/features/card/card_repository.dart', detail: '+57 −8' },
      { phase: 1, tool: 'Edit', text: 'lib/core/sync_queue.dart', detail: '+49' },
      { phase: 2, tool: 'Bash', text: 'flutter test', detail: '✓ 76 passed' },
      { phase: 3, tool: 'Done', text: 'Ready for review · 3 files changed' },
    ],
  },
]

const TYPE_MS = 28
const LINE_MS = 900
const HOLD_MS = 2600
const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const TOOL_COLOR: Record<string, string> = {
  Read: 'text-sky-300',
  Plan: 'text-violet-300',
  Edit: 'text-amber-300',
  Bash: 'text-emerald-300',
  Done: 'text-[#28C840]',
}

export default function ClaudeCodeSimulation() {
  const [scenario, setScenario] = useState(0)
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)
  const [tick, setTick] = useState(0)
  const [reduced, setReduced] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const current = SCENARIOS[scenario]
  const promptDone = typed >= current.prompt.length
  const finished = shown >= current.lines.length

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      setReduced(true)
      setTyped(Infinity)
      setShown(Infinity)
    }
  }, [])

  // Drives the spinner glyph.
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setTick((t) => t + 1), 80)
    return () => window.clearInterval(id)
  }, [reduced])

  // Types the prompt, reveals lines one by one, then moves to the next sector.
  useEffect(() => {
    if (reduced) return
    let id: number
    if (!promptDone) {
      id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
    } else if (!finished) {
      id = window.setTimeout(() => setShown((n) => n + 1), LINE_MS)
    } else {
      id = window.setTimeout(() => {
        setScenario((s) => (s + 1) % SCENARIOS.length)
        setTyped(0)
        setShown(0)
      }, HOLD_MS)
    }
    return () => window.clearTimeout(id)
  }, [reduced, promptDone, finished, typed, shown])

  // Keep the active sector tab in view on narrow screens without scrolling the page.
  useEffect(() => {
    const row = tabsRef.current
    const tab = row?.children[scenario] as HTMLElement | undefined
    if (!row || !tab) return
    const target = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2
    row.scrollTo({ left: Math.max(0, target), behavior: reduced ? 'auto' : 'smooth' })
  }, [scenario, reduced])

  const visible = current.lines.slice(0, shown)
  const pending = promptDone && !finished ? current.lines[shown] : null
  const active: number = finished
    ? 3
    : pending
      ? pending.phase
      : visible.length
        ? visible[visible.length - 1].phase
        : 0

  const pickScenario = (i: number) => {
    setScenario(i)
    setTyped(reduced ? Infinity : 0)
    setShown(reduced ? Infinity : 0)
  }

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-[#1F1E1D] shadow-xl ring-1 ring-black/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
          <span className="ml-3 truncate font-mono text-xs text-white/50">{current.repo} — claude</span>
        </div>

        <div
          ref={tabsRef}
          className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-24px),transparent)]"
          role="tablist"
          aria-label="Sector"
        >
          {SCENARIOS.map((s, i) => (
            <button
              key={s.sector}
              type="button"
              role="tab"
              aria-selected={i === scenario}
              onClick={() => pickScenario(i)}
              className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97757]/60 ${
                i === scenario ? 'bg-[#D97757] text-white' : 'text-white/50 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {s.sector}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-2 p-5 font-mono text-[13px] leading-relaxed text-white/80" aria-live="polite">
          <div className="flex items-center gap-2 text-white/60">
            <span className="text-[#D97757]">✻</span>
            <span>
              Welcome to <span className="text-white">Claude Code</span>
            </span>
          </div>
          <div className="min-h-[3.25rem] rounded-lg border border-[#D97757]/40 px-3 py-2 text-white">
            <span className="text-[#D97757]">&gt; </span>
            {current.prompt.slice(0, typed)}
            {!promptDone && <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />}
          </div>

          <ul className="min-h-[11rem] space-y-1.5 pt-2">
            {visible.map((line) => (
              <li key={line.tool + line.text} className="flex gap-2">
                <span className={TOOL_COLOR[line.tool]}>{line.tool === 'Done' ? '✓' : '⏺'}</span>
                <span className="min-w-0 truncate">
                  {line.tool !== 'Done' && <span className={`${TOOL_COLOR[line.tool]} font-semibold`}>{line.tool}</span>}
                  {line.tool !== 'Done' && <span className="text-white/40">(</span>}
                  <span className={line.tool === 'Done' ? 'text-white' : ''}>{line.text}</span>
                  {line.tool !== 'Done' && <span className="text-white/40">)</span>}
                  {line.detail && <span className="text-white/40">  {line.detail}</span>}
                </span>
              </li>
            ))}
            {pending && (
              <li className="flex gap-2 text-[#D97757]">
                <span>{SPINNER[tick % SPINNER.length]}</span>
                <span>{['Planning', 'Building', 'Proving', 'Reviewing'][pending.phase]}…</span>
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[11px] text-white/40">
          <span>{current.sector.toLowerCase()} · engineer in the loop</span>
          <span>{LOOP[active].label.toLowerCase()}</span>
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {LOOP.map((item, i) => {
          const isActive = i === active
          return (
            <li
              key={item.label}
              className={`rounded-xl border px-4 py-3 transition-colors duration-300 ${
                isActive ? 'border-[#C45C3E]/40 bg-[#FBF1EC]' : 'border-transparent bg-slate-50'
              }`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    isActive || i < active ? 'bg-[#C45C3E] text-white' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {i + 1}
                </span>
                {item.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
