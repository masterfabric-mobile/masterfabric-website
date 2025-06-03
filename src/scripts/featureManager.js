/**
 * Feature management module
 * Handles tracking active features and their configurations
 */

// Set of active features
const activeFeatures = new Set();

// Feature configuration
export const featureConfig = {
  "Analytics": {
    color: "blue",
    icon: "chart-pie",
    metrics: {
      uptime: 99.2,
      load: 1.2,
      rating: 4.8
    }
  },
  "Performance": {
    color: "indigo",
    icon: "lightning-bolt",
    metrics: {
      uptime: 98.7,
      load: 0.8,
      rating: 4.7
    }
  },
  "Engagement": {
    color: "purple",
    icon: "users",
    metrics: {
      uptime: 97.5,
      load: 1.5,
      rating: 4.6
    }
  },
  "Notifications": {
    color: "orange",
    icon: "bell",
    metrics: {
      uptime: 99.6,
      load: 1.0,
      rating: 4.9
    }
  },
  "A/B Testing": {
    color: "green",
    icon: "beaker",
    metrics: {
      uptime: 98.2,
      load: 1.7,
      rating: 4.5
    }
  }
};

/**
 * Initialize active features from the DOM on page load
 */
export function initializeActiveFeatures() {
  // Find all active toggles in the DOM and add their features to the set
  const activeToggles = document.querySelectorAll('.toggle-switch[data-active="true"]');
  activeToggles.forEach(toggle => {
    const featureRow = toggle.closest('.feature-toggle');
    if (featureRow) {
      const featureName = featureRow.dataset.feature;
      if (featureName) {
        activeFeatures.add(featureName);
      }
    }
  });
}

/**
 * Get all active features
 * @returns {Set} Set of active feature names
 */
export function getActiveFeatures() {
  return activeFeatures;
}

/**
 * Get count of active features
 * @returns {number} Number of active features
 */
export function getActiveFeaturesCount() {
  return activeFeatures.size;
}

/**
 * Check if a feature is active
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean} True if feature is active
 */
export function isFeatureActive(featureName) {
  return activeFeatures.has(featureName);
}

/**
 * Activate a feature
 * @param {string} featureName - Name of the feature to activate
 */
export function activateFeature(featureName) {
  activeFeatures.add(featureName);
  console.log(`Feature activated: ${featureName}`);
  console.log(`Active features: ${Array.from(activeFeatures).join(', ')}`);
}

/**
 * Deactivate a feature
 * @param {string} featureName - Name of the feature to deactivate
 */
export function deactivateFeature(featureName) {
  activeFeatures.delete(featureName);
  console.log(`Feature deactivated: ${featureName}`);
  console.log(`Active features: ${Array.from(activeFeatures).join(', ')}`);
}
