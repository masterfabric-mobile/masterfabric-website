/**
 * Metrics animator module
 * Handles animations and updates for metrics display
 */
import { getActiveFeatures, getActiveFeaturesCount, featureConfig } from './featureManager.js';

// Base metrics for when no features are active
const baseMetrics = {
  uptime: 95.0,
  load: 3.5,
  rating: 3.8
};

/**
 * Initialize metrics animation
 * Animates metrics values when they come into view
 */
export function initializeMetricsAnimation() {
  const metricElements = document.querySelectorAll('.metric-value');
  
  // Check if IntersectionObserver is available
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateMetric(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    metricElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    metricElements.forEach(element => {
      animateMetric(element);
    });
  }
}

/**
 * Animate a metric from 0 to its target value
 * @param {HTMLElement} element - Element containing the metric
 */
function animateMetric(element) {
  const value = parseFloat(element.dataset.value);
  const decimalPlaces = value % 1 === 0 ? 0 : (element.textContent.split('.')[1] || '').length;
  const duration = 1500;
  const startTime = performance.now();
  
  function updateValue(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing function to smooth out animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = (value * easeOutQuart).toFixed(decimalPlaces);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }
  
  requestAnimationFrame(updateValue);
}

/**
 * Calculate and update metrics based on active features
 */
export function updateMetrics() {
  const activeFeatures = getActiveFeatures();
  const activeCount = getActiveFeaturesCount();
  
  // Calculate new metrics based on active features
  let newMetrics = { ...baseMetrics };
  
  // Add improvements from each active feature
  for (const feature of activeFeatures) {
    const config = featureConfig[feature];
    if (config && config.metrics) {
      newMetrics.uptime = Math.max(newMetrics.uptime, config.metrics.uptime);
      newMetrics.load = Math.min(newMetrics.load, config.metrics.load);
      newMetrics.rating = Math.max(newMetrics.rating, config.metrics.rating);
    }
  }
  
  // Update DOM elements
  updateMetricElements(newMetrics);
}

/**
 * Update metric elements with new values
 * @param {Object} metrics - Object containing new metric values
 */
function updateMetricElements(metrics) {
  // Find and update each metric element
  const metricElements = document.querySelectorAll('.metric-value');
  
  metricElements.forEach(element => {
    const metricType = element.nextElementSibling?.textContent?.toLowerCase();
    
    if (metricType && metrics[metricType.toLowerCase()]) {
      // Update the data attribute for animation
      const value = metrics[metricType.toLowerCase()];
      element.dataset.value = value;
      
      // If element is visible, animate to new value
      if (isElementVisible(element)) {
        animateMetric(element);
      } else {
        element.textContent = value.toFixed(1);
      }
    }
  });
  
  // Update visual progress elements if they exist
  const progressBar = document.querySelector('.progress-animate');
  if (progressBar) {
    progressBar.style.width = `${metrics.uptime}%`;
  }
}

/**
 * Check if an element is currently visible in the viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is visible
 */
function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
