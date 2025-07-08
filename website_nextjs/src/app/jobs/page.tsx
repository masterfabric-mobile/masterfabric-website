import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import DepartmentCard from '@/components/jobs/department-card'
import BenefitCard from '@/components/jobs/benefit-card'
import HiringProcessSection from '../../components/jobs/hiring-process-section'
import JobPositionCard from '@/components/jobs/job-position-card'
import jobsData from '@/data/jobs.json'
import positionsData from '@/data/positions.json'

export const metadata: Metadata = {
  title: 'Jobs - MasterFabric Inc.',
  description: 'Join our team at MasterFabric Inc. and help us build amazing mobile applications.',
}

export default function JobsPage() {
  return (
    <Container>
      <SectionHead
        title={jobsData.hero.title}
        description={jobsData.hero.description}
      />

      {/* Departments Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {jobsData.companyStructure.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {jobsData.companyStructure.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsData.companyStructure.departments.map((department, index) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {jobsData.employeeCare.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {jobsData.employeeCare.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsData.employeeCare.benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </section>

      {/* Hiring Process */}
      <HiringProcessSection 
        steps={jobsData.hiringProcess.steps}
        title={jobsData.hiringProcess.title}
        description={jobsData.hiringProcess.description}
      />

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our current job openings and find your next opportunity.
          </p>
        </div>
        
        <div className="grid gap-8">
          {positionsData.openPositions.map((position, index) => (
            <JobPositionCard key={index} position={position} />
          ))}
        </div>
      </section>
    </Container>
  )
}
