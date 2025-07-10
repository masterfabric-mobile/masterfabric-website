'use client'

import React, { useState, useEffect, useRef, useMemo, ReactNode } from 'react'
import { TimelineContext } from './timeline-context'
import { TimelineControllerContext } from './timeline-context-types'
import type { TimelineData, TimelinePhase, PhaseDayRange } from './types'
import projectFlowData from '@/data/project-flow.json'

interface TimelineProviderProps {
  children: ReactNode;
}

export const TimelineProvider: React.FC<TimelineProviderProps> = ({ children }) => {
  // Get timeline data directly from project-flow.json and handle null case
  const timeline = useMemo(() => {
    const timelineData = (projectFlowData?.timeline || {
      title: "Project Development Process",
      subtitle: "Step-by-Step Progress",
      description: "Timeline",
      settings: {
        autoProgress: true,
        scrollBasedProgress: false,
        pauseOnHover: true,
        showProgressBar: true,
        animationDuration: 600,
        stepDuration: 4000
      },
      phases: []
    }) as TimelineData;
    
    // Normalize statuses of all phases and milestones
    timelineData.phases = timelineData.phases.map((phase: any) => {
      // Map the string status to our type-safe status
      const safeStatus = (status: string) => {
        switch (status) {
          case 'completed': return 'completed';
          case 'in-progress': return 'in-progress';
          case 'active': return 'active';
          case 'pending':
          default: return 'pending';
        }
      };
      
      return {
        ...phase,
        status: safeStatus(phase.status),
        milestones: phase.milestones.map((milestone: any) => ({
          ...milestone,
          status: safeStatus(milestone.status)
        }))
      };
    });
    
    return timelineData;
  }, []);
  
  console.log('Timeline Provider initialized with:', {
    phasesCount: timeline.phases.length,
    phases: timeline.phases.map(p => ({ id: p.id, title: p.title, duration: p.duration }))
  });
  
  // Calculate total days from the timeline data
  const calculateTotalDays = (): number => {
    try {
      // Find the last phase
      const lastPhase = timeline.phases[timeline.phases.length - 1];
      if (lastPhase) {
        // Parse the duration string (format: "Days X+" or "Days X-Y")
        const durationMatch = lastPhase.duration.match(/Days? (\d+)[\+\-](\d+)?/i);
        if (durationMatch) {
          if (durationMatch[2]) {
            // Format is "Days X-Y"
            return parseInt(durationMatch[2], 10);
          } else if (durationMatch[1]) {
            // Format is "Days X+"
            return parseInt(durationMatch[1], 10) + 10; // Add some buffer
          }
        }
      }
      return 35; // Default fallback
    } catch (error) {
      console.error('Error calculating total days:', error);
      return 35; // Default fallback
    }
  };
  
  // Current state
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentDay, setCurrentDay] = useState(1)
  const [totalDays] = useState(calculateTotalDays())
  const [isPaused, setIsPaused] = useState(false)
  const [isStatusBarVisible, setIsStatusBarVisible] = useState(true)
  const [lastNotifiedPhase, setLastNotifiedPhase] = useState<number>(-1) // Track last phase that showed notification
  
  // DOM references (would be used for more complex animations)
  const statusIconRef = useRef<HTMLDivElement>(null)
  const statusTitleRef = useRef<HTMLDivElement>(null)
  const statusDescriptionRef = useRef<HTMLDivElement>(null)
  
  // Intervals
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Normalize the timeline data to ensure type safety
  const normalizedTimeline = useMemo(() => {
    // Create a deep copy of the timeline
    const timelineCopy = JSON.parse(JSON.stringify(timeline));
    
    // Normalize statuses of all phases and milestones
    timelineCopy.phases = timelineCopy.phases.map((phase: any) => {
      // Map the string status to our type-safe status
      const safeStatus = (status: string) => {
        switch (status) {
          case 'completed': return 'completed';
          case 'in-progress': return 'in-progress';
          case 'active': return 'active';
          case 'pending':
          default: return 'pending';
        }
      };
      
      return {
        ...phase,
        status: safeStatus(phase.status),
        milestones: phase.milestones.map((milestone: any) => ({
          ...milestone,
          status: safeStatus(milestone.status)
        }))
      };
    });
    
    return timelineCopy as TimelineData;
  }, [timeline]);
  
  // Parse phase day ranges from timeline data
  const phaseRanges = useMemo(() => {
    const ranges = normalizedTimeline.phases.map((phase, index) => {
      // Parse phase duration string (format: "Days X-Y")
      const durationMatch = phase.duration.match(/Days? (\d+)-(\d+)/i);
      
      if (durationMatch && durationMatch.length >= 3) {
        const start = parseInt(durationMatch[1], 10);
        const end = parseInt(durationMatch[2], 10);
        const range = { start, end } as PhaseDayRange;
        console.log(`Phase ${index} (${phase.id}): ${phase.duration} -> Range: ${start}-${end}`);
        return range;
      }
      
      // Fallback if format doesn't match
      console.warn(`Phase ${index} (${phase.id}): Could not parse duration "${phase.duration}", using fallback`);
      return { start: 1, end: 7 } as PhaseDayRange;
    });
    
    console.log('All phase ranges:', ranges);
    return ranges;
  }, [normalizedTimeline]);
  
  // Initialize timeline
  useEffect(() => {
    // Start auto-progress if enabled
    if (timeline.settings.autoProgress) {
      startAutoProgress();
    }
    console.log('Timeline initialized - auto-progress enabled');
    // Clean up on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [timeline])
  
  // Function to show congratulations dialog - will be used by the notifications component
  const showCongratulationsDialog = React.useCallback((phaseIndex?: number) => {
    const phaseToShow = phaseIndex !== undefined ? phaseIndex : currentPhase;

    console.log(`Timeline Provider: Request to show congratulations dialog for phase ${phaseToShow}`);

    if (notificationFunctionsRef.current.showDialogFn) {
      notificationFunctionsRef.current.showDialogFn(phaseToShow);
    }

    return phaseToShow;
  }, [currentPhase]);

  // Function to show congratulations toast
  const showCongratulationsToast = React.useCallback((phaseIndex?: number) => {
    const phaseToShow = phaseIndex !== undefined ? phaseIndex : currentPhase;

    console.log(`Timeline Provider: Request to show congratulations toast for phase ${phaseToShow}`);

    if (notificationFunctionsRef.current.showToastFn) {
      notificationFunctionsRef.current.showToastFn(phaseToShow);
    }

    return phaseToShow;
  }, [currentPhase]);

  // Effect to show notifications when phase changes
  useEffect(() => {
    // Skip the initial render (when lastNotifiedPhase is -1)
    if (lastNotifiedPhase === -1) {
      setLastNotifiedPhase(currentPhase);
      
      // Show initial toast for the first phase
      if (currentPhase === 0) {
        setTimeout(() => {
          showCongratulationsToast(0);
        }, 1000);
      }
      return;
    }
    
    // Only show notifications when phase actually changes
    if (currentPhase !== lastNotifiedPhase) {
      console.log(`Phase changed from ${lastNotifiedPhase} to ${currentPhase}, showing notifications`);
      
      // Small delay to ensure the UI updates first
      setTimeout(() => {
        // When we advance to a new phase, we want to celebrate the completion of the previous phase
        if (currentPhase > 0 && lastNotifiedPhase >= 0) {
          // Show completion notifications for the phase we just finished
          const completedPhaseIndex = currentPhase - 1;
          console.log(`Showing completion notifications for phase ${completedPhaseIndex}`);
          
          // Show toast for the completed phase
          showCongratulationsToast(completedPhaseIndex);
          
          // Show dialog for the completed phase after a short delay
          setTimeout(() => {
            showCongratulationsDialog(completedPhaseIndex);
          }, 500);
        } else if (currentPhase === 0) {
          // Special case for first phase - just show toast to indicate start
          showCongratulationsToast(0);
        }
      }, 300);
      
      // Update the last notified phase
      setLastNotifiedPhase(currentPhase);
    }
  }, [currentPhase, lastNotifiedPhase, showCongratulationsDialog, showCongratulationsToast]);
  
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
  
  // Advance to next day with proper bounds checking
  const advanceDay = () => {
    setCurrentDay(prevDay => {
      const nextDay = prevDay + 1;
      const isLastPhase = currentPhase === normalizedTimeline.phases.length - 1;
      const currentRange = phaseRanges[currentPhase];
      const isLastDayOfPhase = currentRange && nextDay > currentRange.end;
      const isLastDayOverall = nextDay > totalDays;

      // Eğer son fazdaysak ve gün aralığı bitti ise, ilerlemeyi tamamen durdur
      if (isLastPhase && (isLastDayOfPhase || isLastDayOverall)) {
        setIsPaused(true);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        // Final notification sadece bir kez gösterilsin
        if (lastNotifiedPhase !== currentPhase) {
          showCongratulationsToast(currentPhase);
          setTimeout(() => {
            showCongratulationsDialog(currentPhase);
          }, 500);
          setLastNotifiedPhase(currentPhase);
        }
        return prevDay; // Son günde kal
      }

      // Faz geçişi (son fazda değilsek ve fazın gün aralığı bitti ise)
      if (!isLastPhase && isLastDayOfPhase) {
        setCurrentPhase(prevPhase => prevPhase + 1);
      }

      // currentDay hiçbir zaman totalDays'i geçmesin
      if (nextDay > totalDays) {
        return prevDay;
      }
      // Son fazdaysak ve fazın bitiş gününü geçtiysek, currentDay artmasın
      if (isLastPhase && isLastDayOfPhase) {
        return prevDay;
      }
      return nextDay;
    });
  };
  
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
  
  // Get current phase data with safety check
  const getCurrentPhase = (): TimelinePhase => {
    if (!normalizedTimeline.phases || normalizedTimeline.phases.length === 0) {
      // Return a default phase if phases array is empty
      return {
        id: 'loading',
        title: 'Loading',
        shortTitle: 'Loading',
        icon: '⏳',
        color: '#999999',
        status: 'pending',
        duration: 'Days 0-0',
        description: 'Loading timeline data...',
        details: { objectives: [], deliverables: [], team: [] },
        milestones: []
      };
    }

    // currentDay'e göre fazı bul
    const foundIndex = phaseRanges.findIndex(
      (range) => currentDay >= range.start && currentDay <= range.end
    );
    const safeIndex = foundIndex !== -1 ? foundIndex : Math.max(0, Math.min(currentPhase, normalizedTimeline.phases.length - 1));
    return normalizedTimeline.phases[safeIndex];
  }
  
  // Calculate progress percentage clamped to 100%
  const getProgressPercentage = (): number => {
    const percentage = (currentDay / totalDays) * 100;
    return Math.min(percentage, 100); // Ensure percentage never exceeds 100%
  }
  
  // Get current phase day range
  const getCurrentPhaseRange = (): PhaseDayRange => {
    return phaseRanges[currentPhase];
  }
  
  // Get phase status text with safe bounds checking
  const getStatusText = (): string => {
    const phase = getCurrentPhase();
    const phaseRange = getCurrentPhaseRange();
    
    // Clamp days to valid ranges
    const safeCurrentDay = Math.min(currentDay, totalDays);
    const daysInPhase = Math.max(1, Math.min(safeCurrentDay - phaseRange.start + 1, phaseRange.end - phaseRange.start + 1));
    const totalPhaseDays = phaseRange.end - phaseRange.start + 1;
    
    return `${phase.title} - Day ${daysInPhase}/${totalPhaseDays} (Overall Day ${safeCurrentDay}/${totalDays})`;
  }
  
  // Update phase statuses based on current day
  const updatePhaseStatuses = () => {
    // Clone the phases array to avoid direct mutation
    const updatedPhases = [...normalizedTimeline.phases];

    // Update phase statuses based on current day
    updatedPhases.forEach((phase, index) => {
      const range = phaseRanges[index];
      if (!range) return;
      if (currentDay > range.end) {
        phase.status = 'completed';
      } else if (currentDay >= range.start && currentDay <= range.end) {
        phase.status = 'active';
      } else if (currentDay < range.start) {
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
  
  // Go to next phase with bounds checking
  const goToNextPhase = () => {
    console.log(`goToNextPhase called. Current phase: ${currentPhase}, Total phases: ${normalizedTimeline.phases.length}`);
    
    if (currentPhase < normalizedTimeline.phases.length - 1) {
      // Ensure we don't exceed the maximum number of phases
      const nextPhase = Math.min(currentPhase + 1, normalizedTimeline.phases.length - 1);
      
      console.log(`Moving from phase ${currentPhase} to phase ${nextPhase}`);
      
      // Update current day based on the new phase's range
      if (phaseRanges[nextPhase]) {
        console.log(`Setting current day to ${phaseRanges[nextPhase].start} for phase ${nextPhase}`);
        setCurrentDay(phaseRanges[nextPhase].start);
      }
      
      // Set the phase last (this will trigger the notification effect)
      setCurrentPhase(nextPhase);
      
      console.log(`Successfully advanced to phase ${nextPhase}`);
    } else {
      console.log(`Cannot advance: Already at final phase (${currentPhase}/${normalizedTimeline.phases.length - 1})`);
    }
  };
  
  // Set specific phase
  const setCurrentPhaseWithDay = (phase: number) => {
    if (phase >= 0 && phase < normalizedTimeline.phases.length) {
      // Update current day based on the new phase's range
      if (phaseRanges[phase]) {
        setCurrentDay(phaseRanges[phase].start);
      }
      
      // Set phase last (this will trigger the notification effect)
      setCurrentPhase(phase);
      
      console.log(`Set to phase ${phase}`);
    } else {
      console.log(`Invalid phase index: ${phase}`);
    }
  };
  
  // Reference to store notification function overrides
  const notificationFunctionsRef = useRef<{
    showDialogFn: ((phaseIndex?: number) => number) | null;
    showToastFn: ((phaseIndex?: number) => number) | null;
  }>({
    showDialogFn: null,
    showToastFn: null
  });


  
  // Create the context value
  const contextValue: TimelineControllerContext = {
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
    advanceDay,
    goToNextPhase,
    setCurrentPhase: setCurrentPhaseWithDay, // Renaming the function to match the interface
    showCongratulationsDialog,
    showCongratulationsToast,
    _registerNotificationFunctions: (
      showDialogFn: (phaseIndex?: number) => number,
      showToastFn: (phaseIndex?: number) => number
    ) => {
      notificationFunctionsRef.current = {
        showDialogFn,
        showToastFn
      };
      console.log('Notification functions registered with TimelineProvider');
    }
  };
  
  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineProvider;

