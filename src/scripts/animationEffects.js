/**
 * Animation Effects Module
 * Handles visual effects like confetti and animations
 */

/**
 * Create enhanced confetti effect within phone
 */
export function createConfetti() {
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
  const phoneScreen = document.getElementById('phoneScreen');
  if (!phoneScreen) return;
  
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'absolute inset-0 pointer-events-none z-40 overflow-hidden rounded-3xl';
  phoneScreen.appendChild(confettiContainer);
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 4 + 2;
    confetti.className = 'absolute rounded-full';
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '20%';
    confetti.style.animation = `confettiFall ${1.5 + Math.random()}s ease-out forwards`;
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confettiContainer.appendChild(confetti);
  }
  
  setTimeout(() => {
    if (phoneScreen.contains(confettiContainer)) {
      phoneScreen.removeChild(confettiContainer);
    }
  }, 2500);
}

/**
 * Apply pulse animation to an element
 * @param {HTMLElement} element - Element to animate
 * @param {number} duration - Animation duration in milliseconds
 */
export function applyPulseAnimation(element, duration = 600) {
  element.style.animation = `pulse ${duration}ms ease-out`;
  
  element.addEventListener('animationend', () => {
    element.style.animation = '';
  }, { once: true });
}

/**
 * Create a floating animation
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export function createFloatingAnimation(element, options = {}) {
  const {
    amplitude = 20, // Movement amplitude in pixels
    period = 3000,  // Animation period in milliseconds
    delay = 0,      // Delay before animation starts
    easing = 'ease-in-out'
  } = options;
  
  element.style.animation = `float ${period}ms ${easing} ${delay}ms infinite`;
  
  if (!document.querySelector('style#float-animations')) {
    const style = document.createElement('style');
    style.id = 'float-animations';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-${amplitude}px); }
      }
    `;
    document.head.appendChild(style);
  }
}
