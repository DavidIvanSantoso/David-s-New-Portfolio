import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleTitle } from '../components/ScrambleTitle';
import './About.css';
import profilePortrait from '../assets/profile-david.png';

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
          <ScrambleTitle className="section-title">About Me</ScrambleTitle>
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
              Hi, I'm David Ivan, a fullstack with a passion for solving real world problems through digitalization.
            </p>
            <p>
              Trough my experiences, I've upgrade my skills in fullstack development, making websites and mobile applications using modern frameworks like React and Flutter.
            </p>
            <p>
              When I'm not coding, I always love to play sports such as tennis, badminton, and basketball. Hit me up on social medias to play together.
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
