/**
 * Logos section interactive functionality
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add interactive hover effects for tech icons
  const techIcons = document.querySelectorAll('section [name*="simple-icons"]');
  
  techIcons.forEach(icon => {
    const parent = icon.closest('div') || icon.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        icon.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))';
      });
      
      parent.addEventListener('mouseleave', () => {
        icon.style.filter = '';
      });
    }
  });

  // Add click tracking for buttons
  const ctaButtons = document.querySelectorAll('a[href="/contact"], a[href="/about"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Add ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
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
        z-index: 0;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
