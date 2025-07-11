'use client'

import React from 'react'
import './styles/process-steps.css'

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  processSteps: ProcessStep[];
  currentColor?: string; // e.g. 'text-blue-600' or '#2563eb'
}

const stepColors = [
  'bg-blue-600', // fast
  'bg-green-600', // controlled
  'bg-purple-600', // tested
  'bg-red-600', // running
];

const ProcessSteps: React.FC<ProcessStepsProps> = ({ processSteps, currentColor }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto process-steps-grid">
      {processSteps.map((step, index) => (
        <div key={index} className="text-center process-step">
          <div className="text-3xl mb-2">{step.icon}</div>
          <h4 className="font-medium text-gray-800">{step.title}</h4>
          <p className="text-sm text-slate-500">{step.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProcessSteps
