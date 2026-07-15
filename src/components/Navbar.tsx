import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '// home', href: '#home' },
    { name: '// about', href: '#about' },
    { name: '// skills', href: '#skills' },
    { name: '// experience', href: '#experience' },
    { name: '// projects', href: '#projects' },
    { name: '// contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a href="#home" className="nav-logo">
            David.
          </a>

          <nav className="nav-links">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </nav>

          <button 
            className="mobile-toggle" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <span style={{ 
              transform: isOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              marginBottom: isOpen ? '0' : '5px'
            }}></span>
            <span style={{ 
              opacity: isOpen ? 0 : 1, 
              transform: isOpen ? 'scaleX(0)' : 'none',
              marginBottom: isOpen ? '0' : '5px'
            }}></span>
            <span style={{ 
              transform: isOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' 
            }}></span>
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div 
          className="scroll-progress" 
          style={{ scaleX, transformOrigin: 'left' }} 
        />
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
