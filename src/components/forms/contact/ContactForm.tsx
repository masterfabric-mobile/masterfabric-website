import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import contactData from '@/data/contact-section.json'
import { Send } from 'lucide-react'
import { getCookie, setCookie } from '@/utils/cookies'

interface ContactFormProps {
  onSubmit?: (formData: any) => void
  initialOpen?: boolean
}

export default function ContactForm({ onSubmit, initialOpen = false }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFromSendAgain, setIsFromSendAgain] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    budget: ''
  })

  // Cookie key for tracking form submission
  const FORM_SUBMISSION_COOKIE = 'masterfabric_contact_form_submitted'

  // Check if form was previously submitted on component mount
  useEffect(() => {
    const wasSubmitted = getCookie(FORM_SUBMISSION_COOKIE)
    if (wasSubmitted === 'true') {
      setIsSubmitted(true)
    }
  }, [])

  // Optional: open form when hash is #get-in-touch (e.g. from /contact page)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#get-in-touch') {
      window.dispatchEvent(new Event('openContactModal'))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Set submitting state
    setIsSubmitting(true)
    
    try {
      // Send data to Web3Forms API
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '') // Web3Forms access key
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('project_type', formData.projectType)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('budget', formData.budget)
      formDataToSend.append('subject', 'New Contact Form Submission from Masterfabric Website')
      formDataToSend.append('botcheck', '') // For spam protection
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })
      
      const result = await response.json()
      
      if (response.status === 200 && result.success) {
        console.log('Form submitted successfully:', result)
        
        // Set cookie to remember form submission (expires in 7 days)
        setCookie(FORM_SUBMISSION_COOKIE, 'true', 7)
        
        if (onSubmit) {
          onSubmit(formData)
        }
        
        // Show success message
        setIsSubmitted(true)
        setIsFromSendAgain(false) // Reset the flag
        
        {/* Reset form data */}
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: '',
          budget: ''
        })
      } else {
        console.error('Form submission failed:', result)
        alert('Form submission failed. Please try again.')
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
      {isSubmitted && !isFromSendAgain ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900">You have already sent a message!</h4>
          <button
            onClick={() => setIsFromSendAgain(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Send Again
          </button>
        </div>
      ) : (
        <>
          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
            <p className="text-gray-600 mb-6">Ready to start your project? Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form separator */}
              <div className="border-t border-gray-200 pt-6"></div>

              {/* Honeypot field for spam protection - hidden from users */}
              <input 
                type="checkbox" 
                name="botcheck" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off"
              />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.form.fields.name.label}
          </label>
          <input
            type={contactData.form.fields.name.type}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={contactData.form.fields.name.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200 placeholder:text-gray-400"
            required={contactData.form.fields.name.required}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.form.fields.email.label}
          </label>
          <input
            type={contactData.form.fields.email.type}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={contactData.form.fields.email.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200 placeholder:text-gray-400"
            required={contactData.form.fields.email.required}
          />
        </div>
        


        {/* Project Type Field */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.form.fields.projectType.label}
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200"
            required={contactData.form.fields.projectType.required}
          >
            {contactData.form.fields.projectType.options.map((option: { value: string; text: string }) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.form.fields.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={contactData.form.fields.message.placeholder}
            rows={contactData.form.fields.message.rows}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200 placeholder:text-gray-400 resize-none"
            required={contactData.form.fields.message.required}
          />
        </div>          {/* Budget Field */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              {contactData.form.fields.budget.label}
            </label>
            <select
              id="budget"
              name="budget"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200"
              required={contactData.form.fields.budget.required}
            >
              {contactData.form.fields.budget.options.map((option: { value: string; text: string }) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span>{contactData.form.submitButton.loadingText}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {contactData.form.submitButton.text}
              </>
            )}
          </Button>
          </form>
        </>
      )}
    </div>
  )
}
