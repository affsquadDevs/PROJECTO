import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { buildAlternates } from '@/i18n/metadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: buildAlternates(locale as Locale, '/about'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="min-h-screen bg-jira-background">
      <SiteHeader active="about" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-6">{t('title')}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('p2')}</p>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('p3')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('estimateHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('estimateBody')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('notHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('notBody')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('whoHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('whoBody')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('openSourceHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              {t('openSourceBody')}{' '}
              <Link href="/blog/open-source-projekto-calculator" className="text-jira-blue hover:underline">
                {t('openSourceLink')}
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('contactHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              {t('contactBody')}{' '}
              <a href="mailto:hello@affsquad.com" className="text-jira-blue hover:underline">hello@affsquad.com</a>.
            </p>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
