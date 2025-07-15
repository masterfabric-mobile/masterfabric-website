// ============================================================================
// NAVBAR TYPES
// ============================================================================

export interface BrandText {
  main: string;
  secondary: string;
  tertiary: string;
}

export interface BrandDescription {
  platform: string;
  studio: string;
}

export interface Brand {
  logo: string;
  text: BrandText;
  description: BrandDescription;
  alt: string;
}

export interface DropdownItem {
  title: string;
  path: string;
  description?: string;
}

export interface Dropdown {
  items: DropdownItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  order: number;
  icon?: string;
  style?: string;
  dropdown?: Dropdown;
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: 'blue' | 'gray';
  order: number;
}

export interface ResponsiveConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  menuCollapse: boolean;
}

export interface NavigationData {
  brand: Brand;
  menuItems: MenuItem[];
  socialLinks: SocialLink[];
  responsive: ResponsiveConfig;
}

// Simple interface for navigation items used in basic navbar
export interface SimpleMenuItem {
  name: string;
  href: string;
  order: number;
  dropdown?: {
    items: Array<{
      title: string;
      path: string;
      description?: string;
    }>
  };
}

// Simple brand interface
export interface SimpleBrand {
  name: string;
  logo: string;
}
