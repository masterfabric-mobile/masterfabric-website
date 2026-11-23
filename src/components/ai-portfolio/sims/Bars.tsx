"use client";

import { motion, useReducedMotion } from "motion/react";

export interface BarRow {
  label: string;
  value: number;
  text: string;
  tone?: "accent" | "muted" | "warn";
}

const TONE = {
  accent: "#3b82f6",
  muted: "rgba(148,163,184,0.55)",
  warn: "#d97706",
} as const;

/**
 * Horizontal bars that grow once when scrolled into view. Bar length is
 * linear in `value` from zero; `secondsPerUnit` (optional) makes the growth
 * time proportional to the value, so the bars race at one shared speed.
 */
export function Bars({
  rows,
  max,
  secondsPerUnit,
  replay = 0,
}: {
  rows: BarRow[];
  max?: number;
  secondsPerUnit?: number;
  replay?: number;
}) {
  const reduced = !!useReducedMotion();
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <ul className="flex flex-col gap-2.5" key={replay}>
      {rows.map((r, i) => {
        const pct = top > 0 ? (r.value / top) * 100 : 0;
        const duration = reduced ? 0 : secondsPerUnit ? r.value * secondsPerUnit : 1;
        return (
          <li key={r.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[7.5rem_1fr]">
            <span className="text-[13px] text-ap-ink-soft">{r.label}</span>
            <div className="flex items-center gap-2">
              <div className="sim-track">
                <motion.div
                  className="sim-fill"
                  style={{ background: TONE[r.tone ?? "accent"] }}
                  initial={{ width: reduced ? `${pct}%` : "0%" }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration,
                    delay: reduced || secondsPerUnit ? 0 : i * 0.12,
                    ease: secondsPerUnit ? "linear" : [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span className="min-w-[4.5rem] text-right text-[13px] font-medium tabular-nums text-ap-ink">
                {r.text}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** A row of dots: `bad` of `total` are flagged. Counts come from the caller. */
export function DotRow({
  label,
  total,
  bad,
  summary,
  badTone = "warn",
}: {
  label: string;
  total: number;
  bad: number;
  summary: string;
  badTone?: "warn" | "accent";
}) {
  const reduced = !!useReducedMotion();
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px]">
        <span className="text-ap-ink-soft">{label}</span>
        <span className="font-medium tabular-nums text-ap-ink">{summary}</span>
      </div>
      <div className="flex flex-wrap gap-1" aria-hidden>
        {Array.from({ length: total }, (_, i) => {
          const flagged = i >= total - bad;
          return (
            <motion.span
              key={i}
              className="sim-dot"
              style={{
                background: flagged
                  ? badTone === "warn"
                    ? "#d97706"
                    : "#3b82f6"
                  : "rgba(148,163,184,0.32)",
              }}
              initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : i * 0.02 }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Legend({ items }: { items: { color: string; text: string }[] }) {
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ap-ink-faint">
      {items.map((i) => (
        <span key={i.text} className="inline-flex items-center gap-1.5">
          <span className="sim-dot" style={{ background: i.color }} aria-hidden />
          {i.text}
        </span>
      ))}
    </p>
  );
}

/** Segmented control used by every multi-view card. */
export function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { id: T; text: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="sim-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.text}
        </button>
      ))}
    </div>
  );
}
