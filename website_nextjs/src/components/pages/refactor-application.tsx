'use client'

import React, { useEffect, useState } from 'react'
import { Zap, BarChart3, Users, Settings, Database, TrendingUp, Activity, Cloud } from 'lucide-react';
import styles from '../../styles/refactor-application.module.css';
import { Icon } from '@iconify/react';

const serviceCards = [
  {
    icon: <Activity className="w-8 h-8 text-blue-600" />,
    title: 'Event Tracking',
    description: 'Track user interactions and behaviors with detailed analytics and insights',
    color: 'blue',
  },
  {
    icon: <Settings className="w-8 h-8 text-indigo-600" />,
    title: 'Crash Reports & Monitoring',
    description: 'Monitor app stability and identify performance issues in real-time',
    color: 'indigo',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    title: 'Analytics Reports',
    description: 'Comprehensive data insights and metrics to drive growth strategies',
    color: 'purple',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-cyan-600" />,
    title: 'Release Monitoring',
    description: 'Track deployment success and monitor issues with real-time alerts',
    color: 'cyan',
  },
  {
    icon: <Database className="w-8 h-8 text-slate-600" />,
    title: 'BigData Management',
    description: 'Process and analyze large datasets to extract meaningful insights',
    color: 'slate',
  },
  {
    icon: <Users className="w-8 h-8 text-teal-600" />,
    title: 'User Growth & Retention',
    description: 'Optimize user acquisition and engagement to increase retention rates',
    color: 'teal',
  },
];

// Phone Showcase Component
function PhoneShowcase() {
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPerfection, setShowPerfection] = useState(false);
  const [featureVisible, setFeatureVisible] = useState([false, false, false, false]);
  const [step, setStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState(85);
  const [beforeOptimization, setBeforeOptimization] = useState(85);
  const [afterOptimization, setAfterOptimization] = useState(85);
  const [progressText, setProgressText] = useState('Analyzing...');
  const [showOptimizationPopup, setShowOptimizationPopup] = useState(false);

  useEffect(() => {
    const randomPerf = Math.floor(Math.random() * 11) + 80;
    setCurrentPerformance(randomPerf);
    setBeforeOptimization(randomPerf);
    setAfterOptimization(randomPerf);
  }, []);

  const optimizationSteps = [
    { id: 'step1', text: 'Analyzing Performance...', duration: 2000, progressEnd: 30 },
    { id: 'step2', text: 'Optimizing Code...', duration: 2500, progressEnd: 70 },
    { id: 'step3', text: 'Applying Changes...', duration: 1500, progressEnd: 100 },
  ];

  useEffect(() => {
    if (!isOptimizing && !showOptimizationPopup) {
      setFeatureVisible([true, true, true, true]);
    }
  }, [isOptimizing, showOptimizationPopup]);

  const startOptimization = async () => {
    if (isOptimizing) return;
    if (currentPerformance >= 98) {
      setShowPerfection(true);
      return;
    }
    setIsOptimizing(true);
    setBeforeOptimization(currentPerformance);
    setShowOptimizationPopup(true);
    setProgress(0);
    setStep(0);
    setFeatureVisible([false, false, false, false]);
    
    let localProgress = 0;
    for (let i = 0; i < optimizationSteps.length; i++) {
      const stepObj = optimizationSteps[i];
      setProgressText(stepObj.text);
      setStep(i);
      const start = localProgress;
      const end = stepObj.progressEnd;
      const duration = stepObj.duration;
      const increment = (end - start) / (duration / 30);
      for (let p = start; p <= end; p += increment) {
        setProgress(Math.min(p, end));
        if (p >= 10 && !featureVisible[0]) setFeatureVisible([true, false, false, false]);
        if (p >= 40 && !featureVisible[1]) setFeatureVisible([true, true, false, false]);
        if (p >= 60 && !featureVisible[2]) setFeatureVisible([true, true, true, false]);
        if (p >= 80 && !featureVisible[3]) setFeatureVisible([true, true, true, true]);
        await new Promise(res => setTimeout(res, 30));
      }
      localProgress = end;
    }
    
    const improvement = Math.min(12, 100 - currentPerformance);
    const newPerformance = Math.min(98, currentPerformance + improvement);
    setAfterOptimization(newPerformance);
    setCurrentPerformance(newPerformance);
    setShowOptimizationPopup(false);
    setShowSuccess(true);
    setIsOptimizing(false);
  };

  const cancelOptimization = () => {
    setIsOptimizing(false);
    setShowOptimizationPopup(false);
    setProgress(0);
    setStep(0);
    setFeatureVisible([true, true, true, true]);
  };

  const closeSuccessPopup = () => setShowSuccess(false);
  const closePerfectionPopup = () => setShowPerfection(false);

  const stats = [
    { value: '24.8K', label: 'Active Users', change: '+15.2%' },
    { value: '0.8s', label: 'Load Time', change: '-45%' },
    { value: '99.2%', label: 'Stability', change: '+2.4%' },
    { value: '4.9', label: 'Rating', change: '+0.2' },
  ];

  const features = [
    { text: 'Real-time Analytics', color: 'bg-blue-500' },
    { text: 'Crash Detection', color: 'bg-purple-500' },
    { text: 'Performance Monitor', color: 'bg-green-500' },
    { text: 'User Engagement', color: 'bg-yellow-500' },
  ];

  const steps = [
    'Analyzing Performance',
    'Optimizing Code',
    'Applying Changes',
  ];

  return (
    <div className="relative bg-[#111827] rounded-[2.25rem] p-2 shadow-2xl phone-frame" style={{aspectRatio: '9/19.5', width: '250px', maxWidth: '100%'}}>
      {/* Dynamic Island */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30">
        <div className="absolute top-1 left-4 w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
        </div>
        <div className="absolute top-1.5 right-4 w-10 h-1.5 bg-gray-800 rounded-full"></div>
      </div>
      
      {/* Phone Screen Content */}
      <div className="phone-screen relative rounded-[2.25rem] overflow-hidden h-full bg-white flex flex-col">
        {/* Perfection Popup */}
        {showPerfection ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-400/80 via-yellow-300/60 to-orange-400/70 pointer-events-none"></div>
            <div className="relative z-10 bg-white rounded-xl p-4 mx-3 w-full max-w-[200px]">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L13 8l6 .75-4.12 4.62L16 20l-6-3-6 3 1.12-6.63L1 8.75 7 8l3-6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-amber-600 mb-2 text-center">PERFECTION!</h3>
              <div className="text-2xl font-black text-amber-600 mb-1 text-center">98%</div>
              <div className="text-xs text-amber-700 font-bold text-center mb-2">MAX PERFORMANCE</div>
              <div className="text-center mb-3">
                <p className="text-xs font-bold text-gray-800 mb-1">🏆 Amazing!</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Your app reached <span className="font-bold text-amber-600">maximum</span> performance possible.
                </p>
              </div>
              <div className="space-y-2">
                <a href="/contact" className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-xs text-center transition-all duration-300">
                  🚀 Enterprise Solutions
                </a>
                <button onClick={closePerfectionPopup} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg text-xs transition-all duration-200">
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : showSuccess ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-xl p-4 mx-3 w-full max-w-[200px] border border-gray-100" style={{boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'}}>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center relative">
                  <svg className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 text-center">Optimization Complete!</h3>
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600 mb-1">+{afterOptimization - beforeOptimization}%</div>
                  <div className="text-xs text-blue-700 font-medium">Performance Boost</div>
                </div>
              </div>
              <div className="text-center mb-3">
                <p className="text-xs text-gray-600">Your app is now running</p>
                <p className="text-xs font-semibold text-green-600">faster and more efficiently</p>
              </div>
              <div className="space-y-2">
                <a href="/contact" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs text-center transition-all duration-200">
                  Get Professional Help
                </a>
                <button onClick={closeSuccessPopup} className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                  Go App
                </button>
              </div>
            </div>
          </div>
        ) : showOptimizationPopup ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-xl p-4 mx-3 w-full max-w-[200px] border border-gray-100 popup-content" style={{boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'}}>
              <div className="text-center mb-3">
                <div className="w-8 h-8 mx-auto mb-2 relative">
                  <div className="absolute inset-0 text-blue-600 optimization-gear-icon">
                    <svg className="w-full h-full animate-spin" style={{animationDuration: '2s'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Optimizing Your App</h3>
                <p className="text-xs text-gray-600">Enhancing app performance</p>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">{progressText}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out" style={{width: `${Math.round(progress)}%`}}></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center space-x-2 step-indicator">
                    <div className={`step-icon w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${step === i ? 'border-blue-600' : 'border-gray-300'}`}>
                      <div className={`w-2 h-2 rounded-full step-dot transition-all duration-300 ${step === i ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    </div>
                    <span className={`text-xs transition-colors duration-300 ${step === i ? 'text-blue-600' : 'text-gray-600'}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mb-3">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <button onClick={cancelOptimization} className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Status */}
            <div className="flex justify-end px-3 pt-2 pb-0">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col px-3">
              <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-2">
                {/* Performance Card */}
                <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100 w-full max-w-[180px] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600 mb-0.5">{currentPerformance}%</div>
                  <div className="text-sm font-medium text-gray-800 mb-0.5">App Performance</div>
                  <div className="text-[10px] text-blue-600">↗ +12% this week</div>
                </div>
                {/* Analytics Cards */}
                <div className="grid grid-cols-2 gap-2 w-full max-w-[180px]">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="text-base font-bold text-gray-900">{stat.value}</div>
                      <div className="text-[10px] text-gray-500">{stat.label}</div>
                      <div className="text-[10px] text-green-600">{stat.change}</div>
                    </div>
                  ))}
                </div>
                {/* Features Section */}
                <div className="w-full max-w-[180px] bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-semibold text-gray-800 mb-1">Features</div>
                  <div className="space-y-1">
                    {features.map((feature, i) => (
                      <div key={i} className={`feature-item flex items-center space-x-1.5 opacity-0 animate-feature`} style={{animationDelay: `${i * 200}ms`, opacity: featureVisible[i] ? 1 : 0}}>
                        <div className={`w-1.5 h-1.5 rounded-full ${feature.color}`}></div>
                        <span className="text-[10px] text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Fixed Button Placement */}
            <div className="p-3 mt-auto">
              <button 
                onClick={startOptimization}
                disabled={isOptimizing}
                className={`w-full rounded-lg py-2 font-semibold text-xs transition-all duration-200 ${
                  currentPerformance >= 98 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {currentPerformance >= 98 ? 'Perfect! 🎯' : 'Optimize! 🚀'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RefactorApplication() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Refactor Your Application
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Optimize your existing applications for better performance, scalability, and user experience.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Showcase */}
          <div className="flex justify-center">
            <PhoneShowcase />
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCards.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg bg-${service.color}-100`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



