import { ArrowRight } from 'lucide-react';
import clubImage from '../assets/hero-club-wide.webp';
import { Section } from './Section';

const SIMULATOR_PLANS = [
  { hours: '10', price: '55 000', period: '1 месяц', benefit: '5 500 ₽/час' },
  { hours: '20', price: '100 000', period: '1 месяц', benefit: '5 000 ₽/час' },
  { hours: '40', price: '200 000', period: '3 месяца', benefit: '5 000 ₽/час' },
  { hours: '60', price: '270 000', period: '6 месяцев', benefit: '4 500 ₽/час · выгода 90 000 ₽' },
];

const PRO_PLANS = [
  { hours: '5', price: '45 000', benefit: '9 000 ₽/час' },
  { hours: '10', price: '85 000', benefit: '8 500 ₽/час' },
  { hours: '25', price: '195 000', benefit: '7 800 ₽/час' },
];

function BookButton({
  onClick,
  children = 'Выбрать формат',
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function Rate({
  title,
  description,
  price,
  onBooking,
}: {
  title: string;
  description: string;
  price: string;
  onBooking: () => void;
}) {
  return (
    <div className="grid gap-5 border-t border-line py-7 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--text-primary)] md:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
          {description}
        </p>
        <BookButton onClick={onBooking}>Забронировать</BookButton>
      </div>
      <div className="sm:text-right">
        <div className="display text-4xl leading-none text-brand-orange md:text-5xl">{price}</div>
        <div className="mt-1 text-xs tracking-[0.16em] text-[var(--text-subtle)]">₽ / час</div>
      </div>
    </div>
  );
}

function PlanTable({
  plans,
  showPeriod,
}: {
  plans: Array<{ hours: string; price: string; benefit: string; period?: string }>;
  showPeriod?: boolean;
}) {
  return (
    <div className="border-t border-line">
      <div
        className={`hidden py-4 text-[11px] tracking-[0.16em] text-[var(--text-subtle)] sm:grid ${
          showPeriod ? 'sm:grid-cols-[0.7fr_1.2fr_0.8fr]' : 'sm:grid-cols-[0.7fr_1.3fr]'
        }`}
      >
        <span>Часы</span>
        <span>Стоимость</span>
        {showPeriod && <span>Период</span>}
      </div>
      {plans.map((plan) => (
        <div
          key={plan.hours}
          className={`grid gap-3 border-t border-line py-5 first:border-t-0 sm:items-center ${
            showPeriod ? 'sm:grid-cols-[0.7fr_1.2fr_0.8fr]' : 'sm:grid-cols-[0.7fr_1.3fr]'
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="display text-4xl leading-none text-brand-orange">{plan.hours}</span>
            <span className="text-xs text-[var(--text-subtle)]">часов</span>
          </div>
          <div>
            <div className="text-lg font-medium text-[var(--text-primary)]">{plan.price} ₽</div>
            <div className="mt-1 text-sm text-brand-orange">{plan.benefit}</div>
          </div>
          {showPeriod && <div className="text-sm text-[var(--text-muted)]">{plan.period}</div>}
        </div>
      ))}
    </div>
  );
}

export function Formats({
  onBooking,
  headingLevel = 2,
}: {
  onBooking: (interest?: string) => void;
  headingLevel?: 1 | 2;
}) {
  return (
    <Section id="formats" eyebrow="Форматы и стоимость" title="Выберите свою игру" headingLevel={headingLevel}>
      <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] lg:col-span-7 md:text-xl">
          Разовая игра, регулярная практика или работа с PRO — стоимость собрана в одном месте,
          чтобы вы могли сразу выбрать подходящий ритм.
        </p>
        <p className="border-l border-brand-orange pl-5 text-sm leading-relaxed text-[var(--text-subtle)] lg:col-span-4 lg:col-start-9">
          На одном симуляторе могут играть до четырёх человек. Бронирование — от одного часа.
        </p>
      </div>

      <article className="grid overflow-hidden border-y border-line lg:grid-cols-12">
        <div className="relative min-h-[300px] overflow-hidden bg-black lg:col-span-7 lg:min-h-[520px]">
          <img
            src={clubImage}
            alt="Игровая зона Indoor Golf Moscow с симуляторами Trackman"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-sm text-white/80 md:p-8">
            Indoor Golf Moscow · Лужники
          </div>
        </div>
        <div className="flex flex-col justify-center bg-bg-card p-6 md:p-10 lg:col-span-5 lg:p-12">
          <div className="mb-8">
            <div className="eyebrow mb-3 text-brand-orange">Разовая игра</div>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-4xl">
              Всё необходимое для раунда
            </h2>
          </div>
          <Rate
            title="Аренда гольф-симулятора"
            description="До 4 человек на симуляторе — от 1 500 ₽ с человека"
            price="6 000"
            onBooking={() => onBooking('Игра на симуляторе')}
          />
          <Rate
            title="Аренда набора клюшек"
            description="Полный набор для комфортной игры"
            price="3 000"
            onBooking={() => onBooking('Игра на симуляторе')}
          />
        </div>
      </article>

      <article className="grid gap-10 border-b border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-4 text-brand-orange">Регулярная практика</div>
          <h2 className="text-3xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-4xl">
            Абонементы на симулятор
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--text-muted)]">
            Для тех, кто хочет тренироваться системно и заранее выбрать удобный объём часов.
          </p>
          <div className="mt-5">
            <BookButton onClick={() => onBooking('Абонемент')}>Выбрать абонемент</BookButton>
          </div>
        </div>
        <div className="lg:col-span-8">
          <PlanTable plans={SIMULATOR_PLANS} showPeriod />
        </div>
      </article>

      <article className="grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-4 text-brand-orange">Работа с PRO</div>
          <h2 className="text-3xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-4xl">
            Тренировка с профессионалом
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--text-muted)]">
            Индивидуальный формат или занятие небольшой группой — выберите подходящий способ
            работы.
          </p>
          <div className="mt-5">
            <BookButton onClick={() => onBooking('Тренировка с PRO')}>Записаться к PRO</BookButton>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="grid border-y border-line sm:grid-cols-2">
            <div className="py-7 sm:pr-8">
              <h3 className="text-xl font-medium text-[var(--text-primary)]">Индивидуальное занятие</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Персональная тренировка с PRO</p>
              <div className="mt-6 display text-4xl text-brand-orange">10 000 ₽</div>
              <div className="text-xs text-[var(--text-subtle)]">за час</div>
            </div>
            <div className="border-t border-line py-7 sm:border-l sm:border-t-0 sm:pl-8">
              <h3 className="text-xl font-medium text-[var(--text-primary)]">Групповое занятие</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Группа 2–3 человека — от 5 000 ₽ с человека</p>
              <div className="mt-6 display text-4xl text-brand-orange">15 000 ₽</div>
              <div className="text-xs text-[var(--text-subtle)]">за группу / час</div>
            </div>
          </div>
          <div className="mt-10">
            <div className="mb-4 text-sm font-medium text-[var(--text-primary)]">Абонементы на тренировки</div>
            <PlanTable plans={PRO_PLANS} />
          </div>
        </div>
      </article>
    </Section>
  );
}
