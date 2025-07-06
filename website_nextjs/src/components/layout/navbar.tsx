'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from './container'
import { Menu, X } from 'lucide-react'

// Navigation data - normally this would come from a JSON file
const navigationData = {
  brand: {
    name: "MasterFabric",
    logo: "/masterfabric-logo.svg"
  },
  menuItems: [
    { name: "Home", href: "/", order: 1 },
    { name: "About", href: "/about", order: 2 },
    { name: "Jobs", href: "/jobs", order: 3 },
    { name: "Contact", href: "/contact", order: 4 },
  ]
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={navigationData.brand.logo}
              alt={navigationData.brand.name}
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">
              {navigationData.brand.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationData.menuItems
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigationData.menuItems
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
