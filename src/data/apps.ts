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

/**
 * Note: apps that have a reviewed full text in src/data/app-policies.ts render that text;
 * the data/thirdParties fields below then only feed the index card, not the policy body.
 */
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
    bundleId: 'com.masterfabric.cannonmerge',
    name: 'Cannon Merge Plus',
    tagline: 'Merge cannons and defend your castle. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Game progress: board, coins, wave, upgrades, Military Series, Codex, energy and last-played time (stored on your device)', 'Settings: language and sound; purchase product IDs and entitlements such as Remove Ads'],
      device: ['Only if you choose to watch a rewarded ad: device and usage data processed by Google AdMob, such as advertising ID and IP address'],
      purchases: true,
    },
    thirdParties: [
      { name: 'Google AdMob (Google LLC)', purpose: 'Optional rewarded video ads that refill energy', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'Apple App Store', purpose: 'Processes in-app purchases (Remove Ads, coin packs) and restores them. We never see your payment details', policyUrl: 'https://www.apple.com/legal/privacy/' },
    ],
    retention: 'Progress and energy stay on your device and are removed when you delete the app. Purchase records are kept by Apple.',
    deletion: 'Delete the app to remove all local data. Use Settings → Restore Purchases after reinstalling. We hold no server-side copy.',
    extraSections: [
      { title: 'No accounts, no analytics', paragraphs: ['Cannon Merge Plus has no accounts and no Firebase, analytics or crash-reporting SDK active. It requests no camera, photo, microphone, location or notification permission. Rewarded ads are optional and shown only when you choose to watch one; Google may use an advertising identifier according to its own policy and your device settings. If we add analytics in a future version, we will update this policy first.'] },
    ],
  },
  {
    bundleId: 'com.masterfabric.farmmerge',
    name: 'Farm Merge Valley',
    tagline: 'A cozy merge farm. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Game progress: board, coins, gems, energy, orders, fields, land, daily rewards, missions, achievements and tutorial flags (stored on your device)', 'Settings: language, sound, haptics and notification choice'],
      purchases: true,
    },
    thirdParties: [
      { name: 'Apple App Store', purpose: 'Processes in-app purchases (gem packs, starter pack, no-ads) and restores them. We never see your payment details', policyUrl: 'https://www.apple.com/legal/privacy/' },
    ],
    retention: 'All data stays on your device and is removed when you delete the app. Purchase records are kept by Apple.',
    deletion: 'In the app: Settings → Reset farm (your settings can be kept). Deleting the app removes everything else. We hold no server-side copy.',
    extraSections: [
      { title: 'Notifications', paragraphs: ['Energy-full and crop-ready reminders are local notifications scheduled on your device, only if you turn them on. We do not use push notifications.'] },
      { title: 'No accounts, no tracking, no ads', paragraphs: ['Farm Merge Valley has no accounts, advertising, analytics or crash-reporting SDKs and does not track you. Its analytics and rewarded-ad hooks are local stubs that write only to the device log. It requests no camera, photo, microphone or location permission.'] },
    ],
  },
  {
    bundleId: 'com.masterfabric.fitness',
    name: 'Flex',
    tagline: 'Train, eat and adapt with an AI coach. Your health data is stored with your account.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    data: {
      account: ['Name, username, email address, date of birth, sign-in method and unique account ID', 'Optional profile photo (stored in Firebase Cloud Storage)'],
      userContent: [
        'Body and goal data: height, weight, target weight, activity level, diet, allergies, equipment and rest days',
        'Training and nutrition records: workouts, programmes, sessions, personal records, daily logs, meals, water and weight entries, progress insights',
        'AI Coach conversations (kept in device secure storage) and meal photos (kept on your device only)',
        'Training buddies, circle members and invite codes; notification and privacy preferences',
      ],
      device: ['App Check tokens; a scanned barcode is sent to Open Food Facts to look up a product', 'Optional two-factor (TOTP) secret kept in device secure storage'],
      purchases: false,
    },
    thirdParties: [
      { name: 'Firebase (Google)', purpose: 'Authentication, Firestore database, Cloud Storage, Cloud Functions and App Check', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'Firebase AI Logic / Gemini (Google)', purpose: 'Online AI Coach responses. No Gemini API key is embedded in the app', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'Google Sign-In and Sign in with Apple', purpose: 'Optional sign-in methods', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'Open Food Facts', purpose: 'Looks up food products from a scanned barcode', policyUrl: 'https://world.openfoodfacts.org/privacy' },
      { name: 'Apple or Google speech recognition', purpose: 'Optional voice input (microphone)', policyUrl: 'https://www.apple.com/legal/privacy/' },
    ],
    retention: 'Account data is kept while your account is active. AI Coach history is kept until you delete it and has no automatic expiry. Uninstalling the app removes local meal photos and secure storage.',
    deletion: 'In the app: Profile → Privacy & Data → Delete my account removes your sign-in record, profile and your weight, day, meal, workout and programme records, then clears on-device AI history and caches. You can also export a copy of your profile as JSON from the same area.',
    extraSections: [
      { title: 'Health data and consent', paragraphs: ['Body, nutrition and training information is health-related data, a special category under KVKK and GDPR. It is processed on the basis of your explicit consent, which you can withdraw by deleting your data or account. The current version does not connect to Apple Health or Health Connect. Flex provides general information and is not a medical device or a substitute for professional advice.'] },
      { title: 'Permissions and notifications', paragraphs: ['Camera and photo library (meal and profile photos), microphone and speech recognition (optional voice input) and local notifications are optional and requested only when needed. The app does not request location or contacts.'] },
      { title: 'No tracking, no ads', paragraphs: ['Flex does not track you across other apps or websites and shows no advertising. The current version has no in-app purchase SDK.'] },
    ],
  },
  {
    bundleId: 'com.masterfabric.foxie',
    name: 'Foxie',
    tagline: 'Study plans, practice exams and an AI tutor. Your account lives on our servers.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    data: {
      account: ['Name, email address, sign-in method and account ID', 'Role (student, teacher or parent) and settings', 'Optional profile photo (stored in Firebase Cloud Storage)'],
      userContent: [
        'For students: target exam, goals, tasks, calendar, practice-exam results and study-time records including Pomodoro sessions',
        'Student–teacher and student–parent connection records and their access scope; private notes a teacher writes about a student',
        'Assistant messages and drafts',
      ],
      device: ['Crash reports (device and diagnostic data, without your name, email or account ID) and App Check tokens'],
      purchases: false,
    },
    thirdParties: [
      { name: 'Firebase (Google)', purpose: 'Authentication, Firestore, Cloud Storage, Cloud Functions (europe-west1), Crashlytics and App Check', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'Google Sign-In and Sign in with Apple', purpose: 'Optional sign-in methods', policyUrl: 'https://policies.google.com/privacy' },
      { name: 'NVIDIA API Catalog', purpose: 'Powers the Foxie assistant. It receives study context, not your name, email or account ID', policyUrl: 'https://www.nvidia.com/en-us/about-nvidia/privacy-policy/' },
    ],
    retention: 'Account and study data are kept while your account is active. Assistant conversations expire after 30 days, assistant proposals and turn receipts after 24 hours, and usage counters after 90 days.',
    deletion: 'In the app: Settings → Delete account (after re-authentication) removes your profile, study records, connections, photo and sign-in record. There is no in-app export button; e-mail privacy@masterfabric.co to request a copy.',
    extraSections: [
      { title: 'Teachers and parents', paragraphs: ['A teacher or parent can see a student\'s data only after the student connects with them, and only within the agreed access scope. Parents have view-only access. Teachers\' private notes are not visible to students.'] },
      { title: 'The Foxie assistant', paragraphs: ['The assistant runs on our servers and cannot change your data without your confirmation. Messages about self-harm, child safety or health risks are not sent to the model. Students preparing for exams such as LGS may be close to or above the minimum age; the app has no separate age gate or parental-consent flow.'] },
      { title: 'Permissions and notifications', paragraphs: ['Camera and photo library are used only to set a profile photo. The app does not request location, contacts or microphone access.'] },
      { title: 'No tracking, no ads', paragraphs: ['Foxie does not track you across other apps or websites and shows no advertising.'] },
    ],
  },
  {
    bundleId: 'com.masterfabric.holerush',
    name: 'Hole Rush Plus',
    tagline: 'Swallow the city and grow. Your progress stays on your device.',
    platforms: ['ios'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Game progress: coins, level, best score, upgrades, rims, trails, missions and daily-reward status (stored on your device)', 'Settings: language, sound, music and vibration'],
      device: ['Only if Firebase is enabled in a future build: an anonymous user ID, coins, level and upgrade ranks for sync, and device and network information for Remote Config'],
      purchases: false,
    },
    thirdParties: [
      { name: 'Firebase (Google), only when enabled', purpose: 'Optional anonymous authentication, Firestore progress sync and Remote Config. The current release is built without a Firebase configuration, so it runs offline and sends nothing', policyUrl: 'https://policies.google.com/privacy' },
    ],
    retention: 'Local data is removed when you delete the app. If Firebase is enabled, the anonymous ID and synced data are kept by Google until you ask us to delete them.',
    deletion: 'Delete the app to remove all local data. To delete any synced data, e-mail privacy@masterfabric.co.',
    extraSections: [
      { title: 'No tracking, no ads', paragraphs: ['Hole Rush Plus uses no advertising identifiers, shows no ads, has no in-app purchases and does not track you. Its Apple privacy manifest declares no tracking.'] },
    ],
  },
  {
    bundleId: 'com.masterfabric.videostudio',
    name: 'MF Studio',
    tagline: 'Capture, craft and share videos. Projects and recordings stay on your Mac.',
    platforms: ['macos'],
    contactEmail: 'privacy@masterfabric.co',
    effectiveDate: '2026-11-16',
    version: '1.0',
    history: [{ version: '1.0', date: '2026-11-16', summary: 'Initial policy.' }],
    minAge: 13,
    localOnly: true,
    data: {
      userContent: ['Projects: video, audio, captions and style templates stored on your Mac', 'Screen, window or region recordings, microphone audio and camera or capture-device video, only when you choose them and grant permission', 'Optional captions generated locally with a whisper.cpp program and model that you supply'],
      device: ['Language and editor preferences'],
      purchases: false,
    },
    thirdParties: [],
    retention: 'Projects, recordings and captions stay on your Mac until you delete them or uninstall the app. Temporary files go to the system temporary folder. Backups such as Time Machine may include project files.',
    deletion: 'Delete a project in the app or in Finder. Deleting the app removes its Application Support data; files you saved elsewhere remain. We hold no server-side copy.',
    extraSections: [
      { title: 'Permissions', paragraphs: ['Depending on what you use, macOS asks for Screen Recording, Microphone, Camera or capture-device, and Accessibility or Input Monitoring access (for event capture). You can revoke each in System Settings → Privacy & Security. The app does not request contacts or location. Recordings can capture anything visible or audible, so you are responsible for permissions of other people or services shown in them. Files you share cannot be recalled by us.'] },
      { title: 'No accounts, no tracking, no in-app purchases', paragraphs: ['MF Studio has no accounts, makes no network requests for these purposes, does not track you and has no in-app purchases.'] },
    ],
  },
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
    bundleId: 'com.masterfabric.ayso',
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
    bundleId: 'com.masterfabric.cubeliora',
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
    bundleId: 'com.masterfabric.stacktower',
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
