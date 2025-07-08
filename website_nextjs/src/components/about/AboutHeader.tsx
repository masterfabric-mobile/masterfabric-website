'use client'

import React from 'react'

interface AboutHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mt-12">
      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-8 px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent min-w-[20px]"></div>
        <div className="mx-6 w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent min-w-[20px]"></div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:text-lg">{title}</h3>
      <p className="text-slate-600 mb-8 sm:text-sm">{subtitle}</p>
      
      <div className="mb-8 px-4">
        <p className="text-lg leading-relaxed text-slate-700 max-w-4xl mx-auto sm:text-base" 
           dangerouslySetInnerHTML={{ __html: description }}>
        </p>
      </div>
    </div>
  )
}

export default AboutHeader
