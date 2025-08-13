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
      {/* Status bar container with toggle button */}
      <div className={styles.statusBarWrapper}>
        {/* Toggle button */}
        <button 
          className={styles.statusToggleBtn}
          onClick={toggleStatusBar}
          title={isStatusBarVisible ? "Hide Status Bar" : "Show Status Bar"}
          aria-label="Toggle Status Bar"
          style={{
            top: isStatusBarVisible ? '0' : '0px',
            borderRadius: isStatusBarVisible ? '8px 8px 0 0' : '8px',
            borderBottom: isStatusBarVisible ? 'none' : '1px solid #e5e7eb'
          }}
        >
          <span>
            {isStatusBarVisible ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 9 12 15 6 9"></polyline>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 15 12 9 18 15"></polyline>
              </svg>
            )}
          </span>
        </button>
        
        {/* Status bar container */}
        <div 
          className={`${styles.dynamicStatusMessages} ${styles.statusBarContainer}`}
          style={{
            transform: `translateY(${isStatusBarVisible ? '0' : 'calc(100% - 0px)'})`,
            opacity: isStatusBarVisible ? 1 : 0,
            visibility: isStatusBarVisible ? 'visible' : 'hidden',
            height: isStatusBarVisible ? 'auto' : '0',
            marginTop: isStatusBarVisible ? '24px' : '12px'
          }}
      >
        {/* Status message content */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 12px',
          backgroundColor: 'white',
          borderRadius: '0 0 8px 8px'
        }}>
          {/* Top section with icon and title */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '6px',
            justifyContent: 'space-between'
          }}>
            {/* Left: Phase info */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Status icon */}
              <div style={{ 
                fontSize: '1rem', 
                marginRight: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                backgroundColor: '#f3f4f6',
                borderRadius: '50%'
              }}>{currentPhase.icon}</div>
              
              {/* Status text */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{currentPhase.title}</div>
                <div style={{ fontSize: '0.6875rem', color: '#4b5563' }}>
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
            marginTop: '3px', 
            height: '2px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '1px',
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                height: '100%', 
                background: '#3b82f6',
                borderRadius: '1px',
                transition: 'width 0.3s ease',
                width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%`
              }}
            />
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
    </div>
  );
}

// ErrorBoundary component for StatusBar
const StatusBarWithErrorBoundary: React.FC = () => {
  try {
    return <StatusBar />;
  } catch (error) {
    console.error('Error rendering StatusBar:', error);
    return (
      <div className={styles.statusBarWrapper}>
        {/* Error toggle button */}
        <button 
          className={styles.statusToggleBtn}
          style={{
            top: '0px',
            borderRadius: '8px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 15 12 9 18 15"></polyline>
          </svg>
        </button>
        <div className={styles.statusBarContainer} style={{opacity: 1, visibility: 'visible'}}>
          <div style={{
            padding: '14px',
            backgroundColor: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p>Error loading status bar. Please refresh the page.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default StatusBarWithErrorBoundary;
