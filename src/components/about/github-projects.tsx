'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Github, Star, GitFork, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface GitHubProject {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updated_at?: string;
}

export default function GitHubProjects() {
  const [githubProjects, setGithubProjects] = useState<GitHubProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Fetch repositories from GitHub API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.github.com/orgs/masterfabric-mobile/repos?sort=updated&per_page=10');
        
        if (response.ok) {
          const repos = await response.json();
          
          const projects = repos.map((repo: any) => ({
            name: repo.name,
            description: repo.description || "No description available",
            url: repo.html_url,
            language: repo.language || "Unknown",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            updated_at: repo.updated_at
          }));
          
          setGithubProjects(projects);
        } else {
          // Fallback data if API fails
          setGithubProjects([
            {
              name: "masterfabric-website",
              description: "Official website for MasterFabric Inc. - Mobile app development company specializing in Flutter and React Native applications.",
              url: "https://github.com/masterfabric-mobile/masterfabric-website",
              language: "TypeScript",
              stars: 0,
              forks: 0,
              topics: ["nextjs", "tailwindcss", "typescript", "website", "mobile-company"]
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        // Fallback data if API fails
        setGithubProjects([
          {
            name: "masterfabric-website",
            description: "Official website for MasterFabric Inc. - Mobile app development company specializing in Flutter and React Native applications.",
            url: "https://github.com/masterfabric-mobile/masterfabric-website",
            language: "TypeScript",
            stars: 0,
            forks: 0,
            topics: ["nextjs", "tailwindcss", "typescript", "website", "mobile-company"]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const languageColors: Record<string, string> = {
    "TypeScript": "#3178c6",
    "JavaScript": "#f1e05a", 
    "Dart": "#0175c2",
    "Shell": "#89e051",
    "Swift": "#fa7343",
    "Kotlin": "#a97bff",
    "Python": "#3572A5",
    "Nextjs": "#ff5d01"
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = 380
    const gap = 24
    const step = cardWidth + gap
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Open Source Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in giving back to the developer community. Here are our{' '}
            <span className="font-semibold text-blue-600">open source projects</span> that help developers{' '}
            build better mobile applications faster.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Carousel */}
        {!isLoading && githubProjects.length > 0 && (
          <div className="relative">
            {/* Prev/Next buttons */}
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {githubProjects.map((project, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 w-[320px] sm:w-[360px] snap-center bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors flex-shrink-0">
                      <Github className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: languageColors[project.language] || '#888' }}
                          />
                          <span>{project.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                    {project.topics.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded font-medium">
                        +{project.topics.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {project.forks}
                      </span>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Organization Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/masterfabric-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
