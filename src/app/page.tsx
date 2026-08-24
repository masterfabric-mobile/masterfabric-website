import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import Welcome from '@/components/pages/welcome'
import AiFirstSectionHome from '@/components/pages/ai-first-section-home'
import References from '@/components/pages/references'
import SuperchargeExperience from '@/components/pages/supercharge-experience'
import RefactorApplication from '@/components/pages/refactor-application'
import ServicesAndToolsSection from '@/components/pages/ServicesAndToolsSection'
import AiCustomSoftware from '@/components/pages/ai-custom-software'
import CTA from '@/components/pages/cta'
import homeServicesData from '@/data/home-services.json'
import homeToolsData from '@/data/home-tools.json'

export default function Home() {
  return (
    <>
      <Container>
        <ContactSection />
        <Welcome />
        <AiFirstSectionHome />
        <AiCustomSoftware />
        <References />
        <SuperchargeExperience />
        <ServicesAndToolsSection
          services={homeServicesData}
          targetPlatforms={homeToolsData.targetPlatforms}
          toolsSection={homeToolsData.toolsSection}
        />
        <RefactorApplication />
      </Container>
      <CTA tools={homeToolsData.toolsSection.tools} />
    </>
  )
}
