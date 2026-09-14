import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import './ClickBurst.css';

gsap.registerPlugin(Physics2DPlugin);

const PARTICLE_COUNT = 10;
const POOL_SIZE = PARTICLE_COUNT * 4;

export const ClickBurst: React.FC = () => {
  const poolRef = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef(0);

  useEffect(() => {
    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-burst-particle';
      particle.style.opacity = '0';
      document.body.appendChild(particle);
      pool.push(particle);
    }
    poolRef.current = pool;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select')) return;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = pool[cursorRef.current];
        cursorRef.current = (cursorRef.current + 1) % pool.length;

        gsap.killTweensOf(particle);
        gsap.set(particle, {
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          opacity: 1,
        });

        gsap.to(particle, {
          duration: 0.5 + Math.random() * 0.25,
          physics2D: {
            velocity: 120 + Math.random() * 180,
            angle: -90 + (Math.random() * 180 - 90),
            gravity: 600,
          },
          scale: 0,
          opacity: 0,
          ease: 'none',
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      pool.forEach((particle) => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
    };
  }, []);

  return null;
};
