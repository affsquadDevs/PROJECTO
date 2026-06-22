import type { Locale } from './routing';

// Source cost data is authored in USD. We convert per locale for display.
// Rates are indicative and static (the cost figures themselves are explicitly
// "indicative ranges"); update periodically. USD base.
export const USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  PLN: 3.95,
  UAH: 41,
  SEK: 10.5,
  CZK: 23,
};

export const LOCALE_CURRENCY: Record<Locale, string> = {
  en: 'USD',
  pl: 'PLN',
  es: 'EUR',
  pt: 'EUR',
  fr: 'EUR',
  it: 'EUR',
  de: 'EUR',
  uk: 'UAH',
  sv: 'SEK',
  cs: 'CZK',
  el: 'EUR',
};

// Round converted amounts to a "nice" figure so ranges stay readable.
function roundNice(value: number): number {
  if (value >= 100000) return Math.round(value / 5000) * 5000;
  if (value >= 10000) return Math.round(value / 1000) * 1000;
  if (value >= 1000) return Math.round(value / 100) * 100;
  return Math.round(value / 10) * 10;
}

export function convertFromUsd(usd: number, locale: Locale): number {
  const currency = LOCALE_CURRENCY[locale] ?? 'USD';
  const rate = USD_RATES[currency] ?? 1;
  return roundNice(usd * rate);
}

// Locale-aware currency formatter (converts USD → local currency, no decimals).
export function formatMoney(usd: number, locale: Locale): string {
  const currency = LOCALE_CURRENCY[locale] ?? 'USD';
  const amount = convertFromUsd(usd, locale);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
