'use client';

import { useState, useEffect, useRef } from 'react';
import { useCalculatorStore } from '@/store/calculator';
import ProjectTypeSelector from '@/components/ProjectTypeSelector';
import Step1Team from '@/components/steps/Step1Team';
import Step2Design from '@/components/steps/Step2Design';
import Step3Features from '@/components/steps/Step3Features';
import Step4TechStack from '@/components/steps/Step4TechStack';
import Step5Testing from '@/components/steps/Step5Testing';
import Step6Additional from '@/components/steps/Step6Additional';
import Step7Summary from '@/components/steps/Step7Summary';
import { trackCalcStarted } from '@/utils/gtm';
import * as FiIcons from 'react-icons/fi';
import Link from 'next/link';
import { SiFacebook, SiInstagram, SiThreads, SiYoutube } from 'react-icons/si';

const FiArrowLeft = FiIcons.FiArrowLeft;
const FiArrowRight = FiIcons.FiArrowRight;
const FiHome = FiIcons.FiHome;
const FiRefreshCw = FiIcons.FiRefreshCw;
const FiZap = FiIcons.FiZap;
const FiCheckCircle = FiIcons.FiCheckCircle;
const Fi = FiIcons;

const STEPS = [
  { id: 0, title: 'Team', component: Step1Team },
  { id: 1, title: 'Design', component: Step2Design },
  { id: 2, title: 'Features', component: Step3Features },
  { id: 3, title: 'Tech Stack', component: Step4TechStack },
  { id: 4, title: 'Testing', component: Step5Testing },
  { id: 5, title: 'Additional', component: Step6Additional },
  { id: 6, title: 'Results', component: Step7Summary },
];

export default function CalculatorClient() {
  const { currentStep, setCurrentStep, resetCalculator, team } = useCalculatorStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showProjectTypeSelector, setShowProjectTypeSelector] = useState(false);
  const hasTrackedStarted = useRef(false);

  // Reset calculator when page is first loaded
  useEffect(() => {
    resetCalculator();
    setShowProjectTypeSelector(false);
    hasTrackedStarted.current = false; // Reset tracking when calculator is reset
  }, []); // Empty dependency array ensures this runs only once on mount

  // Track calc_started when user reaches step 1 (either by clicking Next or navigating)
  useEffect(() => {
    if (currentStep === 1 && team.length > 0 && !hasTrackedStarted.current) {
      trackCalcStarted();
      hasTrackedStarted.current = true;
    }
  }, [currentStep, team.length]);

  const CurrentStepComponent = STEPS[currentStep].component;

  const handleCloseProjectType = () => {
    setShowProjectTypeSelector(false);
  };

  const handleOpenProjectType = () => {
    setShowProjectTypeSelector(true);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    resetCalculator();
    setShowResetConfirm(false);
    setShowProjectTypeSelector(false);
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return team.length > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-jira-background">
      <header className="bg-white border-b border-jira-border sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 text-jira-textSecondary hover:text-jira-blue transition-colors text-xs sm:text-sm">
              <FiHome className="text-sm sm:text-base" />
              <span className="hidden xs:inline">Home</span>
            </Link>
            
            <h1 className="text-xs sm:text-sm font-semibold text-jira-darkBlue text-center flex-1 px-2">
              <span className="hidden sm:inline">Development Cost Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </h1>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center space-x-1 text-jira-textSecondary hover:text-jira-error transition-colors text-xs sm:text-sm"
            >
              <FiRefreshCw className="text-sm sm:text-base" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {!showProjectTypeSelector && (
      <div className="bg-white border-b border-jira-border overflow-x-auto">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-0.5 sm:gap-1 min-w-max">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  index === currentStep
                    ? 'text-jira-blue border-jira-blue'
                    : index < currentStep
                    ? 'text-jira-textSecondary border-transparent hover:border-gray-300'
                    : 'text-gray-400 border-transparent'
                }`}
              >
                {index < currentStep ? (
                  <Fi.FiCheckCircle className="text-jira-success text-sm sm:text-base" />
                ) : (
                  <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs ${
                    index === currentStep 
                      ? 'bg-jira-blue text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      )}

      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {!showProjectTypeSelector && currentStep === 0 && team.length === 0 && (
          <div className="card bg-primary-50 border border-jira-blue mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 flex-1">
                <Fi.FiZap className="text-base sm:text-lg text-jira-blue flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-xs sm:text-sm text-jira-darkBlue">Quick Start with Templates</h3>
                  <p className="text-xs text-jira-textSecondary">
                    Use a pre-configured template for your project type
                  </p>
                </div>
              </div>
              <button
                onClick={handleOpenProjectType}
                className="btn-primary whitespace-nowrap w-full sm:w-auto text-xs sm:text-sm"
              >
                Browse Templates
              </button>
            </div>
          </div>
        )}

        <div className="step-card">
          {showProjectTypeSelector ? (
            <ProjectTypeSelector onSkip={handleCloseProjectType} />
          ) : (
            <CurrentStepComponent />
          )}
        </div>

        {!showProjectTypeSelector && (
          <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 max-w-5xl mx-auto gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm sm:text-base order-2 sm:order-1"
              >
                <FiArrowLeft className="text-base sm:text-lg" />
                <span>Back</span>
              </button>

              <button
                onClick={handleOpenProjectType}
                className="btn-secondary text-xs sm:text-sm flex items-center justify-center space-x-2 order-3 sm:order-2 hidden sm:flex"
              >
                <FiArrowRight className="text-sm sm:text-base" />
                <span>Use Template</span>
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base order-1 sm:order-3"
                >
                  <span>Next</span>
                  <FiArrowRight className="text-base sm:text-lg" />
                </button>
              ) : (
                <Link href="/" className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base order-1 sm:order-3">
                  <span>Finish</span>
                  <FiArrowRight className="text-base sm:text-lg" />
                </Link>
              )}
            </div>

            {currentStep === 0 && team.length === 0 && (
              <div className="text-center mt-4 text-jira-warning font-medium text-sm">
                Add at least one team member to continue
              </div>
            )}
          </>
        )}
      </main>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-jira-lg max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-3 text-jira-darkBlue">Reset Calculation?</h3>
            <p className="text-jira-textSecondary mb-6 text-sm">
              All entered data will be lost. This action is irreversible.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-jira-error text-white rounded font-medium hover:bg-red-700 transition-colors shadow-jira"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-jira-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-jira-blue rounded flex items-center justify-center">
                  <FiIcons.FiGrid className="text-2xl text-white" />
                </div>
                <span className="text-2xl font-bold text-jira-darkBlue">Projecto</span>
              </div>
              <p className="text-sm text-jira-textSecondary leading-relaxed max-w-xs mb-4">
                Professional software project cost estimation and planning tool.
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.facebook.com/people/Projecto-Calculator/61586748986123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="text-xl" />
                </a>
                <a
                  href="https://www.instagram.com/projecto_calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="text-xl" />
                </a>
                <a
                  href="https://www.threads.com/@projecto_calculator?igshid=NTc4MTIwNjQ2YQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="Threads"
                >
                  <SiThreads className="text-xl" />
                </a>
                <a
                  href="https://www.youtube.com/@projecto_calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jira-textSecondary hover:text-jira-blue transition-colors"
                  aria-label="YouTube"
                >
                  <SiYoutube className="text-xl" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Contact
                  </Link>
                </li>
                <li><Link href="/about" className="text-jira-textSecondary hover:text-jira-blue transition-colors">About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/blog/privacy-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/blog/terms-of-service" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li><Link href="/cookie-policy" className="text-jira-textSecondary hover:text-jira-blue transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-jira-darkBlue font-semibold mb-4 text-sm uppercase tracking-wide">Cost Estimation Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3">
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/blog/project-cost-calculation" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Project Cost Calculation
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/software-development-cost" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Software Development Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/cost-for-application-development" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Application Development Cost
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/blog/estimate-software-development-cost" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Estimate Development Cost
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/app-cost-calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      App Cost Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/website-cost-calculator" className="text-jira-textSecondary hover:text-jira-blue transition-colors">
                      Website Cost Calculator
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-jira-border my-8"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-jira-textSecondary gap-3 sm:gap-0">
            <div>
              <p>© 2025 Projecto. All rights reserved.</p>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="/blog/privacy-policy" className="hover:text-jira-blue transition-colors">
                Privacy
              </Link>
              <span className="text-jira-border">•</span>
              <Link href="/blog/terms-of-service" className="hover:text-jira-blue transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

