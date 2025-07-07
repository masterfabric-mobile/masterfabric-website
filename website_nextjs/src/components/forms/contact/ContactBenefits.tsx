import React from 'react'
import contactData from '@/data/contact.json'

export default function ContactBenefits() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Main Heading */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          <span className="block">{contactData.hero.title.line1}</span>
          <span className="block">{contactData.hero.title.line2}</span>
          <span className="block text-blue-600">{contactData.hero.title.line3}</span>
        </h1>
        
        {/* Description Paragraph */}
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl"
          dangerouslySetInnerHTML={{ __html: contactData.hero.description }}
        />
      </div>

      {/* Additional Benefits with Animations - 2x2 Grid */}
      <div className="pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactData.benefits.map((benefit, index) => {
            // Set gradient colors based on index
            const gradientColors = [
              "from-blue-500 to-blue-600", // Blue for first item
              "from-yellow-400 to-orange-500", // Orange for second item
              "from-green-400 to-green-600", // Green for third item
              "from-purple-400 to-purple-600" // Purple for fourth item
            ];
            
            // Set icons based on index
            const IconComponent = () => {
              if (index === 0) {
                return <div className="relative z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div>;
              } else if (index === 1) {
                return <div className="relative z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>;
              } else if (index === 2) {
                return <div className="relative z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div>;
              } else {
                return <div className="relative z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg></div>;
              }
            };
            
            return (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradientColors[index]} rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 relative overflow-hidden`}>
                    <IconComponent />
                    
                    {/* Modern hover animation effects */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 scale-0 rounded-full bg-white opacity-0 group-hover:scale-[2.5] group-hover:opacity-30 transition-all duration-700 ease-out"></div>
                    
                    {/* Particles */}
                    <div className="absolute top-1/4 right-1/4 h-1 w-1 rounded-full bg-white opacity-0 group-hover:opacity-80 group-hover:translate-x-3 group-hover:translate-y-2 transition-all duration-700 delay-100"></div>
                    <div className="absolute bottom-1/4 left-1/4 h-1 w-1 rounded-full bg-white opacity-0 group-hover:opacity-80 group-hover:translate-x-[-10px] group-hover:translate-y-[-8px] transition-all duration-700 delay-150"></div>
                    <div className="absolute top-1/2 left-1/3 h-1 w-1 rounded-full bg-white opacity-0 group-hover:opacity-80 group-hover:translate-x-[-7px] group-hover:translate-y-4 transition-all duration-700 delay-200"></div>
                    
                    {/* Glowing border */}
                    <div className="absolute inset-0 rounded-full border border-white opacity-0 scale-110 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
