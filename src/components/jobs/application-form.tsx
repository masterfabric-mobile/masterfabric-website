'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import './styles/application-form.css'

interface ApplicationFormProps {
  formData: {
    title: string
    subtitle: string
    description: string
    api?: {
      endpoint: string
      accessKey: string
    }
    fields: {
      name: { label: string, placeholder: string, required: boolean }
      email: { label: string, placeholder: string, required: boolean }
      phone: { label: string, placeholder: string, required: boolean }
      position: { label: string, placeholder: string, required: boolean }
      experience: { label: string, placeholder: string, required: boolean }
      portfolio: { label: string, placeholder: string, required: boolean }
      message: { label: string, placeholder: string, required: boolean }
    }
  }
  positions: {
    id: string
    title: string
  }[]
  selectedPositionId?: string
}

export default function ApplicationForm({ formData, positions, selectedPositionId }: ApplicationFormProps) {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(selectedPositionId || '');

  useEffect(() => {
    if (selectedPositionId) {
      setSelectedPosition(selectedPositionId);
    }
  }, [selectedPositionId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formElements = form.elements as HTMLFormControlsCollection;
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ 
          success: true, 
          message: 'Thank you! Your application has been submitted successfully.' 
        });
        form.reset();
      } else {
        setFormStatus({ 
          success: false, 
          message: data.message || 'Something went wrong. Please try again later.' 
        });
      }
    } catch (error) {
      setFormStatus({ 
        success: false, 
        message: 'There was an error submitting your application. Please try again.' 
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="application-form-section" className="p-10 lg:py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">{formData.title}</h2>
        <p className="text-xl text-gray-300 mb-4">{formData.subtitle}</p>
        <p className="text-gray-300 max-w-3xl mx-auto">{formData.description}</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <form
          action={formData.api?.endpoint || "/api/submit-application"}
          method="POST"
          id="career-form"
          className="space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {formData.api?.accessKey && (
            <input type="hidden" name="access_key" value={formData.api.accessKey} />
          )}
          <input type="hidden" name="subject" value="New Career Application - MasterFabric" />
          <input type="checkbox" className="hidden" style={{display: 'none'}} name="botcheck" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                {formData.fields.name.label} {formData.fields.name.required && '*'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required={formData.fields.name.required}
                placeholder={formData.fields.name.placeholder}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {formData.fields.email.label} {formData.fields.email.required && '*'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required={formData.fields.email.required}
                placeholder={formData.fields.email.placeholder}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                {formData.fields.phone.label} {formData.fields.phone.required && '*'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required={formData.fields.phone.required}
                placeholder={formData.fields.phone.placeholder}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                {formData.fields.experience.label} {formData.fields.experience.required && '*'}
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                required={formData.fields.experience.required}
                placeholder={formData.fields.experience.placeholder}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
              {formData.fields.position.label} {formData.fields.position.required && '*'}
            </label>
            <select
              id="position"
              name="position"
              required={formData.fields.position.required}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPosition}
              onChange={e => setSelectedPosition(e.target.value)}
            >
              <option value="" className="text-gray-900">Select a position...</option>
              {positions.map((job) => (
                <option 
                  key={job.id} 
                  value={job.id} 
                  className="text-gray-900"
                >
                  {job.title}
                </option>
              ))}
              <option value="Other" className="text-gray-900">Other / General Application</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2">
              {formData.fields.portfolio.label} {formData.fields.portfolio.required && '*'}
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              required={formData.fields.portfolio.required}
              placeholder={formData.fields.portfolio.placeholder}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              {formData.fields.message.label} {formData.fields.message.required && '*'}
            </label>
            <textarea
              id="message"
              name="message"
              required={formData.fields.message.required}
              rows={6}
              placeholder={formData.fields.message.placeholder}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 w-full md:w-auto disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
          
          {formStatus.message && (
            <div 
              className={`text-center p-4 rounded-lg ${formStatus.success ? 'bg-green-600/20 text-green-200' : 'bg-red-600/20 text-red-200'}`}
            >
              {formStatus.message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
