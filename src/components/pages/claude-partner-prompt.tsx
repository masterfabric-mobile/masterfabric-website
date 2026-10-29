'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/forms/contact/ContactForm'

const STORAGE_KEY = 'mf-claude-partner-meeting'
const APPEAR_DELAY_MS = 6000

function readPromptState() {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function markPromptSeen(value: 'shown' | 'dismissed') {
  try {
    sessionStorage.setItem(STORAGE_KEY, value)
  } catch {
    // sessionStorage can be unavailable in private browsing.
  }
}

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    )
  ).filter((element) => {
    if (element.tabIndex < 0) return false
    const style = window.getComputedStyle(element)
    return style.display !== 'none' && style.visibility !== 'hidden'
  })
}

export default function ClaudePartnerPrompt() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const timerRef = useRef<number | null>(null)

  const dismiss = useCallback(() => {
    markPromptSeen('dismissed')
    setOpen(false)
    setShowForm(false)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const seen = readPromptState()
    if (seen === 'dismissed') return
    if (seen === 'shown') {
      setOpen(true)
      return
    }
    if (timerRef.current !== null) return
    if (document.querySelector('[data-mf-route="missing"]')) return

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      if (readPromptState() === 'dismissed') return
      if (document.querySelector('[data-mf-route="missing"]')) return
      markPromptSeen('shown')
      previouslyFocused.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
      setOpen(true)
    }, APPEAR_DELAY_MS)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    panel?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismiss()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusable = getFocusable(panel)
      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (active === last || !panel.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      const returnFocus = previouslyFocused.current
      if (returnFocus && document.contains(returnFocus)) {
        returnFocus.focus()
      }
    }
  }, [open, dismiss])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[10050] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="claude-partner-prompt"
        role="dialog"
        aria-modal="true"
        aria-labelledby="claude-partner-prompt-title"
        aria-describedby="claude-partner-prompt-body"
        tabIndex={-1}
        className="relative z-10 flex max-h-[min(90vh,44rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 outline-none"
      >
        <div className="relative bg-gradient-to-br from-[#FBF1EC] via-white to-white px-6 pb-6 pt-6 sm:px-8 sm:pt-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#C45C3E]" aria-hidden="true" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#C45C3E]/20 bg-white px-3 py-1">
            <img
              src="/assets/claude-mark.svg"
              alt=""
              width={16}
              height={15}
              className="h-4 w-4"
            />
            <span className="text-xs font-medium tracking-wide text-[#C45C3E]">
              Claude Partner Network
            </span>
          </div>
          <h2
            id="claude-partner-prompt-title"
            className="mt-4 pr-8 text-2xl font-semibold tracking-tight text-slate-900"
          >
            We can help with AI transformation
          </h2>
          <p
            id="claude-partner-prompt-body"
            className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base"
          >
            MasterFabric is a Claude Partner Network partner in the AI transformation flow.
            We can help with that work. Request a meeting to get the information.
          </p>
        </div>

        <div className="overflow-y-auto overscroll-contain border-t border-gray-100 px-6 py-5 sm:px-8">
          {showForm ? (
            <ContactForm
              idPrefix="claude-partner-prompt-"
              defaultOpen
              embedded
            />
          ) : (
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={dismiss}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Maybe later
              </button>
              <Button
                type="button"
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg"
              >
                Request a meeting
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
