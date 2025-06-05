/**
 * Phone interface module
 * Handles updating the phone UI based on active features
 */
import { getActiveFeatures, getActiveFeaturesCount, featureConfig, activateFeature, deactivateFeature } from './featureManager.js';
import { updateMetrics } from './metricsAnimator.js';

// Keep track of loaded state
let appLoaded = false;

/**
 * Update phone interface based on active features
 */
export function updatePhoneInterface() {
  const activeCount = getActiveFeaturesCount();
  const statusBar = document.getElementById('statusBar');
  const appTitle = document.getElementById('appTitle');
  const appSubtitle = document.getElementById('appSubtitle');
  const metricsTitle = document.getElementById('metricsTitle');
  const featuresTitle = document.getElementById('featuresTitle');
  
  // Dynamic theming based on active features
  if (activeCount >= 4) {
    statusBar.classList.add('bg-transparent');
    statusBar.classList.remove('bg-gray-50');
    appTitle.textContent = 'MasterFabric Pro';
    appSubtitle.textContent = 'Fully Optimized';
    metricsTitle.textContent = 'Peak Performance';
    featuresTitle.textContent = 'Premium';
  } else if (activeCount >= 2) {
    statusBar.classList.add('bg-transparent');
    statusBar.classList.remove('bg-gray-50');
    appTitle.textContent = 'MasterFabric Plus';
    appSubtitle.textContent = 'Enhanced';
    metricsTitle.textContent = 'Live Metrics';
    featuresTitle.textContent = 'Active';
  } else {
    statusBar.classList.add('bg-transparent');
    statusBar.classList.remove('bg-gray-50');
    appTitle.textContent = 'MasterFabric';
    appSubtitle.textContent = 'Basic';
    metricsTitle.textContent = 'Basic';
    featuresTitle.textContent = 'Features';
  }
  
  // Update feature rows to reflect active state
  const featureRows = document.querySelectorAll('.feature-toggle');
  featureRows.forEach(row => {
    const toggleSwitch = row.querySelector('.toggle-switch');
    const isActive = toggleSwitch.dataset.active === 'true';
    
    if (isActive) {
      row.classList.add('active');
    } else {
      row.classList.remove('active');
    }
  });
  
  // Update metrics based on active features
  updateMetrics();
}

/**
 * Apply tactile feedback to element
 * @param {HTMLElement} element - Element to apply feedback to
 */
export function applyTactileFeedback(element) {
  element.classList.add('toggling');
  
  setTimeout(() => {
    element.classList.remove('toggling');
  }, 300);
  
  // Add haptic feedback for mobile
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

/**
 * Initialize feature toggle interactions
 */
export function initializeFeatureToggles() {
  // Interactive toggle switches with improved functionality
  const toggleSwitches = document.querySelectorAll('.toggle-switch');
  
  toggleSwitches.forEach(toggle => {
    // Fix toggle display state
    const isActive = toggle.dataset.active === 'true';
    const toggleCircle = toggle.querySelector('.toggle-circle');
    
    if (isActive) {
      toggle.classList.add('active');
      if (toggleCircle) toggleCircle.style.transform = 'translateX(1.25rem)';
    } else {
      toggle.classList.remove('active');
      if (toggleCircle) toggleCircle.style.transform = 'translateX(0)';
    }
    
    toggle.addEventListener('click', handleToggleClick);
  });
}

/**
 * Handle toggle switch click
 * @param {Event} e - Click event
 */
function handleToggleClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const toggle = e.currentTarget;
  const isActive = toggle.dataset.active === 'true';
  const featureRow = toggle.closest('.feature-toggle');
  const featureName = featureRow.dataset.feature;
  const toggleCircle = toggle.querySelector('.toggle-circle');
  
  // Toggle state
  toggle.dataset.active = (!isActive).toString();
  
  // Update active features set
  if (!isActive) {
    activateFeature(featureName);
    toggle.classList.add('active');
    featureRow.classList.add('active');
    if (toggleCircle) toggleCircle.style.transform = 'translateX(1.25rem)';
  } else {
    deactivateFeature(featureName);
    toggle.classList.remove('active');
    featureRow.classList.remove('active');
    if (toggleCircle) toggleCircle.style.transform = 'translateX(0)';
  }
  
  // Update the phone interface
  updatePhoneInterface();
  
  // Add tactile feedback
  applyTactileFeedback(toggle);
}

/**
 * Initialize phone interface interactions
 */
export function initializePhoneInteractions() {
  // Add enhanced click effects to stats cards
  const statsCards = document.querySelectorAll('.stats-card');
  statsCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 12px 30px -5px rgba(0, 0, 0, 0.15)';
      
      setTimeout(() => {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, 300);
    });
  });
  
  // Initialize bottom navigation
  initializeBottomNav();
  
  // Simulate app loading with skeleton screens
  simulateAppLoading();
  
  // Add scroll-based phone animations
  initializeScrollAnimations();
}

/**
 * Initialize bottom navigation
 */
function initializeBottomNav() {
  const navItems = document.querySelectorAll('.bottom-nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      navItems.forEach(navItem => navItem.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Optional: scroll to appropriate section
      const targetSection = this.dataset.target;
      if (targetSection) {
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * Simulate app loading with skeleton screens
 */
function simulateAppLoading() {
  const skeletons = document.querySelectorAll('.skeleton-loader');
  const contentElements = document.querySelectorAll('.content-loader');
  
  // Show skeletons, hide content
  skeletons.forEach(skeleton => skeleton.classList.remove('hidden'));
  contentElements.forEach(element => element.classList.add('hidden'));
  
  // Simulate loading delay
  setTimeout(() => {
    // Hide skeletons, show content with fade-in effect
    skeletons.forEach(skeleton => {
      skeleton.classList.add('opacity-0');
      setTimeout(() => skeleton.classList.add('hidden'), 300);
    });
    
    contentElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('hidden');
        element.classList.add('animate-fadeIn');
      }, 300 + index * 100);
    });
    
    appLoaded = true;
  }, 1500);
}

/**
 * Initialize scroll-based animations for phone elements
 */
function initializeScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const phoneElements = document.querySelectorAll('.animate-on-scroll');
    phoneElements.forEach(element => {
      observer.observe(element);
    });
  }
}

/**
 * Updates current time in the status bar
 */
export function updatePhoneTime() {
  const timeDisplay = document.getElementById('timeDisplay');
  if (timeDisplay) {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    timeDisplay.textContent = `${hours}:${minutes}`;
  }
}

// Set up time update interval
setInterval(updatePhoneTime, 60000);
// Initial time update
updatePhoneTime();
