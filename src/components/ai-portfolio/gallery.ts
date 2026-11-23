import { repos } from "@/data/ai-portfolio/repos";

export interface GalleryItem {
  src: string;
  alt: string;
  slug: string;
  repoTitle: string;
}

/** Existing measured charts and diagrams, in a deliberate alternating order. */
const PICKS: [string, string][] = [
  ["lakehouse-lab", "images/architecture.png"],
  ["llm-serving-bench", "images/concurrency.png"],
  ["data-architecture-adr", "images/c4_context.png"],
  ["genai-foundations", "images/dpo.png"],
  ["realtime-telco", "images/latency_cdf.png"],
  ["data-architecture-adr", "images/cost.png"],
  ["lakehouse-lab", "images/compaction.png"],
  ["airflow-mlops", "images/psi_heatmap.png"],
  ["secure-data-ai", "images/owasp_attacks.png"],
  ["spark-rust-bench", "images/query_times.png"],
  ["onprem-llm-stack", "images/architecture.png"],
  ["airflow-mlops", "images/architecture.png"],
];

export const galleryItems: GalleryItem[] = PICKS.flatMap(([slug, file]) => {
  const repo = repos.find((r) => r.slug === slug);
  const img = repo?.images.find((i) => i.src.endsWith(`/${file}`));
  return repo && img
    ? [{ src: img.src, alt: img.alt, slug, repoTitle: repo.title }]
    : [];
});

export interface HeroImage {
  src: string;
  alt: string;
}

export const heroImages: HeroImage[] = repos.flatMap((repo) => {
  const img = repo.images.find((i) => i.src.endsWith("/hero.png"));
  return img ? [{ src: img.src, alt: img.alt }] : [];
});
