import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Section } from './Section';

const ITEMS = [
  {
    q: 'Я никогда не играл в гольф. Можно прийти?',
    a: 'Да. Перед игрой проведём инструктаж, покажем базовые правила безопасности и поможем начать. Предварительная подготовка и специальный дресс-код не нужны.',
  },
  {
    q: 'Сколько человек играет на одном симуляторе?',
    a: 'До четырёх человек. При полной компании стоимость часа начинается от 1 500 ₽ с человека.',
  },
  {
    q: 'Что взять с собой?',
    a: 'Удобную одежду и чистую сменную обувь. Комплект клюшек можно арендовать в клубе за 3 000 ₽ в час; мячи предоставляются.',
  },
  {
    q: 'Есть ли парковка?',
    a: 'Да, парковка находится на территории спорткомплекса «Лужники». Клуб расположен по адресу: ул. Лужники, 24, стр. 21, Дворец тенниса, блок C.',
  },
  {
    q: 'Можно прийти с ребёнком?',
    a: 'Да. Тренировки для детей проводятся с тренером; рекомендуемый возраст — от четырёх лет. Формат и длительность занятия администратор поможет подобрать заранее.',
  },
  {
    q: 'Как проходит тренировка с PRO?',
    a: 'Тренер работает над техникой и использует данные Trackman — скорость мяча, угол вылета, вращение и другие параметры — чтобы объяснить результат каждого удара.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section id="faq" eyebrow="Перед визитом" title="Частые вопросы">
      <div className="grid gap-10 lg:grid-cols-12">
        <p className="editorial-lead text-[var(--text-muted)] lg:col-span-4">
          Всё основное — без длинных правил. Если вашего вопроса нет в списке, напишите администратору.
        </p>
        <div className="border-t border-line lg:col-span-8">
          {ITEMS.map((item, index) => {
            const open = openIdx === index;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIdx(open ? null : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-base font-medium text-[var(--text-primary)] md:text-lg">{item.q}</span>
                  <Plus size={19} className={`shrink-0 text-brand-orange transition-transform ${open ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
