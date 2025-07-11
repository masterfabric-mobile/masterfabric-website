'use client'

import React, { useState, useEffect, useRef } from 'react'

interface DynamicTextProps {
  dynamicText: {
    prefix: string;
    words: string[];
    colors: string[];
    interval: number;
  };
  onIndexChange?: (index: number) => void;
}

const DynamicText: React.FC<DynamicTextProps> = ({ dynamicText, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState('translateY(0)');
  const [animation, setAnimation] = useState('');
  const dynamicTextElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fade out
      setOpacity(0);
      setTransform('translateY(20px)');
      
      // Change text after fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % dynamicText.words.length;
          if (onIndexChange) onIndexChange(nextIndex);
          return nextIndex;
        });
        setOpacity(1);
        setTransform('translateY(0)');
        
        // Add shake effect
        setAnimation('shake 0.3s ease-in-out');
        
        // Remove shake effect after animation
        setTimeout(() => {
          setAnimation('');
        }, 300);
      }, 250);
    }, dynamicText.interval);

    return () => clearInterval(intervalId);
  }, [dynamicText.interval, dynamicText.words.length, onIndexChange]);

  const iconMap: Record<string, string> = {
    fast: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='22' height='22'><path d='M4 13a8 8 0 0 1 16 0'/><path d='M12 17v.01'/><path d='M12 13v.01'/><path d='M12 9v.01'/></svg>`, // activity
    controlled: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='22' height='22'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>`, // shield
    tested: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='22' height='22'><polyline points='20 6 9 17 4 12'/></svg>`, // check
    running: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='22' height='22'><path d='M13 2l-2 2 2 2'/><path d='M17 6l-2 2 2 2'/><path d='M21 10l-2 2 2 2'/><path d='M3 22l2-2-2-2'/><path d='M7 18l2-2-2-2'/><path d='M11 14l2-2-2-2'/></svg>` // shuffle
  };

  return (
    <div className="mb-8">
      <div className="text-4xl font-bold text-gray-800 h-16 flex items-center justify-center flex-wrap text-center">
        <span className="mr-2">{dynamicText.prefix}</span>
        <span 
          ref={dynamicTextElementRef}
          id="dynamic-text" 
          className={`${dynamicText.colors[currentIndex]} transition-all duration-500 ease-in-out flex items-center`}
          style={{ 
            opacity, 
            transform,
            animation
          }}
        >
          {dynamicText.words[currentIndex]}
        </span>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 1.8rem;
          }
          
          .h-16 {
            height: auto;
            min-height: 4rem;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-2px) translateY(-1px); }
          50% { transform: translateX(2px) translateY(1px); }
          75% { transform: translateX(-1px) translateY(2px); }
        }
      `}</style>
    </div>
  );
};

export default DynamicText;
