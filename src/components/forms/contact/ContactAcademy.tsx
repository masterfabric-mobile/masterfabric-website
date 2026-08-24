'use client'

import React, { useId } from 'react'
import { Bot, GitBranch, Users } from 'lucide-react'

const PROGRAMS = [
  {
    label: 'Agentic AI Developer',
    icon: Bot,
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  {
    label: 'AI SDLC',
    icon: GitBranch,
    className: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  {
    label: 'Private company programs',
    icon: Users,
    className: 'border-slate-200 bg-slate-50 text-slate-700',
  },
] as const

export default function ContactAcademy() {
  const arcId = useId().replace(/:/g, '')

  return (
    <div className="group relative rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1">
      <div aria-hidden="true" className="academy-rgb-ring pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 rounded-2xl border border-gray-200 bg-white p-8 text-center transition-colors duration-300 group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-blue-200/40">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-700">
        MasterFabric Academy
      </h3>
      <p className="text-gray-600 mb-5 leading-relaxed">
        Company training for{' '}
        <strong className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-800">
          Agentic AI Developers
        </strong>
        {' '}and the{' '}
        <u className="underline decoration-blue-400 decoration-2 underline-offset-2 transition-colors duration-300 group-hover:decoration-blue-600">
          AI SDLC
        </u>
        {' '}— how teams{' '}
        <strong className="font-semibold text-gray-900">design, secure, and ship</strong>
        {' '}software when agents write, test, and deploy the code.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {PROGRAMS.map(({ label, icon: Icon, className }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-transform duration-300 group-hover:-translate-y-0.5 ${className}`}
          >
            <Icon size={13} strokeWidth={2.25} aria-hidden="true" />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 transition-transform duration-300 group-hover:-translate-y-0.5">
          <img src="/assets/mcp-logo.svg" alt="" width={13} height={13} className="h-[13px] w-[13px]" />
          MCP
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Curriculum covers{' '}
        <strong className="font-medium text-gray-700">agent architecture</strong>,{' '}
        <strong className="font-medium text-gray-700">tool use</strong>,{' '}
        <strong className="font-medium text-gray-700">multi-agent orchestration</strong>,
        guardrails, and{' '}
        <u className="underline decoration-gray-300 underline-offset-2">DevOps + SecOps + LLMOps</u>.
        Enterprises can request a private cohort or an adoption roadmap.
      </p>
      <a
        href="https://github.com/masterfabric/one-hundered-days"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-3 text-left transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/60"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gray-900 ring-1 ring-gray-200">
          <img
            src="/assets/mcp-logo.svg"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px]"
          />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-gray-900">
            Open-source MCP learning
          </span>
          <span className="block text-xs leading-snug text-gray-500">
            100-day roadmaps with the official Academy MCP — day-by-day lessons and project planning.
          </span>
        </span>
      </a>
      <a
        href="https://academy.masterfabric.co"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mx-auto mt-1 flex h-[9.25rem] w-[9.25rem] items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-label="Visit MasterFabric Academy"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 148 148"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-blue-600 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
        >
          <defs>
            <path
              id={`${arcId}-visit-arc`}
              d="M 18 86 A 56 56 0 0 0 130 86"
              fill="none"
            />
          </defs>
          <text
            fill="currentColor"
            fontSize="11"
            fontWeight="700"
            letterSpacing="1.6"
            className="translate-y-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          >
            <textPath href={`#${arcId}-visit-arc`} startOffset="50%" textAnchor="middle">
              Visit Academy
            </textPath>
          </text>
        </svg>
        <img
          src="/assets/academy-badge.png"
          alt=""
          width={96}
          height={96}
          className="relative z-10 h-24 w-24 rounded-full object-cover shadow-md ring-1 ring-black/10 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg"
        />
        <span className="sr-only">Visit Academy</span>
      </a>
      </div>
    </div>
  )
}
