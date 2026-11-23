"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SimCard, Captions } from "./SimCard";
import { Bars } from "./Bars";
import { lakehouseScale as s, maintenance as m, REPO } from "./data";

const BAR_X = 58;
const BAR_MAX = 205;
const ROW_H = 16;

interface Row {
  title: string;
  /** Per endpoint: value in the chart's own unit, and its printed label. */
  values: readonly [number, number];
  labels: [string, string];
}

const ROWS: Row[] = [
  {
    title: "Raw rows",
    values: s.rows,
    labels: [`${s.rows[0]} M`, `${s.rows[1]} M`],
  },
  {
    title: "Total pipeline time",
    values: s.seconds,
    labels: [`${s.seconds[0]} s`, `${s.seconds[1]} s`],
  },
  {
    title: "Throughput, bronze to gold",
    values: s.throughputK,
    labels: [`about ${s.throughputK[0]}k rows/s`, `${s.throughputK[1]}k rows/s`],
  },
];

export function ScaleChart() {
  const reduced = !!useReducedMotion();
  const [run, setRun] = useState(0);
  const endpoints = [`Scale ${s.scales[0]}`, `Scale ${s.scales[1]}`] as const;

  return (
    <SimCard
      title="Scale-up: 8× the data, 2.1× the time"
      repo={REPO.lakehouse}
      note="Simulation of the measured series: bars fill to the two measured endpoints only. No points in between were measured, so none are drawn."
    >
      <svg
        key={run}
        viewBox="0 0 360 232"
        className="w-full rounded-xl border border-ap-line bg-[#f8fafc]"
        role="img"
        aria-label={`Bars for scale ${s.scales[0]} and scale ${s.scales[1]}: rows ${s.rows[0]} M to ${s.rows[1]} M, pipeline time ${s.seconds[0]} s to ${s.seconds[1]} s, throughput about ${s.throughputK[0]}k to ${s.throughputK[1]}k rows per second.`}
      >
        {ROWS.map((row, g) => {
          const y0 = 14 + g * 72;
          return (
            <g key={row.title}>
              <text x="10" y={y0 + 6} fill="#475569" fontSize="11" fontWeight="600">
                {row.title}
              </text>
              {[0, 1].map((e) => {
                const y = y0 + 16 + e * (ROW_H + 8);
                const width = (row.values[e] / Math.max(...row.values)) * BAR_MAX;
                return (
                  <g key={e}>
                    <text x="10" y={y + 12} fill="#64748b" fontSize="10">
                      {endpoints[e]}
                    </text>
                    <motion.rect
                      x={BAR_X}
                      y={y}
                      height={ROW_H}
                      rx="4"
                      fill={e === 0 ? "rgba(148,163,184,0.55)" : "#3b82f6"}
                      initial={{ width: reduced ? width : 0 }}
                      animate={{ width }}
                      transition={{
                        duration: reduced ? 0 : 1.1,
                        delay: reduced ? 0 : g * 0.35 + e * 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <motion.text
                      y={y + 12}
                      fill="#0f172a"
                      fontSize="10.5"
                      initial={{ x: BAR_X + (reduced ? width : 0) + 6, opacity: reduced ? 1 : 0 }}
                      animate={{ x: BAR_X + width + 6, opacity: 1 }}
                      transition={{
                        duration: reduced ? 0 : 1.1,
                        delay: reduced ? 0 : g * 0.35 + e * 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {row.labels[e]}
                    </motion.text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ap-ink-soft">
          <span className="text-2xl font-semibold tracking-[-0.03em] text-ap-ink">
            {s.dataX}×
          </span>{" "}
          the data costs{" "}
          <span className="text-2xl font-semibold tracking-[-0.03em] text-ap-accent">
            {s.timeX}×
          </span>{" "}
          the time
        </p>
        {!reduced && (
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="min-h-11 rounded-full border border-ap-line-strong px-5 text-sm text-ap-ink transition-colors hover:border-ap-accent/60"
          >
            Replay
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="label text-ap-ink-faint">
          Scheduled maintenance, one-day query after {m.batches} batches
        </p>
        <Bars
          replay={run}
          rows={[
            { label: "Unmaintained", value: m.queryMs.unmaintained, text: `${m.queryMs.unmaintained} ms`, tone: "warn" },
            { label: "Maintained", value: m.queryMs.maintained, text: `${m.queryMs.maintained} ms` },
          ]}
        />
        <p className="text-[13px] text-ap-ink-soft">
          Files (data + delete): {m.files.unmaintained} vs {m.files.maintained} · same {m.result}.
        </p>
      </div>

      <Captions items={[...s.captions, m.caption]} label="Measured · content/data" />
    </SimCard>
  );
}

export default ScaleChart;
