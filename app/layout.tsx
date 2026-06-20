import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import GoogleTagManager from '@/components/GoogleTagManager';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';
const ADSENSE_CLIENT = 'ca-pub-2980943706375055';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Projecto Calculator — Software Development Cost Calculator',
    template: '%s',
  },
  description:
    'Estimate software development costs for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects. Calculate budget, timeline, and team requirements in minutes.',
  applicationName: BRAND,
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.svg',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: BRAND,
    url: SITE,
    title: 'Projecto Calculator — Software Development Cost Calculator',
    description:
      'Estimate software development cost, timeline, and team for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projecto Calculator — Software Development Cost Calculator',
    description:
      'Estimate software development cost, timeline, and team for software projects.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode v2 — default everything to denied until the user opts in (EEA/UK requirement for ads). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        {/* Google AdSense — server-rendered so the verification crawler always sees it */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {/* Google Funding Choices — Google-certified CMP (IAB TCF v2). Renders the
            GDPR/consent message configured in AdSense → Privacy & messaging, and
            relays the choice into Consent Mode above. */}
        <script
          async
          src={`https://fundingchoicesmessages.google.com/i/${ADSENSE_CLIENT}?ers=1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}} signalGooglefcPresent();})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE}/#organization`,
              name: BRAND,
              url: `${SITE}/`,
              description:
                'Estimate software development costs for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects. Calculate budget, timeline, and team requirements in minutes.',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE}/logo.png`,
              },
              sameAs: [
                'https://www.facebook.com/people/Projecto-Calculator/61586748986123/',
                'https://www.instagram.com/projecto_calculator/',
                'https://www.youtube.com/@projecto_calculator',
                'https://www.threads.com/@projecto_calculator',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              '@id': `${SITE}/#webapp`,
              name: BRAND,
              url: `${SITE}/`,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description:
                'Estimate software development costs for SaaS, apps, marketplaces, healthcare, fintech, and e-commerce projects. Calculate budget, timeline, and team requirements in minutes. Configure team, design scope, features, tech stack, QA, and buffers to generate a cost and timeline estimate.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              creator: {
                '@type': 'Organization',
                '@id': `${SITE}/#organization`,
              },
              publisher: {
                '@type': 'Organization',
                '@id': `${SITE}/#organization`,
              },
              image: `${SITE}/og-image.png`,
              inLanguage: 'en',
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleTagManager />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHQZVH2P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
