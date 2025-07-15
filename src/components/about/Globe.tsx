'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface Activity {
  flag: string;
  country: string;
  city: string;
  category: string;
}

interface GlobeProps {
  activities: Activity[];
}

const Globe: React.FC<GlobeProps> = ({ activities }) => {
  const activityStreamRef = useRef<HTMLDivElement>(null);

  const createActivityItem = (activity: Activity): HTMLDivElement => {
    const item = document.createElement('div');
    item.className = 'activity-item flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-100 text-xs sm:text-sm';
    item.style.cssText = 'transform: translateX(120%) scale(0.8); opacity: 0; transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);';
    item.innerHTML = `
      <span class="text-lg flex-shrink-0">${activity.flag}</span>
      <div class="flex-1 text-left min-w-0">
        <div class="text-xs text-gray-500 truncate">${activity.country} • ${activity.city}</div>
        <div class="text-sm font-semibold text-gray-800 truncate">${activity.category} App</div>
      </div>
      <div class="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0 pulse-dot"></div>
    `;
    return item;
  }

  const addActivity = useCallback(() => {
    const activityStream = activityStreamRef.current;
    if (!activityStream) return;

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const activityItem = createActivityItem(randomActivity);

    const countryLight = document.querySelector(`.light[data-country="${randomActivity.country}"]`);
    if (countryLight) {
      countryLight.classList.add('active');
      setTimeout(() => {
        countryLight.classList.remove('active');
      }, 1200);
    }

    activityStream.insertBefore(activityItem, activityStream.firstChild);

    requestAnimationFrame(() => {
      setTimeout(() => {
        activityItem.style.transform = 'translateX(0) scale(1)';
        activityItem.style.opacity = '1';
      }, 50);
    });

    const existingItems = activityStream.querySelectorAll('.activity-item:not(:first-child)');
    existingItems.forEach((item, index) => {
      (item as HTMLElement).style.transform = `translateY(${(index + 1) * 4}px) scale(${1 - (index * 0.02)})`;
      (item as HTMLElement).style.opacity = `${1 - (index * 0.1)}`;
    });

    while (activityStream.children.length > 6) {
      const lastItem = activityStream.lastChild as HTMLElement;
      lastItem.style.transform = 'translateX(120%) scale(0.7)';
      lastItem.style.opacity = '0';
      setTimeout(() => {
        if (lastItem.parentNode) {
          activityStream.removeChild(lastItem);
        }
      }, 600);
    }

    setTimeout(() => {
      if (activityItem.parentNode) {
        activityItem.style.transform = 'translateX(120%) scale(0.7)';
        activityItem.style.opacity = '0';
        setTimeout(() => {
          if (activityItem.parentNode) {
            activityItem.parentNode.removeChild(activityItem);
          }
        }, 600);
      }
    }, 8000);
  }, [activities]);

  useEffect(() => {
    const interval = setInterval(addActivity, 2500);
    const timeout = setTimeout(addActivity, 800);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [addActivity]);

  return (
    <div className="relative mb-8">
      <div className="flex justify-center items-center relative">
        <div className="globe-container relative">
          <div className="globe">
            <div className="country-lights">
              {activities.map((activity, index) => (
                <div key={index} className={`light ${activity.country.toLowerCase()}`} data-country={activity.country}></div>
              ))}
            </div>
          </div>
          
          <div className="activity-list absolute bottom-0 right-0 w-80 h-64 overflow-hidden sm:w-60 sm:h-52">
            <div ref={activityStreamRef} id="activity-stream" className="space-y-2">
              {/* Activities will be populated by JavaScript */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .globe-container {
          width: 300px;
          height: 300px;
          position: relative;
        }
        
        @media (max-width: 640px) {
          .globe-container {
            width: 250px;
            height: 250px;
          }
        }
        
        .globe {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          border-radius: 50%;
          position: relative;
          box-shadow: 
            inset -30px -30px 60px rgba(0,0,0,0.6),
            inset 30px 30px 60px rgba(255,255,255,0.05),
            0 15px 45px rgba(0,0,0,0.4);
          animation: rotate 30s linear infinite;
          overflow: hidden;
        }
        
        .globe::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 15%;
          width: 70%;
          height: 70%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          border-radius: 50%;
          animation: shine 4s ease-in-out infinite;
        }
        
        .country-lights {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .light {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          opacity: 0.3;
          box-shadow: 0 0 10px #00ff88;
          transition: all 0.3s ease;
        }
        
        .light.active {
          opacity: 1;
          transform: scale(2);
          box-shadow: 0 0 20px #00ff88, 0 0 40px #00ff88;
          animation: pulse-jump 0.6s ease-out;
        }
        
        .light.usa { top: 35%; left: 25%; }
        .light.uk { top: 30%; left: 48%; }
        .light.germany { top: 32%; left: 52%; }
        .light.japan { top: 38%; left: 85%; }
        .light.korea { top: 35%; left: 82%; }
        .light.france { top: 35%; left: 50%; }
        .light.canada { top: 25%; left: 30%; }
        .light.australia { top: 75%; left: 80%; }
        .light.turkey { top: 38%; left: 58%; }
        .light.brazil { top: 65%; left: 35%; }
        
        .activity-list {
          pointer-events: none;
          padding: 8px;
        }
        
        .activity-item {
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .activity-item:hover {
          transform: scale(1.02) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .pulse-dot {
          animation: smooth-pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
        
        @keyframes smooth-pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.1);
            box-shadow: 0 0 16px rgba(16, 185, 129, 0.8);
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shine {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-jump {
          0% { transform: scale(1); }
          30% { transform: scale(2.5) translateY(-3px); }
          60% { transform: scale(2.2) translateY(-1px); }
          100% { transform: scale(2); }
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Globe;
