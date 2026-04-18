import { motion } from 'framer-motion';
import { Section } from './Section';

const TAGS = [
  'Начинающие',
  'Любители',
  'PRO',
  'С тренером',
  'С друзьями',
  'Корпоративы',
];

export function ForWhom() {
  return (
    <Section id="for-whom" eyebrow="Аудитория" title="Для кого">
      <div className="flex flex-wrap gap-3 md:gap-4">
        {TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center px-6 py-4 border border-line text-neutral-900 uppercase tracking-widest text-sm cursor-default transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
        {[
          { k: '3', label: 'Симулятора' },
          { k: '365', label: 'Дней в году' },
          { k: '12', label: 'Часов в день' },
          { k: '№1', label: 'В России' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-bg-primary p-8 flex flex-col items-start"
          >
            <div className="display text-6xl md:text-7xl text-brand-orange leading-none">
              {s.k}
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-neutral-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
