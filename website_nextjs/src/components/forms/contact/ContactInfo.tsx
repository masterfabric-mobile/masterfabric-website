'use client'

import React from 'react'
import { MapPin, Mail, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="space-y-0 pt-8">
      {/* Office Location */}
      <div className="flex items-start gap-6 py-4 border-b border-gray-100 group">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <MapPin className="w-7 h-7" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-1">Office Location</h3>
          <p className="text-gray-600 text-base group-hover:text-gray-500 transition-colors duration-300">
            Şehit Muhtar Mahallesi Mis Sokak. No. 24/28<br/>
            Beyoğlu / İstanbul, Turkey
          </p>
        </div>
      </div>

      {/* Email Address */}
      <div className="flex items-start gap-6 py-4 border-b border-gray-100 group">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <Mail className="w-7 h-7" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-1">Email Address</h3>
          <a href="mailto:info@masterfabric.co" className="text-gray-600 text-base group-hover:text-blue-600 transition-colors duration-300">
            info@masterfabric.co
          </a>
        </div>
      </div>

      {/* Business Hours */}
      <div className="flex items-start gap-6 py-4 group">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <Clock className="w-7 h-7" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-1">Business Hours</h3>
          <p className="text-gray-600 text-base group-hover:text-gray-500 transition-colors duration-300">
            Monday - Friday: 9:00 AM - 6:00 PM<br/>
            Saturday: 10:00 AM - 4:00 PM
          </p>
        </div>
      </div>
    </div>
  )
}
