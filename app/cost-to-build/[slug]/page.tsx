import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appEstimates, getAppEstimateBySlug, getAllAppSlugs } from '@/data/appEstimates';
import type { AppEstimate, CostBreakdownItem, TimelinePhase, FaqItem } from '@/data/appEstimates';
import { appContent } from '@/data/appContent';

// ─── Force static generation ─────────────────────────────────────────
export const dynamicParams = false;

// ─── Static Generation ───────────────────────────────────────────────
export function generateStaticParams() {
  const slugs = getAllAppSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic SEO Metadata ────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppEstimateBySlug(slug);
  if (!app) return {};

  const title = `Cost to Build ${app.displayName} Like App in 2026 | Projecto Calculator`;
  const description = `Learn how much it costs to build ${app.displayName} like app. Detailed cost breakdown, team size, tech stack, timeline and estimated budget from $${(app.totalCostMin / 1000).toFixed(0)}K to $${(app.totalCostMax / 1000).toFixed(0)}K. Free cost calculator included.`;

  return {
    title,
    description,
    openGraph: {
      images: ['/og-image.png'],
      title,
      description,
      url: `https://projecto-calculator.com/cost-to-build/${app.slug}`,
      siteName: 'Projecto Calculator',
      type: 'article',
    },
    twitter: {
      images: ['/og-image.png'],
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://projecto-calculator.com/cost-to-build/${app.slug}`,
    },
  };
}

// ─── Helper: format currency ─────────────────────────────────────────
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Page Component ──────────────────────────────────────────────────
export default async function CostToBuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Debug: log the slug to see what we're receiving
  if (process.env.NODE_ENV === 'development') {
    console.log('[CostToBuildPage] Received slug:', slug);
    console.log('[CostToBuildPage] Available slugs:', getAllAppSlugs());
  }
  
  const app = getAppEstimateBySlug(slug);
  if (!app) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[CostToBuildPage] App not found for slug:', slug);
    }
    notFound();
  }

  const sections = appContent[app.slug] ?? [];
  const publishDate = '2026-03-08';

  // ── BlogPosting structured data (for Google rich results) ─────────
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: `Cost to Build ${app.displayName} Like App in 2026`,
    description: app.description,
    datePublished: publishDate,
    dateModified: publishDate,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Projecto Calculator',
      url: 'https://projecto-calculator.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Projecto Calculator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://projecto-calculator.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://projecto-calculator.com/cost-to-build/${app.slug}`,
    },
    articleSection: 'App Development Cost',
    keywords: [
      `cost to build ${app.appName.toLowerCase()} like app`,
      `${app.appName.toLowerCase()} app development cost`,
      `how much to build ${app.appName.toLowerCase()} app`,
      `${app.appName.toLowerCase()} clone development cost`,
      `${app.category.toLowerCase()} app cost`,
    ].join(', '),
  };

  // ── FAQ structured data (for Google rich snippets) ────────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: app.faqs.map((faq: FaqItem) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // ── BreadcrumbList structured data ────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://projecto-calculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://projecto-calculator.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Cost to Build ${app.displayName} Like App`,
        item: `https://projecto-calculator.com/cost-to-build/${app.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-jira-background">
      {/* ── Structured Data Scripts ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Header ── */}
      <header className="bg-white border-b border-jira-border sticky top-0 z-50 shadow-jira">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-jira-blue rounded flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-jira-darkBlue">Projecto</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Home</Link>
              <Link href="/calculator" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Calculator</Link>
              <Link href="/blog" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Blog</Link>
              <Link href="/about" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Contact</Link>
            </div>
            <Link href="/calculator" className="md:hidden btn-primary text-sm px-3 py-1.5">
              Calculator
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Breadcrumbs ── */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 sm:pt-6">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-jira-textSecondary">
          <li><Link href="/" className="hover:text-jira-blue transition-colors">Home</Link></li>
          <li><span aria-hidden="true" className="mx-1">/</span></li>
          <li><Link href="/blog" className="hover:text-jira-blue transition-colors">Blog</Link></li>
          <li><span aria-hidden="true" className="mx-1">/</span></li>
          <li className="text-jira-darkBlue font-medium">Cost to Build {app.displayName} Like App</li>
        </ol>
      </nav>

      {/* ── Main Content ── */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="datePublished" content={publishDate} />
          <meta itemProp="dateModified" content={publishDate} />

          {/* ── Hero ── */}
          <header className="mb-10 sm:mb-14">
            <div className="inline-block px-3 py-1 bg-primary-50 text-jira-blue text-xs font-semibold rounded-full mb-4 border border-blue-200">
              {app.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-jira-darkBlue mb-4 leading-tight" itemProp="headline">
              Cost to Build {app.displayName} Like App in 2026
            </h1>
            <div className="flex items-center gap-4 text-sm text-jira-textSecondary mb-6">
              <span>By <strong className="text-jira-darkBlue">Projecto Team</strong></span>
              <span>·</span>
              <time dateTime={publishDate}>March 8, 2026</time>
              <span>·</span>
              <span>~15 min read</span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">Full Build Cost</p>
                <p className="text-base sm:text-lg font-bold text-jira-darkBlue leading-tight">
                  {formatCurrency(app.totalCostMin)}–<br className="sm:hidden" />{formatCurrency(app.totalCostMax)}
                </p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">MVP Cost</p>
                <p className="text-base sm:text-lg font-bold text-jira-success leading-tight">
                  {formatCurrency(app.mvpCostMin)}–<br className="sm:hidden" />{formatCurrency(app.mvpCostMax)}
                </p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">Timeline</p>
                <p className="text-base sm:text-lg font-bold text-jira-darkBlue">{app.totalTimeMin}–{app.totalTimeMax} months</p>
              </div>
              <div className="card text-center">
                <p className="text-xs font-semibold text-jira-textSecondary uppercase tracking-wide mb-1">Complexity</p>
                <p className={`text-base sm:text-lg font-bold ${app.complexityLevel === 'Very High' ? 'text-jira-error' : app.complexityLevel === 'High' ? 'text-jira-warning' : 'text-jira-blue'}`}>
                  {app.complexityLevel}
                </p>
              </div>
            </div>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-jira-textSecondary leading-relaxed" itemProp="description">
              {app.introText}
            </p>
          </header>

          {/* ── Table of Contents ── */}
          <nav aria-label="Table of contents" className="card mb-10 sm:mb-14 bg-gray-50">
            <h2 className="text-base font-semibold text-jira-darkBlue mb-3">In This Guide</h2>
            <ol className="space-y-1.5 text-sm text-jira-textSecondary list-decimal list-inside">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="hover:text-jira-blue transition-colors">{s.heading}</a>
                </li>
              ))}
              <li><a href="#key-features" className="hover:text-jira-blue transition-colors">Key Features of {app.displayName} Like App</a></li>
              <li><a href="#cost-breakdown" className="hover:text-jira-blue transition-colors">Development Cost Breakdown Table</a></li>
              <li><a href="#complexity" className="hover:text-jira-blue transition-colors">Development Complexity Factors</a></li>
              <li><a href="#timeline" className="hover:text-jira-blue transition-colors">Estimated Development Timeline</a></li>
              <li><a href="#mvp-vs-full" className="hover:text-jira-blue transition-colors">MVP vs Full Build</a></li>
              <li><a href="#faq" className="hover:text-jira-blue transition-colors">Frequently Asked Questions</a></li>
            </ol>
          </nav>

          {/* ── Rich Content Sections (first 2 before features) ── */}
          <div itemProp="articleBody">
            {sections.slice(0, 2).map((section, i) => (
              <section key={i} id={`section-${i}`} className="mb-10 sm:mb-14" aria-labelledby={`sh-${i}`}>
                <h2 id={`sh-${i}`} className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-jira-textSecondary leading-relaxed text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* ── Key Features ── */}
            <section id="key-features" className="mb-10 sm:mb-14" aria-labelledby="key-features-heading">
              <h2 id="key-features-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                Key Features of {app.displayName} Like App
              </h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                The following features are typically required for a production-ready {app.appName.toLowerCase()} like application. An MVP can be delivered with a focused subset of these; the remaining features are added in subsequent releases based on user feedback and business priorities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {app.keyFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 card">
                    <span className="flex-shrink-0 mt-0.5 w-6 h-6 bg-jira-success text-white rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">✓</span>
                    <span className="text-sm text-jira-text leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Rich Content Section 3 (tech stack) ── */}
            {sections[2] && (
              <section id="section-2" className="mb-10 sm:mb-14" aria-labelledby="sh-2">
                <h2 id="sh-2" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                  {sections[2].heading}
                </h2>
                <div className="space-y-4">
                  {sections[2].paragraphs.map((p, j) => (
                    <p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* ── Cost Breakdown Table ── */}
            <section id="cost-breakdown" className="mb-10 sm:mb-14" aria-labelledby="cost-breakdown-heading">
              <h2 id="cost-breakdown-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                Development Cost Breakdown
              </h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                The table below shows a detailed cost breakdown for building {app.displayName} like app from scratch. All figures are based on average market rates for development teams in North America and Western Europe ($40–$60/hr mid-market). Costs will vary by team location, seniority, and final feature scope. Use the{' '}
                <Link href="/calculator" className="text-jira-blue hover:underline font-medium">Projecto development cost calculator</Link>{' '}
                to model your specific configuration.
              </p>
              <div className="overflow-x-auto rounded border border-jira-border shadow-jira">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-jira-border">
                      <th scope="col" className="text-left px-4 py-3 font-semibold text-jira-darkBlue">Category</th>
                      <th scope="col" className="text-left px-4 py-3 font-semibold text-jira-darkBlue hidden sm:table-cell">Description</th>
                      <th scope="col" className="text-right px-4 py-3 font-semibold text-jira-darkBlue">Hours</th>
                      <th scope="col" className="text-right px-4 py-3 font-semibold text-jira-darkBlue">Cost Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.costBreakdown.map((item: CostBreakdownItem, i: number) => (
                      <tr key={i} className={`border-b border-jira-border ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 font-medium text-jira-text">{item.category}</td>
                        <td className="px-4 py-3 text-jira-textSecondary hidden sm:table-cell">{item.description}</td>
                        <td className="px-4 py-3 text-right text-jira-text whitespace-nowrap">{item.hoursMin}–{item.hoursMax}</td>
                        <td className="px-4 py-3 text-right font-medium text-jira-darkBlue whitespace-nowrap">
                          {formatCurrency(item.costMin)} – {formatCurrency(item.costMax)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-jira-darkBlue text-white font-semibold">
                      <td className="px-4 py-3 sm:hidden">Total</td>
                      <td className="px-4 py-3 hidden sm:table-cell" colSpan={2}>Total Estimated Cost</td>
                      <td className="px-4 py-3 text-right text-sm hidden sm:table-cell">
                        {app.costBreakdown.reduce((s: number, i: CostBreakdownItem) => s + i.hoursMin, 0)}–
                        {app.costBreakdown.reduce((s: number, i: CostBreakdownItem) => s + i.hoursMax, 0)} hrs
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {formatCurrency(app.totalCostMin)} – {formatCurrency(app.totalCostMax)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-jira-textSecondary mt-3">
                * Estimates are indicative ranges based on typical project scope. Actual costs depend on team location, seniority, and final feature set.
              </p>
            </section>

            {/* ── Rich Content Section 4 (cost reduction) ── */}
            {sections[3] && (
              <section id="section-3" className="mb-10 sm:mb-14" aria-labelledby="sh-3">
                <h2 id="sh-3" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                  {sections[3].heading}
                </h2>
                <div className="space-y-4">
                  {sections[3].paragraphs.map((p, j) => (
                    <p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* ── Development Complexity ── */}
            <section id="complexity" className="mb-10 sm:mb-14" aria-labelledby="complexity-heading">
              <h2 id="complexity-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                What Makes Building {app.displayName} Like App Complex?
              </h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                Building {app.displayName} like app is rated as <strong className="text-jira-darkBlue">{app.complexityLevel} complexity</strong>.
                These are the primary technical and business challenges that drive development effort, cost, and timeline:
              </p>
              <div className="space-y-3">
                {app.complexityFactors.map((factor: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3 card">
                    <span className="flex-shrink-0 mt-1 w-7 h-7 bg-jira-warning text-white rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">
                      {i + 1}
                    </span>
                    <p className="text-sm text-jira-text leading-relaxed">{factor}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Estimated Timeline ── */}
            <section id="timeline" className="mb-10 sm:mb-14" aria-labelledby="timeline-heading">
              <h2 id="timeline-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                Estimated Development Timeline
              </h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                A full build of {app.displayName} like app typically takes <strong className="text-jira-darkBlue">{app.totalTimeMin}–{app.totalTimeMax} months</strong>.
                An MVP version focused on core functionality can be delivered in <strong className="text-jira-darkBlue">{app.mvpTimeMin}–{app.mvpTimeMax} months</strong>.
                Below is a typical phase-by-phase development schedule:
              </p>
              <div className="space-y-4">
                {app.timeline.map((phase: TimelinePhase, i: number) => (
                  <div key={i} className="card flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold text-sm shadow-jira" aria-hidden="true">
                      {i + 1}
                    </div>
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

            {/* ── MVP vs Full Build ── */}
            <section id="mvp-vs-full" className="mb-10 sm:mb-14" aria-labelledby="mvp-heading">
              <h2 id="mvp-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                MVP vs Full Build: Which Approach Is Right?
              </h2>
              <p className="text-jira-textSecondary mb-6 leading-relaxed">
                For most founders, starting with an MVP is the right strategic decision. An MVP validates whether users actually want the product before committing to the full development budget — reducing financial risk and enabling faster learning. Here is how the two approaches compare for building {app.displayName} like app:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card border-l-4 border-l-jira-success">
                  <h3 className="text-lg font-semibold text-jira-darkBlue mb-3">🚀 MVP (Minimum Viable Product)</h3>
                  <ul className="space-y-2 text-sm text-jira-textSecondary">
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span><strong>Cost:</strong> {formatCurrency(app.mvpCostMin)} – {formatCurrency(app.mvpCostMax)}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span><strong>Timeline:</strong> {app.mvpTimeMin}–{app.mvpTimeMax} months</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>Core features only — faster time to market</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>Validate product-market fit before full investment</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>Iterate based on real user feedback</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-success font-bold mt-0.5">•</span><span>Ideal for early-stage startups and first-time founders</span></li>
                  </ul>
                </div>
                <div className="card border-l-4 border-l-jira-blue">
                  <h3 className="text-lg font-semibold text-jira-darkBlue mb-3">🏗️ Full Product Build</h3>
                  <ul className="space-y-2 text-sm text-jira-textSecondary">
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span><strong>Cost:</strong> {formatCurrency(app.totalCostMin)} – {formatCurrency(app.totalCostMax)}</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span><strong>Timeline:</strong> {app.totalTimeMin}–{app.totalTimeMax} months</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>Complete feature set with advanced capabilities</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>Production-ready with scalable architecture</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>Comprehensive testing and security implementation</span></li>
                    <li className="flex items-start space-x-2"><span className="text-jira-blue font-bold mt-0.5">•</span><span>Best for funded startups with validated demand</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Rich Content Section 5 (monetization) ── */}
            {sections[4] && (
              <section id="section-4" className="mb-10 sm:mb-14" aria-labelledby="sh-4">
                <h2 id="sh-4" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-5">
                  {sections[4].heading}
                </h2>
                <div className="space-y-4">
                  {sections[4].paragraphs.map((p, j) => (
                    <p key={j} className="text-jira-textSecondary leading-relaxed text-base">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* ── CTA ── */}
            <section className="mb-10 sm:mb-14 bg-gradient-to-r from-jira-blue to-primary-600 rounded-lg p-8 sm:p-10 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get a Custom Estimate for Your {app.appName}-Like Project
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
                Configure your team, feature set, design complexity, and tech stack in our free calculator — and get a detailed cost and timeline estimate tailored to your specific project in under 5 minutes.
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center space-x-2 bg-white text-jira-blue px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors shadow-jira-md"
              >
                <span>Use the Free Calculator</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="mb-10 sm:mb-14" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">
                Frequently Asked Questions
              </h2>
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

            {/* ── Internal Links / Related Blog Posts ── */}
            <section className="mb-10 sm:mb-14" aria-labelledby="related-blog-heading">
              <h2 id="related-blog-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">
                Related Development Cost Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/blog/software-development-cost" className="card hover:shadow-jira-md transition-all duration-150 group">
                  <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1">Guide</p>
                  <h3 className="text-base font-semibold text-jira-darkBlue group-hover:text-jira-blue transition-colors">Software Development Cost Explained</h3>
                  <p className="text-sm text-jira-textSecondary mt-1">What drives pricing from team roles to tech stack.</p>
                </Link>
                <Link href="/blog/estimate-software-development-cost" className="card hover:shadow-jira-md transition-all duration-150 group">
                  <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1">Guide</p>
                  <h3 className="text-base font-semibold text-jira-darkBlue group-hover:text-jira-blue transition-colors">How to Estimate Development Cost Accurately</h3>
                  <p className="text-sm text-jira-textSecondary mt-1">Step-by-step process covering scope, roles, and buffers.</p>
                </Link>
                <Link href="/blog/app-cost-calculator" className="card hover:shadow-jira-md transition-all duration-150 group">
                  <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1">Guide</p>
                  <h3 className="text-base font-semibold text-jira-darkBlue group-hover:text-jira-blue transition-colors">App Cost Calculator: How Accurate Are They?</h3>
                  <p className="text-sm text-jira-textSecondary mt-1">How calculators work and how to use them correctly.</p>
                </Link>
                <Link href="/blog/project-cost-calculation" className="card hover:shadow-jira-md transition-all duration-150 group">
                  <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1">Guide</p>
                  <h3 className="text-base font-semibold text-jira-darkBlue group-hover:text-jira-blue transition-colors">How to Calculate Project Cost: Complete Guide</h3>
                  <p className="text-sm text-jira-textSecondary mt-1">Realistic estimation methodology for software projects.</p>
                </Link>
              </div>
            </section>

            {/* ── Related App Estimates ── */}
            <section className="mb-10 sm:mb-14" aria-labelledby="related-apps-heading">
              <h2 id="related-apps-heading" className="text-2xl sm:text-3xl font-bold text-jira-darkBlue mb-6">
                More App Cost Estimates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {appEstimates
                  .filter((a: AppEstimate) => a.slug !== app.slug)
                  .map((a: AppEstimate) => (
                    <Link
                      key={a.slug}
                      href={`/cost-to-build/${a.slug}`}
                      className="card hover:shadow-jira-md transition-all duration-150 group"
                    >
                      <p className="text-xs font-semibold text-jira-blue uppercase tracking-wide mb-1 truncate">{a.category}</p>
                      <h3 className="text-sm font-semibold text-jira-darkBlue mb-2 group-hover:text-jira-blue transition-colors leading-snug">
                        Cost to Build {a.displayName} Like App
                      </h3>
                      <p className="text-sm font-medium text-jira-textSecondary">
                        {formatCurrency(a.totalCostMin)} – {formatCurrency(a.totalCostMax)}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>

          </div>{/* end articleBody */}
        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-jira-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </div>
                <span className="text-2xl font-bold text-jira-darkBlue">Projecto</span>
              </div>
              <p className="text-sm text-jira-textSecondary leading-relaxed max-w-xs">
                Professional software project cost estimation and planning tool.
              </p>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Home</Link></li>
                <li><Link href="/calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Calculator</Link></li>
                <li><Link href="/blog" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Contact</Link></li>
                <li><Link href="/about" className="text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/blog/privacy-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Privacy Policy</Link></li>
                <li><Link href="/blog/terms-of-service" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookie-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Cost Estimates</h3>
              <ul className="space-y-3 text-sm">
                {appEstimates.slice(0, 6).map((a: AppEstimate) => (
                  <li key={a.slug}>
                    <Link href={`/cost-to-build/${a.slug}`} className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      {a.appName} App Cost
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-jira-border pt-6 mb-6">
            <p className="text-xs text-jira-textSecondary leading-relaxed max-w-4xl">
              <strong className="text-jira-darkBlue">Disclaimer:</strong> All cost and timeline estimates on this page are indicative ranges based on typical market rates and project scope. They should not be interpreted as fixed quotes or contractual offers. Actual costs depend on team location, seniority, final feature scope, and project management approach.
            </p>
          </div>

          <div className="border-t border-jira-border my-6"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-jira-textSecondary gap-3 sm:gap-0">
            <p>© 2025 Projecto. All rights reserved.</p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="/blog/privacy-policy" className="hover:text-jira-blue transition-colors">Privacy</Link>
              <span className="text-jira-border" aria-hidden="true">•</span>
              <Link href="/blog/terms-of-service" className="hover:text-jira-blue transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
