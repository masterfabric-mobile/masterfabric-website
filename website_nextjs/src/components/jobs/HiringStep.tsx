import React from 'react'

interface HiringStepProps {
  step: {
    number: string
    title: string
    duration: string
    description: string
    icon: string
    details: string[]
  }
  index: number
}

export default function HiringStep({ step }: HiringStepProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            {step.number}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{step.icon}</span>
            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
            <span className="text-sm text-gray-500">({step.duration})</span>
          </div>
          
          <p className="text-gray-600 mb-4">{step.description}</p>
          
          <ul className="space-y-1">
            {step.details.map((detail, index) => (
              <li key={index} className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
