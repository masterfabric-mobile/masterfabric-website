'use client'

import React, { useRef, useEffect } from 'react'
import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import Welcome from '@/components/pages/welcome'
import Logos from '@/components/pages/logos'
import References from '@/components/pages/references'
import RefactorApplication from '@/components/pages/refactor-application'
import ProjectFlowTimeline, { TimelineRefType } from '@/components/pages/project-flow-timeline'
import CTA from '@/components/pages/cta'



export default function HomePage() {
  // Create a ref to access timeline methods
  const timelineRef = useRef<TimelineRefType>(null);

  // Show congratulations dialog when the component mounts
  useEffect(() => {
    // Wait a bit after page load before showing the dialog
    // This ensures all components are properly mounted and initialized
    const timer = setTimeout(() => {
      if (timelineRef.current) {
        console.log('Triggering congratulations dialog on page load');
        // Start with the first phase (0)
        timelineRef.current.showCongratulationsDialog(0);
      }
    }, 3000); // Show after 3 seconds to give time for the page to fully load
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Container>
      {/* Contact Section */}
      <ContactSection/>
      {/* Project Flow Timeline */}
      <ProjectFlowTimeline ref={timelineRef} />
      {/* Welcome Section */}
      <Welcome 
        onTimelineDialogRequest={() => {
          if (timelineRef.current) {
            timelineRef.current.showCongratulationsDialog();
          }
        }}
      />
      {/* Logos Section */}
      <Logos />
      {/* References Section */}
      <References />
      {/* Refactor Application Section */}
      <RefactorApplication />
      {/* CTA Section */}
      <CTA />
    </Container>
  )
}
