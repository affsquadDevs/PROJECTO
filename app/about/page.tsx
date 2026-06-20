import type { Metadata } from 'next';
import Link from 'next/link';
import * as Fi from 'react-icons/fi';
import { SiFacebook, SiInstagram, SiThreads, SiYoutube } from 'react-icons/si';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

export const metadata: Metadata = {
  title: `About Us | ${BRAND}`,
  description:
    'Projecto Calculator is an independent software project estimation tool that helps founders, agencies, and product teams estimate development cost, timeline, and team composition.',
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: `About Us | ${BRAND}`,
    description:
      'Learn about Projecto Calculator — an independent software development cost estimation platform.',
    url: `${SITE}/about`,
    siteName: BRAND,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About Us | ${BRAND}`,
    description:
      'Learn about Projecto Calculator — an independent software development cost estimation platform.',
  },
};

export default function AboutPage() {
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
              <Link href="/about" className="text-sm font-medium text-jira-blue">About</Link>
              <Link href="/blog" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8">
          <h1 className="text-4xl font-bold text-jira-darkBlue mb-6">About Projecto Calculator</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Projecto Calculator is an independent online service designed to help teams and
              businesses estimate software projects more clearly and efficiently. It turns a few
              structured inputs — team composition, design scope, feature set, technology stack,
              and quality assurance — into a realistic cost and timeline range.
            </p>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Modern digital products require accurate planning, clear scope definition, and
              transparency around technology choices and team composition. While many estimates are
              created manually or scattered across documents, Projecto Calculator provides a
              structured way to define project scope, technology stack, team roles, timelines, and
              cost estimates in one place.
            </p>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              The platform allows users to create and manage project estimates based on their own
              inputs. We focus on clarity, structure, and consistency — helping users turn ideas
              into well-defined project plans that are easy to review, share, and refine.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">How We Estimate</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Estimates combine role-based effort benchmarks with feature-level complexity scoring
              and design scope. Total effort is converted into cost using role-specific rates and
              the selected team composition, with planning buffers applied to reflect real-world
              delivery. Results are presented as ranges rather than fixed numbers, because real
              projects vary by scope clarity, integrations, compliance requirements, and execution.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">What We Are Not</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Projecto Calculator does not provide development, hiring, or project management
              services. The website exists solely as an estimation and planning tool that helps
              users organize project-related information at their request. It is an independent
              product and is not affiliated with any software vendors, development agencies, or
              third-party platforms.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">Who It Is For</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Founders, startup teams, product managers, agencies, CTOs, and software buyers who
              need a clear, well-organized starting point for budgeting and early planning.
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">Open Source</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Projecto Calculator is built with Next.js, TypeScript, React, Tailwind CSS, Zustand,
              and jsPDF, and is published under the MIT License. You can read more about our
              approach on the{' '}
              <Link href="/blog/open-source-projekto-calculator" className="text-jira-blue hover:underline">
                open-source page
              </Link>
              .
            </p>

            <h2 className="text-2xl font-bold text-jira-darkBlue mb-4 mt-8">Contact</h2>
            <p className="text-jira-textSecondary leading-relaxed mb-4">
              Questions or feedback? Visit our{' '}
              <Link href="/contact" className="text-jira-blue hover:underline">contact page</Link>{' '}
              or email{' '}
              <a href="mailto:hello@affsquad.com" className="text-jira-blue hover:underline">
                hello@affsquad.com
              </a>
              .
            </p>
          </div>
        </article>
      </main>

      <footer className="bg-white border-t border-jira-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-jira-blue rounded flex items-center justify-center">
                <Fi.FiGrid className="text-xl text-white" />
              </div>
              <span className="text-lg font-bold text-jira-darkBlue">Projecto Calculator</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/people/Projecto-Calculator/61586748986123/" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Facebook"><SiFacebook className="text-xl" /></a>
              <a href="https://www.instagram.com/projecto_calculator/" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Instagram"><SiInstagram className="text-xl" /></a>
              <a href="https://www.threads.com/@projecto_calculator" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Threads"><SiThreads className="text-xl" /></a>
              <a href="https://www.youtube.com/@projecto_calculator" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="YouTube"><SiYoutube className="text-xl" /></a>
            </div>
          </div>
          <div className="border-t border-jira-border my-8"></div>
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
