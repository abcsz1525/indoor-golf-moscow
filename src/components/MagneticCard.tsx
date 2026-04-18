import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_OFFSET = 8;
const SPRING_CONFIG = { stiffness: 300, damping: 20 };

export function MagneticCard({ children, className = '' }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(0, SPRING_CONFIG);
  const y = useSpring(0, SPRING_CONFIG);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, deltaX * 0.1));
    const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, deltaY * 0.1));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
