"use client";

import { useRef } from "react";
import { FONT, roundRect, useSimCanvas, type Frame } from "./useSimCanvas";
import { Captions, SimCard } from "./SimCard";
import { Bars } from "./Bars";
import { pipeline, watermark, REPO } from "./data";

interface Dot {
  lane: 0 | 1;
  /** Seconds since spawn. */
  age: number;
  jitter: number;
}

const SPAWN_PER_SEC = 5;
/** Dwell inside the engine box for the faster lane, in seconds. The slower
 *  lane dwells for the same multiple of the measured drain-time ratio. */
const BASE_DWELL = 0.45;
const TRAVEL = 0.9;

function box(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  sub: string,
  accent: boolean,
) {
  roundRect(ctx, x, y, w, h, 10);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.strokeStyle = accent ? "rgba(59,130,246,0.7)" : "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#0f172a";
  ctx.textAlign = "center";
  ctx.font = `600 12px ${FONT}`;
  ctx.fillText(label, x + w / 2, y + h / 2 - (sub ? 2 : -4));
  if (sub) {
    ctx.fillStyle = "#64748b";
    ctx.font = `500 10.5px ${FONT}`;
    ctx.fillText(sub, x + w / 2, y + h / 2 + 11);
  }
}

export function PipelineSim() {
  const dots = useRef<Dot[]>([]);
  const carry = useRef(0);

  const ratio = pipeline.sparkDrain / pipeline.flinkDrain;
  const dwell = [BASE_DWELL, BASE_DWELL * ratio] as const;

  const draw = ({ ctx, w, h, dt, reduced }: Frame) => {
    const nw = Math.min(78, w * 0.2);
    const nh = Math.min(46, h * 0.2);
    const laneY = [h * 0.3, h * 0.7] as const;
    const xK = 10 + nw / 2;
    const xI = w - 10 - nw / 2;
    const engW = Math.min(104, w * 0.27);
    const engH = Math.min(54, h * 0.24);
    const xE = w / 2;
    const aEnd = xE - engW / 2;
    const bStart = xE + engW / 2;

    // paths
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 5]);
    for (const y of laneY) {
      ctx.beginPath();
      ctx.moveTo(xK + nw / 2, y);
      ctx.lineTo(aEnd, y);
      ctx.moveTo(bStart, y);
      ctx.lineTo(xI - nw / 2, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // nodes
    box(ctx, xK - nw / 2, h / 2 - nh / 2 - 6, nw, nh + 12, "Kafka", "events", false);
    box(ctx, xI - nw / 2, h / 2 - nh / 2 - 6, nw, nh + 12, "Iceberg", "table", false);
    box(ctx, xE - engW / 2, laneY[0] - engH / 2, engW, engH, "Flink 2.2", "", true);
    box(ctx, xE - engW / 2, laneY[1] - engH / 2, engW, engH, "Spark 3.5", "", false);

    ctx.textAlign = "center";
    ctx.fillStyle = "#64748b";
    ctx.font = `500 10.5px ${FONT}`;
    ctx.fillText(`engine dwell ∝ ${pipeline.flinkDrain} s : ${pipeline.sparkDrain} s drain`, w / 2, h - 8);

    // events
    const list = dots.current;
    if (reduced) {
      // still frame: a fixed, evenly spaced scatter along both lanes
      list.length = 0;
      for (let lane = 0; lane < 2; lane++) {
        for (let k = 0; k < (lane === 0 ? 3 : 6); k++) {
          const x = xK + nw / 2 + ((aEnd - xK - nw / 2) * (k + 0.5)) / (lane === 0 ? 3 : 6);
          ctx.fillStyle = "#3b82f6";
          ctx.beginPath();
          ctx.arc(x, laneY[lane], 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return;
    }

    carry.current += dt * SPAWN_PER_SEC;
    while (carry.current >= 1) {
      carry.current -= 1;
      list.push({ lane: 0, age: 0, jitter: Math.random() }, { lane: 1, age: 0, jitter: Math.random() });
    }
    for (let i = list.length - 1; i >= 0; i--) {
      const d = list[i];
      d.age += dt;
      const total = TRAVEL + dwell[d.lane] + TRAVEL;
      if (d.age > total) {
        list.splice(i, 1);
        continue;
      }
      const y = laneY[d.lane];
      let x: number;
      let yy = y;
      let alpha = 1;
      if (d.age < TRAVEL) {
        x = xK + nw / 2 + ((aEnd - xK - nw / 2) * d.age) / TRAVEL;
      } else if (d.age < TRAVEL + dwell[d.lane]) {
        // waiting inside the engine box
        const q = (d.age - TRAVEL) / dwell[d.lane];
        x = aEnd + 8 + (engW - 16) * (0.15 + 0.7 * d.jitter) + Math.sin(q * 6 + d.jitter * 9) * 3;
        yy = y + (d.jitter - 0.5) * (engH - 18);
      } else {
        const q = (d.age - TRAVEL - dwell[d.lane]) / TRAVEL;
        x = bStart + (xI - nw / 2 - bStart) * q;
        alpha = q > 0.85 ? (1 - q) / 0.15 : 1;
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = d.lane === 0 ? "#3b82f6" : "#475569";
      ctx.beginPath();
      ctx.arc(x, yy, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // engine labels stay readable above the waiting events
    ctx.textAlign = "center";
    ctx.font = `600 12px ${FONT}`;
    (["Flink 2.2", "Spark 3.5"] as const).forEach((label, i) => {
      const ty = laneY[i] + 4;
      const tw = ctx.measureText(label).width + 10;
      ctx.fillStyle = "rgba(248,250,252,0.92)";
      roundRect(ctx, xE - tw / 2, ty - 12, tw, 16, 4);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.fillText(label, xE, ty);
    });
  };

  const canvas = useSimCanvas(draw);

  return (
    <SimCard
      title="Streaming pipeline: Kafka → Flink / Spark → Iceberg"
      repo={REPO.telco}
      note="Simulation. The dots are illustrative events; the lanes dwell in the engine in the ratio of the measured drain times. The captions below are measured results."
    >
      <canvas
        ref={canvas}
        className="sim-canvas"
        role="img"
        aria-label={`Simulation of events flowing from Kafka through a Flink lane and a Spark lane into Iceberg. The Spark lane dwells longer, in the ratio of the measured drain times (${pipeline.flinkDrain} s and ${pipeline.sparkDrain} s).`}
      />
      <div className="flex flex-col gap-2">
        <p className="label text-ap-ink-faint">Watermark sweep, reports lost</p>
        <Bars
          rows={watermark.points.map((p) => ({
            label: p.label,
            value: p.lost,
            text: p.lost.toLocaleString("en-US"),
            tone: p.label.includes("live") ? "accent" : "muted",
          }))}
        />
        <p className="text-[13px] text-ap-ink-soft">
          Delay {watermark.delayMin[0]} min at the live 2 min vs {watermark.delayMin[1]} min at 11 min.
        </p>
      </div>
      <Captions items={[...pipeline.captions, watermark.caption]} label="Measured · content/data" />
    </SimCard>
  );
}

export default PipelineSim;
