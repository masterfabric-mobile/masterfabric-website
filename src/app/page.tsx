import Container from '@/components/layout/container'
import ContactSection from '@/components/forms/contact-section'
import Welcome from '@/components/pages/welcome'
import AiCustomSoftware from '@/components/pages/ai-custom-software'
import References from '@/components/pages/references'
import SuperchargeExperience from '@/components/pages/supercharge-experience'
import RefactorApplication from '@/components/pages/refactor-application'
import CTA from '@/components/pages/cta'

export default function Home() {
  return (
    <Container>
      <ContactSection />
      <Welcome />
      <AiCustomSoftware />
      <References />
      <SuperchargeExperience />
      <RefactorApplication />
      <CTA />
    </Container>
  )
}
