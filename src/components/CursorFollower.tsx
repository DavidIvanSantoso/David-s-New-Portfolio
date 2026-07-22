import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import './CursorFollower.css';

interface TrailNode {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
  alpha: number;
  decay: number;
  size: number;
}

const GRID_SIZE = 14;

export const CursorFollower: React.FC = () => {
  const { x, y, hoveredElement } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mousePosRef = useRef({ x: -100, y: -100, hasMoved: false });
  const headPosRef = useRef({ x: -100, y: -100 });
  const lastGridRef = useRef({ gx: -999, gy: -999 });
  const trailRef = useRef<TrailNode[]>([]);
  const hoveredRef = useRef<string | null>(null);

  // Update position references
  useEffect(() => {
    if (x > 0 || y > 0) {
      if (!mousePosRef.current.hasMoved) {
        headPosRef.current = { x, y };
      }
      mousePosRef.current = { x, y, hasMoved: true };
    }
  }, [x, y]);

  useEffect(() => {
    hoveredRef.current = hoveredElement;
  }, [hoveredElement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const render = () => {
      const { x: targetX, y: targetY, hasMoved } = mousePosRef.current;
      const isHovered = hoveredRef.current === 'interactive';
      const dpr = window.devicePixelRatio || 1;

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (hasMoved) {
        // Interpolate head position smoothly towards target
        const lerpSpeed = isHovered ? 0.3 : 0.45;
        headPosRef.current.x += (targetX - headPosRef.current.x) * lerpSpeed;
        headPosRef.current.y += (targetY - headPosRef.current.y) * lerpSpeed;

        const hX = headPosRef.current.x;
        const hY = headPosRef.current.y;

        // Calculate grid snapped position
        const gx = Math.floor(hX / GRID_SIZE) * GRID_SIZE;
        const gy = Math.floor(hY / GRID_SIZE) * GRID_SIZE;

        // Spawn trail node when moving into a new grid cell or periodically
        if (gx !== lastGridRef.current.gx || gy !== lastGridRef.current.gy) {
          trailRef.current.push({
            x: hX,
            y: hY,
            gridX: gx,
            gridY: gy,
            alpha: 0.9,
            decay: isHovered ? 0.04 : 0.025,
            size: GRID_SIZE,
          });

          // Micro pixel dust particles
          const extraParticles = isHovered ? 2 : 1;
          for (let i = 0; i < extraParticles; i++) {
            const pSize = 3;
            const offX = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
            const offY = (Math.floor(Math.random() * 3) - 1) * GRID_SIZE;
            trailRef.current.push({
              x: gx + offX + (GRID_SIZE - pSize) / 2,
              y: gy + offY + (GRID_SIZE - pSize) / 2,
              gridX: gx + offX,
              gridY: gy + offY,
              alpha: 0.8,
              decay: 0.05 + Math.random() * 0.03,
              size: pSize,
            });
          }

          lastGridRef.current = { gx, gy };
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = false;

        // 1. Draw Grid Trail Cells
        const remainingTrail: TrailNode[] = [];
        for (let i = 0; i < trailRef.current.length; i++) {
          const node = trailRef.current[i];
          node.alpha -= node.decay;

          if (node.alpha > 0) {
            remainingTrail.push(node);

            if (node.size === GRID_SIZE) {
              // Solid translucent fill
              ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha * 0.25})`;
              ctx.fillRect(node.gridX, node.gridY, GRID_SIZE, GRID_SIZE);

              // Sharp border stroke
              ctx.strokeStyle = `rgba(255, 255, 255, ${node.alpha * 0.65})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(node.gridX + 0.5, node.gridY + 0.5, GRID_SIZE - 1, GRID_SIZE - 1);
            } else {
              // Pixel dust square
              ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha * 0.85})`;
              ctx.fillRect(Math.floor(node.x), Math.floor(node.y), node.size, node.size);
            }
          }
        }
        trailRef.current = remainingTrail;

        // 2. Draw Active Cursor Head
        if (isHovered) {
          // Expanded Interactive Pixel Matrix Box Frame
          const boxSize = 32;
          const bx = Math.floor(hX - boxSize / 2);
          const by = Math.floor(hY - boxSize / 2);
          const cLen = 7;
          const cThick = 2;

          ctx.fillStyle = '#ffffff';

          // 4 Corner Brackets
          // Top-Left
          ctx.fillRect(bx, by, cLen, cThick);
          ctx.fillRect(bx, by, cThick, cLen);
          // Top-Right
          ctx.fillRect(bx + boxSize - cLen, by, cLen, cThick);
          ctx.fillRect(bx + boxSize - cThick, by, cThick, cLen);
          // Bottom-Left
          ctx.fillRect(bx, by + boxSize - cThick, cLen, cThick);
          ctx.fillRect(bx, by + boxSize - cLen, cThick, cLen);
          // Bottom-Right
          ctx.fillRect(bx + boxSize - cLen, by + boxSize - cThick, cLen, cThick);
          ctx.fillRect(bx + boxSize - cThick, by + boxSize - cLen, cThick, cLen);

          // Center Pixel Dot
          ctx.fillRect(Math.floor(hX) - 2, Math.floor(hY) - 2, 4, 4);
        } else {
          // Standard State: Crisp Pixel Square Head + Crosshairs
          const hGx = gx;
          const hGy = gy;

          // Main white pixel block
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(hGx, hGy, GRID_SIZE, GRID_SIZE);

          // Dark inner cutout for 8-bit tile look
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(hGx + 3, hGy + 3, GRID_SIZE - 6, GRID_SIZE - 6);

          // Inner white center dot
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(hGx + 5, hGy + 5, GRID_SIZE - 10, GRID_SIZE - 10);

          // Pixel crosshair pins
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillRect(hGx + 5, hGy - 4, 4, 3); // top pin
          ctx.fillRect(hGx + 5, hGy + GRID_SIZE + 1, 4, 3); // bottom pin
          ctx.fillRect(hGx - 4, hGy + 5, 3, 4); // left pin
          ctx.fillRect(hGx + GRID_SIZE + 1, hGy + 5, 3, 4); // right pin
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-follower-canvas" />;
};
