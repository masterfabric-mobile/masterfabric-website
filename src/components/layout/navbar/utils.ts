// ============================================================================
// NAVBAR UTILITIES
// ============================================================================

import type { MenuItem, SocialLink, NavigationData, SimpleMenuItem } from './types';

/**
 * Sort menu items by order
 */
export function sortMenuItems(menuItems: MenuItem[] | SimpleMenuItem[]): MenuItem[] | SimpleMenuItem[] {
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
export function hasDropdown(item: MenuItem | SimpleMenuItem): boolean {
  return item.dropdown !== undefined && item.dropdown.items.length > 0;
}

/**
 * Check if a path is the current page
 */
export function isCurrentPage(itemPath: string, currentPath: string): boolean {
  const normalizeCurrentPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
  const normalizeItemPath = itemPath === '/' ? '/' : itemPath.replace(/\/$/, '');
  return normalizeCurrentPath === normalizeItemPath;
}

/**
 * Get active menu item based on current path
 */
export function getActiveMenuItem(menuItems: MenuItem[] | SimpleMenuItem[], currentPath: string): MenuItem | SimpleMenuItem | null {
  return menuItems.find(item => {
    const itemPath = 'path' in item ? item.path : ('href' in item ? item.href : '');
    return isCurrentPage(itemPath, currentPath);
  }) || null;
}

/**
 * Generate unique ID for menu item
 */
export function generateMenuItemId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Get responsive breakpoint classes
 */
export function getResponsiveClasses(): Record<string, string> {
  return {
    mobile: 'block md:hidden',
    desktop: 'hidden md:flex',
    tablet: 'hidden sm:block md:hidden'
  };
}
