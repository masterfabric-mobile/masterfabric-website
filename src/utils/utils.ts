import { clsx, type ClassValue } from "clsx"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format date to a readable string
 */
export const getFormattedDate = (date: string | Date | null | undefined): string => {
  if (!date) return "";
  
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
