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
  const technologies = [
    { icon: <Smartphone className="size-8 md:size-16" />, name: "React Native" },
    { icon: <Monitor className="size-8 md:size-16" />, name: "Flutter" },
    { icon: <Tablet className="size-8 md:size-16" />, name: "iOS" },
    { icon: <Code2 className="size-8 md:size-16" />, name: "Android" },
    { icon: <Database className="size-8 md:size-16" />, name: "Firebase" },
    { icon: <Cloud className="size-8 md:size-16" />, name: "AWS" },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Technologies We Master
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We work with the latest and most reliable technologies to ensure your mobile app 
            is built on a solid foundation for scalability and performance.
          </p>
        </div>

        {/* Technology Icons */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center mb-16">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center space-y-3 group cursor-pointer"
            >
              <div className="text-gray-400 group-hover:text-blue-500 transition-all duration-500 group-hover:scale-125">
                {tech.icon}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300 font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 animate-pulse-gentle">
            <Rocket className="w-10 h-10 text-blue-600" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-in-up-delayed">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-in-up-more-delayed">
            Let&apos;s build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Started Today
            </button>
            <button className="bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105">
              View Our Work
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Support Available</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl lg:text-4xl font-bold text-orange-600">5+</div>
            <div className="text-sm text-gray-600 font-medium">Years Experience</div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Development</h3>
            <p className="text-gray-600 leading-relaxed">
              Rapid prototyping and development cycles to get your app to market quickly.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Architecture</h3>
            <p className="text-gray-600 leading-relaxed">
              Built to grow with your business, from startup to enterprise scale.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cloud Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Seamless cloud services integration for data sync and real-time features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
