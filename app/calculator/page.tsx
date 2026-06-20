import type { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

const SITE = 'https://projecto-calculator.com';
const BRAND = 'Projecto Calculator';

export const metadata: Metadata = {
  title: `Software Development Cost Calculator | ${BRAND}`,
  description:
    'Free step-by-step calculator to estimate software development cost, timeline, and team. Configure roles, design, features, tech stack, QA, and buffers in minutes.',
  alternates: { canonical: `${SITE}/calculator` },
  openGraph: {
      images: ['/og-image.png'],
    title: `Software Development Cost Calculator | ${BRAND}`,
    description:
      'Estimate software development cost, timeline, and team composition with a free step-by-step calculator.',
    url: `${SITE}/calculator`,
    siteName: BRAND,
    type: 'website',
  },
  twitter: {
      images: ['/og-image.png'],
    card: 'summary_large_image',
    title: `Software Development Cost Calculator | ${BRAND}`,
    description:
      'Estimate software development cost, timeline, and team composition with a free step-by-step calculator.',
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
