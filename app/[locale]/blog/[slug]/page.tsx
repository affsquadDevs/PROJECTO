import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { articles as articleList } from '@/data/articles';
import { routing, type Locale } from '@/i18n/routing';
import { buildAlternates, BRAND } from '@/i18n/metadata';
import BlogArticleContent from './ArticleContent';

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
  const article = articleList.find((a) => a.slug === slug && !a.isCostEstimate);
  if (!article) return {};

  const alreadyBranded =
    article.title.includes(BRAND) ||
    article.title.includes('Projecto') ||
    article.title.includes('Projekto');
  const title = alreadyBranded ? article.title : `${article.title} | ${BRAND}`;
  const description = article.excerpt;

  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, `/blog/${slug}`),
    openGraph: {
      images: ['/og-image.png'],
      title,
      description,
      type: 'article',
    },
    twitter: {
      images: ['/og-image.png'],
      card: 'summary_large_image',
      title,
      description,
    },
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

  return <BlogArticleContent slug={slug} />;
}
