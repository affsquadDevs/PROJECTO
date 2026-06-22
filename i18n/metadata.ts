import { locales, defaultLocale, indexedLocales, type Locale } from './routing';

export const SITE = 'https://projecto-calculator.com';
export const BRAND = 'Projecto Calculator';

// Build the locale URL for a given path. `path` is the route WITHOUT the locale
// prefix, e.g. '' (home), '/about', '/blog/foo'. English (default) has no prefix.
export function localeUrl(locale: Locale, path = ''): string {
  const clean = path === '/' ? '' : path;
  return locale === defaultLocale
    ? `${SITE}${clean || '/'}`
    : `${SITE}/${locale}${clean}`;
}

// canonical (current locale) + hreflang alternates. During the staged rollout we
// only advertise hreflang among indexed locales (avoids hreflang→noindex conflicts).
export function buildAlternates(locale: Locale, path = '') {
  const languages: Record<string, string> = {
    'x-default': localeUrl(defaultLocale, path),
  };
  for (const l of indexedLocales) languages[l] = localeUrl(l, path);
  return { canonical: localeUrl(locale, path), languages };
}
