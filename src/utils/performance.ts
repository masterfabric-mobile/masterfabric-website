/**
 * Performance utilities for the website
 * Handles lazy loading, preloading, and initialization optimizations
 */

// Lazy loading configuration for images
export const lazyLoadOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px',
  threshold: 0.01
};

// App initialization states for splash screen
export const initializationStates = [
  {
    id: 'loading-assets',
    message: 'Loading assets...',
    icon: '📦',
    duration: 800
  },
  {
    id: 'initializing-components',
    message: 'Initializing components...',
    icon: '⚙️',
    duration: 600
  },
  {
    id: 'preparing-timeline',
    message: 'Preparing timeline...',
    icon: '🚀',
    duration: 700
  },
  {
    id: 'optimizing-performance',
    message: 'Optimizing performance...',
    icon: '⚡',
    duration: 500
  },
  {
    id: 'finalizing',
    message: 'Almost ready...',
    icon: '✨',
    duration: 400
  }
];

// Preload critical resources
export function preloadCriticalResources(): Promise<void[]> {
  const criticalResources = [
    '/src/assets/masterfabric-logo.svg',
    '/src/components/timeline/styles.css'
  ];

  const preloadPromises = criticalResources.map(resource => {
    return new Promise<void>((resolve) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'image';
      link.onload = () => resolve();
      link.onerror = () => resolve(); // Continue even if failed
      document.head.appendChild(link);
      
      // Fallback timeout
      setTimeout(resolve, 1000);
    });
  });

  return Promise.all(preloadPromises);
}

// Initialize app with all components
export async function initializeApp(): Promise<void> {
  try {
    // Preload critical resources
    await preloadCriticalResources();
    
    // Initialize lazy loading for images
    initializeLazyLoading();
    
    // Additional initialization can be added here
    console.log('App initialization completed');
  } catch (error) {
    console.warn('App initialization had issues:', error);
  }
}

// Initialize lazy loading for images
function initializeLazyLoading(): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, lazyLoadOptions);

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
