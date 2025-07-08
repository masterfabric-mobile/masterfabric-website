'use client'

import React from 'react'
import HiringStep from './hiring-step'
import MobileHiringStep from './mobile-hiring-step'

interface HiringProcessSectionProps {
  steps: {
    number: string
    title: string
    duration: string
    description: string
    icon?: string
    iconName?: string
    details: string[]
  }[]
  title: string
  description: string
}

export default function HiringProcessSection({ steps, title, description }: HiringProcessSectionProps) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      
      {/* Desktop Hiring Steps - Horizontal Layout */}
      <div className="hidden md:flex justify-center gap-6 overflow-x-auto pb-8">
        {steps.map((step, index) => (
          <HiringStep 
            key={index} 
            step={step} 
            index={index} 
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
      
      {/* Mobile Hiring Steps - Vertical Layout */}
      <div className="md:hidden space-y-0">
        {steps.map((step, index) => (
          <MobileHiringStep 
            key={index} 
            step={step} 
            index={index} 
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
