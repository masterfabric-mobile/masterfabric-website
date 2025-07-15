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
              topics: ["astro", "tailwindcss", "typescript", "website", "mobile-company"]
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
            topics: ["astro", "tailwindcss", "typescript", "website", "mobile-company"]
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
    "Astro": "#ff5d01"
  }

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Open Source Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in giving back to the developer community. Here are our{' '}
            <span className="font-semibold text-blue-600">open source projects</span> that help developers 
            build better mobile applications faster.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Vertical List of Horizontal Project Cards */}
        {!isLoading && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {githubProjects.map((project, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left Side: Project Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* GitHub Icon */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300 flex-shrink-0">
                        <Github className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      
                      {/* Project Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {project.name}
                          </h3>
                          {/* Language Badge */}
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{backgroundColor: languageColors[project.language] || '#888'}}
                            ></div>
                            <span>{project.language}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {project.description}
                        </p>
                        
                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.topics.slice(0, 4).map((topic, topicIndex) => (
                            <span 
                              key={topicIndex}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                          {project.topics.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                              +{project.topics.length - 4}
                            </span>
                          )}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{project.stars} stars</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-3 h-3" />
                            <span>{project.forks} forks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side: Action Button */}
                  <div className="flex-shrink-0">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 group-hover:scale-105"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GitHub Organization Link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/masterfabric-mobile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
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

// Add CSS styles equivalent to those in the Astro file
const styles = {
  lineClamp3: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  scrollbarHide: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    }
  }
};
