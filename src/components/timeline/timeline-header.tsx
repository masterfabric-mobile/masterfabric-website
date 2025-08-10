'use client'

import React, { useContext } from 'react'
import type { TimelineData } from './types'
import { TimelineContext } from './timeline-context'
import styles from '@/styles/timeline.module.css'

interface TimelineHeaderProps {
  timeline: TimelineData;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({ timeline }) => {
  // Get controller from context
  const controller = useContext(TimelineContext);
  
  // Default values in case timeline data is missing
  const title = timeline?.title || "Project Development Process";
  const subtitle = timeline?.subtitle || "Step-by-Step Progress";
  const description = timeline?.description || "Track our development process";
  
  // Safe access to current phase
  const currentPhase = controller?.getCurrentPhase();
  const currentDay = controller?.currentDay || 1;
  const phaseRanges = controller?.phaseRanges || [];
  const isTimelineCompleted = controller && phaseRanges.length > 0 &&
    controller.currentPhase === phaseRanges.length - 1 &&
    controller.currentDay >= phaseRanges[phaseRanges.length - 1].end;

  return (
    <div className={styles.timelineHeaderContainer}>
      {/* Main title */}
      <h2 
        className={styles.timelineTitle} 
        style={{ 
          fontSize: '1.45rem', 
          fontWeight: '600',
          lineHeight: '1.75rem'
        }}
      >
        {isTimelineCompleted ? '🎉 Project Timeline Completed!' : title}
      </h2>
      {/* Subtitle with current phase */}
      <p className={styles.timelineSubtitle}>
        {isTimelineCompleted
          ? 'All phases are completed. Congratulations!'
          : (
            <>
              {subtitle}
              {controller && currentPhase && (
                <span className={styles.currentPhaseLabel}>
                  Current: {currentPhase.title} (Day {currentDay})
                </span>
              )}
            </>
          )}
      </p>
      {/* Description text */}
      {!isTimelineCompleted && (
        <p className={styles.timelineDescription}>
          {description}
        </p>
      )}
    </div>
  )
}
export default TimelineHeader
