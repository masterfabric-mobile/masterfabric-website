'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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

const REVIZE_OUTPUT_LINES: CliOutputLine[] = [
  { text: 'Applying revision...', type: 'info' },
  { text: '✓ Revision applied. auth_viewmodel.dart updated.', type: 'success' },
]

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
  // eslint-disable-next-line react-hooks/exhaustive-deps -- animateScenario/resumeAfterStep omitted to avoid circular ref
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

  const typeReviseChar = useCallback(() => {
    const revizeCmd = `masterfabric revize "${revisePromptRef.current}"`
    const current = reviseCmdRef.current
    if (current.length >= revizeCmd.length) {
      setShowCursor(false)
      reviseTimeoutRef.current = setTimeout(() => {
        setCommittedLines((prev) => [...prev, { text: `$ ${revizeCmd}`, type: 'command' }])
        setReviseCommand('')
        reviseCmdRef.current = ''
        REVIZE_OUTPUT_LINES.forEach((line, i) => {
          reviseTimeoutRef.current = setTimeout(() => {
            setCommittedLines((prev) => [...prev, line])
            if (i === REVIZE_OUTPUT_LINES.length - 1 && reviseFromStepRef.current) {
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

  const handleRefresh = useCallback(() => {
    if (!isAnimatingRef.current) animateScenario(currentScenario)
  }, [currentScenario, animateScenario])

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

  const authStages = [
    { label: 'Generating code', key: 'code' },
    { label: 'Writing tests', key: 'tests' },
    { label: 'Running analysis', key: 'lint' },
    { label: 'Preparing deploy', key: 'deploy' },
    { label: 'Preparing deployment', key: 'done' },
  ]
  const totalLines = scenario?.terminalLines.length ?? 1
  const progressPercent = showSuccess ? 100 : Math.min(100, Math.round((committedLines.length / Math.max(totalLines, 1)) * 100))
  const currentStageIdx = showSuccess ? 4 : Math.min(4, Math.floor((progressPercent / 100) * 5))

  const deployCmd = scenario?.cliCommand?.replace('gen auth --mvvm', 'deploy') ?? 'masterfabric deploy'

  return (
    <section className="px-4 md:px-0 pt-8 pb-6 md:pt-6 md:pb-8 w-full max-w-5xl mx-auto">
      <div className="mb-8 max-w-3xl">
        <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 rounded-full mb-3" aria-hidden>
          Masterfabric CLI · masterfabric_core
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          Your project, start to finish, from the terminal
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Sector-specific CLI tools drive code generation, tests, fixes, and deploy. One command from start to finish.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-left relative shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Masterfabric Wizard — {scenario?.title ?? 'Auth'}
            </h3>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Next
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Build {scenario?.title?.toLowerCase() ?? 'auth'} flow step by step
          </p>
          <p className="text-xs font-medium text-gray-500 mb-2">
            Stage {currentStageIdx + 1}/5 — {authStages[currentStageIdx]?.label}
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={styles.wizardTerminal} ref={terminalScrollRef}>
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

          {stepOverlay && (
            <div className={styles.stepOverlay}>
              <div className={styles.stepOverlayHeader}>
                <span className={styles.stepOverlayHeaderIcon} aria-hidden>ℹ</span>
                <div>
                  <p className={styles.stepOverlayHeaderTitle}>Milestone reached</p>
                  <p className={styles.stepOverlayHeaderDesc}>A step in the flow has completed. Review below or continue automatically.</p>
                </div>
              </div>
              <div className={styles.stepOverlayContent}>
                <div className={styles.stepOverlayActions}>
                  <span className={styles.stepOverlayBadge}>Milestone</span>
                  <p className={styles.stepOverlayMessage}>{stepOverlay.message}</p>
                  <p className={styles.stepOverlayCountdown}>Next in {stepOverlay.countdown}s</p>
                  <button type="button" className={styles.stepOverlayRevise} onClick={() => handleRevizeClick(true)}>
                    Revise
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Files</h4>
            <p className="text-xs text-gray-500 mb-2">Click to preview</p>
            <div className="font-mono text-xs text-gray-600 space-y-0.5">
              <div>project-root/</div>
              <div className="pl-2">lib/</div>
              <div className="pl-4">auth/</div>
              <div className="pl-6">{tabs[0]?.label}</div>
              {tabs.length > 1 && (
                <>
                  <div className="pl-2">test/</div>
                  <div className="pl-4">{tabs[1]?.label}</div>
                </>
              )}
              {tabs.length > 2 && (
                <>
                  <div className="pl-2">.github/</div>
                  <div className="pl-4">workflows/</div>
                  <div className="pl-6">{tabs[2]?.label}</div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-1.5">
              <span className="text-xs font-medium text-gray-700">{activeTab?.label ?? 'untitled'}</span>
              <span className="text-xs text-gray-500">
                {activeTab?.label?.endsWith('.dart') ? 'Dart' : activeTab?.label?.endsWith('.yml') ? 'YAML' : 'Dart'}
              </span>
            </div>
            <div className="min-h-[200px] max-h-[200px] overflow-y-auto bg-slate-50 p-3 font-mono text-xs leading-5 text-gray-800">
              {visibleEditorLines.length === 0 ? (
                <div className="text-gray-400">{'// Select a file from the tree or wait for the wizard...'}</div>
              ) : (
                visibleEditorLines.map((line, i) => (
                  <div key={i}>{line || '\u00A0'}</div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Deploy Command</h4>
            <button
              type="button"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline mb-1"
              onClick={() => navigator.clipboard?.writeText(`$ ${deployCmd}`)}
            >
              Copy
            </button>
            <pre className="font-mono text-xs text-gray-800 bg-gray-50 p-2 rounded overflow-x-auto border border-gray-100">
              $ {deployCmd}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Deployment Terminal
          {showSuccess && <span className="ml-2 text-green-600">Completed</span>}
        </h4>
        <div className={styles.deploymentTerminal}>
          <div className="font-mono text-xs text-gray-700 space-y-0.5">
            <div className="text-green-600 dark:text-green-400">$ masterfabric deploy</div>
            {showSuccess && (
              <>
                <div className="text-green-600 dark:text-green-400">✓ validating plugin manifest</div>
                <div className="text-green-600 dark:text-green-400">✓ uploading assets to Masterfabric</div>
                <div className="text-green-600 dark:text-green-400">✓ publishing stable version</div>
                <div className="text-gray-500">Deploy complete. View code, run a revision, or restart.</div>
              </>
            )}
          </div>
        </div>
        {showSuccess && (
          <div className="flex gap-2 mt-3">
            <button type="button" className="px-3 py-1.5 text-xs font-medium rounded bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleViewCode}>
              View code
            </button>
            <button type="button" className="px-3 py-1.5 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleRevizeClick(false)}>
              Revise
            </button>
            <button type="button" className="px-3 py-1.5 text-xs font-medium rounded border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={handleRefresh}>
              Restart
            </button>
          </div>
        )}
      </div>

      {showReviseSuggestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm" onClick={() => { setShowReviseSuggestions(false); if (reviseFromStepRef.current) { reviseFromStepRef.current = false; resumeAfterStep(); } }}>
          <div className={styles.reviseSuggestionsContent} onClick={(e) => e.stopPropagation()}>
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
    </section>
  )
}
