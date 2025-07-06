'use client'

import React from 'react'
import { CheckCircle, Clock, Users, Rocket } from 'lucide-react'

export default function ProjectFlowTimeline() {
  const phases = [
    {
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap.",
      icon: <Users className="w-6 h-6" />,
      status: "completed",
      duration: "1-2 weeks"
    },
    {
      title: "Design & Prototyping", 
      description: "Creating wireframes, UI/UX designs, and interactive prototypes.",
      icon: <Clock className="w-6 h-6" />,
      status: "in-progress",
      duration: "2-3 weeks"
    },
    {
      title: "Development",
      description: "Building your app with clean code and best practices.",
      icon: <CheckCircle className="w-6 h-6" />,
      status: "pending",
      duration: "4-8 weeks"
    },
    {
      title: "Testing & Deployment",
      description: "Rigorous testing and deployment to app stores.",
      icon: <Rocket className="w-6 h-6" />,
      status: "pending", 
      duration: "1-2 weeks"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our Development Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We follow a proven methodology to ensure your project is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden md:block"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className="relative">
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${getStatusColor(phase.status)}`}>
                          {phase.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {phase.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {phase.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600 font-medium">
                              Duration: {phase.duration}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              phase.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : phase.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {phase.status === 'completed' ? 'Completed' : 
                               phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-6 h-6 rounded-full border-4 border-white ${getStatusColor(phase.status)}`}></div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full md:w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project requirements and create a custom development plan 
              that fits your timeline and budget.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
