'use client'

import React from 'react'
import { MapPin, Clock, Banknote, Calendar } from 'lucide-react'
import './styles/job-position-card.css'

interface JobPositionCardProps {
  position: {
    id: string
    title: string
    department: string
    type: string
    location: string
    experience: string
    salary: string
    posted: string
    deadline: string
    description: string
    requirements: string[]
    responsibilities: string[]
    tags: string[]
  }
  onApply?: (jobId: string) => void
  showDetails?: boolean
}

export default function JobPositionCard({ position, onApply, showDetails = true }: JobPositionCardProps) {
  
  const handleApply = () => {
    if (onApply) {
      onApply(position.id);
    }
  };

  // Format date to show "today" if matching current date
  const formatPostedDate = (postedDate: string) => {
    if (postedDate === 'today') {
      return 'today';
    }
    return postedDate;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{position.title}</h3>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {position.department}
            </span>
            <span>{position.type}</span>
          </div>
        </div>
        <button 
          className="job-apply-btn px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          data-job-id={position.id}
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{position.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{position.experience}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Banknote className="w-4 h-4 mr-2" />
          <span>{position.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Posted {formatPostedDate(position.posted)}</span>
        </div>
        {position.deadline && (
          <div className="flex items-center text-sm text-red-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Deadline: {position.deadline}</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{position.description}</p>
      
      {showDetails && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
            <ul className="space-y-1">
              {position.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                  {req}
                </li>
              ))}
              {position.requirements.length > 3 && (
                <li className="text-sm text-gray-500">+ {position.requirements.length - 3} more...</li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
            <ul className="space-y-1">
              {position.responsibilities.slice(0, 3).map((resp, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                  {resp}
                </li>
              ))}
              {position.responsibilities.length > 3 && (
                <li className="text-sm text-gray-500">+ {position.responsibilities.length - 3} more...</li>
              )}
            </ul>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {position.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {showDetails && (
        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleApply}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Now
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            View Details
          </button>
        </div>
      )}
    </div>
  )
}
