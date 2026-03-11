'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Icon } from '@iconify/react'
import styles from '../../styles/welcome.module.css'

interface CliOutputLine {
  text: string
  type?: 'info' | 'success' | 'error' | 'default' | 'code' | 'prompt' | 'command'
  /** When set, switch IDE to this tab before showing the line */
  tabIndex?: number
}

interface EditorTab {
  id: string
  label: string
  editorLines: string[]
}

interface CodeScenario {
  title: string
  successTitle: string
  successDescription: string
  cliCommand: string
  /** Long prompt shown after CLI call */
  longPrompt: string
  tabs: EditorTab[]
  terminalLines: CliOutputLine[]
}

interface WelcomeProps {
  onTimelineDialogRequest?: () => void
}

const CODE_LINES_VISIBLE = 15

export default function Welcome({ onTimelineDialogRequest }: WelcomeProps) {
  const [currentScenario, setCurrentScenario] = useState<string>('auth')
  const [committedLines, setCommittedLines] = useState<CliOutputLine[]>([])
  const [promptCommand, setPromptCommand] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [stepOverlay, setStepOverlay] = useState<{ step: number; message: string; countdown: number } | null>(null)
  const [successCountdown, setSuccessCountdown] = useState<number | null>(null)
  const stepCountdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const successCountdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [showReviseFlow, setShowReviseFlow] = useState(false)
  const [showReviseSuggestions, setShowReviseSuggestions] = useState(false)
  const reviseFromStepRef = useRef(false)
  const [reviseCommand, setReviseCommand] = useState('')
  const reviseCmdRef = useRef('')
  const revisePromptRef = useRef('')
  const reviseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [editorVisibleCountByTab, setEditorVisibleCountByTab] = useState<number[]>([])
  const [promptTypingText, setPromptTypingText] = useState('')
  const promptTypingRef = useRef('')
  const terminalScrollRef = useRef<HTMLDivElement>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isAnimatingRef = useRef(false)
  const nextLineIndexRef = useRef(0)
  const scenarioNameRef = useRef(currentScenario)
  const promptCommandRef = useRef('')
  const activeTabRef = useRef(0)
  const visibleByTabRef = useRef<number[]>([])

  useEffect(() => {
    const t = setTimeout(() => { if (onTimelineDialogRequest) onTimelineDialogRequest() }, 5000)
    return () => clearTimeout(t)
  }, [onTimelineDialogRequest])

  const scenarios: { [key: string]: CodeScenario } = useMemo(
    () => ({
      auth: {
        title: 'Auth flow',
        successTitle: 'Deploy complete',
        successDescription: 'Auth generated, tested, refactored & deployed via CLI',
        cliCommand: 'masterfabric gen auth --mvvm',
        longPrompt: 'Generate production-ready MVVM auth using package:masterfabric_core. Add repository layer, unit tests, run analysis, fix any issues, then generate CI/CD deploy workflow.',
        tabs: [
          {
            id: 'auth',
            label: 'auth_viewmodel.dart',
            editorLines: [
              "import 'package:masterfabric_core/auth.dart';",
              "import 'package:masterfabric_core/mvvm.dart';",
              '',
              'class AuthViewModel extends ViewModel {',
              '  final AuthRepository _auth = AuthRepository();',
              '',
              '  Future<User?> signIn(String email, String password) async {',
              '    return _auth.signInWithEmailAndPassword(email, password);',
              '  }',
              '',
              '  Future<void> signOut() async {',
              '    await _auth.signOut();',
              '  }',
              '}',
            ],
          },
          {
            id: 'test',
            label: 'auth_viewmodel_test.dart',
            editorLines: [
              "import 'package:flutter_test/flutter_test.dart';",
              "import 'package:masterfabric_core/auth.dart';",
              '',
              'void main() {',
              "  group('AuthViewModel', () {",
              "    test('signIn returns user when credentials valid', () async {",
              '      final vm = AuthViewModel();',
              "      final user = await vm.signIn('a@b.com', 'pass');",
              '      expect(user, isNotNull);',
              '    });',
              '  });',
              '}',
            ],
          },
          {
            id: 'deploy',
            label: 'deploy.yml',
            editorLines: [
              'name: Deploy',
              'on:',
              '  push:',
              '    branches: [main]',
              'jobs:',
              '  deploy:',
              '    runs-on: ubuntu-latest',
              '    steps:',
              "      - uses: actions/checkout@v4",
              "      - run: flutter test",
              "      - run: flutter build apk",
            ],
          },
        ],
        terminalLines: [
          { text: '', type: 'default' },
          { text: 'Creating lib/auth/auth_viewmodel.dart', type: 'default', tabIndex: 0 },
          { text: '', type: 'default' },
          { text: "  import 'package:masterfabric_core/auth.dart';", type: 'code' },
          { text: "  import 'package:masterfabric_core/mvvm.dart';", type: 'code' },
          { text: '', type: 'default' },
          { text: '  class AuthViewModel extends ViewModel {', type: 'code' },
          { text: '    final AuthRepository _auth = AuthRepository();', type: 'code' },
          { text: '    Future<User?> signIn(...) async { ... }', type: 'code' },
          { text: '    Future<void> signOut() async { ... }', type: 'code' },
          { text: '  }', type: 'code' },
          { text: '', type: 'default' },
          { text: '✓ auth_viewmodel.dart written.', type: 'success' },
          { text: '', type: 'default' },
          { text: 'Creating test/auth_viewmodel_test.dart', type: 'default', tabIndex: 1 },
          { text: '', type: 'default' },
          { text: "  import 'package:flutter_test/flutter_test.dart';", type: 'code' },
          { text: "  group('AuthViewModel', () {", type: 'code' },
          { text: "    test('signIn returns user when credentials valid', () async { ... });", type: 'code' },
          { text: '  });', type: 'code' },
          { text: '', type: 'default' },
          { text: '✓ auth_viewmodel_test.dart written.', type: 'success' },
          { text: '', type: 'default' },
          { text: '$ masterfabric test', type: 'command' },
          { text: 'Running tests...', type: 'info' },
          { text: '  test/auth_viewmodel_test.dart ... 1 fix needed', type: 'default' },
          { text: '$ masterfabric refactor --fix', type: 'command' },
          { text: 'Applying fixes...', type: 'info' },
          { text: '✓ Lint fixed. All tests pass.', type: 'success' },
          { text: '', type: 'default' },
          { text: 'Creating .github/workflows/deploy.yml', type: 'default', tabIndex: 2 },
          { text: '  name: Deploy', type: 'code' },
          { text: '  on: push: branches: [main]', type: 'code' },
          { text: '  jobs: deploy: runs-on: ubuntu-latest', type: 'code' },
          { text: '', type: 'default' },
          { text: '$ masterfabric deploy', type: 'command' },
          { text: '✓ Pipeline ready. Deploy complete.', type: 'success' },
        ],
      },
      splash: {
        title: 'Splash flow',
        successTitle: 'Splash ready',
        successDescription: 'MVVM splash with masterfabric_core',
        cliCommand: 'masterfabric gen splash --mvvm',
        longPrompt: 'Generate MVVM splash screen with session check using package:masterfabric_core.',
        tabs: [
          {
            id: 'splash',
            label: 'splash_viewmodel.dart',
            editorLines: [
              "import 'package:masterfabric_core/mvvm.dart';",
              '',
              'class SplashViewModel extends ViewModel {',
              '  Future<void> checkSession() async {',
              '    // Navigate to home or login',
              '  }',
              '}',
            ],
          },
        ],
        terminalLines: [
          { text: '', type: 'default' },
          { text: 'Creating lib/splash/splash_viewmodel.dart', type: 'default', tabIndex: 0 },
          { text: "  import 'package:masterfabric_core/mvvm.dart';", type: 'code' },
          { text: '  class SplashViewModel extends ViewModel { ... }', type: 'code' },
          { text: '✓ splash_viewmodel.dart written.', type: 'success' },
        ],
      },
      deploy: {
        title: 'Deploy flow',
        successTitle: 'Pipeline ready',
        successDescription: 'CI/CD with masterfabric_core',
        cliCommand: 'masterfabric deploy --ci',
        longPrompt: 'Generate GitHub Actions workflow for Flutter build and deploy.',
        tabs: [
          {
            id: 'deploy',
            label: 'deploy.yml',
            editorLines: [
              'name: Deploy',
              'on:',
              '  push:',
              '    branches: [main]',
              'jobs:',
              '  deploy:',
              '    runs-on: ubuntu-latest',
              '    steps:',
              "      - uses: actions/checkout@v4",
              "      - run: flutter test",
              "      - run: flutter build apk",
            ],
          },
        ],
        terminalLines: [
          { text: '', type: 'default' },
          { text: 'Creating .github/workflows/deploy.yml', type: 'default', tabIndex: 0 },
          { text: '  name: Deploy', type: 'code' },
          { text: '  on: push: branches: [main]', type: 'code' },
          { text: '  jobs: deploy: ...', type: 'code' },
          { text: '✓ Pipeline written. Ready for deploy.', type: 'success' },
        ],
      },
    }),
    []
  )

  const revealNextEditorLineInCurrentTab = useCallback(() => {
    const scenario = scenarios[scenarioNameRef.current]
    if (!scenario) return
    const tabIdx = activeTabRef.current
    const tab = scenario.tabs[tabIdx]
    if (!tab) return
    const count = visibleByTabRef.current[tabIdx] ?? 0
    if (count >= tab.editorLines.length) return
    const next = [...visibleByTabRef.current]
    next[tabIdx] = count + 1
    visibleByTabRef.current = next
    setEditorVisibleCountByTab(next)
  }, [scenarios])

  const STEP_COUNTDOWN_SEC = 5
  const typeNextOutputLineRef = useRef<() => void>(() => {})

  const resumeAfterStep = useCallback(() => {
    if (stepCountdownIntervalRef.current) {
      clearInterval(stepCountdownIntervalRef.current)
      stepCountdownIntervalRef.current = null
    }
    setStepOverlay(null)
    animationTimeoutRef.current = setTimeout(() => typeNextOutputLineRef.current(), 300)
  }, [])

  const typeNextOutputLine = useCallback(() => {
    const scenario = scenarios[scenarioNameRef.current]
    const idx = nextLineIndexRef.current
    if (!scenario || idx >= scenario.terminalLines.length) {
      setShowSuccess(true)
      setSuccessCountdown(STEP_COUNTDOWN_SEC)
      isAnimatingRef.current = false
      const name = scenarioNameRef.current
      animationTimeoutRef.current = setTimeout(() => {
        if (!isAnimatingRef.current) animateScenario(name)
      }, 12000)
      return
    }
    const line = scenario.terminalLines[idx]
    nextLineIndexRef.current = idx + 1

    if (line.tabIndex !== undefined) {
      activeTabRef.current = line.tabIndex
      setActiveTabIndex(line.tabIndex)
    }
    setCommittedLines((prev) => [...prev, line])

    if (line.type === 'code') {
      revealNextEditorLineInCurrentTab()
    }

    setTimeout(() => terminalScrollRef.current?.scrollTo({ top: terminalScrollRef.current?.scrollHeight, behavior: 'smooth' }), 0)

    const isMilestoneCodeWritten = line.type === 'success' && line.text.includes('auth_viewmodel.dart written')
    const isMilestoneTestsPassed = line.type === 'success' && line.text.includes('Lint fixed. All tests pass')
    if (isMilestoneCodeWritten) {
      setStepOverlay({ step: 1, message: 'Code written', countdown: STEP_COUNTDOWN_SEC })
      stepCountdownIntervalRef.current = setInterval(() => {
        setStepOverlay((prev) => {
          if (!prev || prev.countdown <= 1) {
            if (stepCountdownIntervalRef.current) {
              clearInterval(stepCountdownIntervalRef.current)
              stepCountdownIntervalRef.current = null
            }
            setTimeout(() => resumeAfterStep(), 0)
            return null
          }
          return { ...prev, countdown: prev.countdown - 1 }
        })
      }, 1000)
      return
    }
    if (isMilestoneTestsPassed) {
      setStepOverlay({ step: 2, message: 'Tests passed', countdown: STEP_COUNTDOWN_SEC })
      stepCountdownIntervalRef.current = setInterval(() => {
        setStepOverlay((prev) => {
          if (!prev || prev.countdown <= 1) {
            if (stepCountdownIntervalRef.current) {
              clearInterval(stepCountdownIntervalRef.current)
              stepCountdownIntervalRef.current = null
            }
            setTimeout(() => resumeAfterStep(), 0)
            return null
          }
          return { ...prev, countdown: prev.countdown - 1 }
        })
      }, 1000)
      return
    }

    const delay = line.type === 'code' ? 80 : line.text ? 320 : 160
    animationTimeoutRef.current = setTimeout(typeNextOutputLine, delay)
  }, [scenarios, revealNextEditorLineInCurrentTab])

  useEffect(() => {
    typeNextOutputLineRef.current = typeNextOutputLine
  }, [typeNextOutputLine])

  const typeLongPromptChar = useCallback(() => {
    const scenario = scenarios[scenarioNameRef.current]
    if (!scenario) return
    const fullLine = `> "${scenario.longPrompt}"`
    const current = promptTypingRef.current
    if (current.length >= fullLine.length) {
      setCommittedLines((prev) => [...prev, { text: fullLine, type: 'prompt' }])
      setPromptTypingText('')
      promptTypingRef.current = ''
      nextLineIndexRef.current = 0
      setTimeout(() => terminalScrollRef.current?.scrollTo({ top: terminalScrollRef.current?.scrollHeight ?? 0, behavior: 'smooth' }), 0)
      animationTimeoutRef.current = setTimeout(typeNextOutputLine, 400)
      return
    }
    const next = fullLine.slice(0, current.length + 1)
    promptTypingRef.current = next
    setPromptTypingText(next)
    setTimeout(() => terminalScrollRef.current?.scrollTo({ top: terminalScrollRef.current?.scrollHeight ?? 0, behavior: 'smooth' }), 0)
    animationTimeoutRef.current = setTimeout(typeLongPromptChar, 25 + Math.random() * 15)
  }, [scenarios, typeNextOutputLine])

  const typePromptChar = useCallback(() => {
    const scenario = scenarios[scenarioNameRef.current]
    if (!scenario) return
    const cmd = scenario.cliCommand
    const current = promptCommandRef.current
    if (current.length >= cmd.length) {
      setShowCursor(false)
      animationTimeoutRef.current = setTimeout(() => {
        setCommittedLines((prev) => [...prev, { text: `$ ${cmd}`, type: 'default' }])
        promptCommandRef.current = ''
        setPromptCommand('')
        setCommittedLines((prev) => [...prev, { text: 'Masterfabric CLI v1.0 · masterfabric_core', type: 'info' }, { text: 'Sending prompt to agent...', type: 'success' }])
        setShowCursor(true)
        promptTypingRef.current = ''
        setPromptTypingText('')
        animationTimeoutRef.current = setTimeout(typeLongPromptChar, 400)
      }, 500)
      return
    }
    const next = cmd.slice(0, current.length + 1)
    promptCommandRef.current = next
    setPromptCommand(next)
    setTimeout(() => terminalScrollRef.current?.scrollTo({ top: terminalScrollRef.current?.scrollHeight ?? 0, behavior: 'smooth' }), 0)
    animationTimeoutRef.current = setTimeout(typePromptChar, 45 + Math.random() * 25)
  }, [scenarios, typeLongPromptChar])

  const REVIZE_SUGGESTIONS = [
    { label: 'UI improvement', prompt: 'UI improvement for auth screen and forms' },
    { label: 'Add new feature', prompt: 'Add password reset and email verification feature' },
    { label: 'Refactor & performance', prompt: 'Refactor and improve performance' },
    { label: 'Improve error handling', prompt: 'Improve error handling and validation messages' },
  ]

  const revizeOutputLines: CliOutputLine[] = [
    { text: 'Applying revision...', type: 'info' },
    { text: '✓ Revision applied. auth_viewmodel.dart updated.', type: 'success' },
  ]

  const typeReviseChar = useCallback(() => {
    const revizeCmd = `masterfabric revize "${revisePromptRef.current}"`
    const current = reviseCmdRef.current
    if (current.length >= revizeCmd.length) {
      setShowCursor(false)
      reviseTimeoutRef.current = setTimeout(() => {
        setCommittedLines((prev) => [...prev, { text: `$ ${revizeCmd}`, type: 'command' }])
        setReviseCommand('')
        reviseCmdRef.current = ''
        revizeOutputLines.forEach((line, i) => {
          reviseTimeoutRef.current = setTimeout(() => {
            setCommittedLines((prev) => [...prev, line])
            if (i === revizeOutputLines.length - 1 && reviseFromStepRef.current) {
              reviseFromStepRef.current = false
              setTimeout(resumeAfterStep, 600)
            }
          }, 400 + i * 400)
        })
      }, 400)
      return
    }
    const next = revizeCmd.slice(0, current.length + 1)
    reviseCmdRef.current = next
    setReviseCommand(next)
    reviseTimeoutRef.current = setTimeout(typeReviseChar, 35 + Math.random() * 20)
  }, [resumeAfterStep])

  const handleViewCode = useCallback(() => {
    setShowSuccess(false)
    setSuccessCountdown(null)
    if (successCountdownIntervalRef.current) {
      clearInterval(successCountdownIntervalRef.current)
      successCountdownIntervalRef.current = null
    }
  }, [])

  const handleRevizeClick = useCallback((fromStepOverlay: boolean) => {
    if (fromStepOverlay) {
      if (stepCountdownIntervalRef.current) {
        clearInterval(stepCountdownIntervalRef.current)
        stepCountdownIntervalRef.current = null
      }
      setStepOverlay(null)
    } else {
      setShowSuccess(false)
      setSuccessCountdown(null)
      if (successCountdownIntervalRef.current) {
        clearInterval(successCountdownIntervalRef.current)
        successCountdownIntervalRef.current = null
      }
    }
    reviseFromStepRef.current = fromStepOverlay
    setShowReviseSuggestions(true)
  }, [])

  const handleRevizeSuggestion = useCallback((prompt: string) => {
    setShowReviseSuggestions(false)
    revisePromptRef.current = prompt
    setShowReviseFlow(true)
    reviseCmdRef.current = ''
    setReviseCommand('')
    setShowCursor(true)
    reviseTimeoutRef.current = setTimeout(typeReviseChar, 300)
  }, [typeReviseChar])

  const animateScenario = useCallback(
    (scenarioName: string) => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current)
      if (reviseTimeoutRef.current) clearTimeout(reviseTimeoutRef.current)

      const scenario = scenarios[scenarioName]
      scenarioNameRef.current = scenarioName
      setCurrentScenario(scenarioName)
      setShowSuccess(false)
      setSuccessCountdown(null)
      setStepOverlay(null)
      if (stepCountdownIntervalRef.current) {
        clearInterval(stepCountdownIntervalRef.current)
        stepCountdownIntervalRef.current = null
      }
      if (successCountdownIntervalRef.current) {
        clearInterval(successCountdownIntervalRef.current)
        successCountdownIntervalRef.current = null
      }
      setShowReviseFlow(false)
      setShowReviseSuggestions(false)
      setReviseCommand('')
        setCommittedLines([])
        setPromptCommand('')
        setPromptTypingText('')
        promptTypingRef.current = ''
      setActiveTabIndex(0)
      activeTabRef.current = 0
      const initialCounts = scenario.tabs.map(() => 0)
      setEditorVisibleCountByTab(initialCounts)
      visibleByTabRef.current = initialCounts
      promptCommandRef.current = ''
      setShowCursor(true)
      nextLineIndexRef.current = 0

      animationTimeoutRef.current = setTimeout(typePromptChar, 500)
    },
    [scenarios, typePromptChar]
  )

  useEffect(() => () => {
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current)
    if (reviseTimeoutRef.current) clearTimeout(reviseTimeoutRef.current)
  }, [])

  const handleScenarioChange = (name: string) => {
    if (!isAnimatingRef.current) animateScenario(name)
  }

  const handleRefresh = () => {
    if (!isAnimatingRef.current) animateScenario(currentScenario)
  }

  useEffect(() => {
    terminalScrollRef.current?.scrollTo({ top: terminalScrollRef.current?.scrollHeight ?? 0, behavior: 'smooth' })
  }, [committedLines, promptCommand, promptTypingText])

  useEffect(() => {
    if (!showSuccess) return
    successCountdownIntervalRef.current = setInterval(() => {
      setSuccessCountdown((c) => {
        if (c === null || c <= 1) {
          if (successCountdownIntervalRef.current) {
            clearInterval(successCountdownIntervalRef.current)
            successCountdownIntervalRef.current = null
          }
          handleRefresh()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => {
      if (successCountdownIntervalRef.current) {
        clearInterval(successCountdownIntervalRef.current)
        successCountdownIntervalRef.current = null
      }
    }
  }, [showSuccess, handleRefresh])

  useEffect(() => {
    const t = setTimeout(() => animateScenario('auth'), 400)
    return () => clearTimeout(t)
  }, [animateScenario])

  const scenario = scenarios[currentScenario]
  const tabs = scenario?.tabs ?? []
  const activeTab = tabs[activeTabIndex]
  const visibleCounts = editorVisibleCountByTab.length === tabs.length ? editorVisibleCountByTab : tabs.map(() => 0)
  const visibleEditorLines = activeTab ? activeTab.editorLines.slice(0, visibleCounts[activeTabIndex] ?? 0) : []
  const displayLineCount = CODE_LINES_VISIBLE
  const paddingLines = Math.max(0, CODE_LINES_VISIBLE - visibleEditorLines.length)

  return (
    <section className="flex flex-col lg:flex-row lg:items-start pt-8 pb-6 md:pt-6 md:pb-8 gap-8 lg:gap-10 w-full max-w-5xl mx-auto">
      <div className="lg:order-1 px-4 md:px-0 min-w-0 w-full lg:max-w-[28rem] lg:shrink-0">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full mb-4" aria-hidden>
            Masterfabric CLI · masterfabric_core
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Your project, start to finish, from the terminal
          </h2>

          <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
            <p>
              With sector- and technology-specific <strong className="text-slate-800">CLI tools and pipelines</strong>, your project is built, tested, and deployed from start to finish. One command drives code generation, analysis, fixes, and pipeline—all from the terminal.
            </p>
            <p>
              In the demo, the <strong className="text-slate-800">IDE</strong> tabs show generated code step by step; the <strong className="text-slate-800">terminal</strong> shows the command, the prompt being typed, and CLI output. After deploy, use <strong>View code</strong> to inspect files or <strong>Revise</strong> to run another revision via the CLI.
            </p>
          </div>
        </article>
      </div>

      <div className="lg:order-2 w-full min-w-0 flex flex-col gap-3 lg:max-w-[32rem]">
        <div className={styles.ideAndTerminal}>
          <div className={styles.ideSection}>
            <div className={styles.ideHeader}>
              <div className={styles.ideControls}>
                <span className={styles.controlDot} />
                <span className={styles.controlDot} />
                <span className={styles.controlDot} />
              </div>
              <span className={styles.ideTitle}>Editor</span>
            </div>

            {tabs.length > 0 && (
              <div className={styles.ideTabBar}>
                {tabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`${styles.ideTab} ${activeTabIndex === i ? styles.ideTabActive : ''}`}
                    onClick={() => !isAnimatingRef.current && setActiveTabIndex(i)}
                    aria-pressed={activeTabIndex === i}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.ideContent}>
              <div className={styles.lineNumbers}>
                {Array.from({ length: displayLineCount }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className={styles.codeContent}>
                {visibleEditorLines.length === 0 && paddingLines <= 0 ? (
                  <div className={styles.codeLineEmpty} />
                ) : (
                  <>
                    {visibleEditorLines.map((line, i) => (
                      <div key={i} className={styles.codeLine}>
                        {line}
                      </div>
                    ))}
                    {paddingLines > 0 && Array.from({ length: paddingLines }, (_, i) => (
                      <div key={`p-${i}`} className={styles.codeLineEmpty} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.terminalSection}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalHeaderTitle}>Terminal</span>
            </div>
            <div className={styles.terminalOutput} ref={terminalScrollRef}>
              {committedLines.map((line, i) => (
                <div
                  key={i}
                  className={`${styles.terminalLine} ${
                    line.type === 'success' ? styles.terminalLineSuccess :
                    line.type === 'info' ? styles.terminalLineInfo :
                    line.type === 'error' ? styles.terminalLineError :
                    line.type === 'code' ? styles.terminalLineCode :
                    line.type === 'prompt' ? styles.terminalLinePrompt :
                    line.type === 'command' ? styles.terminalLineCommand : ''
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div className={styles.terminalPromptLine}>
                <span className={styles.terminalPromptPrefix}>{promptTypingText ? '' : '$ '}</span>
                <span className={styles.terminalPromptCommand}>{showReviseFlow ? reviseCommand : (promptTypingText || promptCommand)}</span>
                {showCursor && <span className={styles.terminalCursor} aria-hidden />}
              </div>
            </div>
          </div>

          {stepOverlay && (
            <div className={styles.stepOverlay}>
              <div className={styles.stepOverlayContent}>
                <p className={styles.stepOverlayMessage}>{stepOverlay.message}</p>
                <p className={styles.stepOverlayCountdown}>Next in {stepOverlay.countdown}s</p>
                <button type="button" className={styles.stepOverlayRevise} onClick={() => handleRevizeClick(true)}>
                  Revise
                </button>
              </div>
            </div>
          )}

          {showReviseSuggestions && (
            <div className={styles.reviseSuggestionsOverlay}>
              <div className={styles.reviseSuggestionsContent}>
                <p className={styles.reviseSuggestionsTitle}>Choose a revision</p>
                <div className={styles.reviseSuggestionsList}>
                  {REVIZE_SUGGESTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      className={styles.reviseSuggestionBtn}
                      onClick={() => handleRevizeSuggestion(opt.prompt)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.reviseSuggestionsClose}
                  onClick={() => {
                    setShowReviseSuggestions(false)
                    if (reviseFromStepRef.current) {
                      reviseFromStepRef.current = false
                      resumeAfterStep()
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className={styles.successOverlayTerminal}>
              <div className={styles.successContent}>
                <div className={styles.successIconContainer}>
                  <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#22c55e" />
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{scenarios[currentScenario]?.successTitle}</h3>
                <p className={styles.successDescription}>
                  Code written · Tests passed · Deploy complete. View code, run a revision, or restart the flow.
                </p>
                {successCountdown !== null && successCountdown > 0 && (
                  <p className={styles.successCountdownText}>Restarting in {successCountdown}s</p>
                )}
                <div className={styles.successActions}>
                  <button type="button" className={styles.successBtnSecondary} onClick={handleViewCode}>
                    View code
                  </button>
                  <button type="button" className={styles.successBtnPrimary} onClick={() => handleRevizeClick(false)}>
                    Revise
                  </button>
                  <button type="button" className={styles.successBtnRestart} onClick={handleRefresh}>
                    Restart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
