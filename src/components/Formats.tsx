import { motion } from 'framer-motion';
import { Section } from './Section';

const SIMULATOR_PLANS = [
  { hours: '10', price: '55 000', period: '1 месяц' },
  { hours: '20', price: '100 000', period: '1 месяц' },
  { hours: '40', price: '200 000', period: '3 месяца' },
  { hours: '60', price: '270 000', period: '6 месяцев' },
];

const PRO_PLANS = [
  { hours: '5', price: '45 000' },
  { hours: '10', price: '85 000' },
  { hours: '25', price: '195 000' },
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

export function Formats() {
  return (
    <Section id="formats" eyebrow="Стоимость" title="Услуги">
      {/* Hourly rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line mb-16">
        <FadeIn className="bg-bg-primary p-8 md:p-10 flex items-center justify-between">
          <div>
            <h3 className="display text-2xl md:text-3xl text-neutral-900 uppercase tracking-wide">
              Аренда гольф-симулятора
            </h3>
            <p className="text-sm text-neutral-400 mt-2">Самостоятельная игра или тренировка</p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">6 000</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">руб./час</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="bg-bg-primary p-8 md:p-10 flex items-center justify-between">
          <div>
            <h3 className="display text-2xl md:text-3xl text-neutral-900 uppercase tracking-wide">
              Аренда набора клюшек
            </h3>
            <p className="text-sm text-neutral-400 mt-2">Полный набор для комфортной игры</p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">3 000</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">руб./час</div>
          </div>
        </FadeIn>
      </div>

      {/* Simulator subscription */}
      <FadeIn className="mb-16">
        <div className="border border-line">
          <div className="bg-bg-card p-6 md:p-8 border-b border-line">
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Абонемент
            </div>
            <h3 className="display text-3xl md:text-4xl text-neutral-900 uppercase tracking-wide">
              Аренда гольф-симулятора
            </h3>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 gap-px bg-line text-xs uppercase tracking-widest text-neutral-400">
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
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="text-neutral-900 text-lg md:text-xl font-light">{plan.price} <span className="text-neutral-400 text-sm">руб.</span></span>
              </div>
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="text-neutral-500">{plan.period}</span>
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
            <h3 className="display text-3xl md:text-4xl text-neutral-900 uppercase tracking-wide">
              Индивидуальные тренировки с ПРО
            </h3>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-2 gap-px bg-line text-xs uppercase tracking-widest text-neutral-400">
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
              <div className="bg-bg-primary p-4 md:p-5 flex items-center group-hover:bg-bg-card transition-colors">
                <span className="text-neutral-900 text-lg md:text-xl font-light">{plan.price} <span className="text-neutral-400 text-sm">руб.</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Per-hour lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
        <FadeIn className="bg-bg-primary p-8 md:p-10 flex items-center justify-between group hover:bg-bg-card transition-colors">
          <div>
            <h3 className="display text-2xl md:text-3xl text-neutral-900 uppercase tracking-wide">
              Групповое занятие
            </h3>
            <p className="text-sm text-neutral-400 mt-2">Мини группа 2–3 человека</p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">15 000</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">руб./час</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="bg-bg-primary p-8 md:p-10 flex items-center justify-between group hover:bg-bg-card transition-colors">
          <div>
            <h3 className="display text-2xl md:text-3xl text-neutral-900 uppercase tracking-wide">
              Индивидуальное занятие
            </h3>
            <p className="text-sm text-neutral-400 mt-2">Персональная тренировка с ПРО</p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="display text-3xl md:text-4xl text-brand-orange">10 000</div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">руб./час</div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
