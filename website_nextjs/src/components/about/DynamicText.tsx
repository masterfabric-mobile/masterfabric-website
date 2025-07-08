'use client'

import React, { useState, useEffect, useRef } from 'react'

interface DynamicTextProps {
  dynamicText: {
    prefix: string;
    words: string[];
    colors: string[];
    interval: number;
  };
}

const DynamicText: React.FC<DynamicTextProps> = ({ dynamicText }) => {
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicText.words.length);
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
  }, [dynamicText.interval, dynamicText.words.length]);

  return (
    <div className="mb-8">
      <div className="text-4xl font-bold text-gray-800 h-16 flex items-center justify-center flex-wrap text-center">
        <span className="mr-2">{dynamicText.prefix}</span>
        <span 
          ref={dynamicTextElementRef}
          id="dynamic-text" 
          className={`text-${dynamicText.colors[currentIndex]} transition-all duration-500 ease-in-out`}
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
