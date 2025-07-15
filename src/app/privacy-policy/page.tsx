import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'

export const metadata: Metadata = {
  title: 'Privacy Policy - MasterFabric Inc.',
  description: 'Privacy Policy for MasterFabric Inc. Learn how we protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <SectionHead
        title="Privacy Policy"
        description="We take your privacy seriously. Learn how we collect, use, and protect your information."
      />

      <div className="mx-auto max-w-4xl mt-16 prose prose-lg">
        <p className="text-sm text-gray-600 mb-8">
          <strong>Last updated:</strong> January 2025
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you contact us through our website forms,
          subscribe to our newsletter, or communicate with us via email.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send you updates about our services (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
          except as described in this policy or as required by law.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your
          browser settings, though this may affect some functionality of our site.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> privacy@masterfabric.co<br />
          <strong>Address:</strong> MasterFabric Information Technology Inc., Turkey
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>
      </div>
    </Container>
  )
}
