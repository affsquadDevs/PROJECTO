'use client';

import { useTranslations } from 'next-intl';
import * as Fi from 'react-icons/fi';
import { SiFacebook, SiInstagram, SiThreads, SiYoutube } from 'react-icons/si';
import { Link } from '@/i18n/navigation';

export default function SiteFooter() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  const guides: { href: string; key: string }[] = [
    { href: '/blog/project-cost-calculation', key: 'guideProjectCost' },
    { href: '/blog/software-development-cost', key: 'guideSoftwareCost' },
    { href: '/blog/cost-for-application-development', key: 'guideAppDev' },
    { href: '/blog/estimate-software-development-cost', key: 'guideEstimate' },
    { href: '/blog/app-cost-calculator', key: 'guideAppCalc' },
    { href: '/blog/website-cost-calculator', key: 'guideWebsiteCalc' },
  ];

  return (
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
            <p className="text-sm text-jira-textSecondary leading-relaxed max-w-xs mb-4">{t('tagline')}</p>
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/people/Projecto-Calculator/61586748986123/" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Facebook"><SiFacebook className="text-xl" /></a>
              <a href="https://www.instagram.com/projecto_calculator/" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Instagram"><SiInstagram className="text-xl" /></a>
              <a href="https://www.threads.com/@projecto_calculator" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="Threads"><SiThreads className="text-xl" /></a>
              <a href="https://www.youtube.com/@projecto_calculator" target="_blank" rel="noopener noreferrer" className="text-jira-textSecondary hover:text-jira-blue transition-colors" aria-label="YouTube"><SiYoutube className="text-xl" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">{t('navHeading')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{nav('home')}</Link></li>
              <li><Link href="/calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{nav('calculator')}</Link></li>
              <li><Link href="/blog" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{nav('blog')}</Link></li>
              <li><Link href="/about" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{nav('about')}</Link></li>
              <li><Link href="/contact" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{nav('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">{t('legalHeading')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog/privacy-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/blog/terms-of-service" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{t('terms')}</Link></li>
              <li><Link href="/cookie-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">{t('cookiePolicy')}</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">{t('guidesHeading')}</h3>
            <ul className="space-y-3 text-sm">
              {guides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-jira-textSecondary hover:text-jira-blue transition-colors">{t(g.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-jira-border pt-6 mb-6">
          <p className="text-xs text-jira-textSecondary leading-relaxed max-w-4xl">
            <strong className="text-jira-darkBlue">{t('disclaimerLabel')}</strong> {t('disclaimerBody')}
          </p>
        </div>

        <div className="border-t border-jira-border my-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-jira-textSecondary gap-3 sm:gap-0">
          <p>© 2025 Projecto Calculator. {t('rights')}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/about" className="hover:text-jira-blue transition-colors">{nav('about')}</Link>
            <Link href="/contact" className="hover:text-jira-blue transition-colors">{nav('contact')}</Link>
            <Link href="/blog/privacy-policy" className="hover:text-jira-blue transition-colors">{t('privacyShort')}</Link>
            <Link href="/blog/terms-of-service" className="hover:text-jira-blue transition-colors">{t('termsShort')}</Link>
            <Link href="/cookie-policy" className="hover:text-jira-blue transition-colors">{t('cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
