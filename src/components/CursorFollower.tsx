import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import './CursorFollower.css';

export const CursorFollower: React.FC = () => {
  const { x, y, hoveredElement } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const showCursor = () => setIsVisible(true);
    window.addEventListener('mousemove', showCursor, { once: true });
    return () => window.removeEventListener('mousemove', showCursor);
  }, []);

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`cursor-follower ${hoveredElement === 'interactive' ? 'hovered' : ''}`}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    />
  );
};
