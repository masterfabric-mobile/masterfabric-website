'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import referencesData from '../../data/references.json'

interface Reference {
  id: string
  name: string
  logo: string
  website: string
}

const References: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
Brands we’ve collaborated with.
        </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
Driving value through design, code, and strategy.            </p>
        </div>

        {/* Scrolling References Container */}
        <div className="relative overflow-hidden h-24 scrolling-container">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className={`flex items-center h-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* First set of logos */}
            <div className="flex animate-scroll-left space-x-16 items-center min-w-max will-change-transform">
              {referencesData.references.map((reference: Reference) => (
                <div
                  key={`first-${reference.id}`}
                  className="flex-shrink-0 group cursor-pointer relative"
                  onMouseEnter={() => setHoveredId(reference.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => window.open(reference.website, '_blank')}
                >
                  <div className="relative w-36 h-20 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:z-20">
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        hoveredId === reference.id
                          ? 'bg-white shadow-xl'
                          : 'bg-transparent'
                      }`}
                    />
                    <div className="relative z-10 w-32 h-16 flex items-center justify-center">
                      <Image
                        src={reference.logo}
                        alt={reference.name}
                        width={128}
                        height={64}
                        className={`transition-all duration-300 object-contain max-w-full max-h-full ${
                          hoveredId === reference.id
                            ? 'filter-none'
                            : 'filter grayscale opacity-60'
                        }`}
                        style={{
                          filter: hoveredId === reference.id 
                            ? 'none' 
                            : 'grayscale(100%) opacity(0.6)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-30 ${
                    hoveredId === reference.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                      {reference.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless scrolling */}
            <div className="flex animate-scroll-left space-x-16 items-center min-w-max ml-16 will-change-transform">
              {referencesData.references.map((reference: Reference) => (
                <div
                  key={`second-${reference.id}`}
                  className="flex-shrink-0 group cursor-pointer relative"
                  onMouseEnter={() => setHoveredId(reference.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => window.open(reference.website, '_blank')}
                >
                  <div className="relative w-36 h-20 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:z-20">
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        hoveredId === reference.id
                          ? 'bg-white shadow-xl'
                          : 'bg-transparent'
                      }`}
                    />
                    <div className="relative z-10 w-32 h-16 flex items-center justify-center">
                      <Image
                        src={reference.logo}
                        alt={reference.name}
                        width={128}
                        height={64}
                        className={`transition-all duration-300 object-contain max-w-full max-h-full ${
                          hoveredId === reference.id
                            ? 'filter-none'
                            : 'filter grayscale opacity-60'
                        }`}
                        style={{
                          filter: hoveredId === reference.id 
                            ? 'none' 
                            : 'grayscale(100%) opacity(0.6)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-30 ${
                    hoveredId === reference.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                      {reference.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        
        /* Fix for hover state */
        .scrolling-container:hover .animate-scroll-left {
          animation-play-state: paused;
        }
        
        .scrolling-container:not(:hover) .animate-scroll-left {
          animation-play-state: running;
        }
      `}</style>
    </section>
  )
}

export default References
