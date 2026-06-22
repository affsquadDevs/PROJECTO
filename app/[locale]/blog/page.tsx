import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { articles } from '@/data/articles';
import { getArticleMeta } from '@/data/i18n/articles';
import { getLocalizedApp } from '@/data/i18n/cost';
import { routing, type Locale } from '@/i18n/routing';
import { buildAlternates } from '@/i18n/metadata';
import BlogPageClient, { type BlogListItem } from './BlogPageClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
    alternates: buildAlternates(locale as Locale, '/blog'),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('costPage');

  // Build a localized listing: cost-estimate entries derive title/excerpt from the
  // cost translations; regular articles from the article overlay.
  const list: BlogListItem[] = articles.map((a) => {
    if (a.isCostEstimate) {
      const app = getLocalizedApp(a.slug, locale as Locale);
      return {
        slug: a.slug,
        isCostEstimate: true,
        date: a.date,
        heroImage: a.heroImage,
        title: app ? tc('heroTitle', { name: app.appName }) : a.title,
        excerpt: app?.description ?? a.excerpt,
      };
    }
    const meta = getArticleMeta(a.slug, locale as Locale);
    return { slug: a.slug, isCostEstimate: false, date: a.date, heroImage: a.heroImage, title: meta.title, excerpt: meta.excerpt };
  });

  return <BlogPageClient articles={list} />;
}
