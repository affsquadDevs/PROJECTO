import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import enMessages from '../messages/en.json';

type Messages = Record<string, unknown>;

// Deep-merge so that any key missing in the active locale falls back to the
// English (default-locale) value instead of rendering the raw key path. This
// keeps newly added keys readable in non-English locales until translations
// are added, without modifying the other locale JSON files.
function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = result[key];
    if (
      overrideValue &&
      typeof overrideValue === 'object' &&
      !Array.isArray(overrideValue) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue as Messages, overrideValue as Messages);
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages =
    locale === routing.defaultLocale
      ? (enMessages as Messages)
      : ((await import(`../messages/${locale}.json`)).default as Messages);

  return {
    locale,
    messages: deepMerge(enMessages as Messages, localeMessages),
  };
});
