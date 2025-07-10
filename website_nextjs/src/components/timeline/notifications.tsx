'use client'

import React, { useState, useContext, useEffect } from 'react'
import styles from '@/styles/timeline.module.css'
import { TimelineContext } from './timeline-context'

const Notifications: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  // Get controller from context if available
  const controller = useContext(TimelineContext);

 
  // --- All hooks must be called before any conditional returns ---
  // Effects (must be before any early return)

  // Debug effect for toast visibility
  useEffect(() => {
    console.log('Toast visibility changed:', showToast ? 'visible' : 'hidden');
  }, [showToast, controller]);

  // Effect to update dialog content when controller changes phase
  useEffect(() => {
    if (controller) {
      // Calculate total phases
      const phases = controller.updatePhaseStatuses();
      if (phases) {
        // (see removed code for state updates)
      }
    }
  }, [controller]);

  // Register the notification functions with the TimelineProvider
  useEffect(() => {
    if (controller && controller._registerNotificationFunctions) {
      // Create the function to show the dialog
      const showDialogFn = (phaseIndex?: number) => {
        // Get the phase index to show
        const phaseToShow = phaseIndex !== undefined ? phaseIndex : controller.currentPhase;
        
        // Update dialog content based on the specific phase
        // updateDialogForPhase(phaseToShow); // This line is removed as per new_code
        
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
        // updateToastForPhase(phaseToShow); // This line is removed as per new_code
        
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

  // --- End hook section ---

  // If controller is not available, render nothing (after all hooks)
  if (!controller) {
    return null;
  }
 
  const phases = controller.updatePhaseStatuses();
  const completedPhase = Math.min(controller.currentPhase, phases.length - 1);
  const totalPhases = phases.length;
  const progressPercentage = Math.round(((completedPhase + 1) / totalPhases) * 100);
  const phaseTitle = phases[completedPhase]?.shortTitle || phases[completedPhase]?.title || '';
  const nextPhaseName = completedPhase < totalPhases - 1
    ? (phases[completedPhase + 1]?.shortTitle || phases[completedPhase + 1]?.title || '')
    : 'Project Complete';
  
  
  // Helper function to update dialog content for a specific phase
  // const updateDialogForPhase = (phaseIndex: number) => { // This function is removed as per new_code
  //   if (controller) { // This line is removed as per new_code
  //     const phases = controller.updatePhaseStatuses(); // This line is removed as per new_code
  //     if (!phases || phases.length === 0) return; // This line is removed as per new_code
      
  //     // Ensure phase index is valid // This line is removed as per new_code
  //     const safePhaseIndex = Math.max(0, Math.min(phaseIndex, phases.length - 1)); // This line is removed as per new_code
      
  //     // Update dialog state with the specific phase information // This line is removed as per new_code
  //     setCompletedPhase(safePhaseIndex); // This line is removed as per new_code
  //     setTotalPhases(phases.length); // This line is removed as per new_code
      
  //     // Calculate progress percentage based on the completed phase // This line is removed as per new_code
  //     // When phase 0 is completed, we're 1/6 = 16.67% done // This line is removed as per new_code
  //     // When phase 1 is completed, we're 2/6 = 33.33% done, etc. // This line is removed as per new_code
  //     const calculatedPercentage = Math.round(((safePhaseIndex + 1) / phases.length) * 100); // This line is removed as per new_code
  //     setProgressPercentage(Math.min(calculatedPercentage, 100)); // This line is removed as per new_code
      
  //     // Set phase title and customize message based on the phase type // This line is removed as per new_code
  //     const phase = phases[safePhaseIndex]; // This line is removed as per new_code
  //     if (phase) { // This line is removed as per new_code
  //       const phaseName = phase.shortTitle || phase.title; // This line is removed as per new_code
  //       setPhaseTitle(phaseName); // This line is removed as per new_code
        
  //       // Log phase data to help with debugging // This line is removed as per new_code
  //       console.log(`Updating dialog for phase ${safePhaseIndex}: ${phaseName}, Progress: ${calculatedPercentage}%`, phase); // This line is removed as per new_code
  //     } // This line is removed as per new_code
      
  //     // Set next phase name if not at the end // This line is removed as per new_code
  //     if (safePhaseIndex < phases.length - 1) { // This line is removed as per new_code
  //       setNextPhaseName(phases[safePhaseIndex + 1].shortTitle || phases[safePhaseIndex + 1].title); // This line is removed as per new_code
  //     } else { // This line is removed as per new_code
  //       setNextPhaseName("Project Complete"); // This line is removed as per new_code
  //     } // This line is removed as per new_code
  //   } // This line is removed as per new_code
  // }; // This line is removed as per new_code
  
  // Helper function to update toast content for a specific phase
  // const updateToastForPhase = (phaseIndex: number) => { // This function is removed as per new_code
  //   if (controller) { // This line is removed as per new_code
  //     const phases = controller.updatePhaseStatuses(); // This line is removed as per new_code
  //     if (!phases || phases.length === 0) return; // This line is removed as per new_code
      
  //     // Ensure phase index is valid // This line is removed as per new_code
  //     const safePhaseIndex = Math.max(0, Math.min(phaseIndex, phases.length - 1)); // This line is removed as per new_code
      
  //     // Update toast state with the specific phase information // This line is removed as per new_code
  //     setCompletedPhase(safePhaseIndex); // This line is removed as per new_code
  //     setTotalPhases(phases.length); // This line is removed as per new_code
      
  //     // Calculate progress percentage based on the completed phase // This line is removed as per new_code
  //     const calculatedPercentage = Math.round(((safePhaseIndex + 1) / phases.length) * 100); // This line is removed as per new_code
  //     setProgressPercentage(Math.min(calculatedPercentage, 100)); // This line is removed as per new_code
      
  //     // Set phase title // This line is removed as per new_code
  //     const phase = phases[safePhaseIndex]; // This line is removed as per new_code
  //     if (phase) { // This line is removed as per new_code
  //       setPhaseTitle(phase.shortTitle || phase.title); // This line is removed as per new_code
  //       console.log(`Updating toast for phase ${safePhaseIndex}: ${phase.shortTitle || phase.title}, Progress: ${calculatedPercentage}%`); // This line is removed as per new_code
  //     } // This line is removed as per new_code
      
  //     // Set next phase name if not at the end // This line is removed as per new_code
  //     if (safePhaseIndex < phases.length - 1) { // This line is removed as per new_code
  //       setNextPhaseName(phases[safePhaseIndex + 1].shortTitle || phases[safePhaseIndex + 1].title); // This line is removed as per new_code
  //     } else { // This line is removed as per new_code
  //       setNextPhaseName("Project Complete"); // This line is removed as per new_code
  //     } // This line is removed as per new_code
  //   } // This line is removed as per new_code
  // }; // This line is removed as per new_code
  
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
    // Store the current completed phase to determine what to do next
    const currentCompleted = completedPhase;
    const currentControllerPhase = controller?.currentPhase || 0;
    
    console.log(`Continue button clicked:`, {
      completedPhase: currentCompleted,
      controllerPhase: currentControllerPhase,
      totalPhases: totalPhases
    });
    
    // Close the dialog first
    closeDialog();
    
    // Progress to the next phase if we have the controller
    if (controller && controller.goToNextPhase) {
      // Wait a little bit before moving to next phase for better UX
      setTimeout(() => {
        // Always try to advance to the next phase when Continue is clicked
        // This is the expected behavior for a "Continue Timeline" button
        console.log('Attempting to advance to next phase...');
        
        try {
          controller.goToNextPhase();
          console.log('Successfully called goToNextPhase()');
        } catch (error) {
          console.error('Error advancing to next phase:', error);
        }
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
              {completedPhase === 0 ? (
                `Discovery complete! Moving to design phase. (${progressPercentage}% complete)`
              ) : completedPhase === 1 ? (
                `Design finalized! Starting development. (${progressPercentage}% complete)`
              ) : completedPhase === 2 ? (
                `Development complete! Beginning testing. (${progressPercentage}% complete)`
              ) : completedPhase === 3 ? (
                `Testing passed! Ready for deployment. (${progressPercentage}% complete)`
              ) : completedPhase === 4 ? (
                `Successfully deployed! Moving to maintenance. (${progressPercentage}% complete)`
              ) : completedPhase === 5 ? (
                `Project complete! All phases finished. (${progressPercentage}% complete)`
              ) : (
                `Great progress! Moving to next phase. (${progressPercentage}% complete)`
              )}
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
            
            {/* Description message - Dynamically changes based on the phase */}
            <p className={styles.dialogMessage} id="dialog-message">
              {completedPhase === 0 ? (
                `🎯 ${phaseTitle} Completed! All requirements analyzed and documented.`
              ) : completedPhase === 1 ? (
                `🎨 ${phaseTitle} Completed! All designs finalized and approved.`
              ) : completedPhase === 2 ? (
                `💻 ${phaseTitle} Completed! Code implementation successfully completed.`
              ) : completedPhase === 3 ? (
                `🧪 ${phaseTitle} Completed! All tests passed successfully.`
              ) : completedPhase === 4 ? (
                `🚀 ${phaseTitle} Completed! Project deployed to production.`
              ) : completedPhase === 5 ? (
                `🔧 ${phaseTitle} Completed! Ongoing maintenance and support ensured.`
              ) : (
                `✅ ${phaseTitle} Completed! Phase milestones achieved successfully.`
              )}
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
                  Phase <span id="completed-phase">{completedPhase + 1}</span> of <span id="total-phases">{totalPhases}</span> completed
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
                style={{ 
                  opacity: 1, 
                  pointerEvents: 'auto',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Continue Timeline (Phase {completedPhase + 1} → {Math.min(completedPhase + 2, totalPhases)})
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
                    If you&apos;re satisfied with what you&apos;ve seen, let&apos;s discuss how we can bring your mobile app idea to life.
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
