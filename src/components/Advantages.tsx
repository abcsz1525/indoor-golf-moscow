import { motion } from 'framer-motion';
import {
  Radar,
  CalendarClock,
  MapPin,
  Sparkles,
  CircleParking,
  UtensilsCrossed,
} from 'lucide-react';
import { MagneticCard } from './MagneticCard';
import { Section } from './Section';

const ITEMS = [
  {
    icon: Radar,
    title: 'TrackMan',
    text: 'Профессиональные симуляторы мирового уровня — именно так тренируются игроки PGA Tour.',
  },
  {
    icon: CalendarClock,
    title: 'Круглый год',
    text: 'Тренируйтесь в любую погоду и любой сезон — микроклимат и свет всегда идеальные.',
  },
  {
    icon: MapPin,
    title: 'Лужники',
    text: 'Удобное расположение во Дворце тенниса — десять минут от центра, рядом метро Спортивная.',
  },
  {
    icon: Sparkles,
    title: 'Комфорт',
    text: 'Раздевалки и душевые premium-класса, зона отдыха и бар — как в лучших клубах мира.',
  },
  {
    icon: CircleParking,
    title: 'Парковка',
    text: 'Бесплатная охраняемая парковка на территории спорткомплекса Лужники.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Кафе и рестораны',
    text: 'Кофемания и La Raquette by Pinskiy&Co — в одном здании с клубом.',
  },
];

export function Advantages() {
  return (
    <Section id="advantages" eyebrow="Почему мы" title="Преимущества">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-bg-primary p-8 md:p-10 min-h-[260px] flex flex-col transition-colors hover:bg-bg-card"
            >
              <MagneticCard className="w-full h-full">
                {/* top line */}
                <span className="absolute top-0 left-0 h-px w-10 bg-brand-orange transition-all duration-500 group-hover:w-full" />

                <Icon
                  size={32}
                  className="text-brand-orange mb-8"
                  strokeWidth={1.4}
                />
                <h3 className="display text-3xl text-neutral-900 uppercase mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">{item.text}</p>

                {/* index */}
                <span className="absolute top-6 right-6 text-xs text-neutral-300 font-mono">
                  0{i + 1}
                </span>
              </MagneticCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
