'use client';

import { useTranslations } from 'next-intl';
import { useCalculatorStore } from '@/store/calculator';
import { DesignComplexity } from '@/types/calculator';
import * as FiIcons from 'react-icons/fi';

const FiLayers = FiIcons.FiLayers;
const FiMonitor = FiIcons.FiMonitor;
const FiImage = FiIcons.FiImage;
const FiZap = FiIcons.FiZap;
const FiBox = FiIcons.FiBox;
const FiSmartphone = FiIcons.FiSmartphone;
const FiTablet = FiIcons.FiTablet;
const FiCheck = FiIcons.FiCheck;

export default function Step2Design() {
  const t = useTranslations('calculator');
  const { design, updateDesign } = useCalculatorStore();

  const complexityOptions: { value: DesignComplexity; label: string; description: string; icon: any }[] = [
    { value: 'simple', label: t('design.complexitySimple'), description: t('design.complexitySimpleDesc'), icon: FiMonitor },
    { value: 'medium', label: t('design.complexityMedium'), description: t('design.complexityMediumDesc'), icon: FiLayers },
    { value: 'complex', label: t('design.complexityComplex'), description: t('design.complexityComplexDesc'), icon: FiBox },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <FiLayers className="text-xl text-jira-blue" />
        <div>
          <h2 className="text-lg font-semibold text-jira-darkBlue">{t('design.title')}</h2>
          <p className="text-jira-textSecondary text-xs">
            {t('design.subtitle')}
          </p>
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('design.complexityLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {complexityOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => updateDesign({ complexity: option.value })}
                className={`p-3 rounded border transition-all text-left ${
                  design.complexity === option.value
                    ? 'border-jira-blue bg-primary-50 shadow-jira'
                    : 'border-jira-border hover:border-jira-blue hover:shadow-jira'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className={`text-base ${design.complexity === option.value ? 'text-jira-blue' : 'text-jira-textSecondary'}`} />
                  <div className={`font-medium text-sm ${design.complexity === option.value ? 'text-jira-blue' : 'text-jira-darkBlue'}`}>{option.label}</div>
                </div>
                <div className="text-xs text-jira-textSecondary">{option.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('design.screensLabel')}</label>
        <input
          type="number"
          value={design.screensCount}
          onChange={(e) => updateDesign({ screensCount: Number(e.target.value) })}
          className="input-field mt-1 text-sm"
          min="1"
          placeholder={t('design.screensPlaceholder')}
        />
        <p className="text-xs text-jira-textSecondary mt-1">
          {t('design.screensHint')}
        </p>
      </div>

      <div className="card">
        <label className="label text-xs">{t('design.additionalServicesLabel')}</label>
        <div className="space-y-3 mt-2">
          <div className="p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={design.includeLogo}
                onChange={(e) => updateDesign({ includeLogo: e.target.checked })}
                className="checkbox-field"
              />
              <FiImage className="text-lg text-jira-textSecondary" />
              <div className="flex-1">
                <div className="font-medium text-sm text-jira-darkBlue">{t('design.logoTitle')}</div>
                <div className="text-xs text-jira-textSecondary">{t('design.logoDefault')}</div>
              </div>
            </label>
            {design.includeLogo && (
              <div className="mt-2 ml-8">
                <label className="label text-xs">{t('design.customHoursLabel')}</label>
                <input
                  type="number"
                  value={design.customHours?.logo || ''}
                  onChange={(e) =>
                    updateDesign({
                      customHours: {
                        ...design.customHours,
                        logo: e.target.value ? Number(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="36"
                  min="1"
                  className="input-field text-sm mt-1"
                />
              </div>
            )}
          </div>

          <div className="p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={design.includeIcons}
                onChange={(e) => updateDesign({ includeIcons: e.target.checked })}
                className="checkbox-field"
              />
              <FiBox className="text-lg text-jira-textSecondary" />
              <div className="flex-1">
                <div className="font-medium text-sm text-jira-darkBlue">{t('design.iconsTitle')}</div>
                <div className="text-xs text-jira-textSecondary">{t('design.iconsDefault')}</div>
              </div>
            </label>
            {design.includeIcons && (
              <div className="mt-2 ml-8">
                <label className="label text-xs">{t('design.customHoursLabel')}</label>
                <input
                  type="number"
                  value={design.customHours?.icons || ''}
                  onChange={(e) =>
                    updateDesign({
                      customHours: {
                        ...design.customHours,
                        icons: e.target.value ? Number(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="54"
                  min="1"
                  className="input-field text-sm mt-1"
                />
              </div>
            )}
          </div>

          <div className="p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={design.includeAnimations}
                onChange={(e) => updateDesign({ includeAnimations: e.target.checked })}
                className="checkbox-field"
              />
              <FiZap className="text-lg text-jira-textSecondary" />
              <div className="flex-1">
                <div className="font-medium text-sm text-jira-darkBlue">{t('design.animationsTitle')}</div>
                <div className="text-xs text-jira-textSecondary">{t('design.animationsDefault')}</div>
              </div>
            </label>
            {design.includeAnimations && (
              <div className="mt-2 ml-8">
                <label className="label text-xs">{t('design.customHoursLabel')}</label>
                <input
                  type="number"
                  value={design.customHours?.animations || ''}
                  onChange={(e) =>
                    updateDesign({
                      customHours: {
                        ...design.customHours,
                        animations: e.target.value ? Number(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="70"
                  min="1"
                  className="input-field text-sm mt-1"
                />
              </div>
            )}
          </div>

          <div className="p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={design.include3D}
                onChange={(e) => updateDesign({ include3D: e.target.checked })}
                className="checkbox-field"
              />
              <FiBox className="text-lg text-jira-textSecondary" />
              <div className="flex-1">
                <div className="font-medium text-sm text-jira-darkBlue">{t('design.threeDTitle')}</div>
                <div className="text-xs text-jira-textSecondary">{t('design.threeDDefault')}</div>
              </div>
            </label>
            {design.include3D && (
              <div className="mt-2 ml-8">
                <label className="label text-xs">{t('design.customHoursLabel')}</label>
                <input
                  type="number"
                  value={design.customHours?.threeD || ''}
                  onChange={(e) =>
                    updateDesign({
                      customHours: {
                        ...design.customHours,
                        threeD: e.target.value ? Number(e.target.value) : undefined,
                      },
                    })
                  }
                  placeholder="100"
                  min="1"
                  className="input-field text-sm mt-1"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <label className="label text-xs">{t('design.responsiveLabel')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={design.responsive.mobile}
              onChange={(e) =>
                updateDesign({
                  responsive: { ...design.responsive, mobile: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <FiSmartphone className="text-lg text-jira-textSecondary" />
            <div className="font-medium text-sm text-jira-darkBlue">{t('design.responsiveMobile')}</div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={design.responsive.tablet}
              onChange={(e) =>
                updateDesign({
                  responsive: { ...design.responsive, tablet: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <FiTablet className="text-lg text-jira-textSecondary" />
            <div className="font-medium text-sm text-jira-darkBlue">{t('design.responsiveTablet')}</div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors border border-transparent hover:border-jira-border">
            <input
              type="checkbox"
              checked={design.responsive.desktop}
              onChange={(e) =>
                updateDesign({
                  responsive: { ...design.responsive, desktop: e.target.checked },
                })
              }
              className="checkbox-field"
            />
            <FiMonitor className="text-lg text-jira-textSecondary" />
            <div className="font-medium text-sm text-jira-darkBlue">{t('design.responsiveDesktop')}</div>
          </label>
        </div>
      </div>
    </div>
  );
}
