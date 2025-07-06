import React from 'react'

interface BenefitCardProps {
  benefit: {
    icon: string
    title: string
    description: string
  }
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        <div className="text-4xl mb-4">{benefit.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
        <p className="text-gray-600">{benefit.description}</p>
      </div>
    </div>
  )
}
