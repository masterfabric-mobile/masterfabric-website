'use client'

import React from 'react'

interface JobPositionsTableProps {
  positions: {
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
  }[]
  onApply: (jobId: string) => void
}

export default function JobPositionsTable({ positions, onApply }: JobPositionsTableProps) {
  // Format date to show "today" if matching current date
  const formatPostedDate = (postedDate: string) => {
    if (postedDate === 'today') {
      return 'Today';
    }
    return postedDate;
  };
  
  return (
    <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Salary</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Posted</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {positions.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.type}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{job.location}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{job.experience}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{job.salary}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatPostedDate(job.posted)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onApply(job.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
