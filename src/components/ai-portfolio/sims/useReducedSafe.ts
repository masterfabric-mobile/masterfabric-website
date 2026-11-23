"use client";

import { useEffect, useState } from "react";

/**
 * prefers-reduced-motion, read only after mount so the static HTML and the
 * first client render always match (no hydration mismatch). Follows live
 * changes of the OS setting.
 */
export function useReducedSafe(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(rm.matches);
    sync();
    rm.addEventListener("change", sync);
    return () => rm.removeEventListener("change", sync);
  }, []);
  return reduced;
}
