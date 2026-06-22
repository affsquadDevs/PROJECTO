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
    title: t('cookieTitle'),
    description: t('cookieDescription'),
    alternates: buildAlternates(locale as Locale, '/cookie-policy'),
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cookie');

  return (
    <div className="min-h-screen bg-jira-background">
      <SiteHeader active="home" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-2">{t('title')}</h1>
          <p className="text-sm text-jira-textSecondary mb-6">{t('lastUpdated')}</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-jira-textSecondary leading-relaxed mb-6">
              {t('intro')}{' '}
              <Link href="/blog/privacy-policy" className="text-jira-blue hover:underline">{t('privacyLink')}</Link>.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s1Heading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('s1Body')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s2Heading')}</h2>
            <ul className="list-disc list-inside text-jira-textSecondary mb-6 space-y-2 ml-4">
              <li>{t('s2Essential')}</li>
              <li>{t('s2Analytics')}</li>
              <li>{t('s2Advertising')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s3Heading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('s3Body')}</p>
            <ul className="list-disc list-inside text-jira-textSecondary mb-4 space-y-2 ml-4">
              <li>{t('s3Item1')}</li>
              <li>{t('s3Item2')}</li>
              <li>
                {t('s3Item3Pre')}{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-jira-blue hover:underline">{t('s3Item3Link')}</a>.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s4Heading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('s4Body1')}</p>
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('s4Body2')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s5Heading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('s5Body')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('s6Heading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed">
              {t('s6Body')}{' '}
              <a href="mailto:hello@affsquad.com" className="text-jira-blue hover:underline">hello@affsquad.com</a>.
            </p>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
