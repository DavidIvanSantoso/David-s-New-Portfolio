import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useCursorImagePreview = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const xToRef = useRef<gsap.QuickToFunc | null>(null);
  const yToRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -130 });
    xToRef.current = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    yToRef.current = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
  }, []);

  const handlePreviewEnter = (image: string) => (e: React.MouseEvent) => {
    if (previewImgRef.current) previewImgRef.current.src = image;
    xToRef.current?.(e.clientX);
    yToRef.current?.(e.clientY);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
  };

  const handlePreviewMove = (e: React.MouseEvent) => {
    xToRef.current?.(e.clientX);
    yToRef.current?.(e.clientY);
  };

  const handlePreviewLeave = () => {
    gsap.to(previewRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power3.out' });
  };

  return { previewRef, previewImgRef, handlePreviewEnter, handlePreviewMove, handlePreviewLeave };
};
