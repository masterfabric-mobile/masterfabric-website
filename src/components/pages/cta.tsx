'use client'

import React from 'react';
import { Icon } from '@iconify/react';

export interface CTAToolItem {
  name: string;
  icon: string;
  category?: string;
}

interface CTAProps {
  /** Technologies from ServicesAndToolsSection (home-tools). When provided, "Our Experts" strip is built from this list. */
  tools?: CTAToolItem[];
}

/** Brand color on hover only (default is gray). */
const TECH_COLOR: Record<string, string> = {
  Cursor: '#000000',
  'VS Code': '#007ACC',
  JetBrains: '#000000',
  GitHub: '#181717',
  GitLab: '#FC6D26',
  Azure: '#0078D4',
  Firebase: '#FFCA28',
  Vercel: '#000000',
  Docker: '#2496ED',
  Flutter: '#02569B',
  React: '#61DAFB',
  'Next.js': '#000000',
  'Node.js': '#339933',
  NestJS: '#E0234E',
  TypeScript: '#3178C6',
  Go: '#00ADD8',
  Dart: '#0175C2',
  Swift: '#F05138',
  Kotlin: '#7F52FF',
  Python: '#3776AB',
  'Tailwind CSS': '#06B6D4',
  Jest: '#C21325',
  Playwright: '#2EAD33',
  OpenAI: '#412991',
  Anthropic: '#D4A574',
};

/** Only common languages & tech with real brand icons (no "Our tools", no generic mdi icons). */
function filterCommonTech(tools: CTAToolItem[]): CTAToolItem[] {
  return tools.filter(
    (t) =>
      t.category !== 'Our tools' &&
      (t.icon.startsWith('simple-icons:') || t.icon.startsWith('logos:'))
  );
}

const FALLBACK_TECH: CTAToolItem[] = [
  { name: 'Flutter', icon: 'simple-icons:flutter' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'Swift', icon: 'simple-icons:swift' },
  { name: 'Kotlin', icon: 'simple-icons:kotlin' },
];

export default function CTA({ tools = [] }: CTAProps) {
  const raw = tools.length > 0 ? filterCommonTech(tools) : [];
  const techList = raw.length > 0 ? raw : FALLBACK_TECH;

  return (
    <section className="py-16 lg:pb-8 lg:pt-16 relative overflow-hidden w-full">
      {/* Animated background elements with emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-25 animate-float-slow"></div>
        {/* Floating emojis */}
        <div className="absolute top-32 right-20 text-4xl animate-float opacity-30">🚀</div>
        <div className="absolute bottom-32 left-20 text-3xl animate-float-delayed opacity-25">💡</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float-slow opacity-20">⭐</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-float opacity-15">✨</div>
        <div className="absolute top-1/4 left-16 text-2xl animate-float-delayed opacity-20">🎯</div>
        <div className="absolute bottom-1/4 right-12 text-2xl animate-float-slow opacity-25">🎨</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Technologies Section — heading only (stays in container) */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-center text-2xl text-slate-500 mb-10">
            Our Experts Works with your technologies <span className="animate-pulse text-red-500">&hearts;</span>
          </h2>
        </div>
      </div>

      {/* Marquee: full width, gray by default, brand color on hover; extra py so icons are not clipped */}
      <div
        className="w-full overflow-hidden py-8 mb-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="flex w-max gap-6 sm:gap-8 will-change-transform cta-scroll-reverse-float">
          {[...techList, ...techList].map((tool, index) => {
            const hoverColor = TECH_COLOR[tool.name] ?? '#64748b';
            return (
              <span
                key={`r1-${tool.name}-${index}`}
                title={tool.name}
                className="cta-marquee-icon shrink-0 inline-flex items-center justify-center text-gray-400 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:text-[var(--brand-color)]"
                style={{ animationDelay: `${index * 0.12}s`, ['--brand-color' as string]: hoverColor }}
                aria-hidden
              >
                <Icon className="size-8 sm:size-10 md:size-12" icon={tool.icon} aria-hidden />
              </span>
            );
          })}
        </div>
        <div className="flex w-max gap-5 sm:gap-7 mt-5 sm:mt-6 will-change-transform cta-scroll-float">
          {[...techList].reverse().concat([...techList].reverse()).map((tool, index) => {
            const hoverColor = TECH_COLOR[tool.name] ?? '#64748b';
            return (
              <span
                key={`r2-${tool.name}-${index}`}
                title={tool.name}
                className="cta-marquee-icon shrink-0 inline-flex items-center justify-center text-gray-400 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:text-[var(--brand-color)]"
                style={{ animationDelay: `${index * 0.1}s`, ['--brand-color' as string]: hoverColor }}
                aria-hidden
              >
                <Icon className="size-7 sm:size-9 md:size-11" icon={tool.icon} aria-hidden />
              </span>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA */}
        <div className="text-center animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 animate-pulse-gentle">
            <Icon className="w-10 h-10 text-blue-600" icon="bx:rocket" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-in-up-delayed">
            Ready to Start Your Project?
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-in-up-more-delayed">
            Let&apos;s build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up-final">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="group inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
