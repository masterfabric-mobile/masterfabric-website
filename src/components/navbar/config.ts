// ============================================================================
// NAVBAR CONFIGURATION
// ============================================================================

export interface NavbarConfig {
  theme: 'light' | 'dark' | 'transparent' | 'minimal' | 'colorful' | 'high-contrast' | 'auto';
  sticky: boolean;
  showBrandDescription: boolean;
  showSocialLinks: boolean;
  enableAnimations: boolean;
  mobileMenuCollapse: boolean;
  maxWidth: string;
  position: 'static' | 'fixed' | 'sticky' | 'absolute';
  zIndex: number;
}

export const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  theme: 'light',
  sticky: false,
  showBrandDescription: true,
  showSocialLinks: true,
  enableAnimations: true,
  mobileMenuCollapse: true,
  maxWidth: '1280px',
  position: 'static',
  zIndex: 50
};

export const NAVBAR_THEME_CLASSES = {
  light: 'navbar-theme-light',
  dark: 'navbar-theme-dark',
  transparent: 'navbar-theme-transparent',
  minimal: 'navbar-theme-minimal',
  colorful: 'navbar-theme-colorful',
  'high-contrast': 'navbar-theme-high-contrast',
  auto: 'navbar-theme-auto'
} as const;

export const NAVBAR_BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 640
  },
  tablet: {
    min: 641,
    max: 1023
  },
  desktop: {
    min: 1024,
    max: Infinity
  }
} as const;

export const NAVBAR_ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms'
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
} as const;

export const NAVBAR_SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem'
} as const;
