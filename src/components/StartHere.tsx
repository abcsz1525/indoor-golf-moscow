import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Snowflake, Users, Baby } from 'lucide-react';
import { Section } from './Section';

const SEGMENTS = [
  {
    icon: Sparkles,
    title: 'Первая игра',
    text: 'Никогда не держали клюшку? Идеально. Инструктаж и клюшки включим — через 15 минут вы бьёте первый драйв.',
    cta: 'Попробовать гольф',
    interest: 'Первая игра',
  },
  {
    icon: Snowflake,
    title: 'Межсезонье',
    text: 'Сохраните свинг в межсезонье: Trackman-метрики как на туре и 150+ полей мира в HD.',
    cta: 'Записаться на игру',
    interest: 'Игра на симуляторе',
  },
  {
    icon: Users,
    title: 'Корпоратив',
    text: 'Турнир для команды от 4 до 20 человек: инструкторы, турнирная таблица, кейтеринг от лучших ресторанов Лужников.',
    cta: 'Предложение для компании',
    interest: 'Корпоратив',
  },
  {
    icon: Baby,
    title: 'Детям',
    text: 'Занятия с тренером для детей от 4 лет: техника, координация и азарт — без поездок за город.',
    cta: 'Записать на пробное',
    interest: 'Тренировка с PRO',
  },
];

export function StartHere({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <Section id="start" eyebrow="Сценарии" title="С чего начать">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
        {SEGMENTS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-bg-primary p-8 flex flex-col transition-colors hover:bg-bg-card"
            >
              <span className="absolute top-0 left-0 h-px w-10 bg-brand-orange transition-all duration-500 group-hover:w-full" />
              <Icon size={30} className="text-brand-orange mb-6" strokeWidth={1.4} />
              <h3 className="display text-2xl text-[var(--text-primary)] uppercase mb-3 tracking-wide">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{s.text}</p>
              <button
                onClick={() => onBooking(s.interest)}
                className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand-orange hover:gap-3 transition-all text-left"
              >
                {s.cta}
                <ArrowRight size={15} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
