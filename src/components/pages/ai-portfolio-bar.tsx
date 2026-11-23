import Link from 'next/link'
import { repos } from '@/data/ai-portfolio/repos'

/** Slim homepage bar that leads to the AI-Portfolio page. */
export default function AiPortfolioBar() {
  return (
    <section className="w-full max-w-5xl mx-auto pt-4 md:pt-6" aria-label="AI-Portfolio">
      <Link
        href="/ai-portfolio/"
        className="group flex flex-col gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white px-5 py-4 transition hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center sm:gap-5 sm:px-6"
      >
        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden="true" />
          AI-Portfolio
        </span>
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
          <span className="font-semibold text-slate-900">{repos.length} public repositories</span>
          {' '}· a measured, on-prem and local-first data and AI architecture portfolio.
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Explore
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </span>
      </Link>
    </section>
  )
}
