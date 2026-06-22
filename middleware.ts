import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals, and any file with an
  // extension (ads.txt, robots.txt, sitemap.xml, llms.txt, *.webp, og-image.png …).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
