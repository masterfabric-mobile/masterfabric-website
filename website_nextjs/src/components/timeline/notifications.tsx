'use client'

import React, { useState, useContext, useEffect } from 'react'
import styles from '@/styles/timeline.module.css'
import { TimelineContext } from './timeline-context'

const Notifications: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [completedPhase, setCompletedPhase] = useState<number>(0);
  const [totalPhases, setTotalPhases] = useState<number>(6);
  const [nextPhaseName, setNextPhaseName] = useState<string>('Design Phase');
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [phaseTitle, setPhaseTitle] = useState<string>('Discovery Phase');
  
  // Get controller from context if available
  const controller = useContext(TimelineContext);
  
  // Debug effect for toast visibility
  useEffect(() => {
    console.log('Toast visibility changed:', showToast ? 'visible' : 'hidden');
  }, [showToast]);
  
  // Effect to update dialog content when controller changes phase
  useEffect(() => {
    if (controller) {
      // Calculate total phases
      const phases = controller.updatePhaseStatuses();
      if (phases) {
        setTotalPhases(phases.length);
        
        // Set current phase info with safe bounds checking
        setCompletedPhase(Math.min(controller.currentPhase, phases.length - 1));
        
        // Calculate progress percentage, clamped to 100%
        const calculatedPercentage = Math.round((controller.currentPhase + 1) / phases.length * 100);
        setProgressPercentage(Math.min(calculatedPercentage, 100));
        
        // Set phase title
        const currentPhase = controller.getCurrentPhase();
        if (currentPhase) {
          setPhaseTitle(currentPhase.shortTitle || currentPhase.title);
        }
        
        // Set next phase name if not at the end
        if (controller.currentPhase < phases.length - 1) {
          setNextPhaseName(phases[controller.currentPhase + 1].shortTitle || phases[controller.currentPhase + 1].title);
        }
      }
    }
  }, [controller?.currentPhase]);
  
  // Register the notification functions with the TimelineProvider
  useEffect(() => {
    if (controller && controller._registerNotificationFunctions) {
      // Create the function to show the dialog
      const showDialogFn = (phaseIndex?: number) => {
        // Get the phase index to show
        const phaseToShow = phaseIndex !== undefined ? phaseIndex : controller.currentPhase;
        
        // Update dialog content based on the specific phase
        updateDialogForPhase(phaseToShow);
        
        // Log that the dialog is being shown
        console.log(`Showing congratulations dialog for phase ${phaseToShow}`);
        
        // Actually show the dialog
        displayDialog();
        
        return phaseToShow;
      };
      
      // Create the function to show the toast
      const showToastFn = (phaseIndex?: number) => {
        // Get the phase index to show
        const phaseToShow = phaseIndex !== undefined ? phaseIndex : controller.currentPhase;
        
        // Update toast content based on the specific phase
        updateToastForPhase(phaseToShow);
        
        // Log that the toast is being shown
        console.log(`Showing congratulations toast for phase ${phaseToShow}`);
        
        // Actually show the toast
        displayToast();
        
        return phaseToShow;
      };
      
      // Register the functions with the provider
      controller._registerNotificationFunctions(showDialogFn, showToastFn);
      console.log('Notifications component registered its functions with TimelineProvider');
    }
  }, [controller]);
  
  // Helper function to update dialog content for a specific phase
  const updateDialogForPhase = (phaseIndex: number) => {
    if (controller) {
      const phases = controller.updatePhaseStatuses();
      if (!phases || phases.length === 0) return;
      
      // Ensure phase index is valid
      const safePhaseIndex = Math.max(0, Math.min(phaseIndex, phases.length - 1));
      
      // Update dialog state with the specific phase information
      setCompletedPhase(safePhaseIndex);
      setTotalPhases(phases.length);
      
      // Calculate progress percentage, clamped to 100%
      const calculatedPercentage = Math.round((safePhaseIndex + 1) / phases.length * 100);
      setProgressPercentage(Math.min(calculatedPercentage, 100));
      
      // Set phase title
      const phase = phases[safePhaseIndex];
      if (phase) {
        setPhaseTitle(phase.shortTitle || phase.title);
      }
      
      // Set next phase name if not at the end
      if (safePhaseIndex < phases.length - 1) {
        setNextPhaseName(phases[safePhaseIndex + 1].shortTitle || phases[safePhaseIndex + 1].title);
      } else {
        setNextPhaseName("Project Complete");
      }
    }
  };
  
  // Helper function to update toast content for a specific phase
  const updateToastForPhase = (phaseIndex: number) => {
    if (controller) {
      const phases = controller.updatePhaseStatuses();
      if (!phases || phases.length === 0) return;
      
      // Ensure phase index is valid
      const safePhaseIndex = Math.max(0, Math.min(phaseIndex, phases.length - 1));
      
      // Phase data will be used in the toast component directly
    }
  };
  
  // Function to show toast - can be triggered by timeline controller
  const displayToast = () => {
    // First ensure it's hidden, then show it (forces a re-render)
    setShowToast(false);
    console.log('Toast hidden, will show in 10ms');
    
    setTimeout(() => {
      setShowToast(true);
      console.log('Toast shown, will hide in 5s');
      
      // Hide after 5 seconds
      setTimeout(() => {
        setShowToast(false);
        console.log('Toast hidden after timeout');
      }, 5000);
    }, 10);
  };
  
  // Function to show dialog - can be triggered by timeline controller
  const displayDialog = () => {
    setShowDialog(true);
  };
  
  // Function to close the dialog
  const closeDialog = () => {
    setShowDialog(false);
  };
  
  // Function to handle Continue button click
  const handleContinue = () => {
    closeDialog();
    
    // Progress to the next phase if we have the controller
    if (controller && controller.goToNextPhase) {
      console.log('Advancing to next phase after dialog close');
      // Wait a little bit before moving to next phase for better UX
      setTimeout(() => {
        controller.goToNextPhase();
      }, 300);
    } else {
      console.log('No controller available for phase progression');
    }
  };
  
  return (
    <>
      {/* Congratulations Toast Notification - Based on Astro version */}
      <div 
        className={styles.notificationToast}
        style={{
          transform: showToast ? 'translateX(0)' : 'translateX(400px)',
          opacity: showToast ? 1 : 0,
          visibility: showToast ? 'visible' : 'hidden',
          pointerEvents: showToast ? 'auto' : 'none',
        }}
        role="alert"
        id="congratulations-toast"
      >
        <div className={styles.toastContent}>
          {/* Toast icon */}
          <div className={styles.toastIcon} id="toast-icon">🎉</div>
          
          {/* Toast text */}
          <div className={styles.toastText}>
            <div className={styles.toastTitle} id="toast-title">{phaseTitle} Completed!</div>
            <div className={styles.toastMessage} id="toast-message">
              Great progress! Moving to next phase. ({progressPercentage}% complete)
            </div>
          </div>
        </div>
      </div>

      {/* Congratulations Modal Dialog - Based on Astro version */}
      <div 
        className={`${styles.congratulationsDialogOverlay} ${showDialog ? styles.dialogVisible : ''}`}
        id="congratulations-dialog-overlay"
      >
        <div className={styles.congratulationsDialog} id="congratulations-dialog">
          {/* Dialog header */}
          <div className={styles.dialogHeader}>
            {/* Dialog icon */}
            <div className={styles.dialogIcon} id="dialog-icon">🎉</div>
            
            {/* Close button */}
            <button 
              className={styles.dialogClose} 
              id="dialog-close" 
              title="Close"
              onClick={closeDialog}
            >×</button>
          </div>
          
          {/* Dialog content */}
          <div className={styles.dialogContent}>
            {/* Main title */}
            <h3 className={styles.dialogTitle} id="dialog-title">Congratulations!</h3>
            
            {/* Description message */}
            <p className={styles.dialogMessage} id="dialog-message">
              {`🎯 ${phaseTitle} Completed! All requirements analyzed and documented.`}
            </p>
            
            {/* Progress indicator */}
            <div className={styles.dialogProgress}>
              {/* Circular progress bar */}
              <div className={styles.progressRing}>
                <svg className={styles.progressCircle} id="progress-circle" width="100" height="100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                  />
                  
                  {/* Progress circle - calculate stroke-dashoffset based on percentage */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progressPercentage / 100)}
                    transform="rotate(-90 50 50)"
                    className={styles.progressStroke}
                  />
                </svg>
                
                {/* Percentage indicator */}
                <span className={styles.progressPercentage} id="progress-percentage">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Progress details */}
              <div className={styles.progressDetails}>
                <p className={styles.progressText}>
                  Phase <span id="completed-phase">{Math.min(completedPhase + 1, totalPhases)}</span> of <span id="total-phases">{totalPhases}</span> completed
                </p>
                <p className={styles.nextPhaseText}>
                  Next: <span id="next-phase-name">{nextPhaseName}</span>
                </p>
              </div>
            </div>
            
            {/* Dialog actions */}
            <div className={styles.dialogActions}>
              <button 
                className={styles.dialogContinueBtn} 
                id="dialog-continue-btn"
                onClick={handleContinue}
              >
                Continue Timeline
              </button>
            </div>
            
            {/* Contact section - Only shown when final phase is completed */}
            {completedPhase === totalPhases - 1 && (
              <div className={styles.dialogContactSection} id="dialog-contact-section">
                {/* Divider line */}
                <div className={styles.contactDivider}>
                  <div className={styles.dividerLine}></div>
                  <span className={styles.dividerText}>Ready to start your project?</span>
                  <div className={styles.dividerLine}></div>
                </div>
                
                {/* Contact content */}
                <div className={styles.contactContent}>
                  <h4 className={styles.contactTitle}>Enjoyed this experience?</h4>
                  <p className={styles.contactDescription}>
                    If you're satisfied with what you've seen, let's discuss how we can bring your mobile app idea to life.
                  </p>
                  
                  {/* Contact buttons */}
                  <div className={styles.contactButtons}>
                    {/* Main contact button */}
                    <a href="/contact" className={`${styles.contactBtn} ${styles.primaryContactBtn}`}>
                      {/* Email icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Contact Us
                    </a>
                    
                    {/* Maybe later button */}
                    <button 
                      className={`${styles.contactBtn} ${styles.secondaryContactBtn}`} 
                      id="contact-maybe-later"
                      onClick={closeDialog}
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* No demo buttons needed - toast appears automatically on phase change */}
    </>
  )
}

export default Notifications
