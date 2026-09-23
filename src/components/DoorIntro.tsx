import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './DoorIntro.css';

interface DoorIntroProps {
  onOpen: () => void;
}

const ROWS = 22;
const HALF_COLS = 13;

const isDash = (r: number, u: number) => {
  if (r === 0 || r === ROWS - 1 || u === 0) return true;
  if (r >= 2 && (r === 2 || u === 2 || u === HALF_COLS - 1)) return true;
  const upperPanel = r >= 4 && r <= 9 && u >= 4 && u <= HALF_COLS - 4;
  const lowerPanel = r >= 12 && r <= 18 && u >= 4 && u <= HALF_COLS - 4;
  if (upperPanel && (r === 4 || r === 9 || u === 4 || u === HALF_COLS - 4)) return true;
  if (lowerPanel && (r === 12 || r === 18 || u === 4 || u === HALF_COLS - 4)) return true;
  return false;
};

const isKnob = (r: number, u: number) => r === 11 && u === HALF_COLS - 3;

const renderHalf = (side: 'left' | 'right') =>
  Array.from({ length: ROWS }, (_, r) => (
    <div className="door-row" key={r}>
      {Array.from({ length: HALF_COLS }, (_, c) => {
        const u = side === 'left' ? c : HALF_COLS - 1 - c;
        if (isKnob(r, u)) return <span className="dash door-knob" key={c}>-</span>;
        if (isDash(r, u)) return <span className="dash" key={c}>-</span>;
        return <span className="door-gap" key={c}> </span>;
      })}
    </div>
  ));

const WIN_ROWS = 12;
const WIN_COLS = 11;
const GROUND_COLS = 56;
const DUST_COUNT = 14;

const isWindowDash = (r: number, c: number) => {
  if (r === WIN_ROWS - 1) return true; // sill
  if (c < 1 || c > WIN_COLS - 2) return false;
  const mid = Math.floor(WIN_COLS / 2);
  return r === 0 || r === WIN_ROWS - 2 || c === 1 || c === WIN_COLS - 2 || r === 5 || c === mid;
};

const renderWindow = () =>
  Array.from({ length: WIN_ROWS }, (_, r) => (
    <div className="door-row" key={r}>
      {Array.from({ length: WIN_COLS }, (_, c) =>
        isWindowDash(r, c) ? (
          <span className="dash" key={c}>-</span>
        ) : (
          <span className="door-gap" key={c}> </span>
        ),
      )}
    </div>
  ));

export const DoorIntro: React.FC<DoorIntroProps> = ({ onOpen }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef(false);
  const facadeRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);

  const leftHalf = useMemo(() => renderHalf('left'), []);
  const rightHalf = useMemo(() => renderHalf('right'), []);
  const windowArt = useMemo(() => renderWindow(), []);
  const dust = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() < 0.3 ? 3 : 2,
        key: i,
      })),
    [],
  );

  useEffect(() => {
    if (gone) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [gone]);

  useEffect(() => {
    const facade = facadeRef.current;
    const stage = stageRef.current;
    if (!facade || !stage) return;

    const ctx = gsap.context(() => {
      const dashes = facade.querySelectorAll('.dash');
      const windowGlows = facade.querySelectorAll('.door-window-glow');

      gsap.set(facade, { scale: 0.1, opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(windowGlows, { opacity: 0 });

      gsap.to(facade, { opacity: 1, duration: 0.8, ease: 'power1.out' });
      gsap.from(dashes, {
        opacity: 0,
        duration: 0.4,
        stagger: { each: 0.004, from: 'center' },
      });
      gsap.to(stage, { y: -8, duration: 0.3, repeat: 9, yoyo: true, ease: 'sine.inOut' });
      gsap.to(facade, {
        scale: 1,
        duration: 3,
        ease: 'power2.out',
        onComplete: () => setReady(true),
      });

      // Windows light up once the door is reached, then flicker faintly
      gsap.to(windowGlows, {
        opacity: 1,
        duration: 1.2,
        delay: 2.2,
        stagger: 0.35,
        ease: 'power1.inOut',
        onComplete: () => {
          windowGlows.forEach((glow) => {
            gsap.to(glow, {
              opacity: 0.55,
              duration: gsap.utils.random(1.6, 2.6),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });
        },
      });

      const motes = dustRef.current?.children;
      if (motes) {
        Array.from(motes).forEach((mote) => {
          gsap.fromTo(
            mote,
            { opacity: 0 },
            { opacity: gsap.utils.random(0.15, 0.4), duration: 2, delay: gsap.utils.random(0, 2) },
          );
          gsap.to(mote, {
            x: gsap.utils.random(-40, 40),
            y: gsap.utils.random(-60, -20),
            duration: gsap.utils.random(6, 11),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (hovering: boolean) => {
    if (!ready || openingRef.current) return;
    gsap.to(leftRef.current, { rotationY: hovering ? -7 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(rightRef.current, { rotationY: hovering ? 7 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
  };

  const handleEnter = () => {
    if (!ready || openingRef.current) return;
    openingRef.current = true;

    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.to(hintRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(leftRef.current, { rotationY: -78, duration: 1.1, ease: 'power3.inOut', overwrite: 'auto' }, 0)
      .to(rightRef.current, { rotationY: 78, duration: 1.1, ease: 'power3.inOut', overwrite: 'auto' }, 0)
      .to(glowRef.current, { opacity: 1, duration: 0.8 }, 0.1)
      .to(facadeRef.current, { scale: 14, duration: 1.3, ease: 'power3.in' }, 0.9)
      .add(() => onOpen(), 1.7)
      .to(rootRef.current, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 1.8);
  };

  if (gone) return null;

  return (
    <div ref={rootRef} className="door-intro">
      <div ref={dustRef} className="door-dust" aria-hidden="true">
        {dust.map((d) => (
          <span key={d.key} style={{ left: d.left, top: d.top, width: d.size, height: d.size }} />
        ))}
      </div>

      <div ref={stageRef} className="door-stage">
        <div ref={facadeRef} className="door-facade">
          <div className="door-window" aria-hidden="true">
            <div className="door-window-glow" />
            <div className="door-window-art">{windowArt}</div>
          </div>

          <button
            ref={doorRef}
            type="button"
            className="door interactive"
            aria-label="Open the door to enter the portfolio"
            disabled={!ready}
            onClick={handleEnter}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <div ref={glowRef} className="door-glow" />
            <div ref={leftRef} className="door-half door-half-left">{leftHalf}</div>
            <div ref={rightRef} className="door-half door-half-right">{rightHalf}</div>
          </button>

          <div className="door-window" aria-hidden="true">
            <div className="door-window-glow" />
            <div className="door-window-art">{windowArt}</div>
          </div>

          <div className="door-ground" aria-hidden="true">
            {'- '.repeat(GROUND_COLS / 2).trimEnd()}
          </div>
        </div>
      </div>

      <div ref={hintRef} className="door-hint">
        {ready ? (
          <span className="door-hint-ready">[ CLICK THE DOOR TO ENTER ]</span>
        ) : (
          <span>// APPROACHING...</span>
        )}
      </div>
    </div>
  );
};
