'use client'

import React, { useContext } from 'react'
import styles from '@/styles/timeline.module.css'
// Use relative path for importing from the same directory
import { TimelineContext, TimelineControllerContext } from './timeline-context'

const StatusBar: React.FC = () => {
  // Get controller from context with proper type assertion
  const controller = useContext(TimelineContext) as TimelineControllerContext;
  
  if (!controller) {
    console.warn('StatusBar: TimelineContext not found');
    return null;
  }
  
  const {
    currentDay,
    totalDays,
    isStatusBarVisible,
    getCurrentPhase,
    getProgressPercentage,
    getStatusText,
    toggleStatusBar
  } = controller;
  
  // Get the current phase with fallback for safety
  const currentPhase = getCurrentPhase() || {
    icon: '⏳',
    title: 'Loading',
    shortTitle: 'Loading',
    id: 'loading',
    status: 'pending',
    duration: 'Days 0-0',
    description: 'Loading timeline data...',
    color: '#999999',
    details: { objectives: [], deliverables: [], team: [] },
    milestones: []
  };

  // Calculate progress percentage safely
  const progressPercentage = (() => {
    try {
      return getProgressPercentage();
    } catch (error) {
      console.error('Error calculating progress percentage:', error);
      return 0;
    }
  })();
  
  // Get status text safely
  const statusText = (() => {
    try {
      return getStatusText();
    } catch (error) {
      console.error('Error getting status text:', error);
      return `${currentPhase.title} - Day ${currentDay}/${totalDays}`;
    }
  })();

  return (
    <div>
      {/* Standalone toggle button */}
      <button 
        className={styles.statusToggleBtn}
        onClick={toggleStatusBar}
        title={isStatusBarVisible ? "Hide Status Bar" : "Show Status Bar"}
        aria-label="Toggle Status Bar"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          zIndex: 101,
          borderBottomLeftRadius: isStatusBarVisible ? 0 : '8px',
          borderBottomRightRadius: isStatusBarVisible ? 0 : '8px'
        }}
      >
        {isStatusBarVisible ? (
          <span className={styles.chevronDown}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 9 12 15 6 9"></polyline>
            </svg>
          </span>
        ) : (
          <span className={styles.chevronUp}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 15 12 9 18 15"></polyline>
            </svg>
          </span>
        )}
      </button>
      
      {/* Status bar container */}
      <div 
        className={`${styles.dynamicStatusMessages} ${styles.statusBarContainer}`}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: `translateX(-50%) translateY(${isStatusBarVisible ? '0' : '100%'})`,
          maxWidth: '600px',
          width: '90%',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          zIndex: 100,
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Status message content */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          padding: '14px 18px',
          backgroundColor: 'white',
          borderRadius: '8px 8px 0 0'
        }}>
          {/* Top section with icon and title */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px',
            justifyContent: 'space-between'
          }}>
            {/* Left: Phase info */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Status icon */}
              <div style={{ 
                fontSize: '1.25rem', 
                marginRight: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%'
              }}>{currentPhase.icon}</div>
              
              {/* Status text */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: '600', fontSize: '1rem' }}>{currentPhase.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                  Day {Math.min(currentDay, totalDays)} of {totalDays}
                </div>
              </div>
            </div>
            
            {/* Right: Progress percentage */}
            <div style={{ 
              fontWeight: '600', 
              fontSize: '1rem', 
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 10px',
              borderRadius: '4px'
            }}>
              {Math.min(progressPercentage, 100).toFixed(0)}%
            </div>
          </div>
          
          {/* Progress bar */}
          <div style={{ 
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            overflow: 'hidden',
            margin: '4px 0'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(progressPercentage, 100)}%`,
              backgroundColor: '#10b981',
              borderRadius: '9999px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          
          {/* Status text */}
          <div style={{ 
            fontSize: '0.8125rem', 
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '6px'
          }}>
            {statusText}
          </div>
        </div>
      </div>
    </div>
  )
}

// ErrorBoundary component for StatusBar
const StatusBarWithErrorBoundary: React.FC = () => {
  try {
    return <StatusBar />;
  } catch (error) {
    console.error('Error rendering StatusBar:', error);
    return (
      <div>
        {/* Error toggle button */}
        <button style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          backgroundColor: 'white',
          borderRadius: '8px 8px 0 0',
          padding: '6px 12px',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          borderBottom: 'none',
          zIndex: 101,
          cursor: 'pointer'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 15 12 9 18 15"></polyline>
          </svg>
        </button>
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '600px',
          width: '90%',
          borderRadius: '8px 8px 0 0',
          padding: '14px',
          backgroundColor: 'white',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
          zIndex: 100
        }}>
          <p>Error loading status bar. Please refresh the page.</p>
        </div>
      </div>
    );
  }
};

export default StatusBarWithErrorBoundary;
