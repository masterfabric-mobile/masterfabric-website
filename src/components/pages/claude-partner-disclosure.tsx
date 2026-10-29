'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { Pointer } from 'lucide-react'

type Props = {
  title: string
  description: string
  children: React.ReactNode
}

export default function ClaudePartnerDisclosure({ title, description, children }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  // React 18 has no `inert` prop; keep collapsed content out of tab order and the a11y tree.
  useEffect(() => {
    panelRef.current?.toggleAttribute('inert', !open)
  }, [open])

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-colors hover:border-[#C45C3E]/30 hover:bg-[#FBF1EC]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C3E]"
      >
        <span>
          <span className="block text-sm font-semibold text-slate-900">{title}</span>
          <span className="mt-0.5 block text-sm text-gray-600">{description}</span>
        </span>

        <span className="flex shrink-0 items-center gap-3">
          {!open && (
            <span className="hidden items-center gap-1.5 text-xs font-medium text-[#C45C3E] sm:flex">
              <Pointer className="h-4 w-4 shrink-0 motion-safe:animate-tap-nudge" aria-hidden="true" />
              Tap to learn more
            </span>
          )}
          <span className="relative flex h-10 w-10 items-center justify-center">
            {!open && (
              <span
                className="absolute inset-0 rounded-full bg-[#D97757]/40 motion-safe:animate-ping"
                aria-hidden="true"
              />
            )}
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 ${
                open ? 'rotate-180 bg-[#FBF1EC] text-[#C45C3E]' : 'bg-[#C45C3E] text-white'
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </span>
        </span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
