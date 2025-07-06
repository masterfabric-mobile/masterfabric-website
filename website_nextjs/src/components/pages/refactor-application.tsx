'use client'

import React from 'react'
import { Zap, BarChart3, Users, Settings } from 'lucide-react'

export default function RefactorApplication() {
  const services = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Event Tracking",
      description: "Track user interactions and behaviors with detailed analytics and insights",
      color: "blue"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Crash Reports & Monitoring", 
      description: "Real-time monitoring and crash reporting for improved app stability",
      color: "indigo"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Reports",
      description: "Comprehensive data insights and metrics to drive growth strategies", 
      color: "purple"
    },
    {
      icon: <Users className="w-8 h-8" />,
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
                Let&apos;s discuss how we can enhance your app&apos;s performance and user experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Fast Implementation</h4>
                <p className="text-gray-600 leading-relaxed">Get your optimized app within 2-4 weeks with our proven development process.</p>
              </div>

              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h4>
                <p className="text-gray-600 leading-relaxed">Our optimization strategies have improved app performance by up to 300% on average.</p>
              </div>

              <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h4>
                <p className="text-gray-600 leading-relaxed">Work with experienced developers who understand mobile app optimization inside and out.</p>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Start Your App Optimization
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
