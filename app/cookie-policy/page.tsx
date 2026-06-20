import type { Metadata } from 'next';
import Link from 'next/link';
import * as Fi from 'react-icons/fi';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

export const metadata: Metadata = {
  title: `Cookie Policy | ${BRAND}`,
  description:
    'How Projecto Calculator uses cookies and similar technologies, including Google AdSense advertising cookies, and how you can control your preferences.',
  alternates: { canonical: `${SITE}/cookie-policy` },
  openGraph: {
    title: `Cookie Policy | ${BRAND}`,
    description:
      'How Projecto Calculator uses cookies, including Google AdSense advertising cookies, and how to manage them.',
    url: `${SITE}/cookie-policy`,
    siteName: BRAND,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Cookie Policy | ${BRAND}`,
    description: 'How Projecto Calculator uses cookies and how to manage them.',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-jira-background">
      <header className="bg-white border-b border-jira-border sticky top-0 z-50 shadow-jira">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
                <Fi.FiGrid className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold text-jira-darkBlue">Projecto</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link>
              <Link href="/blog" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-2">Cookie Policy</h1>
          <p className="text-sm text-jira-textSecondary mb-6">Last updated: June 2026</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-jira-textSecondary leading-relaxed mb-6">
              This Cookie Policy explains how Projecto Calculator (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) uses cookies and similar technologies when you visit{' '}
              <span className="font-medium text-jira-darkBlue">projecto-calculator.com</span>. It
              should be read together with our{' '}
              <Link href="/blog/privacy-policy" className="text-jira-blue hover:underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">1. What Are Cookies?</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-6">
              Cookies are small text files placed on your device when you visit a website. They are
              widely used to make websites work, to improve performance, and to provide information
              to the site owners and, in some cases, to advertising partners.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">2. Types of Cookies We Use</h2>
            <ul className="list-disc list-inside text-jira-textSecondary mb-6 space-y-2 ml-4">
              <li><strong>Essential cookies</strong> — required for core site functionality and to remember your cookie preferences.</li>
              <li><strong>Analytics cookies</strong> — help us understand how visitors use the site (via Google Analytics / Google Tag Manager) so we can improve it.</li>
              <li><strong>Advertising cookies</strong> — set by Google AdSense and its partners to serve and measure ads, and (with consent) to personalize them.</li>
            </ul>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">3. Google AdSense &amp; Third-Party Advertising</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              We use Google AdSense to display advertising. Third-party vendors, including Google,
              use cookies to serve ads based on your prior visits to this and other websites.
            </p>
            <ul className="list-disc list-inside text-jira-textSecondary mb-4 space-y-2 ml-4">
              <li>Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet.</li>
              <li>Google uses the <strong>DoubleClick / DART cookie</strong> and similar identifiers to do this.</li>
              <li>You may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-jira-blue hover:underline">Google Ads Settings</a>.
              </li>
              <li>You can opt out of third-party vendor cookies for personalized advertising at{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-jira-blue hover:underline">aboutads.info/choices</a>{' '}
                and{' '}
                <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-jira-blue hover:underline">youronlinechoices.eu</a>.
              </li>
              <li>Learn more in Google&rsquo;s{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-jira-blue hover:underline">How Google uses information from sites that use its services</a>.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">4. Your Consent &amp; Choices</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              When you first visit the site, a consent banner lets you accept or reject
              non-essential (analytics and advertising) cookies. We apply Google Consent Mode and
              default advertising and analytics storage to <em>denied</em> until you opt in. For
              visitors in the EEA, UK, and Switzerland, personalized ads are only enabled with your
              consent.
            </p>
            <p className="text-jira-textSecondary leading-relaxed mb-6">
              You can also control or delete cookies through your browser settings at any time.
              Blocking some cookies may affect how the site functions.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">5. Updates to This Policy</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-6">
              We may update this Cookie Policy to reflect changes in technology, law, or our
              practices. The &ldquo;last updated&rdquo; date above indicates the latest revision.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">6. Contact</h2>
            <p className="text-jira-textSecondary leading-relaxed">
              Questions about this policy? Email{' '}
              <a href="mailto:hello@affsquad.com" className="text-jira-blue hover:underline">hello@affsquad.com</a>.
            </p>
          </div>
        </article>
      </main>

      <footer className="bg-white border-t border-jira-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-jira-textSecondary gap-3">
            <p>© 2025 Projecto Calculator. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="/about" className="hover:text-jira-blue transition-colors">About</Link>
              <Link href="/contact" className="hover:text-jira-blue transition-colors">Contact</Link>
              <Link href="/blog/privacy-policy" className="hover:text-jira-blue transition-colors">Privacy</Link>
              <Link href="/blog/terms-of-service" className="hover:text-jira-blue transition-colors">Terms</Link>
              <Link href="/cookie-policy" className="hover:text-jira-blue transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
