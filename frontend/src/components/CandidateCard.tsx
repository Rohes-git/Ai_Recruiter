/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Briefcase, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onViewDetails,
}) => {
  const getBadgeStyle = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20';
      case 'Good Match':
        return 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20';
      case 'Neutral':
        return 'bg-slate-100 text-[#64748B] border border-slate-200';
      default:
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      {/* Subtle indicator bar on left for top tiers */}
      {candidate.matchScore >= 80 && (
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#2563EB]"></div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Left Side: Avatar, Name, and Tags */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#CBD5E1] bg-[#E2E8F0] shadow-sm">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={candidate.avatarUrl}
                alt={candidate.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white border border-[#E2E8F0] rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-extrabold text-[#0F172A]">#{candidate.rank}</span>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="font-sans font-semibold text-base text-[#0F172A] leading-tight group-hover:text-[#2563EB] transition-colors">
                {candidate.name}
              </h3>
              <span className="bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                Rank #{candidate.rank}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getBadgeStyle(candidate.recommendation)}`}>
                {candidate.recommendation}
              </span>
            </div>
            
            <p className="text-xs text-[#64748B] leading-relaxed font-medium line-clamp-2 pr-4 mb-2">
              {candidate.shortSummary}
            </p>

            {/* Quick Experience / Education Badges */}
            <div className="flex flex-wrap items-center gap-3.5 text-[11px] text-[#64748B] font-medium">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#64748B]" /> {candidate.experienceYears} yrs experience
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1 truncate max-w-[240px]">
                <GraduationCap className="w-3.5 h-3.5 text-[#64748B]" /> {candidate.education.split(',')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Score Progress Meter and CTA Trigger */}
        <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto border-t lg:border-t-0 border-[#E2E8F0] pt-4 lg:pt-0 shrink-0">
          {/* Score Meter */}
          <div className="w-40">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">AI MATCH SCORE</span>
              <span className="text-[#2563EB] font-extrabold">{candidate.matchScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full"
                style={{ width: `${candidate.matchScore}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => onViewDetails(candidate)}
            className="px-4 py-2 bg-white hover:bg-[#2563EB] hover:text-white text-[#2563EB] border border-[#E2E8F0] hover:border-[#2563EB] font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1 shrink-0 group-hover:scale-105"
          >
            <Eye className="w-4 h-4" /> View Details <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Tags line beneath */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, 5).map((skill) => (
          <span key={skill} className="bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] border border-[#E2E8F0] px-2 py-0.5 rounded text-[10px] font-semibold transition-colors">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 5 && (
          <span className="bg-[#F8FAFC] text-[#64748B] px-2 py-0.5 rounded text-[10px] font-semibold">
            +{candidate.skills.length - 5} more
          </span>
        )}
      </div>
    </div>
  );
};
