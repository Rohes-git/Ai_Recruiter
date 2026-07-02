/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Bookmark,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  AlertTriangle,
  FolderDot,
  FileDown,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Candidate } from '../types';

interface CandidateDetailsDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleInterview: (name: string) => void;
  onDownloadReport: (name: string) => void;
}

export const CandidateDetailsDrawer: React.FC<CandidateDetailsDrawerProps> = ({
  candidate,
  isOpen,
  onClose,
  onScheduleInterview,
  onDownloadReport,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!candidate) return null;

  const getRecommendationStyle = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]';
      case 'Good Match':
        return 'bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]';
      case 'Neutral':
        return 'bg-slate-100 border-slate-200 text-[#64748B]';
      default:
        return 'bg-red-500/10 border-red-500/20 text-red-500';
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Semi-transparent dark overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Floating sliding sheet */}
      <div
        className={`relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header section with candidate primary context */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-start justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#CBD5E1] bg-[#E2E8F0] shadow-sm">
              <img
                className="w-full h-full object-cover"
                src={candidate.avatarUrl}
                alt={candidate.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-sans font-bold text-base text-[#0F172A] leading-tight">
                  {candidate.name}
                </h2>
                <span className="bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Rank #{candidate.rank}
                </span>
                <span
                  className={`border text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getRecommendationStyle(
                    candidate.recommendation
                  )}`}
                >
                  {candidate.recommendation}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#64748B] mt-1">
                {candidate.experienceYears} Years Experience • {candidate.education.split(',')[0]}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] text-slate-400 hover:text-[#0F172A] flex items-center justify-center hover:shadow-sm hover:scale-105 transition-all focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body with custom responsive spacing */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Section 1: Core AI score matching visualization */}
          <section className="bg-[#F8FAFC]/50 border border-[#E2E8F0] p-5 rounded-xl relative overflow-hidden shadow-sm">
            <div className="absolute right-4 top-4 text-[#2563EB] opacity-10">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-[10px] font-bold tracking-wider text-[#2563EB] uppercase mb-3 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Core AI Assessment Match
            </h3>

            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {candidate.matchScore}%
                </p>
                <p className="text-xs font-medium text-[#64748B] mt-0.5">Overall Fit Competency</p>
              </div>
              <div className="w-2/3 max-w-[280px]">
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${candidate.matchScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E2E8F0] mt-4 pt-3.5">
              <p className="text-xs text-[#0F172A] leading-relaxed font-medium italic">
                "{candidate.aiDetailedAnalysis.overallMatch}"
              </p>
            </div>
          </section>

          {/* Section 2: Overall Strengths and Areas of Growth */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/10 p-4 rounded-lg">
              <h4 className="text-[#22C55E] font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Key Strengths
              </h4>
              <ul className="space-y-2.5">
                {candidate.aiDetailedAnalysis.strengths.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#64748B] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0 mt-1.5" />
                    {st}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Growth / Weaknesses */}
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-lg">
              <h4 className="text-amber-700 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Areas for Growth
              </h4>
              <ul className="space-y-2.5">
                {candidate.aiDetailedAnalysis.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#64748B] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    {wk}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Skill Matching comparison */}
          <section className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Technical Skill Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Matching Skills */}
              <div className="border border-[#E2E8F0] rounded-lg p-4">
                <p className="text-xs font-bold text-[#0F172A] mb-2.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span> Verified Matching Skills ({candidate.aiDetailedAnalysis.matchingSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.aiDetailedAnalysis.matchingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 px-2 py-0.5 rounded text-[11px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="border border-[#E2E8F0] rounded-lg p-4">
                <p className="text-xs font-bold text-[#0F172A] mb-2.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Missing / Unverified Skills ({candidate.aiDetailedAnalysis.missingSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.aiDetailedAnalysis.missingSkills.length === 0 ? (
                    <span className="text-xs text-[#64748B] italic">None detected</span>
                  ) : (
                    candidate.aiDetailedAnalysis.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-amber-500/10 text-amber-700 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Experience Analysis */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Professional History Analysis
            </h4>
            <div className="bg-[#F8FAFC]/50 border border-[#E2E8F0] p-4 rounded-lg">
              <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                {candidate.aiDetailedAnalysis.experienceAnalysis}
              </p>
            </div>
          </section>

          {/* Section 5: Project Relevance Timeline */}
          <section className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <FolderDot className="w-4 h-4" /> Highlighted Project Relevance
            </h4>
            <div className="space-y-3">
              {candidate.aiDetailedAnalysis.projectRelevance.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-lg shadow-sm transition-all flex gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F172A] mb-0.5">{proj.name}</h5>
                    <p className="text-xs text-[#64748B] leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Education */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Academic Alignment
            </h4>
            <div className="flex gap-3 p-4 border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">{candidate.education}</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  {candidate.aiDetailedAnalysis.educationAnalysis}
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Recruiter Recommendations */}
          <section className="border-t border-[#E2E8F0] pt-6">
            <div className="bg-[#0F172A] text-white rounded-xl p-5 relative overflow-hidden shadow-sm">
              <div className="absolute right-4 top-4 text-white/5">
                <Bookmark className="w-12 h-12" />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Final Recruiter Summary
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {candidate.aiDetailedAnalysis.recruiterRecommendation}
              </p>
            </div>
          </section>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
          <button
            onClick={() => onDownloadReport(candidate.name)}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FileDown className="w-4 h-4" /> Download Individual Report
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => onScheduleInterview(candidate.name)}
              className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-md shadow-[#2563EB]/15 hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> Schedule Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
