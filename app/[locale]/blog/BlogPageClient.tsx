'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import * as Fi from 'react-icons/fi';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const ARTICLES_PER_PAGE = 10;

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  heroImage?: string;
  isCostEstimate?: boolean;
};

const parseDate = (s: string): number => {
  const [day, month, year] = s.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

function BlogContent({ articles }: { articles: BlogListItem[] }) {
  const t = useTranslations('blogIndex');
  const searchParams = useSearchParams();
  const sorted = useMemo(() => [...articles].sort((a, b) => parseDate(b.date) - parseDate(a.date)), [articles]);
  const totalPages = Math.ceil(sorted.length / ARTICLES_PER_PAGE);
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = pageParam < 1 ? 1 : pageParam > totalPages ? totalPages : pageParam;

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return sorted.slice(start, start + ARTICLES_PER_PAGE);
  }, [sorted, currentPage]);

  const getPageUrl = (page: number) => (page === 1 ? '/blog' : `/blog?page=${page}`);

  return (
    <>
      <div className="space-y-6">
        {paginated.map((article) => {
          const articleUrl = article.isCostEstimate ? `/cost-to-build/${article.slug}` : `/blog/${article.slug}`;
          return (
            <Link key={article.slug} href={articleUrl} className="card block p-6 hover:shadow-jira-md transition-all duration-150">
              {article.heroImage && (
                <div className="mb-6 -mx-6 -mt-6">
                  <img src={article.heroImage} alt={article.title} loading="lazy" decoding="async" className="w-full h-64 sm:h-80 object-contain bg-gradient-to-br from-purple-50 to-blue-50 rounded-t-lg" />
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {article.isCostEstimate && (
                      <span className="inline-block px-2 py-0.5 bg-jira-success text-white text-xs font-semibold rounded">{t('costEstimate')}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-jira-darkBlue hover:text-jira-blue transition-colors">{article.title}</h2>
                </div>
                <span className="text-sm text-jira-textSecondary whitespace-nowrap ml-4">{article.date}</span>
              </div>
              <p className="text-jira-textSecondary leading-relaxed">{article.excerpt}</p>
              <div className="mt-4 inline-flex items-center text-jira-blue hover:underline">
                <span className="text-sm font-medium">{t('readMore')}</span>
                <Fi.FiArrowRight className="ml-2" />
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-jira-textSecondary">{t('pageInfo', { current: currentPage, total: totalPages })}</div>
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link href={getPageUrl(currentPage - 1)} className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue transition-colors flex items-center gap-2">
                <Fi.FiChevronLeft className="text-lg" /><span>{t('previous')}</span>
              </Link>
            ) : (
              <div className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary opacity-50 cursor-not-allowed flex items-center gap-2">
                <Fi.FiChevronLeft className="text-lg" /><span>{t('previous')}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
                if (!showPage) {
                  if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="px-2 text-jira-textSecondary">...</span>;
                  return null;
                }
                return (
                  <Link key={page} href={getPageUrl(page)} className={`px-4 py-2 border border-jira-border rounded-lg transition-colors ${page === currentPage ? 'bg-jira-blue text-white border-jira-blue' : 'text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue'}`}>
                    {page}
                  </Link>
                );
              })}
            </div>
            {currentPage < totalPages ? (
              <Link href={getPageUrl(currentPage + 1)} className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue transition-colors flex items-center gap-2">
                <span>{t('next')}</span><Fi.FiChevronRight className="text-lg" />
              </Link>
            ) : (
              <div className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary opacity-50 cursor-not-allowed flex items-center gap-2">
                <span>{t('next')}</span><Fi.FiChevronRight className="text-lg" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function BlogPageClient({ articles }: { articles: BlogListItem[] }) {
  const t = useTranslations('blogIndex');
  return (
    <div className="min-h-screen bg-jira-background">
      <SiteHeader active="blog" />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-jira-darkBlue mb-8">{t('heading')}</h1>
        <Suspense fallback={<div className="space-y-6" />}>
          <BlogContent articles={articles} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
