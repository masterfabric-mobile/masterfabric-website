'use client'

import React from 'react'
import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import Welcome from '@/components/pages/welcome'
import AiFirstSectionHome from '@/components/pages/ai-first-section-home'
import References from '@/components/pages/references'
import SuperchargeExperience from '@/components/pages/supercharge-experience'
import RefactorApplication from '@/components/pages/refactor-application'
import CTA from '@/components/pages/cta'

export default function Home() {
  return (
    <Container>
      <ContactSection />

      <Welcome />
      <AiFirstSectionHome />
      <References />
      <SuperchargeExperience />

      <RefactorApplication />
      <CTA />
    </Container>
  )
}
