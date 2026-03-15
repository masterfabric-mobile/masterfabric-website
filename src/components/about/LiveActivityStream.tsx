'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface LiveActivityEventTemplate {
  type: string
  icon: string
  variant: 'success' | 'agent' | 'info' | 'neutral'
  message: string
}

export interface LiveActivityData {
  label: string
  title: string
  subtitle?: string
  projects: string[]
  openSourceRepos: string[]
  eventTemplates: LiveActivityEventTemplate[]
  intervalMinMs?: number
  intervalMaxMs?: number
  maxVisibleEvents?: number
}

interface StreamEvent {
  id: number
  icon: string
  variant: LiveActivityEventTemplate['variant']
  message: string
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomVersion(): string {
  const major = Math.floor(Math.random() * 3) + 1
  const minor = Math.floor(Math.random() * 10)
  return `${major}.${minor}`
}

function resolveMessage(
  template: string,
  projects: string[],
  openSourceRepos: string[],
  templateType: string
): string {
  let out = template
  if (out.includes('{{project}}')) {
    out = out.replace(/\{\{project\}\}/g, pick(projects))
  }
  if (out.includes('{{repo}}')) {
    out = out.replace(/\{\{repo\}\}/g, pick(openSourceRepos))
  }
  if (out.includes('{{version}}')) {
    out = out.replace(/\{\{version\}\}/g, randomVersion())
  }
  return out
}

const variantStyles: Record<LiveActivityEventTemplate['variant'], string> = {
  success: 'bg-emerald-50 border-emerald-200/80 text-emerald-800',
  agent: 'bg-violet-50 border-violet-200/80 text-violet-800',
  info: 'bg-blue-50 border-blue-200/80 text-blue-800',
  neutral: 'bg-slate-50 border-slate-200/80 text-slate-700',
}

const variantDot: Record<LiveActivityEventTemplate['variant'], string> = {
  success: 'bg-emerald-500',
  agent: 'bg-violet-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
}

let nextId = 0
function useLiveActivity(data: LiveActivityData) {
  const [events, setEvents] = useState<StreamEvent[]>([])
  const maxVisible = data.maxVisibleEvents ?? 5
  const intervalMin = data.intervalMinMs ?? 2200
  const intervalMax = data.intervalMaxMs ?? 3800

  const pushEvent = useCallback(() => {
    const template = pick(data.eventTemplates)
    const message = resolveMessage(
      template.message,
      data.projects,
      data.openSourceRepos,
      template.type
    )
    const event: StreamEvent = {
      id: nextId++,
      icon: template.icon,
      variant: template.variant,
      message,
    }
    setEvents((prev) => [event, ...prev].slice(0, maxVisible))
  }, [data.eventTemplates, data.projects, data.openSourceRepos, maxVisible])

  const pushEventRef = useRef(pushEvent)
  pushEventRef.current = pushEvent

  useEffect(() => {
    pushEventRef.current()
    const id = setInterval(() => {
      pushEventRef.current()
    }, intervalMin + Math.random() * (intervalMax - intervalMin))
    return () => clearInterval(id)
  }, [intervalMin, intervalMax])

  return events
}

interface LiveActivityStreamProps {
  data: LiveActivityData
  showSectionHeader?: boolean
  compact?: boolean
  /** Fill parent height; stream area scrolls internally so new events don't shift layout */
  fillHeight?: boolean
}

export default function LiveActivityStream({ data, showSectionHeader = true, compact = false, fillHeight = false }: LiveActivityStreamProps) {
  const events = useLiveActivity(data)
  const { label, title, subtitle } = data

  return (
    <div className={`relative ${showSectionHeader ? 'mb-8' : fillHeight ? 'h-full min-h-0 flex flex-col' : 'h-full'}`}>
      {showSectionHeader && (
        <div className={`text-center ${compact ? 'mb-4' : 'mb-6'}`}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {label}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight max-w-3xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* File-area style stream container */}
      <div className={`rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden shadow-sm flex flex-col ${fillHeight ? 'flex-1 min-h-0' : ''} ${!fillHeight && compact ? 'min-h-[200px]' : ''} ${!fillHeight && !compact ? 'min-h-[280px]' : ''}`}>
        <div className={`flex items-center gap-2 bg-white border-b border-slate-200 ${compact ? 'px-3 py-1.5' : 'px-4 py-2.5'}`}>
          <div className="flex gap-1">
            <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
            <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
            <span className={`rounded-full bg-slate-300 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
          </div>
          <span className={`font-medium text-slate-500 ml-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
            Activity stream • Projects & automations
          </span>
          <span className="ml-auto text-[10px] text-slate-400 uppercase tracking-wider">
            Live
          </span>
        </div>

        <div className={`flex-1 min-h-0 overflow-hidden ${compact ? 'p-2' : 'p-3'} ${!fillHeight && compact ? 'min-h-[140px]' : ''} ${!fillHeight && !compact ? 'min-h-[200px]' : ''}`}>
          <AnimatePresence initial={false}>
            {events.length === 0 ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex items-center justify-center text-slate-400 ${compact ? 'h-[120px] text-xs' : 'h-[200px] text-sm'}`}
              >
                Waiting for activity…
              </motion.div>
            ) : (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={compact ? 'mb-1.5 last:mb-0' : 'mb-2 last:mb-0'}
                >
                  <div
                    className={`flex items-center gap-2 rounded-md border ${compact ? 'px-2 py-1.5 text-xs' : 'px-3 py-2.5 text-sm'} ${variantStyles[event.variant]}`}
                  >
                    <span className={`shrink-0 ${compact ? 'text-sm' : 'text-base'}`} aria-hidden>
                      {event.icon}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${variantDot[event.variant]}`} aria-hidden />
                    <p className="flex-1 min-w-0 font-medium leading-snug">
                      {event.message}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                      now
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className={`border-t border-slate-200 bg-white/80 flex items-center justify-between ${compact ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
          <span className="text-[10px] text-slate-400">
            Events loop infinitely • MasterFabric platform
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
