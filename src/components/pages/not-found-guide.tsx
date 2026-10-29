'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'


type Destination = {
  href: string
  title: string
  hint: string
  keys: string[]
}

const DESTINATIONS: Destination[] = [
  { href: '/', title: 'Home', hint: 'The studio', keys: ['home', 'index', 'main', 'start'] },
  { href: '/services/', title: 'Services', hint: 'What we build', keys: ['service', 'services', 'offer', 'work'] },
  {
    href: '/yapay-zeka-donusumu/',
    title: 'AI transformation',
    hint: 'Custom AI systems',
    keys: ['ai', 'yapay', 'zeka', 'donusum', 'donusumu', 'transformation', 'claude', 'agent', 'agentic'],
  },
  { href: '/about/', title: 'About', hint: 'The company', keys: ['about', 'aboutus', 'team', 'company', 'studio'] },
  { href: '/contact/', title: 'Contact', hint: 'Request a meeting', keys: ['contact', 'contactus', 'meeting', 'hello', 'mail'] },
  { href: '/jobs/', title: 'Jobs', hint: 'Open roles', keys: ['job', 'jobs', 'career', 'careers', 'hiring', 'join'] },
  { href: '/blog/', title: 'Blog', hint: 'Notes are offline', keys: ['blog', 'post', 'posts', 'article', 'news'] },
  { href: '/privacy-policy/', title: 'Privacy', hint: 'How we handle data', keys: ['privacy', 'gdpr', 'cookie', 'cookies'] },
  { href: '/terms-of-use/', title: 'Terms', hint: 'Site terms', keys: ['terms', 'term', 'legal', 'tos'] },
  {
    href: '/#claude-partner-title',
    title: 'Claude Partner Network',
    hint: 'How we work with Claude',
    keys: ['partner', 'partners', 'network', 'claude-partner'],
  },
]

function tokens(pathname: string) {
  return pathname
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((part) => part.length > 1)
}

function keyMatches(token: string, key: string) {
  if (key === token) return true
  if (token.length < 4 || key.length < 4) return false
  return key.startsWith(token) || token.startsWith(key)
}

function scoreDestination(pathTokens: string[], destination: Destination) {
  return pathTokens.reduce((score, token) => {
    const hit = destination.keys.some((key) => keyMatches(token, key))
    return score + (hit ? 1 : 0)
  }, 0)
}

function pickDestination(pathname: string) {
  const pathTokens = tokens(pathname)
  let best = DESTINATIONS[0]
  let bestScore = 0
  for (const destination of DESTINATIONS) {
    const score = scoreDestination(pathTokens, destination)
    if (score > bestScore) {
      best = destination
      bestScore = score
    }
  }
  return { destination: best, confident: bestScore > 0 }
}

export default function NotFoundGuide() {
  const [pathname, setPathname] = useState('')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    setPathname(window.location.pathname)
    document.title = 'Page not found | MasterFabric Inc.'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, follow'
    document.head.appendChild(robots)
    return () => {
      robots.remove()
    }
  }, [])

  const match = useMemo(() => pickDestination(pathname || '/'), [pathname])

  useEffect(() => {
    if (!match.confident || cancelled || !pathname) return
    setSecondsLeft(6)
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current === null) return current
        if (current <= 1) {
          window.clearInterval(timer)
          window.location.assign(match.destination.href)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [match.confident, match.destination.href, cancelled, pathname])

  const others = DESTINATIONS.filter((item) => item.href !== match.destination.href).slice(0, 6)

  return (
    <section data-mf-route="missing" className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <p className="text-sm font-medium tracking-wide text-[#C45C3E]">Wrong path</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        This page is not on the site
      </h1>
      <p className="mt-4 text-base leading-relaxed text-gray-600">
        The address does not match a page we publish. We can take you to the closest one.
      </p>
      {pathname ? (
        <p className="mt-4 inline-flex max-w-full truncate rounded-lg bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700">
          {pathname}
        </p>
      ) : null}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Closest page</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">{match.destination.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{match.destination.hint}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={match.destination.href}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Go to {match.destination.title}
          </Link>
          {match.confident && !cancelled && secondsLeft !== null ? (
            <button
              type="button"
              onClick={() => setCancelled(true)}
              className="text-sm font-medium text-slate-700 underline decoration-gray-300 underline-offset-4"
            >
              Stay here ({secondsLeft}s)
            </button>
          ) : match.destination.href !== '/' ? (
            <Link href="/" className="text-sm font-medium text-slate-700 underline decoration-gray-300 underline-offset-4">
              Back to home
            </Link>
          ) : null}
        </div>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {others.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300"
            >
              <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
              <span className="mt-0.5 block text-sm text-gray-600">{item.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
