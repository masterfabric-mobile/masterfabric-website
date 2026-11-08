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
  platforms: ('ios' | 'android')[]
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
        purpose: 'Delivers remote game-balance settings (Remote Config). The app also works fully offline',
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
