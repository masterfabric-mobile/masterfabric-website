'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Activity, AppWindow, BarChart3, Bell, ChevronLeft, ChevronRight, Gauge, Globe, LayoutGrid,
  Search, Settings, ShieldCheck, Smartphone, Sparkles, Zap,
} from 'lucide-react'
import IPhone17, { CameraLens } from '@/components/ui/iphone-17'

type Tab = 'summary' | 'insights' | 'apps' | 'settings'
type Phase = 'idle' | 'running' | 'done'
type Metric = (typeof METRICS)[number]

const STEPS = ['Analyzing performance', 'Optimizing code', 'Applying changes'] as const
const STEP_MS = 1400
const MAX = 98

const METRICS = [
  { id: 'load', label: 'Load time', value: '0.8s', icon: Zap, tint: 'bg-orange-500', stroke: '#F97316', series: [1.9, 1.6, 1.5, 1.2, 1.1, 0.9, 0.8], note: 'Cold start dropped after image and bundle work.' },
  { id: 'stability', label: 'Stability', value: '99.2%', icon: ShieldCheck, tint: 'bg-green-500', stroke: '#22C55E', series: [96.1, 96.8, 97.4, 98.0, 98.6, 99.0, 99.2], note: 'Crash-free sessions over the last 7 days.' },
  { id: 'crashes', label: 'Crash reports', value: '3', icon: Search, tint: 'bg-purple-500', stroke: '#A855F7', series: [14, 11, 9, 8, 5, 4, 3], note: 'Open reports, grouped by stack trace.' },
  { id: 'engagement', label: 'Engagement', value: 'High', icon: Activity, tint: 'bg-blue-500', stroke: '#3B82F6', series: [42, 45, 44, 51, 55, 58, 61], note: 'Daily active sessions per 100 installs.' },
] as const

const WEEK = [62, 70, 58, 81, 76, 90, 84]
const MONTH = [55, 61, 64, 70, 68, 74, 79, 83]

const APPS = [
  { name: 'Loyalty', platform: 'iOS', version: '4.2.1', icon: Smartphone, status: 'Healthy', tint: 'bg-sky-500' },
  { name: 'Loyalty', platform: 'Android', version: '4.2.0', icon: Smartphone, status: 'Review', tint: 'bg-emerald-500' },
  { name: 'Storefront', platform: 'Web', version: '2.9.0', icon: Globe, status: 'Healthy', tint: 'bg-indigo-500' },
  { name: 'Admin console', platform: 'Web', version: '1.4.3', icon: AppWindow, status: 'Deploying', tint: 'bg-slate-700' },
] as const

// Small SVG sparkline for detail screens.
function Sparkline({ series, stroke }: { series: readonly number[]; stroke: string }) {
  const min = Math.min(...series)
  const max = Math.max(...series)
  const points = series
    .map((v, i) => `${(i / (series.length - 1)) * 240},${70 - ((v - min) / (max - min || 1)) * 60}`)
    .join(' ')
  return (
    <svg viewBox="0 0 240 76" className="h-24 w-full" aria-hidden="true">
      <polyline points={`0,76 ${points} 240,76`} fill={stroke} fillOpacity="0.12" stroke="none" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors ${on ? 'bg-[#34C759]' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${on ? 'left-[20px]' : 'left-[2px]'}`} />
    </button>
  )
}

// Interactive iOS demo app inside the iPhone 17 frame on the home page.
export default function AppPerformanceDemo({ className = '' }: { className?: string }) {
  const [tab, setTab] = useState<Tab>('summary')
  const [detail, setDetail] = useState<Metric | null>(null)
  const [score, setScore] = useState(85)
  const [before, setBefore] = useState(85)
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const [range, setRange] = useState<'week' | 'month'>('week')
  const [settings, setSettings] = useState({ alerts: true, auto: false, reports: true, beta: true })
  const [islandOpen, setIslandOpen] = useState(false)
  const timers = useRef<number[]>([])

  const surface = 'bg-white text-slate-900'
  const muted = 'text-slate-400'
  const divider = 'divide-slate-100'

  useEffect(() => {
    const start = Math.floor(Math.random() * 11) + 80
    setScore(start)
    setBefore(start)
    const pending = timers.current
    return () => pending.forEach(window.clearTimeout)
  }, [])

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  const optimize = () => {
    if (phase === 'running' || score >= MAX) return
    setBefore(score)
    setPhase('running')
    setStep(0)
    setIslandOpen(true)
    // The live activity collapses to compact after a moment, like iOS.
    later(() => setIslandOpen(false), 1600)
    STEPS.forEach((_, i) => later(() => setStep(i), i * STEP_MS))
    later(() => {
      setScore((s) => Math.min(MAX, s + 12))
      setPhase('done')
      setIslandOpen(true)
      later(() => setIslandOpen(false), 2200)
    }, STEPS.length * STEP_MS)
  }

  // Auto-optimize kicks in when the setting is turned on.
  useEffect(() => {
    if (settings.auto && phase === 'idle' && score < MAX) later(optimize, 600)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.auto])

  const progress = phase === 'done' ? 1 : (step + 1) / STEPS.length

  const island = (() => {
    if (phase === 'idle') return undefined
    const ring = (
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] -rotate-90" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
        <circle
          cx="10" cy="10" r="8" fill="none" stroke={phase === 'done' ? '#34C759' : '#0A84FF'} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={50.3} strokeDashoffset={50.3 * (1 - progress)} className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
    )
    return (
      <div
        className={`overflow-hidden bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          islandOpen ? 'h-[76px] w-[260px] rounded-[28px]' : 'h-[30px] w-[150px] rounded-full'
        }`}
        role="status"
      >
        {islandOpen ? (
          <div className="flex h-full items-center gap-3 px-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${phase === 'done' ? 'bg-[#34C759]' : 'bg-[#0A84FF]'}`}>
              {phase === 'done' ? <Sparkles className="h-5 w-5" aria-hidden="true" /> : <Gauge className="h-5 w-5" aria-hidden="true" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] text-white/60">Pulse</span>
              <span className="block truncate text-[13px] font-semibold">
                {phase === 'done' ? `Score up ${score - before} points` : STEPS[step]}
              </span>
            </span>
            {ring}
          </div>
        ) : (
          <div className="flex h-full items-center justify-between pl-2.5 pr-2">
            <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${phase === 'done' ? 'bg-[#34C759]' : 'bg-[#0A84FF]'}`}>
              <Gauge className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="flex items-center gap-1.5">
              <CameraLens />
              {ring}
            </span>
          </div>
        )}
      </div>
    )
  })()

  // Ring gauge geometry.
  const radius = 46
  const circumference = 2 * Math.PI * radius

  const summary = (
    <>
      <p className={`text-[11px] font-semibold uppercase tracking-wide ${muted}`}>Today</p>
      <h3 className="text-[26px] font-bold leading-tight tracking-tight">Performance</h3>
      <div className={`mt-3 flex items-center gap-4 rounded-2xl p-4 shadow-sm ${surface}`}>
        <svg viewBox="0 0 110 110" className="h-24 w-24 shrink-0 -rotate-90">
          <circle cx="55" cy="55" r={radius} fill="none" stroke="#E5E5EA" strokeWidth="10" />
          <circle
            cx="55" cy="55" r={radius} fill="none" stroke="url(#ring)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#5E5CE6" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <p className="text-[34px] font-bold leading-none tabular-nums">{score}</p>
          <p className={`mt-1 text-[13px] ${muted}`}>App score</p>
          <span className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
            {score >= MAX ? 'Peak' : 'Room to grow'}
          </span>
        </div>
      </div>
      <p className={`mt-4 px-1 text-[11px] font-semibold uppercase tracking-wide ${muted}`}>Health</p>
      <ul className={`mt-1.5 divide-y overflow-hidden rounded-2xl shadow-sm ${surface} ${divider}`}>
        {METRICS.map((m) => (
          <li key={m.id}>
            <button type="button" onClick={() => setDetail(m)} className="flex w-full items-center gap-3 px-3 py-2.5 text-left active:bg-black/5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-white ${m.tint}`}>
                <m.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-[14px]">{m.label}</span>
              <span className={`text-[14px] ${muted}`}>{m.value}</span>
              <ChevronRight className={`h-4 w-4 ${muted}`} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={optimize}
        disabled={phase === 'running' || score >= MAX}
        className="mt-4 w-full rounded-2xl bg-[#0A84FF] py-3 text-[15px] font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-60"
      >
        {phase === 'running' ? 'Optimizing…' : score >= MAX ? 'Fully optimized' : 'Optimize'}
      </button>
    </>
  )

  const detailView = detail && (
    <>
      <button type="button" onClick={() => setDetail(null)} className="-ml-1 flex items-center text-[15px] text-[#0A84FF]">
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        Summary
      </button>
      <h3 className="mt-1 text-[26px] font-bold leading-tight tracking-tight">{detail.label}</h3>
      <div className={`mt-3 rounded-2xl p-4 shadow-sm ${surface}`}>
        <p className={`text-[12px] ${muted}`}>Last 7 days</p>
        <p className="text-[28px] font-bold tabular-nums">{detail.value}</p>
        <Sparkline series={detail.series} stroke={detail.stroke} />
        <div className={`mt-1 flex justify-between text-[10px] ${muted}`}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
        </div>
      </div>
      <p className={`mt-3 px-1 text-[13px] leading-snug ${muted}`}>{detail.note}</p>
    </>
  )

  const bars = range === 'week' ? WEEK : MONTH
  const insights = (
    <>
      <h3 className="text-[26px] font-bold leading-tight tracking-tight">Insights</h3>
      <div className={`mt-3 grid grid-cols-2 rounded-lg p-0.5 text-[13px] font-medium bg-slate-200/70`} role="tablist">
        {(['week', 'month'] as const).map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={range === r}
            onClick={() => setRange(r)}
            className={`rounded-md py-1 capitalize transition ${range === r ? `${surface} shadow-sm` : muted}`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className={`mt-3 rounded-2xl p-4 shadow-sm ${surface}`}>
        <p className={`text-[12px] ${muted}`}>Sessions</p>
        <p className="text-[22px] font-bold">{range === 'week' ? '+18%' : '+41%'}</p>
        <div className="mt-3 flex h-24 items-end gap-1.5">
          {bars.map((v, i) => (
            <span
              key={`${range}-${i}`}
              className={`flex-1 rounded-t-md transition-all duration-500 ${i === bars.length - 1 ? 'bg-[#0A84FF]' : 'bg-blue-200'}`}
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {[
          { icon: Zap, tint: 'text-orange-500', text: 'Checkout screen loads 0.4s faster after lazy images.' },
          { icon: BarChart3, tint: 'text-blue-500', text: 'Most sessions start from push notifications.' },
        ].map(({ icon: Icon, tint, text }) => (
          <li key={text} className={`flex gap-2.5 rounded-2xl p-3 text-[13px] leading-snug shadow-sm ${surface}`}>
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tint}`} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </>
  )

  const apps = (
    <>
      <h3 className="text-[26px] font-bold leading-tight tracking-tight">Apps</h3>
      <ul className={`mt-3 divide-y overflow-hidden rounded-2xl shadow-sm ${surface} ${divider}`}>
        {APPS.map((app) => (
          <li key={app.name + app.platform} className="flex items-center gap-3 px-3 py-2.5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-white ${app.tint}`}>
              <app.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium">{app.name}</span>
              <span className={`block text-[12px] ${muted}`}>{app.platform} · v{app.version}</span>
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                app.status === 'Healthy' ? 'bg-green-100 text-green-700' : app.status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {app.status === 'Deploying' ? (
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
                  Deploying
                </span>
              ) : app.status}
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 px-1 text-[12px] ${muted}`}>One dashboard for iOS, Android, and web releases.</p>
    </>
  )

  const settingsView = (
    <>
      <h3 className="text-[26px] font-bold leading-tight tracking-tight">Settings</h3>
      <ul className={`mt-3 divide-y overflow-hidden rounded-2xl shadow-sm ${surface} ${divider}`}>
        {([
          { key: 'alerts', label: 'Crash alerts', icon: Bell, tint: 'bg-red-500' },
          { key: 'auto', label: 'Auto-optimize', icon: Sparkles, tint: 'bg-blue-500' },
          { key: 'reports', label: 'Weekly report', icon: BarChart3, tint: 'bg-indigo-500' },
          { key: 'beta', label: 'Beta releases', icon: LayoutGrid, tint: 'bg-slate-500' },
        ] as const).map(({ key, label, icon: Icon, tint }) => (
          <li key={key} className="flex items-center gap-3 px-3 py-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-white ${tint}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex-1 text-[14px]">{label}</span>
            <Toggle label={label} on={settings[key]} onChange={() => setSettings((s) => ({ ...s, [key]: !s[key] }))} />
          </li>
        ))}
      </ul>
      <p className={`mt-3 px-1 text-[12px] leading-snug ${muted}`}>
        Turn on Auto-optimize and watch the Dynamic Island.
      </p>
    </>
  )

  const content = detail ? detailView : { summary, insights, apps, settings: settingsView }[tab]

  return (
    <IPhone17 className={className} island={island}>
      <div className="relative flex h-full flex-col bg-[#F2F2F7] text-slate-900 [&_button:focus:not(:focus-visible)]:outline-none">
        <div key={detail ? detail.id : tab} className="flex-1 overflow-hidden px-4 pt-2 motion-safe:animate-[screenIn_0.25s_ease-out]">
          {content}
        </div>

        {/* Tab bar */}
        <nav className="flex items-start justify-around border-t border-slate-200/80 bg-white/90 px-2 pb-6 pt-2 text-[10px] backdrop-blur">
          {([
            { id: 'summary', label: 'Summary', icon: Gauge },
            { id: 'insights', label: 'Insights', icon: BarChart3 },
            { id: 'apps', label: 'Apps', icon: LayoutGrid },
            { id: 'settings', label: 'Settings', icon: Settings },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id)
                setDetail(null)
              }}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 ${tab === id ? 'text-[#0A84FF]' : muted}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        {/* Result sheet */}
        {phase === 'done' && tab === 'summary' && !detail && (
          <div className="absolute inset-0 z-20 flex items-end bg-black/30">
            <div className={`w-full rounded-t-[28px] px-5 pb-8 pt-2 shadow-2xl ${surface}`}>
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-[17px] font-semibold">Score up {score - before} points</p>
              <p className={`mt-1 text-[13px] ${muted}`}>
                Want this for your real app? We refresh design and performance for apps in production.
              </p>
              <a href="/contact" className="mt-4 block rounded-2xl bg-[#0A84FF] py-3 text-center text-[15px] font-semibold text-white">
                Talk to us
              </a>
              <button type="button" onClick={() => setPhase('idle')} className="mt-2 w-full py-2 text-[15px] font-medium text-[#0A84FF]">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </IPhone17>
  )
}
