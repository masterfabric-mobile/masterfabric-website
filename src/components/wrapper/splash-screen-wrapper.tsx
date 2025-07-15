'use client'

import React, { useState, useEffect } from 'react'
import SplashScreen from '@/components/pages/splash-screen'

export default function SplashScreenWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    let appReadyHandler: () => void;
    let timer: NodeJS.Timeout;
    
    // Set up the handler function
    appReadyHandler = () => {
      console.log('App ready event received, hiding splash screen')
      setShowSplash(false)
      // Add a small delay before showing content to ensure smooth transition
      setTimeout(() => setContentVisible(true), 100)
    }

    // Listen for app-ready event from splash screen
    document.addEventListener('app-ready', appReadyHandler)

    // Fallback timer (in case the event is not fired)
    timer = setTimeout(() => {
      console.log('Fallback timer triggered, hiding splash screen')
      setShowSplash(false)
      setTimeout(() => setContentVisible(true), 100)
    }, 3000)

    return () => {
      // Clean up event listeners and timers
      document.removeEventListener('app-ready', appReadyHandler)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {showSplash && <SplashScreen />}
      <div style={{ 
        opacity: contentVisible ? 1 : 0, 
        visibility: contentVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease-out' 
      }}>
        {children}
      </div>
    </>
  )
}
