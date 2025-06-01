/**
 * ProjectFlowTimeline JavaScript Controller
 * Manages all interactive behaviors of the timeline component
 * Auto-progression, pause/play, notifications and dialog management
 */

import type { TimelineData, PhaseDayRange } from './types.ts';

// Import timeline data
import timelineStaticData from '../../data/timeline-data.json';

export class ProjectFlowTimeline {
  // Timeline main data
  timeline: TimelineData;
  
  // Current state variables
  currentPhase: number = 0;
  currentDay: number = 1;
  totalDays: number = 35;
  
  // Settings
  isScrollBased: boolean;
  autoProgress: boolean;
  stepDuration: number;
  isPaused: boolean = false;
  isPausedByUser: boolean = false;
  
  // Interval references
  autoProgressInterval: NodeJS.Timeout | null = null;
  dayProgressInterval: NodeJS.Timeout | null = null;
  
  // DOM element references - Status bar
  statusIcon: HTMLElement | null;
  statusTitle: HTMLElement | null;
  statusDescription: HTMLElement | null;
  currentDayElement: HTMLElement | null;
  totalDaysElement: HTMLElement | null;
  progressFillMini: HTMLElement | null;
  refreshBtn: HTMLElement | null;
  pauseBtn: HTMLElement | null;
  
  // DOM element references - Status bar toggle
  statusBar: HTMLElement | null;
  statusToggleBtn: HTMLElement | null;
  statusContent: HTMLElement | null;
  isStatusBarHidden: boolean = false;
  
  // DOM element references - Toast notifications
  congratulationsToast: HTMLElement | null;
  toastIcon: HTMLElement | null;
  toastTitle: HTMLElement | null;
  toastMessage: HTMLElement | null;
  
  // DOM element references - Dialog
  congratulationsDialogOverlay: HTMLElement | null;
  congratulationsDialog: HTMLElement | null;
  dialogIcon: HTMLElement | null;
  dialogTitle: HTMLElement | null;
  dialogMessage: HTMLElement | null;
  dialogClose: HTMLElement | null;
  dialogContinueBtn: HTMLElement | null;
  progressCircle: HTMLElement | null;
  progressPercentage: HTMLElement | null;
  completedPhaseElement: HTMLElement | null;
  totalPhasesElement: HTMLElement | null;
  nextPhaseNameElement: HTMLElement | null;
  
  // DOM element references - Contact section
  dialogContactSection: HTMLElement | null;
  contactMaybeLaterBtn: HTMLElement | null;
  
  // Static data
  phaseDayRanges: PhaseDayRange[];
  phaseMessages: Record<string, string[]>;
  congratulationMessages: Record<string, string>;

  constructor(timeline: TimelineData) {
    // Set main timeline data
    this.timeline = timeline;
    this.isScrollBased = this.timeline.settings.scrollBasedProgress;
    this.autoProgress = this.timeline.settings.autoProgress;
    this.stepDuration = this.timeline.settings.stepDuration;
    
    // Load static data from JSON
    this.phaseDayRanges = timelineStaticData.phaseDayRanges;
    this.phaseMessages = timelineStaticData.phaseMessages;
    this.congratulationMessages = timelineStaticData.congratulationMessages;
    
    // Initialize DOM elements
    this.initializeElements();
    
    // Start timeline
    this.init();
  }

  /**
   * Initialize DOM elements
   * Get all required element references
   */
  initializeElements(): void {
    // Status message elements
    this.statusIcon = document.getElementById('status-icon');
    this.statusTitle = document.getElementById('status-title');
    this.statusDescription = document.getElementById('status-description');
    this.currentDayElement = document.getElementById('current-day');
    this.totalDaysElement = document.getElementById('total-days');
    this.progressFillMini = document.getElementById('progress-fill-mini');
    this.refreshBtn = document.getElementById('refresh-btn');
    this.pauseBtn = document.getElementById('pause-btn');
    
    // Status bar toggle elements
    this.statusBar = document.getElementById('dynamic-status-messages');
    this.statusToggleBtn = document.getElementById('status-toggle-btn');
    this.statusContent = document.getElementById('status-message-content');
    
    // Toast elements
    this.congratulationsToast = document.getElementById('congratulations-toast');
    this.toastIcon = document.getElementById('toast-icon');
    this.toastTitle = document.getElementById('toast-title');
    this.toastMessage = document.getElementById('toast-message');
    
    // Dialog elements
    this.congratulationsDialogOverlay = document.getElementById('congratulations-dialog-overlay');
    this.congratulationsDialog = document.getElementById('congratulations-dialog');
    this.dialogIcon = document.getElementById('dialog-icon');
    this.dialogTitle = document.getElementById('dialog-title');
    this.dialogMessage = document.getElementById('dialog-message');
    this.dialogClose = document.getElementById('dialog-close');
    this.dialogContinueBtn = document.getElementById('dialog-continue-btn');
    this.progressCircle = document.getElementById('progress-circle');
    this.progressPercentage = document.getElementById('progress-percentage');
    this.completedPhaseElement = document.getElementById('completed-phase');
    this.totalPhasesElement = document.getElementById('total-phases');
    this.nextPhaseNameElement = document.getElementById('next-phase-name');
    
    // Contact section elements
    this.dialogContactSection = document.getElementById('dialog-contact-section');
    this.contactMaybeLaterBtn = document.getElementById('contact-maybe-later');
  }

  /**
   * Initialize timeline
   * Set up event listeners and start auto-progression
   */
  init(): void {
    console.log('Initializing timeline...');
    
    // 1. First set up event listeners
    this.setupScrollListener();
    this.setupHoverEvents();
    this.setupStatusEvents();
    
    // 2. Initial state update
    this.updateStatusMessage();
    this.updateDayProgress();
    this.updatePauseButtonState();
    
    // 3. Show StatusBar gradually
    setTimeout(() => {
      this.showStatusBar();
    }, 500);
    
    // 4. Make StatusBar visible after animation completes
    setTimeout(() => {
      this.statusBar?.classList.add('status-bar-visible');
      console.log('Status bar made visible');
    }, 800);
    
    // 5. Start timeline - start later
    setTimeout(() => {
      if (this.autoProgress) {
        console.log('Starting auto progression...');
        this.startAutoProgress();
        this.startDaySimulation();
      }
    }, 1500);
  }

  /**
   * Clean up resources
   * Stop intervals and remove event listeners
   */
  cleanup(): void {
    // Clear all intervals
    if (this.dayProgressInterval) {
      clearInterval(this.dayProgressInterval);
      this.dayProgressInterval = null;
    }
    if (this.autoProgressInterval) {
      clearInterval(this.autoProgressInterval);
      this.autoProgressInterval = null;
    }
    
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScrollProgress.bind(this));
  }

  /**
   * Set up status events
   * Add all button and dialog event listeners
   */
  setupStatusEvents(): void {
    // Status bar toggle
    this.statusToggleBtn?.addEventListener('click', () => {
      this.toggleStatusBar();
    });

    // Pause button
    this.pauseBtn?.addEventListener('click', () => {
      this.togglePause();
    });

    // Restart button
    this.refreshBtn?.addEventListener('click', () => {
      this.restartTimeline();
    });

    // Dialog event handlers
    this.dialogClose?.addEventListener('click', () => {
      this.hideDialog();
    });

    this.dialogContinueBtn?.addEventListener('click', () => {
      this.hideDialog();
    });

    // Close dialog when clicking overlay
    this.congratulationsDialogOverlay?.addEventListener('click', (e) => {
      if (e.target === this.congratulationsDialogOverlay) {
        this.hideDialog();
      }
    });

    // Contact section event handlers
    this.contactMaybeLaterBtn?.addEventListener('click', () => {
      this.hideDialog();
    });
  }

  /**
   * Show status bar
   * Initialize and display the status bar
   */
  showStatusBar(): void {
    if (this.statusBar) {
      this.statusBar.style.display = 'flex';
      this.statusBar.classList.add('status-bar-initialized');
    }
  }

  /**
   * Toggle status bar
   * Hide/show bar and change chevron direction
   */
  toggleStatusBar(): void {
    this.isStatusBarHidden = !this.isStatusBarHidden;
    const chevronUp = this.statusToggleBtn?.querySelector('.chevron-up');
    const chevronDown = this.statusToggleBtn?.querySelector('.chevron-down');

    if (this.isStatusBarHidden) {
      this.statusBar?.classList.add('minimized');
      this.statusContent?.classList.add('status-content-hidden');
      chevronUp?.classList.add('hidden');
      chevronDown?.classList.remove('hidden');
    } else {
      this.statusBar?.classList.remove('minimized');
      this.statusContent?.classList.remove('status-content-hidden');
      chevronUp?.classList.remove('hidden');
      chevronDown?.classList.add('hidden');
    }
  }

  /**
   * Pause/resume timeline
   * User control
   */
  togglePause(): void {
    this.isPausedByUser = !this.isPausedByUser;
    this.isPaused = this.isPausedByUser;
    this.updatePauseButtonState();
  }

  /**
   * Update pause button appearance
   * Switch between Play/Pause icons
   */
  updatePauseButtonState(): void {
    if (!this.pauseBtn) return;
    
    const pauseIcon = this.pauseBtn.querySelector('.pause-icon');
    const playIcon = this.pauseBtn.querySelector('.play-icon');
    
    if (this.isPausedByUser) {
      pauseIcon?.classList.add('hidden');
      playIcon?.classList.remove('hidden');
    } else {
      pauseIcon?.classList.remove('hidden');
      playIcon?.classList.add('hidden');
    }
  }

  /**
   * Restart timeline
   * Reset all values and restart simulation
   */
  restartTimeline(): void {
    // Clear intervals
    if (this.dayProgressInterval) {
      clearInterval(this.dayProgressInterval);
      this.dayProgressInterval = null;
    }
    if (this.autoProgressInterval) {
      clearInterval(this.autoProgressInterval);
      this.autoProgressInterval = null;
    }
    
    // Reset values
    this.currentPhase = 0;
    this.currentDay = 1;
    this.isPaused = false;
    this.isPausedByUser = false;
    
    // Update UI
    this.updatePauseButtonState();
    this.updateCurrentPhase();
    this.updateStatusMessage();
    this.updateDayProgress();
    
    // Restart simulation
    if (this.autoProgress) {
      this.startAutoProgress();
      this.startDaySimulation();
    }
  }

  /**
   * Start day simulation
   * Update status messages for each day
   */
  startDaySimulation(): void {
    if (this.dayProgressInterval) {
      clearInterval(this.dayProgressInterval);
    }
    
    this.dayProgressInterval = setInterval(() => {
      // Only progress if not paused by any reason
      if (!this.isPaused && !this.isPausedByUser) {
        this.currentDay++;
        this.updateDayProgress();
        this.updateStatusMessage();
        this.updatePhaseFromDay();
        
        // Stop simulation if we reach the last day
        if (this.currentDay >= this.totalDays) {
          clearInterval(this.dayProgressInterval!);
          this.dayProgressInterval = null;
          this.showFinalCongratulations();
        }
      }
    }, this.stepDuration / 4); // Slower progression
  }

  /**
   * Show final congratulations message
   * Called when entire timeline is completed
   */
  showFinalCongratulations(): void {
    // Pause timeline completely
    this.isPaused = true;
    
    // Show refresh button
    this.refreshBtn?.classList.remove('hidden');
    
    // Show final dialog after a short delay
    setTimeout(() => {
      this.showDialog(this.timeline.phases.length - 1, true);
    }, 1000);
    
    console.log('Timeline completed - Showing final dialog');
  }

  /**
   * Update day progress
   * Update day count and progress bar in status bar
   */
  updateDayProgress(): void {
    if (this.currentDayElement) {
      this.currentDayElement.textContent = this.currentDay.toString();
    }
    if (this.totalDaysElement) {
      this.totalDaysElement.textContent = this.totalDays.toString();
    }
    if (this.progressFillMini) {
      const progress = (this.currentDay / this.totalDays) * 100;
      this.progressFillMini.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  /**
   * Update status message
   * Update title, description and icon according to current phase
   */
  updateStatusMessage(): void {
    const phase = this.timeline.phases[this.currentPhase];
    if (!phase) return;
    
    if (this.statusIcon) {
      this.statusIcon.textContent = phase.icon;
    }
    if (this.statusTitle) {
      this.statusTitle.textContent = phase.title;
    }
    if (this.statusDescription) {
      const messages = this.phaseMessages[this.currentPhase.toString()];
      if (messages && messages.length > 0) {
        const messageIndex = Math.floor(Math.random() * messages.length);
        this.statusDescription.textContent = messages[messageIndex];
      } else {
        this.statusDescription.textContent = phase.description;
      }
    }
  }

  /**
   * Show congratulations message
   * Show toast and dialog when phase is completed
   */
  showCongratulations(completedPhaseIndex: number): void {
    // PAUSE timeline immediately when showing congratulations
    this.isPaused = true;
    
    const phase = this.timeline.phases[completedPhaseIndex];
    const message = this.congratulationMessages[completedPhaseIndex.toString()];
    
    // Show toast
    if (this.congratulationsToast && this.toastTitle && this.toastMessage) {
      this.toastTitle.textContent = `${phase.title} Completed!`;
      this.toastMessage.textContent = message;
      this.congratulationsToast.classList.add('show');
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        this.congratulationsToast?.classList.remove('show');
      }, 3000);
    }
    
    // Show dialog after 1 second - timeline stays paused
    setTimeout(() => {
      this.showDialog(completedPhaseIndex);
    }, 1000);
  }

  /**
   * Show congratulations dialog
   * Opens modal dialog when phase is completed
   */
  showDialog(completedPhaseIndex: number, isFinal: boolean = false): void {
    // Ensure timeline is paused while dialog is shown
    this.isPaused = true;
    
    const phase = this.timeline.phases[completedPhaseIndex];
    const message = this.congratulationMessages[completedPhaseIndex.toString()];
    const progressPercentage = Math.round(((completedPhaseIndex + 1) / this.timeline.phases.length) * 100);
    
    // Update dialog content
    if (this.dialogIcon) this.dialogIcon.textContent = phase.icon;
    if (this.dialogTitle) this.dialogTitle.textContent = isFinal ? 'Project Complete!' : 'Congratulations!';
    if (this.dialogMessage) this.dialogMessage.textContent = message;
    if (this.progressPercentage) this.progressPercentage.textContent = `${progressPercentage}%`;
    if (this.completedPhaseElement) this.completedPhaseElement.textContent = (completedPhaseIndex + 1).toString();
    if (this.totalPhasesElement) this.totalPhasesElement.textContent = this.timeline.phases.length.toString();
    
    // Next phase information
    if (this.nextPhaseNameElement) {
      if (completedPhaseIndex < this.timeline.phases.length - 1) {
        this.nextPhaseNameElement.textContent = this.timeline.phases[completedPhaseIndex + 1].title;
      } else {
        this.nextPhaseNameElement.textContent = 'Project Complete';
      }
    }
    
    // Update progress circle
    if (this.progressCircle) {
      const circle = this.progressCircle.querySelector('.progress-stroke') as SVGCircleElement;
      if (circle) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progressPercentage / 100) * circumference;
        circle.style.strokeDashoffset = offset.toString();
      }
    }
    
    // Show/hide contact section
    if (this.dialogContactSection) {
      if (isFinal) {
        this.dialogContactSection.classList.remove('hidden');
      } else {
        this.dialogContactSection.classList.add('hidden');
      }
    }
    
    // Show dialog
    this.congratulationsDialogOverlay?.classList.add('show');
    
    console.log(`Showing dialog: ${phase.title} - Timeline paused`);
  }

  /**
   * Hide dialog
   * Close modal and continue timeline
   */
  hideDialog(): void {
    this.congratulationsDialogOverlay?.classList.remove('show');
    
    console.log('Dialog closed - Timeline continuing');
    
    // Resume timeline only if not paused by user
    if (!this.isPausedByUser) {
      this.isPaused = false;
      console.log('Timeline automatically resuming');
    } else {
      console.log('Timeline not resuming because paused by user');
    }
  }

  /**
   * Update phase from day
   * Determine which phase we are in based on current day
   */
  updatePhaseFromDay(): void {
    for (let i = 0; i < this.phaseDayRanges.length; i++) {
      const range = this.phaseDayRanges[i];
      if (this.currentDay >= range.start && this.currentDay <= range.end) {
        if (this.currentPhase !== i) {
          const previousPhase = this.currentPhase;
          this.currentPhase = i;
          this.updateCurrentPhase();
          
          // Show congratulations when moving to new phase (only if progressing forward)
          if (previousPhase < this.currentPhase && previousPhase >= 0) {
            console.log(`Transition to new phase: ${previousPhase} -> ${this.currentPhase}`);
            // Wait a bit before showing congratulations to avoid overlapping
            setTimeout(() => {
              this.showCongratulations(previousPhase);
            }, 500);
          }
        }
        break;
      }
    }
  }

  /**
   * Set up hover events
   * Pause timeline when hovering over cards
   */
  setupHoverEvents(): void {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!this.isPausedByUser) {
          this.isPaused = true;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!this.isPausedByUser) {
          this.isPaused = false;
        }
      });
    });
  }

  /**
   * Start auto progression
   * Start automatic transition between phases
   */
  startAutoProgress(): void {
    if (this.autoProgressInterval) {
      clearInterval(this.autoProgressInterval);
    }
    
    this.autoProgressInterval = setInterval(() => {
      if (!this.isPaused && !this.isPausedByUser && !this.isScrollBased) {
        this.currentPhase = (this.currentPhase + 1) % this.timeline.phases.length;
        this.updateCurrentPhase();
        this.updateProgressBar(this.currentPhase / (this.timeline.phases.length - 1));
      }
    }, this.stepDuration);
  }

  /**
   * Update current phase
   * Visually mark the active phase
   */
  updateCurrentPhase(): void {
    const phases = document.querySelectorAll('.timeline-card');
    phases.forEach((phase, index) => {
      phase.classList.remove('current');
      phase.classList.add('active');
      
      if (index === this.currentPhase) {
        phase.classList.add('current');
      }
    });
  }

  /**
   * Update progress bar
   * Adjust the width of the main progress bar
   */
  updateProgressBar(progress: number): void {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
    }
  }

  /**
   * Set up scroll listener
   * Add event listener for scroll-based progression
   */
  setupScrollListener(): void {
    if (!this.isScrollBased) return;
    
    let ticking = false;
    
    const updateOnScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    this.handleScrollProgress();
  }

  /**
   * Handle scroll progress
   * Calculate timeline progress based on scroll position
   */
  handleScrollProgress(): void {
    const timelineSection = document.querySelector('.project-flow-timeline') as HTMLElement;
    if (!timelineSection) return;
    
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    let progress = 0;
    if (rect.top < windowHeight && rect.bottom > 0) {
      const sectionHeight = rect.height;
      const visibleTop = Math.max(0, windowHeight - rect.top);
      const visibleHeight = Math.min(visibleTop, sectionHeight);
      progress = Math.min(visibleHeight / sectionHeight, 1);
    }
    
    const newPhase = Math.floor(progress * this.timeline.phases.length);
    const clampedPhase = Math.min(newPhase, this.timeline.phases.length - 1);
    
    if (clampedPhase !== this.currentPhase && clampedPhase >= 0) {
      this.currentPhase = clampedPhase;
      this.updateCurrentPhase();
    }
    
    this.updateProgressBar(progress);
  }
}
