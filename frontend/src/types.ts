/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  rank: number;
  matchScore: number;
  recommendation: 'Strong Hire' | 'Good Match' | 'Neutral' | 'No Match';
  experienceYears: number;
  skills: string[];
  education: string;
  shortSummary: string;
  aiDetailedAnalysis: {
    overallMatch: string;
    strengths: string[];
    weaknesses: string[];
    matchingSkills: string[];
    missingSkills: string[];
    experienceAnalysis: string;
    projectRelevance: { name: string; desc: string }[];
    educationAnalysis: string;
    recruiterRecommendation: string;
  };
}

export type StepId = 'job-description' | 'upload-resumes' | 'ai-analysis' | 'results';

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
}
