'use client'

import React from 'react'
import Link from 'next/link'
import Container from './container'
import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                MasterFabric Inc.
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Professional mobile app development agency specializing in 
                Flutter and React Native applications. We help businesses 
                build amazing mobile experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/masterfabric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://twitter.com/masterfabric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="mailto:hello@masterfabric.co"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © {currentYear} MasterFabric Inc. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms-of-use" 
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
