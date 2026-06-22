'use client';

import { useTranslations } from 'next-intl';
import { PROJECT_TYPE_RECOMMENDATIONS, RECOMMENDED_STACKS } from '@/data/recommendations';
import { useCalculatorStore } from '@/store/calculator';
import { TeamMember } from '@/types/calculator';
import { RECOMMENDED_RATES } from '@/data/features';
import * as FiIcons from 'react-icons/fi';

const FiTarget = FiIcons.FiTarget;
const FiArrowLeft = FiIcons.FiArrowLeft;
const FiInfo = FiIcons.FiInfo;
const FiClock = FiIcons.FiClock;

interface Props {
  onSkip: () => void;
}

export default function ProjectTypeSelector({ onSkip }: Props) {
  const t = useTranslations('calculator');
  const { updateDesign, updateTechStack, addTeamMember, setCurrentStep } = useCalculatorStore();

  const selectProjectType = (typeId: string) => {
    const projectType = PROJECT_TYPE_RECOMMENDATIONS.find(p => p.type === typeId);
    if (!projectType) {
      console.error('Project type not found:', typeId);
      return;
    }

    const stack = RECOMMENDED_STACKS.find(s => s.id === projectType.recommendedStack);
    if (!stack) {
      console.error('Stack not found:', projectType.recommendedStack);
      return;
    }

    // Set design complexity
    updateDesign({ complexity: projectType.estimatedComplexity });

    // Set tech stack
    updateTechStack({
      frontend: stack.frontend,
      backend: stack.backend,
      database: stack.database,
    });

    if (typeId === 'landing') {
      const designer: TeamMember = {
        id: `member-${Date.now()}`,
        role: 'ui-ux-designer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['ui-ux-designer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      const frontend: TeamMember = {
        id: `member-${Date.now() + 1}`,
        role: 'frontend-developer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['frontend-developer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      addTeamMember(designer);
      setTimeout(() => addTeamMember(frontend), 10);
    } else if (typeId === 'saas' || typeId === 'ecommerce' || typeId === 'enterprise') {
      const designer: TeamMember = {
        id: `member-${Date.now()}`,
        role: 'ui-ux-designer',
        level: 'senior',
        hourlyRate: RECOMMENDED_RATES['ui-ux-designer']['senior'],
        hoursPerDay: 8,
        quantity: 1,
      };
      const frontend: TeamMember = {
        id: `member-${Date.now() + 1}`,
        role: 'frontend-developer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['frontend-developer']['middle'],
        hoursPerDay: 8,
        quantity: 2,
      };
      const backend: TeamMember = {
        id: `member-${Date.now() + 2}`,
        role: 'backend-developer',
        level: 'senior',
        hourlyRate: RECOMMENDED_RATES['backend-developer']['senior'],
        hoursPerDay: 8,
        quantity: 1,
      };
      const qa: TeamMember = {
        id: `member-${Date.now() + 3}`,
        role: 'qa-engineer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['qa-engineer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      addTeamMember(designer);
      setTimeout(() => addTeamMember(frontend), 10);
      setTimeout(() => addTeamMember(backend), 20);
      setTimeout(() => addTeamMember(qa), 30);
    } else {
      const designer: TeamMember = {
        id: `member-${Date.now()}`,
        role: 'ui-ux-designer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['ui-ux-designer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      const frontend: TeamMember = {
        id: `member-${Date.now() + 1}`,
        role: 'frontend-developer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['frontend-developer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      const backend: TeamMember = {
        id: `member-${Date.now() + 2}`,
        role: 'backend-developer',
        level: 'middle',
        hourlyRate: RECOMMENDED_RATES['backend-developer']['middle'],
        hoursPerDay: 8,
        quantity: 1,
      };
      addTeamMember(designer);
      setTimeout(() => addTeamMember(frontend), 10);
      setTimeout(() => addTeamMember(backend), 20);
    }

    // Close selector and go to step 1
    setTimeout(() => {
      onSkip();
      setCurrentStep(0);
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-jira-blue rounded-lg mb-4 shadow-jira-md mx-auto">
          <FiTarget className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-jira-darkBlue">{t('projectTypeSelector.title')}</h2>
        <p className="text-jira-textSecondary">
          {t('projectTypeSelector.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-8">
        {PROJECT_TYPE_RECOMMENDATIONS.map((project) => (
          <button
            key={project.type}
            onClick={() => selectProjectType(project.type)}
            className="card hover:shadow-jira-md transition-all text-left border border-jira-border hover:border-jira-blue"
          >
            <h3 className="text-lg font-semibold mb-2 text-jira-darkBlue">{t('projectTypes.' + project.type + '.name')}</h3>
            <p className="text-jira-textSecondary text-xs mb-4">{t('projectTypes.' + project.type + '.description')}</p>

            <div className="flex items-center gap-3 text-xs mb-3">
              <span className={`px-2 py-1 rounded font-medium ${
                project.estimatedComplexity === 'simple' ? 'bg-green-50 text-jira-success border border-jira-success' :
                project.estimatedComplexity === 'medium' ? 'bg-primary-50 text-jira-blue border border-jira-blue' :
                'bg-yellow-50 text-jira-warning border border-jira-warning'
              }`}>
                {t('complexityLabels.' + project.estimatedComplexity)}
              </span>
              <span className="text-jira-textSecondary flex items-center space-x-1">
                <FiClock />
                <span>{project.estimatedTimeline}</span>
              </span>
            </div>

            <div className="border-t border-jira-border pt-3 mt-3">
              <div className="text-xs text-jira-textSecondary mb-2 font-medium uppercase tracking-wide">{t('projectTypeSelector.keyFeaturesLabel')}</div>
              <div className="flex flex-wrap gap-1.5">
                {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-jira-textSecondary px-2 py-1 rounded">
                    {t('projectTypes.' + project.type + '.feature' + idx)}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onSkip}
          className="btn-secondary flex items-center space-x-2 mx-auto"
        >
          <FiArrowLeft />
          <span>{t('projectTypeSelector.backToManual')}</span>
        </button>
      </div>

      <div className="card bg-primary-50 border border-jira-blue mt-6">
        <div className="flex items-start space-x-3">
          <FiInfo className="text-lg text-jira-blue flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-jira-darkBlue mb-1 text-sm">{t('projectTypeSelector.howItWorksTitle')}</h3>
            <p className="text-xs text-jira-textSecondary">
              {t('projectTypeSelector.howItWorksBody')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

