import telco from "@/data/ai-portfolio/data/realtime-telco.json";
import serving from "@/data/ai-portfolio/data/llm-serving-bench.json";
import stack from "@/data/ai-portfolio/data/onprem-llm-stack.json";
import secure from "@/data/ai-portfolio/data/secure-data-ai.json";
import lakehouse from "@/data/ai-portfolio/data/lakehouse-lab.json";
import airflow from "@/data/ai-portfolio/data/airflow-mlops.json";
import genai from "@/data/ai-portfolio/data/genai-foundations.json";
import spark from "@/data/ai-portfolio/data/spark-rust-bench.json";
import adr from "@/data/ai-portfolio/data/data-architecture-adr.json";

/**
 * Every figure the simulations show is read from the content/data snapshots.
 * Lookups throw at build time if a sentence changes, so a stale or invented
 * number can never reach the page silently.
 */
interface Snapshot {
  slug: string;
  title: string;
  keyResults: string[];
}

export function find(snap: Snapshot, prefix: string): string {
  const hit = snap.keyResults.find((r) => r.startsWith(prefix));
  if (!hit) throw new Error(`${snap.slug}: no key result starting "${prefix}"`);
  return hit;
}

/** Throws unless every fragment is literally part of the sentence. */
function expect(sentence: string, ...fragments: string[]): string {
  for (const f of fragments) {
    if (!sentence.includes(f)) throw new Error(`"${f}" missing from: ${sentence}`);
  }
  return sentence;
}

function match(sentence: string, re: RegExp): RegExpMatchArray {
  const m = sentence.match(re);
  if (!m) throw new Error(`pattern ${re} did not match: ${sentence}`);
  return m;
}

/** Repo name + page slug for each card (the card links to /repos/<slug>/). */
const ref = (s: Snapshot) => ({ slug: s.slug, title: s.title });
export const REPO = {
  lakehouse: ref(lakehouse),
  telco: ref(telco),
  airflow: ref(airflow),
  stack: ref(stack),
  serving: ref(serving),
  secure: ref(secure),
  genai: ref(genai),
  spark: ref(spark),
  adr: ref(adr),
};

/* ---- A. streaming pipeline ---- */
const flinkSpark = find(telco, "Flink 2.2 vs Spark 3.5");
const drain = match(flinkSpark, /drain ([\d.]+) s vs ([\d.]+) s/);
export const pipeline = {
  flinkDrain: Number(drain[1]),
  sparkDrain: Number(drain[2]),
  captions: [
    find(telco, "Live run:"),
    find(telco, "Throughput (drain):"),
    flinkSpark,
    find(telco, "Exactly-once under kill -9"),
  ],
};

/* ---- B. token meter ---- */
const q4 = match(
  find(serving, "Peak output throughput, Q4_K_M"),
  /(\d+) tok\/s on the Metal GPU vs (\d+) tok\/s in the CPU container/,
);
const q8 = match(
  find(serving, "Peak output throughput, Q8_0"),
  /(\d+) tok\/s Metal vs (\d+) tok\/s CPU container/,
);
export type Quant = "Q4_K_M" | "Q8_0";
export type Backend = "Metal GPU" | "CPU container";
export const tokens = {
  peaks: {
    Q4_K_M: { "Metal GPU": Number(q4[1]), "CPU container": Number(q4[2]) },
    Q8_0: { "Metal GPU": Number(q8[1]), "CPU container": Number(q8[2]) },
  } satisfies Record<Quant, Record<Backend, number>>,
  captions: {
    Q4_K_M: find(serving, "Peak output throughput, Q4_K_M"),
    Q8_0: find(serving, "Peak output throughput, Q8_0"),
  } satisfies Record<Quant, string>,
};

/* ---- lakehouse scale-up + scheduled maintenance ---- */
const scale = match(
  find(lakehouse, "Scale benchmark"),
  /from ([\d.]+) M to ([\d.]+) M raw rows \(scales (\d+) to (\d+)\).*from ([\d.]+) s to ([\d.]+) s, so (\d+)x the data costs ([\d.]+)x the time/,
);
const thr = match(
  find(lakehouse, "Throughput through bronze to gold"),
  /from about (\d+)k to (\d+)k rows\/s/,
);
export const lakehouseScale = {
  rows: [Number(scale[1]), Number(scale[2])] as const,
  scales: [Number(scale[3]), Number(scale[4])] as const,
  seconds: [Number(scale[5]), Number(scale[6])] as const,
  dataX: Number(scale[7]),
  timeX: Number(scale[8]),
  throughputK: [Number(thr[1]), Number(thr[2])] as const,
  captions: [
    find(lakehouse, "Scale benchmark"),
    find(lakehouse, "Throughput through bronze to gold"),
  ],
};

const sched = expect(
  find(lakehouse, "Scheduled maintenance under a stream"),
  "after 60 batches of 2,000 rows",
  "120,000 rows, 145,731.40 TRY",
);
const qms = match(sched, /answers the one-day query in ([\d.]+) ms.*answers in ([\d.]+) ms/);
const files = match(
  sched,
  /holds (\d+) data \+ (\d+) position-delete files.*holds (\d+) \+ (\d+) files/,
);
export const maintenance = {
  batches: 60,
  rowsPerBatch: 2000,
  queryMs: { unmaintained: Number(qms[1]), maintained: Number(qms[2]) },
  files: {
    unmaintained: `${files[1]} + ${files[2]}`,
    maintained: `${files[3]} + ${files[4]}`,
  },
  result: "120,000 rows, 145,731.40 TRY",
  caption: sched,
};

/* ---- realtime-telco watermark sweep ---- */
const sweepSentence = find(telco, "Watermark sweep");
const sweep = match(
  sweepSentence,
  /reports lost were ([\d,]+) at 10 s, ([\d,]+) at 30 s, ([\d,]+) at 1 min, ([\d,]+) at the live 2 min, ([\d,]+) at 5 min and ([\d,]+) at 11 min/,
);
const sweepDelay = match(sweepSentence, /at 2 min was ([\d.]+) min versus ([\d.]+) min at 11 min/);
const num = (x: string) => Number(x.replace(/,/g, ""));
export const watermark = {
  points: [
    { label: "10 s", lost: num(sweep[1]) },
    { label: "30 s", lost: num(sweep[2]) },
    { label: "1 min", lost: num(sweep[3]) },
    { label: "2 min (live)", lost: num(sweep[4]) },
    { label: "5 min", lost: num(sweep[5]) },
    { label: "11 min", lost: num(sweep[6]) },
  ],
  delayMin: [Number(sweepDelay[1]), Number(sweepDelay[2])] as const,
  caption: sweepSentence,
};

/* ---- airflow-mlops ---- */
const canarySentence = find(airflow, "Canary rollout");
const canaryM = match(
  canarySentence,
  /v6 rolled back at (\d+)% \(Spearman (-[\d.]+)\); v5 passed (\d+)\/(\d+)\/(\d+)% stages, paired delta AUC (-[\d.]+) \[(-[\d.]+), (\+[\d.]+)\], and was promoted/,
);
const rollbackSentence = find(airflow, "Rollback:");
const rollM = match(
  rollbackSentence,
  /v4 to v3 served after ([\d.]+) s, and back to v4 after ([\d.]+) s \((\d+) s poll\), with no restart/,
);
const driftSentence = expect(
  find(airflow, "Drift watcher replay"),
  "40,000 served subscribers",
);
const driftM = match(
  driftSentence,
  /PSI ([\d.]+) at ([\d,]+), sustained at ([\d,]+)\) retrained v10, which was rejected \(([\d.]+) vs v1 ([\d.]+)\); with 2026-08 traffic and labels up to 2026-07, v11 was promoted \(([\d.]+) vs ([\d.]+)\) and served ([\d.]+) s later/,
);
const triggerM = match(find(airflow, "Drift signal"), /against a trigger of ([\d.]+)/);
export const mlops = {
  canary: {
    rollbackStage: Number(canaryM[1]),
    spearman: canaryM[2],
    stages: [Number(canaryM[3]), Number(canaryM[4]), Number(canaryM[5])],
    deltaAuc: canaryM[6],
    ci: `[${canaryM[7]}, ${canaryM[8]}]`,
    caption: canarySentence,
  },
  rollback: { toV3: rollM[1], backToV4: rollM[2], poll: rollM[3], caption: rollbackSentence },
  drift: {
    psi: Number(driftM[1]),
    psiText: driftM[1],
    at: driftM[2],
    sustainedAt: driftM[3],
    trigger: Number(triggerM[1]),
    v10: { auc: Number(driftM[4]), baseline: Number(driftM[5]) },
    v11: { auc: Number(driftM[6]), baseline: Number(driftM[7]), servedS: driftM[8] },
    caption: driftSentence,
  },
};

/* ---- onprem-llm-stack: guard v1.2 ---- */
const fresh = expect(
  find(stack, "Guard v1.2 on a fresh held-out set"),
  "attacks caught 18/24 -> 22/24",
  "benign blocked 2/20 -> 4/20",
  "kept optional, v1.1 stays the default",
);
const devSentence = expect(
  find(stack, "Guard v1.2 (override_narrow at 0.55) on dev"),
  "22/22 attacks caught, 2/39 benign blocked, same as v1.1",
  "14/16 caught, 1/14 blocked",
);
const v10 = expect(
  find(stack, "Guardrails, rules only (v1.0)"),
  "18/18 injection",
  "0/4 paraphrase evasions caught",
);
const v11 = expect(
  find(stack, "Guardrails + LLM classifier (v1.1)"),
  "evasions 4/4 blocked",
  "2/4 PII questions now blocked too",
  "0/35 benign questions blocked",
);
const heldV1 = expect(
  find(stack, "Held-out attacks"),
  "rules 0/16 -> rules + classifier 10/16",
  "hard benign questions blocked 1/14",
);
export const guardV12 = {
  fresh: { attacks: 24, benign: 20, caught: [18, 22], blocked: [2, 4], caption: fresh },
  dev: { caption: devSentence },
  history: { captions: [v10, v11, heldV1] },
};

/* ---- secure-data-ai: clarify instead of block ---- */
const clarifySentence = find(secure, "Clarify instead of block (guard v3)");
const cl = match(
  clarifySentence,
  /legitimate questions blocked (\d+)\/(\d+) to (\d+)\/(\d+); attacks shown PWNED (\d+)\/(\d+) to (\d+)\/(\d+)/,
);
const heldInjection = expect(
  find(secure, "Direct prompt injection, held-out set"),
  "7/12 to 7/12 (rules) to 1/12 (rules + classifier)",
);
export const clarify = {
  n: Number(cl[2]),
  legitBlocked: { block: Number(cl[1]), clarify: Number(cl[3]) },
  pwned: { block: Number(cl[5]), clarify: Number(cl[7]) },
  caption: clarifySentence,
  related: heldInjection,
};

/* ---- genai-foundations ---- */
const gan = match(
  find(genai, "The non-saturating GAN"),
  /covers (\d)-(\d) of (\d+) modes with (\d+)-(\d+)% of samples on a mode across 3 seeds/,
);
const wgan = match(
  find(genai, "WGAN-GP at 20,000"),
  /covers (\d+) of (\d+) modes in all 3 seeds \((\d+)-(\d+)% on a mode\), versus the GAN at 20k still covering only (\d)-(\d) of/,
);
const ddpm = match(
  find(genai, "DDPM diffusion"),
  /covers (\d+) of (\d+) modes at (\d+)% on a mode \(3 seeds\); DDIM at (\d+) steps also reaches (\d+) of (\d+) at (\d+)%/,
);
const cfgSentence = find(genai, "Classifier-free guidance on 16x16 shapes");
const cfg = match(
  cfgSentence,
  /drawn (\d+)% of the time at w = 0, (\d+)% at w = 1 and (\d+)% at w = 8, while the judge-feature Frechet distance goes ([\d.]+) to ([\d.]+) to ([\d.]+)/,
);
export interface ModeResult {
  name: string;
  /** Modes covered: a [min, max] across seeds (equal when fixed). */
  modes: [number, number];
  of: number;
  onMode: string;
  note: string;
}
export const modes: ModeResult[] = [
  {
    name: "GAN",
    modes: [Number(gan[1]), Number(gan[2])],
    of: Number(gan[3]),
    onMode: `${gan[4]}-${gan[5]}%`,
    note: "non-saturating · 3 seeds",
  },
  {
    name: "WGAN-GP",
    modes: [Number(wgan[1]), Number(wgan[1])],
    of: Number(wgan[2]),
    onMode: `${wgan[3]}-${wgan[4]}%`,
    note: "20,000 generator steps · 3 seeds",
  },
  {
    name: "DDPM",
    modes: [Number(ddpm[1]), Number(ddpm[1])],
    of: Number(ddpm[2]),
    onMode: `${ddpm[3]}%`,
    note: "3 seeds",
  },
  {
    name: "DDIM",
    modes: [Number(ddpm[5]), Number(ddpm[5])],
    of: Number(ddpm[6]),
    onMode: `${ddpm[7]}%`,
    note: `${ddpm[4]} steps`,
  },
];
export const guidance = {
  points: [
    { w: 0, classPct: Number(cfg[1]), frechet: cfg[4] },
    { w: 1, classPct: Number(cfg[2]), frechet: cfg[5] },
    { w: 8, classPct: Number(cfg[3]), frechet: cfg[6] },
  ],
  captions: [
    find(genai, "The non-saturating GAN"),
    find(genai, "WGAN-GP at 20,000"),
    find(genai, "DDPM diffusion"),
    cfgSentence,
  ],
  cfgCaption: cfgSentence,
};

/* ---- spark-rust-bench ---- */
const raceSentence = find(spark, "Polars ran the same SQL");
const race = match(
  raceSentence,
  /([\d.]+)x faster than PySpark at 200M rows.*was ([\d.]+) s for Polars, ([\d.]+) s for DuckDB, ([\d.]+) s for DataFusion and ([\d.]+) s for PySpark/,
);
const scalaSentence = find(spark, "PySpark SQL is as fast as Scala SQL");
const scala = match(scalaSentence, /([\d.]+) s vs ([\d.]+) s for the sum/);
const memSentence = expect(
  find(spark, "At 200M rows peak container memory"),
  "DataFusion finishes 200M rows in 5.532 s",
);
const mem = match(
  memSentence,
  /([\d.]+) GiB \(PySpark\), ([\d.]+) GiB \(Scala Spark\), ([\d.]+) GiB \(Polars\), ([\d.]+) GiB \(DuckDB\) and ([\d.]+) GiB \(DataFusion, ([\d,]+) MiB with/,
);
const identical = expect(
  find(spark, "240 of 240 query results"),
  "39 runs",
  "killed at the memory limit in the first round",
);
const history = expect(
  find(spark, "DataFusion's memory growth"),
  "killed at 8,192 MiB at 200M",
);
export const engines = {
  speedup: race[1],
  /** Sum of six query medians at 200M rows, seconds. */
  seconds: [
    { name: "Polars", s: Number(race[2]), gib: Number(mem[3]) },
    { name: "DuckDB", s: Number(race[3]), gib: Number(mem[4]) },
    { name: "DataFusion", s: Number(race[4]), gib: Number(mem[5]) },
    { name: "Scala Spark", s: Number(scala[2]), gib: Number(mem[2]) },
    { name: "PySpark", s: Number(race[5]), gib: Number(mem[1]) },
  ],
  dfMiB: mem[6],
  captions: { time: raceSentence, scala: scalaSentence, memory: memSentence, identical, history },
};
if (Number(scala[1]) !== Number(race[5])) throw new Error("PySpark time differs between sentences");

/* ---- data-architecture-adr ---- */
const adrSentence = find(adr, "ADR 0009 cost model");
const adrM = match(
  adrSentence,
  /above (\d+)% utilisation; Q8 LLM (\$[\d.]+) vs (\$[\d.]+) per 1M tokens at (\d+)% utilisation/,
);
export const costModel = {
  breakEven: Number(adrM[1]),
  q8Util: Number(adrM[4]),
  /** Quoted in the sentence's own order; the JSON does not label the sides. */
  prices: [adrM[2], adrM[3]] as const,
  caption: adrSentence,
  tie: expect(
    find(adr, "ADR 0008"),
    "DataFusion 5.532 s",
  ),
};


/* ---- privacy callout: the measured KVKK erasure lab result ---- */
export const kvkkErasure = expect(
  find(secure, "KVKK erasure, 50 of 200,000 subjects"),
  "0 residual rows outside 100 retained invoice rows",
  "other rows unchanged",
  "p50 108 ms",
);

/* ---- privacy panel: data-subject requests (GDPR, CCPA, KVKK) ---- */
const dsrSentence = expect(
  find(secure, "Data-subject requests, 540"),
  "540/540 completed on time",
  "erasure p50 117 ms",
  "0 residual rows outside 360 retained invoice rows",
  "over 200,000 customers",
);
const dsrLatencySentence = expect(
  find(secure, "Latency per request, p50 / p95"),
  "access 2.1 / 2.7 ms",
  "consent withdrawal 1.5 / 2.1 ms",
  "erasure 117 / 141 ms",
);
const dsrConsentSentence = expect(
  find(secure, "Consent withdrawal, 180 subjects"),
  "0 marketing-list rows left",
  "0 consent flags still true",
);
const dsrIdentitySentence = expect(
  find(secure, "Identity attempts, 820"),
  "280 genuine, 540 impostor",
  "0 false accepts, 0 false rejects",
  "constructed to the rules",
);
const dsrDeadlineSentence = expect(
  find(secure, "Deadline sweep over 731 receipt dates"),
  "28-31 days after receipt (89-92 extended)",
  "13 month-end clamps",
  "received 2028-01-31: GDPR due 2028-02-29 (extended 2028-04-30)",
  "CCPA 2028-03-16 (extended 2028-04-30), opt-out 2028-02-21",
  "KVKK 2028-03-01",
);
const lat = match(
  dsrLatencySentence,
  /access ([\d.]+) \/ ([\d.]+) ms; consent withdrawal ([\d.]+) \/ ([\d.]+) ms; erasure ([\d.]+) \/ ([\d.]+) ms/,
);
const dsrN = match(dsrSentence, /Data-subject requests, (\d+) .*over ([\d,]+) customers: (\d+)\/(\d+) completed on time/);
export const dsr = {
  requests: Number(dsrN[1]),
  customers: dsrN[2],
  onTime: `${dsrN[3]}/${dsrN[4]}`,
  retainedInvoiceRows: 360,
  latency: {
    access: { p50: lat[1], p95: lat[2] },
    consent: { p50: lat[3], p95: lat[4] },
    erasure: { p50: lat[5], p95: lat[6] },
  },
  captions: {
    summary: dsrSentence,
    latency: dsrLatencySentence,
    consent: dsrConsentSentence,
    identity: dsrIdentitySentence,
    deadlines: dsrDeadlineSentence,
  },
};
export const dsrAdr = expect(
  find(adr, "ADR 0013"),
  "540/540 requests on time",
  "GDPR month lands 28-31 days out",
  "not legal advice",
);
