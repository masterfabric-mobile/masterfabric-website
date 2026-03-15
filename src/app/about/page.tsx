'use client'

import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import AboutHeader from '@/components/about/AboutHeader'
import ProjectShowcase from '@/components/about/ProjectShowcase'
import LiveActivityStream from '@/components/about/LiveActivityStream'
import AboutTimeline from '@/components/about/AboutTimeline'
import DynamicText from '@/components/about/DynamicText'
import React, { useState, useMemo } from 'react';
import ProcessSteps from '@/components/about/ProcessSteps'
import GitHubProjects, { OpenSourceManifesto } from '@/components/about/github-projects'
import AiFirstSectionAbout from '@/components/pages/ai-first-section-about'
import aboutData from '@/data/about.json'
import FlowTimeline from '@/components/timeline/flow-timeline'

function getProjectsFromShared(shared: { mobile?: { name: string }[]; web?: { name: string }[]; backend?: { name: string }[] }): string[] {
  const names: string[] = []
  if (shared.mobile) shared.mobile.forEach((p) => names.push(p.name))
  if (shared.web) shared.web.forEach((p) => names.push(p.name))
  if (shared.backend) shared.backend.forEach((p) => names.push(p.name))
  return names
}

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicColors = aboutData.dynamicText.colors;

  const sharedProjects = useMemo(() => (aboutData as { sharedProjects?: typeof aboutData.projectShowcase }).sharedProjects ?? null, [])
  const liveActivityData = useMemo(() => {
    const live = aboutData.liveActivity as { useSharedProjects?: boolean; projects?: string[]; [k: string]: unknown }
    if (live?.useSharedProjects && sharedProjects) {
      return { ...live, projects: getProjectsFromShared(sharedProjects) }
    }
    return live
  }, [sharedProjects])

  return (
    <>
    <Container>
      <SectionHead
        title={aboutData.sectionHeader.title}
        description={
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {aboutData.sectionHeader.description.map((item, index) => (
              <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: item.paragraph }}></p>
            ))}
          </div>
        }
      />

      <AboutHeader 
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
        description={aboutData.hero.description}
      />
      
      {aboutData.projectShowcase && aboutData.liveActivity ? (
        <div className="relative mb-6 max-w-4xl mx-auto">
          {/* Unified section header */}
          <div className="text-center mb-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 mb-1.5 flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              {aboutData.projectShowcase.label}
              <span className="relative flex h-1.5 w-1.5 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
            </p>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 tracking-tight max-w-2xl mx-auto">
              {aboutData.projectShowcase.title}
            </h2>
            <p className="mt-1.5 text-xs text-slate-500 max-w-xl mx-auto">
              {aboutData.liveActivity.subtitle || aboutData.projectShowcase.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
            <div className="min-w-0 flex flex-col gap-4 lg:gap-5">
              <ProjectShowcase data={aboutData.projectShowcase} sharedProjects={sharedProjects ?? undefined} showSectionHeader={false} compact panelIndices={[0, 1]} />
            </div>
            <div className="min-w-0 flex flex-col gap-4 lg:gap-5">
              <div className="w-full h-[400px] flex flex-col shrink-0">
                <LiveActivityStream data={liveActivityData} showSectionHeader={false} compact fillHeight />
              </div>
              <ProjectShowcase data={aboutData.projectShowcase} sharedProjects={sharedProjects ?? undefined} showSectionHeader={false} compact panelIndices={[2]} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {aboutData.projectShowcase && <ProjectShowcase data={aboutData.projectShowcase} sharedProjects={sharedProjects ?? undefined} />}
          {aboutData.liveActivity && <LiveActivityStream data={liveActivityData} />}
        </>
      )}

      <AboutTimeline timeline={aboutData.timeline} />

      {/* Single block: timeline, what we deliver, how we work — unified spacing and colors */}
      <div className="bg-white">
        <FlowTimeline />
        <DynamicText dynamicText={aboutData.dynamicText} onIndexChange={setCurrentIndex} />
        <ProcessSteps processSteps={aboutData.processSteps} currentColor={dynamicColors[currentIndex]} />
      </div>

      <AiFirstSectionAbout />

      <OpenSourceManifesto />
    </Container>

    {/* Open source section: white background, no horizontal overflow */}
    <div className="w-full bg-white overflow-x-hidden">
      <GitHubProjects />
    </div>
    </>
  )
}
