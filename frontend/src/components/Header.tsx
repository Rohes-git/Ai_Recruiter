/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Brain, CheckCircle, UserCheck } from 'lucide-react';
import { StepId } from '../types';

interface HeaderProps {
  currentStep: StepId;
  onNavigate?: (step: StepId) => void;
  isStepAvailable?: (step: StepId) => boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  isStepAvailable,
}) => {
  const steps: { id: StepId; label: string; number: number }[] = [
    { id: 'job-description', label: 'Job Description', number: 1 },
    { id: 'upload-resumes', label: 'Upload Resumes', number: 2 },
    { id: 'ai-analysis', label: 'AI Analysis', number: 3 },
    { id: 'results', label: 'Results', number: 4 },
  ];

  const getStepIcon = (stepId: StepId, index: number) => {
    // Return step number or a checkmark if completed
    const currentIdx = steps.findIndex((s) => s.id === currentStep);
    if (index < currentIdx) {
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    }
    if (stepId === 'ai-analysis') {
      return <Brain className="w-5 h-5" />;
    }
    return <span className="text-sm font-semibold">{index + 1}</span>;
  };

  return (
    <div className="w-full">
      {/* Upper Navigation Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-lg italic shadow-sm">
              I
            </div>
            <div>
              <h1 className="font-sans font-bold text-base text-[#0F172A] leading-none tracking-tight">InsightHire</h1>
              <p className="text-[11px] text-[#64748B] font-medium mt-0.5">AI-Powered Hiring Assistant</p>
            </div>
            <span className="ml-3 px-2 py-0.5 bg-[#14B8A6]/10 text-[#14B8A6] text-[10px] font-bold rounded-full border border-[#14B8A6]/20 uppercase tracking-wider">
              AI Ready
            </span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => onNavigate && onNavigate('job-description')}
                className="text-xs font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('results')}
                disabled={currentStep !== 'results'}
                className="text-xs font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Results
              </button>
            </nav>

            <div className="h-6 w-px bg-[#E2E8F0]"></div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#CBD5E1] bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B]">
                JS
              </div>
              <span className="text-xs font-semibold text-[#64748B] hidden md:inline">S. Jenkins</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper Progress Bar */}
      <div className="bg-white border-b border-[#E2E8F0] py-6">
        <div className="max-w-4xl mx-auto px-8">
          <div className="relative flex items-center justify-between">
            {/* Background progress track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 h-px bg-[#E2E8F0] -z-10"></div>

            {/* Dynamic visual connection line */}
            <div
              className="absolute left-[12.5%] top-1/2 -translate-y-1/2 h-px bg-[#2563EB] -z-10 transition-all duration-500"
              style={{
                width: `${
                  (steps.findIndex((s) => s.id === currentStep) / (steps.length - 1)) * 75
                }%`,
              }}
            ></div>

            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex((s) => s.id === currentStep) > idx;
              const isClickable = onNavigate && isStepAvailable && isStepAvailable(step.id);

              return (
                <button
                  key={step.id}
                  id={`step-btn-${step.id}`}
                  disabled={!isClickable}
                  onClick={() => isClickable && onNavigate(step.id)}
                  className={`flex flex-col items-center flex-1 z-10 focus:outline-none transition-all ${
                    isClickable ? 'cursor-pointer group' : 'cursor-default'
                  } ${!isActive && !isCompleted ? 'opacity-50' : 'opacity-100'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 scale-105'
                        : isCompleted
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-[#E2E8F0] text-[#64748B]'
                    } ${isClickable && !isActive ? 'group-hover:border-[#2563EB] group-hover:text-[#2563EB]' : ''}`}
                  >
                    {isCompleted ? <CheckCircle className="w-4 h-4 text-white" /> : step.number}
                  </div>
                  <span
                    className={`text-xs mt-2 transition-colors ${
                      isActive
                        ? 'text-[#2563EB] font-semibold'
                        : isCompleted
                        ? 'text-slate-700 font-medium'
                        : 'text-[#64748B] font-medium'
                    } ${isClickable && !isActive ? 'group-hover:text-[#2563EB]' : ''}`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
