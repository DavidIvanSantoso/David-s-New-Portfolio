import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

interface ScrambleTitleProps {
  children: string;
  className?: string;
}

export const ScrambleTitle: React.FC<ScrambleTitleProps> = ({ children, className }) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          gsap.to(el, {
            duration: 1,
            scrambleText: {
              text: children,
              chars: 'upperAndLowerCase',
              revealDelay: 0.15,
              speed: 0.5,
            },
            ease: 'none',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
};
