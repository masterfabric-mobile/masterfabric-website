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

  // Icon mapping for phases
  const getPhaseIcon = (phaseId: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'discovery': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      'design': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      'development': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      'testing': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'deployment': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      'maintenance': (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    };
    return iconMap[phaseId] || iconMap['discovery'];
  };

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
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 leading-tight mb-3 sm:mb-4">
            <span className="block">{timelineData.title}</span>
            <span className="block text-gray-600 text-base sm:text-lg lg:text-xl font-normal mt-1">{timelineData.subtitle}</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
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
            <div className="w-full bg-gray-100 rounded-sm h-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-sm transition-all duration-700 ease-out"
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
                      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1
                      transition-all duration-300 border
                      ${isActive ? 'border-blue-500 text-blue-600 bg-blue-50' : ''}
                      ${isCompleted ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : ''}
                      ${status === 'upcoming' ? 'border-gray-200 text-gray-400 bg-gray-50 hover:border-gray-300' : ''}
                      group-hover:scale-105
                    `}>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                        {getPhaseIcon(phase.id)}
                      </div>
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
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Modern Icon with proper styling */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl border border-blue-500 bg-blue-50 flex items-center justify-center text-blue-600">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                  {getPhaseIcon(phases[currentStep].id)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2 sm:mb-4">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                    {phases[currentStep].title}
                  </h3>
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-100 w-fit">
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
                          <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
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
                          <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
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
          <div className="fixed bottom-4 right-4 z-50 flex items-center">
            {/* Minimalist Toggle Button */}
            <button
              onClick={() => setShowControls((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-l-xl bg-white hover:bg-gray-50 border border-gray-100 border-r-0 transition-all duration-200"
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
              <div className="bg-white border border-gray-100 rounded-r-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-base font-bold text-gray-900">
                      {currentStep + 1}
                    </div>
                    <div className="text-xs text-gray-500">
                      of {phases.length}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center border border-gray-100"
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-8 h-8 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
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
                      className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center border border-gray-100"
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