// ============================================================================
// NAVBAR INDEX - Main Export File
// ============================================================================

// Export main navbar component
export { default as Navbar } from './navbar.astro';
export { default as Dropdown } from './dropdown.astro';

// Export utilities and configuration
export * from './utils';
export * from './types';
export * from './config';

// Export style constants
export const NAVBAR_STYLES = {
  variables: './styles/variables.css',
  themes: './styles/themes.css',
  mobile: './styles/mobile.css',
  tablet: './styles/tablet.css', 
  desktop: './styles/desktop.css',
  animations: './styles/animations.css',
  utilities: './styles/utilities.css',
  main: './styles/navbar.css'
} as const;

// Export responsive breakpoints
export const NAVBAR_BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1024
} as const;

// Export navbar configuration
export const NAVBAR_CONFIG = {
  mobileMenuCollapse: true,
  showSocialLinks: true,
  enableAnimations: true,
  stickyHeader: true,
  showBrandDescription: true
} as const;
