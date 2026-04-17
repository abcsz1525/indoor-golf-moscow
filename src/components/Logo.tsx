import logoSrc from '../assets/logo.png';

interface LogoProps {
  size?: number;
  withTagline?: boolean;
  className?: string;
}

export function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Indoor Golf Moscow"
      className={`h-10 w-auto object-contain ${className}`}
      style={{ height: `${size * 1.8}px` }}
    />
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
      <path
        d="M24 6 L26.2 21.8 L42 24 L26.2 26.2 L24 42 L21.8 26.2 L6 24 L21.8 21.8 Z"
        fill={color}
      />
      <circle cx="24" cy="24" r="2" fill="#0A0A0A" />
    </svg>
  );
}
