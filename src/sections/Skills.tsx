import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

interface Skill {
  name: string;
  level: number; // out of 5
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React / Next.js', level: 5 },
        { name: 'TypeScript', level: 5 },
        { name: 'Vite / Webpack', level: 4 },
        { name: 'HTML5 / CSS3 / Sass', level: 5 },
        { name: 'Framer Motion', level: 4 },
        { name: 'Redux / Zustand', level: 4 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js / Express', level: 4 },
        { name: 'REST & GraphQL APIs', level: 4 },
        { name: 'PostgreSQL / MySQL', level: 3 },
        { name: 'MongoDB / Mongoose', level: 4 },
        { name: 'Firebase / Supabase', level: 4 },
        { name: 'TypeScript Node', level: 4 },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git / GitHub', level: 5 },
        { name: 'Docker', level: 3 },
        { name: 'Vercel / Netlify / GH Pages', level: 5 },
        { name: 'CI/CD Pipelines', level: 3 },
        { name: 'Figma', level: 4 },
        { name: 'Linux / Bash', level: 4 },
      ],
    },
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
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-dot-container" aria-label={`${skill.level} out of 5`}>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`skill-dot ${i < skill.level ? 'active' : ''}`}
                        />
                      ))}
                    </div>
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
