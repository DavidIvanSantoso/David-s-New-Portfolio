import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

import projectCovidTest from '../assets/project-covidtest.png';
import projectReUnion from '../assets/project-reUnion.jpeg';
import projectTriples from '../assets/project-triples.png';
import projectIot from '../assets/project-iot.png';
import projectFriendsBakery from '../assets/project-friendsbakery.jpeg';
import projectCrypto from '../assets/project-crypto.png';
import projectGameUI from '../assets/project-gameui.png';
import projectMachineLearning from '../assets/project-machinelearning.png';

interface Project {
  title: string;
  category: 'web' | 'ui' | 'mobile-app';
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'ui' | 'mobile-app'>('all');

  const projects: Project[] = [
    {
      title: 'Aura E-Commerce Portal',
      category: 'web',
      description: 'A modern, lightning-fast e-commerce shopping platform utilizing React, Vite, and Stripe checkout API. Crafted with high performance and smooth animation in mind.',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: projectCovidTest,
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Omni Analytics SaaS Dashboard',
      category: 'web',
      description: 'A responsive administrative dashboard displaying real-time analytics data. Integrated with interactive charts and fluid drag-and-drop widget elements.',
      tags: ['React', 'TypeScript', 'Framer Motion', 'Chart.js', 'CSS Modules'],
      image: projectReUnion,
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectTriples, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectIot, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectTriples, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectFriendsBakery, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectCrypto, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectGameUI, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    },
    {
      title: 'Zen Design Portfolio Wireframe',
      category: 'ui',
      description: 'A UI design study focusing on typographic hierarchy, clean whitespace, and dark mode grid layout. Optimized for portfolio and creative agency layouts.',
      tags: ['Figma', 'UI/UX Design', 'Wireframing', 'Typography'],
      image: projectMachineLearning, // Reuse sass image with different contrast/filtering
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">04 // CREATIVE WORK</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Category Filters */}
        <div className="projects-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ALL WORK
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            WEB APPS
          </button>
          <button 
            className={`filter-btn ${filter === 'ui' ? 'active' : ''}`}
            onClick={() => setFilter('ui')}
          >
            UI/UX DESIGN
          </button>
        </div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="project-img-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-img" 
                  />
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link-icon"
                    >
                      <ExternalLink size={16} />
                      <span>LIVE DEMO</span>
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link-icon"
                    >
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                      <span>SOURCE CODE</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
