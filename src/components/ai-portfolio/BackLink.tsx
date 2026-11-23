import Link from "next/link";

export function BackLink({ href = "/ai-portfolio/", children }: { href?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="label group inline-flex items-center gap-2 text-ap-ink-soft transition-colors hover:text-ap-ink"
    >
      <span aria-hidden className="transition-transform group-hover:-translate-x-1">
        &larr;
      </span>
      {children}
    </Link>
  );
}
