import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getArticleBody, getArticleMeta, localizeHtmlLinks } from '@/data/i18n/articles';
import { SITE, localeUrl } from '@/i18n/metadata';
import type { Locale } from '@/i18n/routing';

export default async function TranslatedArticle({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const body = getArticleBody(slug, locale);
  const meta = getArticleMeta(slug, locale);
  const nav = await getTranslations('nav');
  if (!body) return null;

  const html = localizeHtmlLinks(body.bodyHtml, locale);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': localeUrl(locale, `/blog/${slug}`) },
    author: { '@type': 'Organization', name: 'Projecto Calculator', url: SITE },
    publisher: { '@type': 'Organization', name: 'Projecto Calculator', logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: SITE },
      { '@type': 'ListItem', position: 2, name: nav('blog'), item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: localeUrl(locale, `/blog/${slug}`) },
    ],
  };

  return (
    <div className="min-h-screen bg-jira-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader active="blog" />

      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 sm:pt-6">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-jira-textSecondary">
          <li><Link href="/" className="hover:text-jira-blue transition-colors">{nav('home')}</Link></li>
          <li><span aria-hidden="true" className="mx-1">/</span></li>
          <li><Link href="/blog" className="hover:text-jira-blue transition-colors">{nav('blog')}</Link></li>
        </ol>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8" itemScope itemType="https://schema.org/BlogPosting">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-8" itemProp="headline">{body.title}</h1>
          <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
