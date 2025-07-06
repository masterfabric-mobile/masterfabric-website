import React from 'react'

interface DepartmentCardProps {
  department: {
    name: string
    description: string
    size: string
    technologies: string[]
    icon: {
      paths: string[]
      color: string
    }
  }
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: department.icon.color }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {department.icon.paths.map((path, i) => (
              <path key={i} d={path} />
            ))}
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{department.name}</h3>
          <span className="text-sm text-gray-600">{department.size}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{department.description}</p>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {department.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
