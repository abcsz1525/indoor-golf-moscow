import { motion } from 'framer-motion';
import { Radar, MapPin, CalendarClock } from 'lucide-react';
import { Section } from './Section';

const ITEMS = [
  {
    icon: Radar,
    title: 'TrackMan',
    text: 'Профессиональные симуляторы мирового уровня — технологии PGA Tour у вас под рукой.',
  },
  {
    icon: CalendarClock,
    title: '365 дней',
    text: 'Тренируйтесь круглый год в любую погоду — идеальный микроклимат и освещение.',
  },
  {
    icon: MapPin,
    title: 'Лужники',
    text: 'Премиальное расположение в самом сердце Москвы — 10 минут от метро Спортивная.',
  },
];

export function WhyUs() {
  return (
    <Section eyebrow="Почему Indoor Golf" title="Первое в России">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-bg-primary p-10 min-h-[280px] flex flex-col transition-colors hover:bg-bg-card"
            >
              <span className="absolute top-0 left-0 h-px w-10 bg-brand-orange transition-all duration-500 group-hover:w-full" />
              <Icon size={36} className="text-brand-orange mb-8" strokeWidth={1.4} />
              <h3 className="display text-3xl text-neutral-900 uppercase mb-4 tracking-wide">
                {item.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">{item.text}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-16 text-center text-xl md:text-2xl text-neutral-500 font-light leading-relaxed max-w-3xl mx-auto"
      >
        Первое в России пространство гольфа в помещении, оснащённое передовыми
        симуляторами <span className="text-brand-orange">Trackman</span>.
        Технологии мирового уровня, профессиональное сообщество и атмосфера
        премиального клуба.
      </motion.p>
    </Section>
  );
}
