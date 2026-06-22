'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCalculatorStore } from '@/store/calculator';
import { FEATURE_CATEGORIES } from '@/data/features';
import * as FiIcons from 'react-icons/fi';

const FiTarget = FiIcons.FiTarget;
const FiChevronDown = FiIcons.FiChevronDown;
const FiChevronRight = FiIcons.FiChevronRight;
const FiCheck = FiIcons.FiCheck;
const FiClock = FiIcons.FiClock;
const FiCode = FiIcons.FiCode;

// Map the English category value (stored on each feature) back to its FEATURE_CATEGORIES key
const CATEGORY_KEY_BY_VALUE: Record<string, string> = Object.fromEntries(
  Object.entries(FEATURE_CATEGORIES).map(([key, value]) => [value, key])
);

export default function Step3Features() {
  const t = useTranslations('calculator');
  const { features, toggleFeature, updateFeatureHours } = useCalculatorStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    FEATURE_CATEGORIES.AUTH,
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  const selectedCount = features.filter((f) => f.selected).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FiTarget className="text-xl text-jira-blue" />
        <div>
          <h2 className="text-lg font-semibold text-jira-darkBlue">{t('features.title')}</h2>
          <p className="text-jira-textSecondary text-xs">
            {t('features.subtitle')}
          </p>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="card bg-primary-50 border border-jira-blue">
          <div className="flex items-center space-x-3">
            <FiCheck className="text-xl text-jira-blue" />
            <p className="text-jira-darkBlue font-medium text-sm">
              {t('features.selectedCount', { count: selectedCount })}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => {
          const isExpanded = expandedCategories.includes(category);
          const selectedInCategory = categoryFeatures.filter((f) => f.selected).length;

          return (
            <div key={category} className="card hover:shadow-jira-md transition-all duration-150">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-left gap-2"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  {isExpanded ? (
                    <FiChevronDown className="text-base sm:text-lg text-jira-textSecondary flex-shrink-0" />
                  ) : (
                    <FiChevronRight className="text-base sm:text-lg text-jira-textSecondary flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-jira-darkBlue truncate">{t('featureCategories.' + (CATEGORY_KEY_BY_VALUE[category] || category))}</h3>
                    {selectedInCategory > 0 && (
                      <span className="text-xs text-jira-blue font-medium">
                        {t('features.selectedInCategory', { count: selectedInCategory })}
                      </span>
                    )}
                  </div>
                </div>
                {selectedInCategory > 0 && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-jira-blue text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {selectedInCategory}
                  </div>
                )}
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 pl-4 sm:pl-7">
                  {categoryFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-2 sm:p-3 rounded border transition-all ${
                        feature.selected
                          ? 'border-jira-blue bg-primary-50 shadow-jira'
                          : 'border-jira-border hover:border-jira-blue hover:shadow-jira'
                      }`}
                    >
                      <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={feature.selected}
                          onChange={() => toggleFeature(feature.id)}
                          className="checkbox-field mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs sm:text-sm text-jira-darkBlue mb-2 break-words">{t('featureItems.' + feature.id)}</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-1.5">
                              <FiCode className="text-jira-textSecondary flex-shrink-0" />
                              <span className="text-jira-textSecondary">{t('features.frontendLabel')}</span>
                              <span className="font-medium text-jira-darkBlue">
                                {t('features.hoursSuffix', { min: feature.frontendHours.min, max: feature.frontendHours.max })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <FiCode className="text-jira-textSecondary flex-shrink-0" />
                              <span className="text-jira-textSecondary">{t('features.backendLabel')}</span>
                              <span className="font-medium text-jira-darkBlue">
                                {t('features.hoursSuffix', { min: feature.backendHours.min, max: feature.backendHours.max })}
                              </span>
                            </div>
                          </div>

                          {feature.selected && (
                            <div className="mt-3 pt-3 border-t border-jira-border">
                              <div className="text-xs text-jira-textSecondary mb-2 flex items-center space-x-1">
                                <FiClock className="text-xs" />
                                <span>{t('features.customizeHours')}</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="text-xs text-jira-textSecondary mb-1 block">{t('features.frontendHoursLabel')}</label>
                                  <input
                                    type="number"
                                    placeholder={`${feature.frontendHours.min}-${feature.frontendHours.max}`}
                                    value={feature.customHours?.frontend || ''}
                                    onChange={(e) =>
                                      updateFeatureHours(
                                        feature.id,
                                        e.target.value ? Number(e.target.value) : undefined,
                                        feature.customHours?.backend
                                      )
                                    }
                                    className="input-field text-xs py-1.5"
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-jira-textSecondary mb-1 block">{t('features.backendHoursLabel')}</label>
                                  <input
                                    type="number"
                                    placeholder={`${feature.backendHours.min}-${feature.backendHours.max}`}
                                    value={feature.customHours?.backend || ''}
                                    onChange={(e) =>
                                      updateFeatureHours(
                                        feature.id,
                                        feature.customHours?.frontend,
                                        e.target.value ? Number(e.target.value) : undefined
                                      )
                                    }
                                    className="input-field text-xs py-1.5"
                                    min="0"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedCount === 0 && (
        <div className="text-center py-12 text-jira-textSecondary">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <FiTarget className="text-3xl text-gray-400" />
          </div>
          <p className="font-medium">{t('features.emptyTitle')}</p>
        </div>
      )}
    </div>
  );
}

