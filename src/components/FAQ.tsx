import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section } from './Section';

const ITEMS = [
  {
    q: 'Я никогда не играл в гольф — можно прийти?',
    a: 'Да, это удобный способ познакомиться с игрой. Проведём инструктаж и поможем подобрать комплект — через 15 минут вы уже пробуете первые удары. Дресс-код и предварительная подготовка не нужны.',
  },
  {
    q: 'Сколько человек помещается на один симулятор?',
    a: 'До 4 человек на одном симуляторе. Компанией выходит от 1 500 ₽ с человека за час.',
  },
  {
    q: 'Что взять с собой?',
    a: 'Возьмите удобную одежду и чистую сменную обувь — кроссовки подойдут. Полный набор клюшек можно арендовать на месте за 3 000 ₽ в час; мячи для симулятора предоставляются клубом.',
  },
  {
    q: 'Есть ли парковка и как добраться?',
    a: 'Охраняемая парковка на территории спорткомплекса Лужники. Адрес: Москва, ул. Лужники 24, стр. 21, Дворец тенниса, блок C.',
  },
  {
    q: 'Можно с детьми?',
    a: 'Да, занятия с тренером для детей от 4 лет. Симулятор безопасен, а формат «семейный час» в выходные — играете все вместе.',
  },
  {
    q: 'Как проходит тренировка с PRO?',
    a: 'Персональная работа с сертифицированным тренером: постановка техники, анализ каждого удара по метрикам Trackman (скорость мяча, угол вылета, спин) — так тренируются игроки мирового тура.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" eyebrow="Вопросы" title="Частые вопросы" className="bg-bg-secondary">
      <div className="max-w-3xl">
        {ITEMS.map((item, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="border-b border-line">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                aria-expanded={open}
              >
                <span className="text-base md:text-lg text-[var(--text-primary)] group-hover:text-brand-orange transition-colors">
                  {item.q}
                </span>
                <Plus
                  size={20}
                  className={`flex-shrink-0 text-brand-orange transition-transform duration-300 ${
                    open ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[var(--text-muted)] leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
