import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: ReactNode;
  children: ReactNode;
  className?: string;
  center?: boolean;
  first?: boolean;
  headingLevel?: 1 | 2;
}

export function Section({
  id,
  eyebrow,
  title,
  titleHighlight,
  children,
  className = '',
  center,
  first,
  headingLevel = 2,
}: SectionProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section id={id} className={`relative ${first ? 'pt-0 pb-16 md:pb-24' : 'py-16 md:py-24'} ${className}`}>
      <div className="container-x">
        {(eyebrow || title) && (
          <div className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}>
            {eyebrow && (
              <div
                className={`eyebrow mb-5 ${center ? 'text-center' : ''}`}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <Heading className="section-title text-[var(--text-primary)]">
                {title}
                {titleHighlight && <span className="text-brand-orange">{titleHighlight}</span>}
              </Heading>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
