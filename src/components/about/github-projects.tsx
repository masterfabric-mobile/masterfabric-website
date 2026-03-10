'use client'

import React, { useState, useEffect } from 'react'
import { Github, Star, GitFork, ExternalLink } from 'lucide-react'

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

  const duplicatedProjects = [...githubProjects, ...githubProjects]

  return (
    <section className="py-16 lg:py-20">
      {/* Header — contained */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Carousel full width (parent is 100vw); pause when hovering over cards */}
      {!isLoading && githubProjects.length > 0 && (
        <div className="overflow-hidden group w-full">
          <div
            className="flex gap-6 w-max animate-scroll-infinite pb-4"
            style={{ width: 'max-content' }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={index}
                className="group/card flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl p-6 border transition-all duration-300 flex flex-col bg-white border-gray-200/80 shadow-sm group-hover:bg-gray-50 group-hover:border-gray-200 group-hover:shadow-none group-hover:opacity-90 hover:bg-white hover:border-gray-300 hover:shadow-xl hover:opacity-100 hover:-translate-y-0.5"
              >
                {/* Header: icon + name + language */}
                <div className="flex gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 transition-colors group-hover/card:bg-blue-50/80 group-hover/card:border-blue-100">
                    <Github className="w-5 h-5 text-gray-500 transition-colors group-hover/card:text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate mb-0.5 transition-colors group-hover/card:text-blue-600">
                      {project.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: languageColors[project.language] || '#9ca3af' }}
                        aria-hidden
                      />
                      <span>{project.language}</span>
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.topics.slice(0, 3).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.topics.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-400 text-xs rounded-md font-medium">
                      +{project.topics.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer: stats + link */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover/card:border-gray-200">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500/80" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="w-4 h-4 text-gray-400" />
                      {project.forks}
                    </span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline underline-offset-2"
                  >
                    View repo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA — contained */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center">
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
