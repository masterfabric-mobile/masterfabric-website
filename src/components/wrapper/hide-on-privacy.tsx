'use client'

import { usePathname } from 'next/navigation'

/** Renders children everywhere except privacy pages (/privacy*, /privacy-policy). */
export default function HideOnPrivacy({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  if (/^\/privacy(\/|-|$)/.test(pathname)) return null
  return <>{children}</>
}
