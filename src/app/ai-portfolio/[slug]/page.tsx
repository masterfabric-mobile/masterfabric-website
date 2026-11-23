import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRepoBySlug, repoSlugs } from "@/data/ai-portfolio/repos";
import { createPageMetadata } from "@/lib/seo";
import { BackLink } from "@/components/ai-portfolio/BackLink";
import { Reveal } from "@/components/ai-portfolio/Reveal";

export function generateStaticParams() {
  return repoSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const { slug } = params;
  const repo = getRepoBySlug(slug);
  if (!repo) return {};
  return createPageMetadata({
    title: `${repo.title.replace("MasterFabric · ", "")} — AI-Portfolio`,
    description: repo.tagline,
    path: `/ai-portfolio/${repo.slug}/`,
  });
}

export default function RepoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const repo = getRepoBySlug(slug);
  if (!repo) notFound();

  const hero = repo.images.find((img) => img.src.endsWith("/hero.png"));
  const gallery = repo.images.filter((img) => img !== hero);

  const h2 = "text-3xl font-semibold tracking-[-0.03em] text-ap-ink sm:text-4xl";

  return (
    <div className="wrap pb-24 pt-10 md:pt-14">
      <BackLink>AI-Portfolio</BackLink>

      <Reveal>
        <header className="prose-col mt-8 text-center">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ap-ink sm:text-5xl">
            {repo.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ap-ink-soft">{repo.tagline}</p>
          <div className="label mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-ap-ink-faint">
            <span>
              sha <span className="text-ap-ink">{repo.sha}</span>
            </span>
            <span>&middot;</span>
            <span>snapshot {repo.shaDate}</span>
            <span>&middot;</span>
            <a
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ap-ink-soft transition-colors hover:text-ap-accent"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </header>
      </Reveal>

      {hero && (
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="card overflow-hidden">
            <div className="frame frame-hero">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      )}

      <Reveal className="prose-col mt-16">
        <section>
          <h2 className={h2}>Overview</h2>
          <p className="mt-5 leading-relaxed text-ap-ink-soft">{repo.summary}</p>
        </section>
      </Reveal>

      <section className="prose-col mt-16">
        <Reveal>
          <h2 className={h2}>Key measured results</h2>
        </Reveal>
        <ul className="mt-6 flex flex-col gap-3">
          {repo.keyResults.map((result, i) => (
            <li key={i}>
              <Reveal y={16} className="flex gap-4 card p-5 text-ap-ink-soft">
                <span className="label pt-1.5 text-ap-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{result}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {repo.limitations.length > 0 && (
        <section className="prose-col mt-16">
          <Reveal>
            <h2 className={h2}>Honest limitations</h2>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {repo.limitations.map((limitation, i) => (
              <li key={i}>
                <Reveal y={16} className="flex gap-4 border-l-2 border-ap-primary/50 pl-5 text-ap-ink-soft">
                  <span className="leading-relaxed">{limitation}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className={`${h2} text-center`}>Screenshots &amp; diagrams</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {gallery.map((img) => (
              <Reveal key={img.src}>
                <figure className="card h-full overflow-hidden">
                  <div className="frame border-b border-ap-line">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="p-4 text-sm leading-relaxed text-ap-ink-faint">
                    {img.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}


      <div className="mt-20 border-t border-ap-line pt-8 text-center">
        <BackLink>Back to AI-Portfolio</BackLink>
      </div>
    </div>
  );
}
