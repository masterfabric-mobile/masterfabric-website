// Footer interactive functionality
document.addEventListener('DOMContentLoaded', () => {
  initFooterCookieSettings();
  initFooterAnimations();
});

/**
 * Initialize cookie settings button
 */
function initFooterCookieSettings() {
  const footerCookieBtn = document.getElementById('footer-cookie-settings');
  if (footerCookieBtn) {
    footerCookieBtn.addEventListener('click', () => {
      // Trigger cookie settings modal
      const event = new CustomEvent('show-cookie-settings');
      window.dispatchEvent(event);
    });
  }
}

/**
 * Add subtle animations to footer links
 */
function initFooterAnimations() {
  const footerLinks = document.querySelectorAll('.footer-link, .footer-legal-link');
  
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Astro link special animation
  const astroLink = document.querySelector('.astro-link');
  if (astroLink) {
    astroLink.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.astro-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    astroLink.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.astro-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  }
}
