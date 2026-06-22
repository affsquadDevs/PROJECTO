import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
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
    title: t('contactTitle'),
    description: t('contactDescription'),
    alternates: buildAlternates(locale as Locale, '/contact'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-jira-background">
      <SiteHeader active="contact" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-6">{t('title')}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('intro')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('welcomeHeading')}</h2>
            <ul className="list-disc list-inside text-jira-textSecondary mb-6 space-y-2 ml-4">
              <li>{t('welcome1')}</li>
              <li>{t('welcome2')}</li>
              <li>{t('welcome3')}</li>
              <li>{t('welcome4')}</li>
              <li>{t('welcome5')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('howHeading')}</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-jira-darkBlue mb-2">{t('emailLabel')}</h3>
              <a href="mailto:hello@affsquad.com" className="text-jira-blue hover:underline text-lg">hello@affsquad.com</a>
            </div>
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('responseNote')}</p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">{t('commHeading')}</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('comm1')}</p>
            <p className="text-jira-textSecondary leading-relaxed mb-4">{t('comm2')}</p>
            <p className="text-jira-textSecondary leading-relaxed mb-6">{t('comm3')}</p>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
