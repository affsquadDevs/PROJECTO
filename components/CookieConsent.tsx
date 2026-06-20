'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'projecto-cookie-consent';

type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function applyConsent(value: Consent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable — show the banner so a choice can still be made.
    }

    if (stored === 'granted' || stored === 'denied') {
      applyConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore write failures; consent is still applied for this session.
    }
    applyConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-jira-border bg-white shadow-jira-lg"
    >
      <div className="container mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-relaxed text-jira-textSecondary max-w-3xl">
            We use cookies to run the site, measure traffic, and serve ads via Google
            AdSense. With your consent, Google and its partners may use cookies for
            personalized advertising. You can accept or reject non-essential cookies.
            Read our{' '}
            <Link href="/cookie-policy" className="text-jira-blue font-medium hover:underline">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/blog/privacy-policy" className="text-jira-blue font-medium hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="btn-secondary text-sm px-4 py-2 whitespace-nowrap"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="btn-primary text-sm px-5 py-2 whitespace-nowrap"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
