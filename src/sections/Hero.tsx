import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-subtitle" variants={itemVariants}>
            // SOFTWARE ENGINEER & FRONTEND ARCHITECT
          </motion.span>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span>David Ivan.</span>
            <span className="text-outline">Crafting Modern</span>
            <span>Interfaces.</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            A developer passionate about creating minimalist, high-performance web applications. Combining clean, structured code with refined layout aesthetics to deliver top-tier user experiences.
          </motion.p>

          <motion.div className="hero-ctas" variants={itemVariants}>
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
