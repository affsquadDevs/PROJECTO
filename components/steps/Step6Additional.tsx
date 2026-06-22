'use client';

import { useTranslations } from 'next-intl';
import { useCalculatorStore } from '@/store/calculator';
import * as FiIcons from 'react-icons/fi';

const FiDollarSign = FiIcons.FiDollarSign;
const FiFileText = FiIcons.FiFileText;
const FiSliders = FiIcons.FiSliders;
const FiPackage = FiIcons.FiPackage;

export default function Step6Additional() {
  const t = useTranslations('calculator');
  const { additional, updateAdditional } = useCalculatorStore();

  const supportOptions: { value: 0 | 1 | 3 | 6 | 12; label: string; percent: string }[] = [
    { value: 0, label: t('additional.supportNone'), percent: '0%' },
    { value: 1, label: t('additional.supportMonths', { count: 1 }), percent: '15%' },
    { value: 3, label: t('additional.supportMonths', { count: 3 }), percent: '25%' },
    { value: 6, label: t('additional.supportMonths', { count: 6 }), percent: '40%' },
    { value: 12, label: t('additional.supportYear'), percent: '60%' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FiDollarSign className="text-xl text-jira-blue" />
        <div>
          <h2 className="text-lg font-semibold text-jira-darkBlue">{t('additional.title')}</h2>
          <p className="text-jira-textSecondary text-xs">
            {t('additional.subtitle')}
          </p>
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('additional.supportLabel')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
          {supportOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateAdditional({ supportMonths: option.value })}
              className={`p-2 rounded border transition-all text-sm ${
                additional.supportMonths === option.value
                  ? 'border-jira-blue bg-primary-50 text-jira-blue font-medium shadow-jira'
                  : 'border-jira-border text-jira-textSecondary hover:border-jira-blue hover:shadow-jira'
              }`}
            >
              <div className="font-medium text-center mb-0.5">{option.label}</div>
              <div className="text-xs text-center opacity-75">{option.percent}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-jira-textSecondary mt-2">
          {t('additional.supportHint')}
        </p>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <FiFileText className="text-lg text-jira-textSecondary" />
          <label className="label mb-0">{t('additional.documentationLabel')}</label>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={additional.documentation.technical}
              onChange={(e) =>
                updateAdditional({
                  documentation: {
                    ...additional.documentation,
                    technical: e.target.checked,
                  },
                })
              }
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-jira-darkBlue">{t('additional.technicalDocTitle')}</div>
              <div className="text-xs text-jira-textSecondary">
                {t('additional.technicalDocDesc')}
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={additional.documentation.userGuide}
              onChange={(e) =>
                updateAdditional({
                  documentation: {
                    ...additional.documentation,
                    userGuide: e.target.checked,
                  },
                })
              }
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-jira-darkBlue">{t('additional.userGuideTitle')}</div>
              <div className="text-xs text-jira-textSecondary">
                {t('additional.userGuideDesc')}
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-2">
          <FiSliders className="text-lg text-jira-textSecondary" />
          <label className="label mb-0">{t('additional.bufferLabel')}</label>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <input
            type="range"
            min="0"
            max="40"
            step="5"
            value={additional.bufferPercent}
            onChange={(e) => updateAdditional({ bufferPercent: Number(e.target.value) })}
            className="flex-1 accent-jira-blue"
          />
          <span className="font-semibold text-xl w-16 text-right text-jira-darkBlue">
            {additional.bufferPercent}%
          </span>
        </div>
        <p className="text-xs text-jira-textSecondary mt-2">
          {t('additional.bufferHint')}
        </p>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-3">
          <FiPackage className="text-lg text-jira-textSecondary" />
          <label className="label mb-0">{t('additional.otherLabel')}</label>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={additional.other.domain}
              onChange={(e) =>
                updateAdditional({
                  other: { ...additional.other, domain: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-jira-darkBlue">{t('additional.domainTitle')}</div>
              <div className="text-xs text-jira-textSecondary">{t('additional.domainDesc')}</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={additional.other.apis}
              onChange={(e) =>
                updateAdditional({
                  other: { ...additional.other, apis: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-jira-darkBlue">{t('additional.apisTitle')}</div>
              <div className="text-xs text-jira-textSecondary">
                {t('additional.apisDesc')}
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={additional.other.licenses}
              onChange={(e) =>
                updateAdditional({
                  other: { ...additional.other, licenses: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-jira-darkBlue">{t('additional.licensesTitle')}</div>
              <div className="text-xs text-jira-textSecondary">
                {t('additional.licensesDesc')}
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
