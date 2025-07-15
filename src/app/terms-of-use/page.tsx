import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'

export const metadata: Metadata = {
  title: 'Terms of Use - MasterFabric Inc.',
  description: 'Terms of Use for MasterFabric Inc. services and website.',
}

export default function TermsOfUsePage() {
  return (
    <Container>
      <SectionHead
        title="Terms of Use"
        description="Please read these Terms of Use carefully before using our services."
      />

      <div className="mx-auto max-w-4xl mt-16 prose prose-lg">
        <p className="text-sm text-gray-600 mb-8">
          <strong>Last updated:</strong> January 2025
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the MasterFabric website (masterfabric.co) and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2>2. Company Information</h2>
        <p>
          MasterFabric Information Technology Inc. is a mobile application development company registered in Turkey. We specialize in custom mobile app development, application modernization, and digital transformation services.
        </p>

        <h2>3. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on MasterFabric&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>modify or copy the materials</li>
          <li>use the materials for any commercial purpose or for any public display</li>
          <li>attempt to reverse engineer any software contained on the website</li>
          <li>remove any copyright or other proprietary notations from the materials</li>
        </ul>

        <h2>4. Disclaimer</h2>
        <p>
          The materials on MasterFabric&apos;s website are provided on an &apos;as is&apos; basis. MasterFabric makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>5. Limitations</h2>
        <p>
          In no event shall MasterFabric or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MasterFabric&apos;s website, even if MasterFabric or a MasterFabric authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>6. Accuracy of Materials</h2>
        <p>
          The materials appearing on MasterFabric&apos;s website could include technical, typographical, or photographic errors. MasterFabric does not warrant that any of the materials on its website are accurate, complete, or current.
        </p>

        <h2>7. Links</h2>
        <p>
          MasterFabric has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MasterFabric of the site.
        </p>

        <h2>8. Modifications</h2>
        <p>
          MasterFabric may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of Turkey and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> legal@masterfabric.co<br />
          <strong>Address:</strong> MasterFabric Information Technology Inc., Turkey
        </p>
      </div>
    </Container>
  )
}
