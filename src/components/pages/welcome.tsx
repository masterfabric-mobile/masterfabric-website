'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Icon } from '@iconify/react';
import styles from '../../styles/welcome.module.css'

interface CodeStep {
  lines: { [key: string]: string }
  console: string
  type: 'info' | 'error' | 'success'
  isSuccess?: boolean
}

interface CodeScenario {
  title: string
  successTitle: string
  successDescription: string
  steps: CodeStep[]
}

interface WelcomeProps {
  onTimelineDialogRequest?: () => void;
}

export default function Welcome({ onTimelineDialogRequest }: WelcomeProps) {
  const [currentScenario, setCurrentScenario] = useState<string>('firebase')
  const [animationStep, setAnimationStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [consoleMessage, setConsoleMessage] = useState('')
  const [consoleType, setConsoleType] = useState<'info' | 'error' | 'success'>('info')
  const [codeLines, setCodeLines] = useState<{ [key: string]: string }>(
    Object.fromEntries(Array.from({ length: 15 }, (_, i) => [(i + 5).toString(), '']))
  );
  const [editorTitle, setEditorTitle] = useState('auth_service.dart')
  const [statusDot, setStatusDot] = useState('')
  const [statusText, setStatusText] = useState('Ready')
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isAnimatingRef = useRef(false)
  
  // Effect to trigger timeline dialog when welcome animation completes
  useEffect(() => {
    // Simulating the end of an animation - for testing purposes
    // In a real scenario, you would call this after your animation finishes
    const timer = setTimeout(() => {
      if (onTimelineDialogRequest) {
        console.log('Welcome animation complete - requesting timeline dialog');
        onTimelineDialogRequest();
      }
    }, 5000); // After 5 seconds, simulate the animation completion
    
    return () => clearTimeout(timer);
  }, [onTimelineDialogRequest])

  // Remove any undefined values from the lines objects in scenarios
  const scenarios: { [key: string]: CodeScenario } = useMemo(() => ({
    firebase: {
      title: 'auth_service.dart',
      successTitle: 'Authentication Service Ready!',
      successDescription: 'Firebase integration completed successfully',
      steps: [
        {
          lines: {
            '5': '<span class="indent">  </span><span class="keyword">final</span> <span class="class">FirebaseAuth</span> <span class="variable">_auth</span> = <span class="class">FirebaseAuth</span>.<span class="variable">instance</span>;',
            '6': '<span class="indent">  </span><span class="keyword">final</span> <span class="class">FirebaseFirestore</span> <span class="variable">_firestore</span> = <span class="class">FirebaseFirestore</span>.<span class="variable">instance</span>;'
          },
          console: '🔧 Initializing Firebase services...',
          type: 'info'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '7': '<span class="indent">  </span>',
              '8': '<span class="indent">  </span><span class="comment">// User authentication method</span>',
              '9': '<span class="indent">  </span><span class="keyword">Future</span>&lt;<span class="class">User</span>?&gt; <span class="function">signInWithEmail</span>(<span class="class">String</span> <span class="variable">email</span>, <span class="class">String</span> <span class="variable">password</span>) <span class="keyword">async</span> {',
              '10': '<span class="indent">    </span><span class="keyword">try</span> {',
              '11': '<span class="indent">      </span><span class="keyword">final</span> <span class="variable">credential</span> = <span class="keyword">await</span> <span class="variable">_auth</span>.<span class="function">signInWithEmailAndPassword</span>(',
              '12': '<span class="indent">        </span><span class="variable">email</span>: <span class="variable">email</span>, <span class="variable">password</span>: <span class="error">passwd</span>',
              '13': '<span class="indent">      </span>);'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '❌ Error: undefined name \'passwd\' (line 12)',
          type: 'error'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '12': '<span class="indent">        </span><span class="variable">email</span>: <span class="variable">email</span>, <span class="variable">password</span>: <span class="variable">password</span>'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '✅ Error fixed. Continuing compilation...',
          type: 'success'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '14': '<span class="indent">      </span><span class="keyword">return</span> <span class="variable">credential</span>.<span class="variable">user</span>;',
              '15': '<span class="indent">    </span>} <span class="keyword">catch</span> (<span class="variable">e</span>) {',
              '16': '<span class="indent">      </span><span class="function">print</span>(<span class="string">\'Authentication failed: $e\'</span>);',
              '17': '<span class="indent">      </span><span class="keyword">return</span> <span class="keyword">null</span>;',
              '18': '<span class="indent">    </span>}',
              '19': '<span class="indent">  </span>}'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '🚀 Build successful! Firebase authentication ready for production.',
          type: 'success',
          isSuccess: true
        }
      ]
    },
    devops: {
      title: 'deploy.yml',
      successTitle: 'Deployment Pipeline Ready!',
      successDescription: 'CI/CD workflow configured successfully',
      steps: [
        {
          lines: Object.fromEntries(
            Object.entries({
              '5': '<span class="keyword">name</span>: <span class="string">Deploy to Production</span>',
              '6': '<span class="keyword">on</span>:',
              '7': '<span class="indent">  </span><span class="keyword">push</span>:',
              '8': '<span class="indent">    </span><span class="keyword">branches</span>: [<span class="string">main</span>]'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '🔄 Setting up CI/CD pipeline...',
          type: 'info'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '9': '<span class="keyword">jobs</span>:',
              '10': '<span class="indent">  </span><span class="keyword">deploy</span>:',
              '11': '<span class="indent">    </span><span class="keyword">runs-on</span>: <span class="string">ubuntu-latest</span>',
              '12': '<span class="indent">    </span><span class="keyword">steps</span>:',
              '13': '<span class="indent">      </span>- <span class="keyword">name</span>: <span class="string">Checkout code</span>',
              '14': '<span class="indent">        </span><span class="keyword">uses</span>: <span class="string">actions/checkout@v3'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '📦 Configuring deployment steps...',
          type: 'info'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '15': '<span class="indent">      </span>- <span class="keyword">name</span>: <span class="string">Build and Deploy</span>',
              '16': '<span class="indent">        </span><span class="keyword">run</span>: |',
              '17': '<span class="indent">          </span><span class="function">flutter</span> <span class="variable">build</span> <span class="variable">apk</span> <span class="variable">--release</span>',
              '18': '<span class="indent">          </span><span class="function">firebase</span> <span class="variable">deploy</span> <span class="variable">--only</span> <span class="variable">hosting</span>',
              '19': '<span class="indent">          </span><span class="function">echo</span> <span class="string">"Deployment completed!"</span>'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '🚀 Pipeline configured! Ready for automated deployment.',
          type: 'success',
          isSuccess: true
        }
      ]
    },
    splash: {
      title: 'splash_viewmodel.dart',
      successTitle: 'Splash Screen Logic Ready!',
      successDescription: 'User session management implemented',
      steps: [
        {
          lines: Object.fromEntries(
            Object.entries({
              '5': '<span class="keyword">class</span> <span class="class">SplashViewModel</span> <span class="keyword">extends</span> <span class="class">ChangeNotifier</span> {',
              '6': '<span class="indent">  </span><span class="keyword">final</span> <span class="class">AuthService</span> <span class="variable">_authService</span>;',
              '7': '<span class="indent">  </span><span class="keyword">bool</span> <span class="variable">_isLoading</span> = <span class="keyword">true</span>;'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '🎯 Initializing splash screen viewmodel...',
          type: 'info'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '8': '<span class="indent">  </span>',
              '9': '<span class="indent">  </span><span class="keyword">Future</span>&lt;<span class="keyword">void</span>&gt; <span class="function">checkUserSession</span>() <span class="keyword">async</span> {',
              '10': '<span class="indent">    </span><span class="keyword">await</span> <span class="class">Future</span>.<span class="function">delayed</span>(<span class="class">Duration</span>(<span class="variable">seconds</span>: <span class="number">2</span>));',
              '11': '<span class="indent">    </span>',
              '12': '<span class="indent">    </span><span class="keyword">final</span> <span class="variable">user</span> = <span class="variable">_authService</span>.<span class="function">getCurrentUser</span>();'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '⏳ Checking user session status...',
          type: 'info'
        },
        {
          lines: Object.fromEntries(
            Object.entries({
              '13': '<span class="indent">    </span><span class="keyword">if</span> (<span class="variable">user</span> != <span class="keyword">null</span>) {',
              '14': '<span class="indent">      </span><span class="comment">// User is logged in, navigate to main app</span>',
              '15': '<span class="indent">      </span><span class="function">navigateToHome</span>();',
              '16': '<span class="indent">    </span>} <span class="keyword">else</span> {',
              '17': '<span class="indent">      </span><span class="comment">// User not logged in, show login screen</span>',
              '18': '<span class="indent">      </span><span class="function">navigateToLogin</span>();',
              '19': '<span class="indent">    </span>}'
            }).filter(([_, v]) => v !== undefined)
          ),
          console: '✅ Session check completed! Navigation logic implemented.',
          type: 'success',
          isSuccess: true
        }
      ]
    }
  }), []);

  const typeText = async (element: HTMLElement | null, text: string, speed: number = 30): Promise<void> => {
    return new Promise(resolve => {
      if (!element) {
        resolve()
        return
      }
      
      element.innerHTML = ''
      let i = 0
      
      const timer = setInterval(() => {
        if (!isAnimatingRef.current && element.id.startsWith('line-')) {
          clearInterval(timer)
          resolve()
          return
        }
        
        if (i <= text.length) {
          const currentText = text.slice(0, i)
          element.innerHTML = currentText
          i++
        } else {
          element.innerHTML = text
          clearInterval(timer)
          resolve()
        }
      }, speed)
    })
  }

  const updateConsole = useCallback(async (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    const consoleEl = document.getElementById('console-output')
    if (!consoleEl) return
    
    const messageClass = type === 'error' ? 'error-message' : 
                        type === 'success' ? 'success-message' : 'info-message'
    
    await typeText(consoleEl, `<span class="${messageClass}">${message}</span>`, 40)
  }, []);

  const updateCodeLine = useCallback(async (lineId: string, content: string) => {
    const line = document.getElementById(lineId)
    if (line) {
      await typeText(line, content, 25)
    }
  }, []);

  const animateStep = useCallback(
    async (stepData: CodeStep) => {
      // Update code lines
      for (let i = 5; i <= 19; i++) {
        await updateCodeLine(`line-${i}`, '')
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      for (const [lineId, content] of Object.entries(stepData.lines)) {
        await updateCodeLine(`line-${lineId}`, content)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      // Update console
      await new Promise(resolve => setTimeout(resolve, 300))
      await updateConsole(stepData.console, stepData.type)
      
      // Show success overlay if completed
      if (stepData.isSuccess) {
        setTimeout(() => {
          setShowSuccess(true)
        }, 1000)
      }
    },
    [updateCodeLine, updateConsole]
  );

  const animateScenario = useCallback(async (scenarioName: string) => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
    
    const scenario = scenarios[scenarioName]
    setCurrentScenario(scenarioName)
    
    // Update UI
    setEditorTitle(scenario.title)
    setShowSuccess(false)
    setConsoleMessage('')
    setStatusDot('coding')
    setStatusText('Coding')
    
    // Reset editor lines
    const resetLines: { [key: string]: string } = {}
    for (let i = 5; i <= 19; i++) {
      resetLines[i.toString()] = ''
    }
    setCodeLines(resetLines)
    
    // Wait for initial load
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Animate scenario steps
    for (let i = 0; i < scenario.steps.length && isAnimatingRef.current; i++) {
      await animateStep(scenario.steps[i])
      if (isAnimatingRef.current) {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    }
    
    if (isAnimatingRef.current) {
      setStatusDot('success')
      setStatusText('Complete')
      isAnimatingRef.current = false
      
      // Auto-restart after completion
      animationTimeoutRef.current = setTimeout(() => {
        if (!isAnimatingRef.current) {
          animateScenario(scenarioName)
        }
      }, 8000)
    }
  }, [scenarios, animateStep]);

  const handleScenarioChange = (scenarioName: string) => {
    if (!isAnimatingRef.current) {
      animateScenario(scenarioName)
    }
  }

  const handleRefresh = () => {
    if (!isAnimatingRef.current) {
      animateScenario(currentScenario)
    }
  }

  const handleDeploy = async () => {
    // Stop current animation
    isAnimatingRef.current = true
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
    
    const consoleOutput = document.getElementById('console-output')
    
    if (!consoleOutput) return
    
    // Hide success overlay first
    setShowSuccess(false)
    
    const deploySteps = [
      '🚀 Starting deployment process...',
      '📦 Building application bundle...',
      '⬆️ Uploading to Firebase hosting...',
      '🔧 Configuring deployment settings...',
      '✅ Deployment completed successfully!',
      '🌐 App is live at: https://your-app.web.app'
    ]
    
    setStatusDot('coding')
    setStatusText('Deploying')
    
    // Clear console and animate each step
    consoleOutput.innerHTML = ''
    
    for (let i = 0; i < deploySteps.length; i++) {
      if (!isAnimatingRef.current) break
      
      const step = deploySteps[i]
      await typeText(consoleOutput, `<span class="success-message">${step}</span>`, 40)
      
      if (i < deploySteps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1200))
      }
    }
    
    setStatusDot('success')
    setStatusText('Deployed')
    
    setTimeout(() => {
      setStatusDot('')
      setStatusText('Ready')
      isAnimatingRef.current = false
      // Restart the current scenario after deploy
      setTimeout(() => {
        if (!isAnimatingRef.current) {
          animateScenario(currentScenario)
        }
      }, 1000)
    }, 2000)
  }

  useEffect(() => {
    // Start initial animation
    setTimeout(() => {
      animateScenario('firebase')
    }, 100)
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [animateScenario])

  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-10 pb-8 md:pt-8 md:pb-12">
      {/* Content Section */}
      <div className="md:order-1">
        <h2 className="text-xl lg:text-3xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter">
          Custom Mobile App Development
        </h2>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          Take your business to the next level in the mobile world! Reach your customers anytime, 
          anywhere with custom, user-friendly, and innovative mobile apps tailored to your needs.
        </p>
        <div className="mt-4">
          <div className="flex gap-8 md:gap-20 items-center mt-10 flex-wrap justify-start">
            <Icon icon="simple-icons:ios" className="size-8 md:size-12 hover:text-gray-800 transition-colors cursor-pointer" />
            <Icon icon="simple-icons:android" className="size-8 md:size-12 hover:text-green-500 transition-colors cursor-pointer" />
            <Icon icon="simple-icons:harmonyos" className="size-8 md:size-12 hover:text-red-600 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Animated Code Editor */}
      <div className="py-6 md:order-2 hidden md:block w-full max-w-2xl">
        <div className={styles.codeEditorContainer}>
          {/* Editor Header */}
          <div className={styles.editorHeader}>
            <div className={styles.editorControls}>
              <div className={`${styles.controlDot} ${styles.red}`}></div>
              <div className={`${styles.controlDot} ${styles.yellow}`}></div>
              <div className={`${styles.controlDot} ${styles.green}`}></div>
            </div>
            <div className={styles.editorTitle}>{editorTitle}</div>
            <div className={styles.editorActions}>
              <div className={styles.actionButtons}>
                <button 
                  className={`${styles.actionBtn} ${currentScenario === 'firebase' ? styles.active : ''}`}
                  onClick={() => handleScenarioChange('firebase')}
                  title="Firebase Authentication"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L22 9L20 20H4L2 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M12 2V20" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button 
                  className={`${styles.actionBtn} ${currentScenario === 'devops' ? styles.active : ''}`}
                  onClick={() => handleScenarioChange('devops')}
                  title="DevOps Deployment"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className={`${styles.actionBtn} ${currentScenario === 'splash' ? styles.active : ''}`}
                  onClick={() => handleScenarioChange('splash')}
                  title="Splash Screen Logic"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <button 
                className={styles.refreshBtn}
                onClick={handleRefresh}
                title="Restart Animation"
              >
                <svg className={styles.refreshIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Editor Content */}
          <div className={styles.editorContent}>
            <div className={styles.lineNumbers}>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
            
            <div className={styles.codeContent}>
              <div className={styles.codeLine}>
                <span className="keyword">import</span> <span className="string">&quot;package:firebase_auth/firebase_auth.dart&quot;</span>;
              </div>
              <div className={styles.codeLine}>
                <span className="keyword">import</span> <span className="string">&quot;package:cloud_firestore/cloud_firestore.dart&quot;</span>;
              </div>
              <div className={styles.codeLine}></div>
              <div className={styles.codeLine}>
                <span className="keyword">class</span> <span className="class">AuthService</span> {'{'}
              </div>
              {Array.from({ length: 15 }, (_, idx) => {
                const lineNum = idx + 5;
                return (
                  <div key={lineNum} className={styles.codeLine} id={`line-${lineNum}`}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: codeLines[lineNum.toString()] || '<span class="indent">  </span>',
                      }}
                    />
                  </div>
                );
              })}
              <div className={styles.codeLine}>{'}'}</div>
            </div>
          </div>
          
          {/* Console */}
          <div className={styles.editorConsole}>
            <div className={styles.consoleHeader}>Console Output</div>
            <div className={styles.consoleContent}>
              <div className={`${styles.consoleMessage} ${consoleType === "error" ? styles.errorMessage : consoleType === "success" ? styles.successMessage : styles.infoMessage}`} id="console-output">
                {consoleMessage}
              </div>
            </div>
          </div>
          
          {/* Status Footer */}
          <div className={styles.editorFooter}>
            <div className={styles.statusIndicator}>
              <div className={`${styles.statusDot} ${statusDot ? styles[statusDot] : ''}`}></div>
              <span className={styles.statusText}>{statusText}</span>
            </div>
          </div>
          
          {/* Success Overlay */}
          {showSuccess && (
            <div className={`${styles.successOverlay} ${styles.show}`}>
              <div className={styles.successContent}>
                <div className={styles.successIconContainer}>
                  <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#27ca3f"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{scenarios[currentScenario]?.successTitle}</h3>
                <p>{scenarios[currentScenario]?.successDescription}</p>
                <div className={styles.deployBtnContainer}>
                  <button className={styles.deployBtn} onClick={handleDeploy}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L22 9L20 20H4L2 9L12 2Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 2V20" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  &apos;Deploy Your Code&apos;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
