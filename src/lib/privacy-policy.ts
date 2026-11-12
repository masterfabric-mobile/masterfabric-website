import { AppConfig, DEFAULT_OPERATOR } from '@/data/apps'

export type PolicySection = { title: string; paragraphs?: string[]; bullets?: string[] }

const list = (items?: string[]) => (items && items.length ? items : undefined)

/** Builds the policy text from one app's factual config. Edit wording here once for all apps. */
export function buildPolicy(app: AppConfig): PolicySection[] {
  const operator = app.operator ?? DEFAULT_OPERATOR
  const d = app.data
  const collected: string[] = [
    ...(d.account ?? []).map((x) => `Account — ${x}`),
    ...(d.userContent ?? []).map((x) => `Content — ${x}`),
    ...(d.device ?? []).map((x) => `Device & usage — ${x}`),
    ...(d.location ? [`Location — ${d.location}`] : []),
  ]

  const sections: PolicySection[] = [
    {
      title: 'About this policy',
      paragraphs: [
        `This Privacy Policy explains how ${operator} ("we", "us") handles information when you use ${app.name} (the "App"). By using the App you agree to the practices described here. If you do not agree, please do not use the App.`,
      ],
    },
    {
      title: 'Information we collect',
      paragraphs: app.localOnly
        ? [`${app.name} keeps your game data on your device and does not send it to our servers. The App handles:`]
        : [`We collect only what is needed to run ${app.name}:`],
      bullets: list(collected) ?? ['The App does not collect personal information.'],
    },
    {
      title: 'How we use information',
      paragraphs: ['We use information only to:'],
      bullets: [
        'Provide and maintain the features of the App',
        'Fix bugs, keep the App secure and improve performance',
        'Respond to your support requests',
        ...(d.purchases ? ['Verify purchases and unlock paid features'] : []),
        'Comply with legal obligations',
      ],
    },
    {
      title: 'Third-party services',
      paragraphs: app.thirdParties.length
        ? ['The App uses the following providers. They process data under their own privacy policies:']
        : ['The App does not share data with third-party services.'],
      bullets: list(app.thirdParties.map((t) => `${t.name} — ${t.purpose}. Privacy policy: ${t.policyUrl}`)),
    },
    {
      title: 'Sharing and disclosure',
      paragraphs: [
        'We do not sell your personal information and do not use it for third-party advertising. We share information only with the service providers listed above, when required by law or to protect rights and safety, or in a merger or sale of our business (you would be notified).',
      ],
    },
    { title: 'Data retention', paragraphs: [app.retention] },
    {
      title: 'Your choices and rights',
      paragraphs: [
        `Depending on where you live (including under KVKK, GDPR and CCPA) you may request access, correction, deletion or portability of your data, or withdraw consent. ${app.deletion}`,
        `You can also write to ${app.contactEmail}. We reply within 30 days.`,
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        app.localOnly
          ? 'Your game data is kept in the app\'s protected storage on your device, secured by the operating system. Connections to our service providers use encryption in transit (TLS). We cannot guarantee absolute security, since no method of storage or transmission is completely secure.'
          : 'We use industry-standard safeguards such as encryption in transit and access controls. We cannot guarantee absolute security, since no method of storage or transmission is completely secure.',
        ...(d.purchases ? ['Payments are handled by Apple or Google; we never see or store your card number.'] : []),
      ],
    },
    {
      title: "Children's privacy",
      paragraphs: [
        `${app.name} is not directed to children under ${app.minAge}. We do not knowingly collect their data. If you believe a child has provided us information, contact ${app.contactEmail} and we will delete it.`,
      ],
    },
    ...(app.extraSections ?? []),
    {
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this policy. The "Last updated" date above shows the latest version, and material changes will be announced in the App or on this page.',
      ],
    },
    {
      title: 'Contact us',
      paragraphs: [
        `${operator}`,
        `Email: ${app.contactEmail}`,
        'Address: Hacı Bayram Mah. Mahmut Atalay Sk. L Blok No: 6 İç Kapı No: 227, Altındağ / Ankara, Türkiye',
      ],
    },
  ]
  return sections
}
