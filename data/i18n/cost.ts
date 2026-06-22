import {
  getAppEstimateBySlug,
  type AppEstimate,
  type CostBreakdownItem,
  type TimelinePhase,
  type FaqItem,
} from '@/data/appEstimates';
import { appContent, type ContentSection } from '@/data/appContent';
import { defaultLocale, type Locale } from '@/i18n/routing';

import pl from './cost/pl.json';
import es from './cost/es.json';
import pt from './cost/pt.json';
import fr from './cost/fr.json';
import it from './cost/it.json';
import de from './cost/de.json';
import uk from './cost/uk.json';
import sv from './cost/sv.json';
import cs from './cost/cs.json';
import el from './cost/el.json';

type AppOverlay = {
  category?: string;
  description?: string;
  introText?: string;
  keyFeatures?: string[];
  costBreakdown?: { category?: string; description?: string }[];
  complexityFactors?: string[];
  timeline?: { phase?: string; duration?: string; description?: string }[];
  faqs?: { question?: string; answer?: string }[];
  content?: ContentSection[];
};

const OVERLAYS: Record<string, Record<string, AppOverlay>> = {
  pl, es, pt, fr, it, de, uk, sv, cs, el,
} as Record<string, Record<string, AppOverlay>>;

// Merge base app (numbers + brand names) with a locale's translated text overlay.
// complexityLevel, appName, displayName, and all numeric fields stay from base.
export function getLocalizedApp(slug: string, locale: Locale): AppEstimate | undefined {
  const base = getAppEstimateBySlug(slug);
  if (!base || locale === defaultLocale) return base;
  const ov = OVERLAYS[locale]?.[slug];
  if (!ov) return base;

  return {
    ...base,
    category: ov.category ?? base.category,
    description: ov.description ?? base.description,
    introText: ov.introText ?? base.introText,
    keyFeatures: ov.keyFeatures?.length ? ov.keyFeatures : base.keyFeatures,
    complexityFactors: ov.complexityFactors?.length ? ov.complexityFactors : base.complexityFactors,
    costBreakdown: base.costBreakdown.map((item: CostBreakdownItem, i: number) => ({
      ...item,
      category: ov.costBreakdown?.[i]?.category ?? item.category,
      description: ov.costBreakdown?.[i]?.description ?? item.description,
    })),
    timeline: base.timeline.map((t: TimelinePhase, i: number) => ({
      ...t,
      phase: ov.timeline?.[i]?.phase ?? t.phase,
      duration: ov.timeline?.[i]?.duration ?? t.duration,
      description: ov.timeline?.[i]?.description ?? t.description,
    })),
    faqs: base.faqs.map((f: FaqItem, i: number) => ({
      question: ov.faqs?.[i]?.question ?? f.question,
      answer: ov.faqs?.[i]?.answer ?? f.answer,
    })),
  };
}

export function getLocalizedSections(slug: string, locale: Locale): ContentSection[] {
  const base = appContent[slug] ?? [];
  if (locale === defaultLocale) return base;
  const ov = OVERLAYS[locale]?.[slug]?.content;
  return ov && ov.length ? ov : base;
}
