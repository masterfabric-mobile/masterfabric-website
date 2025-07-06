import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import Welcome from '@/components/pages/welcome'
import Logos from '@/components/pages/logos'
import RefactorApplication from '@/components/pages/refactor-application'
import ProjectFlowTimeline from '@/components/pages/project-flow-timeline'
import CTA from '@/components/pages/cta'
import GitHubProjects from '@/components/about/github-projects'

export default function HomePage() {
  return (
    <Container>
      {/* Contact Section */}
      <ContactSection />
      
      {/* Welcome Section */}
      <Welcome />
      
      {/* Logos Section */}
      <Logos />
      
      {/* Refactor Application Section */}
      <RefactorApplication />
      
      {/* Project Flow Timeline */}
      <ProjectFlowTimeline />
      
      {/* GitHub Projects */}
      <GitHubProjects />
      
      {/* CTA Section */}
      <CTA />
    </Container>
  )
}
