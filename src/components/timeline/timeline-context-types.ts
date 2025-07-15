'use client'

import type { TimelinePhase, PhaseDayRange } from './types'

// Define the shape of the controller data that will be stored in the context
export interface TimelineControllerContext {
  currentPhase: number;
  currentDay: number;
  totalDays: number;
  isPaused: boolean;
  isStatusBarVisible: boolean;
  phaseRanges: PhaseDayRange[];
  getCurrentPhase: () => TimelinePhase;
  getCurrentPhaseRange: () => PhaseDayRange;
  getProgressPercentage: () => number;
  getStatusText: () => string;
  updatePhaseStatuses: () => TimelinePhase[];
  togglePause: () => void;
  resetTimeline: () => void;
  toggleStatusBar: () => void;
  advanceDay: () => void;
  goToNextPhase: () => void;
  setCurrentPhase: (phase: number) => void;
  showCongratulationsDialog: (phaseIndex?: number) => void; 
  showCongratulationsToast: (phaseIndex?: number) => void; 
  _registerNotificationFunctions: (
    showDialogFn: (phaseIndex?: number) => number,
    showToastFn: (phaseIndex?: number) => number
  ) => void; 
}
