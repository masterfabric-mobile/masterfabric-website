import { Metadata } from 'next'
import ContactSection from '@/components/forms/contact-section'

export const metadata: Metadata = {
  title: 'Contact - MasterFabric Inc.',
  description: 'Get in touch with MasterFabric Inc. to discuss your mobile app development project.',
}

export default function ContactPage() {
  return <ContactSection />
}
