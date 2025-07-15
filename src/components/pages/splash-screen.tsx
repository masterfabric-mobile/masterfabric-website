'use client'

/**
 * Splash Screen Component
 * Shows during app initialization with logo and version only
 */
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from '../../styles/splash-screen.module.css'

const SplashScreen: React.FC = () => {
  const splashScreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isActive = true;
    
    const init = async () => {
      console.log('Starting app initialization...')
      
      // Wait for minimum display time
      await wait(2000)
      
      // Only proceed if component is still mounted
      if (isActive) {
        hideSplashScreen()
      }
    }

    const hideSplashScreen = () => {
      console.log('Hiding splash screen...')
      
      if (splashScreenRef.current && isActive) {
        // Add fadeOut class for animation
        splashScreenRef.current.classList.add(styles.fadeOut)
        
        // Trigger custom event for app ready after transition
        setTimeout(() => {
          // Only dispatch event if component is still mounted
          if (isActive) {
            try {
              document.dispatchEvent(new CustomEvent('app-ready'))
              console.log('Splash screen animation completed, app is ready')
            } catch (error) {
              console.error('Error dispatching app-ready event:', error)
            }
          }
        }, 500)
      }
    }

    const wait = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    // Initialize splash screen
    init()
    
    // Cleanup function to prevent memory leaks and DOM errors
    return () => {
      isActive = false;
    }
  }, [])

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
