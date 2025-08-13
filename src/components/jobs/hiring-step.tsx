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
      return <span className="text-xl sm:text-2xl">{step.icon}</span>;
    }

    if (step.iconName) {
      switch(step.iconName.toLowerCase()) {
        case 'clipboard':
          return <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
        case 'handshake':
          return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
        case 'zap':
          return <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
        case 'target':
          return <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
        default:
          return <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
      }
    }
    
    // Determine icon based on step title
    const title = step.title.toLowerCase();
    
    if (title.includes('application') || title.includes('apply')) {
      return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
    } else if (title.includes('phone') || title.includes('call')) {
      return <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
    } else if (title.includes('interview') || title.includes('meeting')) {
      return <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
    } else if (title.includes('technical') || title.includes('test')) {
      return <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
    } else if (title.includes('decision') || title.includes('final')) {
      return <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
    } else {
      return <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
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
    <div className="text-center w-full relative hiring-step px-2 sm:px-0 mb-6 sm:mb-4">
      {/* Step Circle - Hidden on mobile */}
      <div className="relative mb-3 sm:mb-4 hidden sm:block">
        <div className="step-number w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm mx-auto">
          {step.number}
        </div>
      </div>
      
      {/* Step Content Card */}
      <div className="hiring-step-card bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 overflow-hidden cursor-pointer w-full h-full min-h-[160px] sm:min-h-[200px] mt-0 sm:mt-4 mx-auto max-w-xs sm:max-w-none flex flex-col">
        {/* Card Content - Clickable to expand/collapse */}
        <div 
          className="card-content p-2 sm:p-3 flex flex-col items-center text-center flex-grow" 
          onClick={toggleExpand}
        >
          {/* Icon */}
          <div className="icon-container w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-2 border border-blue-100">
            {getIcon()}
          </div>
          
          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 leading-tight">{step.title}</h3>
          
          {/* Duration Badge */}
          <div className="inline-flex items-center px-2 py-1 bg-blue-50 rounded-full mb-2 border border-blue-100">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 mr-1" />
            <span className="text-xs text-blue-700 font-medium">{step.duration}</span>
          </div>
          
          {/* Spacer */}
          <div className="flex-grow"></div>
          
          {/* Expand/Collapse Button */}
          <div className="mt-auto">
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} text-blue-600`} />
          </div>
        </div>
        
        {/* Expanded Content */}
        <div 
          ref={expandedContentRef}
          className={`expanded-content px-2 sm:px-3 pb-2 sm:pb-3 max-h-0 overflow-hidden transition-all duration-300 ease-in-out text-center ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="border-t border-gray-100 pt-2 space-y-2">
            <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
            
            <div className="space-y-1">
              {step.details.map((detail, idx) => (
                <div key={idx} className="text-xs text-gray-600 bg-gray-50 rounded p-2 leading-relaxed">
                  <span className="break-words">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
