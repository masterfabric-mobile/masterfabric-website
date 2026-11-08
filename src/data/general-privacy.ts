import { PolicySection } from '@/lib/privacy-policy'

/** Umbrella notice that applies to every MasterFabric app. App pages add app-specific detail. */
export const GENERAL_PRIVACY = {
  version: '1.0',
  effectiveDate: '2026-11-08',
}

export const generalPrivacySections: PolicySection[] = [
  {
    title: 'Scope and data controller',
    paragraphs: [
      'This General Privacy Notice applies to all mobile applications published by MasterFabric Information Technology Inc. ("MasterFabric", "we"). Each app also has its own policy listed on this page, which describes the data that app handles. If the two differ, the app policy prevails for that app.',
      'Data controller: MasterFabric Information Technology Inc., Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye. Contact: privacy@masterfabric.co.',
    ],
  },
  {
    title: 'Principles we follow',
    bullets: [
      'Data minimisation: we collect only what an app needs to work',
      'Purpose limitation: data is used only for the purposes stated in the app policy',
      'We never sell personal data',
      'Payment card data is handled only by Apple or Google, never by us',
      'Access to data is limited to staff and processors who need it',
    ],
  },
  {
    title: 'Legal bases',
    paragraphs: [
      'Under the Turkish Personal Data Protection Law No. 6698 (KVKK) and, where applicable, the EU/UK GDPR, we process data based on: performance of a contract (providing the app), legitimate interests (security, bug fixing, improvement), legal obligations, and your explicit consent (for example optional analytics or notifications). You can withdraw consent at any time without affecting earlier processing.',
    ],
  },
  {
    title: 'International transfers',
    paragraphs: [
      'Some providers (for example Google/Firebase or Apple) process data outside Türkiye or the EEA. Where required we rely on adequate-protection decisions, standard contractual clauses or your explicit consent.',
    ],
  },
  {
    title: 'Your rights',
    bullets: [
      'Learn whether your data is processed and request information',
      'Access, correct or delete your data',
      'Object to processing or restrict it, and request portability',
      'Withdraw consent',
      'Complain to the Personal Data Protection Authority (KVKK) or your local data protection authority',
    ],
    paragraphs: [
      'To exercise a right, e-mail privacy@masterfabric.co from the address linked to your account, naming the app. We reply within 30 days. App-specific deletion steps are in each app policy.',
    ],
  },
  {
    title: "Children",
    paragraphs: [
      'Our apps are not directed to children under the minimum age stated in each app policy (13 by default). We delete data we learn was collected from a child below that age.',
    ],
  },
  {
    title: 'Security and breaches',
    paragraphs: [
      'We apply technical and organisational measures such as encryption in transit and access controls. If a breach affects your rights, we notify you and the competent authority within the legally required time.',
    ],
  },
  {
    title: 'Changes',
    paragraphs: [
      'We version every policy. The current version and history appear on this page and on each app page. Material changes are announced in the app or on this site.',
    ],
  },
]
