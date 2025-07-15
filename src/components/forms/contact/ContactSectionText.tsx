import React from 'react'
import contactData from '@/data/contact-section.json'

export default function ContactSectionText() {
  const { title, description } = contactData.hero;
  
  return (
    <div className="space-y-5">
      {/* Section Heading with different styling */}
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        <span className="block">{title.line1}</span>
        <span className="block">{title.line2}</span>
        <span className="block text-blue-600">{title.line3}</span>
      </h2>
      
      {/* Section Description - Using dangerouslySetInnerHTML to render HTML tags */}
      <p 
        className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  )
}
