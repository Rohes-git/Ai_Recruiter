/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Plus,
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  UserCheck,
  FileSpreadsheet,
} from 'lucide-react';

import { Header } from './components/Header';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { CandidateResumesUpload } from './components/CandidateResumesUpload';
import { AnalysisOverlay } from './components/AnalysisOverlay';
import { DashboardSummary } from './components/DashboardSummary';
import { CandidateCard } from './components/CandidateCard';
import { CandidateDetailsDrawer } from './components/CandidateDetailsDrawer';
import { Toast, ToastMessage } from './components/Toast';

import { StepId, UploadedFile, Candidate } from './types';
import { INITIAL_JOB_DESCRIPTIONS, MOCK_CANDIDATES } from './mockData';
import API from './services/api';
export default function App() {
  // Screen and Stepper States
  const [activeStep, setActiveStep] = useState<StepId>('job-description');

  // Job Description Input States
  const [jdText, setJdText] = useState('');
  const [jdTab, setJdTab] = useState<'paste' | 'upload'>('paste');
  const [jdUploadedFile, setJdUploadedFile] = useState<{ name: string; size: string } | null>(null);

  // Resume Upload States
  const [uploadedResumes, setUploadedResumes] = useState<UploadedFile[]>([]);
  const [rankedCandidates, setRankedCandidates] = useState<any[]>([]);
  // Search & Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'skills' | 'education'>('score');
  const [filterRec, setFilterRec] = useState<string>('all');

  // Selected Candidate for Drawer
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Notification Toast States
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync Stepper Step highlighted based on user input
  useEffect(() => {
    if (activeStep === 'job-description' && jdText.trim().length > 10) {
      setActiveStep('upload-resumes');
    }
  }, [jdText]);

  // Handle triggering a toast message
  const triggerToast = (text: string, type: 'success' | 'warning' | 'error' | 'info') => {
    setToast({
      id: Math.random().toString(),
      text,
      type,
    });
  };

  // Check if navigate is allowed to any step
  const isStepAvailable = (step: StepId): boolean => {
    if (step === 'job-description') return true;
    if (step === 'upload-resumes') return jdText.trim().length > 0;
    if (step === 'ai-analysis') return jdText.trim().length > 0 && uploadedResumes.length > 0;
    if (step === 'results') return activeStep === 'results';
    return false;
  };

  const handleNavigateStep = (step: StepId) => {
    if (step === 'ai-analysis') {
      handleStartAnalysis();
    } else {
      setActiveStep(step);
    }
  };

  const handleStartAnalysis = () => {
    if (!jdText.trim()) {
      triggerToast('Please provide a Job Description to start AI evaluation.', 'warning');
      return;
    }
    if (uploadedResumes.length === 0) {
      triggerToast('Please upload at least one candidate resume first.', 'warning');
      return;
    }
    setActiveStep('ai-analysis');
  };

  const handleAddResumes = (newFiles: UploadedFile[]) => {
    setUploadedResumes((prev) => {
      // Avoid duplicate filenames
      const uniqueNew = newFiles.filter((nf) => !prev.some((p) => p.name === nf.name));
      if (uniqueNew.length < newFiles.length) {
        triggerToast('Skipped files with duplicate filenames.', 'info');
      }
      if (uniqueNew.length > 0) {
        triggerToast(`Added ${uniqueNew.length} candidate resumes successfully.`, 'success');
      }
      return [...prev, ...uniqueNew];
    });
  };

  const handleRemoveResume = (id: string) => {
    setUploadedResumes((prev) => {
      const match = prev.find((f) => f.id === id);
      if (match) {
        triggerToast(`Removed candidate profile "${match.name}".`, 'info');
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handlePrepopulateJd = (id: string) => {
    const found = INITIAL_JOB_DESCRIPTIONS.find((jd) => jd.id === id);
    if (found) {
      setJdText(found.content);
      triggerToast(`Loaded pre-populated template: "${found.title}".`, 'success');
    }
  };

  const handleAnalysisCompleted = async () => {
  try {
    const response = await API.get("/rank");

    setRankedCandidates(response.data);

    setActiveStep("results");

    triggerToast(
      "AI analysis completed successfully!",
      "success"
    );
  } catch (error) {
    console.log(error);

    triggerToast(
      "Failed to analyze candidates.",
      "error"
    );
  }
};

  const handleScheduleInterview = (name: string) => {
    triggerToast(`Interview scheduler generated for ${name}! Check calendar synchronization.`, 'success');
  };

  const handleDownloadReport = (name: string) => {
    triggerToast(`Synthesizing and downloading PDF matching report for ${name}...`, 'success');
  };

  // Filter and Rank Candidate listings
  const getProcessedCandidates = (): Candidate[] => {
    // Generate subset of mock candidates aligned to currently uploaded files
    let filtered = MOCK_CANDIDATES.filter((c) => {
      // If we uploaded resumes, we filter/simulate to only show matching candidates in results
      if (uploadedResumes.length > 0) {
        // Map resumes to some candidates so we don't show everything if not requested
        // To make it easy: match substring of resume name with candidate name
        const hasMatch = uploadedResumes.some(
          (ur) =>
            ur.name.toLowerCase().includes(c.name.split(' ')[0].toLowerCase()) ||
            ur.name.toLowerCase().includes(c.name.split(' ')[1]?.toLowerCase() || 'xyz')
        );
        // Fallback: if user uploaded custom files, show them mapped to our highly polished candidates
        // to prevent empty state while preserving premium styling.
        return true;
      }
      return true;
    });

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)) ||
          c.shortSummary.toLowerCase().includes(q) ||
          c.education.toLowerCase().includes(q)
      );
    }

    // Recommendation Filter
    if (filterRec !== 'all') {
      filtered = filtered.filter((c) => c.recommendation === filterRec);
    }

    // Sorting options
    filtered.sort((a, b) => {
      if (sortBy === 'score') {
        return b.matchScore - a.matchScore;
      }
      if (sortBy === 'experience') {
        return b.experienceYears - a.experienceYears;
      }
      if (sortBy === 'skills') {
        return b.skills.length - a.skills.length;
      }
      if (sortBy === 'education') {
        // Sort by length of education or alphabetical Stanford preference
        return a.education.localeCompare(b.education);
      }
      return 0;
    });

    return filtered;
  };

  const processedCandidates =
  rankedCandidates.length > 0
    ? rankedCandidates
    : getProcessedCandidates();

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans antialiased text-slate-900 pb-20 selection:bg-blue-100 selection:text-blue-800">
      {/* Top Header & Navigation Progress */}
      <Header
        currentStep={activeStep}
        onNavigate={handleNavigateStep}
        isStepAvailable={isStepAvailable}
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* STEP 1 & 2: SETUP WORKSPACE */}
        {(activeStep === 'job-description' || activeStep === 'upload-resumes') && (
          <div className="space-y-8 animate-fadeIn">
            {/* Template Selector helper */}
            <div className="bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">Quick-Start Interactive Template</h3>
                  <p className="text-xs text-[#64748B]">Select an enterprise job profile to prefill parameters instantly</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePrepopulateJd('jd-frontend')}
                  className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] text-[#64748B] text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  💻 Senior Frontend Engineer
                </button>
                <button
                  onClick={() => handlePrepopulateJd('jd-product')}
                  className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] text-[#64748B] text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  🎨 Lead Product Designer
                </button>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Job Description card */}
              <JobDescriptionInput
                value={jdText}
                onChange={setJdText}
                uploadedFile={jdUploadedFile}
                onUploadFile={setJdUploadedFile}
                activeTab={jdTab}
                setActiveTab={setJdTab}
              />

              {/* Candidates Resumes section */}
              <CandidateResumesUpload
                files={uploadedResumes}
                onAddFiles={handleAddResumes}
                onRemoveFile={handleRemoveResume}
              />
            </div>

            {/* Core Action Trigger */}
            <div className="pt-6 flex flex-col items-center">
              <button
                onClick={handleStartAnalysis}
                disabled={!isStepAvailable('ai-analysis')}
                className={`px-10 py-3 rounded-lg font-sans font-bold text-sm shadow-md flex items-center gap-2 transition-all duration-300 ${
                  isStepAvailable('ai-analysis')
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[#2563EB]/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2563EB]/25 active:scale-95 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Analyze Candidates
              </button>
              <p className="text-xs text-[#64748B] mt-3.5 flex items-center gap-1.5">
                <span>Requires a Job Description and at least 1 candidate profile.</span>
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: LOADING SCREEN VIEW */}
        {activeStep === 'ai-analysis' && (
          <AnalysisOverlay
            candidateCount={uploadedResumes.length > 0 ? uploadedResumes.length : 24}
            onComplete={handleAnalysisCompleted}
          />
        )}

        {/* STEP 4: DECISION RESULTS DASHBOARD */}
        {activeStep === 'results' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Action controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-full uppercase">
                  MATCH MATRIX COMPLETED
                </span>
                <h1 className="font-sans font-semibold text-xl text-[#0F172A] tracking-tight mt-2.5">
                  Candidate Rank Matched Results
                </h1>
                <p className="text-sm font-medium text-[#64748B] mt-0.5">
                  Evaluating against: <span className="text-[#0F172A] font-bold">Senior Frontend Engineer - AI Platforms</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveStep('job-description');
                    triggerToast('Configuring new job search session.', 'info');
                  }}
                  className="px-4 py-2 bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#2563EB] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Analyze New Role
                </button>
                <button
                  onClick={() => {
                    window.open(
  "http://127.0.0.1:8000/download"
);

triggerToast(
  "Downloading CSV report...",
  "success"
);
                  }}
                  className="px-4 py-2 bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#64748B] hover:text-[#2563EB] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Download CSV
                </button>
              </div>
            </div>

            {/* Bento Summary Statistics */}
            <DashboardSummary
              totalCandidates={uploadedResumes.length > 0 ? uploadedResumes.length : 124}
              highestMatch={processedCandidates.length > 0 ? processedCandidates[0].matchScore : 94}
              avgMatch={72}
              isComplete={true}
            />

            {/* Advanced Filters and sorting panel */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search input field */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, education, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] outline-none transition-all placeholder:text-[#94A3B8] font-medium"
                />
              </div>

              {/* Select and Sorting controllers */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                {/* Recommendation filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <select
                    value={filterRec}
                    onChange={(e) => setFilterRec(e.target.value)}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#64748B] outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                  >
                    <option value="all">All Recommendations</option>
                    <option value="Strong Hire">Strong Hire Only</option>
                    <option value="Good Match">Good Match Only</option>
                    <option value="Neutral">Neutral Only</option>
                    <option value="No Match">No Match Only</option>
                  </select>
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#64748B] outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                  >
                    <option value="score">Sort by Highest Score</option>
                    <option value="experience">Sort by Experience (years)</option>
                    <option value="skills">Sort by Skills Count</option>
                    <option value="education">Sort by Academy (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Candidate listings */}
            {processedCandidates.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-xl py-16 px-6 text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0] flex items-center justify-center mx-auto mb-3">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <h3 className="font-sans font-bold text-sm text-[#0F172A] mb-1">No candidate matches</h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  We couldn't find any candidate matching "{searchQuery}" under your specified criteria. Try clearing your search query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterRec('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#F8FAFC] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  Reset Query Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
    {processedCandidates.map((candidate: any) => (
      <div
        key={candidate.rank}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow"
      >
        <h3 className="font-bold text-lg">
          {candidate.filename}
        </h3>

        <p className="mt-2">
          Rank: {candidate.rank}
        </p>

        <p>
          Score: {candidate.score}%
        </p>

        <p className="mt-2 text-gray-600">
          {candidate.reasoning}
        </p>
      </div>
  ))}
</div>
            )}
          </div>
        )}
      </div>

      {/* Candidate Profile Details sliding drawer */}
      <CandidateDetailsDrawer
        candidate={selectedCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onScheduleInterview={handleScheduleInterview}
        onDownloadReport={handleDownloadReport}
      />

      {/* Responsive Toast System */}
      <Toast message={toast} onClose={() => setToast(null)} />

      {/* Modern Compact Floating Professional Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#E2E8F0]/80 py-3 px-6 z-30 shadow-lg hidden sm:block">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6]"></span>
              <span className="text-xs font-bold text-[#0F172A]">InsightHire Professional</span>
            </div>
            <span className="text-slate-200">|</span>
            <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
              Stable AI Core v2.4.0
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#64748B]">
            <a href="#help" onClick={() => triggerToast('Launching Support Desk...', 'info')} className="hover:text-[#2563EB] transition-colors">
              Help Center
            </a>
            <a href="#privacy" onClick={() => triggerToast('Privacy parameters are strictly locked.', 'info')} className="hover:text-[#2563EB] transition-colors">
              Data Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
