import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { articles as articleList } from '@/data/articles';
import { getArticleMeta } from '@/data/i18n/articles';
import { routing, defaultLocale, type Locale } from '@/i18n/routing';
import { buildAlternates } from '@/i18n/metadata';
import BlogArticleContent, { RICH_ENGLISH_SLUGS } from './ArticleContent';
import TranslatedArticle from '@/components/TranslatedArticle';

// Only known article slugs are valid; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = articleList.filter((a) => !a.isCostEstimate).map((a) => a.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const exists = articleList.some((a) => a.slug === slug && !a.isCostEstimate);
  if (!exists) return {};

  const meta = getArticleMeta(slug, locale as Locale);
  // Strip any brand suffix; the layout title template appends it once.
  const title = meta.title.replace(/\s*\|\s*Projec?k?to.*$/i, '').trim();
  const description = meta.excerpt;

  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, `/blog/${slug}`),
    openGraph: { images: ['/og-image.png'], title, description, type: 'article' },
    twitter: { images: ['/og-image.png'], card: 'summary_large_image', title, description },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const exists = articleList.some((a) => a.slug === slug && !a.isCostEstimate);
  if (!exists) notFound();

  // English renders from the original rich JSX where one exists; generated posts
  // (and every non-default locale) render from the translated/HTML source.
  if (locale === defaultLocale && RICH_ENGLISH_SLUGS.has(slug)) {
    return <BlogArticleContent slug={slug} />;
  }
  return <TranslatedArticle slug={slug} locale={locale as Locale} />;
}
