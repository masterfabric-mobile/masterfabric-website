'use client'

import React from 'react'
import Link from 'next/link'
import Container from './container'
import { Github, Twitter, Mail, Bot } from 'lucide-react'
import '../../styles/footer.css'
import { Icon } from '@iconify/react';

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
                Custom software and AI transformation for institutions and private clients.
              </p>
            </div>
            {/* Compact Navigation and Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link href="/services" className="footer-link">Services</Link>
                <Link href="/yapay-zeka-donusumu" className="footer-link">AI Transformation</Link>
                <Link href="/about" className="footer-link">About</Link>
                <a
                  href="https://catalogs.masterfabric.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Docs
                </a>
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
          <div className="nextjs-credit mt-5">
            <span className="footer-credit">
              <span className="built-with">Built with</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
              >
                <Icon icon="simple-icons:nextdotjs" width={18} height={18} color="#18181b" />
                <span className="footer-credit-name">Next.js</span>
              </a>
            </span>
            <span className="footer-credit">
              <span className="built-with">Agent with</span>
              <a
                href="https://cursor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
              >
                <img src="/assets/cursor-logo.svg" alt="" width={18} height={18} className="footer-credit-mark" />
                <span className="footer-credit-name">Cursor</span>
              </a>
            </span>
            <span className="footer-credit">
              <span className="built-with">Representative</span>
              <a
                href="https://claude.com/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-credit-link"
                title="Claude Partner Network"
              >
                <img src="/assets/claude-mark.svg" alt="" width={18} height={18} className="footer-credit-mark" />
                <span className="footer-credit-name">Claude</span>
                <span className="footer-credit-meta">Partner Network</span>
              </a>
            </span>
            <a
              href="/llm.txt"
              className="footer-credit-link"
              title="LLM context"
              aria-label="Open llm.txt"
            >
              <Bot className="footer-credit-bot" />
            </a>
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
