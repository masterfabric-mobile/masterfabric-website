import { Metadata } from 'next'
import Container from '@/components/layout/container'
import SectionHead from '@/components/layout/section-head'
import DepartmentCard from '@/components/jobs/department-card'
import BenefitCard from '@/components/jobs/benefit-card'
import HiringProcessSection from '@/components/jobs/hiring-process-section'
import JobsClient from '@/components/jobs/jobs-client'
import jobsData from '@/data/jobs.json'
import positionsData from '@/data/positions.json'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | MasterFabric',
  description: 'Join our team at MasterFabric and help shape the future of mobile application development.',
}

export default function JobsPage() {
  return (
    <Container>
      <SectionHead
        title={jobsData.sectionHeader.title}
        description={
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {jobsData.sectionHeader.description.map((item: string, i: number) => (
              <p key={i} className="text-lg text-gray-600">{item}</p>
            ))}
          </div>
        }
      />
      
      {/* Hero Section (in JobsClient) */}
      <div className="mb-12">
        <JobsClient 
          jobsData={{
            hero: jobsData.hero,
            api: jobsData.api
          }} 
          positionsData={{}} 
          skipPositions={true}
          skipApplicationForm={true}
          skipQuote={true}
        />
      </div>
      
      {/* 1. Company Structure Section (How We Work) */}
      <section className="py-12 lg:py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {jobsData.companyStructure.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {jobsData.companyStructure.description}
          </p>
        </div>
        
        {/* 2. Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {jobsData.companyStructure.departments.map((department: any, index: number) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>
      </section>

      {/* 3. Employee Care Section (Benefits) */}
      <section className="py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {jobsData.employeeCare.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {jobsData.employeeCare.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsData.employeeCare.benefits.map((benefit: any, index: number) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </section>
      
      {/* 4. Hiring Process Section */}
      <HiringProcessSection 
        steps={jobsData.hiringProcess.steps}
        title={jobsData.hiringProcess.title}
        description={jobsData.hiringProcess.description}
      />
      
      {/* 5. Open Positions and Application Form */}
      <div className="mt-12">
        <JobsClient 
          jobsData={{
            applicationForm: jobsData.applicationForm,
            quote: jobsData.quote,
            api: jobsData.api
          }} 
          positionsData={positionsData}
          skipHero={true}
        />
      </div>

     
    </Container>
  )
}
