'use client'

import React, { useState } from 'react'
import JobPositionsTable from './job-positions-table'
import JobPositionCard from './job-position-card'
import PositionDetailModal from './position-detail-modal'
import ApplicationForm from './application-form'

interface JobsClientProps {
  jobsData: any
  positionsData: any
  skipHero?: boolean
  skipPositions?: boolean
  skipApplicationForm?: boolean
  skipQuote?: boolean
}

export default function JobsClient({ 
  jobsData, 
  positionsData, 
  skipHero = false,
  skipPositions = false,
  skipApplicationForm = false,
  skipQuote = false
}: JobsClientProps) {
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format today's date for displaying as "today"
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleApply = (jobId: string) => {
    // Find the position
    const position = positionsData?.openPositions?.find((pos: any) => pos.id === jobId);
    if (position) {
      setSelectedPosition(position);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      {!skipHero && jobsData?.hero && (
        <section className="py-8 lg:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-8">
              <span className="block">{jobsData.hero.title}</span>
              <span className="block text-blue-600 mt-2">{jobsData.hero.subtitle}</span>
            </h1>
            <p 
              className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: jobsData.hero.description }}
            ></p>
          </div>
        </section>
      )}

      {/* Open Positions Section */}
      {!skipPositions && positionsData?.openPositions && positionsData.openPositions.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="text-center mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center lg:text-left">Open Positions</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 w-fit mx-auto lg:mx-0">
                On Development
              </span>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our team and help shape the future of mobile application development
            </p>
          </div>
          
          {/* Desktop/Tablet - Table View */}
          <JobPositionsTable 
            positions={positionsData.openPositions} 
            onApply={handleApply}
          />
          
          {/* Mobile - Card View */}
          <div className="lg:hidden space-y-6">
            {positionsData.openPositions.map((job: any, index: number) => (
              <JobPositionCard 
                key={index} 
                position={job} 
                onApply={handleApply} 
                showDetails={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Position Detail Modal */}
      <PositionDetailModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        position={selectedPosition} 
        onApply={handleApply}
      />

      {/* Application Form Section */}
      {!skipApplicationForm && jobsData?.applicationForm && (
        <ApplicationForm 
          formData={{
            ...jobsData.applicationForm,
            api: jobsData.api
          }} 
          positions={positionsData?.openPositions || []}
          selectedPositionId={selectedPosition?.id}
        />
      )}
      
      {/* Quote Section */}
      {!skipQuote && jobsData?.quote && (
        <section className="py-16 lg:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-light text-gray-600 italic leading-relaxed mb-8">
              &quot;{jobsData.quote.text}&quot;
            </blockquote>
            <div className="text-gray-900">
              <p className="font-semibold text-lg">{jobsData.quote.author}</p>
              <p className="text-gray-600">{jobsData.quote.position}</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
