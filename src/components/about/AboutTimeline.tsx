"use client";

import React, { useRef, useState, useEffect } from 'react';

interface TimelineItem {
  icon: string;
  title: string;
  subtitle: string;
  content: string;
}

interface AboutTimelineProps {
  timeline: {
    title: string;
    cycleDuration: number;
    items: TimelineItem[];
  };
}

const AboutTimeline: React.FC<AboutTimelineProps> = ({ timeline }) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState(Date.now());
  const [pausedTime, setPausedTime] = useState(0);
  const timelineReelRef = useRef<HTMLDivElement>(null);
  const timelineSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimelineContent = () => {
      if (!isPaused) {
        const elapsed = Date.now() - animationStartTime;
        const cycleTime = timeline.cycleDuration;
        const itemTime = cycleTime / timeline.items.length;
        
        const newIndex = Math.floor((elapsed % cycleTime) / itemTime);
        
        if (newIndex !== currentContentIndex && newIndex >= 0 && newIndex < timeline.items.length) {
          setCurrentContentIndex(newIndex);
        }
      }
    };

    const interval = setInterval(updateTimelineContent, 100);
    updateTimelineContent();

    return () => clearInterval(interval);
  }, [isPaused, animationStartTime, timeline.cycleDuration, timeline.items.length, currentContentIndex]);

  const handleMouseEnter = () => {
    if (!isPaused) {
      setIsPaused(true);
      setPausedTime(Date.now());
      if (timelineReelRef.current) {
        timelineReelRef.current.classList.add('paused');
      }
    }
  };

  const handleMouseLeave = () => {
    if (isPaused) {
      setTimeout(() => {
        if (isPaused) {
          setIsPaused(false);
          const pauseDuration = Date.now() - pausedTime;
          setAnimationStartTime(prev => prev + pauseDuration);
          if (timelineReelRef.current) {
            timelineReelRef.current.classList.remove('paused');
          }
        }
      }, 200);
    }
  };

  return (
    <div className="mb-12">
      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-8 px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="mx-6 w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{timeline.title}</h3>
      
      <div className="timeline-main-container">
        <div className="timeline-container">
          <div 
            className="timeline-slot" 
            ref={timelineSlotRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="timeline-reel" 
              ref={timelineReelRef}
            >
              {timeline.items.map((item, index) => (
                <div key={index} className="timeline-item" data-content={index}>
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-subtitle">{item.subtitle}</div>
                </div>
              ))}
            </div>
            <div className="play-pause-icon">
              <span className="pause-icon" style={{ display: isPaused ? 'none' : 'inline' }}>⏸️</span>
              <span className="play-icon" style={{ display: isPaused ? 'inline' : 'none' }}>▶️</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="timeline-content">
        {timeline.items.map((item, index) => (
          <p 
            key={index}
            className={`content-paragraph ${index === currentContentIndex ? 'active' : ''}`} 
            data-index={index}
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></p>
        ))}
      </div>

      <style jsx>{`
        .timeline-main-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
        }
        
        .timeline-container {
          display: flex;
          justify-content: center;
          position: relative;
        }
        
        .timeline-slot {
          width: 350px;
          height: 120px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        
        @media (max-width: 640px) {
          .timeline-slot {
            width: 300px;
            height: 100px;
          }
        }
        
        .timeline-reel {
          display: flex;
          flex-direction: column;
          height: 2400px;
          animation: timeline-spin 70s linear infinite;
          transform: translateY(0);
        }
        
        .timeline-reel.paused {
          animation-play-state: paused;
        }
        
        .timeline-item {
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: white;
          margin: 0;
          transition: all 0.3s ease;
          border-bottom: 1px solid #f3f4f6;
        }
        
        @media (max-width: 640px) {
          .timeline-item {
            height: 100px;
            padding: 15px;
          }
        }
        
        .timeline-item:nth-child(odd) {
          background: #f8fafc;
          color: #1f2937;
        }
        
        .timeline-item:nth-child(even) {
          background: white;
          color: #1f2937;
        }
        
        .timeline-icon {
          font-size: 1.2rem;
          margin-bottom: 4px;
        }
        
        .timeline-title {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 2px;
        }
        
        .timeline-subtitle {
          font-size: 10px;
          opacity: 0.7;
          text-align: center;
        }
        
        .play-pause-icon {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 14px;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        
        .timeline-slot:hover .play-pause-icon {
          opacity: 1;
        }
        
        .timeline-content {
          margin-top: 30px;
          position: relative;
          min-height: 100px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 20px;
        }
        
        .content-paragraph {
          position: absolute;
          top: 0;
          left: 20px;
          right: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          text-align: center;
        }
        
        @media (max-width: 640px) {
          .content-paragraph {
            font-size: 14px;
            left: 10px;
            right: 10px;
          }
        }
        
        .content-paragraph.active {
          opacity: 1;
          transform: translateY(0);
          position: relative;
          left: 0;
          right: 0;
        }
        
        @keyframes timeline-spin {
          0% { transform: translateY(0); }
          5% { transform: translateY(-120px); }
          10% { transform: translateY(-240px); }
          15% { transform: translateY(-360px); }
          20% { transform: translateY(-480px); }
          25% { transform: translateY(-600px); }
          30% { transform: translateY(-720px); }
          35% { transform: translateY(-840px); }
          40% { transform: translateY(-960px); }
          45% { transform: translateY(-1080px); }
          50% { transform: translateY(-1200px); }
          55% { transform: translateY(-1320px); }
          60% { transform: translateY(-1440px); }
          65% { transform: translateY(-1560px); }
          70% { transform: translateY(-1680px); }
          75% { transform: translateY(-1800px); }
          80% { transform: translateY(-1920px); }
          85% { transform: translateY(-2040px); }
          90% { transform: translateY(-2160px); }
          95% { transform: translateY(-2280px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutTimeline; 