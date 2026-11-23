"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ai-portfolio/Logo";
import { HeroPlate } from "./HeroPlate";

/** Centre of the SVG stage (viewBox 0 0 1200 440). */
const CX = 600;
const CY = 220;

interface Orbit {
  rx: number;
  ry: number;
  rot: number;
  /** Seconds for one lap of the comet and the dot. */
  dur: number;
  reverse?: boolean;
}

const ORBITS: Orbit[] = [
  { rx: 520, ry: 132, rot: -12, dur: 16 },
  { rx: 430, ry: 104, rot: 15, dur: 12, reverse: true },
  { rx: 330, ry: 150, rot: -34, dur: 20 },
];

const ellipsePath = ({ rx, ry }: Orbit) =>
  `M ${CX - rx} ${CY} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

/**
 * Hero stage: the official mark on its designed plate, inside three tilted
 * orbits. Each orbit has a gradient ring, a travelling light "comet" and a
 * small node riding the path; behind it sits a dot grid with a slow shimmer
 * sweep and softly drifting blue orbs. Everything is CSS / SVG (no WebGL),
 * sized by its fixed-height box (no layout shift), and still when the OS asks
 * for reduced motion.
 */
export function HeroVisual() {
  // Nodes start parked and only begin to move after mount, when motion is allowed.
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMoving(!rm.matches);
    sync();
    rm.addEventListener("change", sync);
    return () => rm.removeEventListener("change", sync);
  }, []);

  return (
    <div className="hv relative mx-auto h-[clamp(260px,38vh,400px)] w-full max-w-[1400px] overflow-hidden">
      <div className="hv-orb hv-orb-a" aria-hidden />
      <div className="hv-orb hv-orb-b" aria-hidden />
      <div className="hv-orb hv-orb-c" aria-hidden />
      <div className="hv-grid" aria-hidden />
      <div className="hv-grid hv-grid-shine" aria-hidden />

      <svg
        className="hv-orbits absolute inset-0 h-full w-full"
        viewBox="0 0 1200 440"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hvRing" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="0.3" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="0.8" stopColor="#8b73ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1e40af" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="hvComet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <radialGradient id="hvNode">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>

        {ORBITS.map((o, i) => {
          const d = ellipsePath(o);
          return (
            <g key={i} transform={`rotate(${o.rot} ${CX} ${CY})`}>
              <path d={d} stroke="url(#hvRing)" strokeWidth="1.2" />
              <path
                d={d}
                className={`hv-comet${o.reverse ? " hv-comet-rev" : ""}`}
                style={{ animationDuration: `${o.dur}s` }}
                pathLength={1000}
                stroke="url(#hvComet)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="90 910"
              />
              <circle r="9" fill="url(#hvNode)" opacity="0.9" cx={moving ? 0 : CX - o.rx} cy={moving ? 0 : CY}>
                {moving && (
                  <animateMotion
                    dur={`${o.dur}s`}
                    repeatCount="indefinite"
                    path={d}
                    keyPoints={o.reverse ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                )}
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="hv-pulse" aria-hidden />
        <span className="hv-pulse hv-pulse-2" aria-hidden />
        <HeroPlate />
        <Logo
          className="hv-logo relative h-auto w-[clamp(84px,12vw,148px)] text-slate-900"
          title="MasterFabric"
        />
      </div>
    </div>
  );
}
