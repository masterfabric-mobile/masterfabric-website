import React from 'react'
import contactData from '@/data/contact-section.json'

interface ContactSectionTextProps {
  showBadge?: boolean
}

export default function ContactSectionText({ showBadge = true }: ContactSectionTextProps) {
  const hero = contactData.hero as {
    badge?: string
    title: { line1: string; line2: string; line3: string }
    description: string
  }
  const { badge, title, description } = hero

  return (
    <div className="space-y-5">
      {showBadge && badge && (
        <span
          className="inline-block px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
          aria-hidden
        >
          {badge}
        </span>
      )}
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
      />
    </div>
  )
}
