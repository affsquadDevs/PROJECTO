import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { appEstimates, getAllAppSlugs, type AppEstimate, type CostBreakdownItem, type TimelinePhase, type FaqItem } from '@/data/appEstimates';
import { getLocalizedApp, getLocalizedSections } from '@/data/i18n/cost';
import { routing, type Locale } from '@/i18n/routing';
import { buildAlternates, SITE } from '@/i18n/metadata';
import { formatMoney } from '@/i18n/currency';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllAppSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const app = getLocalizedApp(slug, locale as Locale);
  if (!app) return {};
  const t = await getTranslations({ locale, namespace: 'costPage' });

  const title = t('heroTitle', { name: app.appName });
  const description = `${t('keyFeaturesIntro', { name: app.appName, category: app.category.toLowerCase(), count: app.keyFeatures.length, complexity: app.complexityLevel.toLowerCase() }).slice(0, 150)} ${formatMoney(app.totalCostMin, locale as Locale)}–${formatMoney(app.totalCostMax, locale as Locale)}.`;

  return {
    title,
    description,
    openGraph: { images: ['/og-image.png'], title, description, siteName: 'Projecto Calculator', type: 'article' },
    twitter: { images: ['/og-image.png'], card: 'summary_large_image', title, description },
    alternates: buildAlternates(locale as Locale, `/cost-to-build/${slug}`),
  };
}

export default async function CostToBuildPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const app = getLocalizedApp(slug, locale as Locale);
  if (!app) notFound();

  const t = await getTranslations('costPage');
  const nav = await getTranslations('nav');

  const fmt = (value: number) => formatMoney(value, locale as Locale);
  const sections = getLocalizedSections(slug, locale as Locale);
  const publishDate = '2026-03-08';
  const publishedDisplay = new Date(publishDate).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Derived, app-specific metrics.
  const totalHoursMin = app.costBreakdown.reduce((s: number, i: CostBreakdownItem) => s + i.hoursMin, 0);
  const totalHoursMax = app.costBreakdown.reduce((s: number, i: CostBreakdownItem) => s + i.hoursMax, 0);
  const mvpSavingsPct = Math.max(1, Math.round((1 - app.mvpCostMax / app.totalCostMax) * 100));
  const featureCount = app.keyFeatures.length;
  const driverCount = app.complexityFactors.length;
  const name = app.appName;
  const category = app.category;
  const categoryLower = category.toLowerCase();
  const complexityLabel = t(`complexityLevels.${app.complexityLevel}` as any);
  const complexityLower = complexityLabel.toLowerCase();
  const mvpCostRange = `${fmt(app.mvpCostMin)}–${fmt(app.mvpCostMax)}`;
  const fullCostRange = `${fmt(app.totalCostMin)}–${fmt(app.totalCostMax)}`;

  // ── Structured data (localized) ──
  const blogPostingSchema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: t('heroTitle', { name }),
    description: app.description,
    datePublished: publishDate, dateModified: publishDate, inLanguage: locale,
    author: { '@type': 'Organization', name: 'Projecto Calculator', url: SITE },
    publisher: { '@type': 'Organization', name: 'Projecto Calculator', logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/cost-to-build/${slug}` },
    articleSection: 'App Development Cost',
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: app.faqs.map((faq: FaqItem) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: SITE },
      { '@type': 'ListItem', position: 2, name: nav('blog'), item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: t('breadcrumbCurrent', { name }), item: `${SITE}/cost-to-build/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-jira-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader />

      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 sm:pt-6">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-jira-textSecondary">
          <li><Link href="/" className="hover:text-jira-blue transition-colors">{nav('home')}</Link></li>
          <li><span aria-hidden="true" className="mx-1">/</span></li>
          <li><Link href="/blog" className="hover:text-jira-blue transition-colors">{nav('blog')}</Link></li>
          <li><span aria-hidden="true" className="mx-1">/</span></li>
          <li className="text-jira-darkBlue font-medium">{t('breadcrumbCurrent', { name })}</li>
        </ol>
      </nav>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="datePublished" content={publishDate} />
          <meta itemProp="dateModified" content={publishDate} />

          <header className="mb-10 sm:mb-14">
            <div className="inline-block px-3 py-1 bg-primary-50 text-jira-blue text-xs font-semibold rounded-full mb-4 border border-blue-200">
              {category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-jira-darkBlue mb-4 leading-tight" itemProp="headline">
              {t('heroTitle', { name })}
            </h1>
            <div className="flex items-center gap-4 text-sm text-jira-textSecondary mb-6">
              <span>{t('by')} <strong className="text-jira-darkBlue">{t('team')}</strong></span>
              <span>·</span>
              <time dateTime={publishDate}>{publishedDisplay}</time>
              <span>·</span>
              <span>{t('readTime')}</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">{t('statFullBuild')}</p>
                <p className="text-base sm:text-lg font-bold text-jira-darkBlue leading-tight">{fmt(app.totalCostMin)}–<br className="sm:hidden" />{fmt(app.totalCostMax)}</p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">{t('statMvp')}</p>
                <p className="text-base sm:text-lg font-bold text-jira-success leading-tight">{fmt(app.mvpCostMin)}–<br className="sm:hidden" />{fmt(app.mvpCostMax)}</p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">{t('statTimeline')}</p>
                <p className="text-base sm:text-lg font-bold text-jira-darkBlue">{t('months', { min: app.totalTimeMin, max: app.totalTimeMax })}</p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">{t('statComplexity')}</p>
                <p className={`text-base sm:text-lg font-bold ${app.complexityLevel === 'Very High' ? 'text-jira-error' : app.complexityLevel === 'High' ? 'text-jira-warning' : 'text-jira-blue'}`}>{complexityLabel}</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-jira-textSecondary leading-relaxed" itemProp="description">{app.introText}</p>
          </header>

          <nav aria-label="Table of contents" className="card mb-10 sm:mb-14 bg-gray-50">
            <h2 className="text-base font-semibold text-jira-darkBlue mb-3">{t('inThisGuide')}</h2>
            <ol className="space-y-1.5 text-sm text-jira-textSecondary list-decimal list-inside">
              {sections.map((s, i) => (
                <li key={i}><a href={`#section-${i}`} className="hover:text-jira-blue transition-colors">{s.heading}</a></li>
              ))}
              <li><a href="#key-features" className="hover:text-jira-blue transition-colors">{t('tocKeyFeatures', { name })}</a></li>
              <li><a href="#cost-breakdown" className="hover:text-jira-blue transition-colors">{t('tocCostBreakdown')}</a></li>
              <li><a href="#complexity" className="hover:text-jira-blue transition-colors">{t('tocComplexity')}</a></li>
              <li><a href="#timeline" className="hover:text-jira-blue transition-colors">{t('tocTimeline')}</a></li>
              <li><a href="#mvp-vs-full" className="hover:text-jira-blue transition-colors">{t('tocMvp')}</a></li>
              <li><a href="#faq" className="hover:text-jira-blue transition-colors">{t('tocFaq')}</a></li>
            </ol>
          </nav>

          <div itemProp="articleBody">
            {sections.slice(0, 2).map((section, i) => (
              <section key={i} id={`section-${i}`} className="mb-10 sm:mb-14" aria-labelledby={`sh-${i}`}>
                <h2 id={`sh-${i}`} className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (<p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>))}
                </div>
              </section>
            ))}

            <section id="key-features" className="mb-10 sm:mb-14" aria-labelledby="key-features-heading">
              <h2 id="key-features-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{t('keyFeaturesHeading', { name })}</h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">{t('keyFeaturesIntro', { name, category: categoryLower, count: featureCount, complexity: complexityLower })}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {app.keyFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 card">
                    <span className="flex-shrink-0 mt-0.5 w-6 h-6 bg-jira-success text-white rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">✓</span>
                    <span className="text-sm text-jira-text leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {sections[2] && (
              <section id="section-2" className="mb-10 sm:mb-14" aria-labelledby="sh-2">
                <h2 id="sh-2" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{sections[2].heading}</h2>
                <div className="space-y-4">{sections[2].paragraphs.map((p, j) => (<p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>))}</div>
              </section>
            )}

            <section id="cost-breakdown" className="mb-10 sm:mb-14" aria-labelledby="cost-breakdown-heading">
              <h2 id="cost-breakdown-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{t('costBreakdownHeading')}</h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                {t.rich('costBreakdownIntro', {
                  name, hoursMin: totalHoursMin.toLocaleString(locale), hoursMax: totalHoursMax.toLocaleString(locale), complexity: complexityLower, category: categoryLower,
                  calc: (c) => <Link href="/calculator" className="text-jira-blue hover:underline font-medium">{c}</Link>,
                })}
              </p>
              <div className="overflow-x-auto rounded border border-jira-border shadow-jira">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-jira-border">
                      <th scope="col" className="text-left px-4 py-3 font-semibold text-jira-darkBlue">{t('thCategory')}</th>
                      <th scope="col" className="text-left px-4 py-3 font-semibold text-jira-darkBlue hidden sm:table-cell">{t('thDescription')}</th>
                      <th scope="col" className="text-right px-4 py-3 font-semibold text-jira-darkBlue">{t('thHours')}</th>
                      <th scope="col" className="text-right px-4 py-3 font-semibold text-jira-darkBlue">{t('thCostRange')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.costBreakdown.map((item: CostBreakdownItem, i: number) => (
                      <tr key={i} className={`border-b border-jira-border ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 font-medium text-jira-text">{item.category}</td>
                        <td className="px-4 py-3 text-jira-textSecondary hidden sm:table-cell">{item.description}</td>
                        <td className="px-4 py-3 text-right text-jira-text whitespace-nowrap">{item.hoursMin}–{item.hoursMax}</td>
                        <td className="px-4 py-3 text-right font-medium text-jira-darkBlue whitespace-nowrap">{fmt(item.costMin)} – {fmt(item.costMax)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-jira-darkBlue text-white font-semibold">
                      <td className="px-4 py-3 sm:hidden">{t('total')}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" colSpan={2}>{t('totalEstimatedCost')}</td>
                      <td className="px-4 py-3 text-right text-sm hidden sm:table-cell">{t('hrs', { min: totalHoursMin, max: totalHoursMax })}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">{fmt(app.totalCostMin)} – {fmt(app.totalCostMax)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-jira-textSecondary mt-3">{t('costFootnote')}</p>
            </section>

            {sections[3] && (
              <section id="section-3" className="mb-10 sm:mb-14" aria-labelledby="sh-3">
                <h2 id="sh-3" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{sections[3].heading}</h2>
                <div className="space-y-4">{sections[3].paragraphs.map((p, j) => (<p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>))}</div>
              </section>
            )}

            <section id="complexity" className="mb-10 sm:mb-14" aria-labelledby="complexity-heading">
              <h2 id="complexity-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{t('complexityHeading', { name })}</h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                {t.rich('complexityIntro', {
                  name, complexity: complexityLabel, category: categoryLower, drivers: driverCount, maxCost: fmt(app.totalCostMax), maxTime: app.totalTimeMax,
                  strong: (c) => <strong className="text-jira-darkBlue">{c}</strong>,
                })}
              </p>
              <div className="space-y-3">
                {app.complexityFactors.map((factor: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 card">
                    <span className="flex-shrink-0 mt-1 w-7 h-7 bg-jira-warning text-white rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">{i + 1}</span>
                    <p className="text-sm text-jira-text leading-relaxed">{factor}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="timeline" className="mb-10 sm:mb-14" aria-labelledby="timeline-heading">
              <h2 id="timeline-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{t('timelineHeading')}</h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                {t.rich('timelineIntro', {
                  name, totalMin: app.totalTimeMin, totalMax: app.totalTimeMax, mvpMin: app.mvpTimeMin, mvpMax: app.mvpTimeMax,
                  strong: (c) => <strong className="text-jira-darkBlue">{c}</strong>,
                })}
              </p>
              <div className="space-y-4">
                {app.timeline.map((phase: TimelinePhase, i: number) => (
                  <div key={i} className="card flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold text-sm shadow-jira" aria-hidden="true">{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className="text-base font-semibold text-jira-darkBlue">{phase.phase}</h3>
                        <span className="text-sm font-medium text-jira-blue">{phase.duration}</span>
                      </div>
                      <p className="text-sm text-jira-textSecondary leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="mvp-vs-full" className="mb-10 sm:mb-14" aria-labelledby="mvp-heading">
              <h2 id="mvp-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{t('mvpHeading')}</h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                {t('mvpIntro', { category: categoryLower, name, mvpCost: mvpCostRange, savings: mvpSavingsPct, fullCost: fullCostRange, mvpMin: app.mvpTimeMin, mvpMax: app.mvpTimeMax, totalMin: app.totalTimeMin, totalMax: app.totalTimeMax })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card border-l-4 border-l-jira-success">
                  <h3 className="text-lg font-semibold text-jira-darkBlue mb-3">{t('mvpCardTitle')}</h3>
                  <ul className="space-y-2 text-sm text-jira-textSecondary">
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span><strong>{t('labelCost')}</strong> {mvpCostRange}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span><strong>{t('labelTimeline')}</strong> {t('months', { min: app.mvpTimeMin, max: app.mvpTimeMax })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>{t('mvpBullet1', { category: categoryLower, savings: mvpSavingsPct })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>{t('mvpBullet2')}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>{t('mvpBullet3')}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>{t('mvpBullet4')}</span></li>
                  </ul>
                </div>
                <div className="card border-l-4 border-l-jira-blue">
                  <h3 className="text-lg font-semibold text-jira-darkBlue mb-3">{t('fullCardTitle')}</h3>
                  <ul className="space-y-2 text-sm text-jira-textSecondary">
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span><strong>{t('labelCost')}</strong> {fullCostRange}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span><strong>{t('labelTimeline')}</strong> {t('months', { min: app.totalTimeMin, max: app.totalTimeMax })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>{t('fullBullet1', { count: featureCount, category: categoryLower })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>{t('fullBullet2', { category: categoryLower })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>{t('fullBullet3', { drivers: driverCount })}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>{t('fullBullet4')}</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {sections[4] && (
              <section id="section-4" className="mb-10 sm:mb-14" aria-labelledby="sh-4">
                <h2 id="sh-4" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">{sections[4].heading}</h2>
                <div className="space-y-4">{sections[4].paragraphs.map((p, j) => (<p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>))}</div>
              </section>
            )}

            <section className="mb-10 sm:mb-14 bg-gradient-to-r from-jira-blue to-primary-600 rounded-lg p-8 sm:p-10 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('ctaHeading', { name })}</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">{t('ctaBody', { fullCost: fullCostRange, name, category: categoryLower })}</p>
              <Link href="/calculator" className="inline-flex items-center space-x-2 bg-white text-jira-blue px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors shadow-jira-md">
                <span>{t('ctaButton')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </section>

            <section id="faq" className="mb-10 sm:mb-14" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">{t('faqHeading')}</h2>
              <div className="space-y-4">
                {app.faqs.map((faq: FaqItem, i: number) => (
                  <div key={i} className="card" itemScope itemType="https://schema.org/Question">
                    <h3 className="text-base sm:text-lg font-semibold text-jira-darkBlue mb-2" itemProp="name">{faq.question}</h3>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-sm text-jira-textSecondary leading-relaxed" itemProp="text">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10 sm:mb-14" aria-labelledby="related-blog-heading">
              <h2 id="related-blog-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">{t('relatedGuidesHeading')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { href: '/blog/software-development-cost', title: t('guide1Title'), desc: t('guide1Desc') },
                  { href: '/blog/estimate-software-development-cost', title: t('guide2Title'), desc: t('guide2Desc') },
                  { href: '/blog/app-cost-calculator', title: t('guide3Title'), desc: t('guide3Desc') },
                  { href: '/blog/project-cost-calculation', title: t('guide4Title'), desc: t('guide4Desc') },
                ].map((g) => (
                  <Link key={g.href} href={g.href} className="card hover:shadow-jira-md transition-all duration-150 group">
                    <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1">{t('guideLabel')}</p>
                    <h3 className="text-base font-semibold text-jira-darkBlue group-hover:text-jira-blue transition-colors">{g.title}</h3>
                    <p className="text-sm text-jira-textSecondary mt-1">{g.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-10 sm:mb-14" aria-labelledby="related-apps-heading">
              <h2 id="related-apps-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">{t('moreEstimatesHeading')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {appEstimates.filter((a: AppEstimate) => a.slug !== app.slug).map((a: AppEstimate) => {
                  const la = getLocalizedApp(a.slug, locale as Locale)!;
                  return (
                    <Link key={a.slug} href={`/cost-to-build/${a.slug}`} className="card hover:shadow-jira-md transition-all duration-150 group">
                      <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1 truncate">{la.category}</p>
                      <h3 className="text-sm font-semibold text-jira-darkBlue mb-2 group-hover:text-jira-blue transition-colors leading-snug">{t('moreEstimatesTitle', { name: a.appName })}</h3>
                      <p className="text-sm font-medium text-jira-textSecondary">{fmt(a.totalCostMin)} – {fmt(a.totalCostMax)}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
