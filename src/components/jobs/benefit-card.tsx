'use client'

import React from 'react'
import { 
  PlusCircle, 
  Clock, 
  TrendingUp, 
  Home, 
  Banknote, 
  Users, 
  Star,
  GraduationCap,
  Calendar,
  Wallet,
  Briefcase,
  Heart,
  HeartPulse,
  Network,
  Globe,
  Zap
} from 'lucide-react'
import './styles/benefit-card.css'

interface BenefitCardProps {
  benefit: {
    title: string
    description: string
    iconName?: string
    icon?: string // For backward compatibility with emoji icons
  }
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  // Determine which icon to use based on the benefit title, iconName, or legacy icon
  const getIcon = () => {
    // Handle legacy emoji icon case
    if (benefit.icon && !benefit.iconName) {
      return (
        <div className="text-2xl">{benefit.icon}</div>
      );
    }

    if (benefit.iconName) {
      // Map specific iconName values to Lucide icons
      switch(benefit.iconName.toLowerCase()) {
        case 'home':
          return <Home className="w-8 h-8 text-blue-600" />;
        case 'graduation-cap':
          return <GraduationCap className="w-8 h-8 text-blue-600" />;
        case 'medical':
        case 'health':
          return <HeartPulse className="w-8 h-8 text-blue-600" />;
        case 'wallet':
        case 'money':
          return <Wallet className="w-8 h-8 text-blue-600" />;
        case 'calendar':
        case 'time':
          return <Calendar className="w-8 h-8 text-blue-600" />;
        case 'trending-up':
        case 'career':
        case 'growth':
          return <TrendingUp className="w-8 h-8 text-blue-600" />;
        case 'users':
        case 'team':
          return <Users className="w-8 h-8 text-blue-600" />;
        case 'briefcase':
        case 'work':
          return <Briefcase className="w-8 h-8 text-blue-600" />;
        case 'globe':
        case 'world':
          return <Globe className="w-8 h-8 text-blue-600" />;
        case 'zap':
        case 'lightning':
          return <Zap className="w-8 h-8 text-blue-600" />;
        default:
          return <Star className="w-8 h-8 text-blue-600" />;
      }
    }

    const title = benefit.title.toLowerCase();
    
    if (title.includes('health') || title.includes('medical')) {
      return <PlusCircle className="w-8 h-8 text-blue-600" />;
    } else if (title.includes('balance') || title.includes('time')) {
      return <Clock className="w-8 h-8 text-blue-600" />;
    } else if (title.includes('growth') || title.includes('career')) {
      return <TrendingUp className="w-8 h-8 text-blue-600" />;
    } else if (title.includes('remote') || title.includes('flexible')) {
      return <Home className="w-8 h-8 text-blue-600" />;
    } else if (title.includes('bonus') || title.includes('salary') || title.includes('compensation')) {
      return <Banknote className="w-8 h-8 text-blue-600" />;
    } else if (title.includes('team') || title.includes('culture')) {
      return <Users className="w-8 h-8 text-blue-600" />;
    } else {
      return <Star className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <div className="benefit-card text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="benefit-icon w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
      <p className="text-gray-600">{benefit.description}</p>
    </div>
  )
}
