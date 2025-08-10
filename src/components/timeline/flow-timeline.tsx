'use client'

import React, { useEffect, useState } from 'react';
import projectFlowData from '@/data/project-flow.json';
import type { TimelinePhase, PhaseStatus } from '@/components/timeline/types';

interface FlowTimelineProps {
  autoProgress?: boolean;
  interval?: number;
}

const FlowTimeline: React.FC<FlowTimelineProps> = ({ 
  autoProgress = true, 
  interval = 4000 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Get timeline data from existing codebase structure and normalize types
  const timelineData = projectFlowData.timeline;
  const phases: TimelinePhase[] = timelineData.phases.map(phase => ({
    ...phase,
    status: phase.status as PhaseStatus,
    milestones: phase.milestones.map(milestone => ({
      ...milestone,
      status: milestone.status as PhaseStatus
    }))
  }));

  useEffect(() => {
    if (!autoProgress || isPaused) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % phases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoProgress, isPaused, interval, phases.length]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="relative py-4 sm:py-8 bg-white">
      <div className="max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header - Using codebase title pattern */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-6">
            <span className="block">{timelineData.title}</span>
            <span className="block text-gray-600 text-base sm:text-xl lg:text-3xl font-normal mt-2">{timelineData.subtitle}</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            {timelineData.description}
          </p>
        </div>

        {/* Main Timeline */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-1">
              <span>Project Progress</span>
              <span className="font-semibold text-blue-600">
                {Math.round(((currentStep + 1) / phases.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((currentStep + 1) / phases.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Timeline Overview - Responsive */}
          <div className="mb-3 sm:mb-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-0.5 sm:gap-1">
              {phases.map((phase: TimelinePhase, index: number) => {
                const status = getStepStatus(index);
                const isActive = status === 'active';
                const isCompleted = status === 'completed';
                
                return (
                  <div key={phase.id} className="flex flex-col items-center group cursor-pointer" onClick={() => setCurrentStep(index)}>
                    {/* Modern Icon Container */}
                    <div className={`
                      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1
                      transition-all duration-300
                      ${isActive ? 'bg-blue-600 text-white scale-110' : ''}
                      ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                      ${status === 'upcoming' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : ''}
                      group-hover:scale-105
                    `}>
                      <span className="text-xs sm:text-base md:text-lg">{phase.icon}</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 mb-0">
                        {phase.shortTitle}
                      </h3>
                      <p className="text-[9px] sm:text-xs text-gray-500">
                        {phase.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Details - Responsive Card */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              {/* Modern Icon with proper styling */}
              <div className={`
                w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl
                bg-blue-600 text-white
              `}>
                <span className="text-lg sm:text-xl md:text-2xl">{phases[currentStep].icon}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2 sm:mb-4">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                    {phases[currentStep].title}
                  </h3>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium border border-gray-200 w-fit">
                    {phases[currentStep].duration}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-2 sm:mb-4 md:mb-6">
                  {phases[currentStep].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                  {/* Objectives */}
                  {phases[currentStep].details.objectives.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Objectives</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {phases[currentStep].details.objectives.map((objective, index) => (
                          <li key={index} className="flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm text-gray-700">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Deliverables */}
                  {phases[currentStep].details.deliverables.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">Deliverables</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {phases[currentStep].details.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-center gap-1 sm:gap-2 md:gap-3 text-xs sm:text-sm text-gray-700">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

                    {/* Floating Controls - Responsive, Hide/Show Toggle */}
          <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 flex items-center">
            {/* Minimalist Toggle Button */}
            <button
              onClick={() => setShowControls((v) => !v)}
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-l-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 border-r-0 transition-all duration-200"
              aria-label={showControls ? 'Hide controls' : 'Show controls'}
            >
              {showControls ? (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l3-3 3 3M9 12l3 3 3-3" />
                </svg>
              )}
            </button>
            {/* Main Controls */}
            {showControls && (
              <div className="bg-white border border-gray-200 rounded-r-lg p-2 sm:p-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-gray-900">
                      {currentStep + 1}
                    </div>
                    <div className="text-[9px] sm:text-xs text-gray-500">
                      of {phases.length}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                    >
                      {isPaused ? (
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => setCurrentStep(Math.min(phases.length - 1, currentStep + 1))}
                      disabled={currentStep === phases.length - 1}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowTimeline; 