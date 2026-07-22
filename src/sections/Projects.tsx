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

export interface Project {
  title: string;
  categories: ('web' | 'mobile' | 'ui')[];
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ui'>('all');

  const projects: Project[] = [
    {
      title: 'IoT Platform',
      categories: ['web'],
      description: "Undergraduate thesis project. A web platform helping users maintain and visualize ESP32 and ESP8266 based IoT components by creating custom telemetry and control dashboards.",
      tags: ['C++', 'VueJS', 'Arduino', 'ExpressJS', 'PostgreSQL'],
      image: projectIot,
      githubUrl: 'https://github.com'
    },
    { 
      title: 'My Covid Test',
      categories: ['mobile'],
      description: 'Android Mobile App Development final project. Displays hospitals and clinics where users can take Covid-19 tests with real-time location mapping.',
      tags: ['Android Studio', 'Firebase'],
      image: projectCovidTest,
      githubUrl: 'https://github.com/DavidIvanSantoso/MyCovidTest'
    },
    {
      title: 'Crypto List App',
      categories: ['mobile'],
      description: 'iOS Development class project. Displays live cryptocurrency data, market caps, and price trends integrated with the CoinGecko REST API.',
      tags: ['Swift', 'Xcode'],
      image: projectCrypto,
      githubUrl: 'https://github.com'
    },
    {
      title: 'TripleS Wikipedia',
      categories: ['web'],
      description: 'Self-directed React learning project. An informational website introducing audiences to the 5th generation K-pop idol group TripleS.',
      tags: ['React', 'Bootstrap'],
      image: projectTriples,
      githubUrl: 'https://github.com/DavidIvanSantoso/TripleS_React'
    },
    {
      title: 'ReUnion Community Portal',
      categories: ['web'],
      description: 'React and Golang application for the Surabaya Pump It Up arcade game community, featuring community info, event news, and player score leaderboards.',
      tags: ['React', 'Golang'],
      image: projectReUnion,
      githubUrl: 'https://github.com/DavidIvanSantoso/reUnion'
    },
    {
      title: 'Game UI Design',
      categories: ['ui'],
      description: 'UI/UX class final project. Collaborative high-fidelity website interface design for modern online tactical shooter games similar to Valorant and CS2.',
      tags: ['UI/UX', 'Figma'],
      image: projectGameUI,
      demoUrl: 'https://figma.com'
    },
    {
      title: 'Shape Recognition ML',
      categories: ['ui'],
      description: 'Machine Learning class project. Trains a computer vision model to analyze uploaded images and classify their primary geometric shapes.',
      tags: ['Machine Learning', 'Python'],
      image: projectMachineLearning,
      githubUrl: 'https://github.com'
    },
    {
      title: "Friend's Bakery HR System",
      categories: ['web', 'mobile'],
      description: 'Freelance HR management platform for Friend’s Bakery comprising a React web portal for training schedules and a React Native mobile app for employee tracking.',
      tags: ['React', 'React Native', 'ExpressJS', 'Figma', 'PostgreSQL'],
      image: projectFriendsBakery,
      githubUrl: 'https://github.com'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(filter as any));

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
            ALL WORK ({projects.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            WEB APPS
          </button>
          <button 
            className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
            onClick={() => setFilter('mobile')}
          >
            MOBILE APPS
          </button>
          <button 
            className={`filter-btn ${filter === 'ui' ? 'active' : ''}`}
            onClick={() => setFilter('ui')}
          >
            UI/UX &amp; ML
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
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link-icon"
                      >
                        <ExternalLink size={14} />
                        <span>PREVIEW</span>
                      </a>
                    )}
                    {project.githubUrl && (
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
                    )}
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
