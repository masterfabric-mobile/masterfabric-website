import Link from 'next/link'
import Container from '@/components/layout/container'
import HowWeWork from '@/components/pages/how-we-work'
import services from '@/data/services.json'

type Locale = keyof typeof services

export default function ServicesContent({ locale }: { locale: Locale }) {
  const content = services[locale]

  return (
    <Container>
      <header className="mt-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {content.hero.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
          {content.hero.title}
        </h1>
        <p className="mt-3 text-xl font-medium text-blue-600">{content.hero.subtitle}</p>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
          {content.hero.description}
        </p>
      </header>

      <section className="mt-16 grid gap-6 md:grid-cols-2" aria-label={locale === 'tr' ? 'Hedef müşteriler' : 'Who we build for'}>
        {content.audiences.map((audience) => (
          <article
            key={audience.title}
            className="rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-gray-300"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{audience.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{audience.description}</p>
            <ul className="mt-6 space-y-2">
              {audience.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {locale === 'tr' ? 'Ne üretiyoruz' : 'What we produce'}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {content.offerings.map((offering) => (
            <article
              key={offering.title}
              className="rounded-xl border border-gray-200/70 p-6 transition-all hover:-translate-y-0.5 hover:border-gray-300"
            >
              <h3 className="text-lg font-semibold text-gray-900">{offering.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{offering.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">{content.why.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{content.why.description}</p>
      </section>

      <HowWeWork locale={locale} content={content.processCompare} />

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {locale === 'tr' ? 'Sık sorulan sorular' : 'Frequently asked questions'}
        </h2>
        <dl className="mt-10 space-y-8">
          {content.faq.map((item) => (
            <div key={item.question}>
              <dt className="text-lg font-semibold text-gray-900">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 mb-16 rounded-2xl bg-slate-50 px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{content.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{content.cta.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            {content.cta.primary}
          </Link>
          <Link
            href="/about/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-white"
          >
            {content.cta.secondary}
          </Link>
        </div>
      </section>
    </Container>
  )
}
