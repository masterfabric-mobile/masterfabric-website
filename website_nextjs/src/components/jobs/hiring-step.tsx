'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  ClipboardList, 
  Users, 
  Zap, 
  Target, 
  Star, 
  FileText, 
  Phone, 
  Video, 
  Code, 
  CheckCheck, 
  UserCheck,
  ChevronDown,
  Clock
} from 'lucide-react'
import './styles/hiring-step.css'

interface HiringStepProps {
  step: {
    number: string
    title: string
    duration: string
    description: string
    icon?: string
    iconName?: string
    details: string[]
  }
  index: number
  isLast?: boolean
}

export default function HiringStep({ step, index, isLast = false }: HiringStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  
  // Get the appropriate icon based on iconName or title
  const getIcon = () => {
    if (step.icon && !step.iconName) {
      // Legacy emoji support
      return <span className="text-2xl">{step.icon}</span>;
    }

    if (step.iconName) {
      switch(step.iconName.toLowerCase()) {
        case 'clipboard':
          return <ClipboardList className="w-7 h-7 text-blue-600" />;
        case 'handshake':
          return <Users className="w-7 h-7 text-blue-600" />;
        case 'zap':
          return <Zap className="w-7 h-7 text-blue-600" />;
        case 'target':
          return <Target className="w-7 h-7 text-blue-600" />;
        default:
          return <Star className="w-7 h-7 text-blue-600" />;
      }
    }
    
    // Determine icon based on step title
    const title = step.title.toLowerCase();
    
    if (title.includes('application') || title.includes('apply')) {
      return <FileText className="w-7 h-7 text-blue-600" />;
    } else if (title.includes('phone') || title.includes('call')) {
      return <Phone className="w-7 h-7 text-blue-600" />;
    } else if (title.includes('interview') || title.includes('meeting')) {
      return <Video className="w-7 h-7 text-blue-600" />;
    } else if (title.includes('technical') || title.includes('test')) {
      return <Code className="w-7 h-7 text-blue-600" />;
    } else if (title.includes('decision') || title.includes('final')) {
      return <CheckCheck className="w-7 h-7 text-blue-600" />;
    } else {
      return <UserCheck className="w-7 h-7 text-blue-600" />;
    }
  };
  
  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle expanded content height
  useEffect(() => {
    if (expandedContentRef.current) {
      if (isExpanded) {
        expandedContentRef.current.style.maxHeight = `${expandedContentRef.current.scrollHeight}px`;
      } else {
        expandedContentRef.current.style.maxHeight = '0px';
      }
    }
  }, [isExpanded]);
  
  return (
    <div className="text-center w-full relative hiring-step">
      {/* Step Circle */}
      <div className="relative mb-6">
        <div className="step-number w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto relative z-10 border-4 border-white shadow-lg shadow-blue-200/50">
          {step.number}
        </div>
        
        {/* No connector lines in grid layout */}
      </div>
      
      {/* Step Content Card */}
      <div className="hiring-step-card bg-white rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full h-full min-h-[260px] mt-4">
        {/* Card Content - Clickable to expand/collapse */}
        <div 
          className="card-content p-4 sm:p-5" 
          onClick={toggleExpand}
        >
          {/* Icon */}
          <div className="icon-container w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
            {getIcon()}
          </div>
          
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
          
          {/* Duration Badge */}
          <div className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100 mb-3">
            <Clock className="w-3.5 h-3.5 text-blue-500 mr-1" />
            <span className="text-xs sm:text-sm text-blue-700 font-medium">{step.duration}</span>
          </div>
        </div>
        
        {/* Expanded Content */}
        <div 
          ref={expandedContentRef}
          className={`expanded-content px-4 sm:px-5 pb-4 sm:pb-5 max-h-0 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="border-t border-gray-100 pt-3 space-y-3">
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
            
            <div className="space-y-2">
              {step.details.map((detail, idx) => (
                <div key={idx} className="text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2.5 sm:p-3 border border-gray-100 leading-relaxed">
                  <span className="break-words">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Expand/Collapse Button */}
        <div className="px-4 sm:px-5 pb-3">
          <button 
            className="expand-btn w-full flex items-center justify-center py-1.5 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
