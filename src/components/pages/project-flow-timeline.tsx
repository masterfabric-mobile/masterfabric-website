'use client'

/**
 * ProjectFlowTimeline.tsx
 * 
 * Main project flow timeline component - Modular structure
 * 
 * This component now uses the following sub-components:
 * - TimelineHeader: Header and description section
 * - TimelineCard: Individual phase cards
 * - StatusBar: Dynamic status bar and controls
 * - Notifications: Toast notifications and modal dialogs
 */

import React, { useContext, forwardRef, useImperativeHandle } from 'react'
import TimelineHeader from '@/components/timeline/timeline-header'
import TimelineCard from '@/components/timeline/timeline-card'

import TimelineProvider from '@/components/timeline/timeline-provider'
import { TimelineContext } from '@/components/timeline/timeline-context'
import styles from '@/styles/timeline.module.css'

// Import data and types
import projectFlowDataImport from '@/data/project-flow.json'
import type { TimelineData, Tool, TimelinePhase } from '@/components/timeline/types'

// Define the complete structure of the project flow data
interface ProjectFlowData {
  timeline: TimelineData;
  passion: {
    title: string;
    description: string;
  };
  processSteps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  tools: Record<string, Array<{
    name: string;
    icon: string;
    category: string;
  }>>;
}

// Cast the imported data to the correct type
const projectFlowData = projectFlowDataImport as ProjectFlowData;

// Get tools from project-flow.json
const phaseTools: Record<string, Tool[]> = projectFlowData.tools || {
  discovery: [
    { name: "Figma", icon: "🎨" }, 
    { name: "Miro", icon: "🧩" }, 
    { name: "Notion", icon: "📝" }
  ],
  design: [
    { name: "Figma", icon: "🎨" }, 
    { name: "Adobe XD", icon: "🎭" }, 
    { name: "Sketch", icon: "✏️" }
  ],
  development: [
    { name: "React Native", icon: "⚛️" }, 
    { name: "Node.js", icon: "🟢" }, 
    { name: "TypeScript", icon: "📘" }
  ],
  testing: [
    { name: "Jest", icon: "🃏" }, 
    { name: "Detox", icon: "🧪" }, 
    { name: "Postman", icon: "📮" }
  ],
  deployment: [
    { name: "App Store", icon: "🍎" }, 
    { name: "Play Store", icon: "📱" }, 
    { name: "Firebase", icon: "🔥" }
  ],
  maintenance: [
    { name: "Sentry", icon: "🚨" }, 
    { name: "Analytics", icon: "📊" }, 
    { name: "Zendesk", icon: "🎧" }
  ]
};

interface ProjectFlowTimelineProps {
  timeline?: TimelineData;
}

const TimelineContent = ({ timeline = projectFlowData.timeline as TimelineData }) => {
  const controller = useContext(TimelineContext);
  
  if (!controller) {
    return <div className={styles.timelineLoading}>Loading timeline...</div>;
  }
  
  // Get tools for a specific phase
  const getPhaseTools = (phaseId: string): Tool[] => {
    const phaseToolsData = phaseTools[phaseId];
    if (!phaseToolsData) return [];
    
    // Convert the tools from project-flow.json format to our Tool[] format
    return phaseToolsData.map(tool => ({
      name: tool.name,
      icon: tool.icon
    }));
  };
  
  // Get all phases with safety check
  const phases = controller.updatePhaseStatuses() || [];
  
  
  const handleCardMouseEnter = () => {
    if (controller && controller.togglePause && !controller.isPaused) {
      controller.togglePause();
    }
  };
  const handleCardMouseLeave = () => {
    if (controller && controller.togglePause && controller.isPaused) {
      controller.togglePause();
    }
  };

  return (
    <section className={styles.timelineContainer}>
      {/* Header section */}
      <div className={styles.timelineHeader}>
        <TimelineHeader timeline={timeline} />
      </div>

      {/* Timeline container */}
      <div className={styles.timelineContainerInner}>
        <div className={styles.timelineTrack}>
          {phases.map((phase, index) => (
            <div 
              key={phase.id} 
              className={`${styles.timelineCard} ${index === controller.currentPhase ? styles.activePhaseCard : ''}`}
            >
              <TimelineCard 
                phase={phase as TimelinePhase} 
                tools={getPhaseTools(phase.id)} 
                isActive={index === controller.currentPhase}
                isCurrent={index === controller.currentPhase}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

// Define ref type for controlling timeline externally
export interface TimelineRefType {
  showCongratulationsDialog: (phaseIndex?: number) => void;
  showCongratulationsToast: (phaseIndex?: number) => void;
}

// Create a wrapper component for TimelineContent that can receive and forward a ref
const TimelineContentWithRef = forwardRef<TimelineRefType, { timeline?: TimelineData }>((props, ref) => {
  const controller = useContext(TimelineContext);
  
  // Forward the timeline control methods via ref
  useImperativeHandle(ref, () => ({
    showCongratulationsDialog: (phaseIndex?: number) => {
      if (controller && controller.showCongratulationsDialog) {
        controller.showCongratulationsDialog(phaseIndex);
      }
    },
    showCongratulationsToast: (phaseIndex?: number) => {
      if (controller && controller.showCongratulationsToast) {
        controller.showCongratulationsToast(phaseIndex);
      }
    }
  }));

  return <TimelineContent timeline={props.timeline} />;
});
TimelineContentWithRef.displayName = 'TimelineContentWithRef';

// Export the main component with ref
const ProjectFlowTimeline = forwardRef<TimelineRefType, ProjectFlowTimelineProps>((props, ref) => {
  return (
    <TimelineProvider>
      <TimelineContentWithRef ref={ref} timeline={props.timeline} />
    </TimelineProvider>
  );
});
ProjectFlowTimeline.displayName = 'ProjectFlowTimeline';

export default ProjectFlowTimeline;
