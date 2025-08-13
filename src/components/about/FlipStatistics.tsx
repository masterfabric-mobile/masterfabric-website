'use client'

import React, { useEffect, useRef, useState } from 'react';
import './styles/flip-statistics.css';

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

const svgIcons: Record<string, string> = {
  "trending-up": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>`,
  "users": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  "trophy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
};

const defaultStats: Statistic[] = [
  { value: 150, label: 'Projects Delivered', tooltip: 'Mobile apps successfully launched' },
  { value: '98%', label: 'Client Satisfaction', tooltip: 'Based on post-project feedback' },
  { value: 12, label: 'Global Offices', tooltip: 'Serving clients worldwide' },
];

const iconMap: Record<string, string> = {
  "chart-line": "trending-up",
  "users": "users",
  "trending-up": "trending-up",
  "trophy": "trophy",
};

const FlipStatistics: React.FC<FlipStatisticsProps> = ({
  statistics,
  title = 'Our Impact in Numbers',
  description = 'Real metrics that showcase our commitment to excellence',
}) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const statsData = (statistics || defaultStats).map((stat, index) => {
    return {
      ...stat,
      icon: stat.icon || ["trending-up", "trophy", "users"][index] || "star",
      hoverText: stat.tooltip,
      normalText: stat.label,
    };
  });

  React.useEffect(() => {
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      const htmlCard = card as HTMLElement;
      htmlCard.style.opacity = '0';
      htmlCard.style.transform = 'translateY(30px)';
      htmlCard.style.transition = `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`;
    });
    setTimeout(() => {
      statCards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '1';
        htmlCard.style.transform = 'translateY(0)';
      });
    }, 100);
  }, []);

  return (
    <div className="stats-section">
      <div className="stats-header">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-4xl mx-auto">{description}</p>
      </div>
      <div
        className="statistics-grid"
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', maxWidth: 1000, margin: '0 auto' }}
      >
        {statsData.map((stat, index) => {
          const iconKey = stat.icon || ["trending-up", "trophy", "users"][index % 3];
          const mappedIcon = iconMap[iconKey] || iconKey;
          const iconSvg = svgIcons[mappedIcon] || svgIcons["trending-up"];
          const isHovered = hovered === index;
          return (
            <div
              key={index}
              className="stat-card"
              style={{ width: 300, height: 200, position: 'relative', background: 'rgba(255,255,255,0.95)', padding: 20, boxSizing: 'border-box' }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
             
              <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}>
                  <span dangerouslySetInnerHTML={{ __html: iconSvg.replace('<svg ', '<svg class=\"w-5 h-5\" fill=\"none\" stroke=\"white\" ') }} />
                </div>
              </div>
           
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="stat-number" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb', marginBottom: 4 }}>{stat.value}</div>
             
                <div style={{ position: 'relative', height: 32, width: '100%' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      opacity: isHovered ? 0 : 1,
                      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      transition: 'opacity 0.3s, transform 0.3s',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      color: '#334155',
                      textAlign: 'center',
                      width: '100%',
                      display: 'block',
                    }}
                  >
                    {stat.normalText}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.3s, transform 0.3s',
                      fontSize: '0.93rem',
                      fontWeight: 500,
                      color: '#334155',
                      textAlign: 'center',
                      width: '100%',
                      display: 'block',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {stat.hoverText}
                  </span>
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
