/**
 * Popup Manager module
 * Handles showing and hiding of popups
 */

/**
 * Initialize popup functionality
 */
export function initializePopup() {
  const optimizeButton = document.getElementById('optimizeButton');
  const successPopup = document.getElementById('successPopup');
  const closePopupButton = document.getElementById('closePopup');
  const popupContent = document.getElementById('popupContent');
  
  if (optimizeButton && successPopup && closePopupButton) {
    // Add click handler for optimize button
    optimizeButton.addEventListener('click', () => {
      showPopup(successPopup, popupContent);
      vibrate();
    });
    
    // Add click handler for close button
    closePopupButton.addEventListener('click', () => {
      hidePopup(successPopup, popupContent);
    });
    
    // Close on click outside popup content
    successPopup.addEventListener('click', (e) => {
      if (e.target === successPopup) {
        hidePopup(successPopup, popupContent);
      }
    });
    
    // Add confetti effect when optimizing
    optimizeButton.addEventListener('click', createConfetti);
  }
}

/**
 * Show popup with animation
 * @param {HTMLElement} popup - Popup container element
 * @param {HTMLElement} content - Popup content element
 */
function showPopup(popup, content) {
  // Prepare animation
  popup.style.display = 'flex';
  popup.style.opacity = '0';
  content.style.transform = 'scale(0.95)';
  
  // Trigger reflow
  void popup.offsetWidth;
  
  // Animate in
  popup.style.opacity = '1';
  popup.style.pointerEvents = 'auto';
  content.style.transform = 'scale(1)';
}

/**
 * Hide popup with animation
 * @param {HTMLElement} popup - Popup container element
 * @param {HTMLElement} content - Popup content element
 */
function hidePopup(popup, content) {
  // Animate out
  popup.style.opacity = '0';
  popup.style.pointerEvents = 'none';
  content.style.transform = 'scale(0.95)';
  
  // Remove after animation
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
}

/**
 * Create confetti effect
 */
function createConfetti() {
  const colors = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#f59e0b'];
  const container = document.querySelector('.phone-frame');
  
  if (!container) return;
  
  // Create confetti pieces
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style the confetti
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = color;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.position = 'absolute';
    confetti.style.top = '-10px';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.opacity = Math.random() + 0.5;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '100';
    
    // Add to container
    container.appendChild(confetti);
    
    // Animate
    confetti.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 1500 + 1000,
        easing: 'cubic-bezier(0,0.5,1,1)',
        fill: 'forwards'
      }
    ).onfinish = () => {
      confetti.remove();
    };
  }
}

/**
 * Vibrate device if supported
 */
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([50, 30, 50]);
  }
}
