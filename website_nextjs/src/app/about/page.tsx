import { Metadata } from 'next'
import Container from '@/components/layout/container'
import GitHubProjects from '@/components/about/github-projects'

export const metadata: Metadata = {
  title: 'About - MasterFabric Inc.',
  description: 'Learn more about MasterFabric Inc. and our journey in mobile app development.',
}

export default function AboutPage() {
  return (
    <Container>
      <div className="py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About MasterFabric
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a passionate team of mobile app developers dedicated to creating 
            innovative solutions that help businesses thrive in the digital world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At MasterFabric, we believe that great mobile apps have the power to transform 
              businesses and improve people&apos;s lives. Our mission is to help companies of all 
              sizes harness this power through expertly crafted mobile applications.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We combine cutting-edge technology with thoughtful design to create apps that 
              not only look beautiful but also deliver exceptional user experiences and 
              measurable business results.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Team</h4>
                  <p className="text-gray-600 text-sm">Experienced developers and designers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Process</h4>
                  <p className="text-gray-600 text-sm">Agile methodology and best practices</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Focus</h4>
                  <p className="text-gray-600 text-sm">Rigorous testing and optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Projects Section */}
        <GitHubProjects />
      </div>
    </Container>
  )
}
