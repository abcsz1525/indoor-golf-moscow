interface GridOverlayProps {
  variant?: 'orange' | 'dark';
  opacity?: number;
  size?: number;
  className?: string;
}

export function GridOverlay({
  variant = 'orange',
  opacity = 1,
  size = 60,
  className = '',
}: GridOverlayProps) {
  const lineColor =
    variant === 'orange' ? 'rgba(232,71,26,0.08)' : 'rgba(0,0,0,0.15)';
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage:
          'radial-gradient(ellipse at center, #000 40%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, #000 40%, transparent 100%)',
      }}
    />
  );
}
