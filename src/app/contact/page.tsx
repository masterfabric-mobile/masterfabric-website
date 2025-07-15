import { Metadata } from 'next'
import Contact from '@/components/forms/contact'

export const metadata: Metadata = {
  title: 'Contact - MasterFabric Inc.',
  description: 'Get in touch with MasterFabric Inc. to discuss your mobile app development project.',
}

export default function ContactPage() {
  return <Contact />
}
