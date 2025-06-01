/**
 * Timeline Component Type Definitions
 * This file contains all TypeScript interfaces for the ProjectFlowTimeline component
 */

// Timeline main data structure interface
export interface TimelineData {
  title: string;
  subtitle: string;
  description: string;
  settings: TimelineSettings;
  phases: TimelinePhase[];
}

// Timeline settings interface
export interface TimelineSettings {
  autoProgress: boolean;
  scrollBasedProgress: boolean;
  pauseOnHover: boolean;
  showProgressBar: boolean;
  animationDuration: number;
  stepDuration: number;
}

// Timeline phase interface
export interface TimelinePhase {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  status: 'completed' | 'in-progress' | 'pending' | 'active';
  duration: string;
  description: string;
  details: PhaseDetails;
  milestones: Milestone[];
}

// Phase details interface
export interface PhaseDetails {
  objectives: string[];
  deliverables: string[];
  team: string[];
}

// Milestone interface
export interface Milestone {
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'active';
  date: string;
}

// Tool interface
export interface Tool {
  name: string;
  icon: string;
}

// Phase day range interface
export interface PhaseDayRange {
  start: number;
  end: number;
}

// Timeline props interface
export interface TimelineProps {
  timeline: TimelineData;
}
