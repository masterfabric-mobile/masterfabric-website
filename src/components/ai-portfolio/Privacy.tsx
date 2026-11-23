"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Layout effect on the client (reset before paint), plain effect during the static build.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { dsr, kvkkErasure } from "@/components/ai-portfolio/sims/data";

const DOCS = {
  comparison:
    "https://github.com/masterfabric/masterfabric-secure-data-ai/blob/main/docs/dsr-gdpr-ccpa-kvkk.md",
  labAdr:
    "https://github.com/masterfabric/masterfabric-secure-data-ai/blob/main/docs/adr/0008-dsr-deadline-tracking.md",
  readme:
    "https://github.com/masterfabric/masterfabric-secure-data-ai#8-data-subject-requests-gdpr-ccpa-kvkk",
  platformAdr:
    "https://github.com/masterfabric/masterfabric-data-architecture-adr/blob/main/docs/adr/0013-track-data-subject-request-deadlines.md",
} as const;

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ap-accent transition-colors hover:text-ap-ink"
    >
      {children} &#8599;
    </a>
  );
}

type Kind = "access" | "erasure" | "consent";

const KINDS: { id: Kind; label: string }[] = [
  { id: "access", label: "Access" },
  { id: "erasure", label: "Erasure" },
  { id: "consent", label: "Consent withdrawal" },
];

const STEPS = ["Receive", "Verify identity", "Process", "Respond"] as const;
/** Illustrative position of each step along the main period (fraction). */
const STEP_AT = [0, 0.12, 0.5, 1] as const;

interface Lane {
  name: string;
  region: string;
  days: number;
  /** Extension, in days; null when no general extension is stated. */
  ext: number | null;
  extLabel: string | null;
  periodLabel: string;
  process: Record<Kind, string>;
}

const LANES: Lane[] = [
  {
    name: "GDPR",
    region: "European Union",
    days: 30,
    ext: 60,
    extLabel: "up to 2 further months",
    periodLabel: "1 calendar month (28-31 days)",
    process: {
      access: "Right of access",
      erasure: "Erasure, where its conditions apply",
      consent: "Withdrawal of consent",
    },
  },
  {
    name: "CCPA",
    region: "California, USA",
    days: 45,
    ext: 45,
    extLabel: "additional 45 days",
    periodLabel: "45 days",
    process: {
      access: "Right to know / access",
      erasure: "Right to delete, subject to exceptions",
      consent: "Opt-out of sale / share",
    },
  },
  {
    name: "KVKK",
    region: "Türkiye",
    days: 30,
    ext: null,
    extLabel: null,
    periodLabel: "30 days",
    process: {
      access: "Application to learn about and access data",
      erasure: "Erasure or destruction, where conditions apply",
      consent: "Withdrawal of explicit consent",
    },
  },
];

const FLOW = [
  "A person applies to the organisation.",
  "The controller (under CCPA, the “business”) receives the request.",
  "Identity is verified.",
  "The request is processed: access, erasure, or consent / opt-out.",
  "A response is due within the period shown below. It can come with conditions and, where the law provides, an extension.",
];

const NAMES = [
  {
    law: "GDPR",
    text: "Data subject rights, including access, erasure, and withdrawal of consent as a legal basis.",
  },
  {
    law: "CCPA",
    text: "Consumer rights, including the right to know / access, the right to delete, and the right to opt out of sale or sharing. It is not a general consent-first rule.",
  },
  {
    law: "KVKK",
    text: "İlgili kişi başvurusu (application by the data subject). Article 11 sets out the data subject’s rights; Article 13 governs the application to the controller, including the 30-day period.",
  },
];

/** Plays 0 → 1 once per `runKey`; pauses offscreen / hidden tab; reduced motion jumps to 1. */
function useRun(runKey: string, seconds: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rm.matches) {
      // Syncs with the external prefers-reduced-motion media query.
      setP(1);
      return;
    }
    let elapsed = 0;
    let last = 0;
    let raf = 0;
    let inView = false;
    let visible = !document.hidden;
    setP(0);

    const tick = (now: number) => {
      raf = 0;
      elapsed += (now - last) / 1000;
      last = now;
      const next = Math.min(1, elapsed / seconds);
      setP(next);
      if (next < 1) raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      const run = inView && visible && elapsed / seconds < 1;
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    const vis = () => {
      visible = !document.hidden;
      sync();
    };
    const rmChange = () => {
      if (rm.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        setP(1);
      }
    };
    document.addEventListener("visibilitychange", vis);
    rm.addEventListener("change", rmChange);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
      rm.removeEventListener("change", rmChange);
    };
  }, [runKey, seconds]);

  return { ref, p };
}

function LabExample({ attached }: { attached: boolean }) {
  return (
    <div className={attached ? "pv-lab pv-lab-attached" : "pv-lab"}>
      <p className="label text-ap-ink-faint">
        {attached ? "Lab example of the “process” step" : "Measured in the lab"} · synthetic data
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-ap-ink">&ldquo;{kvkkErasure}.&rdquo;</p>
      <p className="mt-2 text-[13px] leading-relaxed text-ap-ink-faint">
        A measured erasure run in the secure-data-ai lab, not a compliance claim. The 108 ms is lab processing time,
        not a KVKK response deadline.{" "}
        <Link href="/ai-portfolio/secure-data-ai/" className="text-ap-accent transition-colors hover:text-ap-ink">
          secure-data-ai &rarr;
        </Link>
      </p>
    </div>
  );
}

/** Compact block of the measured DSR figures; every number comes from sims/data.ts. */
function DsrLab() {
  const rows: { label: string; p50: string; p95: string }[] = [
    { label: "Access", ...dsr.latency.access },
    { label: "Consent withdrawal", ...dsr.latency.consent },
    { label: "Erasure", ...dsr.latency.erasure },
  ];
  return (
    <div className="pv-lab">
      <p className="label text-ap-ink-faint">Measured in the lab · data-subject requests · synthetic data</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ap-ink">
        <strong className="text-ap-accent">{dsr.onTime}</strong> requests completed on time (GDPR, CCPA and KVKK ×
        access, erasure, consent withdrawal) over {dsr.customers} customers, with 0 residual rows outside{" "}
        {dsr.retainedInvoiceRows} retained invoice rows.
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[18rem] text-left text-[13px]">
          <caption className="sr-only">Latency per request type in milliseconds, p50 and p95</caption>
          <thead className="text-ap-ink-faint">
            <tr>
              <th scope="col" className="py-1 pr-4 font-normal">Request</th>
              <th scope="col" className="py-1 pr-4 font-normal">p50</th>
              <th scope="col" className="py-1 font-normal">p95</th>
            </tr>
          </thead>
          <tbody className="text-ap-ink-soft">
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="py-1 pr-4 font-normal">{r.label}</th>
                <td className="py-1 pr-4">{r.p50} ms</td>
                <td className="py-1">{r.p95} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-ap-ink-soft">
        <li>
          Identity: 820 attempts (280 genuine, 540 impostor), 0 false accepts, 0 false rejects. The attempts were
          constructed to the rules, so this shows the rules behave as written, not how they fare against real
          impostors.
        </li>
        <li>
          Worked example, request received 2028-01-31: GDPR due 2028-02-29 (extended 2028-04-30); CCPA 2028-03-16
          (extended 2028-04-30), opt-out 2028-02-21; KVKK 2028-03-01.
        </li>
      </ul>
      <p className="mt-2 text-[13px] leading-relaxed text-ap-ink-faint">
        Lab processing time, not a response deadline. Deadline modelling is simplified: day 0 is the receipt day, a
        GDPR month is clamped to month end, weekends and holidays are not rolled, and no KVKK extension is modelled.
      </p>
    </div>
  );
}

/** Highlighted, full-width teaching panel: explainer, tagged simulation, measured lab quote. */
export function Privacy() {
  const [kind, setKind] = useState<Kind>("access");
  const [ext, setExt] = useState(false);
  const [run, setRun] = useState(0);

  const domain = ext ? 90 : 45;
  const { ref, p } = useRun(`${kind}-${ext}-${run}`, ext ? 7 : 5);
  const day = p * domain;

  return (
    <section className="pv" aria-labelledby="pv-title">
      <p className="label text-ap-accent">Privacy context</p>
      <h3 id="pv-title" className="mt-2 text-2xl font-medium tracking-tight text-ap-ink md:text-3xl">
        CCPA, GDPR and KVKK: how a request flows, and when a response is due
      </h3>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ap-ink-soft">
        All three laws let people ask about their data and ask for it to be erased. They do not treat consent
        identically, and the deadlines below are general rules that can come with conditions.
      </p>

      <div className="pv-explain">
        <div>
          <p className="label text-ap-ink-faint">How a request typically flows</p>
          <ol className="pv-flow">
            {FLOW.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="label text-ap-ink-faint">What each law calls it</p>
          <dl className="pv-names">
            {NAMES.map((n) => (
              <div key={n.law}>
                <dt>{n.law}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="pv-sim" ref={ref}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label sim-tag">Simulation</span>
          <span className="text-[13px] text-ap-ink-soft">
            Illustrative of statutory time limits. Not measured data, and not how any organisation performs.
          </span>
        </div>

        <div className="pv-controls">
          <div className="sim-seg" role="group" aria-label="Request type">
            {KINDS.map((k) => (
              <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
                {k.label}
              </button>
            ))}
          </div>
          <button type="button" className="pv-toggle" aria-pressed={ext} onClick={() => setExt((v) => !v)}>
            <span className="pv-switch" aria-hidden="true" />
            With extension
          </button>
          <button type="button" className="pv-replay" onClick={() => setRun((r) => r + 1)}>
            Replay
          </button>
        </div>

        {kind === "consent" && (
          <p className="pv-cap">
            The three laws do not treat consent the same way. Lane names below are a rough, hedged mapping: GDPR
            withdrawal of consent, CCPA opt-out of sale / share, KVKK withdrawal of explicit consent. A CCPA opt-out
            is due within 15 business days (about 19-21 calendar days) and, on one reading of CCR tit. 11 s.
            7026(d), does not need a verifiable request.
          </p>
        )}

        <div className="pv-lanes">
          {LANES.map((l) => {
            const total = l.days + (ext && l.ext ? l.ext : 0);
            const mainPct = (l.days / domain) * 100;
            const extPct = ((ext && l.ext ? l.ext : 0) / domain) * 100;
            const mainFill = Math.min(day, l.days) / domain;
            const extFill = Math.max(0, Math.min(day, total) - l.days) / domain;
            const shown = Math.min(Math.round(day), total);
            const frac = Math.min(day, l.days) / l.days;
            const isKvkk = l.name === "KVKK";
            return (
              <div key={l.name} className="pv-lane">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xl font-semibold tracking-tight text-ap-ink">{l.name}</span>
                  <span className="label text-ap-ink-faint">{l.region}</span>
                </div>
                <p className="text-[13px] text-ap-ink-soft">{l.process[kind]}</p>

                <div className="pv-bar" role="img" aria-label={`${l.name}: ${l.periodLabel}${ext && l.extLabel ? `, then ${l.extLabel}` : ""}`}>
                  <div className="pv-bar-main" style={{ width: `${mainPct}%` }}>
                    <div className="pv-bar-fill" style={{ width: `${(mainFill / (l.days / domain)) * 100}%` }} />
                  </div>
                  {extPct > 0 && (
                    <div className="pv-bar-ext" style={{ width: `${extPct}%` }}>
                      <div className="pv-bar-fill pv-bar-fill-ext" style={{ width: `${(extFill / (extPct / 100)) * 100}%` }} />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px]">
                  <span className="text-xl font-semibold tracking-[-0.03em] text-ap-accent sm:text-2xl lg:text-3xl">{l.periodLabel}</span>
                  <span className="text-ap-ink-faint">day {shown}</span>
                </div>
                <p className="text-[12.5px] leading-snug text-ap-ink-soft">
                  {isKvkk
                    ? "30 days is the general rule (Art. 13); no extension is shown."
                    : ext && l.extLabel
                      ? `Dashed: ${l.extLabel} where the law allows it.`
                      : "Extension available in some cases; toggle to show."}
                </p>

                <ol className="pv-steps">
                  {STEPS.map((s, i) => {
                    const done = frac >= STEP_AT[i] && (i < 3 || frac >= 1);
                    return (
                      <li key={s} data-done={done} data-process={i === 2}>
                        <span className="pv-step-dot" aria-hidden="true" />
                        <span>{s}</span>
                        <span className="sr-only">{done ? " (reached)" : " (pending)"}</span>
                      </li>
                    );
                  })}
                </ol>

                {isKvkk && kind === "erasure" && <LabExample attached />}
              </div>
            );
          })}
        </div>

        <p className="pv-cap">
          Steps are a general teaching model of how a request often flows, not a statutory checklist; actual procedures
          vary and have conditions. The clocks run on a short illustrative timescale. GDPR&rsquo;s one calendar month
          is 28-31 days and is drawn as 30 days; its extension is up to 2 further months (drawn as 60 days at most),
          not a guaranteed extra period. KVKK has no generally stated
          extension of that kind.
        </p>
      </div>

      {!(kind === "erasure") && <LabExample attached={false} />}

      <DsrLab />

      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
        <Ext href={DOCS.comparison}>Read the comparison</Ext>
        <Ext href={DOCS.labAdr}>Lab ADR 0008</Ext>
        <Ext href={DOCS.readme}>README section 8</Ext>
        <Ext href={DOCS.platformAdr}>Platform ADR 0013</Ext>
        <Link href="/ai-portfolio/secure-data-ai/" className="text-ap-accent transition-colors hover:text-ap-ink">
          secure-data-ai &rarr;
        </Link>
      </p>

      <p className="pv-note">
        <strong>This is not legal advice.</strong> It is high-level teaching context placed next to a measured lab, not
        advice about anyone&rsquo;s obligations. Check the current text of each law, or ask a lawyer.
      </p>
    </section>
  );
}
