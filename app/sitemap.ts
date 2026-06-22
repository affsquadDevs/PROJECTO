import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { getAllAppSlugs } from '@/data/appEstimates';
import { indexedLocales, defaultLocale } from '@/i18n/routing';
import { localeUrl } from '@/i18n/metadata';

// All "logical" routes (locale-agnostic paths, '' = home).
function allPaths(): string[] {
  const staticPaths = ['', '/calculator', '/blog', '/about', '/contact', '/cookie-policy'];
  const blogPaths = articles
    .filter((a) => !a.isCostEstimate)
    .map((a) => `/blog/${a.slug}`);
  const costPaths = getAllAppSlugs().map((s) => `/cost-to-build/${s}`);
  return [...staticPaths, ...blogPaths, ...costPaths];
}

function priorityFor(path: string): number {
  if (path === '') return 1.0;
  if (path === '/calculator') return 0.9;
  if (path.startsWith('/cost-to-build')) return 0.8;
  if (path === '/blog') return 0.8;
  if (path === '/cookie-policy') return 0.5;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths()) {
    // hreflang alternates: only indexed locales (+ x-default) during staged rollout.
    const languages: Record<string, string> = {
      'x-default': localeUrl(defaultLocale, path),
    };
    for (const l of indexedLocales) languages[l] = localeUrl(l, path);

    // One URL entry per indexed locale, each advertising the indexed alternates set.
    for (const l of indexedLocales) {
      entries.push({
        url: localeUrl(l, path),
        changeFrequency: 'monthly',
        priority: priorityFor(path),
        alternates: { languages },
      });
    }
  }

  return entries;
}
