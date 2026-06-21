import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

export const metadata: Metadata = {
  title: `Blog — Software Development Cost Guides | ${BRAND}`,
  description:
    'In-depth guides on software, app, SaaS, e-commerce, fintech, and healthcare development costs. Learn how projects are priced and how to budget accurately.',
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
      images: ['/og-image.png'],
    title: `Blog — Software Development Cost Guides | ${BRAND}`,
    description:
      'In-depth guides on software, app, SaaS, e-commerce, fintech, and healthcare development costs.',
    url: `${SITE}/blog`,
    siteName: BRAND,
    type: 'website',
  },
  twitter: {
      images: ['/og-image.png'],
    card: 'summary_large_image',
    title: `Blog — Software Development Cost Guides | ${BRAND}`,
    description:
      'In-depth guides on software, app, SaaS, e-commerce, fintech, and healthcare development costs.',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
