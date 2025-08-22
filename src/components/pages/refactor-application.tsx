"use client";

import React, { useEffect, useState } from "react";
import {
  Zap,
  BarChart3,
  Users,
  Settings,
  Database,
  TrendingUp,
  Activity,
  Cloud,
  Search,
  Target,
} from "lucide-react";
import { cn } from "@/utils";
import styles from "../../styles/refactor-application.module.css";
import { Icon } from "@iconify/react";

type ServiceColor = "blue" | "indigo" | "purple" | "cyan" | "slate" | "teal";

const serviceCards: {
  icon: JSX.Element;
  title: string;
  description: string;
  color: ServiceColor;
}[] = [
  {
    icon: (
      <svg
        className="w-5 h-5 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
    title: "Event Tracking",
    description:
      "Track user interactions and behaviors with detailed analytics and insights",
    color: "blue",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Crash Reports & Monitoring",
    description:
      "Monitor app stability and identify performance issues in real-time",
    color: "indigo",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "Analytics Reports",
    description:
      "Comprehensive data insights and metrics to drive growth strategies",
    color: "purple",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-cyan-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Release Monitoring",
    description:
      "Track deployment success and monitor issues with real-time alerts",
    color: "cyan",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-slate-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    title: "BigData Management",
    description:
      "Process and analyze large datasets to extract meaningful insights",
    color: "slate",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-teal-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "User Growth & Retention",
    description:
      "Optimize user acquisition and engagement to increase retention rates",
    color: "teal",
  },
];

const colorBgMap: Record<ServiceColor, string> = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
  teal: "bg-teal-500",
};

// Phone Showcase Component - Content only (no frame)
function PhoneShowcase() {
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPerfection, setShowPerfection] = useState(false);
  const [featureVisible, setFeatureVisible] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [step, setStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState(85);
  const [beforeOptimization, setBeforeOptimization] = useState(85);
  const [afterOptimization, setAfterOptimization] = useState(85);
  const [progressText, setProgressText] = useState("Analyzing...");
  const [showOptimizationPopup, setShowOptimizationPopup] = useState(false);

  useEffect(() => {
    const randomPerf = Math.floor(Math.random() * 11) + 80;
    setCurrentPerformance(randomPerf);
    setBeforeOptimization(randomPerf);
    setAfterOptimization(randomPerf);
  }, []);

  const optimizationSteps = [
    {
      id: "step1",
      text: "Analyzing Performance...",
      duration: 2000,
      progressEnd: 30,
    },
    {
      id: "step2",
      text: "Optimizing Code...",
      duration: 2500,
      progressEnd: 70,
    },
    {
      id: "step3",
      text: "Applying Changes...",
      duration: 1500,
      progressEnd: 100,
    },
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
        if (p >= 10 && !featureVisible[0])
          setFeatureVisible([true, false, false, false]);
        if (p >= 40 && !featureVisible[1])
          setFeatureVisible([true, true, false, false]);
        if (p >= 60 && !featureVisible[2])
          setFeatureVisible([true, true, true, false]);
        if (p >= 80 && !featureVisible[3])
          setFeatureVisible([true, true, true, true]);
        await new Promise((res) => setTimeout(res, 30));
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
    {
      value: "24.8K",
      label: "Active Users",
      change: "+15.2%",
      icon: "Users",
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "0.8s",
      label: "Load Time",
      change: "-45%",
      icon: "Zap",
      color: "from-green-500 to-green-600",
    },
    {
      value: "99.2%",
      label: "Stability",
      change: "+2.4%",
      icon: "Shield",
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "4.9",
      label: "Rating",
      change: "+0.2",
      icon: "Star",
      color: "from-amber-500 to-amber-600",
    },
  ];

  const features = [
    {
      text: "Real-time Analytics",
      color: "from-blue-500 to-blue-600",
      icon: "BarChart3",
    },
    {
      text: "Crash Detection",
      color: "from-purple-500 to-purple-600",
      icon: "Search",
    },
    {
      text: "Performance Monitor",
      color: "from-green-500 to-green-600",
      icon: "TrendingUp",
    },
    {
      text: "User Engagement",
      color: "from-amber-500 to-amber-600",
      icon: "Target",
    },
  ];

  const steps = [
    "Analyzing Performance",
    "Optimizing Code",
    "Applying Changes",
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Perfection Popup */}
      {showPerfection ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-400/90 via-yellow-300/80 to-orange-400/85"></div>
          <div className="relative z-10 bg-white rounded-xl p-4 mx-3 w-full max-w-[200px] border border-amber-200/50 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg
                className="w-6 h-6 text-white drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2L13 8l6 .75-4.12 4.62L16 20l-6-3-6 3 1.12-6.63L1 8.75 7 8l3-6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-amber-700 mb-1 text-center">
              PERFECTION!
            </h3>
            <div className="text-2xl font-black text-amber-600 mb-1 text-center">
              98%
            </div>
            <div className="text-[10px] text-amber-700 font-bold text-center mb-3">
              MAX PERFORMANCE
            </div>
            <div className="text-center mb-3">
              <p className="text-xs font-bold text-gray-800 mb-1">Amazing!</p>
              <p className="text-[10px] text-gray-700 leading-relaxed">
                Your app reached{" "}
                <span className="font-bold text-amber-600">maximum</span>{" "}
                performance possible.
              </p>
            </div>
            <div className="space-y-2">
              <a
                href="/contact"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 rounded-lg text-xs text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Enterprise Solutions
              </a>
              <button
                onClick={closePerfectionPopup}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg text-xs transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : showSuccess ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/80"></div>
          <div className="relative bg-white rounded-xl p-4 mx-3 w-full max-w-[200px] border border-gray-200/50 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg relative">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center relative">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="absolute inset-0 bg-green-500/30 rounded-xl animate-ping"></div>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">
              Optimization Complete!
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-3 border border-blue-100/50">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 mb-1">
                  +{afterOptimization - beforeOptimization}%
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  Performance Boost
                </div>
              </div>
            </div>
            <div className="text-center mb-3">
              <p className="text-xs text-gray-600">Your app is now running</p>
              <p className="text-xs font-semibold text-green-600">
                faster and more efficiently
              </p>
            </div>
            <div className="space-y-2">
              <a
                href="/contact"
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg text-xs text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Professional Help
              </a>
              <button
                onClick={closeSuccessPopup}
                className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-xs hover:bg-gray-200 transition-all duration-200"
              >
                Go App
              </button>
            </div>
          </div>
        </div>
      ) : showOptimizationPopup ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900/80"></div>
          <div className="relative bg-white rounded-xl p-4 mx-3 w-full max-w-[200px] border border-gray-200/50 shadow-xl">
            <div className="text-center mb-3">
              <div className="w-10 h-10 mx-auto mb-2 relative">
                <div className="absolute inset-0 text-blue-600 optimization-gear-icon">
                  <svg
                    className="w-full h-full animate-spin"
                    style={{ animationDuration: "2s" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Optimizing Your App
              </h3>
              <p className="text-xs text-gray-600">Enhancing app performance</p>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-700">
                  {progressText}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${Math.round(progress)}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 step-indicator"
                >
                  <div
                    className={`step-icon w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      step === i
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full step-dot transition-all duration-300 ${
                        step === i ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`text-xs transition-colors duration-300 ${
                      step === i ? "text-blue-600 font-medium" : "text-gray-600"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-3">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot"></div>
                <div
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce loading-dot"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
            <button
              onClick={cancelOptimization}
              className="w-full bg-gray-100 text-gray-700 font-medium py-2 rounded-lg text-xs hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Main Content */}
          <div className="flex-1 flex flex-col px-4 py-4">
            <div className="flex-1 flex flex-col items-center justify-center space-y-3">
              {/* Performance Card */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl p-3 text-center w-full max-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-400/20">
                <div className="text-2xl font-black text-white mb-1 drop-shadow-sm">
                  {currentPerformance}%
                </div>
                <div className="text-xs font-semibold text-blue-100 mb-1">
                  App Performance
                </div>
                <div className="text-[10px] text-blue-200 bg-blue-500/30 rounded-full px-2 py-0.5 inline-block">
                  +12% this week
                </div>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-2 text-center border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-sm font-bold text-gray-900 mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-gray-600 mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[10px] font-medium text-green-600 bg-green-50 rounded-full px-1.5 py-0.5 inline-block">
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Section */}
              <div className="w-full max-w-[200px] bg-white rounded-lg p-3 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-xs font-bold text-gray-800 mb-2">
                  Features
                </div>
                <div className="space-y-1.5">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className={`feature-item flex items-center space-x-2 opacity-0 animate-feature`}
                      style={{
                        animationDelay: `${i * 200}ms`,
                        opacity: featureVisible[i] ? 1 : 0,
                      }}
                    >
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-md flex items-center justify-center text-white shadow-sm`}
                      >
                        {feature.icon === "BarChart3" && (
                          <BarChart3 className="w-3 h-3" />
                        )}
                        {feature.icon === "Search" && (
                          <Search className="w-3 h-3" />
                        )}
                        {feature.icon === "TrendingUp" && (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        {feature.icon === "Target" && (
                          <Target className="w-3 h-3" />
                        )}
                      </div>
                      <span className="text-xs text-gray-700 font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="w-full max-w-[200px] pt-1">
                <button
                  onClick={startOptimization}
                  disabled={isOptimizing}
                  className={`w-full rounded-lg py-3 font-bold text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    currentPerformance >= 98
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  }`}
                >
                  {currentPerformance >= 98 ? "Perfect!" : "Optimize!"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function RefactorApplication() {
  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Consistent with codebase patterns */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
            <span className="block">App Design,</span>
            <span className="block text-blue-600">Optimization</span>
            <span className="block">and Growth</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Already have an app? We can help refresh its look and enhance its
            performance. We focus on improving user experience and applying the
            latest technologies.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center">
          {/* Services Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6">
            {serviceCards.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "service-card w-full md:max-w-[24rem] min-h-[10rem] group relative p-3 rounded-lg border-2 transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-white shadow-sm hover:shadow-xl",
                  `service-${service.color}`
                )}
              >
                <div className="absolute top-0 right-0 w-10 h-10 opacity-5 overflow-hidden rounded-tr-lg">
                  <div
                    className={`w-full h-full ${
                      colorBgMap[service.color]
                    } transform rotate-45 translate-x-2.5 -translate-y-2.5`}
                  ></div>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-md bg-white border-2 border-gray-100 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm line-clamp-3">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          {/* App Showcase Column - Centered */}
          <div className="flex justify-center mt-8 lg:mt-0">
            <div className="iphone-16-frame transform scale-75 md:scale-90 lg:scale-100">
              <div className="side-button volume-up"></div>
              <div className="side-button volume-down"></div>
              <div className="side-button action"></div>
              <div className="side-button left"></div>
              <div className="iphone-16-screen">
                <PhoneShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
