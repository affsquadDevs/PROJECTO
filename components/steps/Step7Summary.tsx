'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useCalculatorStore } from '@/store/calculator';
import { ROLE_NAMES, LEVEL_NAMES } from '@/data/features';
import { trackCalcFinished } from '@/utils/gtm';
import * as FiIcons from 'react-icons/fi';
import { exportToPDF } from '@/utils/exportPDF';
import { AVAILABLE_FEATURES, FEATURE_CATEGORIES } from '@/data/features';

const FiDownload = FiIcons.FiDownload;
const FiFileText = FiIcons.FiFileText;
const FiDollarSign = FiIcons.FiDollarSign;
const FiClock = FiIcons.FiClock;
const FiUsers = FiIcons.FiUsers;
const FiTarget = FiIcons.FiTarget;
const FiInfo = FiIcons.FiInfo;
const FiCode = FiIcons.FiCode;
const FiCheckCircle = FiIcons.FiCheckCircle;

// Reverse lookups: the summary stores the English feature name / category value;
// map them back to translation keys so the breakdown can render localized labels.
const FEATURE_ID_BY_NAME: Record<string, string> = Object.fromEntries(
  AVAILABLE_FEATURES.map((f) => [f.name, f.id])
);
const CATEGORY_KEY_BY_VALUE: Record<string, string> = Object.fromEntries(
  Object.entries(FEATURE_CATEGORIES).map(([key, value]) => [value, key])
);
const BASE_PAGE_PREFIX = 'Base Page Development';

export default function Step7Summary() {
  const t = useTranslations('calculator');
  const { summary, calculateSummary, team, projectName } = useCalculatorStore();
  const hasTrackedFinished = useRef(false);

  useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  // Track calc_finished when summary is calculated (only once)
  useEffect(() => {
    if (summary && summary.totalCost > 0 && !hasTrackedFinished.current) {
      trackCalcFinished(summary.totalCost);
      hasTrackedFinished.current = true;
    }
  }, [summary]);

  if (!summary) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">{t('summary.calculating')}</p>
      </div>
    );
  }

  const handleExportPDF = () => {
    try {
      const projectTitle = projectName || t('summary.defaultProjectName');
      exportToPDF(summary, projectTitle);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert(t('summary.pdfError'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FiCheckCircle className="text-xl text-jira-blue" />
        <div>
          <h2 className="text-lg font-semibold text-jira-darkBlue">{t('summary.title')}</h2>
          {projectName && (
            <p className="text-xs font-medium text-jira-blue flex items-center space-x-1">
              <FiFileText className="text-sm" />
              <span>{projectName}</span>
            </p>
          )}
          <p className="text-jira-textSecondary text-xs">
            {t('summary.subtitle')}
          </p>
        </div>
      </div>

      <div className="card bg-jira-blue text-white shadow-jira-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wide opacity-90 mb-2">
              <FiDollarSign />
              <span>{t('summary.totalCost')}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold mb-1 break-words">
              ${summary.totalCost.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wide opacity-90 mb-2">
              <FiClock />
              <span>{t('summary.estimatedTime')}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold mb-1">
              {t('summary.monthsShort', { months: summary.estimatedMonths.toFixed(1) })}
            </div>
            <div className="text-xs opacity-90">
              {t('summary.hoursParen', { hours: summary.totalHours.toLocaleString() })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary-500">
          <button onClick={handleExportPDF} className="bg-white text-jira-blue px-4 sm:px-5 py-2 sm:py-2.5 rounded font-medium hover:bg-gray-50 transition-all shadow-jira flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base">
            <FiDownload />
            <span>{t('summary.downloadPdf')}</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <FiUsers className="text-lg text-jira-textSecondary" />
          <h3 className="text-lg font-semibold text-jira-darkBlue">{t('summary.breakdownByRoles')}</h3>
        </div>
        <div className="space-y-2">
          {summary.teamCosts.map((roleCost, index) => {
            const roleName = roleCost.customRoleName || (ROLE_NAMES[roleCost.role] ? t('roles.' + roleCost.role) : roleCost.role);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-jira-darkBlue">
                    {t('summary.roleLine', { role: roleName, level: LEVEL_NAMES[roleCost.level] ? t('levels.' + roleCost.level) : roleCost.level })}
                  </div>
                  <div className="text-xs text-jira-textSecondary">
                    {t('summary.hoursValue', { hours: roleCost.hours.toFixed(1) })}
                    {roleCost.quantity > 1 && ` ${t('summary.peopleSuffix', { count: roleCost.quantity })}`}
                  </div>
                </div>
                <div className="text-base font-bold text-jira-blue">
                  ${roleCost.cost.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {summary.featureCosts.length > 0 && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FiTarget className="text-lg text-jira-textSecondary" />
            <h3 className="text-lg font-semibold text-jira-darkBlue">{t('summary.breakdownByFeatures')}</h3>
          </div>
          <div className="space-y-2">
            {summary.featureCosts.map((featureCost, index) => {
              const featureId = FEATURE_ID_BY_NAME[featureCost.featureName];
              const isBasePage = featureCost.featureName.startsWith(BASE_PAGE_PREFIX);
              const basePageMatch = featureCost.featureName.match(/\((\d+)\s/);
              const featureLabel = featureId
                ? t('featureItems.' + featureId)
                : isBasePage
                ? t('summary.basePageDevelopment', { count: basePageMatch ? Number(basePageMatch[1]) : 0 })
                : featureCost.featureName;
              const categoryKey = CATEGORY_KEY_BY_VALUE[featureCost.category];
              const categoryLabel = categoryKey
                ? t('featureCategories.' + categoryKey)
                : featureCost.category === 'Foundation'
                ? t('summary.foundationCategory')
                : featureCost.category;
              return (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-jira-darkBlue">{featureLabel}</div>
                    <div className="text-xs text-jira-textSecondary">{categoryLabel}</div>
                  </div>
                  <div className="text-base font-bold text-jira-blue">
                    ${featureCost.cost.toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <FiCode className="text-jira-textSecondary flex-shrink-0" />
                    <span className="text-jira-textSecondary">{t('summary.frontendLabel')}</span>
                    <span className="font-medium text-jira-darkBlue">{featureCost.frontendHours.toFixed(1)}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiCode className="text-jira-textSecondary flex-shrink-0" />
                    <span className="text-jira-textSecondary">{t('summary.backendLabel')}</span>
                    <span className="font-medium text-jira-darkBlue">{featureCost.backendHours.toFixed(1)}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiClock className="text-jira-textSecondary flex-shrink-0" />
                    <span className="text-jira-textSecondary">{t('summary.totalLabel')}</span>
                    <span className="font-medium text-jira-darkBlue">{featureCost.totalHours.toFixed(1)}h</span>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <FiDollarSign className="text-lg text-jira-textSecondary" />
          <h3 className="text-lg font-semibold text-jira-darkBlue">{t('summary.additionalCostsTitle')}</h3>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <span className="text-jira-textSecondary">{t('summary.designAndMockups')}</span>
            <span className="font-semibold text-jira-darkBlue">${summary.designCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <span className="text-jira-textSecondary">{t('summary.testingAndQa')}</span>
            <span className="font-semibold text-jira-darkBlue">${summary.testingCost.toLocaleString()}</span>
          </div>
          {summary.supportCost > 0 && (
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded text-sm">
              <span className="text-jira-textSecondary">{t('summary.postLaunchSupport')}</span>
              <span className="font-semibold text-jira-darkBlue">${summary.supportCost.toLocaleString()}</span>
            </div>
          )}
          {summary.otherCosts > 0 && (
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded text-sm">
              <span className="text-jira-textSecondary">{t('summary.infrastructureAndOther')}</span>
              <span className="font-semibold text-jira-darkBlue">${summary.otherCosts.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between p-2 hover:bg-gray-50 rounded border-t border-jira-border text-sm">
            <span className="text-jira-darkBlue font-medium">{t('summary.bufferLine')}</span>
            <span className="font-semibold text-jira-darkBlue">${summary.bufferCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="card bg-jira-darkBlue text-white shadow-jira-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide opacity-80 mb-1">{t('summary.finalProjectCost')}</div>
            <div className="text-2xl sm:text-3xl font-bold break-words">${summary.totalCost.toLocaleString()}</div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs uppercase tracking-wide opacity-80 mb-1">{t('summary.totalTime')}</div>
            <div className="text-xl sm:text-2xl font-semibold">
              {t('summary.monthsValue', { months: summary.estimatedMonths.toFixed(1) })}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-jira-warning">
        <div className="flex items-start space-x-3">
          <FiInfo className="text-lg text-jira-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2 text-sm">{t('summary.importantNotesTitle')}</h3>
            <ul className="text-xs text-yellow-800 space-y-1.5">
              <li className="flex items-start space-x-1.5">
                <span>•</span>
                <span>{t('summary.noteEstimate')}</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span>•</span>
                <span>{t('summary.noteParallel')}</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span>•</span>
                <span>{t('summary.noteHosting')}</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span>•</span>
                <span>{t('summary.noteConsultation')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
