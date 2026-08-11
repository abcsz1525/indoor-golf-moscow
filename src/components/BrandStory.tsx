import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

const PILLARS = [
  {
    number: '01',
    title: 'Что означает ID',
    text: (
      <>
        Полное имя нашего бренда — <strong className="text-[var(--text-primary)]">Indoor Golf</strong>.
        {' '}<strong className="text-[var(--text-primary)]">ID Golf</strong> — его короткое имя и главный
        смысл: гольф как часть идентичности человека, его характера, образа жизни и круга людей.
      </>
    ),
  },
  {
    number: '02',
    title: 'Во что мы верим',
    text: (
      <>
        Гольф в России может быть современным, открытым и живым — без стереотипа о закрытом спорте
        для избранных, но с уважением к его истории, культуре и традициям.
      </>
    ),
  },
  {
    number: '03',
    title: 'Что мы создаём',
    text: (
      <>
        Indoor Golf Moscow — дом нашей экосистемы: тренировки и игровые встречи, клубное
        сообщество, лиги и турниры, образовательные программы и партнёрства.
      </>
    ),
  },
];

export function BrandStory() {
  return (
    <Section
      id="identity"
      eyebrow="Идеология бренда"
      title="Идеология"
      titleHighlight={
        <>
          {' '}
          <span className="section-title-id">ID</span>
          {' Golf'}
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
        {PILLARS.map((pillar, index) => (
          <motion.article
            key={pillar.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="border-t-2 border-brand-orange pt-6"
          >
            <div className="text-xs uppercase tracking-widest text-brand-orange">{pillar.number}</div>
            <h3 className="display mt-4 text-2xl uppercase text-[var(--text-primary)]">{pillar.title}</h3>
            <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">{pillar.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-bg-card border border-line p-6 md:p-10"
      >
        <div className="lg:col-span-3">
          <div className="eyebrow">Наша цель</div>
        </div>
        <p className="lg:col-span-9 text-lg md:text-xl text-[var(--text-primary)] leading-relaxed">
          Развивать и популяризировать гольф в России, объединяя игроков, тренеров, клубы,
          академии и партнёров. Вместе мы формируем новую российскую культуру гольфа — открытую,
          технологичную, эстетичную и объединяющую людей.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-line pt-10"
      >
        <div>
          <p className="text-lg text-[var(--text-muted)]">Гольф — это путь, характер и сообщество.</p>
          <p className="display mt-2 text-3xl md:text-5xl uppercase text-[var(--text-primary)]">
            Найди свой <span className="text-brand-orange">ID</span> в гольфе.
          </p>
        </div>
        <Link
          to="/contacts#booking"
          className="btn-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start md:self-auto"
        >
          Познакомиться с клубом
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </Section>
  );
}
