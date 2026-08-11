import { motion } from 'framer-motion';
import { Section } from './Section';
import andreyPhoto from '../assets/founders/andrey.webp';
import nataliaPhoto from '../assets/founders/natalia.webp';

const FOUNDERS = [
  {
    name: 'Андрей Золотарев',
    role: 'Сооснователь ID Golf',
    photo: andreyPhoto,
    alt: 'Андрей Золотарев, сооснователь ID Golf, на гольф-поле',
    objectPosition: 'center 54%',
  },
  {
    name: 'Наталья Колыхалова',
    role: 'Сооснователь ID Golf',
    photo: nataliaPhoto,
    alt: 'Наталья Колыхалова, сооснователь ID Golf, на гольф-поле',
    objectPosition: 'center 50%',
  },
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
          className="order-2 lg:order-1 lg:col-span-5 space-y-5 text-lg text-[var(--text-muted)] leading-relaxed"
        >
          <p>
            ID Golf основали Андрей Золотарев и Наталья Колыхалова — не сторонние наблюдатели, а
            люди, которые сами играют, учатся, выходят на поле и по-настоящему любят гольф.
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

        <div className="order-1 lg:order-2 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 md:gap-6">
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
                <img
                  src={founder.photo}
                  alt={founder.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: founder.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-white/80" />
                <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-white/80" />
                <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-white/80" />
                <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-white/80" />
              </div>
              <h3 className="display mt-5 text-2xl md:text-3xl uppercase text-[var(--text-primary)]">
                {founder.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-brand-orange">
                {founder.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
