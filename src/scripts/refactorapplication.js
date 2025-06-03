/**
 * Enhanced Phone Interface with Stepper Optimization
 * Handles optimization flow with 3-step stepper popup and progress tracking
 */

console.log('🚀 Enhanced Phone Interface with Stepper Optimization Loaded');

class EnhancedPhoneInterface {
  constructor() {
    this.isOptimizing = false;
    this.currentStep = 0;
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
    console.log('✅ Enhanced Phone Interface initialized successfully');
  }

  setRandomPerformanceValue() {
    // Set initial random value between 80-90%
    const initialValue = Math.floor(Math.random() * 11) + 80; // 80-90 range
    const performanceElement = document.getElementById('performanceValue');
    if (performanceElement) {
      performanceElement.textContent = `${initialValue}%`;
      console.log(`📊 Initial performance value set to: ${initialValue}%`);
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
    
    const content = popup.querySelector('.popup-content');
    if (content) {
      content.style.transition = 'all 0.2s ease-in';
      content.style.transform = 'scale(0.9) translateY(10px)';
      content.style.opacity = '0';
    }
    
    await this.wait(200);
    
    popup.classList.add('opacity-0', 'pointer-events-none');
    popup.classList.remove('opacity-100');
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
    this.hideStepperPopup();
  }

  async updatePerformanceValue() {
    const performanceElement = document.getElementById('performanceValue');
    if (!performanceElement) return;
    
    // Generate new value between 93-98%
    const newValue = Math.floor(Math.random() * 6) + 93; // 93-98 range
    const currentValue = parseInt(performanceElement.textContent);
    
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
    successPopup.classList.add('force-show');

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
    }
  }

  updatePerformanceImprovement() {
    const improvementElement = document.getElementById('performanceImprovement');
    if (improvementElement) {
      const improvements = ['+8%', '+12%', '+15%', '+18%', '+22%'];
      const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)];
      improvementElement.textContent = randomImprovement;
    }
  }

  hideSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (!successPopup) return;
    
    // Animate out
    const popupContent = successPopup.querySelector('.bg-white');
    if (popupContent) {
      popupContent.style.transition = 'all 0.2s ease-in';
      popupContent.style.transform = 'scale(0.9) translateY(10px)';
      popupContent.style.opacity = '0';
      
      setTimeout(() => {
        successPopup.classList.add('opacity-0', 'pointer-events-none');
        successPopup.classList.remove('opacity-100');
      }, 200);
    }
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
