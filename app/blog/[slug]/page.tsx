import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles as articleList } from '@/data/articles';
import BlogArticleContent from './ArticleContent';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

// Only known article slugs are valid; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return articleList
    .filter((a) => !a.isCostEstimate)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleList.find((a) => a.slug === slug && !a.isCostEstimate);
  if (!article) return {};

  const alreadyBranded =
    article.title.includes(BRAND) ||
    article.title.includes('Projecto') ||
    article.title.includes('Projekto');
  const title = alreadyBranded ? article.title : `${article.title} | ${BRAND}`;
  const description = article.excerpt;
  const url = `${SITE}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      images: ['/og-image.png'],
      title,
      description,
      url,
      siteName: BRAND,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = articleList.some((a) => a.slug === slug && !a.isCostEstimate);
  if (!exists) notFound();

  return <BlogArticleContent slug={slug} />;
}
