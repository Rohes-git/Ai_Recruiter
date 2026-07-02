/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, TrendingUp, BarChart3, CheckSquare } from 'lucide-react';

interface DashboardSummaryProps {
  totalCandidates: number;
  highestMatch: number;
  avgMatch: number;
  isComplete: boolean;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  totalCandidates,
  highestMatch,
  avgMatch,
  isComplete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Candidates Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            +12 New
          </span>
        </div>
        <p className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
          {totalCandidates}
        </p>
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Total Candidates</p>
      </div>

      {/* Highest Match Score Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center text-[#14B8A6]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            98th %tile
          </span>
        </div>
        <p className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
          {highestMatch}%
        </p>
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Highest Match Score</p>
      </div>

      {/* Average Match Score Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#64748B] bg-slate-100 border border-[#E2E8F0] px-2.5 py-1 rounded-full uppercase tracking-wider">
            Global Avg
          </span>
        </div>
        <p className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
          {avgMatch}%
        </p>
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Average Match Score</p>
      </div>

      {/* Analysis Completed Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
            <CheckSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Stable AI
          </span>
        </div>
        <p className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
          {isComplete ? '100%' : 'Pending'}
        </p>
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Analysis Completed</p>
      </div>
    </div>
  );
};
