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
  const openPositions = positionsData?.openPositions || []
  const isHiring = openPositions.length > 0
  const status = jobsData?.hiringStatus || {
    openBadge: 'Hiring',
    openTitle: 'Open Positions',
    openDescription: 'Current openings at MasterFabric.',
    closedBadge: 'Not hiring',
    closedTitle: 'No open positions',
    closedDescription: 'We are not actively hiring right now. New roles will be published on this page when hiring opens.',
  }

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
      {!skipPositions && (
        <section className="py-4 lg:py-8">
          {isHiring ? (
            <>
              <div className="text-center mb-8 lg:mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 mb-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center lg:text-left">
                    {status.openTitle}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 w-fit mx-auto lg:mx-0">
                    {status.openBadge}
                  </span>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {status.openDescription}
                </p>
              </div>
              <JobPositionsTable
                positions={openPositions}
                onApply={handleApply}
              />
              <div className="lg:hidden space-y-6">
                {openPositions.map((job: any, index: number) => (
                  <JobPositionCard
                    key={job.id || index}
                    position={job}
                    onApply={handleApply}
                    showDetails={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-slate-50 px-6 py-12 text-center">
              <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                {status.closedBadge}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">{status.closedTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-gray-600">
                {status.closedDescription}
              </p>
            </div>
          )}
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
      {!skipApplicationForm && isHiring && jobsData?.applicationForm && (
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
