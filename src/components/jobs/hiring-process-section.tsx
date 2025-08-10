'use client'

import React from 'react'
import HiringStep from './hiring-step'
import MobileHiringStep from './mobile-hiring-step'
import './styles/hiring-step.css'

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
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      
      {/* Desktop Hiring Steps - Grid Layout */}
      <div className="hidden md:block pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <HiringStep 
                  step={step} 
                  index={index} 
                  isLast={index === steps.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
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
