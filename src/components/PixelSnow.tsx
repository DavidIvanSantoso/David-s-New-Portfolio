import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import './PixelSnow.css';

interface Snowflake {
  x: number;
  y: number;
  speedY: number;
  swaySpeed: number;
  swayAmount: number;
  swayStep: number;
  size: number;
  type: number; // 0: 2px, 1: 3px, 2: 4px, 3: cross shape
  alpha: number;
  baseAlpha: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const PixelSnow: React.FC = () => {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef({ x: -100, y: -100 });
  const snowflakesRef = useRef<Snowflake[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const NUM_FLAKES = 85;

    // Initialize snow particles
    const initFlakes = (w: number, h: number) => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < NUM_FLAKES; i++) {
        const type = Math.floor(Math.random() * 4);
        const baseAlpha = 0.15 + Math.random() * 0.45;
        const size = type === 0 ? 2 : type === 1 ? 3 : type === 2 ? 4 : 2; // cross is made of 2px blocks

        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speedY: 0.4 + Math.random() * 1.1,
          swaySpeed: 0.01 + Math.random() * 0.02,
          swayAmount: 0.3 + Math.random() * 0.8,
          swayStep: Math.random() * Math.PI * 2,
          size,
          type,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
      snowflakesRef.current = flakes;
    };

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      if (snowflakesRef.current.length === 0) {
        initFlakes(w, h);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;

      // 1. Update and Render Falling Snowflakes
      for (let i = 0; i < snowflakesRef.current.length; i++) {
        const flake = snowflakesRef.current[i];

        // Motion physics
        flake.y += flake.speedY;
        flake.swayStep += flake.swaySpeed;
        flake.x += Math.sin(flake.swayStep) * flake.swayAmount;

        // Reset to top when off-screen
        if (flake.y > h + 10) {
          flake.y = -10;
          flake.x = Math.random() * w;
        }
        if (flake.x < -10) flake.x = w + 10;
        if (flake.x > w + 10) flake.x = -10;

        // Mouse proximity reaction
        const dx = flake.x - mx;
        const dy = flake.y - my;
        const distSq = dx * dx + dy * dy;
        const proxRadius = 70;

        if (distSq < proxRadius * proxRadius && mx > 0 && my > 0) {
          flake.alpha = Math.min(1.0, flake.alpha + 0.1);

          // Spawn sparkle burst if very close
          if (distSq < 25 * 25 && Math.random() < 0.15) {
            sparklesRef.current.push({
              x: flake.x,
              y: flake.y,
              vx: (Math.random() - 0.5) * 1.8,
              vy: (Math.random() - 0.5) * 1.8 - 0.5,
              size: 2,
              alpha: 0.9,
            });
          }
        } else {
          // Return towards base alpha
          flake.alpha += (flake.baseAlpha - flake.alpha) * 0.05;
        }

        // Draw Snowflake Shapes
        const fx = Math.floor(flake.x);
        const fy = Math.floor(flake.y);

        if (flake.type === 3) {
          // 8-bit Cross / Plus Snowflake Shape
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
          const bs = 2; // block size
          ctx.fillRect(fx, fy, bs, bs); // Center
          ctx.fillRect(fx, fy - bs, bs, bs); // Top
          ctx.fillRect(fx, fy + bs, bs, bs); // Bottom
          ctx.fillRect(fx - bs, fy, bs, bs); // Left
          ctx.fillRect(fx + bs, fy, bs, bs); // Right
        } else {
          // Standard Square Pixel Flake
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
          ctx.fillRect(fx, fy, flake.size, flake.size);
        }
      }

      // 2. Update and Render Interactive Sparkles
      const nextSparkles: Sparkle[] = [];
      for (let i = 0; i < sparklesRef.current.length; i++) {
        const sp = sparklesRef.current[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.04;

        if (sp.alpha > 0) {
          nextSparkles.push(sp);
          ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha})`;
          ctx.fillRect(Math.floor(sp.x), Math.floor(sp.y), sp.size, sp.size);
        }
      }
      sparklesRef.current = nextSparkles;

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-snow-canvas" />;
};
