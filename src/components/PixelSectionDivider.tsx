import React from 'react';
import { motion } from 'framer-motion';
import './PixelSectionDivider.css';

interface PixelSectionDividerProps {
  label?: string;
}

export const PixelSectionDivider: React.FC<PixelSectionDividerProps> = ({ label }) => {
  return (
    <div className="container">
      <motion.div
        className="pixel-section-divider"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="pixel-divider-line" />
        {label && (
          <div className="pixel-divider-badge interactive">
            <span className="pixel-badge-corner top-left" />
            <span className="pixel-badge-corner top-right" />
            <span className="pixel-badge-corner bottom-left" />
            <span className="pixel-badge-corner bottom-right" />
            <span className="pixel-badge-dot" />
            <span>[ SYS::{label} ]</span>
            <span className="pixel-badge-dot" />
          </div>
        )}
        <div className="pixel-divider-line" />
      </motion.div>
    </div>
  );
};
