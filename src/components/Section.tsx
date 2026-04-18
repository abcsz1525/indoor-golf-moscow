import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  children: ReactNode;
  className?: string;
  center?: boolean;
  first?: boolean;
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
}: SectionProps) {
  return (
    <section id={id} className={`relative ${first ? 'pt-0 pb-24 md:pb-32' : 'py-24 md:py-32'} ${className}`}>
      <div className="container-x">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className={`mb-14 md:mb-20 ${center ? 'text-center' : ''}`}
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
              <h2 className="section-title text-brand-orange uppercase">
                {title}
                {titleHighlight && <span className="text-neutral-900">{titleHighlight}</span>}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
