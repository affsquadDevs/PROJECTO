import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { getAllAppSlugs } from '@/data/appEstimates';

const SITE = 'https://projecto-calculator.com';

// Article dates are stored as DD/MM/YYYY; normalize to ISO (YYYY-MM-DD).
function parseDMY(d?: string): string {
  if (!d) return '2026-06-20';
  const [day, month, year] = d.split('/').map(Number);
  if (!day || !month || !year) return '2026-06-20';
  const iso = new Date(Date.UTC(year, month - 1, day)).toISOString();
  return iso.slice(0, 10);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE}/calculator`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/cookie-policy`, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const blogPosts: MetadataRoute.Sitemap = articles
    .filter((a) => !a.isCostEstimate)
    .map((a) => ({
      url: `${SITE}/blog/${a.slug}`,
      lastModified: parseDMY(a.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const costToBuild: MetadataRoute.Sitemap = getAllAppSlugs().map((slug) => ({
    url: `${SITE}/cost-to-build/${slug}`,
    lastModified: '2026-03-08',
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...costToBuild];
}
