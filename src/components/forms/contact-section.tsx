'use client'

import React, { useState, useEffect } from 'react'
import ContactBenefits from './contact/ContactBenefits'
import ContactForm from './contact/ContactForm'
import ContactSectionText from './contact/ContactSectionText'
import { getCookie, setCookie } from '../../utils/cookies'

export default function ContactSection() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Cookie key for tracking form submission
  const FORM_SUBMISSION_COOKIE = 'masterfabric_contact_form_submitted'

  // Check if form was previously submitted on component mount
  useEffect(() => {
    const wasSubmitted = getCookie(FORM_SUBMISSION_COOKIE)
    if (wasSubmitted === 'true') {
      setIsFormSubmitted(true)
    }
  }, [])

  const handleFormSubmit = (formData: any) => {
    // Handle form submission
    console.log('Form submitted:', formData)
    
    // Set cookie to remember form submission (expires in 7 days)
    setCookie(FORM_SUBMISSION_COOKIE, 'true', 7)
    
    // Update state
    setIsFormSubmitted(true)
    setShowSuccessMessage(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  const handleResubmit = () => {
    // Clear the submission cookie
    setCookie(FORM_SUBMISSION_COOKIE, '', -1) // Expire immediately
    
    // Reset states
    setIsFormSubmitted(false)
    setShowSuccessMessage(false)
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-12">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-12 p-6 bg-blue-100 border border-blue-300 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-blue-800">
                  Message sent successfully! We will get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          {/* LEFT COLUMN - CONTENT AREA */}
          <div className="lg:col-span-5 space-y-10">
            {/* Contact section text with heading and description */}
            <ContactSectionText />
            
            {/* Benefits section */}
            <ContactBenefits />
          </div>

          {/* RIGHT COLUMN - CONTACT FORM */}
          <div className="lg:col-span-7 space-y-8">
            {isFormSubmitted ? (
              /* Submission confirmation and resubmit option */
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                <div className="space-y-6">
                  <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                      We have received your request and will get back to you shortly.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleResubmit}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Send New Message
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <ContactForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
