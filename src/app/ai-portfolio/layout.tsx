import type { ReactNode } from 'react'
import '@/styles/ai-portfolio.css'
import { MotionProvider } from '@/components/ai-portfolio/MotionProvider'

export default function AiPortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ap-root">
      {/* Without JS, scroll-reveal elements would stay at opacity 0. */}
      <noscript>
        <style>{`.ap-root [style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <MotionProvider>{children}</MotionProvider>
    </div>
  )
}
