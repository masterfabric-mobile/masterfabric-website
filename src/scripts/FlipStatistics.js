export function initFlipStatistics() {
  const statCards = document.querySelectorAll('.stat-card');
  
  // Remove hover effects - let CSS handle it
  statCards.forEach((card, index) => {
    // Add semantic attributes only
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Statistic: ${card.dataset.originalLabel} - ${card.dataset.originalValue}`);
    
    // Keyboard accessibility only
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerCardInteraction(card);
      }
    });
  });
  
  // Card interaction feedback
  function triggerCardInteraction(card) {
    card.style.transform = 'translateY(-6px) scale(1.02)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  }
  
  // Enhanced intersection observer for performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        observer.unobserve(card);
      }
    });
  }, observerOptions);
  
  // Initial setup and observe cards
  statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`;
    observer.observe(card);
  });
  
  // Performance optimization: pause animations when not visible
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const animatedElements = card.querySelectorAll('.pattern-grid, .pattern-dots, .stat-icon');
      
      if (entry.isIntersecting) {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'running';
        });
      } else {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'paused';
        });
      }
    });
  }, { threshold: 0 });
  
  statCards.forEach(card => performanceObserver.observe(card));
  
  // Respect user's motion preferences
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isReducedMotion) {
    statCards.forEach(card => {
      card.style.animation = 'none';
      card.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
      });
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFlipStatistics);
