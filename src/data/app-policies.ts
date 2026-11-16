import type { PolicySection } from '@/lib/privacy-policy'

/** Hand-reviewed full policy texts (override the generated template). Keyed by bundle ID. */
export const appPolicies: Record<string, PolicySection[]> = {
  "com.masterfabric.ayso": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Ayso (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Ayso keeps your game data on your device and does not send it to our servers. The App handles:"
      ],
      "bullets": [
        "Account — Profile name, birth year and cycle preferences you enter (stored on your device; there is no online account)",
        "Content — Health and cycle information you log: periods, flow, mood, symptoms, discharge, energy, sleep, basal body temperature, notes, pregnancy dates, weight, kick counts and contractions",
        "Content — Reminders, bookmarks, checklists, your consent choices and privacy settings",
        "Content — Your app-lock PIN, stored as a salted hash in the iOS Keychain on your device",
        "Device & usage — Apple Health data you allow Ayso to read: menstrual flow, step count, body weight and sleep"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Verify purchases and unlock paid features",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:"
      ],
      "bullets": [
        "Apple (HealthKit) — Optional. Reads menstrual flow, steps, weight and sleep, and writes menstrual flow back only with your approval. Governed by your Health permissions. Privacy policy: [https://www.apple.com/legal/privacy/](https://www.apple.com/legal/privacy/)",
        "Apple App Store — Processes Ayso Plus subscriptions and restores purchases. We never see your payment details. Privacy policy: [https://www.apple.com/legal/privacy/](https://www.apple.com/legal/privacy/)"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Your data is stored on your device until you delete it. If you back up your device with iCloud or Finder, the app database may be included in that Apple backup. Data you wrote to Apple Health stays there until you remove it in the Health app."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. In the app: Profile → \"Delete my data\" erases all records, your PIN, settings and scheduled reminders. You can export your data as a JSON file from the same area. Samples already written to Apple Health must be removed in the Health app.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure.",
        "Payments are handled by Apple or Google; we never see or store your card number."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Ayso is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "Health data and consent",
      "paragraphs": [
        "Information about your cycle, symptoms and pregnancy is health data, a special category under KVKK and GDPR. It is processed only on your device, based on your explicit consent, which you can review and withdraw in Profile → Permissions. Withdrawing consent stops the related processing; it does not affect what you already stored on your device.",
        "We do not sell, share or use this data for advertising, and Ayso has no servers that receive it. It is protected by iOS data protection while your device is locked."
      ]
    },
    {
      "title": "App lock",
      "paragraphs": [
        "You can lock Ayso with Face ID or Touch ID, with an app-specific PIN as the fallback. Biometric matching is done by iOS; Ayso never receives your face or fingerprint data."
      ]
    },
    {
      "title": "Notifications",
      "paragraphs": [
        "Reminders are local notifications scheduled on your device. You can choose discreet notifications that hide sensitive wording on the lock screen. We do not use push notifications."
      ]
    },
    {
      "title": "No accounts, no tracking, no ads",
      "paragraphs": [
        "The current version of Ayso has no online accounts, no analytics, crash reporting or advertising SDKs and makes no network requests of its own. It does not track you. If we add optional analytics or crash reports in a future version, they will be off by default, require your consent and be described here before release.",
        "Ayso provides general information and is not a medical device or a substitute for professional medical advice."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye",
        "See also the [General Privacy Notice](/privacy/) that applies to all MasterFabric apps."
      ]
    }
  ],
  "com.masterfabric.cannonmerge": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Cannon Merge Plus (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Cannon Merge Plus keeps your game data on your device and does not send it to our servers. The App handles:"
      ],
      "bullets": [
        "Content — Game progress: board, coins, wave, upgrades, Military Series, Codex, settings, a Remove Ads flag and last-played time (stored on your device)",
        "Content — Settings: language, sound and related preferences (stored on your device)",
        "Purchases — Product identifiers and entitlements for in-app purchases, received from Apple after you buy or restore (we never see your payment details)",
        "Advertising data — Only if you choose to watch a rewarded ad for energy: device and usage data collected by Google AdMob (see section 4). Energy level and refill time are stored on your device"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Verify purchases and unlock paid items",
        "Show an optional rewarded ad and grant energy when you finish it",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:",
        "The App includes the Google Mobile Ads (AdMob) SDK for one optional feature: you can choose to watch a rewarded video ad to refill energy. When an ad is requested or shown, Google may collect device and usage data such as your IP address, device model and OS, app version, ad interactions and, on iOS, the advertising identifier (IDFA) only if you allow tracking. The App does not show an App Tracking Transparency prompt, so the IDFA is not shared. Energy is granted only after Google confirms you earned the reward. Other ad placements (interstitials and other rewarded slots) are local stubs that send no data. The App has no Firebase, analytics or crash-reporting SDK active; game-balance settings come from a file bundled with the App."
      ],
      "bullets": [
        "Google AdMob (Google LLC) — Serves optional rewarded video ads for energy and measures ad delivery and fraud. Privacy policy: https://policies.google.com/privacy · How Google uses data from partner apps: https://policies.google.com/technologies/partner-sites",
        "Apple App Store — Processes in-app purchases (Remove Ads and coin packs) and restore requests. We never see your payment details. Privacy policy: https://www.apple.com/legal/privacy/"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Your game progress and energy stay on your device and is removed when you delete the app. Apple keeps purchase records according to its policy."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. Delete the app to remove all local data. Restore Purchases in Settings asks Apple to restore entitlements you already bought. We hold no server-side copy of your game.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure.",
        "Payments are handled by Apple; we never see or store your card number."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Cannon Merge Plus is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "No accounts, no tracking, no ads",
      "paragraphs": [
        "Cannon Merge Plus has no accounts and no analytics or crash-reporting SDK, sends no game data to us, and does not track you across other companies' apps. The only third-party SDK is Google AdMob, used solely when you choose to watch a rewarded ad for energy. The App requests no camera, photos, microphone, location, notification or tracking permission. Buying Remove Ads through Apple removes ads where they apply. If a future version enables Firebase, analytics or other ad formats, we will update this policy before they are released."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.cubeliora": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Cubeliora (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Cubeliora keeps your game data on your device and does not send it to our servers. The App handles:"
      ],
      "bullets": [
        "Content — Hint balance, chosen theme and a list of purchase transaction IDs (stored on your device)"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Verify purchases and unlock paid features",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:"
      ],
      "bullets": [
        "Apple App Store — Processes in-app purchases of hint packs. We never see your payment details. Privacy policy: [https://www.apple.com/legal/privacy/](https://www.apple.com/legal/privacy/)"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "All data stays on your device and is removed when you delete the app. Purchase records are kept by Apple."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. Delete the app to remove all local data. We hold no server-side copy.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure.",
        "Payments are handled by Apple or Google; we never see or store your card number."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Cubeliora is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "No accounts, no tracking, no ads",
      "paragraphs": [
        "Cubeliora has no accounts, analytics, advertising or third-party SDKs, does not track you and sends no data to us. It requests no device permissions."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye",
        "See also the [General Privacy Notice](/privacy/) that applies to all MasterFabric apps."
      ]
    }
  ],
  "com.masterfabric.farmmerge": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Farm Merge Valley (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Farm Merge Valley keeps your game data on your device and does not send it to our servers. The App handles:"
      ],
      "bullets": [
        "Content — Game progress: board, coins, gems, energy, orders, fields, land, daily rewards, missions, achievements and tutorial flags (stored on your device)",
        "Content — Settings: language, sound, haptics and your notification choice (stored on your device)",
        "Purchases — Product identifiers and entitlements for in-app purchases, received from Apple after you buy or restore (we never see your payment details)"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Verify purchases and unlock paid items",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:",
        "The current version does not include advertising, analytics or crash-reporting SDKs. In-app analytics and rewarded-ad hooks are local stubs: they write only to the device log and do not send data off your device."
      ],
      "bullets": [
        "Apple App Store — Processes in-app purchases (gem packs, a starter pack and a no-ads product) and restore requests. We never see your payment details. Privacy policy: https://www.apple.com/legal/privacy/"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "All game data stays on your device and is removed when you delete the app, or when you use Settings → Reset farm (settings can be kept when you reset progress). Apple keeps purchase records according to its policy."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. In the app: Settings → Reset farm erases your progress. Deleting the app removes everything else. We hold no server-side copy.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure.",
        "Payments are handled by Apple; we never see or store your card number."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Farm Merge Valley is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "Notifications",
      "paragraphs": [
        "Energy-full and crop-ready reminders are local notifications scheduled on your device, only if you turn Notifications on in Settings and grant permission. We do not use push notifications."
      ]
    },
    {
      "title": "No accounts, no tracking, no ads",
      "paragraphs": [
        "Farm Merge Valley has no accounts, no analytics, crash reporting or advertising SDKs, sends no game data to us, and does not track you. It requests no camera, photos, microphone or location permission. If a future version adds online features, advertising or analytics, we will update this policy before they are released."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.fitness": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Flex (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Flex is an account-based fitness app. The App handles:",
        "Flex does not currently include an advertising, analytics or crash-reporting SDK. Privacy toggles for analytics and Health Connect are stored as preferences; the current version does not send analytics and does not read Apple Health or Health Connect."
      ],
      "bullets": [
        "Account — Name, username, e-mail, date of birth, sign-in method (e-mail and password, Google or Sign in with Apple) and a unique account identifier",
        "Account — An optional profile photo, uploaded to our file storage under your account; an optional app-lock / two-factor (TOTP) secret, stored in the device's secure storage",
        "Content — Profile and goals you enter: height, weight and target weight, activity level, objective, diet, allergies, equipment, rest days and calorie or macro targets",
        "Content — Workouts, programmes, session history, personal records, daily logs, meals and water, weight entries and progress insights",
        "Content — Meal photos you attach, kept in the App's documents folder on your device (they are not uploaded to our servers)",
        "Content — AI Coach conversations, personalization choice and engine preference, stored in the device's secure storage and scoped to your account",
        "Content — Training buddies and circle members you add, and invite codes you create or use",
        "Content — Notification and privacy preferences you set in the App",
        "Device & usage — App Check tokens used to confirm that requests come from the genuine App",
        "Device & usage — Optional barcode lookups: the barcode is sent to Open Food Facts to retrieve product nutrition, which you may then save as a meal"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App, including training, nutrition, progress and the AI Coach",
        "Personalise coaching when you leave AI personalization on",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:",
        "On-device AI models (GGUF files) may download from our Firebase Storage after you sign in, when the device has enough memory and storage. You can also use a local rule-based engine without sending a coach turn to Gemini."
      ],
      "bullets": [
        "Firebase (Google) — Authentication, Firestore database, Cloud Storage (profile photos and on-device AI model files), Cloud Functions and App Check. Privacy policy: https://policies.google.com/privacy",
        "Firebase AI Logic / Gemini (Google) — Used for online AI Coach turns. No Gemini API key is embedded in the App. Requests go through an allowlist and identifier redaction. Privacy policy: https://policies.google.com/privacy",
        "Google Sign-In — Optional sign-in. Privacy policy: https://policies.google.com/privacy",
        "Sign in with Apple — Optional sign-in. Privacy policy: https://www.apple.com/legal/privacy/",
        "Open Food Facts — Optional barcode product lookup at world.openfoodfacts.org. Privacy policy: https://world.openfoodfacts.org/privacy",
        "Apple or Google speech recognition — Used only if you grant microphone and speech-recognition permission to dictate a question or a meal. The App does not keep the recording. This may be processed by the operating system or its provider, and is not guaranteed to stay on the device."
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising.",
        "If you add a training buddy or circle member, they can see the information that feature shares with them (for example a display name and a joint session). You can remove those links in the App.",
        "We otherwise share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Account and training data are kept while the account is active. AI Coach conversations are kept until you delete the current chat, delete all coach history in Profile → Privacy & Data, or delete your account. There is no automatic expiry for coach history.",
        "Profile → Privacy & Data → Delete my account removes your Firebase authentication record, your user profile, and the weight, day, meal, workout and programme records under your account, then clears on-device AI history and local caches. Uninstalling the App removes local meal photos and secure storage on that device."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. In the app: edit your profile, turn AI personalization off, choose a local or automatic coach engine, delete coach history, copy a JSON export of your profile to the clipboard, and delete your account. You can also turn notification types on or off.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Account data is stored with our providers. AI conversations and two-factor secrets use the device's secure storage. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Flex is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "Health data and consent",
      "paragraphs": [
        "Information about your body, diet, allergies, weight and workouts is health data, a special category under KVKK and GDPR. It is processed to provide the App, based on your use of these features and, where required, your consent. We do not sell this data or use it for advertising.",
        "The current version does not connect to Apple Health or Health Connect, even if the Health Connect preference is shown in Privacy & Data.",
        "Flex provides general fitness information and is not a medical device or a substitute for professional medical advice."
      ]
    },
    {
      "title": "Permissions and notifications",
      "paragraphs": [
        "Camera: to take a profile photo or scan a product barcode. Photo library: to choose a profile or meal photo. Microphone and speech recognition: optional, to dictate a coach question or a meal; recordings are not kept in the App. Notifications are local reminders you choose (for example training or meals). We do not use remote push as a marketing channel. The App does not ask for location or contacts."
      ]
    },
    {
      "title": "No tracking, no ads",
      "paragraphs": [
        "Flex does not show third-party ads and does not track you across other apps or websites for advertising. The current version has no in-app purchase SDK."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.foxie": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Foxie (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Foxie is an account-based study app for students, teachers and parents. The App handles:",
        "The App does not knowingly collect health or biometric data. Reminders are scheduled as local notifications on your device."
      ],
      "bullets": [
        "Account — The name and e-mail address you provide, your sign-in method (e-mail and password, Google or Sign in with Apple), and a unique account identifier",
        "Account — Your role (student, teacher or parent) and profile settings",
        "Content — An optional profile photo you take with the camera or pick from your library, stored in our file storage under your account",
        "Content — For students: target exam, goals, study tasks, calendar events, practice-exam results, study-time records (including Pomodoro sessions) and related progress summaries",
        "Content — Connection records between a student and a teacher or parent, created only after the student accepts an invitation, and the access scope the student chooses",
        "Content — Private study notes a teacher writes about a connected student (visible only to the teacher who wrote them)",
        "Content — Messages and drafts you exchange with the Foxie assistant, if you use it",
        "Device & usage — Crash reports in production builds (device and diagnostic data). We do not send your name, e-mail or account identifier with those reports",
        "Device & usage — App Check tokens used to confirm that requests come from the genuine App"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App, including plans, exam tracking, connections and the assistant",
        "Let a teacher or parent see only the student data the student has agreed to share",
        "Fix bugs, keep the App secure and improve performance",
        "Enforce usage limits and protect the service against abuse",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:"
      ],
      "bullets": [
        "Firebase (Google) — Authentication, Firestore database, Cloud Storage, Cloud Functions (region europe-west1), Crashlytics and App Check. Privacy policy: https://policies.google.com/privacy",
        "Google Sign-In — Optional sign-in. Privacy policy: https://policies.google.com/privacy",
        "Sign in with Apple — Optional sign-in. Privacy policy: https://www.apple.com/legal/privacy/",
        "NVIDIA API Catalog — Used only when you (or a connected teacher or parent, about a connected student) use the Foxie assistant. The model receives the study context needed to answer, not your name, e-mail or account identifier. Privacy policy: https://www.nvidia.com/en-us/about-nvidia/privacy-policy/"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising.",
        "A teacher or parent can see a student's information only through a connection the student has accepted, and only within the scope the student chose (for example exams, tasks or activity). A parent can view, not edit. A teacher's private notes about a student are not shown to the student or the parent. Assistant chats belong to the person who started them; a teacher or parent cannot read a student's assistant conversations. When a connection is removed, that access ends, including related assistant chats and photo links.",
        "We otherwise share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Your account and study data are kept while the account is active. Assistant conversations expire after 30 days, proposals and turn receipts after 24 hours, and usage counters after 90 days. You can delete an assistant conversation in the App.",
        "Deleting your account (Settings → Delete account, after re-authentication) removes your profile, sub-collections, connections, profile photo and authentication record, and cancels open teacher tasks. Local caches on the device (for example offline tasks and Pomodoro history) are cleared with the App data when you sign out or uninstall."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. In the app: edit your profile, manage or remove connections, delete assistant conversations, and Settings → Delete account. The current version does not include an in-app data-export button; e-mail privacy@masterfabric.co to request a copy.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Account data is stored with our providers, with access limited by security rules and App Check on assistant requests. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Foxie is not directed to children under 13. We do not knowingly collect their data. If you believe a child under 13 has provided us information, contact privacy@masterfabric.co and we will delete it.",
        "The App is also used by students preparing for exams such as LGS, who may be around or above 13. There is currently no age gate or separate parental-consent flow in the App. A parent can follow a student only after the student accepts a connection."
      ]
    },
    {
      "title": "Permissions and notifications",
      "paragraphs": [
        "Camera and photo library (iOS): only to take or choose an optional profile photo. Notifications: optional local study and lesson reminders on your device; we do not use remote push. The App does not ask for location, contacts or microphone."
      ]
    },
    {
      "title": "The Foxie assistant",
      "paragraphs": [
        "The assistant runs on our servers. It may read the study data needed to answer (for example exam results or tasks). It cannot write to your account unless you confirm a proposed plan or task change in the App. Messages that involve self-harm, child safety or health risk are not sent to the model. Using the assistant sends the relevant context to the model provider listed above."
      ]
    },
    {
      "title": "No tracking, no ads",
      "paragraphs": [
        "Foxie does not show third-party ads and does not track you across other apps or websites for advertising. Crash reports are used only to fix the App."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.holerush": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Hole Rush Plus (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Hole Rush Plus keeps your game data on your device. The App handles:",
        "The current release is built without a Firebase configuration file, so the App runs fully offline and does not create an identifier or send progress off your device."
      ],
      "bullets": [
        "Content — Game progress: coins, level, best score, upgrades, rims, trails, missions and daily-reward status (stored on your device)",
        "Content — Settings: language, sound, music and vibration (stored on your device)",
        "Device & usage — When the Firebase configuration is enabled: an anonymous user identifier, and the coins, level and upgrade ranks needed to sync progress; device and network information used by Firebase to deliver game-balance settings (Remote Config)"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Sync progress and deliver game-balance settings when Firebase is enabled",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "When the Firebase configuration is enabled, the App uses the following providers. They process data under their own privacy policies:",
        "The current version has no advertising or in-app purchases, and no analytics or crash-reporting SDK beyond the optional Firebase services above."
      ],
      "bullets": [
        "Firebase (Google) — Optional anonymous authentication, Firestore progress sync (`players/{id}`) and Remote Config for game-balance settings. The App also works fully offline without this configuration. Privacy policy: https://policies.google.com/privacy"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Game progress lives on your device and is removed when you delete the app. If Firebase is enabled, the anonymous identifier and synced coins, level and upgrades are kept by Google according to its policy until you ask us to delete them."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. Delete the app to remove all local data. For any server-side identifier created when Firebase is enabled, e-mail privacy@masterfabric.co and we will help.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Hole Rush Plus is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "No tracking, no ads",
      "paragraphs": [
        "Hole Rush Plus does not track you across other apps or websites, does not use advertising identifiers and shows no third-party ads. It declares no tracking in its Apple privacy manifest. The current version has no accounts you sign in to, and no in-app purchases."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.videostudio": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use MF Studio (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "MF Studio keeps your projects on your Mac and does not send them to our servers. The App handles:",
        "The App has no account and does not upload your recordings or projects to us."
      ],
      "bullets": [
        "Content — Recording and editing projects you create (video, audio, captions, style templates and related project files), stored in the location you choose or in the App's Application Support folder on your Mac",
        "Content — Language and editor preferences (stored on your Mac)",
        "Content — Optional captions you generate locally with a whisper.cpp executable and model you select; this runs offline on your Mac",
        "Content — Screen, window or region recordings, microphone audio and camera or capture-device video, only when you choose those sources and grant permission"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App does not share data with third-party services."
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified).",
        "Files you export or share yourself leave your Mac under your control; we cannot delete copies you have already shared."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Projects, recordings and captions stay on your Mac until you delete them or uninstall the App. Temporary files used during capture, transcription or export are created in the system temporary directory and can be removed when the work finishes. If you back up your Mac, project files in those folders may be included in that backup."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. You can delete a project in the App or in Finder. Deleting the App removes Application Support data we created; files you saved elsewhere remain until you remove them. We hold no server-side copy.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your projects are kept in ordinary files on your Mac, secured by the operating system's file permissions and any disk encryption you have enabled. We cannot guarantee absolute security, since no method of storage or transmission is completely secure.",
        "A recording may include anything visible on the display, window or region you select, and anything picked up by a microphone you enable. You are responsible for what you capture and for any permissions owed to other people who appear in a recording."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "MF Studio is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "Permissions",
      "paragraphs": [
        "Screen Recording: only the display, window or region you choose when you start a recording. Microphone: only when you enable it for a recording. Camera or a connected capture device: only when you choose it as a source. Event capture can also require Accessibility or Input Monitoring permission from macOS. The App cannot grant these permissions on your behalf. The App does not ask for contacts or location."
      ]
    },
    {
      "title": "No accounts, no tracking, no ads",
      "paragraphs": [
        "MF Studio has no accounts, analytics, crash reporting, advertising or in-app purchases, sends no data to us, does not track you and makes no network requests of its own for those purposes. Caption generation, when you use it, runs locally with tools you provide."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye"
      ]
    }
  ],
  "com.masterfabric.stacktower": [
    {
      "title": "About this policy",
      "paragraphs": [
        "This Privacy Policy explains how MasterFabric Information Technology Inc. (\"we\", \"us\") handles information when you use Stack Tower (the \"App\"). By using the App you agree to the practices described here. If you do not agree, please do not use the App."
      ]
    },
    {
      "title": "Information we collect",
      "paragraphs": [
        "Stack Tower keeps your game data on your device and does not send it to our servers. The App handles:"
      ],
      "bullets": [
        "Content — Game progress: high score, coins, upgrades, missions, daily reward status and settings (stored on your device)",
        "Device & usage — Language and sound/vibration preferences (stored on your device)",
        "Device & usage — When the Firebase configuration is enabled: an app-instance identifier, device model, OS version and IP address, used to deliver game settings"
      ]
    },
    {
      "title": "How we use information",
      "paragraphs": [
        "We use information only to:"
      ],
      "bullets": [
        "Provide and maintain the features of the App",
        "Fix bugs, keep the App secure and improve performance",
        "Respond to your support requests",
        "Comply with legal obligations"
      ]
    },
    {
      "title": "Third-party services",
      "paragraphs": [
        "The App uses the following providers. They process data under their own privacy policies:"
      ],
      "bullets": [
        "Firebase (Google) — Delivers remote game-balance settings (Remote Config); the app also works fully offline. Privacy policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)"
      ]
    },
    {
      "title": "Sharing and disclosure",
      "paragraphs": [
        "We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified)."
      ]
    },
    {
      "title": "Data retention",
      "paragraphs": [
        "Game progress lives only on your device and is removed when you delete the app. Firebase technical identifiers are kept by Google according to its policy."
      ]
    },
    {
      "title": "Your choices and rights",
      "paragraphs": [
        "Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. Delete the app to remove all local data. For any server-side identifier, e-mail privacy@masterfabric.co and we will help.",
        "You can also write to privacy@masterfabric.co. We reply within 30 days."
      ]
    },
    {
      "title": "Security",
      "paragraphs": [
        "Your game data is kept in the app's protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure."
      ]
    },
    {
      "title": "Children's privacy",
      "paragraphs": [
        "Stack Tower is not directed to children under 13. We do not knowingly collect their data. If you believe a child has provided us information, contact privacy@masterfabric.co and we will delete it."
      ]
    },
    {
      "title": "No tracking, no ads",
      "paragraphs": [
        "Stack Tower does not track you across other apps or websites, does not use advertising identifiers and shows no third-party ads. It declares no tracking in its Apple privacy manifest."
      ]
    },
    {
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy. The \"Last updated\" date above shows the latest version, and material changes will be announced in the App or on this page."
      ]
    },
    {
      "title": "Contact us",
      "paragraphs": [
        "MasterFabric Information Technology Inc.",
        "Email: privacy@masterfabric.co",
        "Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye",
        "See also the [General Privacy Notice](/privacy/) that applies to all MasterFabric apps."
      ]
    }
  ]
}
