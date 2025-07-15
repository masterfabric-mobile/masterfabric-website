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
  sticky: true,
  showBrandDescription: true,
  showSocialLinks: true,
  enableAnimations: true,
  mobileMenuCollapse: true,
  maxWidth: '1280px',
  position: 'sticky',
  zIndex: 50
};

export const NAVBAR_THEME_CLASSES = {
  light: 'bg-white border-b border-gray-200',
  dark: 'bg-gray-900 border-b border-gray-800 text-white',
  transparent: 'bg-transparent',
  minimal: 'bg-white',
  colorful: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
  'high-contrast': 'bg-black text-white',
  auto: 'bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800'
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
