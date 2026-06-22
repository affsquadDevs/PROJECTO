'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import * as Fi from 'react-icons/fi';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');
  const [isPending, startTransition] = useTransition();

  return (
    <label className="relative inline-flex items-center">
      <Fi.FiGlobe className="pointer-events-none absolute left-2 text-jira-textSecondary" aria-hidden="true" />
      <span className="sr-only">{t('label')}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as Locale;
          startTransition(() => {
            router.replace(pathname, { locale: next });
          });
        }}
        aria-label={t('label')}
        className="appearance-none rounded border border-jira-border bg-white py-1.5 pl-7 pr-7 text-sm font-medium text-jira-textSecondary hover:text-jira-blue focus:outline-none focus:ring-2 focus:ring-jira-blue cursor-pointer"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
      <Fi.FiChevronDown className="pointer-events-none absolute right-2 text-jira-textSecondary" aria-hidden="true" />
    </label>
  );
}
