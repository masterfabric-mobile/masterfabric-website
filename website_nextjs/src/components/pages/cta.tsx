'use client'

import React from 'react'
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react'
import { Icon } from '@iconify/react';

export default function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Technologies Heading */}
          <div className="text-gray-500 text-lg font-medium mb-8 flex flex-col items-center">
            <span>Our Experts Works with your technologies <span className="text-red-500">❤️</span></span>
            {/* Tech Icons Row */}
            <div className="flex justify-center items-center gap-8 mt-6 mb-2">
              <Icon icon="simple-icons:flutter" className="w-10 h-10 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
              <Icon icon="simple-icons:nestjs" className="w-10 h-10 text-gray-400 hover:text-red-500 transition-colors duration-300" />
              <Icon icon="simple-icons:swift" className="w-10 h-10 text-gray-400 hover:text-orange-500 transition-colors duration-300" />
              <Icon icon="simple-icons:kotlin" className="w-10 h-10 text-gray-400 hover:text-purple-500 transition-colors duration-300" />
              <Icon icon="simple-icons:react" className="w-10 h-10 text-gray-400 hover:text-blue-400 transition-colors duration-300" />
            </div>
          </div>

          {/* Rocket Icon Box */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Icon icon="ph:rocket-launch" className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Let&apos;s build something amazing together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-2">
            <a
              href="#contact"
              className="group bg-blue-600 text-white hover:bg-blue-700 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center space-x-2 text-lg shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Icon icon="ph:rocket-launch" className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:translate-x-2" />
              <span>Get Started</span>
            </a>
            <a
              href="#learn-more"
              className="group border-2 border-gray-200 text-gray-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center space-x-2 text-lg transform hover:scale-105 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <Icon icon="ph:books" className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-blue-500" />
              <span>Learn More</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
