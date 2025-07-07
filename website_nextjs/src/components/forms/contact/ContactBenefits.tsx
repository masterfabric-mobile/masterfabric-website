import React from 'react'
import contactData from '@/data/contact-section.json'

// Define the benefit interface
interface Benefit {
  emoji?: string;
  bgColor?: string;
  gradientColor?: string;
  hoverGradient?: string;
  rippleColor?: string;
  title: string;
  description: string;
  icon?: {
    viewBox?: string;
    paths: string[];
  };
}

export default function ContactBenefits() {
  // SVG Icons for benefits
  const getIconContent = (benefit: any, index: number) => {
    // If the benefit has custom SVG icon paths
    if (benefit.icon && benefit.icon.paths) {
      return (
        <svg className="w-6 h-6" viewBox={benefit.icon.viewBox || "0 0 24 24"} fill="currentColor">
          {benefit.icon.paths.map((path: string, i: number) => (
            <path key={i} d={path}></path>
          ))}
        </svg>
      );
    }
    
    // Default icons based on index if no custom icon is provided
    if (index === 0) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      );
    } else if (index === 1) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      );
    } else if (index === 2) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
        </svg>
      );
    }
  };

  return (
    <div>
      {/* Benefits 2x2 Grid - Matching the design with circular colored icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {contactData.benefits.map((benefit: Benefit, index: number) => {
          const bgColor = benefit.bgColor || "bg-blue-500";
          
          return (
            <div key={index} className="flex items-start gap-5">
              {/* Circular colored icon */}
              <div className={`flex-shrink-0 ${bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md`}>
                {getIconContent(benefit, index)}
              </div>
              
              {/* Text content with bold title */}
              <div className="flex flex-col">
                <h3 className="text-[#121826] text-lg font-bold mb-1">{benefit.title}</h3>
                <p className="text-gray-600 text-base">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
