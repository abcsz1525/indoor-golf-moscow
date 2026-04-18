import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL_COUNT = 8;

function TrailDot({ index }: { index: number }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ref = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const delay = (index + 1) * 2; // more lag for each trailing dot
    let animId: number;
    const animate = () => {
      const target = (window as unknown as Record<string, { x: number; y: number }>).__cursorPos || { x: -100, y: -100 };
      ref.current.x += (target.x - ref.current.x) / delay;
      ref.current.y += (target.y - ref.current.y) / delay;
      x.set(ref.current.x);
      y.set(ref.current.y);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [index, x, y]);

  const size = Math.max(2, 10 - index * 1);
  const opacity = Math.max(0.05, 0.4 - index * 0.045);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
      style={{
        x,
        y,
        width: size,
        height: size,
        backgroundColor: '#E8471A',
        opacity,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    // Store cursor position globally for trail dots
    (window as unknown as Record<string, unknown>).__cursorPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      (window as unknown as Record<string, unknown>).__cursorPos = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="grow"]')) setHovered(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="grow"]')) setHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isFinePointer, cursorX, cursorY, visible]);

  if (!isFinePointer) return null;

  const size = hovered ? 40 : 12;

  return (
    <>
      {/* Trail dots */}
      {visible && Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <TrailDot key={i} index={i} />
      ))}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          backgroundColor: '#E8471A',
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
