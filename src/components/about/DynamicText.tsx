'use client'

import React, { useState, useEffect, useRef } from 'react'

interface DynamicTextProps {
  dynamicText: {
    prefix: string
    words: string[]
    colors: string[]
    interval: number
  }
  onIndexChange?: (index: number) => void
}

const DynamicText: React.FC<DynamicTextProps> = ({ dynamicText, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [transform, setTransform] = useState('translateY(0)')
  const dynamicTextElementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(0)
      setTransform('translateY(12px)')
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % dynamicText.words.length
          if (onIndexChange) onIndexChange(nextIndex)
          return nextIndex
        })
        setOpacity(1)
        setTransform('translateY(0)')
      }, 220)
    }, dynamicText.interval)
    return () => clearInterval(intervalId)
  }, [dynamicText.interval, dynamicText.words.length, onIndexChange])

  return (
    <div className="py-6 sm:py-8 text-center border-b border-slate-100">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
        What we deliver
      </p>
      <div className="min-h-[3.5rem] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-800">
          {dynamicText.prefix}
        </span>
        <span
          ref={dynamicTextElementRef}
          className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-all duration-500 ease-out ${dynamicText.colors[currentIndex]}`}
          style={{ opacity, transform }}
        >
          {dynamicText.words[currentIndex]}
        </span>
        <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-800">.</span>
      </div>
      <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-md mx-auto">
        Platform-based and AI-first — from idea to production.
      </p>
    </div>
  )
}

export default DynamicText
