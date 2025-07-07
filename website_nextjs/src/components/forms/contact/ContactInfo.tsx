'use client'

import React from 'react'
import { MapPin, Mail, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-start space-x-4 group">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">Office Location</h3>
          <p className="text-gray-600 text-sm group-hover:text-gray-500 transition-colors duration-300">
            Şehit Muhtar Mahallesi Mis Sokak. No. 24/28<br/>
            Beyoğlu / İstanbul, Turkey
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4 group">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <Mail className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">Email Address</h3>
          <a href="mailto:info@masterfabric.co" className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors duration-300">
            info@masterfabric.co
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-4 group">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">Business Hours</h3>
          <p className="text-gray-600 text-sm group-hover:text-gray-500 transition-colors duration-300">
            Monday - Friday: 9:00 AM - 6:00 PM<br/>
            Saturday: 10:00 AM - 4:00 PM
          </p>
        </div>
      </div>
    </div>
  )
}
