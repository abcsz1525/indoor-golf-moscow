import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({ end, duration = 2, prefix = '', suffix = '' }: AnimatedNumberProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(interval);
      } else {
        setValue(Math.round(current));
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}
