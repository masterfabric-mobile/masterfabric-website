import React from 'react'
import contactTextData from '@/data/contact.json'

interface ContactTextProps {
  variant?: 'page' | 'section'
}

export default function ContactText({ variant = 'page' }: ContactTextProps) {

  const textData = variant === 'page' 
    ? contactTextData.contactPage 
    : contactTextData.contactSection;

  return (
    <div>
      {/* Main Heading - Custom styling to match the image exactly */}
      <h1 className="text-[2.75rem] md:text-5xl xl:text-[3.5rem] font-extrabold text-[#121826] leading-[1.15] tracking-[-0.02em]">
        <span className="block">{textData.heading.line1}</span>
        <span className="block">{textData.heading.line2}</span>
        <span className="block text-[#4070F4]">{textData.heading.line3}</span>
      </h1>
      
      {/* Description Paragraph - Match image styling exactly */}
      <p className="text-[1.125rem] text-[#4B5563] leading-[1.6] max-w-2xl mt-6">
        {textData.description}
      </p>
    </div>
  )
}
