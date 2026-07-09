import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

const PLANS = [
  {
    title: 'Игра на симуляторе',
    price: '6 000',
    unit: '₽/час',
    note: 'До 6 человек на симуляторе — от 1 000 ₽ с человека',
    interest: 'Игра на симуляторе',
  },
  {
    title: 'Тренировка с PRO',
    price: '10 000',
    unit: '₽/час',
    note: 'Персональная работа над техникой с сертифицированным тренером',
    interest: 'Тренировка с PRO',
  },
  {
    title: 'Абонемент 10 часов',
    price: '55 000',
    unit: '₽',
    note: '5 500 ₽/час вместо 6 000 — и приоритетная бронь слотов',
    interest: 'Абонемент',
  },
];

export function PricingTeaser({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <Section id="pricing" eyebrow="Стоимость" title="Форматы" className="bg-bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group bg-bg-primary p-8 md:p-10 flex flex-col transition-colors hover:bg-bg-card"
          >
            <h3 className="display text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-wide mb-6">
              {p.title}
            </h3>
            <div className="mb-4">
              <span className="display text-5xl text-brand-orange">{p.price}</span>
              <span className="ml-2 text-sm uppercase tracking-widest text-[var(--text-subtle)]">
                {p.unit}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{p.note}</p>
            <button
              onClick={() => onBooking(p.interest)}
              className="btn-outline mt-8 text-sm justify-center"
            >
              Записаться
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand-orange hover:gap-3 transition-all"
        >
          Все услуги и абонементы
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
