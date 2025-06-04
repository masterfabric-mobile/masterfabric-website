/**
 * Enhanced Phone Interface with Stepper Optimization
 * Handles optimization flow with 3-step stepper popup and progress tracking
 */

console.log('🚀 Enhanced Phone Interface with Stepper Optimization Loaded');

class EnhancedPhoneInterface {
  constructor() {
    this.isOptimizing = false;
    this.currentStep = 0;
    this.initialPerformanceValue = 0;
    this.beforeOptimizationValue = 0; // Track value before optimization
    this.afterOptimizationValue = 0;  // Track value after optimization
    this.optimizationSteps = [
      { 
        id: 'step1', 
        text: 'Analyzing Performance...', 
        duration: 2000, 
        progressEnd: 30,
        description: 'Scanning your app for performance bottlenecks',
        cardClass: 'performance-card-analyzing'
      },
      { 
        id: 'step2', 
        text: 'Optimizing Code...', 
        duration: 2500, 
        progressEnd: 70,
        description: 'Applying optimization algorithms',
        cardClass: 'performance-card-optimizing'
      },
      { 
        id: 'step3', 
        text: 'Applying Changes...', 
        duration: 1500, 
        progressEnd: 100,
        description: 'Finalizing performance improvements',
        cardClass: 'performance-card-applying'
      }
    ];
    this.initializeApp();
  }

  initializeApp() {
    console.log('🚀 Initializing Enhanced Phone Interface...');
    this.setRandomPerformanceValue();
    this.setupInteractions();
    this.initializeAnimations();
    this.updateOptimizeButton(); // Update button based on initial performance
    console.log('✅ Enhanced Phone Interface initialized successfully');
  }

  setRandomPerformanceValue() {
    // Set initial random value between 80-90%
    this.initialPerformanceValue = Math.floor(Math.random() * 11) + 80; // 80-90 range
    this.beforeOptimizationValue = this.initialPerformanceValue; // Initialize tracking
    this.afterOptimizationValue = this.initialPerformanceValue;
    
    const performanceElement = document.getElementById('performanceValue');
    if (performanceElement) {
      performanceElement.textContent = `${this.initialPerformanceValue}%`;
      console.log(`📊 Initial performance value set to: ${this.initialPerformanceValue}%`);
    }
  }

  setupInteractions() {
    console.log('🔧 Setting up interactions...');
    
    // Setup optimize button click handler
    const optimizeBtn = document.getElementById('optimizeBtn');
    console.log('🔍 Optimize button found:', !!optimizeBtn);
    
    if (optimizeBtn) {
      console.log('✅ Adding click event listener to optimize button');
      optimizeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🎯 Optimize button clicked!');
        
        // Check current performance value
        const performanceElement = document.getElementById('performanceValue');
        const currentPerformance = performanceElement ? parseInt(performanceElement.textContent) : 0;
        
        if (currentPerformance >= 98) {
          // Already at maximum, show perfection popup directly
          console.log('🎯 Already at maximum performance, showing perfection popup');
          this.showPerfectionPopup();
          return;
        }
        
        if (!this.isOptimizing) {
          this.startStepperOptimization();
        } else {
          console.log('⚠️ Already optimizing, ignoring click');
        }
      });
    } else {
      console.error('❌ Optimize button not found!');
    }

    // Setup stepper popup close handlers
    const cancelBtn = document.getElementById('cancelOptimization');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.cancelOptimization();
      });
    }

    // Setup success popup close handlers
    const closePopup = document.getElementById('closePopup');
    
    if (closePopup) {
      closePopup.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideSuccessPopup();
      });
    }

    // Setup perfection popup close handlers
    const closePerfectionPopup = document.getElementById('closePerfectionPopup');
    
    if (closePerfectionPopup) {
      closePerfectionPopup.addEventListener('click', (e) => {
        e.preventDefault();
        this.hidePerfectionPopup();
      });
    }
  }

  initializeAnimations() {
    // Animate in the mobile cards with stagger effect using custom CSS animations
    const mobileCards = document.querySelectorAll('.max-w-\\[200px\\]');
    mobileCards.forEach((card, index) => {
      card.classList.add('mobile-card-enter');
      card.classList.add(`delay-${index % 3 + 1}`);
    });
  }

  // Custom animation helper methods
  animateElement(element, keyframes, options = {}) {
    const {
      duration = 300,
      easing = 'ease',
      fill = 'forwards'
    } = options;

    const animation = element.animate(keyframes, {
      duration,
      easing,
      fill
    });

    return animation;
  }

  animateScale(element, fromScale = 1, toScale = 1.05, duration = 300) {
    return this.animateElement(element, [
      { transform: `scale(${fromScale})` },
      { transform: `scale(${toScale})` },
      { transform: `scale(${fromScale})` }
    ], { duration });
  }

  animateOpacity(element, fromOpacity = 0, toOpacity = 1, duration = 300) {
    return this.animateElement(element, [
      { opacity: fromOpacity },
      { opacity: toOpacity }
    ], { duration });
  }

  animateSlideY(element, fromY = 20, toY = 0, duration = 600) {
    return this.animateElement(element, [
      { transform: `translateY(${fromY}px)`, opacity: 0 },
      { transform: `translateY(${toY}px)`, opacity: 1 }
    ], { duration });
  }

  async startStepperOptimization() {
    if (this.isOptimizing) return;
    
    this.isOptimizing = true;
    this.currentStep = 0;
    
    // Store the current performance value before optimization
    const performanceElement = document.getElementById('performanceValue');
    this.beforeOptimizationValue = performanceElement ? parseInt(performanceElement.textContent) : 0;
    console.log(`📊 Starting optimization from: ${this.beforeOptimizationValue}%`);
    
    try {
      // Show stepper popup
      await this.showStepperPopup();
      
      // Reset all steps and progress
      this.resetStepperState();
      
      // Run through optimization steps
      for (let i = 0; i < this.optimizationSteps.length; i++) {
        const step = this.optimizationSteps[i];
        
        // Activate current step
        this.activateStep(i);
        
        // Update progress text
        this.updateProgressText(step.text);
        
        // Animate progress bar
        await this.animateProgressBar(step.progressEnd);
        
        // Apply step-specific animation to performance card
        await this.animateOptimizationStep(i);
        
        // Wait for step duration with step completion
        await this.completeStep(i, step.duration);
      }
      
      // Hide stepper popup
      await this.hideStepperPopup();
      
      // Update performance value to improved value (93-98%)
      await this.updatePerformanceValue();
      
      // Store the final performance value after optimization
      const performanceElement = document.getElementById('performanceValue');
      this.afterOptimizationValue = performanceElement ? parseInt(performanceElement.textContent) : 0;
      console.log(`📊 Optimization completed: ${this.beforeOptimizationValue}% → ${this.afterOptimizationValue}%`);
      
      // Show success popup
      await this.showSuccessPopup();
      
    } catch (error) {
      console.error('Stepper optimization failed:', error);
      await this.hideStepperPopup();
    }
    
    this.isOptimizing = false;
  }

  async showStepperPopup() {
    const popup = document.getElementById('optimizationPopup');
    if (!popup) return;

    console.log('✅ showStepperPopup() triggered');
    
    // Add optimization-active class for enhanced animations
    popup.classList.add('optimization-active');
    
    popup.style.display = 'flex';
    popup.offsetHeight; // force reflow
    popup.style.opacity = '1';
    popup.style.pointerEvents = 'auto';
    popup.style.transform = 'scale(1)';

    // Animate popup content
    const content = popup.querySelector('.popup-content');
    if (content) {
      content.style.transform = 'scale(0.8) translateY(20px)';
      content.style.opacity = '0';

      await this.wait(50);

      content.style.transition = 'all 0.3s ease-out';
      content.style.transform = 'scale(1) translateY(0)';
      content.style.opacity = '1';
    }

    await this.wait(300);
  }

  async hideStepperPopup() {
    const popup = document.getElementById('optimizationPopup');
    if (!popup) return;
    
    console.log('🔄 Hiding stepper popup...');
    
    // Add animation-stopped class to immediately stop all animations
    popup.classList.add('animation-stopped');
    
    // Remove optimization-active class to stop animations
    popup.classList.remove('optimization-active');
    
    const content = popup.querySelector('.popup-content');
    if (content) {
      content.style.transition = 'all 0.2s ease-in';
      content.style.transform = 'scale(0.9) translateY(10px)';
      content.style.opacity = '0';
    }
    
    // Apply common exit animation class
    popup.classList.add('popup-exit-animation');
    
    await this.wait(200);
    
    // Hide completely
    popup.style.display = 'none';
    
    // Clean up classes after animation
    popup.classList.remove('popup-exit-animation', 'animation-stopped');
    
    console.log('✅ Stepper popup hidden');
  }

  resetStepperState() {
    // Reset progress bar
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercentage) progressPercentage.textContent = '0%';
    
    // Reset all steps
    for (let i = 1; i <= 3; i++) {
      const step = document.getElementById(`step${i}`);
      if (step) {
        step.classList.remove('step-active', 'step-completed');
        const icon = step.querySelector('.step-icon');
        const dot = step.querySelector('.step-dot');
        const text = step.querySelector('span');
        
        if (icon) {
          icon.classList.remove('border-blue-500', 'bg-blue-500', 'border-green-500', 'bg-green-500');
          icon.classList.add('border-gray-300');
        }
        if (dot) {
          dot.classList.remove('bg-blue-500', 'bg-white');
          dot.classList.add('bg-gray-300');
          dot.innerHTML = ''; // Clear any checkmark icons
        }
        if (text) {
          text.classList.remove('text-blue-600', 'font-semibold', 'text-green-600');
          text.classList.add('text-gray-600');
        }
      }
    }
  }

  activateStep(stepIndex) {
    const stepId = `step${stepIndex + 1}`;
    const step = document.getElementById(stepId);
    
    if (step) {
      step.classList.add('step-active');
      
      const icon = step.querySelector('.step-icon');
      const dot = step.querySelector('.step-dot');
      const text = step.querySelector('span');
      
      if (icon) {
        icon.classList.remove('border-gray-300');
        icon.classList.add('border-blue-500');
      }
      if (dot) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-blue-500');
      }
      if (text) {
        text.classList.remove('text-gray-600');
        text.classList.add('text-blue-600', 'font-semibold');
      }
    }
  }

  async completeStep(stepIndex, duration) {
    // Wait for step duration first (75% for processing)
    await this.wait(duration * 0.75);
    
    const stepId = `step${stepIndex + 1}`;
    const step = document.getElementById(stepId);
    
    if (step) {
      step.classList.remove('step-active');
      step.classList.add('step-completed');
      
      const icon = step.querySelector('.step-icon');
      const dot = step.querySelector('.step-dot');
      const text = step.querySelector('span');
      
      if (icon) {
        icon.classList.remove('border-blue-500');
        icon.classList.add('border-green-500', 'bg-green-500');
      }
      if (dot) {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-white');
        
        // Add checkmark to completed step with proper size and animation
        setTimeout(() => {
          dot.innerHTML = '<svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
        }, 100);
      }
      if (text) {
        text.classList.remove('text-blue-600');
        text.classList.add('text-green-600');
      }
    }
    
    // Wait for remaining duration (25%)
    await this.wait(duration * 0.25);
  }

  updateProgressText(text) {
    const progressText = document.getElementById('progressText');
    if (progressText) {
      progressText.textContent = text;
    }
  }

  async animateProgressBar(targetPercentage) {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (!progressBar || !progressPercentage) return;
    
    const currentWidth = parseFloat(progressBar.style.width) || 0;
    const targetWidth = targetPercentage;
    const duration = 800;
    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = currentWidth + (targetWidth - currentWidth) * easeOutCubic;
        
        progressBar.style.width = `${currentValue}%`;
        progressPercentage.textContent = `${Math.round(currentValue)}%`;
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(updateProgress);
    });
  }

  async animateOptimizationStep(stepIndex) {
    const performanceCard = document.querySelector('#performanceValue').closest('div.bg-blue-50');
    if (!performanceCard) return;
    
    // Remove any existing animation classes
    performanceCard.classList.remove('performance-card-analyzing', 'performance-card-optimizing', 'performance-card-applying');
    
    // Different animation for each step using CSS classes
    switch(stepIndex) {
      case 0: // Analyzing
        performanceCard.classList.add('performance-card-analyzing');
        await this.wait(800);
        break;
        
      case 1: // Optimizing
        performanceCard.classList.add('performance-card-optimizing');
        await this.wait(1200);
        break;
        
      case 2: // Applying
        performanceCard.classList.add('performance-card-applying');
        await this.wait(600);
        break;
    }
    
    // Remove animation class after completion
    performanceCard.classList.remove('performance-card-analyzing', 'performance-card-optimizing', 'performance-card-applying');
  }

  cancelOptimization() {
    if (!this.isOptimizing) return;
    
    this.isOptimizing = false;
    
    // Remove optimization-active class to stop animations
    const popup = document.getElementById('optimizationPopup');
    if (popup) {
      popup.classList.remove('optimization-active');
    }
    
    this.hideStepperPopup();
  }

  async updatePerformanceValue() {
    const performanceElement = document.getElementById('performanceValue');
    if (!performanceElement) return;
    
    // Always set to exactly 98% to match the mockup
    const currentValue = parseInt(performanceElement.textContent);
    const newValue = 98; // Fixed value to match mockup
    
    // Animate the number change with custom counter animation
    performanceElement.classList.add('performance-value', 'updating');
    
    return new Promise((resolve) => {
      const duration = 1500;
      const startTime = Date.now();
      const difference = newValue - currentValue;
      
      const updateNumber = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(currentValue + (difference * easeOutQuart));
        
        performanceElement.textContent = `${current}%`;
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          performanceElement.classList.remove('updating');
          console.log(`📊 Performance updated to: ${newValue}%`);
          
          // Store the new value for boost calculation
          this.afterOptimizationValue = newValue;
          
          // Update optimize button based on new performance value
          this.updateOptimizeButton();
          
          // DO NOT automatically show perfection popup
          // User must click the button again to see it
          console.log('🎯 98% reached - perfection popup available on next click');
          
          resolve();
        }
      };
      
      requestAnimationFrame(updateNumber);
    });
  }

  async showSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (!successPopup) return;

    console.log('✅ showSuccessPopup() triggered');
    
    // Add success-active class for enhanced animations
    successPopup.classList.add('success-active');
    
    // Remove animation-stopped class if it exists to ensure animations run
    successPopup.classList.remove('animation-stopped', 'show-checkmark');
    
    // Show popup with direct styles
    successPopup.style.display = 'flex';
    successPopup.style.opacity = '1';
    successPopup.style.pointerEvents = 'auto';
    successPopup.style.transform = 'scale(1)';
    successPopup.style.visibility = 'visible';

    // Calculate and show performance improvement
    this.updatePerformanceImprovement();

    // Animate the popup content
    const popupContent = successPopup.querySelector('.bg-white');
    if (popupContent) {
      popupContent.style.transform = 'scale(0.8) translateY(20px)';
      popupContent.style.opacity = '0';

      await this.wait(50);

      popupContent.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      popupContent.style.transform = 'scale(1) translateY(0)';
      popupContent.style.opacity = '1';

      const successIcon = popupContent.querySelector('.success-icon');
      if (successIcon) {
        successIcon.classList.add('popup-bounce-in');
      }
      
      // REMOVED: Don't automatically switch to checkmark after 3 seconds
      // Keep gear animation running until popup is closed
    }
    
    console.log('✅ Success popup shown with continuous gear animation');
  }

  async showPerfectionPopup() {
    // Hide any existing popups first
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
      this.hideSuccessPopup();
      await this.wait(300);
    }

    const perfectionPopup = document.getElementById('perfectionPopup');
    if (!perfectionPopup) return;

    console.log('🎯 showPerfectionPopup() triggered - 98% achieved!');
    
    // Update popup content to match mockup exactly
    const perfectionTitle = perfectionPopup.querySelector('.perfection-title');
    const perfectionSubtitle = perfectionPopup.querySelector('.perfection-subtitle');
    const perfectionDescription = perfectionPopup.querySelector('.perfection-description');
    const performanceDisplay = perfectionPopup.querySelector('.perfection-performance');
    const performanceLabel = perfectionPopup.querySelector('.perfection-label');
    const statusBadge = perfectionPopup.querySelector('.perfection-status');
    
    if (perfectionTitle) perfectionTitle.textContent = '🏆 PERFECTION!';
    if (performanceDisplay) performanceDisplay.textContent = '98%';
    if (performanceLabel) performanceLabel.textContent = 'MAX PERFORMANCE';
    if (statusBadge) statusBadge.textContent = '✨ Complete ✨';
    if (perfectionSubtitle) perfectionSubtitle.textContent = '🏆 Amazing!';
    if (perfectionDescription) {
      perfectionDescription.innerHTML = 'Your app reached <span class="text-orange-500 font-semibold">maximum</span> performance possible.';
    }
    
    // Show popup with full coverage
    perfectionPopup.style.display = 'flex';
    perfectionPopup.style.position = 'absolute';
    perfectionPopup.style.top = '0';
    perfectionPopup.style.left = '0';
    perfectionPopup.style.width = '100%';
    perfectionPopup.style.height = '100%';
    perfectionPopup.style.borderRadius = '2.25rem';
    perfectionPopup.style.opacity = '0';
    perfectionPopup.style.pointerEvents = 'none';

    // Force reflow
    void perfectionPopup.offsetWidth;

    // Make it visible with animation
    perfectionPopup.style.opacity = '1';
    perfectionPopup.style.pointerEvents = 'auto';

    // Animate the popup content with special effects
    const popupContent = perfectionPopup.querySelector('.popup-content, .relative, .bg-white, .bg-gradient-to-br');
    if (popupContent) {
      popupContent.style.transform = 'scale(0.7) translateY(30px)';
      popupContent.style.opacity = '0';

      await this.wait(100);

      popupContent.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      popupContent.style.transform = 'scale(1) translateY(0)';
      popupContent.style.opacity = '1';

      // Add special glow effect
      const perfectIcon = popupContent.querySelector('.perfect-icon, .perfection-icon');
      if (perfectIcon) {
        perfectIcon.classList.add('perfect-glow');
      }

      // Add sparkle animation to title
      const title = popupContent.querySelector('h3, .perfection-title');
      if (title) {
        title.classList.add('perfect-shine');
      }
    }
  }

  hidePerfectionPopup() {
    const perfectionPopup = document.getElementById('perfectionPopup');
    if (!perfectionPopup) return;
    
    // Add animation-stopped class to immediately stop all animations
    perfectionPopup.classList.add('animation-stopped');
    
    // Apply common exit animation class
    perfectionPopup.classList.add('popup-exit-animation');
    
    // Animate out
    const popupContent = perfectionPopup.querySelector('.bg-gradient-to-br');
    if (popupContent) {
      popupContent.style.transition = 'all 0.3s ease-in';
      popupContent.style.transform = 'scale(0.8) translateY(20px)';
      popupContent.style.opacity = '0';
    }
    
    setTimeout(() => {
      // Hide completely
      perfectionPopup.style.display = 'none';
      
      // Clean up classes after animation
      perfectionPopup.classList.remove('popup-exit-animation', 'animation-stopped');
      
    }, 300);
  }

  updatePerformanceImprovement() {
    const improvementElement = document.getElementById('performanceImprovement');
    if (improvementElement && this.beforeOptimizationValue && this.afterOptimizationValue) {
      // Calculate the actual improvement
      const actualImprovement = this.afterOptimizationValue - this.beforeOptimizationValue;
      
      if (actualImprovement > 0) {
        improvementElement.textContent = `+${actualImprovement}%`;
        console.log(`📈 Performance boost: +${actualImprovement}% (${this.beforeOptimizationValue}% → ${this.afterOptimizationValue}%)`);
      } else {
        // Fallback if calculation fails
        improvementElement.textContent = '+0%';
        console.log('⚠️ No performance improvement detected');
      }
    } else {
      // Fallback for missing data
      console.log('⚠️ Missing performance data, using fallback');
      improvementElement.textContent = '+5%';
    }
  }

  hideSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (!successPopup) return;
    
    console.log('🔄 Hiding success popup...');
    
    // Add animation-stopped class to immediately stop all animations
    successPopup.classList.add('animation-stopped');
    
    // Remove success-active class to stop animations
    successPopup.classList.remove('success-active', 'show-checkmark');
    
    // Apply common exit animation class
    successPopup.classList.add('popup-exit-animation');
    
    // Animate out
    const popupContent = successPopup.querySelector('.bg-white');
    if (popupContent) {
      popupContent.style.transition = 'all 0.2s ease-in';
      popupContent.style.transform = 'scale(0.9) translateY(10px)';
      popupContent.style.opacity = '0';
    }
    
    setTimeout(() => {
      // Hide completely
      successPopup.style.display = 'none';
      
      // Clean up classes after animation
      successPopup.classList.remove('popup-exit-animation', 'animation-stopped');
      
      console.log('✅ Success popup hidden');
    }, 300);
  }

  // Method to update optimize button text based on current performance
  updateOptimizeButton() {
    const optimizeBtn = document.getElementById('optimizeBtn');
    const performanceElement = document.getElementById('performanceValue');
    
    if (!optimizeBtn || !performanceElement) return;
    
    const currentPerformance = parseInt(performanceElement.textContent);
    
    if (currentPerformance >= 98) {
      optimizeBtn.textContent = 'Perfect! 🎯';
      optimizeBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      optimizeBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-purple-600', 'hover:bg-purple-700', 'bg-orange-600', 'hover:bg-orange-700');
    } else if (currentPerformance >= 95) {
      optimizeBtn.textContent = 'Fine-tune ⚡';
      optimizeBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
      optimizeBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-green-600', 'hover:bg-green-700', 'bg-orange-600', 'hover:bg-orange-700');
    } else if (currentPerformance >= 90) {
      optimizeBtn.textContent = 'Optimize More';
      optimizeBtn.classList.add('bg-orange-600', 'hover:bg-orange-700');
      optimizeBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'bg-purple-600', 'hover:bg-purple-700', 'bg-blue-600', 'hover:bg-blue-700');
    } else {
      optimizeBtn.textContent = 'Optimize Now';
      optimizeBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'bg-purple-600', 'hover:bg-purple-700', 'bg-orange-600', 'hover:bg-orange-700');
      optimizeBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
    
    console.log(`🔧 Button updated for ${currentPerformance}% performance: "${optimizeBtn.textContent}"`);
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM Content Loaded - Initializing Enhanced Phone Interface');
  try {
    new EnhancedPhoneInterface();
  } catch (error) {
    console.error('❌ Error initializing Enhanced Phone Interface:', error);
  }
});

// Handle responsive design for the phone frame
window.addEventListener('resize', () => {
  const phoneFrame = document.querySelector('.phone-frame');
  if (phoneFrame && window.innerWidth < 640) {
    phoneFrame.style.width = Math.min(280, window.innerWidth - 40) + 'px';
  } else if (phoneFrame) {
    phoneFrame.style.width = '280px';
  }
});

// Export the EnhancedPhoneInterface class for external use if needed
export { EnhancedPhoneInterface };
