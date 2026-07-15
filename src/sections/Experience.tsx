import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

interface Job {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export const Experience: React.FC = () => {
  const experiences: Job[] = [
    {
      role: 'Senior Software Engineer',
      company: 'Nexus Tech Solutions',
      duration: '2024 - Present',
      description: [
        'Lead frontend development of highly-interactive web portals using React, Next.js, and TypeScript.',
        'Collaborate closely with UI/UX designers to implement premium layouts, animations, and micro-interactions.',
        'Improved application load times by 40% through code splitting, image optimization, and server-side caching.',
        'Mentored junior engineers and conducted code reviews to maintain code quality standards.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Prism Logic systems',
      duration: '2022 - 2024',
      description: [
        'Built scalable Single Page Applications (SPAs) with React and Redux Toolkit.',
        'Developed reusable UI component libraries using vanilla CSS and CSS Modules.',
        'Engineered responsive web applications ensuring accessibility standards (WCAG) and cross-browser support.',
        'Connected systems with REST and GraphQL endpoints, boosting data synchronization performance.'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'ByteForge Studio',
      duration: '2020 - 2022',
      description: [
        'Designed pixel-perfect portfolios and e-commerce websites from Figma mockups.',
        'Configured Vite and Webpack environments to streamline fast local developer workflows.',
        'Integrated interactive scroll-linked animations and page transitions using Framer Motion.',
        'Collaborated on git-based workflows and handled automated deployments via Vercel and Netlify.'
      ]
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">03 // CHRONOLOGY</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="experience-timeline">
          {experiences.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.role}`}
              className="experience-item"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{job.role}</h3>
                  <span className="experience-company">{job.company}</span>
                </div>
                <span className="experience-duration">{job.duration}</span>
              </div>
              <ul className="experience-desc">
                {job.description.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
