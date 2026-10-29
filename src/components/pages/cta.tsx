'use client'

import React from 'react';
import { Icon } from '@iconify/react';

export interface CTAToolItem {
  name: string;
  icon: string;
  category?: string;
}

interface CTAProps {
  tools?: CTAToolItem[];
}

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
  MCP: '#18181b',
};

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-25 animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-center text-2xl text-slate-500 mb-10">
            Our experts work with your technologies <span className="animate-pulse text-red-500">&hearts;</span>
          </h2>
        </div>
      </div>

      <div
        className="w-full overflow-hidden py-8 mb-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="flex w-max gap-6 sm:gap-8 will-change-transform animate-scroll-infinite-reverse">
          {[...techList, ...techList].map((tool, index) => {
            const hoverColor = TECH_COLOR[tool.name] ?? '#64748b';
            return (
              <span
                key={`r1-${tool.name}-${index}`}
                title={tool.name}
                className="shrink-0 inline-flex items-center justify-center text-gray-400 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:text-[var(--brand-color)]"
                style={{ ['--brand-color' as string]: hoverColor }}
                aria-hidden
              >
                <Icon className="size-8 sm:size-10 md:size-12" icon={tool.icon} aria-hidden />
              </span>
            );
          })}
        </div>
        <div className="flex w-max gap-5 sm:gap-7 mt-5 sm:mt-6 will-change-transform animate-scroll-infinite">
          {[...techList].reverse().concat([...techList].reverse()).map((tool, index) => {
            const hoverColor = TECH_COLOR[tool.name] ?? '#64748b';
            return (
              <span
                key={`r2-${tool.name}-${index}`}
                title={tool.name}
                className="shrink-0 inline-flex items-center justify-center text-gray-400 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:text-[var(--brand-color)]"
                style={{ ['--brand-color' as string]: hoverColor }}
                aria-hidden
              >
                <Icon className="size-7 sm:size-9 md:size-11" icon={tool.icon} aria-hidden />
              </span>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 sm:p-12 shadow-sm animate-slide-in-up">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <Icon className="h-4 w-4" icon="bx:rocket" aria-hidden />
                Start a project
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Ready to start your project?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                Custom software and AI transformation for institutions and private clients.
                Send us the brief — we plan it, build it, and hand it over.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {['Planned around your brief', 'Built with Claude in the loop', 'Reviewed by engineers', 'Software you own'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 shrink-0 text-blue-600" icon="bx:check-circle" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Tell us what you need</p>
              <p className="mt-1 text-sm text-slate-600">A short brief is enough to get the conversation going.</p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Get started
                  <Icon className="h-5 w-5 transition-transform group-hover:translate-x-1" icon="bx:right-arrow-alt" aria-hidden />
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  Learn more about us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
