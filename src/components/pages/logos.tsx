'use client'

import React from 'react'
import { 
  Smartphone, 
  Monitor, 
  TabletIcon as Tablet,
  Code2,
  Database,
  Cloud,
  Zap,
  Rocket
} from 'lucide-react'

export default function Logos() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            <span className="block">Supercharge Your</span>
            <span className="block text-blue-600">App Experience</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful companies that have optimized their applications with MasterFabric. <br />
            Let&apos;s discuss how we can enhance your app&apos;s <span className="font-semibold text-blue-600">performance</span> and <span className="font-semibold text-gray-600">user experience</span>.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Fast Implementation</h4>
            <p className="text-gray-600 leading-relaxed">Get your optimized app within 2-4 weeks with our proven development process.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <Database className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Data-Driven Results</h4>
            <p className="text-gray-600 leading-relaxed">Achieve measurable improvements in performance, user engagement, and conversion rates.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Ongoing Support</h4>
            <p className="text-gray-600 leading-relaxed">Continuous monitoring, updates, and technical support for long-term success.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
