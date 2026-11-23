"use client";

import { useEffect, useRef, useState } from "react";
import { FONT, useSimCanvas, type Frame } from "./useSimCanvas";
import { Captions, SimCard } from "./SimCard";
import { tokens, REPO, type Backend, type Quant } from "./data";

const QUANTS: Quant[] = ["Q4_K_M", "Q8_0"];
const BACKENDS: Backend[] = ["Metal GPU", "CPU container"];

const allPeaks = QUANTS.flatMap((q) => BACKENDS.map((b) => tokens.peaks[q][b]));
/** Gauge full scale: a little above the largest measured peak, unlabelled. */
const SCALE_MAX = Math.max(...allPeaks) * 1.12;

/** Smooth bounded noise in [0, 1]. */
function wobble(t: number) {
  return (Math.sin(t * 1.7) + Math.sin(t * 2.9 + 1.3) * 0.6 + Math.sin(t * 0.8 + 4) * 0.8 + 2.4) / 4.8;
}

export function TokenMeter() {
  const [quant, setQuant] = useState<Quant>("Q4_K_M");
  const [backend, setBackend] = useState<Backend>("Metal GPU");
  const peak = tokens.peaks[quant][backend];

  const cur = useRef(0);
  const sel = useRef({ peak });
  useEffect(() => {
    sel.current = { peak };
  }, [peak]);

  const ticks = useRef(0);

  const draw = ({ ctx, w, h, t, dt, reduced }: Frame) => {
    const p = sel.current.peak;
    // The needle only ever sits at or below the measured peak.
    const target = reduced ? p : p * (0.86 + 0.14 * wobble(t));
    cur.current = reduced ? p : cur.current + (target - cur.current) * Math.min(1, dt * 4);
    const v = cur.current;

    const cx = w / 2;
    const cy = h * 0.8;
    const r = Math.min(w * 0.4, h * 0.68);
    const a0 = Math.PI;
    const ang = (x: number) => a0 + Math.PI * Math.min(1, x / SCALE_MAX);

    ctx.lineCap = "round";
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, Math.PI * 2);
    ctx.stroke();

    const g = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    g.addColorStop(0, "#1e40af");
    g.addColorStop(1, "#3b82f6");
    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, ang(v));
    ctx.stroke();

    // minor ticks
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#94a3b8";
    for (let i = 0; i <= 20; i++) {
      const a = a0 + (Math.PI * i) / 20;
      const r1 = r + 12;
      const r2 = r + (i % 5 === 0 ? 20 : 16);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    // measured-peak marker
    const ap = ang(p);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ap) * (r - 14), cy + Math.sin(ap) * (r - 14));
    ctx.lineTo(cx + Math.cos(ap) * (r + 22), cy + Math.sin(ap) * (r + 22));
    ctx.stroke();

    // needle
    const an = ang(v);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(an) * (r - 22), cy + Math.sin(an) * (r - 22));
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    // token stream: ticks drift right at a rate that follows the needle
    ticks.current = (ticks.current + dt * (v / SCALE_MAX) * 160) % 14;
    const sy = h - 12;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(59,130,246,0.55)";
    ctx.lineCap = "butt";
    for (let x = -14 + ticks.current; x < w; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, sy - 4);
      ctx.lineTo(x, sy + 4);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#64748b";
    ctx.font = `500 11px ${FONT}`;
    ctx.fillText(reduced ? "still: needle at measured peak" : "dark mark = measured peak", cx, Math.min(cy + 20, h - 24));
  };

  const canvas = useSimCanvas(draw, peak);

  return (
    <SimCard
      title="Output tokens per second"
      repo={REPO.serving}
      note="Simulation: the meter is animated; the peaks are measured. The needle never goes above the measured peak."
    >
      <div className="flex flex-wrap gap-3">
        <div className="sim-seg" role="group" aria-label="Quantisation">
          {QUANTS.map((q) => (
            <button key={q} type="button" aria-pressed={quant === q} onClick={() => setQuant(q)}>
              {q}
            </button>
          ))}
        </div>
        <div className="sim-seg" role="group" aria-label="Backend">
          {BACKENDS.map((b) => (
            <button key={b} type="button" aria-pressed={backend === b} onClick={() => setBackend(b)}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <canvas
        ref={canvas}
        className="sim-canvas"
        role="img"
        aria-label={`Gauge. Measured peak for ${quant} on ${backend} with 4 concurrent requests: ${peak} tokens per second.`}
      />

      <div className="text-center">
        <p className="text-4xl font-semibold tracking-[-0.03em] text-ap-ink">
          {peak} <span className="text-lg font-normal text-ap-ink-soft">tok/s peak</span>
        </p>
        <p className="label mt-1 text-ap-ink-faint">
          {quant} &middot; 4 concurrent requests &middot; {backend}
        </p>
      </div>

      <table className="w-full text-center text-sm text-ap-ink-soft">
        <caption className="sr-only">Measured peak output tokens per second, 4 concurrent requests</caption>
        <thead>
          <tr className="label text-ap-ink-faint">
            <th scope="col" className="py-1 text-left font-medium">4 concurrent</th>
            {BACKENDS.map((b) => (
              <th key={b} scope="col" className="py-1 font-medium">{b}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {QUANTS.map((q) => (
            <tr key={q} className="border-t border-ap-line">
              <th scope="row" className="py-2 text-left font-medium text-ap-ink">{q}</th>
              {BACKENDS.map((b) => (
                <td
                  key={b}
                  className={q === quant && b === backend ? "py-2 font-semibold text-ap-accent" : "py-2"}
                >
                  {tokens.peaks[q][b]} tok/s
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Captions items={[tokens.captions[quant]]} label="Measured · content/data" />
    </SimCard>
  );
}

export default TokenMeter;
