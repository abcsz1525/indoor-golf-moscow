import { motion } from 'framer-motion';
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
    <section id={id} className={`relative ${first ? 'pt-0 pb-12 md:pb-16' : 'py-12 md:py-16'} ${className}`}>
      <div className="container-x">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}
          >
            {eyebrow && (
              <div
                className={`eyebrow mb-4 flex items-center gap-3 ${
                  center ? 'justify-center' : ''
                }`}
              >
                <span className="h-px w-8 bg-brand-orange" />
                {eyebrow}
              </div>
            )}
            {title && (
              <Heading className="section-title text-brand-orange uppercase">
                {title}
                {titleHighlight && <span className="text-[var(--text-primary)]">{titleHighlight}</span>}
              </Heading>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
