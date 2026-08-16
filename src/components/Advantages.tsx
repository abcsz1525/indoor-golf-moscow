import {
  CalendarClock,
  MapPin,
  Armchair,
  CircleParking,
  UtensilsCrossed,
} from 'lucide-react';
import { Section } from './Section';

const ITEMS = [
  {
    icon: CalendarClock,
    title: 'Круглый год',
    text: 'Три indoor-симулятора работают ежедневно с 9:00 до 23:00 независимо от сезона и погоды.',
  },
  {
    icon: MapPin,
    title: 'Лужники',
    text: 'Дворец тенниса в Лужниках — рядом метро Воробьёвы горы и МЦК Лужники, охраняемая парковка.',
  },
  {
    icon: Armchair,
    title: 'Комфорт',
    text: 'Раздевалки, душевые, зона отдыха и бар находятся рядом с игровыми боксами.',
  },
  {
    icon: CircleParking,
    title: 'Парковка',
    text: 'Охраняемая парковка на территории спорткомплекса Лужники.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Кафе и рестораны',
    text: 'Кофемания и La Raquette by Pinskiy&Co — в одном здании с клубом.',
  },
];

export function Advantages() {
  return (
    <Section id="advantages" eyebrow="Почему ID Golf" title="Всё для игры и отдыха">
      <div className="border-t border-line">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="grid gap-5 border-b border-line py-7 md:grid-cols-[3rem_minmax(10rem,0.7fr)_1.5fr] md:items-start md:gap-8 md:py-9"
            >
              <Icon size={25} className="text-brand-orange" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="text-xl font-medium text-[var(--text-primary)] md:text-2xl">{item.title}</h3>
              <div className="flex gap-5">
                <p className="max-w-xl flex-1 leading-relaxed text-[var(--text-muted)]">{item.text}</p>
                <span className="font-mono text-xs text-[var(--text-subtle)]">0{i + 1}</span>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
