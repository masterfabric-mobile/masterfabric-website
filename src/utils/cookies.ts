/**
 * Cookie Management Utilities
 * GDPR compliant cookie handling functions
 */

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentSave {
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'masterfabric_cookie_consent';
const COOKIE_BANNER_SHOWN_KEY = 'masterfabric_banner_shown';

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function setCookie(name: string, value: string, days?: number): void {
  if (typeof document === 'undefined') return;
  
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function getCookieConsent(): CookieConsent | null {
  const consent = getCookie(COOKIE_CONSENT_KEY);
  if (!consent) return null;
  
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsentSave): void {
  const fullConsent: CookieConsent = {
    essential: true,
    analytics: consent.analytics,
    marketing: consent.marketing
  };
  
  setCookie(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent), 365);
}

export function markBannerAsShown(): void {
  setCookie(COOKIE_BANNER_SHOWN_KEY, 'true', 365);
}

export function isBannerShown(): boolean {
  return getCookie(COOKIE_BANNER_SHOWN_KEY) === 'true';
}

export function shouldShowCookieBanner(): boolean {
  return !isBannerShown() && !getCookieConsent();
}

export function acceptAllCookies(): void {
  saveCookieConsent({
    analytics: true,
    marketing: true
  });
  markBannerAsShown();
}

export function acceptEssentialOnly(): void {
  saveCookieConsent({
    analytics: false,
    marketing: false
  });
  markBannerAsShown();
}
