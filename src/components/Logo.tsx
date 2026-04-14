interface LogoProps {
  size?: number;
  withTagline?: boolean;
  className?: string;
}

export function Logo({ size = 32, withTagline = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CompassMark size={size} />
      <div className="leading-none">
        <div
          className="display text-white"
          style={{ fontSize: `${size * 0.95}px`, lineHeight: 0.9, letterSpacing: '0.02em' }}
        >
          <span className="text-brand-orange">D</span>Golf
        </div>
        {withTagline && (
          <div
            className="font-sans uppercase text-text mt-1"
            style={{ fontSize: `${size * 0.28}px`, letterSpacing: '0.28em' }}
          >
            Indoor Golf Moscow
          </div>
        )}
      </div>
    </div>
  );
}

export function CompassMark({ size = 32, color = '#E8471A' }: { size?: number; color?: string }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="24" r="15" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* 4-point compass star */}
      <path
        d="M24 6 L26.2 21.8 L42 24 L26.2 26.2 L24 42 L21.8 26.2 L6 24 L21.8 21.8 Z"
        fill={color}
      />
      <circle cx="24" cy="24" r="2" fill="#0A0A0A" />
    </svg>
  );
}
