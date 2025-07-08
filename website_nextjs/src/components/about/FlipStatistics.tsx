'use client'

import React, { useEffect, useRef } from 'react'
import './styles/flip-statistics.css'

interface Statistic {
  value: number | string;
  label: string;
  tooltip: string;
  icon?: string;
}

interface FlipStatisticsProps {
  statistics?: Statistic[];
  title?: string;
  description?: string;
}

const FlipStatistics: React.FC<FlipStatisticsProps> = ({ 
  statistics,
  title = "Our Impact in Numbers",
  description = "Real metrics that showcase our commitment to excellence"
}) => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Icon mappings
  const svgIcons: Record<string, string> = {
    "trending-up": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>`,
    "users": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    "trophy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
  };

  // Default statistics if none provided
  const defaultStats: Statistic[] = [
    { value: 150, label: "Projects Delivered", tooltip: "Mobile apps successfully launched" },
    { value: "98%", label: "Client Satisfaction", tooltip: "Based on post-project feedback" },
    { value: 12, label: "Global Offices", tooltip: "Serving clients worldwide" }
  ];

  // Use provided stats or fallback to default
  const statsData = statistics || defaultStats;

  // Process and enhance statistics data with hover values
  const enhancedStats = statsData.map((stat, index) => {
    const numericValue = typeof stat.value === 'number' ? stat.value : 0;
    return {
      ...stat,
      // Enhanced values for hover states (more impressive numbers)
      hoverValue: numericValue > 0 ? numericValue * 1.2 : [12, 25, 85][index] || 10,
      hoverLabel: numericValue > 0 ? stat.label : 
        ["Current Projects", "Delivered Solutions", "Expert Network"][index] || stat.label,
      // Use icon from props or fallback to defaults
      icon: stat.icon || ["trending-up", "trophy", "users"][index] || "star"
    };
  });

  const iconMap: Record<string, string> = {
    "chart-line": "trending-up",
    "users": "users", 
    "trending-up": "trending-up",
    "trophy": "trophy",
  };

  useEffect(() => {
    const statCards = document.querySelectorAll('.stat-card');

    // Add keyboard accessibility
    statCards.forEach((card: Element, index) => {
      const htmlCard = card as HTMLElement;
      htmlCard.setAttribute('tabindex', '0');
      htmlCard.setAttribute('role', 'button');
      htmlCard.setAttribute('aria-label', 
        `Statistic: ${htmlCard.dataset.originalLabel} - ${htmlCard.dataset.originalValue}`
      );
      
      htmlCard.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerCardInteraction(htmlCard);
        }
      });
    });
    
    // Card interaction feedback
    function triggerCardInteraction(card: HTMLElement) {
      card.style.transform = 'translateY(-6px) scale(1.02)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    }
    
    // Enhanced intersection observer for performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          observer.unobserve(card);
        }
      });
    }, observerOptions);
    
    // Initial setup and observe cards
    statCards.forEach((card, index) => {
      const htmlCard = card as HTMLElement;
      htmlCard.style.opacity = '0';
      htmlCard.style.transform = 'translateY(30px)';
      htmlCard.style.transition = `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`;
      observer.observe(htmlCard);
    });
    
    // Performance optimization: pause animations when not visible
    const performanceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const animatedElements = card.querySelectorAll('.pattern-grid, .pattern-dots, .stat-icon');
        
        if (entry.isIntersecting) {
          animatedElements.forEach(el => {
            (el as HTMLElement).style.animationPlayState = 'running';
          });
        } else {
          animatedElements.forEach(el => {
            (el as HTMLElement).style.animationPlayState = 'paused';
          });
        }
      });
    }, { threshold: 0 });
    
    statCards.forEach(card => performanceObserver.observe(card));
    
    // Respect user's motion preferences
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
      statCards.forEach(card => {
        (card as HTMLElement).style.animation = 'none';
        card.querySelectorAll('*').forEach(el => {
          (el as HTMLElement).style.animation = 'none';
        });
      });
    }
  }, []);
  
  return (
    <div className="stats-section">
      <div className="stats-header">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl mx-auto">
          {description}
        </p>
      </div>

      <div className="statistics-grid" ref={statsRef}>
        {enhancedStats.map((stat, index) => {
          // Set the middle card (index 1) to use trophy icon
          const iconKey = index === 1 ? "trophy" : (stat.icon || ["trending-up", "users", "trophy"][index % 3]);
          const mappedIcon = iconMap[iconKey] || iconKey;
          const iconSvg = svgIcons[mappedIcon] || svgIcons["trending-up"];
          
          return (
            <div 
              key={index}
              className={`stat-card ${index === 1 ? 'navy-theme' : ''}`}
              data-original-value={stat.value}
              data-hover-value={stat.hoverValue}
              data-original-label={stat.label}
              data-hover-label={stat.hoverLabel}
              data-tooltip={stat.tooltip}
            >
              <div className="card-glow"></div>
              <div className="geometric-pattern">
                <div className="pattern-grid"></div>
                <div className="pattern-dots"></div>
              </div>
              
              <div className="stat-icon">
                <div className="icon-container" dangerouslySetInnerHTML={{ __html: iconSvg }}></div>
                <div className="icon-glow"></div>
              </div>
              
              <div className="stat-content">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-title">{stat.label}</div>
                <div className="stat-description">{stat.tooltip}</div>
                
                <div className="hover-icon-container">
                  <div className="hover-icon-trail"></div>
                  <div className="hover-icon" dangerouslySetInnerHTML={{ __html: iconSvg }}></div>
                </div>
              </div>
              
              <div className="card-border"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlipStatistics;
