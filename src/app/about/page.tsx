'use client'

import Container from '@/components/layout/container'
import AboutIntro from '@/components/about/AboutIntro'
import Globe from '@/components/about/Globe'
import DynamicText from '@/components/about/DynamicText'
import React, { useState } from 'react';
import ProcessSteps from '@/components/about/ProcessSteps'
import GitHubProjects, { OpenSourceManifesto } from '@/components/about/github-projects'
import AiFirstSectionAbout from '@/components/pages/ai-first-section-about'
import aboutData from '@/data/about.json'

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicColors = aboutData.dynamicText.colors;

  return (
    <>
    <Container>
      <section className="pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
        <AboutIntro
          data={{
            sectionTitle: aboutData.sectionHeader.title,
            sectionDescription: aboutData.sectionHeader.description,
            heroTitle: aboutData.hero.title,
            heroSubtitle: aboutData.hero.subtitle,
            heroDescription: aboutData.hero.description,
          }}
        />
      </section>
      
      <Globe activities={aboutData.activities} />

      <DynamicText dynamicText={aboutData.dynamicText} 
        onIndexChange={setCurrentIndex}
      />
      
      <ProcessSteps processSteps={aboutData.processSteps} 
        currentColor={dynamicColors[currentIndex]}
      />

      <AiFirstSectionAbout />
    </Container>

    <div className="w-full bg-white overflow-x-hidden border-t border-slate-100">
      <OpenSourceManifesto compact />
      <GitHubProjects />
    </div>
    </>
  )
}
