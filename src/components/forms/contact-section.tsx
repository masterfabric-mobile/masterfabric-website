'use client'

import React from 'react'
import ContactBenefits from './contact/ContactBenefits'
import ContactSectionText from './contact/ContactSectionText'
import ContactForm from './contact/ContactForm'

export default function ContactSection() {
  const handleFormSubmit = (formData: any) => {
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN - TEXT CONTENT AND BENEFITS */}
          <div className="space-y-8">
            {/* Contact section text with heading and description */}
            <ContactSectionText />
            
            {/* Benefits section */}
            <ContactBenefits />
          </div>

          {/* RIGHT COLUMN - CONTACT FORM */}
          <div className="space-y-6">
            {/* Contact Form */}
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}
