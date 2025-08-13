'use client'

import React from 'react';
import { Icon } from '@iconify/react';
import styles from '../../styles/logos.module.css';

export default function CTA() {
  return (
    <section className="py-16 lg:pb-8 lg:pt-16 relative overflow-hidden">
      {/* Animated background elements with emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-25 animate-float-slow"></div>
        {/* Floating emojis */}
        <div className="absolute top-32 right-20 text-4xl animate-float opacity-30">🚀</div>
        <div className="absolute bottom-32 left-20 text-3xl animate-float-delayed opacity-25">💡</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float-slow opacity-20">⭐</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-float opacity-15">✨</div>
        <div className="absolute top-1/4 left-16 text-2xl animate-float-delayed opacity-20">🎯</div>
        <div className="absolute bottom-1/4 right-12 text-2xl animate-float-slow opacity-25">🎨</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Technologies Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-center text-2xl text-slate-500">
            Our Experts Works with your technologies <span className="animate-pulse text-red-500">&hearts;</span>
          </h2>
          <div className="flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap">
            <Icon className="size-8 md:size-12 text-gray-400 hover:text-blue-600 transition-all duration-500 hover:scale-125" icon="simple-icons:flutter" />
            <Icon className="size-8 md:size-12 text-gray-400 hover:text-pink-600 transition-all duration-500 hover:scale-125" icon="simple-icons:nestjs" />
            <Icon className="size-8 md:size-12 text-gray-400 hover:text-orange-500 transition-all duration-500 hover:scale-125" icon="simple-icons:swift" />
            <Icon className="size-8 md:size-12 text-gray-400 hover:text-purple-600 transition-all duration-500 hover:scale-125" icon="simple-icons:kotlin" />
            <Icon className="size-8 md:size-16 text-gray-400 hover:text-blue-500 transition-all duration-500 hover:scale-125" icon="simple-icons:react" />
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 animate-pulse-gentle">
            <Icon className="w-10 h-10 text-blue-600" icon="bx:rocket" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-slide-in-up-delayed">
            Ready to Start Your Project?
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-in-up-more-delayed">
            Let&apos;s build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up-final">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="group inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
