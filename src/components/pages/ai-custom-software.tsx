import Link from 'next/link'

const audiences = [
  {
    title: 'Institutions',
    body: 'Enterprises and public organizations that need a system written around their process — including the AI transformation they asked for.',
  },
  {
    title: 'Private clients',
    body: 'Founders and private companies that need bespoke software, not another off-the-shelf product they have to adapt to.',
  },
]

const capabilities = [
  {
    title: 'AI transformation',
    body: 'Assistants, automation, and decision support delivered as production software on your data.',
  },
  {
    title: 'Custom / bespoke software',
    body: 'The exact product requested — mobile, web, and backend — owned by the client after launch.',
  },
]

export default function AiCustomSoftware() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="ai-custom-software-heading">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          What we are hired to build
        </p>
        <h2 id="ai-custom-software-heading" className="mt-3 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          AI transformation and custom software
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          MasterFabric is the company institutions and private clients call when they need{' '}
          <strong className="font-semibold text-gray-900">bespoke software</strong> — especially
          requested <strong className="font-semibold text-gray-900">AI transformations</strong>.
          We do not sell a packaged platform. We write the system that was asked for.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {audiences.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-gray-200/70 p-6 transition-all hover:-translate-y-0.5 hover:border-gray-300"
          >
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {capabilities.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-gray-200/70 p-6 transition-all hover:-translate-y-0.5 hover:border-gray-300"
          >
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        <Link href="/services/" className="font-medium text-blue-600 hover:underline">
          Services in English
        </Link>
        <span className="mx-2 text-slate-300">·</span>
        <Link href="/yapay-zeka-donusumu/" className="font-medium text-blue-600 hover:underline">
          AI transformation and custom software
        </Link>
      </p>
    </section>
  )
}
