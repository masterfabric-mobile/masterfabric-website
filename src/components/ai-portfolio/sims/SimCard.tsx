import type { ReactNode } from "react";
import Link from "next/link";

/** Shared frame: title, a visible "Simulation" tag, body, measured captions. */
export function SimCard({
  title,
  repo,
  note,
  children,
}: {
  title: string;
  repo: { slug: string; title: string };
  note: string;
  children: ReactNode;
}) {
  return (
    <article className="card flex h-full min-w-0 flex-col gap-4 p-4 sm:p-5 md:p-6">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="sim-tag label">Simulation</span>
          <Link
            href={`/ai-portfolio/${repo.slug}/`}
            className="label text-ap-ink-soft transition-colors hover:text-ap-accent"
          >
            {repo.title} &rarr;
          </Link>
        </div>
        <h3 className="text-lg font-medium tracking-tight text-ap-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ap-ink-faint">{note}</p>
      </header>
      {children}
    </article>
  );
}

export function Captions({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="mt-auto">
      <p className="label mb-2 text-ap-ink-faint">{label}</p>
      <ul className="sim-cap flex flex-col gap-2 text-[13px] leading-relaxed text-ap-ink-soft">
        {items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
