import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollDecoration.css';

export const ScrollDecoration: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress (0 to 1) to vertical translation (in pixels)
  // [100, -100] means it moves up as the user scrolls down (matching the page content scroll direction)
  const rawY = useTransform(scrollYProgress, [0, 1], [500, -500]);
  
  // Add a spring configuration for a buttery-smooth feel
  const y = useSpring(rawY, { stiffness: 80, damping: 25, mass: 0.5 });

  return (
    <div className="scroll-decoration-container">
      <motion.div 
        className="scroll-decoration-text"
        style={{ y }}
      >
        안녕하세요 . Hello . こんにちは . ¡Hola!
      </motion.div>
    </div>
  );
};
