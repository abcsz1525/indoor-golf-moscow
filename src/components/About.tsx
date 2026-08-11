import { motion } from 'framer-motion';
import { Section } from './Section';
import logoIcon from '../assets/logo-icon.webp';

export function About({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  return (
    <Section
      id="about"
      eyebrow="О нас"
      title="Новая культура"
      titleHighlight={<> гольфа</>}
      headingLevel={headingLevel}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="max-w-3xl text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed font-light">
            ID Golf — проект гольфистов, которые искренне любят эту игру и хотят развивать
            современную, открытую культуру гольфа в России.
          </p>
          <p className="max-w-3xl text-lg text-[var(--text-muted)] leading-relaxed">
            Мы делаем путь от первого удара до турниров и сообщества понятным и увлекательным —
            с современными технологиями, сильными тренерами и возможностью играть круглый год.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-square bg-bg-card border border-line overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(227,91,39,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(227,91,39,0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <img src={logoIcon} alt="Indoor Golf Moscow" className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 object-contain" />
              <div className="display mt-3 sm:mt-5 text-2xl sm:text-3xl uppercase text-[var(--text-primary)]">
                ID = <span className="text-brand-orange">Identity</span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                Identity — идентичность
              </div>
            </div>

            <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
            <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
            <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
