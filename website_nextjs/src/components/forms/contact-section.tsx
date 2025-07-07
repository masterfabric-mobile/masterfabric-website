'use client'

import React from 'react'
import ContactBenefits from './contact/ContactBenefits'
import ContactForm from './contact/ContactForm'

export default function ContactSection() {
  const handleFormSubmit = (formData: any) => {
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN - CONTENT AREA WITH BENEFITS */}
          <ContactBenefits />

          {/* RIGHT COLUMN - CONTACT FORM */}
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </section>
  )
}
