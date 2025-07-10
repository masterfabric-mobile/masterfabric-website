'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Container from './container'
import { Menu, X } from 'lucide-react'
import { SocialIcon } from '@/components/ui/SocialIcon'

// Import dropdown from the navbar folder
import Dropdown from './navbar/dropdown'

// Define types for the navigation data
interface DropdownItem {
  title: string;
  path: string;
  description?: string;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  order: number;
  icon?: string;
  style?: string;
  dropdown?: {
    items: DropdownItem[];
  };
}

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: 'blue' | 'gray';
  order: number;
}

interface BrandData {
  logo: string;
  text: {
    main: string;
    secondary: string;
    tertiary: string;
  };
  description: {
    platform: string;
    studio: string;
  };
  alt: string;
}

interface NavData {
  brand: BrandData;
  menuItems: MenuItem[];
  socialLinks: SocialLink[];
}

// Import navigation data
import navData from '@/data/navigation.json'

// Type assertion
const navigationData = navData as unknown as NavData

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Ensure menu is closed when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Sort menu items by order
  const sortedMenuItems = [...navigationData.menuItems].sort((a, b) => a.order - b.order)
  const sortedSocialLinks = [...navigationData.socialLinks].sort((a, b) => a.order - b.order)

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Check if path is current page
  const isCurrentPage = (itemPath: string) => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
    const normalizedItemPath = itemPath === '/' ? '/' : itemPath.replace(/\/$/, '')
    return normalizedPath === normalizedItemPath
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <div className="flex flex-col">
          {/* Top navbar section */}
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center group">
              {/* Logo with hover animation */}
              <span className="inline-block mr-2 sm:mr-3 transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
                <Image
                  src={navigationData.brand.logo}
                  alt={navigationData.brand.alt}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                />
              </span>
              
              {/* Brand text and description */}
              <div className="flex flex-col min-w-0">
                {/* Company name */}
                <div className="flex items-baseline flex-wrap">
                  <span className="font-bold font-mono text-lg sm:text-xl text-slate-800">
                    {navigationData.brand.text.main}
                  </span>
                  <span className="font-mono text-slate-500 text-lg sm:text-xl">
                    {navigationData.brand.text.secondary}
                  </span>
                  <span className="font-mono text-slate-300 text-lg sm:text-xl">
                    {navigationData.brand.text.tertiary}
                  </span>
                </div>
                
                {/* Company tagline */}
                <div className="font-mono text-xs sm:text-sm text-slate-400 mt-1 leading-tight">
                  <div className="flex flex-col sm:flex-row sm:gap-1">
                    <span className="whitespace-nowrap">{navigationData.brand.description.platform}</span>
                    <span className="font-bold text-slate-500 whitespace-nowrap">{navigationData.brand.description.studio}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {sortedMenuItems.map((item) => (
                <React.Fragment key={item.id}>
                  {item.dropdown ? (
                    <Dropdown 
                      trigger={item.title}
                      items={item.dropdown.items}
                      currentPath={pathname}
                      isActive={isCurrentPage(item.path)}
                    />
                  ) : (
                    <Link
                      href={item.path}
                      className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                        isCurrentPage(item.path)
                          ? 'text-blue-600 bg-blue-50 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.title}
                      {isCurrentPage(item.path) && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              
              {/* Social Links */}
              <div className="hidden lg:flex items-center space-x-px pl-2 border-l border-gray-200 h-8 self-center">
                {sortedSocialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`navbar-social-link ${link.color}`}
                    title={link.title}
                    style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {link.icon === 'github' && (
                      <SocialIcon name="github" size={28} color="#23272F" withBackground />
                    )}
                    {link.icon === 'linkedin' && (
                      <SocialIcon name="linkedin" size={28} withBackground />
                    )}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {sortedMenuItems.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.dropdown ? (
                      <Dropdown 
                        trigger={item.title}
                        items={item.dropdown.items}
                        currentPath={pathname}
                        isMobile={true}
                        isActive={isCurrentPage(item.path)}
                      />
                    ) : (
                      <Link
                        href={item.path}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                          isCurrentPage(item.path)
                            ? 'text-blue-600 bg-blue-50 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                        {isCurrentPage(item.path) && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
              
              {/* Mobile Social Links */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-px">
                  {sortedSocialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`navbar-social-link ${link.color}`}
                      title={link.title}
                      style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {link.icon === 'github' && (
                        <SocialIcon name="github" size={28} color="#23272F" withBackground />
                      )}
                      {link.icon === 'linkedin' && (
                        <SocialIcon name="linkedin" size={30} withBackground />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

// Export the Navbar component as both default and named export
export default Navbar;
export { Navbar };