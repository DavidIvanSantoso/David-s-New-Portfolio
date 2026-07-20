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
            // FULLSTACK DEVELOPER // SPORTS ENTHUSIAST // 
          </motion.span>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span>David Ivan.</span>
            <span className="text-outline">Fullstack Developer</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
          2 Years of Experience in Web & Mobile Development.
          Building modern, scalable, and minimalist digital products. 
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
