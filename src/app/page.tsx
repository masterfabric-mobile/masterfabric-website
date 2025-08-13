'use client'

import React from 'react'
import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import FlowTimeline from '@/components/timeline/flow-timeline'
import Welcome from '@/components/pages/welcome'
import Logos from '@/components/pages/logos'
import References from '@/components/pages/references'
import SuperchargeExperience from '@/components/pages/supercharge-experience'
import RefactorApplication from '@/components/pages/refactor-application'
import ProjectFlowTimeline, { TimelineRefType } from '@/components/pages/project-flow-timeline'
import CTA from '@/components/pages/cta'

export default function Home() {
  return (
    <Container>
      <ContactSection />
      
      <Welcome />
      <References />
      <SuperchargeExperience />
      
      {/* Refactor Application Section */}
      <RefactorApplication />
      {/* CTA Section */}
      <CTA />
    </Container>
  )
}
