'use client';

import { useTranslations } from 'next-intl';
import * as Fi from 'react-icons/fi';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

type NavKey = 'home' | 'calculator' | 'blog' | 'about' | 'contact';

export default function SiteHeader({ active }: { active?: NavKey }) {
  const t = useTranslations('nav');

  const items: { key: NavKey; href: string }[] = [
    { key: 'home', href: '/' },
    { key: 'calculator', href: '/calculator' },
    { key: 'blog', href: '/blog' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-jira-border sticky top-0 z-50 shadow-jira">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <nav className="flex items-center justify-between gap-3" aria-label="Main navigation">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-jira-blue rounded flex items-center justify-center">
              <Fi.FiGrid className="text-xl sm:text-2xl text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-jira-darkBlue">Projecto</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6">
              {items.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={
                    active === key
                      ? 'text-sm font-medium text-jira-blue'
                      : 'text-sm font-medium text-jira-textSecondary hover:text-jira-blue transition-colors'
                  }
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            <LanguageSwitcher />
            <Link href="/calculator" className="md:hidden btn-primary text-sm px-3 py-1.5">
              {t('start')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
