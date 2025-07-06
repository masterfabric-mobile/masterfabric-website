'use client'

import React from 'react'
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            <span className="block">Ready to Build</span>
            <span className="block">Your Dream App?</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
            Transform your ideas into powerful mobile applications that users love. 
            Our expert team is ready to bring your vision to life with cutting-edge technology 
            and innovative design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule a Call</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold">Fast Development</h3>
              <p className="text-blue-100 leading-relaxed">
                Get your app to market quickly with our agile development process and 
                proven methodologies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold">Expert Team</h3>
              <p className="text-blue-100 leading-relaxed">
                Work with experienced developers, designers, and product managers who 
                understand your business needs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-blue-100 leading-relaxed">
                Receive high-quality, scalable applications built with the latest 
                technologies and best practices.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center text-blue-100">
              <div>
                <h4 className="font-semibold text-white mb-2">Email Us</h4>
                <p>hello@masterfabric.co</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Response Time</h4>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
