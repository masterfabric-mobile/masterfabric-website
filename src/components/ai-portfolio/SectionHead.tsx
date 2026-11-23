import type { ReactNode } from "react";
import { Reveal } from "@/components/ai-portfolio/Reveal";

export function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <p className="label text-ap-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ap-ink sm:text-5xl">
          {title}
        </h2>
        {children && <p className="mt-4 text-ap-ink-soft">{children}</p>}
      </div>
    </Reveal>
  );
}
