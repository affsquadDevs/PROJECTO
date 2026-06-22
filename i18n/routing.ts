import { defineRouting } from 'next-intl/routing';

// ISO-639 language codes (note: UA→uk, CZ→cs, EL→el).
export const locales = [
  'en',
  'pl',
  'es',
  'pt',
  'fr',
  'it',
  'de',
  'uk',
  'sv',
  'cs',
  'el',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Locales that are indexable + listed in the sitemap/hreflang.
// Full rollout: all locales are indexed. To pull a locale back to noindex (and out
// of the sitemap/hreflang), remove its code from this list — that's the only change.
export const indexedLocales: Locale[] = [...locales];

export function isIndexed(locale: string): boolean {
  return (indexedLocales as string[]).includes(locale);
}

// Human-readable names for the language switcher (shown in their own language).
export const localeNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  uk: 'Українська',
  sv: 'Svenska',
  cs: 'Čeština',
  el: 'Ελληνικά',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English served at `/` (no prefix); every other locale prefixed: /pl, /es, …
  localePrefix: 'as-needed',
});
