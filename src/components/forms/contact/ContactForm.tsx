import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import contactData from '@/data/contact-section.json'
import { ChevronDown, ChevronUp, Send } from 'lucide-react'

interface ContactFormProps {
  onSubmit?: (formData: any) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Set submitting state
    setIsSubmitting(true)
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle form submission
      console.log('Form submitted:', formData)
      if (onSubmit) {
        onSubmit(formData)
      }
      
      // Show success message
      setIsSubmitted(true)
      
      // Reset form after a delay
      setTimeout(() => {
        setIsFormOpen(false)
        
        // Reset submission state and form data after closing
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectType: '',
            message: '',
            budget: ''
          })
        }, 500)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
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

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
        <p className="text-gray-600 mb-6">Ready to start your project? Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
        
        <Button 
          onClick={toggleForm}
          className="flex items-center justify-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isFormOpen ? 'Hide Form' : 'Start Your Project'} 
          {isFormOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>

      {/* Collapsible Form */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isFormOpen 
            ? 'max-h-[2000px] opacity-100 transform scale-y-100' 
            : 'max-h-0 opacity-0 transform scale-y-95'
        }`}
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 transform transition-all duration-300">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900">{contactData.form.messages.success.title}</h4>
            <p className="text-gray-600">{contactData.form.messages.success.description}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 transform transition-all duration-300">
            {/* Form separator */}
            <div className="border-t border-gray-200 pt-6"></div>

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
        
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.form.fields.phone.label}
          </label>
          <input
            type={contactData.form.fields.phone.type}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={contactData.form.fields.phone.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors duration-200 placeholder:text-gray-400"
            required={contactData.form.fields.phone.required}
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
          </Button>          </form>
        )}
      </div>
    </div>
  )
}
