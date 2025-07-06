import { clsx, type ClassValue } from "clsx"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
