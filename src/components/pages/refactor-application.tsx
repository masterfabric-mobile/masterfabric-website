"use client";

import React from "react";
import { cn } from "@/utils";
import AppPerformanceDemo from "./app-performance-screen";

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
            <AppPerformanceDemo className="origin-top scale-90 sm:scale-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
