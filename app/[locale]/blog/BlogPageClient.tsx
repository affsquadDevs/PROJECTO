'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import * as Fi from 'react-icons/fi';
import { articles } from '@/data/articles';
import { SiFacebook, SiInstagram, SiThreads, SiYoutube } from 'react-icons/si';

const ARTICLES_PER_PAGE = 10;

// Parse date from DD/MM/YYYY format
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Sort articles by date (newest first)
const sortedArticles = [...articles].sort((a, b) => {
  const dateA = parseDate(a.date);
  const dateB = parseDate(b.date);
  return dateB.getTime() - dateA.getTime(); // Newest first
});

function BlogContent() {
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
  
  // Validate page number
  const currentPage = pageParam < 1 ? 1 : pageParam > totalPages ? totalPages : pageParam;

  const { paginatedArticles } = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const paginatedArticles = sortedArticles.slice(startIndex, endIndex);

    return { paginatedArticles };
  }, [currentPage]);

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return '/blog';
    }
    return `/blog?page=${page}`;
  };

  return (
    <>
      <div className="space-y-6">
        {paginatedArticles.map((article) => {
          const articleUrl = article.isCostEstimate 
            ? `/cost-to-build/${article.slug}`
            : `/blog/${article.slug}`;
          
          return (
          <Link 
            key={article.slug}
            href={articleUrl}
            className="card block p-6 hover:shadow-jira-md transition-all duration-150"
          >
            {article.heroImage && (
              <div className="mb-6 -mx-6 -mt-6">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 sm:h-80 object-contain bg-gradient-to-br from-purple-50 to-blue-50 rounded-t-lg"
                />
              </div>
            )}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {article.isCostEstimate && (
                    <span className="inline-block px-2 py-0.5 bg-jira-success text-white text-xs font-semibold rounded">
                      Cost Estimate
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-jira-darkBlue hover:text-jira-blue transition-colors">
                  {article.title}
                </h2>
              </div>
              <span className="text-sm text-jira-textSecondary whitespace-nowrap ml-4">
                {article.date}
              </span>
            </div>
            <p className="text-jira-textSecondary leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-4 inline-flex items-center text-jira-blue hover:underline">
              <span className="text-sm font-medium">Read more</span>
              <Fi.FiArrowRight className="ml-2" />
            </div>
          </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-jira-textSecondary">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            {currentPage > 1 ? (
              <Link
                href={getPageUrl(currentPage - 1)}
                className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue transition-colors flex items-center gap-2"
              >
                <Fi.FiChevronLeft className="text-lg" />
                <span>Previous</span>
              </Link>
            ) : (
              <div className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary opacity-50 cursor-not-allowed flex items-center gap-2">
                <Fi.FiChevronLeft className="text-lg" />
                <span>Previous</span>
              </div>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-jira-textSecondary">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`px-4 py-2 border border-jira-border rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-jira-blue text-white border-jira-blue'
                        : 'text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue'
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
              <Link
                href={getPageUrl(currentPage + 1)}
                className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary hover:bg-jira-background hover:text-jira-blue transition-colors flex items-center gap-2"
              >
                <span>Next</span>
                <Fi.FiChevronRight className="text-lg" />
              </Link>
            ) : (
              <div className="px-4 py-2 border border-jira-border rounded-lg text-jira-textSecondary opacity-50 cursor-not-allowed flex items-center gap-2">
                <span>Next</span>
                <Fi.FiChevronRight className="text-lg" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function BlogPageClient() {
  return (
    <div className="min-h-screen bg-jira-background">
      {/* Header */}
      <header className="bg-white border-b border-jira-border sticky top-0 z-50 shadow-jira">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
                <Fi.FiGrid className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold text-jira-darkBlue">Projecto</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-sm font-medium text-jira-blue">
                Blog
              </Link>
              <Link href="/about" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-jira-darkBlue mb-8">Blog</h1>
        
        <Suspense fallback={
          <div className="space-y-6">
            {sortedArticles.slice(0, ARTICLES_PER_PAGE).map((article) => (
              <div key={article.slug} className="card block p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        }>
          <BlogContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-jira-border mt-20">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand Section */}
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

            {/* Navigation Columns */}
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
                    <Link href="/blog/project-cost-calculation" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Project Cost Calculation
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/software-development-cost" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Software Development Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/cost-for-application-development" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Application Development Cost
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/blog/estimate-software-development-cost" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Estimate Development Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/app-cost-calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      App Cost Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/website-cost-calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Website Cost Calculator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-jira-border my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-jira-textSecondary">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Projecto. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
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
    </div>
  );
}
