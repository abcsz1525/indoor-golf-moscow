import { motion } from 'framer-motion';
import { Section } from './Section';

const FOUNDERS = [
  { name: 'Андрей', initial: 'А' },
  { name: 'Наталья', initial: 'Н' },
];

export function Founders() {
  return (
    <Section id="founders" eyebrow="Основатели" title="Люди, которые живут гольфом">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-5 text-lg text-[var(--text-muted)] leading-relaxed"
        >
          <p>
            ID Golf основали Андрей и Наталья — не сторонние наблюдатели, а люди, которые сами
            играют, учатся, выходят на поле и по-настоящему любят гольф.
          </p>
          <p>
            Проект вырос из желания сделать вход в игру понятнее, а путь внутри неё — интереснее:
            от первого знакомства с клюшкой до своего круга игроков, клубных встреч и турниров.
          </p>
          <p className="text-[var(--text-primary)]">
            Мы строим пространство, в которое хочется возвращаться, и сообщество, частью которого
            хочется быть.
          </p>
        </motion.div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          {FOUNDERS.map((founder, index) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-bg-card">
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(227,91,39,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(227,91,39,0.12) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="display text-[clamp(96px,18vw,220px)] leading-none text-brand-orange/80 transition-transform duration-500 group-hover:scale-105">
                    {founder.initial}
                  </span>
                </div>
                <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
                <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
                <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
                <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />
              </div>
              <h3 className="display mt-5 text-3xl uppercase text-[var(--text-primary)]">
                {founder.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-brand-orange">
                Команда основателей ID Golf
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
