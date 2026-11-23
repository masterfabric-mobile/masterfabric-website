"use client";

import dynamic from "next/dynamic";
import { ClarifyCard, CostCard, EnginesCard, GuardV12Card, MlopsCard, ModesCard } from "./Cards";

const box = (h: string) => ({
  loading: () => <div className={`card ${h} animate-pulse`} aria-hidden />,
});

// Canvas / rAF pieces load after mount, like the hero scene.
const PipelineSim = dynamic(() => import("./PipelineSim"), { ssr: false, ...box("h-[640px]") });
const TokenMeter = dynamic(() => import("./TokenMeter"), { ssr: false, ...box("h-[640px]") });
const ScaleChart = dynamic(() => import("./ScaleChart"), { ssr: false, ...box("h-[640px]") });

/** Nine cards in canonical repo order: 3 x 3 on desktop. */
export function Sims() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ScaleChart />
      <PipelineSim />
      <MlopsCard />
      <GuardV12Card />
      <TokenMeter />
      <ClarifyCard />
      <ModesCard />
      <EnginesCard />
      <CostCard />
    </div>
  );
}
