import type { Metadata } from 'next';
import Link from 'next/link';
import * as Fi from 'react-icons/fi';
import { SiFacebook, SiInstagram, SiThreads, SiYoutube } from 'react-icons/si';
import OpenSourceCta from '@/components/OpenSourceCta';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

export const metadata: Metadata = {
  title: `Projecto Calculator — Software Development Cost Calculator`,
  description:
    'Estimate software development costs for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects. Calculate budget, timeline, and team requirements in minutes.',
  alternates: { canonical: SITE },
  openGraph: {
      images: ['/og-image.png'],
    title: 'Projecto Calculator — Software Development Cost Calculator',
    description:
      'Estimate software development cost, timeline, and team for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects.',
    url: SITE,
    siteName: BRAND,
    type: 'website',
  },
  twitter: {
      images: ['/og-image.png'],
    card: 'summary_large_image',
    title: 'Projecto Calculator — Software Development Cost Calculator',
    description:
      'Estimate software development cost, timeline, and team for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-jira-background">
      <header className="bg-white border-b border-jira-border sticky top-0 z-50 shadow-jira">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-jira-blue rounded flex items-center justify-center">
                <Fi.FiGrid className="text-xl sm:text-2xl text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-jira-darkBlue">Projecto</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">
                Contact
              </Link>
            </div>
            <Link href="/calculator" className="md:hidden btn-primary text-sm px-3 py-1.5">
              Start
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
      
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-jira-darkBlue mb-4 sm:mb-6 leading-tight px-2">
            <span className="relative inline-block">
              <span className="relative !z-20">
                Calculate Your Project Cost
              </span>
              <svg 
                className="absolute -bottom-1 left-0 w-full h-7 pointer-events-none overflow-visible"
                viewBox="0 0 600 40" 
                preserveAspectRatio="none"
                style={{ zIndex: 1 }}
              >
                <path
                  d="M 0 28 Q 50 12, 100 32 Q 150 15, 200 28 Q 250 18, 300 30 Q 350 16, 400 28 Q 450 20, 500 30 Q 550 18, 600 26"
                  stroke="#FFEB3B"
                  strokeWidth="21"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="1"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  className="marker-path"
                />
              </svg>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-jira-textSecondary mb-8 sm:mb-12 leading-relaxed px-2">
            Professional calculator for estimating time and budget for web and mobile app development
          </p>
          
          <Link href="/calculator" className="btn-primary text-base sm:text-lg inline-flex items-center space-x-2 px-6 py-3">
            <span>Start Calculation</span>
            <Fi.FiArrowRight className="text-lg sm:text-xl" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto">
          <div className="card text-center hover:shadow-jira-md transition-all duration-150">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4 border border-jira-border">
              <Fi.FiDollarSign className="text-3xl text-jira-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">Accurate Calculations</h3>
            <p className="text-jira-textSecondary text-sm">
              Detailed cost estimation based on real rates and project complexity
            </p>
          </div>

          <div className="card text-center hover:shadow-jira-md transition-all duration-150">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4 border border-jira-border">
              <Fi.FiClock className="text-3xl text-jira-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">Time Estimation</h3>
            <p className="text-jira-textSecondary text-sm">
              Realistic development timelines considering all project stages
            </p>
          </div>

          <div className="card text-center hover:shadow-jira-md transition-all duration-150">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4 border border-jira-border">
              <Fi.FiCheckCircle className="text-3xl text-jira-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">Detailed Breakdown</h3>
            <p className="text-jira-textSecondary text-sm">
              Complete cost breakdown by roles, features, and development stages
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-jira-darkBlue px-2">How It Works?</h2>
          
          <div className="space-y-4">
            <div className="card flex items-start space-x-4 hover:shadow-jira-md transition-all duration-150">
              <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold shadow-jira">
                <Fi.FiUsers className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-jira-darkBlue">Build Your Team</h3>
                <p className="text-jira-textSecondary text-sm">
                  Select roles, levels, and specify hourly rates for your team
                </p>
              </div>
            </div>

            <div className="card flex items-start space-x-4 hover:shadow-jira-md transition-all duration-150">
              <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold shadow-jira">
                <Fi.FiLayers className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-jira-darkBlue">Configure Design</h3>
                <p className="text-jira-textSecondary text-sm">
                  Choose design complexity, number of screens, and additional services
                </p>
              </div>
            </div>

            <div className="card flex items-start space-x-4 hover:shadow-jira-md transition-all duration-150">
              <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold shadow-jira">
                <Fi.FiTarget className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-jira-darkBlue">Select Features</h3>
                <p className="text-jira-textSecondary text-sm">
                  Add required features with realistic development time estimates
                </p>
              </div>
            </div>

            <div className="card flex items-start space-x-4 hover:shadow-jira-md transition-all duration-150">
              <div className="flex-shrink-0 w-10 h-10 bg-jira-blue text-white rounded flex items-center justify-center font-bold shadow-jira">
                <Fi.FiFileText className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-jira-darkBlue">Get Results</h3>
                <p className="text-jira-textSecondary text-sm">
                  View detailed breakdown with PDF export option
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-jira-darkBlue px-2">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                How accurate are the estimates?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                Projecto estimates are based on role-based effort benchmarks and typical development workloads. They provide a realistic planning range, but final cost and delivery time may vary depending on scope, requirements, technical choices, and execution.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                Is this a fixed price quote?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                No. The results are not a quote and are not binding. They are intended to support early planning and budgeting, not to serve as a contractual offer.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                What types of projects does Projecto support?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed mb-2">
                Projecto is suitable for:
              </p>
              <ul className="list-disc list-inside text-jira-textSecondary text-sm space-y-1 ml-4">
                <li>Web applications</li>
                <li>Mobile apps (iOS and Android)</li>
                <li>MVPs and early-stage products</li>
                <li>Internal tools and dashboards</li>
                <li>SaaS platforms</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                Can I use this for client proposals?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                Yes. Many agencies and freelancers use Projecto for early estimates and internal planning. For client-facing proposals, we recommend validating the output with detailed scoping before finalizing price and timeline.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                Do you store my project data?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                Projecto does not require you to submit sensitive project data. Calculator inputs are used only to generate estimates and improve the experience. If you contact us directly, your contact details are used solely to respond to your inquiry.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                Will the calculator improve over time?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                Yes. Projecto is continuously refined using updated benchmarks, industry trends, and feedback to improve accuracy and usability.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">
                How are the estimates calculated?
              </h3>
              <p className="text-jira-textSecondary text-sm leading-relaxed">
                Projecto uses role-based effort modeling combined with feature-level complexity scoring and design scope inputs. Total effort is converted into cost using role-specific rates and the selected team composition. Planning buffers are applied to reflect real-world delivery, and results are presented as ranges rather than fixed numbers.
              </p>
            </div>
          </div>
        </div>

        <OpenSourceCta />
      </main>

      <footer className="bg-white border-t border-jira-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
                  <Fi.FiGrid className="text-2xl text-white" />
                </div>
                <span className="text-2xl font-bold text-jira-darkBlue">Projecto</span>
              </div>
              <p className="text-sm text-jira-textSecondary leading-relaxed max-w-xs mb-4">
                Professional software project cost estimation and planning tool.
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.facebook.com/people/Projecto-Calculator/61586748986123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="text-xl" />
                </a>
                <a
                  href="https://www.instagram.com/projecto_calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="text-xl" />
                </a>
                <a
                  href="https://www.threads.com/@projecto_calculator?igshid=NTc4MTIwNjQ2YQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Threads"
                >
                  <SiThreads className="text-xl" />
                </a>
                <a
                  href="https://www.youtube.com/@projecto_calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="YouTube"
                >
                  <SiYoutube className="text-xl" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Contact
                  </Link>
                </li>
                <li><Link href="/about" className="text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/blog/privacy-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/blog/terms-of-service" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li><Link href="/cookie-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Cost Estimation Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3">
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/cost-to-build/uber-like-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Uber App Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/cost-to-build/airbnb-like-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Airbnb App Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/cost-to-build/instagram-like-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Instagram App Cost
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/cost-to-build/tiktok-like-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      TikTok App Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/cost-to-build/marketplace-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Marketplace App Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/cost-to-build/ai-app" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      AI App Cost
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-jira-border pt-6 mb-6">
            <p className="text-xs text-jira-textSecondary leading-relaxed max-w-4xl">
              <strong className="text-jira-darkBlue">Disclaimer:</strong> Projecto provides high-level estimates for web and mobile application development based on typical industry practices, average market rates, and the inputs you provide. All calculations are indicative only and should not be interpreted as fixed quotes, contractual offers, or professional advice. Actual project cost and delivery time may vary depending on: scope changes; technical complexity; team structure and experience; third-party services and integrations; project management and execution approach. Projecto is designed to support early planning, budgeting, and decision-making, not to replace detailed technical scoping or formal proposals. Use of this calculator is at your own discretion.
            </p>
          </div>

          <div className="border-t border-jira-border my-8"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-jira-textSecondary gap-3 sm:gap-0">
            <div>
              <p>© 2025 Projecto. All rights reserved.</p>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="/blog/privacy-policy" className="hover:text-jira-blue transition-colors">
                Privacy
              </Link>
              <span className="text-jira-border">•</span>
              <Link href="/blog/terms-of-service" className="hover:text-jira-blue transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How accurate are the estimates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Projecto estimates are based on role-based effort benchmarks and typical development workloads. They provide a realistic planning range, but final cost and delivery time can vary depending on scope, requirements, technical choices, and execution."
                }
              },
              {
                "@type": "Question",
                "name": "Is this a fixed price quote?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The results are not a quote and are not binding. They are intended to support early planning and budgeting, not to serve as a contractual offer."
                }
              },
              {
                "@type": "Question",
                "name": "What types of projects does Projecto support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Projecto is suitable for web applications, mobile apps (iOS and Android), MVPs, internal tools and dashboards, and SaaS platforms."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for client proposals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Many agencies and freelancers use Projecto for early estimates and internal planning. For client proposals, it's recommended to validate the output with detailed scoping before finalizing a price and timeline."
                }
              },
              {
                "@type": "Question",
                "name": "Do you store my project data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Projecto does not require you to submit sensitive project data. Calculator inputs are used to generate estimates and improve the experience. If you contact us directly, we only use your contact details to respond."
                }
              },
              {
                "@type": "Question",
                "name": "Will the calculator improve over time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Projecto is continuously refined using updated benchmarks, industry trends, and feedback to improve accuracy and usability."
                }
              },
              {
                "@type": "Question",
                "name": "How are the estimates calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Projecto uses role-based effort modeling combined with feature complexity scoring and design scope inputs. Total effort is converted into cost using role-specific rates and team composition, with planning buffers applied to reflect real-world delivery. Results are presented as ranges rather than fixed numbers."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}

