"use client";

import { useEffect, useRef } from "react";

export interface Frame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Seconds since the loop started (accumulated, pauses with the loop). */
  t: number;
  dt: number;
  /** True when motion is reduced: draw a still, labelled end state. */
  reduced: boolean;
}

/**
 * Shared canvas loop: DPR-aware, resizes with its box, and only runs while
 * the canvas is on screen, the tab is visible and motion is allowed. Under
 * reduced motion it paints one still frame (and repaints when `version`
 * changes or the box resizes).
 */
export function useSimCanvas(draw: (f: Frame) => void, version = 0) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  const repaint = useRef<() => void>(() => {});

  useEffect(() => {
    drawRef.current = draw;
  });
  useEffect(() => {
    repaint.current();
  }, [version]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let t = 0;
    let last = 0;
    let raf = 0;
    let inView = false;
    let visible = !document.hidden;

    const paint = (dt: number) => {
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);
      drawRef.current({ ctx, w, h, t, dt, reduced: rm.matches });
    };
    const running = () => !rm.matches && inView && visible;
    const loop = (now: number) => {
      raf = 0;
      if (!running()) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      paint(dt);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      if (running()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (w > 0) paint(0);
      }
    };
    repaint.current = () => {
      if (!raf && w > 0) paint(0);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!raf) paint(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const onVis = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    rm.addEventListener("change", sync);
    resize();
    // Repaint still frames once the web font is ready.
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive && !raf && w > 0) paint(0);
    });

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      rm.removeEventListener("change", sync);
      repaint.current = () => {};
    };
  }, []);

  return canvasRef;
}

export const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
