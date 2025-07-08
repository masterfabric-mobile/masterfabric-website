'use client'

import React from 'react'
import Link from 'next/link'
import Container from './container'
import { Github, Twitter, Mail } from 'lucide-react'
import '../../styles/footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer bg-white">
      {/* Modern Top Divider */}
      <div className="footer-divider">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="divider-line"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Simplified Single Section */}
        <div className="py-12 lg:py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand and Description */}
            <div className="text-center md:text-left max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">MasterFabric Information Technology Inc.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Crafting exceptional mobile applications with cutting-edge technology.
              </p>
              {/* Compact Tech Credit */}
              <div className="astro-credit mt-3 flex items-center text-sm">
                <span className="built-with mr-1">Built with</span>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="astro-link flex items-center"
                >
                  {/* Next.js SVG logo */}
                  <svg className="astro-icon mx-1" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="16" fill="black"/>
                    <path d="M21.5 16c0-3.037-2.463-5.5-5.5-5.5s-5.5 2.463-5.5 5.5 2.463 5.5 5.5 5.5 5.5-2.463 5.5-5.5Zm-1.25 0a4.25 4.25 0 1 1-8.5 0 4.25 4.25 0 0 1 8.5 0Z" fill="white"/>
                    <path d="M22.5 22.5 16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="astro-text">Next.js</span>
                </a>
              </div>
            </div>
            {/* Compact Navigation and Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link href="/about" className="footer-link">About</Link>
                <Link href="/contact" className="footer-link">Contact</Link>
                <a
                  href="https://github.com/masterfabric-mobile/masterfabric-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Source
                </a>
                <button
                  id="footer-cookie-settings"
                  className="footer-link"
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const evt = new CustomEvent('openCookieSettings');
                      window.dispatchEvent(evt);
                    }
                  }}
                >
                  Cookies
                </button>
              </div>
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/terms-of-use" className="footer-legal-link">Terms</Link>
                <Link href="/privacy-policy" className="footer-legal-link">Privacy</Link>
              </div>
            </div>
          </div>
          {/* Copyright - Minimal */}
          <div className="text-center mt-8 pt-6 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              © {currentYear} MasterFabric Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
