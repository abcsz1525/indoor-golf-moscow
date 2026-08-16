import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

const PLANS = [
  {
    title: 'Игра на симуляторе',
    price: '6 000',
    unit: '₽ / час',
    note: 'До четырёх человек на одном симуляторе.',
    action: 'Забронировать симулятор',
    interest: 'Игра на симуляторе',
  },
  {
    title: 'Тренировка с PRO',
    price: '10 000',
    unit: '₽ / час',
    note: 'Персональная работа над техникой и разбор данных Trackman.',
    action: 'Записаться на тренировку',
    interest: 'Тренировка с PRO',
  },
  {
    title: 'Абонемент на 10 часов',
    price: '55 000',
    unit: '₽',
    note: 'Стоимость часа — 5 500 ₽ вместо 6 000 ₽.',
    action: 'Выбрать абонемент',
    interest: 'Абонемент',
  },
];

export function PricingTeaser({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <Section id="pricing" eyebrow="Стоимость" title="Основные форматы" className="bg-bg-secondary">
      <div className="border-t border-line">
        {PLANS.map((plan, index) => (
          <article key={plan.title} className="grid gap-5 border-b border-line py-7 md:grid-cols-12 md:items-center md:py-9">
            <div className="text-xs font-medium text-brand-orange md:col-span-1">0{index + 1}</div>
            <h3 className="display text-3xl leading-none text-[var(--text-primary)] md:col-span-4 md:text-4xl">
              {plan.title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:col-span-3">{plan.note}</p>
            <div className="md:col-span-2 md:text-right">
              <span className="display text-4xl leading-none text-[var(--text-primary)]">{plan.price}</span>
              <span className="ml-2 text-xs text-[var(--text-muted)]">{plan.unit}</span>
            </div>
            <button
              onClick={() => onBooking(plan.interest)}
              className="inline-flex min-h-11 items-center gap-2 text-left text-sm font-semibold text-brand-orange transition-colors hover:text-[var(--text-primary)] md:col-span-2 md:justify-end"
            >
              {plan.action}
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/services" className="text-link">
          Все услуги и условия
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
