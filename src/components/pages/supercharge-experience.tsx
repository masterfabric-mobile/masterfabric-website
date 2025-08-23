'use client'

import React from 'react'
import { 
  Zap,
  Database,
  Cloud
} from 'lucide-react'

export default function SuperchargeExperience() {
  return (
    <section className="py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
  <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4">
            <span className="block">Supercharge Your</span>
            <span className="block text-blue-600">App Experience</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful companies that have optimized their applications with MasterFabric. <br />
            Let&apos;s discuss how we can enhance your app&apos;s <span className="font-semibold text-blue-600">performance</span> and <span className="font-semibold text-gray-600">user experience</span>.
          </p>
          {/* Divider removed for a cleaner, more minimal header */}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-200/70 hover:border-gray-300 transition-all duration-200 hover:-translate-y-1 bg-white">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg ring-1 ring-blue-100 text-blue-700 bg-blue-50 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">Fast Implementation</h4>
              <p className="text-gray-600 leading-relaxed">Get your optimized app within 2-4 weeks with our proven development process.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-200/70 hover:border-gray-300 transition-all duration-200 hover:-translate-y-1 bg-white">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg ring-1 ring-blue-100 text-blue-700 bg-blue-50 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors">
              <Database className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">Data-Driven Results</h4>
              <p className="text-gray-600 leading-relaxed">Achieve measurable improvements in performance, user engagement, and conversion rates.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-200/70 hover:border-gray-300 transition-all duration-200 hover:-translate-y-1 bg-white">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg ring-1 ring-blue-100 text-blue-700 bg-blue-50 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors">
              <Cloud className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">Ongoing Support</h4>
              <p className="text-gray-600 leading-relaxed">Continuous monitoring, updates, and technical support for long-term success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 