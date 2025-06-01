// ============================================================================
// NAVBAR UTILITIES
// ============================================================================

import type { MenuItem, SocialLink, NavigationData } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Load navigation data from JSON file
 */
export function loadNavigationData(): NavigationData {
  const navigationDataPath = path.join(process.cwd(), "src/data/navigation.json");
  return JSON.parse(fs.readFileSync(navigationDataPath, "utf-8"));
}

/**
 * Sort menu items by order
 */
export function sortMenuItems(menuItems: MenuItem[]): MenuItem[] {
  return menuItems.sort((a, b) => a.order - b.order);
}

/**
 * Sort social links by order
 */
export function sortSocialLinks(socialLinks: SocialLink[]): SocialLink[] {
  return socialLinks.sort((a, b) => a.order - b.order);
}

/**
 * Get social link color classes
 */
export function getSocialLinkClasses(color: string): string {
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105";
  
  if (color === 'blue') {
    return `${baseClasses} text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:border-blue-700`;
  }
  
  return `${baseClasses} text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900`;
}

/**
 * Get mobile social link classes
 */
export function getMobileSocialLinkClasses(color: string): string {
  const baseClasses = "flex items-center justify-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border";
  
  if (color === 'blue') {
    return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700`;
  }
  
  return `${baseClasses} text-gray-700 bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300`;
}

/**
 * Check if menu item has dropdown
 */
export function hasDropdown(item: MenuItem): boolean {
  return item.dropdown !== undefined && item.dropdown.items.length > 0;
}

/**
 * Get active menu item based on current path
 */
export function getActiveMenuItem(menuItems: MenuItem[], currentPath: string): MenuItem | null {
  return menuItems.find(item => item.path === currentPath) || null;
}

/**
 * Generate unique ID for menu item
 */
export function generateMenuItemId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Validate navigation data structure
 */
export function validateNavigationData(data: any): data is NavigationData {
  return (
    data &&
    typeof data === 'object' &&
    data.brand &&
    Array.isArray(data.menuItems) &&
    Array.isArray(data.socialLinks) &&
    data.responsive
  );
}

/**
 * Get responsive breakpoint classes
 */
export function getResponsiveClasses(): Record<string, string> {
  return {
    mobile: 'block lg:hidden',
    desktop: 'hidden lg:flex',
    tablet: 'hidden md:block lg:hidden'
  };
}

/**
 * Format brand text for display
 */
export function formatBrandText(text: { main: string; secondary: string; tertiary: string }): string {
  return `${text.main}${text.secondary}${text.tertiary}`.trim();
}

/**
 * Get icon size classes
 */
export function getIconSizeClasses(size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm':
      return 'w-4 h-4';
    case 'md':
      return 'w-5 h-5';
    case 'lg':
      return 'w-6 h-6';
    default:
      return 'w-5 h-5';
  }
}
