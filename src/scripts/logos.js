/**
 * Logos section interactive functionality
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTechIconHovers();
  initScrollAnimations();
  initContactEmailTracking();
});

/**
 * Enhanced hover effects for technology icons
 */
function initTechIconHovers() {
  const techIcons = document.querySelectorAll('.tech-icon');
  
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      // Add subtle bounce effect
      this.style.transform = 'scale(1.15) translateY(-5px)';
      
      // Add glow effect
      this.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))';
    });
    
    icon.addEventListener('mouseleave', function() {
      // Reset transform
      this.style.transform = '';
      this.style.filter = '';
    });
  });
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in-view');
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.animate-fade-in-up, .animate-slide-in-up, .animate-slide-in-up-delayed'
  );
  
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Track email contact interactions
 */
function initContactEmailTracking() {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  
  if (emailLink) {
    emailLink.addEventListener('click', function() {
      // Analytics tracking (if needed)
      console.log('Email contact clicked');
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  }
}

/**
 * Add parallax effect to floating elements
 */
function initParallaxEffect() {
  const floatingElements = document.querySelectorAll('.animate-float, .animate-float-delayed, .animate-float-slow');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

/**
 * Button click animations
 */
function initButtonAnimations() {
  const buttons = document.querySelectorAll('.group');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .animate-in-view {
    animation-play-state: running;
  }
`;
document.head.appendChild(style);
