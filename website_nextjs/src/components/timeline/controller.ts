'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import type { TimelineData, TimelinePhase, PhaseDayRange } from './types'

export const useTimelineController = (timeline: TimelineData) => {
  // Current state
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentDay, setCurrentDay] = useState(1)
  const [totalDays] = useState(35) // Total project duration
  const [isPaused, setIsPaused] = useState(false)
  const [isStatusBarVisible, setIsStatusBarVisible] = useState(true)
  
  // DOM references (would be used for more complex animations)
  const statusIconRef = useRef<HTMLDivElement>(null)
  const statusTitleRef = useRef<HTMLDivElement>(null)
  const statusDescriptionRef = useRef<HTMLDivElement>(null)
  
  // Intervals
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Parse phase day ranges from timeline data
  const phaseRanges = useMemo(() => {
    return timeline.phases.map(phase => {
      // Parse phase duration string (format: "Days X-Y")
      const durationMatch = phase.duration.match(/Days? (\d+)-(\d+)/i);
      
      if (durationMatch && durationMatch.length >= 3) {
        const start = parseInt(durationMatch[1], 10);
        const end = parseInt(durationMatch[2], 10);
        return { start, end } as PhaseDayRange;
      }
      
      // Fallback if format doesn't match
      return { start: 1, end: 7 } as PhaseDayRange;
    });
  }, [timeline]);
  
  // Initialize timeline
  useEffect(() => {
    if (!timeline) return
    
    // Start auto-progress if enabled
    if (timeline.settings.autoProgress) {
      startAutoProgress()
    }
    
    // Clean up on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [timeline])
  
  // Start auto progress
  const startAutoProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Set interval to advance days
    progressIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        advanceDay()
      }
    }, timeline.settings.stepDuration)
  }
  
  // Advance to next day
  const advanceDay = () => {
    setCurrentDay(prevDay => {
      const nextDay = prevDay + 1
      
      // Check if we need to reset after reaching the end
      if (nextDay > totalDays) {
        setCurrentPhase(0); // Reset to first phase
        return 1; // Reset to day 1
      }
      
      // Check if we should advance to the next phase based on day ranges
      if (currentPhase < timeline.phases.length - 1) {
        const currentRange = phaseRanges[currentPhase];
        
        // If we've passed the end day of the current phase, move to the next phase
        if (nextDay > currentRange.end) {
          setCurrentPhase(prevPhase => prevPhase + 1);
        }
      }
      
      return nextDay;
    })
  }
  
  // Toggle pause state
  const togglePause = () => {
    setIsPaused(!isPaused)
  }
  
  // Reset timeline
  const resetTimeline = () => {
    setCurrentPhase(0)
    setCurrentDay(1)
    setIsPaused(false)
    
    // Restart auto progress
    if (timeline.settings.autoProgress) {
      startAutoProgress()
    }
  }
  
  // Toggle status bar visibility
  const toggleStatusBar = () => {
    setIsStatusBarVisible(!isStatusBarVisible)
  }
  
  // Get current phase data
  const getCurrentPhase = (): TimelinePhase => {
    return timeline.phases[currentPhase]
  }
  
  // Calculate progress percentage
  const getProgressPercentage = (): number => {
    return (currentDay / totalDays) * 100
  }
  
  // Get current phase day range
  const getCurrentPhaseRange = (): PhaseDayRange => {
    return phaseRanges[currentPhase];
  }
  
  // Get phase status text
  const getStatusText = (): string => {
    const phase = getCurrentPhase();
    const phaseRange = getCurrentPhaseRange();
    const daysInPhase = currentDay - phaseRange.start + 1;
    const totalPhaseDays = phaseRange.end - phaseRange.start + 1;
    
    return `${phase.title} - Day ${daysInPhase}/${totalPhaseDays} (Overall Day ${currentDay}/${totalDays})`;
  }
  
  // Update phase statuses based on current day
  const updatePhaseStatuses = () => {
    // Clone the phases array to avoid direct mutation
    const updatedPhases = [...timeline.phases];
    
    // Update phase statuses based on current day
    updatedPhases.forEach((phase, index) => {
      const range = phaseRanges[index];
      
      if (index < currentPhase) {
        phase.status = 'completed';
      } else if (index === currentPhase) {
        phase.status = 'active';
      } else {
        phase.status = 'pending';
      }
      
      // Update milestones based on current day
      phase.milestones.forEach(milestone => {
        // Parse milestone day from date string (format: "Day X" or "Week X")
        const dayMatch = milestone.date.match(/Day (\d+)/i);
        const weekMatch = milestone.date.match(/Week (\d+)/i);
        
        let milestoneDay = 1;
        if (dayMatch && dayMatch[1]) {
          milestoneDay = parseInt(dayMatch[1], 10);
        } else if (weekMatch && weekMatch[1]) {
          milestoneDay = parseInt(weekMatch[1], 10) * 7; // Convert weeks to days
        }
        
        if (currentDay >= milestoneDay) {
          milestone.status = 'completed';
        } else if (Math.abs(currentDay - milestoneDay) <= 3) {
          milestone.status = 'in-progress';
        } else {
          milestone.status = 'pending';
        }
      });
    });
    
    return updatedPhases;
  }
  
  return {
    currentPhase,
    currentDay,
    totalDays,
    isPaused,
    isStatusBarVisible,
    phaseRanges,
    getCurrentPhase,
    getCurrentPhaseRange,
    getProgressPercentage,
    getStatusText,
    updatePhaseStatuses,
    togglePause,
    resetTimeline,
    toggleStatusBar,
    advanceDay
  }
}
