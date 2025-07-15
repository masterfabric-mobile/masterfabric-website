'use client'

import { createContext } from 'react'
import { TimelineControllerContext } from './timeline-context-types'

// Create the context with a default null value
export const TimelineContext = createContext<TimelineControllerContext | null>(null);

// Re-export the interface
export type { TimelineControllerContext } from './timeline-context-types';
