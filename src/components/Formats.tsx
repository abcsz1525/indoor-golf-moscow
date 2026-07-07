import { motion } from 'framer-motion';
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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BookBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-orange hover:gap-3 transition-all"
    >
      Забронировать →
    </button>
  );
}

export function Formats({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <Section id="formats" eyebrow="Стоимость" title="Услуги">
      {/* Hourly rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line mb-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="bg-bg-primary p-8 md:p-10 flex items-center justify-between"
        >
          <div>
            <h3 className="display text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-wide">
              Аренда гольф-симулятора
            </h3>
            <p className="text-sm text-[var(--text-subtle)] mt-2">До 6 человек на симуляторе — от 1 000 ₽ с человека</p>
            <BookBtn onClick={() => onBooking('Игра на симуляторе')} />
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">6 000</div>
            <div className="text-xs uppercase tracking-widest text-[var(--text-subtle)]">руб./час</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="bg-bg-primary p-8 md:p-10 flex items-center justify-between"
        >
          <div>
            <h3 className="display text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-wide">
              Аренда набора клюшек
            </h3>
            <p className="text-sm text-[var(--text-subtle)] mt-2">Полный набор для комфортной игры</p>
            <BookBtn onClick={() => onBooking('Игра на симуляторе')} />
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">3 000</div>
            <div className="text-xs uppercase tracking-widest text-[var(--text-subtle)]">руб./час</div>
          </div>
        </motion.div>
      </div>

      {/* Simulator subscription */}
      <FadeIn className="mb-16">
        <div className="border border-line">
          <div className="bg-bg-card p-6 md:p-8 border-b border-line">
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Абонемент
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="display text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-wide">
                Абонементы на симулятор
              </h3>
              <BookBtn onClick={() => onBooking('Абонемент')} />
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 gap-px bg-line text-xs uppercase tracking-widest text-[var(--text-subtle)]">
            <div className="bg-bg-primary p-4 md:p-5">Кол-во часов</div>
            <div className="bg-bg-primary p-4 md:p-5">Стоимость</div>
            <div className="bg-bg-primary p-4 md:p-5">Период</div>
          </div>

          {/* Table rows */}
          {SIMULATOR_PLANS.map((plan, i) => (
            <motion.div
              key={plan.hours}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="grid grid-cols-3 gap-px bg-line group"
            >
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="display text-2xl md:text-3xl text-brand-orange">{plan.hours}</span>
              </div>
              <div className="bg-bg-primary p-4 md:p-5 flex flex-col justify-center group-hover:bg-bg-card transition-colors">
                <span className="text-[var(--text-primary)] text-lg md:text-xl font-light">{plan.price} <span className="text-[var(--text-subtle)] text-sm">₽</span></span>
                <span className="text-xs text-brand-orange mt-0.5">{plan.benefit}</span>
              </div>
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="text-[var(--text-muted)]">{plan.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* PRO training subscription */}
      <FadeIn className="mb-16">
        <div className="border border-line">
          <div className="bg-bg-card p-6 md:p-8 border-b border-line">
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Абонемент
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="display text-3xl md:text-4xl text-[var(--text-primary)] uppercase tracking-wide">
                Абонементы на тренировки с PRO
              </h3>
              <BookBtn onClick={() => onBooking('Тренировка с PRO')} />
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-2 gap-px bg-line text-xs uppercase tracking-widest text-[var(--text-subtle)]">
            <div className="bg-bg-primary p-4 md:p-5">Кол-во часов</div>
            <div className="bg-bg-primary p-4 md:p-5">Стоимость</div>
          </div>

          {/* Table rows */}
          {PRO_PLANS.map((plan, i) => (
            <motion.div
              key={plan.hours}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="grid grid-cols-2 gap-px bg-line group"
            >
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="display text-2xl md:text-3xl text-brand-orange">{plan.hours}</span>
              </div>
              <div className="bg-bg-primary p-4 md:p-5 flex flex-col justify-center group-hover:bg-bg-card transition-colors">
                <span className="text-[var(--text-primary)] text-lg md:text-xl font-light">{plan.price} <span className="text-[var(--text-subtle)] text-sm">₽</span></span>
                <span className="text-xs text-brand-orange mt-0.5">{plan.benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Per-hour lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
        <FadeIn className="bg-bg-primary p-8 md:p-10 flex items-center justify-between group hover:bg-bg-card transition-colors">
          <div>
            <h3 className="display text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-wide">
              Групповое занятие
            </h3>
            <p className="text-sm text-[var(--text-subtle)] mt-2">За группу 2–3 человека — от 5 000 ₽ с человека</p>
            <BookBtn onClick={() => onBooking('Тренировка с PRO')} />
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">15 000</div>
            <div className="text-xs uppercase tracking-widest text-[var(--text-subtle)]">руб./час</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="bg-bg-primary p-8 md:p-10 flex items-center justify-between group hover:bg-bg-card transition-colors">
          <div>
            <h3 className="display text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-wide">
              Индивидуальное занятие
            </h3>
            <p className="text-sm text-[var(--text-subtle)] mt-2">Персональная тренировка с PRO</p>
            <BookBtn onClick={() => onBooking('Тренировка с PRO')} />
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">10 000</div>
            <div className="text-xs uppercase tracking-widest text-[var(--text-subtle)]">руб./час</div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
