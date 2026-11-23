import Link from "next/link";
import Image from "next/image";
import type { Repo } from "@/data/ai-portfolio/repos";

export function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const hero = repo.images.find((img) => img.src.endsWith("/hero.png"));

  return (
    <article className="card hoverable group flex h-full flex-col overflow-hidden motion-reduce:hover:translate-y-0">
      <Link href={`/ai-portfolio/${repo.slug}/`} className="block" tabIndex={-1} aria-hidden>
        <div className="frame frame-hero border-b border-ap-line">
          {hero && (
            <Image
              src={hero.src}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="label text-ap-ink-faint">
          <span className="text-ap-accent">{String(index + 1).padStart(2, "0")}</span>{" "}
          &middot; {repo.sha} &middot; {repo.shaDate}
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ap-ink">
          <Link
            href={`/ai-portfolio/${repo.slug}/`}
            className="after:absolute after:inset-0 after:z-[3] after:content-['']"
          >
            {repo.title}
          </Link>
        </h3>
        <p className="text-[15px] leading-relaxed text-ap-ink-soft">{repo.tagline}</p>
        <div className="relative z-[4] mt-auto flex items-center justify-between border-t border-ap-line pt-4 text-sm text-ap-ink-soft">
          <span className="font-medium text-ap-ink transition-colors group-hover:text-ap-accent">
            Read the entry &rarr;
          </span>
          <a
            href={repo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ap-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
