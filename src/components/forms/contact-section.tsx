'use client'

import React from 'react'
import ContactBenefits from './contact/ContactBenefits'
import ContactSectionText from './contact/ContactSectionText'

export default function ContactSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN - TEXT CONTENT */}
          <div className="space-y-6">
            {/* Contact section text with heading and description */}
            <ContactSectionText />
          </div>

          {/* RIGHT COLUMN - BENEFITS */}
          <div className="space-y-6">
            {/* Benefits section */}
            <ContactBenefits />
          </div>
        </div>
      </div>
    </section>
  )
}
