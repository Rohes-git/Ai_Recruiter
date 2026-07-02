/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidate } from './types';

export const INITIAL_JOB_DESCRIPTIONS = [
  {
    id: 'jd-frontend',
    title: 'Senior Frontend Engineer - AI Platforms',
    content: `Position Overview:
We are seeking a Senior Frontend Engineer to lead the client-side architecture for our new AI-Powered Analytics platforms. You will be responsible for crafting high-fidelity user interfaces, designing state management systems, and implementing real-time streaming data visualizers.

Key Responsibilities:
• Lead the development of client-side features using React 19, TypeScript, and Tailwind CSS.
• Integrate LLM endpoints (such as Gemini) to build conversational and predictive interfaces.
• Build complex interactive canvases, charts (D3/Recharts), and modern dashboard layouts.
• Optimize application performance, reducing bundle sizes and rendering cycles.
• Collaborate closely with UX/UI designers to establish a reusable, fully accessible design system.

Required Qualifications:
• 6+ years of professional software engineering experience.
• Advanced expertise in React, TypeScript, and modern bundlers (Vite/Webpack).
• Experience integrating AI models, prompt streaming, or interactive AI workflows on the frontend.
• Passion for sleek transitions, animation design (using motion), and accessible typography.
• MS or BS in Computer Science or equivalent practical experience.`
  },
  {
    id: 'jd-product',
    title: 'Lead Product Designer - Enterprise Systems',
    content: `Position Overview:
We are looking for a Lead Product Designer with strong enterprise design experience to redesign our core suite. You will establish a visual language inspired by Notion, Linear, and Microsoft Fluent, prioritizing negative space, modern grid systems, and exceptional typography.

Key Responsibilities:
• Lead research, wireframing, high-fidelity mockups, and interaction design workflows.
• Collaborate with engineers to ensure pixel-perfect Tailwind implementations.
• Standardize accessible styling guidelines across all screen sizes.

Required Qualifications:
• 5+ years of UX/UI Design experience for SaaS, developer tools, or productivity platforms.
• Strong Figma mastery and understanding of front-end layouts.`
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-alex',
    name: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    rank: 1,
    matchScore: 94,
    recommendation: 'Strong Hire',
    experienceYears: 8,
    skills: ['React', 'TypeScript', 'Next.js', 'Vite', 'Gemini API', 'Tailwind CSS', 'Redux', 'D3.js'],
    education: 'MS in Computer Science, Stanford University',
    shortSummary: 'Ex-Google Senior Engineer with 8+ years specializing in React, TypeScript, and Generative AI interface integration.',
    aiDetailedAnalysis: {
      overallMatch: 'Alex Rivera is an exceptional match (94%) for the Senior Frontend Engineer role. His experience at Google Search and Stanford education provides an incredible technical foundation, combined with deep practical experience building AI-powered interfaces.',
      strengths: [
        'Extensive React and TypeScript core knowledge with over 8 years of professional shipping experience.',
        'Proven expertise in AI orchestration, streaming API tokens, and rich interactive layouts.',
        'High familiarity with modern Tailwind systems, framer-motion, and responsive container designs.',
        'Exceptional collaborative leadership from working inside enterprise-scale Google core teams.'
      ],
      weaknesses: [
        'Relatively higher salary expectations situated near top-tier industry bands.',
        'Limited direct background in low-level systems (Rust or C++) which is listed as an optional plus.'
      ],
      matchingSkills: ['React', 'TypeScript', 'Next.js', 'Vite', 'Gemini API', 'Tailwind CSS', 'Redux', 'D3.js'],
      missingSkills: ['Rust', 'Docker (basic understanding only)'],
      experienceAnalysis: 'Alex led a frontend migration for the Gemini UI Overhaul at Google, improving response rendering and perceived latency by 42%. He manages state-heavy, highly active real-time client apps with high performance.',
      projectRelevance: [
        {
          name: 'Gemini UI Overhaul (Google)',
          desc: 'Architected the streaming token visualizer and dashboard widgets, resolving memory leak issues with complex nested state.'
        },
        {
          name: 'OpenSource Design System Contributor',
          desc: 'Active designer/maintainer for accessible Tailwind CSS systems and custom keyboard-navigable widgets.'
        }
      ],
      educationAnalysis: 'MS in Computer Science from Stanford University (2017) with specializations in Human-Computer Interaction and Intelligent Systems.',
      recruiterRecommendation: 'Proceed immediately to direct technical screening with the CTO. Alex has the highest score in our talent pool and possesses niche skills in UI state synchronization for generative AI applications.'
    }
  },
  {
    id: 'cand-sarah',
    name: 'Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
    rank: 2,
    matchScore: 89,
    recommendation: 'Strong Hire',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Node.js', 'WebSockets', 'Recharts'],
    education: 'BS in Software Engineering, Waterloo University',
    shortSummary: 'Full-stack specialist focusing on client performance optimization, reusable component systems, and scalable fintech architecture.',
    aiDetailedAnalysis: {
      overallMatch: 'Sarah Chen presents an outstanding profile (89% match score) for the senior post. Her background is solid on front-end rendering engines, data density layouts, and clean API design.',
      strengths: [
        'Expert in state synchronization across complex dashboard widgets and multi-step forms.',
        'Highly metrics-driven developer with direct experience reducing bundle size by 35% in previous startups.',
        'Strong full-stack knowledge (Node.js and WebSockets) allowing self-sufficient API integration.'
      ],
      weaknesses: [
        'Fewer years of explicit experience with AI pipelines compared to Alex.',
        'Lacks active public open-source contributions, though her internal engineering quality is stellar.'
      ],
      matchingSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Node.js', 'WebSockets', 'Recharts'],
      missingSkills: ['Gemini API', 'Vite configuration (uses Webpack mainly)'],
      experienceAnalysis: '6 years of robust startup and mid-size corporate experience. Currently Senior Frontend Dev at a fintech unicorn, driving client dashboard redesigns.',
      projectRelevance: [
        {
          name: 'Fintech Analytics Platform',
          desc: 'Re-architected client-side chart systems using Recharts, resolving canvas redraw flickering during heavy socket updates.'
        },
        {
          name: 'Collaborative Workspace Canvas',
          desc: 'Built a real-time multiplayer board canvas using pure React and customized local caching strategy.'
        }
      ],
      educationAnalysis: 'BS in Software Engineering from the University of Waterloo, known for rigorous engineering principles and co-op program.',
      recruiterRecommendation: 'Schedule an architecture panel call. Sarah’s background in high-density graphs and responsive performance is a perfect fit for our dashboard needs.'
    }
  },
  {
    id: 'cand-jordan',
    name: 'Jordan Smith',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    rank: 3,
    matchScore: 82,
    recommendation: 'Good Match',
    experienceYears: 5,
    skills: ['React', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Accessibility (a11y)'],
    education: 'BS in Information Systems, University of Michigan',
    shortSummary: 'UX-minded engineer with a deep passion for building inclusive, delightful, and highly accessible web products with smooth interactions.',
    aiDetailedAnalysis: {
      overallMatch: 'Jordan Smith ranks as a Good Match (82%). He has excellent interface design instincts and visual styling polish, though slightly lower on advanced type architecture and machine learning familiarity.',
      strengths: [
        'Exceptional design empathy, closely coordinating with design teams to produce absolute pixel-perfect structures.',
        'Highly proficient in micro-interactions, spring animations, and physical transition aesthetics.',
        'Deep understanding of WCAG accessibility (a11y) standards, screen reader compatibility, and layout scaling.'
      ],
      weaknesses: [
        'Relatively lower exposure to strict type-safe systems (learning TypeScript recently; has 1 year of active usage).',
        'Minimal enterprise analytics dashboard exposure.'
      ],
      matchingSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
      missingSkills: ['TypeScript (Intermediate)', 'Next.js', 'D3.js', 'Gemini API'],
      experienceAnalysis: '5 years of professional career split between agency and growth-stage startup environments. Very active in design system maintenance.',
      projectRelevance: [
        {
          name: 'Inclusive Design System',
          desc: 'Standardized layout spacing and custom keyboard focus logic, bringing the client portal to full Section 508 compliance.'
        },
        {
          name: 'E-Commerce Checkout Funnel',
          desc: 'Optimized animation transitions using motion libraries, cutting card abandonment rates by 14%.'
        }
      ],
      educationAnalysis: 'BS in Information Systems from the University of Michigan with a focus on Interaction Design.',
      recruiterRecommendation: 'Highly recommended for an interactive whiteboard task. Jordan will bring amazing attention to detail regarding accessibility and design system scalability.'
    }
  },
  {
    id: 'cand-elena',
    name: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    rank: 4,
    matchScore: 71,
    recommendation: 'Neutral',
    experienceYears: 4,
    skills: ['React', 'JavaScript', 'CSS Modules', 'Sass', 'Node.js', 'Webpack', 'Bootstrap'],
    education: 'BS in Computer Science, Kiev Polytechnic',
    shortSummary: 'Solid frontend developer with extensive experience in standard web platforms, CSS custom themes, and corporate marketing pipelines.',
    aiDetailedAnalysis: {
      overallMatch: 'Elena Rostova scores 71% (Neutral). While she is a capable React engineer, she lacks the specialized experience with modern tools (TypeScript, Tailwind, Vite) and advanced analytics requested in the Senior JD.',
      strengths: [
        'Highly disciplined core CSS/Sass styling capabilities, layout systems, and responsive templates.',
        'Good command of foundational React state, lifecycles, and backend integrations via REST APIs.'
      ],
      weaknesses: [
        'No professional experience using Tailwind CSS or newer Vite-based frameworks.',
        'Lacks background in AI tool integrations or high-density graph components.'
      ],
      matchingSkills: ['React', 'JavaScript', 'Node.js'],
      missingSkills: ['TypeScript', 'Tailwind CSS', 'Vite', 'Gemini API', 'D3.js'],
      experienceAnalysis: '4 years of professional experience primarily building SaaS corporate pages, landing interfaces, and administration portals.',
      projectRelevance: [
        {
          name: 'SaaS Client Admin Portal',
          desc: 'Built custom table filters and data exporting widgets in standard React and Sass modules.'
        }
      ],
      educationAnalysis: 'BS in Computer Science from Kiev Polytechnic Institute.',
      recruiterRecommendation: 'We should keep Elena in view for mid-level UI roles or marketing engineering teams, but she is currently under-qualified for this Senior AI Platform role.'
    }
  },
  {
    id: 'cand-marcus',
    name: 'Marcus Brody',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    rank: 5,
    matchScore: 54,
    recommendation: 'No Match',
    experienceYears: 3,
    skills: ['Python', 'Django', 'SQL', 'React (Basic)', 'HTML/CSS', 'AWS'],
    education: 'BS in Economics, Boston College',
    shortSummary: 'Backend developer trying to transition into full-stack or frontend. Strong SQL, data modeling, and python script builder.',
    aiDetailedAnalysis: {
      overallMatch: 'Marcus is an unaligned match (54%) for this specific role. His skill set lies primarily in Python, database modeling, and general AWS infrastructure rather than advanced client-side interactive engineering.',
      strengths: [
        'Excellent server-side knowledge, database query design, and cloud deployments.',
        'Highly analytical mindset from statistics and finance background.'
      ],
      weaknesses: [
        'Minimal React experience (mostly basic side project components).',
        'Lacks knowledge of modern CSS setups, Tailwind, type-safe frontend styling, or animations.'
      ],
      matchingSkills: ['AWS', 'React (Basic)'],
      missingSkills: ['TypeScript', 'Tailwind CSS', 'Vite', 'D3.js', 'Next.js', 'UX Design patterns'],
      experienceAnalysis: '3 years of python scripting and backend database maintenance. Limited frontend production deliveries.',
      projectRelevance: [
        {
          name: 'SaaS Analytics Backend API',
          desc: 'Constructed the Django REST framework endpoints and optimized database lookup indexes.'
        }
      ],
      educationAnalysis: 'BS in Economics from Boston College, with minor in Computer Science.',
      recruiterRecommendation: 'Do not pursue for this frontend opening. He has excellent backend logic and database skills, and could be referred to our Backend Data Pipeline team.'
    }
  }
];
