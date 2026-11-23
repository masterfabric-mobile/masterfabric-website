"use client";

import { useState } from "react";
import { Captions, SimCard } from "./SimCard";
import { Bars, DotRow, Legend, Seg } from "./Bars";
import {
  REPO,
  clarify,
  costModel,
  engines,
  guardV12,
  guidance,
  mlops,
  modes,
} from "./data";

const GREY = "rgba(148,163,184,0.55)";

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="label text-ap-ink-faint">{children}</p>;
}

/* ---- 3. airflow-mlops ---- */
export function MlopsCard() {
  const c = mlops.canary;
  const d = mlops.drift;
  return (
    <SimCard
      title="Canary, rollback and drift-triggered retrain"
      repo={REPO.airflow}
      note="Simulation of the measured gates. Bars grow from zero to the measured values; nothing between them was measured."
    >
      <div className="flex flex-col gap-2">
        <Sub>Canary stages</Sub>
        <div className="flex flex-wrap gap-2 text-[13px]">
          {c.stages.map((p) => (
            <span key={p} className="rounded-full border border-ap-line-strong px-3 py-1 tabular-nums text-ap-ink">
              {p}%
            </span>
          ))}
        </div>
        <p className="text-[13px] leading-relaxed text-ap-ink-soft">
          <span className="sim-miss">v6 rolled back at {c.rollbackStage}%</span> (Spearman {c.spearman}).{" "}
          v5 passed all stages, paired delta AUC {c.deltaAuc} {c.ci}, and was promoted.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Sub>Rollback, seconds to serve</Sub>
        <Bars
          rows={[
            { label: "v4 → v3", value: Number(mlops.rollback.toV3), text: `${mlops.rollback.toV3} s` },
            { label: "back to v4", value: Number(mlops.rollback.backToV4), text: `${mlops.rollback.backToV4} s`, tone: "muted" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Sub>Drift watcher</Sub>
        <Bars
          max={Math.max(d.psi, d.trigger)}
          rows={[
            { label: "PSI", value: d.psi, text: d.psiText },
            { label: "Trigger", value: d.trigger, text: String(d.trigger), tone: "muted" },
          ]}
        />
        <p className="text-[13px] leading-relaxed text-ap-ink-soft">
          v10 <span className="sim-miss">rejected</span> ({d.v10.auc} vs v1 {d.v10.baseline}); v11{" "}
          <span className="text-ap-accent">promoted</span> ({d.v11.auc} vs {d.v11.baseline}), served {d.v11.servedS} s later.
        </p>
      </div>
      <Captions items={[c.caption, mlops.rollback.caption, d.caption]} label="Measured · content/data" />
    </SimCard>
  );
}

/* ---- 4. onprem-llm-stack: guard v1.2 ---- */
export function GuardV12Card() {
  const [view, setView] = useState<"fresh" | "history">("fresh");
  const f = guardV12.fresh;
  const rows = [
    { name: "v1.1 (default)", i: 0 },
    { name: "v1.2 (optional)", i: 1 },
  ];
  return (
    <SimCard
      title="Guard v1.2 vs v1.1, fresh held-out set"
      repo={REPO.stack}
      note="Simulation of the counts. Each dot is one prompt; amber dots are the misses. v1.1 stays the default."
    >
      <Seg
        label="View"
        value={view}
        onChange={setView}
        options={[
          { id: "fresh", text: "v1.1 vs v1.2" },
          { id: "history", text: "Earlier results" },
        ]}
      />
      {view === "fresh" ? (
        <>
          <div className="flex flex-col gap-4">
            {rows.map((r) => (
              <div key={r.name} className="flex flex-col gap-3">
                <Sub>{r.name}</Sub>
                <DotRow
                  label="Attacks"
                  total={f.attacks}
                  bad={f.attacks - f.caught[r.i]}
                  summary={`${f.caught[r.i]}/${f.attacks} caught · ${f.attacks - f.caught[r.i]} missed`}
                />
                <DotRow
                  label="Benign"
                  total={f.benign}
                  bad={f.blocked[r.i]}
                  summary={`${f.blocked[r.i]}/${f.benign} blocked`}
                />
              </div>
            ))}
          </div>
          <Legend items={[{ color: "rgba(148,163,184,0.32)", text: "correct" }, { color: "#d97706", text: "missed attack / blocked benign" }]} />
          <Captions items={[f.caption, guardV12.dev.caption]} label="Measured · content/data" />
        </>
      ) : (
        <>
          <p className="text-[13px] text-ap-ink-faint">
            Earlier measurements on other sets, shown as measured and not combined with the v1.2 rates.
          </p>
          <Captions items={guardV12.history.captions} label="History · content/data" />
        </>
      )}
    </SimCard>
  );
}

/* ---- 6. secure-data-ai: clarify instead of block ---- */
export function ClarifyCard() {
  const n = clarify.n;
  const col = (name: string, legit: number, pwned: number) => (
    <div className="flex flex-col gap-3">
      <Sub>{name}</Sub>
      <DotRow label="Legitimate blocked" total={n} bad={legit} summary={`${legit}/${n}`} badTone="accent" />
      <DotRow label="Attacks shown PWNED" total={n} bad={pwned} summary={`${pwned}/${n}`} />
    </div>
  );
  return (
    <SimCard
      title="Clarify instead of block (guard v3)"
      repo={REPO.secure}
      note="Simulation of the counts. Fewer legitimate questions are blocked; the attack result is unchanged."
    >
      {col("Block", clarify.legitBlocked.block, clarify.pwned.block)}
      {col("Clarify", clarify.legitBlocked.clarify, clarify.pwned.clarify)}
      <Captions items={[clarify.caption]} label="Measured · content/data" />
      <div>
        <Sub>Separate measurement, not the clarifier</Sub>
        <p className="sim-cap mt-2 text-[13px] leading-relaxed text-ap-ink-soft">
          <span className="block border-l-2 border-ap-line-strong pl-3.5">{clarify.related}</span>
        </p>
      </div>
    </SimCard>
  );
}

/* ---- 7. genai-foundations ---- */
export function ModesCard() {
  const [view, setView] = useState<"modes" | "cfg">("modes");
  return (
    <SimCard
      title="Mode coverage and guidance"
      repo={REPO.genai}
      note="Simulation of the measured counts. Guidance shows only the three measured weights; no curve between them is drawn."
    >
      <Seg
        label="View"
        value={view}
        onChange={setView}
        options={[
          { id: "modes", text: "Mode coverage" },
          { id: "cfg", text: "Guidance (CFG)" },
        ]}
      />
      {view === "modes" ? (
        <>
          <Bars
            key="m"
            max={modes[0].of}
            rows={modes.map((m) => ({
              label: m.name,
              value: m.modes[1],
              text: `${m.modes[0] === m.modes[1] ? m.modes[0] : `${m.modes[0]}–${m.modes[1]}`} of ${m.of}`,
              tone: m.name === "GAN" ? "warn" : "accent",
            }))}
          />
          <ul className="text-[12px] text-ap-ink-faint">
            {modes.map((m) => (
              <li key={m.name}>
                {m.name}: {m.onMode} on a mode · {m.note}
              </li>
            ))}
          </ul>
          <Captions items={guidance.captions.slice(0, 3)} label="Measured · content/data" />
        </>
      ) : (
        <>
          <Sub>Class drawn, % of the time</Sub>
          <Bars
            key="c"
            max={100}
            rows={guidance.points.map((p) => ({ label: `w = ${p.w}`, value: p.classPct, text: `${p.classPct}%` }))}
          />
          <Sub>Judge-feature Frechet distance</Sub>
          <Bars
            key="f"
            rows={guidance.points.map((p) => ({
              label: `w = ${p.w}`,
              value: Number(p.frechet),
              text: p.frechet,
              tone: p.w === 8 ? "warn" : "muted",
            }))}
          />
          <Captions items={[guidance.cfgCaption]} label="Measured · content/data" />
        </>
      )}
    </SimCard>
  );
}

/* ---- 8. spark-rust-bench ---- */
export function EnginesCard() {
  const [view, setView] = useState<"time" | "mem">("time");
  const [replay, setReplay] = useState(0);
  const e = engines;
  return (
    <SimCard
      title="Engine race at 200M rows"
      repo={REPO.spark}
      note="Simulation: bars race at one shared speed, so length is proportional to the measured time. The captions are the measured results."
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Seg
          label="View"
          value={view}
          onChange={setView}
          options={[
            { id: "time", text: "Time" },
            { id: "mem", text: "Memory" },
          ]}
        />
        {view === "time" && (
          <button
            type="button"
            onClick={() => setReplay((n) => n + 1)}
            className="min-h-11 rounded-full border border-ap-line-strong px-5 text-sm text-ap-ink transition-colors hover:border-ap-accent/60"
          >
            Replay
          </button>
        )}
      </div>
      {view === "time" ? (
        <Bars
          key="t"
          replay={replay}
          secondsPerUnit={0.1}
          rows={e.seconds.map((r) => ({
            label: r.name,
            value: r.s,
            text: `${r.s} s`,
            tone: r.name.includes("Spark") ? "muted" : "accent",
          }))}
        />
      ) : (
        <Bars
          key="g"
          rows={e.seconds.map((r) => ({
            label: r.name,
            value: r.gib,
            text: `${r.gib} GiB`,
            tone: r.name.includes("Spark") ? "muted" : "accent",
          }))}
        />
      )}
      <p className="text-[13px] text-ap-ink-soft">
        DataFusion <span className="text-ap-accent">finishes</span> at 200M rows ({e.dfMiB} MiB capped) · 240/240 results identical.
      </p>
      <Captions items={[e.captions.time, e.captions.memory, e.captions.identical]} label="Measured · content/data" />
      <div>
        <Sub>History, first round (not the current result)</Sub>
        <p className="mt-2 border-l-2 border-ap-line-strong pl-3.5 text-[13px] leading-relaxed text-ap-ink-faint">
          {e.captions.history}
        </p>
      </div>
    </SimCard>
  );
}

/* ---- 9. data-architecture-adr ---- */
export function CostCard() {
  const m = costModel;
  return (
    <SimCard
      title="ADR 0009: where on-prem starts to win"
      repo={REPO.adr}
      note="Simulation of the quoted points on a 0–100% utilisation axis. Only the 17% break-even and the 30% price quote were measured; no cost curve is drawn."
    >
      <div className="flex flex-col gap-2">
        <div className="relative h-14" role="img" aria-label={`Utilisation axis: break-even at ${m.breakEven}%, price quote at ${m.q8Util}%.`}>
          <div className="sim-track absolute left-0 right-0 top-6">
            <div className="sim-fill" style={{ width: `${m.breakEven}%`, background: GREY }} />
          </div>
          <div
            className="absolute top-6 h-2 rounded-r-full"
            style={{ left: `${m.breakEven}%`, right: 0, background: "#3b82f6", opacity: 0.85 }}
          />
          {[
            { at: m.breakEven, text: `${m.breakEven}% break-even`, top: true },
            { at: m.q8Util, text: `${m.q8Util}% quote`, top: false },
          ].map((k) => (
            <span
              key={k.text}
              className="absolute -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-ap-ink"
              style={{ left: `${k.at}%`, top: k.top ? 0 : "2.4rem" }}
            >
              {k.text}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-[12px] text-ap-ink-faint">
          <span>0%</span>
          <span>utilisation</span>
          <span>100%</span>
        </div>
      </div>
      <p className="text-[13px] leading-relaxed text-ap-ink-soft">
        Above {m.breakEven}% utilisation on-prem beats on-demand cloud. At {m.q8Util}% utilisation the Q8 LLM costs{" "}
        <span className="font-medium text-ap-ink">
          {m.prices[0]} vs {m.prices[1]}
        </span>{" "}
        per 1M tokens, quoted in the order of the source sentence.
      </p>
      <Captions items={[m.caption]} label="Measured · content/data" />
    </SimCard>
  );
}
