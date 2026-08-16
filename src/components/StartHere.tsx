import { ArrowRight } from 'lucide-react';
import { Section } from './Section';
import imgFirst from '../assets/gallery/club-6335.webp';
import imgPractice from '../assets/gallery/club-6345.webp';
import imgCompany from '../assets/gallery/1.webp';

const SCENARIOS = [
  {
    number: '01',
    title: 'Первый визит',
    text: 'Проведём инструктаж, предоставим оборудование и поможем сделать первые удары.',
    cta: 'Запланировать визит',
    interest: 'Первая игра',
    image: imgFirst,
    alt: 'Первое знакомство с гольфом в Indoor Golf Moscow',
    className: 'lg:col-span-7 lg:row-span-2',
  },
  {
    number: '02',
    title: 'Самостоятельная игра',
    text: 'Тренируйте дистанцию и стабильность или сыграйте раунд на виртуальном поле.',
    cta: 'Забронировать симулятор',
    interest: 'Игра на симуляторе',
    image: imgPractice,
    alt: 'Самостоятельная игра на симуляторе Trackman',
    className: 'lg:col-span-5',
  },
  {
    number: '03',
    title: 'С тренером',
    text: 'Персональная работа над техникой с разбором каждого удара по данным Trackman.',
    cta: 'Записаться на тренировку',
    interest: 'Тренировка с PRO',
    className: 'lg:col-span-5',
  },
  {
    number: '04',
    title: 'Компания и события',
    text: 'Игра до четырёх человек на одном симуляторе или закрытое мероприятие для команды.',
    cta: 'Обсудить мероприятие',
    interest: 'Корпоратив',
    image: imgCompany,
    alt: 'Гольф с компанией в Indoor Golf Moscow',
    className: 'lg:col-span-12',
  },
];

export function StartHere({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <Section id="start" eyebrow="Четыре сценария" title="Как вы хотите играть?">
      <div className="grid gap-px bg-line lg:grid-cols-12">
        {SCENARIOS.map((scenario) => (
          <article
            key={scenario.number}
            className={`group relative min-h-[360px] overflow-hidden bg-bg-card ${scenario.className}`}
          >
            {scenario.image && (
              <img
                src={scenario.image}
                alt={scenario.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            )}
            <div
              className={`absolute inset-0 ${
                scenario.image
                  ? 'bg-gradient-to-t from-black/88 via-black/35 to-transparent'
                  : 'bg-[linear-gradient(135deg,var(--bg-card),var(--bg-secondary))]'
              }`}
            />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-7 md:p-9">
              <span className={`text-xs font-medium tracking-[0.12em] ${scenario.image ? 'text-white/60' : 'text-brand-orange'}`}>
                {scenario.number}
              </span>
              <div className="max-w-xl">
                <h3 className={`display text-4xl leading-none md:text-5xl ${scenario.image ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                  {scenario.title}
                </h3>
                <p className={`mt-4 max-w-lg leading-relaxed ${scenario.image ? 'text-white/72' : 'text-[var(--text-muted)]'}`}>
                  {scenario.text}
                </p>
                <button
                  onClick={() => onBooking(scenario.interest)}
                  className={`mt-6 inline-flex min-h-11 items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors ${
                    scenario.image
                      ? 'border-white/65 text-white hover:border-brand-orange hover:text-brand-orange'
                      : 'border-brand-orange text-brand-orange hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {scenario.cta}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
