'use client'

import React from 'react'

import ContactInfo from './contact/ContactInfo'
import ContactForm from './contact/ContactForm'
import ContactMap from './contact/ContactMap'
import ContactText from './contact/ContactText'


export default function Contact() {
  const handleFormSubmit = (formData: any) => {
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN - CONTENT AREA */}
          <div className="space-y-8">
            {/* Contact text with heading and description */}
            <ContactText variant="page" />
            
    
            {/* Contact information section */}
            <ContactInfo />
          </div>

          {/* RIGHT COLUMN - CONTACT FORM AND MAP */}
          <div className="space-y-8">
            {/* Contact Form */}
            <ContactForm onSubmit={handleFormSubmit} />
            
            {/* Interactive Map */}
            <ContactMap />
          </div>
        </div>
      </div>
    </section>
  )
}