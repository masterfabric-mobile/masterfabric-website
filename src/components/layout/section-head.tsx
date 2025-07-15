import React from 'react'

interface SectionHeadProps {
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left' | 'right'
  className?: string
}

export default function SectionHead({ 
  title, 
  description, 
  align = 'center',
  className = '' 
}: SectionHeadProps) {
  return (
    <div className={`mt-16 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
        {title}
      </h1>
      {description && (
        <div className="text-lg mt-4 text-slate-600">
          {description}
        </div>
      )}
    </div>
  )
}
