'use client'

import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import AboutHeader from '@/components/about/AboutHeader'
import Globe from '@/components/about/Globe'
import AboutTimeline from '@/components/about/AboutTimeline'
import DynamicText from '@/components/about/DynamicText'
import React, { useState } from 'react';
import ProcessSteps from '@/components/about/ProcessSteps'
import FlipStatistics from '@/components/about/FlipStatistics'
import GitHubProjects from '@/components/about/github-projects'
import aboutData from '@/data/about.json'

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicColors = aboutData.dynamicText.colors;

  return (
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
      
      <Globe activities={aboutData.activities} />

      <AboutTimeline timeline={aboutData.timeline} />

      <DynamicText dynamicText={aboutData.dynamicText} 
        onIndexChange={setCurrentIndex}
      />
      
      <ProcessSteps processSteps={aboutData.processSteps} 
        currentColor={dynamicColors[currentIndex]}
      />

      <FlipStatistics 
        statistics={aboutData.statistics} 
        title={aboutData.passion.title} 
        description={aboutData.passion.description} 
      />

      <GitHubProjects />
    </Container>
  )
}
