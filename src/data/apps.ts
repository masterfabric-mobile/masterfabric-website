/**
 * Registry of mobile apps published by MasterFabric.
 * Each entry generates /privacy/<bundleId>/ automatically (see src/lib/privacy-policy.ts).
 *
 * To add an app: append one object below, fill the factual fields honestly
 * (they drive the generated policy text), and set `draft: false` when legal has reviewed it.
 */

export type AppData = {
  /** Account / profile info: name, email, etc. */
  account?: string[]
  /** User-generated content the app handles: photos, audio, notes... */
  userContent?: string[]
  /** Device / usage data (device model, OS, crash logs, IP...) */
  device?: string[]
  /** Precise or coarse location, with how it is used */
  location?: string
  /** Purchases handled via App Store / Google Play (we never see card numbers) */
  purchases?: boolean
}

export type AppThirdParty = {
  name: string
  purpose: string
  /** Link to that provider's own privacy policy */
  policyUrl: string
}

export type AppConfig = {
  /** Bundle ID (iOS) / package name (Android). Used directly as the URL: /privacy/<bundleId>/ */
  bundleId: string
  name: string
  tagline: string
  platforms: ('ios' | 'android' | 'macos')[]
  storeUrls?: { ios?: string; android?: string }
  /** Legal entity that publishes the app (defaults to MasterFabric) */
  operator?: string
  contactEmail: string
  /** ISO date of the CURRENT version; shown as "Last updated" */
  effectiveDate: string
  /** Policy version (semver-ish). Bump on every wording/data change. */
  version: string
  /** Oldest first or newest first — newest first. Every bump needs one line. */
  history: { version: string; date: string; summary: string; minAppVersion?: string }[]
  /** true = page is built but noindex, hidden from /privacy and sitemap */
  draft?: boolean
  /** Minimum age; apps are not directed to children under 13 by default */
  minAge: number
  data: AppData
  /** Data stays on the device and is never sent to our servers */
  localOnly?: boolean
  thirdParties: AppThirdParty[]
  /** Free-text, e.g. "Until you delete your account; backups purged within 30 days" */
  retention: string
  /** How a user deletes their data (in-app path or e-mail request) */
  deletion: string
  /** Extra app-specific sections appended before "Changes" */
  extraSections?: { title: string; paragraphs: string[]; bullets?: string[] }[]
}

export const DEFAULT_OPERATOR = 'MasterFabric Information Technology Inc.'

export const apps: AppConfig[] = [
  {
    bundleId: 'com.masterfabric.archeryhero',
    name: 'Arx Hero',
    tagline: 'An archery game. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-11',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-11', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: [
        'Game progress: unlocked levels, coins, gems, stars, upgrades, missions and tutorial flags (stored on your device)',
        'Settings: language, sound, music and haptics (stored on your device)',
      ],
      purchases: false,
    },
    thirdParties: [],
    retention: 'All data stays on your device and is removed when you delete the app.',
    deletion: 'In the app: Settings → Reset removes your progress. Deleting the app removes everything else. We hold no server-side copy.',
    extraSections: [
      {
        title: 'No accounts, no tracking, no ads',
        paragraphs: [
          'Arx Hero has no accounts, analytics, crash reporting, advertising or in-app purchases, sends no data to us, does not track you and requests no device permissions. If a future version adds online features such as accounts or leaderboards, we will update this policy before they are released.',
        ],
      },
    ],
  },
  {
    bundleId: 'co.masterfabric.ayso',
    name: 'Ayso',
    tagline: 'Cycle and pregnancy tracking. Your health data stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-11',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-11', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      account: ['Profile name, birth year and cycle preferences you enter (stored on your device; there is no online account)'],
      userContent: [
        'Health and cycle information you log: periods, flow, mood, symptoms, discharge, energy, sleep, basal body temperature, notes, pregnancy dates, weight, kick counts and contractions',
        'Reminders, bookmarks, checklists, your consent choices and privacy settings',
        'Your app-lock PIN, stored as a salted hash in the iOS Keychain on your device',
      ],
      device: [
        'Apple Health data you allow Ayso to read: menstrual flow, step count, body weight and sleep',
      ],
      purchases: true,
    },
    thirdParties: [
      {
        name: 'Apple (HealthKit)',
        purpose: 'Optional. Reads menstrual flow, steps, weight and sleep, and writes menstrual flow back only with your approval. Governed by your Health permissions',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
      {
        name: 'Apple App Store',
        purpose: 'Processes Ayso Plus subscriptions and restores purchases. We never see your payment details',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
    ],
    retention: 'Your data is stored on your device until you delete it. If you back up your device with iCloud or Finder, the app database may be included in that Apple backup. Data you wrote to Apple Health stays there until you remove it in the Health app.',
    deletion: 'In the app: Profile → "Delete my data" erases all records, your PIN, settings and scheduled reminders. You can export your data as a JSON file from the same area. Samples already written to Apple Health must be removed in the Health app.',
    extraSections: [
      {
        title: 'Health data and consent',
        paragraphs: [
          'Information about your cycle, symptoms and pregnancy is health data, a special category under KVKK and GDPR. It is processed only on your device, based on your explicit consent, which you can review and withdraw in Profile → Permissions. Withdrawing consent stops the related processing; it does not affect what you already stored on your device.',
          'We do not sell, share or use this data for advertising, and Ayso has no servers that receive it. It is protected by iOS data protection while your device is locked.',
        ],
      },
      {
        title: 'App lock',
        paragraphs: [
          'You can lock Ayso with Face ID or Touch ID, with an app-specific PIN as the fallback. Biometric matching is done by iOS; Ayso never receives your face or fingerprint data.',
        ],
      },
      {
        title: 'Notifications',
        paragraphs: [
          'Reminders are local notifications scheduled on your device. You can choose discreet notifications that hide sensitive wording on the lock screen. We do not use push notifications.',
        ],
      },
      {
        title: 'No accounts, no tracking, no ads',
        paragraphs: [
          'The current version of Ayso has no online accounts, no analytics, crash reporting or advertising SDKs and makes no network requests of its own. It does not track you. If we add optional analytics or crash reports in a future version, they will be off by default, require your consent and be described here before release.',
          'Ayso provides general information and is not a medical device or a substitute for professional medical advice.',
        ],
      },
    ],
  },
  {
    bundleId: 'com.masterfabric.idlemine',
    name: 'Idle Mine Tycoon',
    tagline: 'Build and manage your mine. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-11',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-11', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: [
        'Game progress: cash, gems, upgrades, achievements, missions, daily login streak and purchase records (saved in a file on your device)',
        'Settings: language, sound, music, haptics, notification and analytics preferences (stored on your device)',
      ],
      device: ['Anonymous gameplay events (for example upgrades or purchases), recorded only in your device log and never sent to us'],
      purchases: true,
    },
    thirdParties: [
      {
        name: 'Apple App Store',
        purpose: 'Processes in-app purchases (gems, starter pack, remove ads) and restores them. We never see your payment details',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
    ],
    retention: 'All data stays on your device and is removed when you delete the app. Purchase records are kept by Apple. If you back up your device, the save file may be included in your Apple device backup.',
    deletion: 'In the app: Settings → Reset progress. Deleting the app removes everything else. We hold no server-side copy.',
    extraSections: [
      {
        title: 'Notifications',
        paragraphs: [
          'Reminders (for example "Daily reward ready") are local notifications scheduled on your device. They are off by default, and permission is requested only when you turn them on in Settings. We do not use push notifications.',
        ],
      },
      {
        title: 'No accounts, no tracking',
        paragraphs: [
          'Idle Mine Tycoon has no accounts, does not track you across other apps or websites, uses no advertising identifier and contains no third-party SDKs. It requests no camera, location, photo or contacts access. If we add advertising or cloud analytics in a future version, we will update this policy first and ask for any required consent.',
        ],
      },
    ],
  },
  {
    bundleId: 'com.masterfabric.pdf',
    name: 'Document Scan Plus',
    tagline: 'Scan, edit and sign PDFs. Processed on your device, never uploaded.',
    platforms: ['ios', 'android'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-11',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-11', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: [
        'Photos and scans you capture with the camera or pick from your library, and the PDFs you create or open, processed only on your device',
        'Text recognised from your documents (OCR), signatures you draw and passwords you set for PDF protection, kept in memory only',
        'A local consent record (policy version, date, your choices) stored on your device and excluded from backups',
      ],
      purchases: false,
    },
    thirdParties: [
      {
        name: 'Google ML Kit / Google Play services (Android)',
        purpose: 'On-device text recognition and document scanning. Play services may download the scanner module itself; your documents are not sent',
        policyUrl: 'https://policies.google.com/privacy',
      },
      {
        name: 'Apple VisionKit (iOS)',
        purpose: 'On-device document scanning',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
    ],
    retention: 'Documents are kept only while you work with them. Temporary files are cleared when the app starts and when you use "Delete my data". Files you shared to other apps cannot be deleted by us.',
    deletion: 'In the app: Settings → Delete my data. Uninstalling the app removes everything else.',
    extraSections: [
      {
        title: 'Permissions',
        paragraphs: [
          'Camera: to scan documents. Photo library (iOS): only the images you choose to import. The app does not ask for location, contacts, microphone or notifications. The Android release build removes the internet permission, so it cannot send data off your device.',
        ],
      },
      {
        title: 'No tracking, no analytics, no ads',
        paragraphs: [
          'Document Scan Plus has no accounts, analytics, crash reporting, advertising or in-app purchases, and does not track you. It declares no tracking in its Apple privacy manifest.',
        ],
      },
    ],
  },
  {
    bundleId: 'com.cubeliora.puzzle',
    name: 'Cubeliora',
    tagline: 'A puzzle game. Everything stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-11',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-11', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Hint balance, chosen theme and a list of purchase transaction IDs (stored on your device)'],
      purchases: true,
    },
    thirdParties: [
      {
        name: 'Apple App Store',
        purpose: 'Processes in-app purchases of hint packs. We never see your payment details',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
    ],
    retention: 'All data stays on your device and is removed when you delete the app. Purchase records are kept by Apple.',
    deletion: 'Delete the app to remove all local data. We hold no server-side copy.',
    extraSections: [
      {
        title: 'No accounts, no tracking, no ads',
        paragraphs: [
          'Cubeliora has no accounts, analytics, advertising or third-party SDKs, does not track you and sends no data to us. It requests no device permissions.',
        ],
      },
    ],
  },
  {
    bundleId: 'com.masterfabric.notch',
    name: 'MasterFabric Notch',
    tagline: 'A MacBook notch that understands your coding agents. Runs locally on your Mac.',
    platforms: ['macos'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-09',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-09', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: [
        'Agent activity received from the coding tools you enable (for example tool names, file paths touched, prompts and status), processed on your Mac to show the island and approval prompts',
        'Your Allow / Deny decisions, settings and local usage counters (stored on your Mac)',
      ],
      device: [
        'Hook configuration files of enabled agents, which the app edits on your Mac to connect them',
        'Your IP address and app version, sent to GitHub when you check for updates',
      ],
      purchases: false,
    },
    thirdParties: [
      {
        name: 'GitHub',
        purpose: 'Update check and DMG download from GitHub Releases. GitHub receives your IP address and request metadata',
        policyUrl: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
      },
    ],
    retention: 'All data stays on your Mac and is removed when you uninstall the app and its hooks (Settings → Hooks → Uninstall, then delete the app and ~/Library/Application Support/MasterFabricNotch). GitHub keeps request logs under its own policy.',
    deletion: 'Use Settings → Hooks → Uninstall, delete the app, and remove ~/Library/Application Support/MasterFabricNotch. We hold no server-side copy.',
    extraSections: [
      {
        title: 'Permissions',
        paragraphs: [
          'Accessibility access is requested only if you enable ChatGPT Desktop support, so the app can press Allow or Deny on your behalf. You can revoke it any time in System Settings → Privacy & Security.',
          'Agent events travel over a local Unix socket on your Mac and never leave your device.',
        ],
      },
      {
        title: 'No tracking, no analytics',
        paragraphs: [
          'MasterFabric Notch contains no analytics, telemetry or advertising SDKs, does not track you and does not send agent activity to us or anyone else.',
        ],
      },
    ],
  },
  {
    bundleId: 'co.masterfabric.stacktower',
    name: 'Stack Tower',
    tagline: 'Stack the blocks, build the tallest tower. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-08',
    version: '1.0',
    history: [
      { version: '1.0', date: '2026-11-08', summary: 'Initial policy.', minAppVersion: '0.6.271' },
    ],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Game progress: high score, coins, upgrades, missions, daily reward status and settings (stored on your device)'],
      device: [
        'Language and sound/vibration preferences (stored on your device)',
        'When the Firebase configuration is enabled: an app-instance identifier, device model, OS version and IP address, used to deliver game settings',
      ],
      purchases: false,
    },
    thirdParties: [
      {
        name: 'Firebase (Google)',
        purpose: 'Delivers remote game-balance settings (Remote Config); the app also works fully offline',
        policyUrl: 'https://policies.google.com/privacy',
      },
    ],
    retention: 'Game progress lives only on your device and is removed when you delete the app. Firebase technical identifiers are kept by Google according to its policy.',
    deletion: 'Delete the app to remove all local data. For any server-side identifier, e-mail privacy@masterfabric.co and we will help.',
    extraSections: [
      {
        title: 'No tracking, no ads',
        paragraphs: [
          'Stack Tower does not track you across other apps or websites, does not use advertising identifiers and shows no third-party ads. It declares no tracking in its Apple privacy manifest.',
        ],
      },
    ],
  },
  {
    bundleId: 'co.masterfabric.exampleapp',
    name: 'Example App',
    tagline: 'Template entry — copy this object for each new app.',
    platforms: ['ios', 'android'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-08',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-08', summary: 'Initial policy.', minAppVersion: '1.0.0' }],
    draft: true,
    minAge: 13,
    data: {
      account: ['Email address', 'Display name'],
      userContent: ['Photos you choose to upload'],
      device: ['Device model and OS version', 'Crash logs', 'Approximate IP-based region'],
      purchases: true,
    },
    thirdParties: [
      {
        name: 'Firebase Analytics & Crashlytics (Google)',
        purpose: 'Usage analytics and crash reporting',
        policyUrl: 'https://policies.google.com/privacy',
      },
      {
        name: 'Apple App Store / Google Play',
        purpose: 'Payment processing for in-app purchases',
        policyUrl: 'https://www.apple.com/legal/privacy/',
      },
    ],
    retention: 'While your account is active. After deletion, data is removed within 30 days.',
    deletion: 'In the app: Settings → Delete account. Or e-mail us from your registered address.',
  },
]

export const publishedApps = apps.filter((a) => !a.draft)
export const getApp = (bundleId: string) => apps.find((a) => a.bundleId === bundleId)
