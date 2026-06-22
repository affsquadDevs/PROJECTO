'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCalculatorStore } from '@/store/calculator';
import { FrontendFramework, BackendStack, Database, MobilePlatform, UILibrary, HostingPlatform } from '@/types/calculator';
import { RECOMMENDED_STACKS, TECH_COMPATIBILITY } from '@/data/recommendations';
import * as FiIcons from 'react-icons/fi';

const FiCpu = FiIcons.FiCpu;
const FiServer = FiIcons.FiServer;
const FiDatabase = FiIcons.FiDatabase;
const FiCloud = FiIcons.FiCloud;
const FiCheckCircle = FiIcons.FiCheckCircle;
const FiAlertCircle = FiIcons.FiAlertCircle;
const FiInfo = FiIcons.FiInfo;
const FiX = FiIcons.FiX;
const FiSmartphone = FiIcons.FiSmartphone;
const FiLayout = FiIcons.FiLayout;
const FiGlobe = FiIcons.FiGlobe;

export default function Step4TechStack() {
  const t = useTranslations('calculator');
  const { techStack, updateTechStack } = useCalculatorStore();
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Translate the option "note" strings (e.g. "Base time", "+10% time", "+2% cost")
  // while keeping the technology labels (React, Node.js, ...) as literals.
  const formatNote = (note: string): string => {
    if (note === 'Base time') return t('techStack.noteBase');
    if (note === 'Web only') return t('techStack.webOnly');
    const match = note.match(/^([+-])(\d+)%\s+(time|cost)$/);
    if (match) {
      const [, sign, percent, kind] = match;
      return kind === 'cost'
        ? t('techStack.noteCost', { sign, percent: Number(percent) })
        : t('techStack.noteTime', { sign, percent: Number(percent) });
    }
    return note;
  };

  const frontendOptions: { value: FrontendFramework; label: string; note: string }[] = [
    { value: 'react', label: 'React', note: 'Base time' },
    { value: 'nextjs', label: 'Next.js', note: '+10% time' },
    { value: 'vue', label: 'Vue.js', note: 'Base time' },
    { value: 'nuxtjs', label: 'Nuxt.js', note: '+10% time' },
    { value: 'angular', label: 'Angular', note: '+15% time' },
    { value: 'svelte', label: 'Svelte', note: '-5% time' },
    { value: 'sveltekit', label: 'SvelteKit', note: '+5% time' },
    { value: 'remix', label: 'Remix', note: '+8% time' },
    { value: 'gatsby', label: 'Gatsby', note: '+5% time' },
    { value: 'astro', label: 'Astro', note: 'Base time' },
  ];

  const backendOptions: { value: BackendStack; label: string; note: string }[] = [
    { value: 'nodejs', label: 'Node.js', note: 'Base time' },
    { value: 'express', label: 'Express.js', note: '-5% time' },
    { value: 'nestjs', label: 'NestJS', note: '+12% time' },
    { value: 'python', label: 'Python', note: '+5% time' },
    { value: 'django', label: 'Django', note: '+15% time' },
    { value: 'fastapi', label: 'FastAPI', note: '+8% time' },
    { value: 'php', label: 'PHP', note: 'Base time' },
    { value: 'laravel', label: 'Laravel', note: '+10% time' },
    { value: 'java', label: 'Java', note: '+20% time' },
    { value: 'spring', label: 'Spring Boot', note: '+25% time' },
    { value: 'dotnet', label: '.NET Core', note: '+20% time' },
    { value: 'go', label: 'Go', note: '+12% time' },
    { value: 'ruby', label: 'Ruby', note: '+8% time' },
    { value: 'rails', label: 'Ruby on Rails', note: '+15% time' },
    { value: 'rust', label: 'Rust', note: '+30% time' },
    { value: 'elixir', label: 'Elixir/Phoenix', note: '+25% time' },
  ];

  const databaseOptions: { value: Database; label: string; note: string }[] = [
    { value: 'postgresql', label: 'PostgreSQL', note: 'Base time' },
    { value: 'mysql', label: 'MySQL', note: '-5% time' },
    { value: 'mongodb', label: 'MongoDB', note: '+5% time' },
    { value: 'firebase', label: 'Firebase', note: '-10% time' },
    { value: 'redis', label: 'Redis', note: '-15% time' },
    { value: 'sqlite', label: 'SQLite', note: '-20% time' },
    { value: 'dynamodb', label: 'DynamoDB', note: '+10% time' },
    { value: 'cassandra', label: 'Cassandra', note: '+20% time' },
    { value: 'mariadb', label: 'MariaDB', note: '-5% time' },
    { value: 'supabase', label: 'Supabase', note: '-10% time' },
    { value: 'planetscale', label: 'PlanetScale', note: '-5% time' },
  ];

  const applyRecommendedStack = (stackId: string) => {
    const stack = RECOMMENDED_STACKS.find(s => s.id === stackId);
    if (stack) {
      updateTechStack({
        frontend: stack.frontend,
        backend: stack.backend,
        database: stack.database,
      });
      setShowRecommendations(false);
    }
  };

  // Get compatibility notes for current selection
  const getCompatibilityNote = () => {
    try {
      const frontendCompat = TECH_COMPATIBILITY.frontend[techStack.frontend as keyof typeof TECH_COMPATIBILITY.frontend];
      const backendCompat = TECH_COMPATIBILITY.backend[techStack.backend as keyof typeof TECH_COMPATIBILITY.backend];
      
      if (!frontendCompat || !backendCompat) return null;

      const isBestMatch = frontendCompat.bestWith.includes(techStack.backend) &&
                          backendCompat.bestWith.includes(techStack.database);
      const isGoodMatch = frontendCompat.goodWith.includes(techStack.backend) ||
                          backendCompat.goodWith.includes(techStack.database);

      if (isBestMatch) {
        return { type: 'excellent' };
      } else if (isGoodMatch) {
        return { type: 'good' };
      } else {
        return { type: 'okay' };
      }
    } catch {
      return null;
    }
  };

  const compatNote = getCompatibilityNote();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FiCpu className="text-xl text-jira-blue" />
        <div>
          <h2 className="text-lg font-semibold text-jira-darkBlue">{t('techStack.title')}</h2>
          <p className="text-jira-textSecondary text-xs">
            {t('techStack.subtitle')}
          </p>
        </div>
      </div>

      <div className="card bg-primary-50 border border-jira-blue">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <FiInfo className="text-lg sm:text-xl text-jira-blue flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-jira-darkBlue mb-1 text-xs sm:text-sm">{t('techStack.needHelpTitle')}</h3>
              <p className="text-xs text-jira-textSecondary">
                {t('techStack.needHelpBody')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRecommendations(true)}
            className="btn-primary w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm px-4 py-2"
          >
            {t('techStack.viewRecommendations')}
          </button>
        </div>
      </div>

      {compatNote && (
        <div className={`card flex items-start sm:items-center space-x-2 sm:space-x-3 ${
          compatNote.type === 'excellent' ? 'bg-green-50 border border-jira-success' :
          compatNote.type === 'good' ? 'bg-primary-50 border border-jira-blue' :
          'bg-yellow-50 border border-jira-warning'
        }`}>
          {compatNote.type === 'excellent' ? (
            <FiCheckCircle className="text-lg sm:text-xl text-jira-success flex-shrink-0 mt-0.5 sm:mt-0" />
          ) : compatNote.type === 'good' ? (
            <FiCheckCircle className="text-lg sm:text-xl text-jira-blue flex-shrink-0 mt-0.5 sm:mt-0" />
          ) : (
            <FiAlertCircle className="text-lg sm:text-xl text-jira-warning flex-shrink-0 mt-0.5 sm:mt-0" />
          )}
          <p className={`font-medium text-xs sm:text-sm ${
            compatNote.type === 'excellent' ? 'text-green-900' :
            compatNote.type === 'good' ? 'text-jira-darkBlue' :
            'text-yellow-900'
          }`}>
            {compatNote.type === 'excellent'
              ? t('techStack.compatExcellent')
              : compatNote.type === 'good'
              ? t('techStack.compatGood')
              : t('techStack.compatOkay')}
          </p>
        </div>
      )}

      <div className="card">
        <label className="label text-xs">{t('techStack.frontendFrameworkLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {frontendOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ frontend: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.frontend === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.backendStackLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {backendOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ backend: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.backend === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.databaseLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {databaseOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ database: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.database === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.mobilePlatformLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { value: 'none' as MobilePlatform, label: t('techStack.noMobile'), note: 'Web only' },
            { value: 'react-native' as MobilePlatform, label: 'React Native', note: '+30% time' },
            { value: 'flutter' as MobilePlatform, label: 'Flutter', note: '+25% time' },
            { value: 'swift' as MobilePlatform, label: 'Swift (iOS)', note: '+40% time' },
            { value: 'kotlin' as MobilePlatform, label: 'Kotlin (Android)', note: '+40% time' },
            { value: 'ionic' as MobilePlatform, label: 'Ionic', note: '+20% time' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ mobile: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.mobile === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.uiLibraryLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { value: 'tailwind' as UILibrary, label: 'Tailwind CSS', note: '-5% time' },
            { value: 'bootstrap' as UILibrary, label: 'Bootstrap', note: '-10% time' },
            { value: 'material-ui' as UILibrary, label: 'Material UI', note: '+5% time' },
            { value: 'ant-design' as UILibrary, label: 'Ant Design', note: '+8% time' },
            { value: 'chakra-ui' as UILibrary, label: 'Chakra UI', note: 'Base time' },
            { value: 'shadcn-ui' as UILibrary, label: 'shadcn/ui', note: '-5% time' },
            { value: 'mantine' as UILibrary, label: 'Mantine', note: 'Base time' },
            { value: 'none' as UILibrary, label: t('techStack.customCss'), note: 'Base time' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ uiLibrary: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.uiLibrary === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.hostingLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { value: 'vercel' as HostingPlatform, label: 'Vercel', note: '+2% cost' },
            { value: 'netlify' as HostingPlatform, label: 'Netlify', note: '+2% cost' },
            { value: 'aws' as HostingPlatform, label: 'AWS', note: '+15% cost' },
            { value: 'google-cloud' as HostingPlatform, label: 'Google Cloud', note: '+15% cost' },
            { value: 'azure' as HostingPlatform, label: 'Azure', note: '+18% cost' },
            { value: 'digitalocean' as HostingPlatform, label: 'DigitalOcean', note: '+8% cost' },
            { value: 'heroku' as HostingPlatform, label: 'Heroku', note: '+5% cost' },
            { value: 'railway' as HostingPlatform, label: 'Railway', note: '+3% cost' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateTechStack({ hosting: option.value })}
              className={`p-2 rounded border transition-all text-left text-sm ${
                techStack.hosting === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium mb-0.5">{option.label}</div>
              <div className="text-xs opacity-75">{formatNote(option.note)}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('techStack.devOpsLabel')}</label>
        <div className="space-y-1.5 mt-2">
          <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors text-sm">
            <input
              type="checkbox"
              checked={techStack.cloud}
              onChange={(e) => updateTechStack({ cloud: e.target.checked })}
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-jira-darkBlue">{t('techStack.cloudTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('techStack.cloudHint')}</div>
            </div>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors text-sm">
            <input
              type="checkbox"
              checked={techStack.cdn}
              onChange={(e) => updateTechStack({ cdn: e.target.checked })}
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-jira-darkBlue">{t('techStack.cdnTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('techStack.cdnHint')}</div>
            </div>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors text-sm">
            <input
              type="checkbox"
              checked={techStack.cicd}
              onChange={(e) => updateTechStack({ cicd: e.target.checked })}
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-jira-darkBlue">{t('techStack.cicdTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('techStack.cicdHint')}</div>
            </div>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors text-sm">
            <input
              type="checkbox"
              checked={techStack.docker}
              onChange={(e) => updateTechStack({ docker: e.target.checked })}
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-jira-darkBlue">{t('techStack.dockerTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('techStack.dockerHint')}</div>
            </div>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors text-sm">
            <input
              type="checkbox"
              checked={techStack.kubernetes}
              onChange={(e) => updateTechStack({ kubernetes: e.target.checked })}
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-jira-darkBlue">{t('techStack.kubernetesTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('techStack.kubernetesHint')}</div>
            </div>
          </label>
        </div>
      </div>

      {showRecommendations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded shadow-jira-lg max-w-4xl w-full p-4 sm:p-6 my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-jira-darkBlue">{t('techStack.recommendedTitle')}</h3>
              <button
                onClick={() => setShowRecommendations(false)}
                className="text-jira-textSecondary hover:text-jira-error transition-colors flex-shrink-0"
              >
                <FiX className="text-xl sm:text-2xl" />
              </button>
            </div>
            
            <p className="text-jira-textSecondary text-xs sm:text-sm mb-4 sm:mb-6">
              {t('techStack.recommendedSubtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RECOMMENDED_STACKS.map((stack) => (
                <div
                  key={stack.id}
                  className="border border-jira-border rounded p-4 hover:shadow-jira-md transition-all"
                >
                  <h4 className="font-semibold text-jira-darkBlue mb-2">{t('stacks.' + stack.id + '.name')}</h4>
                  <p className="text-xs text-jira-textSecondary mb-3">{stack.description}</p>

                  <div className="text-xs mb-3 text-jira-textSecondary break-words">
                    <strong className="text-jira-darkBlue">{t('techStack.bestForLabel')}</strong>{' '}
                    {stack.bestFor.map((_, idx) => t('stacks.' + stack.id + '.bestFor' + idx)).join(', ')}
                  </div>

                  <div className="mb-3">
                    <div className="text-xs font-semibold text-jira-success mb-1 uppercase tracking-wide">{t('techStack.prosLabel')}</div>
                    <ul className="text-xs text-jira-textSecondary space-y-1">
                      {stack.pros.slice(0, 2).map((_, idx) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <span className="text-jira-success">•</span>
                          <span>{t('stacks.' + stack.id + '.pros' + idx)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {stack.cons.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-jira-warning mb-1 uppercase tracking-wide">{t('techStack.consLabel')}</div>
                      <ul className="text-xs text-jira-textSecondary space-y-1">
                        {stack.cons.slice(0, 2).map((_, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-jira-warning">•</span>
                            <span>{t('stacks.' + stack.id + '.cons' + idx)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => applyRecommendedStack(stack.id)}
                    className="w-full btn-primary text-sm"
                  >
                    {t('techStack.useThisStack')}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary-50 rounded border border-jira-blue">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <FiInfo className="text-base sm:text-lg text-jira-blue flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-jira-darkBlue mb-1 text-xs sm:text-sm">{t('techStack.stillNotSureTitle')}</h4>
                  <p className="text-xs text-jira-textSecondary break-words">
                    {t.rich('techStack.stillNotSureBody', {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
