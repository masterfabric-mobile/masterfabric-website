'use client'

import React from 'react'
import { Zap, BarChart3, Users, Settings, Cloud, Database } from 'lucide-react'
import { Icon } from '@iconify/react';

export default function RefactorApplication() {
  const services = [
    {
      icon: <BarChart3 className="w-8 h-8" />, // Event Tracking
      title: "Event Tracking",
      description: "Track user interactions and behaviors with detailed analytics and insights",
      color: "blue"
    },
    {
      icon: <Settings className="w-8 h-8" />, // Crash Reports & Monitoring
      title: "Crash Reports & Monitoring", 
      description: "Monitor app stability and identify performance issues in real-time",
      color: "indigo"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />, // Analytics Reports
      title: "Analytics Reports",
      description: "Comprehensive data insights and metrics to drive growth strategies", 
      color: "purple"
    },
    {
      icon: <Cloud className="w-8 h-8" />, // Release Monitoring (Cloud icon as closest match)
      title: "Release Monitoring",
      description: "Track deployment success and monitor issues with real-time alerts",
      color: "cyan"
    },
    {
      icon: <Database className="w-8 h-8" />, // BigData Management
      title: "BigData Management",
      description: "Process and analyze large datasets to extract meaningful insights",
      color: "slate"
    },
    {
      icon: <Users className="w-8 h-8" />, // User Growth & Retention
      title: "User Growth & Retention",
      description: "Optimize user acquisition and engagement to increase retention rates",
      color: "teal"
    }
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="triangles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,2 18,16 2,16" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#triangles)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
            <span className="block">App Design,</span>
            <span className="block text-blue-600">Optimization</span>
            <span className="block">and Growth</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Already have an app? We can help refresh its look and enhance its performance. 
            We focus on improving user experience and applying the latest technologies.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          
          {/* Services Column */}
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="service-card group relative p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white shadow-sm hover:shadow-xl"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-5 overflow-hidden rounded-tr-2xl">
                    <div className={`w-full h-full bg-${service.color}-500 transform rotate-45 translate-x-6 -translate-y-6`}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${service.color}-50 border-2 border-${service.color}-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`text-${service.color}-600`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* App Showcase Column */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="sticky top-24">
              <div className="relative mx-auto">
                <div className="relative bg-gray-900 rounded-[2.25rem] p-2 shadow-2xl" style={{aspectRatio: '9/19.5', width: '250px', maxWidth: '100%'}}>
                  {/* Phone Screen */}
                  <div className="relative rounded-[2.25rem] overflow-hidden h-full bg-white">
                    <div className="h-full relative flex flex-col p-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">App Performance</h3>
                        <div className="text-3xl font-bold text-blue-600">95%</div>
                        <p className="text-sm text-gray-600">Optimization Score</p>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <div className="text-sm font-semibold text-gray-800 mb-2">Real-time Analytics</div>
                          <div className="text-xs text-blue-600">↗ +25% improvement</div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                          <div className="text-sm font-semibold text-gray-800 mb-2">User Engagement</div>
                          <div className="text-xs text-green-600">↗ +18% increase</div>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                          <div className="text-sm font-semibold text-gray-800 mb-2">Crash Rate</div>
                          <div className="text-xs text-purple-600">↓ -89% reduction</div>
                        </div>
                      </div>

                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold text-sm transition-all duration-200">
                        Optimize Now! 🎯
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Integrations Section */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">Third-Party</span>
                <span className="block text-blue-600">Integrations</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Maximize your app's potential with <span className="font-semibold text-blue-600">strategic integrations</span>,
                accelerating development processes and helping you achieve your <span className="font-semibold text-blue-600">growth</span>
                objectives faster than ever before.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Firebase */}
              <div className="integration-partner group relative cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto">
                  <Icon icon="simple-icons:firebase" className="w-12 h-12 text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" />
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Firebase</h4>
                  <p className="text-sm text-gray-600">Backend services, analytics, and real-time database</p>
                </div>
              </div>
              {/* Meta Analytics */}
              <div className="integration-partner group relative cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto">
                  <Icon icon="simple-icons:meta" className="w-12 h-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Meta Analytics</h4>
                  <p className="text-sm text-gray-600">Advanced user behavior tracking and insights</p>
                </div>
              </div>
              {/* Mixpanel */}
              <div className="integration-partner group relative cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto">
                  <Icon icon="simple-icons:mixpanel" className="w-12 h-12 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Mixpanel</h4>
                  <p className="text-sm text-gray-600">Product analytics and user engagement metrics</p>
                </div>
              </div>
              {/* Google Analytics */}
              <div className="integration-partner group relative cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mx-auto">
                  <Icon icon="simple-icons:googleanalytics" className="w-12 h-12 text-gray-400 group-hover:text-emerald-600 transition-colors duration-300" />
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-600">Comprehensive web and app analytics platform</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
                * Custom third-party integrations specific to your product are evaluated and
                customized based on the analysis you provide during our collaboration process.
                We support 50+ popular services and can integrate with any API.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">Supercharge Your</span>
                <span className="block text-blue-600">App Experience</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of successful companies that have optimized their applications with MasterFabric. 
                Let's discuss how we can enhance your app's <span className="font-semibold text-blue-600">performance</span> and <span className="font-semibold text-gray-600">user experience</span>.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Fast Implementation */}
              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Fast Implementation</h4>
                <p className="text-gray-600 leading-relaxed">Get your optimized app within 2-4 weeks with our proven development process.</p>
              </div>
              {/* Data-Driven Results */}
              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Data-Driven Results</h4>
                <p className="text-gray-600 leading-relaxed">Achieve measurable improvements in performance, user engagement, and conversion rates.</p>
              </div>
              {/* Ongoing Support */}
              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Ongoing Support</h4>
                <p className="text-gray-600 leading-relaxed">Continuous monitoring, updates, and technical support for long-term success.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
