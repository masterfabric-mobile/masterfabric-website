import React from 'react'

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
}

export default function JobPositionCard({ position }: JobPositionCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {position.department}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {position.type}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {position.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {position.experience}
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">Posted {position.posted}</div>
          <div className="text-sm text-red-600">Deadline: {position.deadline}</div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{position.description}</p>
      
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
      
      <div className="flex flex-wrap gap-2 mb-4">
        {position.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  )
}
