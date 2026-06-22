import { setRequestLocale, getTranslations } from 'next-intl/server';
import * as Fi from 'react-icons/fi';
import { Link } from '@/i18n/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import OpenSourceCta from '@/components/OpenSourceCta';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const features = [
    { icon: Fi.FiDollarSign, title: t('feature1Title'), body: t('feature1Body') },
    { icon: Fi.FiClock, title: t('feature2Title'), body: t('feature2Body') },
    { icon: Fi.FiCheckCircle, title: t('feature3Title'), body: t('feature3Body') },
  ];
  const steps = [
    { icon: Fi.FiUsers, title: t('step1Title'), body: t('step1Body') },
    { icon: Fi.FiLayers, title: t('step2Title'), body: t('step2Body') },
    { icon: Fi.FiTarget, title: t('step3Title'), body: t('step3Body') },
    { icon: Fi.FiFileText, title: t('step4Title'), body: t('step4Body') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('faq1Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq1A') } },
      { '@type': 'Question', name: t('faq2Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq2A') } },
      { '@type': 'Question', name: t('faq4Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq4A') } },
      { '@type': 'Question', name: t('faq5Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq5A') } },
      { '@type': 'Question', name: t('faq6Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq6A') } },
      { '@type': 'Question', name: t('faq7Q'), acceptedAnswer: { '@type': 'Answer', text: t('faq7A') } },
    ],
  };

  return (
    <div className="min-h-screen bg-jira-background">
      <SiteHeader active="home" />

      <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-jira-darkBlue mb-4 sm:mb-6 leading-tight px-2">
            {t('heroLead')}{' '}
            <span className="relative inline-block">
              <span className="relative !z-20">{t('heroHighlight')}</span>
              <svg className="absolute -bottom-1 left-0 w-full h-7 pointer-events-none overflow-visible" viewBox="0 0 600 40" preserveAspectRatio="none" style={{ zIndex: 1 }}>
                <path d="M 0 28 Q 50 12, 100 32 Q 150 15, 200 28 Q 250 18, 300 30 Q 350 16, 400 28 Q 450 20, 500 30 Q 550 18, 600 26" stroke="#FFEB3B" strokeWidth="21" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="1" strokeDasharray="600" strokeDashoffset="600" className="marker-path" />
              </svg>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-jira-textSecondary mb-8 sm:mb-12 leading-relaxed px-2">
            {t('subtitle')}
          </p>
          <Link href="/calculator" className="btn-primary text-base sm:text-lg inline-flex items-center space-x-2 px-6 py-3">
            <span>{t('ctaStart')}</span>
            <Fi.FiArrowRight className="text-lg sm:text-xl" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="card text-center hover:shadow-jira-md transition-all duration-150">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4 border border-jira-border">
                <f.icon className="text-3xl text-jira-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{f.title}</h3>
              <p className="text-jira-textSecondary text-sm">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-jira-darkBlue px-2">{t('howItWorksTitle')}</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="card flex items-start space-x-4 hover:shadow-jira-md transition-all duration-150">
                <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold shadow-jira">
                  <s.icon className="text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 text-jira-darkBlue">{s.title}</h3>
                  <p className="text-jira-textSecondary text-sm">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-jira-darkBlue px-2">{t('faqTitle')}</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq1Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq1A')}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq2Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq2A')}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq3Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed mb-2">{t('faq3Intro')}</p>
              <ul className="list-disc list-inside text-jira-textSecondary text-sm space-y-1 ml-4">
                <li>{t('faq3Item1')}</li>
                <li>{t('faq3Item2')}</li>
                <li>{t('faq3Item3')}</li>
                <li>{t('faq3Item4')}</li>
                <li>{t('faq3Item5')}</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq4Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq4A')}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq5Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq5A')}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq6Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq6A')}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('faq7Q')}</h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">{t('faq7A')}</p>
            </div>
          </div>
        </div>

        <OpenSourceCta />
      </main>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
