'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Download, FileArchive, FileImage, FileCode2 } from 'lucide-react'

const ASSETS = [
  { label: 'Logo as SVG', hint: 'Vector', href: '/brand/masterfabric-logo.svg', icon: FileCode2 },
  { label: 'Logo as PNG', hint: 'Transparent', href: '/brand/masterfabric-logo.png', icon: FileImage },
  { label: 'Brand kit (ZIP)', hint: 'SVG + PNG', href: '/brand/masterfabric-brand.zip', icon: FileArchive },
] as const

type Props = {
  position: { x: number; y: number } | null
  onClose: () => void
}

// Opened by right-clicking the navbar logo. Rendered in a portal because the
// navbar's backdrop blur would otherwise trap a fixed-position menu.
export default function BrandAssetsMenu({ position, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!position) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onClose, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onClose)
    }
  }, [position, onClose])

  if (!position) return null

  const left = Math.min(position.x, window.innerWidth - 248)
  const top = Math.min(position.y, window.innerHeight - 220)

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label="Download MasterFabric logo"
      className="fixed z-[10060] w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl ring-1 ring-slate-900/5"
      style={{ left: Math.max(8, left), top: Math.max(8, top) }}
    >
      <p className="flex items-center gap-2 px-3 pb-1.5 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Brand assets
      </p>
      {ASSETS.map(({ label, hint, href, icon: Icon }) => (
        <a
          key={href}
          href={href}
          download
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100"
        >
          <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span className="flex-1 font-medium">{label}</span>
          <span className="text-xs text-slate-400">{hint}</span>
        </a>
      ))}
    </div>,
    document.body
  )
}
