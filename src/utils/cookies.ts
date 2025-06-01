/**
 * Cookie Management Utilities
 * GDPR compliant cookie handling functions
 */

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

const COOKIE_CONSENT_KEY = 'masterfabric_cookie_consent';
const COOKIE_BANNER_SHOWN_KEY = 'masterfabric_banner_shown';

/**
 * Set a cookie with expiration
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Get current cookie consent status
 */
export function getCookieConsent(): CookieConsent | null {
  try {
    const consent = getCookie(COOKIE_CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
}

/**
 * Save cookie consent preferences
 */
export function saveCookieConsent(consent: Partial<CookieConsent>): void {
  const fullConsent: CookieConsent = {
    essential: true, // Always true
    analytics: consent.analytics || false,
    marketing: consent.marketing || false,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  setCookie(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent), 365);
}

/**
 * Check if user has already seen the banner
 */
export function hasBannerBeenShown(): boolean {
  return getCookie(COOKIE_BANNER_SHOWN_KEY) === 'true';
}

/**
 * Mark banner as shown
 */
export function markBannerAsShown(): void {
  setCookie(COOKIE_BANNER_SHOWN_KEY, 'true', 365);
}

/**
 * Check if we should show the cookie banner
 */
export function shouldShowCookieBanner(): boolean {
  const consent = getCookieConsent();
  const bannerShown = hasBannerBeenShown();
  
  // Show banner if no consent given AND banner hasn't been explicitly dismissed
  return !consent && !bannerShown;
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  saveCookieConsent({
    analytics: true,
    marketing: true
  });
  markBannerAsShown();
}

/**
 * Accept only essential cookies
 */
export function acceptEssentialOnly(): void {
  saveCookieConsent({
    analytics: false,
    marketing: false
  });
  markBannerAsShown();
}
