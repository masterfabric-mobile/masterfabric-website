/**
 * Cookie Banner Controller
 * Handles opening, closing, and managing cookie consent settings
 */

// Global function to open the cookie banner
function openCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  
  if (cookieBanner) {
    cookieBanner.classList.remove('hidden');
    cookieBanner.setAttribute('aria-hidden', 'false');
    
    // Optional: scroll into view or add animation classes
    cookieBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Dispatch event for other components that might need to know
    document.dispatchEvent(new CustomEvent('cookieBannerOpened'));
  }
}

// Make the function available globally
window.openCookieBanner = openCookieBanner;

// Initialize cookie banner behavior
document.addEventListener('DOMContentLoaded', () => {
  // Find the cookie settings links anywhere in the document
  const cookieSettingsLinks = document.querySelectorAll('[data-open-cookie-banner]');
  
  // Add click handlers to all cookie settings links
  cookieSettingsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openCookieBanner();
    });
  });
  
  // Auto-open cookie banner if consent hasn't been given yet
  const hasConsent = localStorage.getItem('cookie-consent') === 'true';
  if (!hasConsent) {
    // Optional: add a small delay for better UX
    setTimeout(openCookieBanner, 1000);
  }
  
  // Set up close button handlers
  const closeButtons = document.querySelectorAll('[data-close-cookie-banner]');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cookieBanner = document.getElementById('cookie-banner');
      if (cookieBanner) {
        cookieBanner.classList.add('hidden');
        cookieBanner.setAttribute('aria-hidden', 'true');
      }
    });
  });
  
  // Set up accept button handler
  const acceptButton = document.querySelector('[data-accept-cookies]');
  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      // Store consent
      localStorage.setItem('cookie-consent', 'true');
      
      // Close banner
      const cookieBanner = document.getElementById('cookie-banner');
      if (cookieBanner) {
        cookieBanner.classList.add('hidden');
        cookieBanner.setAttribute('aria-hidden', 'true');
      }
      
      // Dispatch event for other components that might need to know
      document.dispatchEvent(new CustomEvent('cookieConsentGiven'));
    });
  }
});

// Export functions if using modules
export { openCookieBanner };
