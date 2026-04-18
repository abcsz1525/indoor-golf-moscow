import { motion } from 'framer-motion';
import { Section } from './Section';

const ACTIVITIES = [
  { n: '01', title: 'Играть на симуляторах', desc: 'Более 150 легендарных полей мира в HD-разрешении.' },
  { n: '02', title: 'Тренироваться', desc: 'Отработка ударов, range-сессии, анализ техники.' },
  { n: '03', title: 'Брать уроки с PRO', desc: 'Персональные занятия с сертифицированными тренерами.' },
  { n: '04', title: 'Дружеские игры', desc: 'Забронируйте симулятор на компанию — до 6 человек.' },
  { n: '05', title: 'Мини-турниры', desc: 'Регулярные клубные соревнования по актуальным форматам.' },
  { n: '06', title: 'Смотреть трансляции', desc: 'Крупные турниры PGA и LIV на больших экранах клуба.' },
];

export function Activities() {
  return (
    <Section id="activities" eyebrow="Сценарии" title="Что можно делать">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
        {ACTIVITIES.map((a, i) => (
          <motion.div
            key={a.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            className="group relative flex items-start gap-6 md:gap-10 py-8 border-b border-line"
          >
            <div className="display text-5xl md:text-6xl text-brand-orange w-20 flex-shrink-0 leading-none">
              {a.n}
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl text-neutral-900 uppercase tracking-wide font-medium mb-2 group-hover:text-brand-orange transition-colors">
                {a.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
