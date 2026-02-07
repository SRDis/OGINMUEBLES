/**
 * Funciones para manejar cookies y consentimiento
 */

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof window === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function hasCookieConsent(): boolean {
  return getCookie('cookie_consent') === 'true';
}

export function setCookieConsent(consent: boolean): void {
  setCookie('cookie_consent', consent ? 'true' : 'false', 365);
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function getCookiePreferences(): CookiePreferences {
  const prefs = getCookie('cookie_preferences');
  if (!prefs) {
    return {
      necessary: true, // Siempre activo
      analytics: false,
      marketing: false,
    };
  }
  try {
    return JSON.parse(prefs);
  } catch {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
    };
  }
}

export function setCookiePreferences(preferences: CookiePreferences): void {
  setCookie('cookie_preferences', JSON.stringify(preferences), 365);
}

export function canUseCookieCategory(category: keyof CookiePreferences): boolean {
  const prefs = getCookiePreferences();
  return prefs[category] === true;
}
