'use client'

/**
 * Splash Screen Component
 * Shows during app initialization with logo and version only
 */
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '../../styles/splash-screen.module.css'

const SplashScreen: React.FC<{ onReady?: () => void }> = ({ onReady }) => {
  const splashScreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isActive = true

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const init = async () => {
      console.log('Starting app initialization...')
      await wait(2000)

      if (!isActive || !splashScreenRef.current) return

      console.log('Hiding splash screen...')
      splashScreenRef.current.classList.add(styles.fadeOut)

      const done = () => {
        if (!isActive) return
        try {
          document.dispatchEvent(new CustomEvent('app-ready'))
          onReady?.()
          console.log('Splash screen animation completed, app is ready')
        } catch (e) {
          console.error('Error finishing splash:', e)
        }
      }

      setTimeout(done, 500)
    }

    init()
    return () => {
      isActive = false
    }
  }, [onReady])

  return (
    <div id="splash-screen" ref={splashScreenRef} className={styles.splashScreen}>
      <div className={styles.splashContainer}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Image
            src="/assets/masterfabric-logo.svg"
            alt="MasterFabric Logo"
            width={120}
            height={95}
            className={styles.splashLogo}
            priority
          />
        </div>

        {/* Version */}
        <div className={styles.versionSection}>
          <div className={styles.versionInfo}>v1.0</div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
