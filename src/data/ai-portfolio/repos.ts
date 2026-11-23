import airflowMlops from "./data/airflow-mlops.json";
import dataArchitectureAdr from "./data/data-architecture-adr.json";
import genaiFoundations from "./data/genai-foundations.json";
import lakehouseLab from "./data/lakehouse-lab.json";
import llmServingBench from "./data/llm-serving-bench.json";
import onpremLlmStack from "./data/onprem-llm-stack.json";
import realtimeTelco from "./data/realtime-telco.json";
import secureDataAi from "./data/secure-data-ai.json";
import sparkRustBench from "./data/spark-rust-bench.json";

export interface RepoImage {
  src: string;
  alt: string;
}

export interface Repo {
  slug: string;
  title: string;
  tagline: string;
  githubUrl: string;
  sha: string;
  shaDate: string;
  summary: string;
  keyResults: string[];
  limitations: string[];
  images: RepoImage[];
}

/**
 * Order here is the canonical, narrative order used across the home grid
 * and the nav: lakehouse -> streaming -> MLOps -> LLM platform -> LLM
 * benchmarking -> security -> generative AI -> compute benchmarking ->
 * cross-cutting architecture decisions.
 */
export const repos: Repo[] = [
  lakehouseLab,
  realtimeTelco,
  airflowMlops,
  onpremLlmStack,
  llmServingBench,
  secureDataAi,
  genaiFoundations,
  sparkRustBench,
  dataArchitectureAdr,
] as Repo[];

export const repoSlugs: string[] = repos.map((repo) => repo.slug);

export function getRepoBySlug(slug: string): Repo | undefined {
  return repos.find((repo) => repo.slug === slug);
}

/**
 * The newest SHA date across all nine repos, used on the home page to
 * state plainly when this snapshot was taken.
 */
export const latestSnapshotDate: string = repos.reduce(
  (latest, repo) => (repo.shaDate > latest ? repo.shaDate : latest),
  repos[0].shaDate,
);
