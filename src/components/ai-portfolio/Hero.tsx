"use client";

import { motion } from "motion/react";
import { HeroVisual } from "@/components/ai-portfolio/hero/HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  repoCount,
  snapshotDate,
}: {
  repoCount: number;
  snapshotDate: string;
}) {
  const item = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease },
  });

  return (
    <section className="relative overflow-hidden pb-14 pt-6 md:pb-14 md:pt-10">
      <HeroVisual />
      <div className="wrap flex flex-col items-center text-center">
        <motion.p
          {...item(0)}
          className="label -mt-6 text-ap-ink-soft"
        >
          MasterFabric
        </motion.p>
        <motion.h1
          {...item(1)}
          className="mt-4 text-[clamp(2.4rem,6.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ap-ink"
        >
          AI-Portfolio
        </motion.h1>
        <motion.p
          {...item(2)}
          className="label mt-5 text-ap-accent"
        >
          Nine repositories &middot; one laptop &middot; measured, not marketed
        </motion.p>
        <motion.p
          {...item(3)}
          className="hx-lead mt-5 max-w-2xl text-lg leading-relaxed text-ap-ink-soft"
        >
          These nine public repositories are a{" "}
          <span className="hx-grad">hands-on</span>,{" "}
          <span className="hx-grad hx-ul">measured</span>,{" "}
          <span className="hx-chip">on-prem</span> and{" "}
          <span className="hx-chip">local-first</span> data and AI architecture
          portfolio. Each one runs on{" "}
          <strong className="hx-strong hx-ul">ordinary developer hardware</strong>,
          reports what was{" "}
          <strong className="hx-strong hx-ul">actually measured</strong> rather
          than estimated, and states its{" "}
          <span className="hx-grad hx-ul">limitations plainly</span> rather than
          presenting a finished platform.
        </motion.p>
        <motion.p
          {...item(4)}
          className="hx-note mt-3 max-w-xl text-[0.8125rem] leading-snug text-ap-ink-faint"
        >
          Figures below are read from a local snapshot of each
          repository&rsquo;s main branch (latest snapshot:{" "}
          <span className="hx-date">{snapshotDate}</span>). They can be
          refreshed whenever the source repositories change &mdash; see each
          repository&rsquo;s page for its exact{" "}
          <span className="hx-sha">commit SHA</span> and date.
        </motion.p>
        <motion.div
          {...item(5)}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#repositories"
            className="btn-primary group inline-flex min-w-[15rem] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            Explore {repoCount} repositories
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
              &darr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
