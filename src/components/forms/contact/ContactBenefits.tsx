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
    const iconClass = 'w-4 h-4'
    switch (title) {
      case "AI & Agentic":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "Mobile Excellence":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "Fast Delivery":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "24/7 Support":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "Scalable Solutions":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        );
      case "Quality & Security":
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-3 w-full">
      {contactData.benefits.map((benefit: Benefit, index: number) => (
        <div
          key={index}
          className="group flex flex-col gap-2 p-3 rounded-lg border border-gray-200/80 bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/30 transition-all duration-200 text-left select-none"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg ring-1 ring-blue-100/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:ring-blue-200 transition-colors duration-200">
            {getIcon(benefit.title)}
          </div>
          <div className="min-w-0">
            <h3 className="text-gray-900 font-semibold text-xs mb-0.5">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-xs leading-snug">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
