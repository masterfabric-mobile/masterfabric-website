'use client'

import React, { useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface PositionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  position: {
    id: string
    title: string
    department: string
    type: string
    location: string
    experience: string
    salary: string
    posted: string
    deadline?: string
    description: string
    requirements?: string[]
    responsibilities?: string[]
    tags?: string[]
  } | null
  onApply: (jobId: string) => void
}

export default function PositionDetailModal({ isOpen, onClose, position, onApply }: PositionDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="px-4 py-8 w-full max-w-4xl">
        <div 
          ref={modalRef}
          className="bg-white rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{position.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {position.department}
                  </span>
                  <span className="text-sm text-gray-600">{position.type}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span> {position.location}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Experience:</span> {position.experience}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Salary:</span> {position.salary}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Posted:</span> {position.posted}
                </div>
                {position.deadline && (
                  <div className="text-sm text-red-600">
                    <span className="font-semibold">Application Deadline:</span> {position.deadline}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <p className="text-gray-600">{position.description}</p>
            </div>
            
            {position.requirements && position.requirements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {position.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {position.responsibilities && position.responsibilities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {position.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-600">{resp}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {position.tags && position.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {position.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-center pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  onApply(position.id);
                  onClose();
                  // Scroll to application form with a small delay to ensure the modal is closed
                  setTimeout(() => {
                    const applicationFormSection = document.getElementById('application-form-section');
                    
                    if (applicationFormSection) {
                      // Calculate the position to scroll to (top of the section minus offset)
                      const rect = applicationFormSection.getBoundingClientRect();
                      const offset = window.pageYOffset;
                      const targetScrollPosition = rect.top + offset - 120; // 120px from the top
                      
                      // Scroll to calculated position
                      window.scrollTo({
                        top: targetScrollPosition,
                        behavior: 'smooth'
                      });
                      
                      // Highlight the form section briefly to draw attention
                      applicationFormSection.classList.add('pulse-animation');
                      setTimeout(() => {
                        applicationFormSection.classList.remove('pulse-animation');
                      }, 2000);
                    }
                  }, 100);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
