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
    <div className="space-y-4">
      {showBadge && badge && (
        <span
          className="inline-block px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
          aria-hidden
        >
          {badge}
        </span>
      )}
      <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
        <span className="block">{title.line1}</span>
        <span className="block text-blue-600">{title.line2}, {title.line3}</span>
      </h2>
      <p
        className="text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}
