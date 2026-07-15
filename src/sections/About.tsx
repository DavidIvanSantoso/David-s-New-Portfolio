import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import profilePortrait from '../assets/profile_portrait.jpg';

export const About: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-num">01 // BIOGRAPHY</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-grid">
          <motion.div 
            className="about-text"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p>
              Hi, I'm David Ivan, a software engineer with a deep passion for designing and building highly responsive, intuitive, and clean digital experiences. I believe that good engineering is invisible—characterized by seamless performance, clean structure, and functional minimalism.
            </p>
            <p>
              Over the years, I've honed my skills in frontend development, crafting scalable architecture using modern frameworks like React and Vite, typed with TypeScript, and styled with pixel-perfect control. I specialize in building custom, fluid animations that increase user retention and satisfaction.
            </p>
            <p>
              When I'm not coding or refining interfaces, I'm researching software design patterns, checking out open-source projects, and seeking ways to push the boundaries of modern web technologies.
            </p>
          </motion.div>

          <motion.div 
            className="about-image-wrapper"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <img 
              src={profilePortrait} 
              alt="David Ivan Portrait" 
              className="about-image" 
            />
            <div className="about-image-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
