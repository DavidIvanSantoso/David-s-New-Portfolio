import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

interface Tech {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  techs: Tech[];
}

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Web Development',
      techs: [
        {
          name: 'React',
          icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="logo-icon">
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(90 50 50)" />
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(150 50 50)" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Vue',
          icon: (
            <svg viewBox="0 0 256 221" fill="currentColor" className="logo-icon">
              <path d="M204.8 0H256L128 220.8L0 0h51.2L128 132.48L204.8 0z" />
              <path d="M51.2 0h44.8l32 55.2l32-55.2h44.8L128 107.52L51.2 0z" />
            </svg>
          )
        },
        {
          name: 'Laravel',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          )
        },
        {
          name: 'NodeJS',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              <line x1="8" y1="8" x2="10" y2="10" />
              <line x1="14" y1="14" x2="16" y2="16" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Mobile App Dev',
      techs: [
        {
          name: 'Flutter',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="logo-icon">
              <path d="M13.55 1.5L2 13l3.62 3.62L17.18 5.12M13.55 8.75L5.62 16.68 9.25 20.3l11.53-11.53M13.55 16l-3.63 3.62 3.63 3.63 10.37-10.37" />
            </svg>
          )
        },
        {
          name: 'React Native',
          icon: (
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="logo-icon">
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(90 50 50)" />
              <ellipse cx="50" cy="50" rx="10" ry="28" transform="rotate(150 50 50)" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Ioniq',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="logo-icon">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="12" r="1.5" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Android Studio',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="logo-icon">
              <path d="M17.5 13c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-11 0c-.8 0-1.5-.7-1.5-1.5S5.7 10 6.5 10 8 10.7 8 11.5 7.3 13 6.5 13zm11.8-6.4l1.6-2.7c.1-.1.1-.3 0-.4-.1-.1-.3-.1-.4 0l-1.6 2.8C15.4 5.5 13.8 5 12 5s-3.4.5-4.9 1.3L5.5 3.5c-.1-.1-.3-.1-.4 0-.1.1-.1.3 0 .4l1.6 2.7C4.1 8.2 2.3 10.9 2 14h20c-.3-3.1-2.1-5.8-4.7-7.6z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Database',
      techs: [
        {
          name: 'MySQL',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
              <text x="12" y="13" fontFamily="monospace" fontSize="7" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">M</text>
            </svg>
          )
        },
        {
          name: 'PostgreSQL',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
              <text x="12" y="13" fontFamily="monospace" fontSize="7" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">P</text>
            </svg>
          )
        },
        {
          name: 'Firebase',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M12 2L3.5 17.5h17L12 2z" />
              <path d="M12 8.5l4.5 7.5h-9L12 8.5z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Programming Language',
      techs: [
        {
          name: 'C#',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <text x="5" y="17" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="currentColor">C</text>
              <text x="15" y="13" fontFamily="sans-serif" fontSize="11" fontWeight="normal" fill="currentColor">#</text>
            </svg>
          )
        },
        {
          name: 'C++',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <text x="4" y="17" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="currentColor">C</text>
              <text x="13" y="14" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="currentColor">++</text>
            </svg>
          )
        },
        {
          name: 'JavaScript',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <text x="12" y="15" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">JS</text>
            </svg>
          )
        },
        {
          name: 'TypeScript',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <text x="12" y="15" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">TS</text>
            </svg>
          )
        },
        {
          name: 'Dart',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M12 2L2 22l10-6 10 6L12 2z" />
            </svg>
          )
        },
        {
          name: 'Kotlin',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="21" x2="21" y2="3" />
              <line x1="3" y1="12" x2="12" y2="3" />
            </svg>
          )
        },
        {
          name: 'PHP',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <ellipse cx="12" cy="12" rx="10" ry="6" />
              <text x="12" y="15" fontFamily="monospace" fontSize="7" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">PHP</text>
            </svg>
          )
        }
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">02 // COMPETENCIES</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skills-category"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={catIndex}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-logos-grid">
                {category.techs.map((tech) => (
                  <div key={tech.name} className="logo-item">
                    {tech.icon}
                    <span className="logo-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
