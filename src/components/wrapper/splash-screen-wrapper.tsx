'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import SplashScreen from '@/components/pages/splash-screen'

export default function SplashScreenWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true)
  const revealedRef = useRef(false)

  const revealContent = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    setShowSplash(false)
  }, [])

  useEffect(() => {
    const appReadyHandler = () => {
      console.log('App ready event received, hiding splash screen')
      revealContent()
    }

    document.addEventListener('app-ready', appReadyHandler)

    const timer = setTimeout(() => {
      console.log('Fallback timer triggered, hiding splash screen')
      revealContent()
    }, 3500)

    return () => {
      document.removeEventListener('app-ready', appReadyHandler)
      clearTimeout(timer)
    }
  }, [revealContent])

  return (
    <>
      {/* İçerik her zaman DOM'da ve görünür; route/navigasyon bozulmaz */}
      {children}
      {/* Splash sadece üstte overlay; kalkınca sayfa zaten doğru route'ta */}
      {showSplash && <SplashScreen onReady={revealContent} />}
    </>
  )
}
