"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Transform animations are skipped when the OS asks for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
