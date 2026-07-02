/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle, Database, FileText, Binary } from 'lucide-react';

interface AnalysisOverlayProps {
  onComplete: () => void;
  candidateCount: number;
}

const statusMessages = [
  'Uploading candidates to vector workspace...',
  'Reading core job description parameters...',
  'Understanding required vs. optional skills...',
  'Analyzing candidate resumes & work histories...',
  'Evaluating project relevance and matching scores...',
  'Comparing candidate relevance metrics...',
  'Generating contextual AI summarizations...',
  'Ranking profiles for decision dashboard...',
];

export const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({
  onComplete,
  candidateCount,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment progress periodically with random intervals
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        const addition = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + addition, 100);
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Map progress percentage to status messages
    const sectionSize = 100 / statusMessages.length;
    const currentMsgIndex = Math.min(
      Math.floor(progress / sectionSize),
      statusMessages.length - 1
    );
    setStatusIdx(currentMsgIndex);
  }, [progress]);

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isDone, onComplete]);

  // SVG dimensions for the circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl transition-all duration-500">
      <div className="w-full max-w-lg mx-4">
        {/* Core Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl p-8 sm:p-10 flex flex-col items-center relative overflow-hidden">
          {/* Elegant active state top line indicator */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-[#2563EB]"></div>

          {/* Glowing Animated Ring */}
          <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-[#E2E8F0]"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-[#2563EB] transition-all duration-300 ease-out"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Glowing Center AI Icon */}
            <div className="absolute inset-0 m-auto w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center border border-[#E2E8F0]">
              <div className="relative">
                <BrainCircuit className="w-10 h-10 text-[#2563EB] animate-pulse" />
                <Sparkles className="w-4 h-4 text-teal-500 absolute -top-1.5 -right-1.5 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center w-full mb-8">
            <h2 className="font-sans font-bold text-lg text-[#0F172A] mb-2">
              {isDone ? 'Ranking Formulated!' : 'Formulating Deep Analytics'}
            </h2>
            <div className="min-h-[40px] px-4 flex items-center justify-center">
              <p className="text-xs font-semibold text-[#64748B] text-center animate-pulse leading-snug">
                {statusMessages[statusIdx]}
              </p>
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="w-full space-y-3.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#64748B] tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-[#2563EB]" /> Neural processing
              </span>
              <span className="text-[#2563EB] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Diagnostic Context Tags */}
          <div className="mt-8 grid grid-cols-2 gap-3.5 w-full">
            <div className="flex items-center gap-2.5 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <FileText className="w-4 h-4 text-teal-600" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-bold text-[#64748B]">Context Source</p>
                <p className="text-xs font-semibold text-[#0F172A] truncate">Job Description</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <Database className="w-4 h-4 text-[#2563EB]" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-bold text-[#64748B]">Parsed Scope</p>
                <p className="text-xs font-semibold text-[#0F172A] truncate">{candidateCount} Candidates</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-4 text-xs text-white/90 font-medium">
          InsightHire processes natural resume language using LLM semantic comprehension.
        </p>
      </div>
    </div>
  );
};
