import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

const STACK = [
  'Next.js 14',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Zustand',
  'jsPDF',
  'React Icons',
];

export default function OpenSourceCta() {
  return (
    <section
      aria-labelledby="open-source-heading"
      className="mt-16 sm:mt-20 max-w-5xl mx-auto w-full"
    >
      <div className="card p-6 sm:p-8 shadow-jira-md hover:shadow-jira-md transition-all duration-150 border border-jira-border">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8">
          <div className="flex-shrink-0">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg border border-jira-border bg-primary-50 text-jira-blue shadow-jira">
              <SiGithub className="h-8 w-8" aria-hidden />
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-5">
            <div>
              <h2
                id="open-source-heading"
                className="text-2xl sm:text-3xl font-bold text-jira-darkBlue tracking-tight"
              >
                100% Open Source &amp; Free Forever
              </h2>
              <p className="mt-3 text-jira-textSecondary text-sm sm:text-base leading-relaxed max-w-3xl">
                Projecto (open-source repo{' '}
                <span className="text-jira-darkBlue font-semibold">Planify-Dev</span>) is published under the{' '}
                <strong className="text-jira-darkBlue">MIT License</strong>. It is built with Next.js, TypeScript,
                React, Tailwind CSS, Zustand, and jsPDF. View the code, open an issue, improve docs, or fork it for
                your own projects —{' '}
                <Link
                  href="/blog/open-source-projekto-calculator"
                  className="text-jira-blue font-medium hover:underline underline-offset-2"
                >
                  read why we ship it as open source
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a
                href="https://github.com/StanislavHomych/Planify-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm sm:text-base inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded"
              >
                <SiGithub className="h-4 w-4 shrink-0" aria-hidden />
                View on GitHub
              </a>
              <a
                href="https://github.com/StanislavHomych/Planify-Dev/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm sm:text-base inline-flex items-center justify-center px-5 py-2.5 rounded"
              >
                Report Issue
              </a>
              <a
                href="https://github.com/StanislavHomych/Planify-Dev/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm sm:text-base inline-flex items-center justify-center px-5 py-2.5 rounded"
              >
                Documentation
              </a>
            </div>

            <div className="pt-4 border-t border-jira-border">
              <p className="label mb-3">Built with</p>
              <ul className="flex flex-wrap gap-2">
                {STACK.map((tag) => (
                  <li key={tag}>
                    <span className="inline-block rounded border border-jira-border bg-jira-background px-3 py-1 text-xs font-medium text-jira-textSecondary">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
