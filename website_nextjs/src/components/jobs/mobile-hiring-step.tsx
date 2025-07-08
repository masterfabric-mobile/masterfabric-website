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

interface MobileHiringStepProps {
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

export default function MobileHiringStep({ step, index, isLast = false }: MobileHiringStepProps) {
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
    <div className="relative mb-8 last:mb-0">
      {/* Step number with connecting line */}
      <div className="absolute left-5 top-0 bottom-0 flex flex-col items-center">
        <div className="step-number w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10 border-4 border-white shadow-lg shadow-blue-200/50">
          {step.number}
        </div>
        {!isLast && (
          <div className="h-full w-1 bg-gradient-to-b from-blue-400 to-blue-500 mt-1"></div>
        )}
      </div>

      {/* Step Content Card */}
      <div className="hiring-step-card bg-white rounded-xl shadow-lg border border-blue-100 ml-20 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        {/* Card Header - Clickable to expand/collapse */}
        <div 
          className="card-content p-4"
          onClick={toggleExpand}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="icon-container w-12 h-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-100 shadow-sm">
              {getIcon()}
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              <div className="inline-flex items-center mt-1">
                <Clock className="w-3 h-3 text-blue-500 mr-1" />
                <span className="text-xs text-blue-700 font-medium">{step.duration}</span>
              </div>
            </div>
            
            <div className="ml-auto">
              <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>
        
        {/* Expanded Content */}
        <div 
          ref={expandedContentRef}
          className={`expanded-content px-4 pb-4 max-h-0 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="border-t border-gray-100 pt-3 space-y-3">
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            
            <div className="space-y-2">
              {step.details.map((detail, idx) => (
                <div key={idx} className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-100 leading-relaxed">
                  <span className="break-words">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
