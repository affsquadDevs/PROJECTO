import { articles, type Article } from '@/data/articles';
import { defaultLocale, type Locale } from '@/i18n/routing';

import pl from './articles/pl.json';
import es from './articles/es.json';
import pt from './articles/pt.json';
import fr from './articles/fr.json';
import it from './articles/it.json';
import de from './articles/de.json';
import uk from './articles/uk.json';
import sv from './articles/sv.json';
import cs from './articles/cs.json';
import el from './articles/el.json';

// English source bodies (extracted from the rendered build, loss-free).
import enSource from './articles/_source/index.json';

type ArticleOverlay = { title?: string; excerpt?: string; bodyHtml?: string };
type EnSource = { title: string; excerpt: string; date: string; bodyHtml: string };

const OVERLAYS: Record<string, Record<string, ArticleOverlay>> = {
  pl, es, pt, fr, it, de, uk, sv, cs, el,
} as Record<string, Record<string, ArticleOverlay>>;

const EN: Record<string, EnSource> = enSource as Record<string, EnSource>;

function baseArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// Localized title/excerpt for listings + metadata.
export function getArticleMeta(slug: string, locale: Locale): { title: string; excerpt: string } {
  const base = baseArticle(slug);
  const fallback = { title: base?.title ?? slug, excerpt: base?.excerpt ?? '' };
  if (locale === defaultLocale) return fallback;
  const ov = OVERLAYS[locale]?.[slug];
  return {
    title: ov?.title ?? fallback.title,
    excerpt: ov?.excerpt ?? fallback.excerpt,
  };
}

// Localized body (HTML) for non-default locales. Returns null if unavailable.
export function getArticleBody(
  slug: string,
  locale: Locale,
): { title: string; date: string; bodyHtml: string } | null {
  const en = EN[slug];
  if (!en) return null;
  if (locale === defaultLocale) return { title: en.title, date: en.date, bodyHtml: en.bodyHtml };
  const ov = OVERLAYS[locale]?.[slug];
  return {
    title: ov?.title ?? en.title,
    date: en.date,
    bodyHtml: ov?.bodyHtml ?? en.bodyHtml,
  };
}

// Prefix root-relative internal links with the locale (English has no prefix).
export function localizeHtmlLinks(html: string, locale: Locale): string {
  if (locale === defaultLocale) return html;
  return html.replace(/href="\/(?!\/)/g, `href="/${locale}/`);
}
