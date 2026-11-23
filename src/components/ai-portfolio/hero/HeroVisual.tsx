import { Logo } from "@/components/ai-portfolio/Logo";
import { HeroPlate } from "./HeroPlate";

/**
 * Hero stage: the official mark centred on the designed plate, over a soft,
 * symmetric light composition (blue orbs and still ribbon-like loops) that
 * matches the masterfabric.co theme. CSS only, no WebGL.
 */
function Backdrop() {
  const orb = (w: string, x: string, y: string, c: string, o: number) => (
    <div
      className="absolute rounded-full blur-3xl"
      style={{
        width: w,
        height: w,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${c}, transparent 65%)`,
        opacity: o,
      }}
    />
  );
  const loop = (w: string, h: string, rot: number, o: number) => (
    <div
      className="absolute left-1/2 top-1/2 rounded-[50%]"
      style={{
        width: w,
        height: h,
        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
        border: "1px solid transparent",
        background:
          "linear-gradient(#fff, #fff) padding-box, conic-gradient(from 0deg, #3b82f6, #22d3ee, #60a5fa, #8b73ff, #1e40af, #3b82f6) border-box",
        opacity: o,
        WebkitMaskImage: "radial-gradient(closest-side, transparent 55%, #000 100%)",
        maskImage: "radial-gradient(closest-side, transparent 55%, #000 100%)",
      }}
    />
  );
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {orb("34rem", "50%", "50%", "#bfdbfe", 0.7)}
      {orb("22rem", "32%", "55%", "#93c5fd", 0.35)}
      {orb("22rem", "68%", "55%", "#a5f3fc", 0.3)}
      {loop("min(46rem, 92vw)", "min(15rem, 34vw)", -14, 0.55)}
      {loop("min(40rem, 84vw)", "min(12rem, 28vw)", 16, 0.4)}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[clamp(260px,38vh,400px)] w-full max-w-[1400px]">
      <Backdrop />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <HeroPlate />
        <Logo
          className="relative h-auto w-[clamp(84px,12vw,148px)] text-slate-900"
          title="MasterFabric"
        />
      </div>
    </div>
  );
}
