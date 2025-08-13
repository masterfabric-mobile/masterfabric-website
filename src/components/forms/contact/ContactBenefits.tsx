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
  // Minimal SVG Icons
  const getIcon = (title: string) => {
    switch (title) {
      case "Mobile Excellence":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "Fast Delivery":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "24/7 Support":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "Scalable Solutions":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="flex justify-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-sm">
        {contactData.benefits.map((benefit: Benefit, index: number) => (
        <div 
          key={index} 
          className="group flex flex-col items-start gap-1 p-2 rounded-lg transition-all duration-200 text-left select-none"
        >
          {/* Simple icon container */}
          <div className="flex-shrink-0 w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 pointer-events-none">
            {getIcon(benefit.title)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0 pointer-events-none">
            <h3 className="text-gray-900 font-semibold text-xs mb-0.5">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-xs leading-tight">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
