'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

// CSS will be imported in a separate file
import './styles/dropdown.css'

export interface DropdownProps {
  items: Array<{
    title: string;
    path: string;
    description?: string;
  }>;
  trigger: string;
  isMobile?: boolean;
  isActive?: boolean;
  currentPath?: string;
}

export default function Dropdown({ 
  items, 
  trigger, 
  isMobile = false, 
  isActive = false,
  currentPath = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Generate unique dropdown ID based on trigger text
  const dropdownId = `dropdown-${trigger.toLowerCase().replace(/\s+/g, '-')}`;

  // Helper function to check if item is current page
  const isCurrentPage = (itemPath: string) => {
    const normalizeCurrentPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
    const normalizeItemPath = itemPath === '/' ? '/' : itemPath.replace(/\/$/, '');
    return normalizeCurrentPath === normalizeItemPath;
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className={`relative group ${isMobile ? 'w-full' : ''}`}
    >
      {/* Dropdown trigger button */}
      <button
        type="button"
        className={`
          inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200 relative
          ${isMobile 
            ? 'w-full justify-between hover:bg-gray-50 bg-gray-50' 
            : 'hover:bg-gray-50'
          }
          ${isActive 
            ? 'text-blue-600 bg-blue-50 border border-blue-200 navbar-active-dropdown' 
            : 'text-gray-700 hover:text-gray-900'
          }
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        {/* Button text */}
        <span>{trigger}</span>
        
        {/* Active indicator */}
        {isActive && (
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        )}
        
        {/* Chevron icon with rotation animation */}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu content */}
      <div
        id={dropdownId}
        className={`absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 transform right-0 ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        <div className="dropdown-grid">
          {items.map((item, index) => {
            const isItemActive = isCurrentPage(item.path);
            return (
              <Link
                key={index}
                href={isItemActive ? '#' : item.path}
                className={`
                  dropdown-item
                  ${isItemActive 
                    ? 'bg-blue-50 text-blue-600 border-blue-200 font-medium' 
                    : 'text-gray-600'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
                {isItemActive && (
                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
