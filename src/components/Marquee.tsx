import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Marquee({ children, speed = 30, className = '' }: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y border-line py-4 ${className}`}
    >
      <div
        className="inline-flex"
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        <span
          className="inline-flex items-center gap-8 text-lg uppercase tracking-widest md:text-xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {children}
        </span>
        <span
          className="inline-flex items-center gap-8 pl-8 text-lg uppercase tracking-widest md:text-xl"
          style={{ color: 'var(--text-muted)' }}
          aria-hidden
        >
          {children}
        </span>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-scroll var(--duration, 30s) linear infinite;
        }
      `}</style>
    </div>
  );
}
