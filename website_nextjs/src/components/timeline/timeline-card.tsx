'use client'

import React from 'react'
import type { TimelinePhase, Tool } from './types'
import styles from '@/styles/timeline.module.css'

interface TimelineCardProps {
  phase: TimelinePhase;
  tools?: Tool[];
  isActive?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ phase, tools = [], isActive = false }) => {
  // Helper function to get status class
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'in-progress':
        return styles.statusInProgress;
      case 'active':
        return styles.statusActive;
      case 'pending':
      default:
        return styles.statusPending;
    }
  };
  
  const getBorderClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-blue-500';
      case 'active':
        return 'border-blue-600';
      case 'pending':
      default:
        return 'border-gray-300';
    }
  };

  // Use CSS modules instead of Tailwind
  return (
    <div className={`${styles.timelineCardContainer} ${isActive ? styles.activePhaseCard : ''} ${styles[`border${phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}`]}`}>
      <div>
        {/* Card header */}
        <div className={styles.cardHeader}>
          {/* Phase icon */}
          <span className={`${styles.phaseIcon} ${isActive ? styles.pulsingIcon : ''}`}>{phase.icon}</span>
          
          <div className={styles.phaseHeaderContent}>
            {/* Phase title */}
            <h3 className={styles.phaseTitle}>
              {phase.shortTitle}
            </h3>
            
            {/* Status badge */}
            <span className={`${styles.statusBadge} ${getStatusClass(phase.status)}`}>
              {phase.status.charAt(0).toUpperCase() + phase.status.slice(1).replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Phase description */}
        <p className={styles.phaseDescription}>
          {phase.description}
        </p>

        {/* Tools section */}
        {tools && tools.length > 0 && (
          <div className={styles.toolsSection}>
            <p className={styles.sectionLabel}>Tools:</p>
            <div className={styles.toolsChips}>
              {tools.slice(0, 3).map((tool, index) => (
                <div key={index} className={styles.toolChip}>
                  <span className={styles.toolIcon}>{tool.icon}</span>
                  <span className={styles.toolName}>{tool.name}</span>
                </div>
              ))}
              {tools.length > 3 && (
                <div className={styles.toolChipMore}>
                  <span>+{tools.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Duration info */}
        <div className={styles.durationInfo}>
          <span className={styles.durationIcon}>⏱️</span>
          <span className={styles.durationText}>{phase.duration}</span>
        </div>
        
        {/* Milestones preview */}
        {phase.milestones && phase.milestones.length > 0 && (
          <div className="milestones-preview mb-2">
            <p className="text-xs text-slate-500 mb-1">Milestones:</p>
            <div className="space-y-0.5">
              {phase.milestones.slice(0, 1).map((milestone, index) => (
                <div key={index} className={styles.milestoneItem}>
                  <span className={`${styles.milestoneStatusDot} ${getStatusClass(milestone.status)}`}></span>
                  <span className={styles.milestoneName}>{milestone.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables preview */}
        <div className={styles.deliverablesPreview}>
          <p className={styles.sectionLabel}>Deliverables:</p>
          <div className={styles.deliverablesList}>
            {phase.details.deliverables.slice(0, 1).map((deliverable, index) => (
              <span key={index} className={styles.deliverableItem}>{deliverable}</span>
            ))}
            {phase.details.deliverables.length > 1 && (
              <span className={styles.deliverablesMore}>+{phase.details.deliverables.length - 1} more...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineCard
