import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

export function BrandStory() {
  return (
    <Section
      id="identity"
      eyebrow="Идеология бренда"
      title="Зачем существует ID Golf"
    >
      <div className="grid grid-cols-1 gap-10 border-t border-line pt-8 md:pt-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="text-sm text-brand-orange">ID — Identity</p>
          <p className="mt-3 max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
            Гольф как часть идентичности.
          </p>
        </div>

        <div className="space-y-6 text-base leading-relaxed text-[var(--text-muted)] md:text-lg lg:col-span-7 lg:col-start-6">
          <p>
            Полное имя бренда — <strong className="font-medium text-[var(--text-primary)]">Indoor Golf</strong>.
            {' '}<strong className="font-medium text-[var(--text-primary)]">ID Golf</strong> — его короткое
            имя и смысл: гольф становится частью характера, образа жизни и круга людей.
          </p>
          <p>
            Мы хотим, чтобы гольф в России был современным и открытым — без стереотипа о спорте
            для избранных, но с уважением к истории и традициям игры.
          </p>
          <p>
            Indoor Golf Moscow — дом этой идеи: здесь встречаются тренировки, самостоятельная
            игра, клубное сообщество, турниры и партнёрские проекты.
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 border-y border-line py-8 md:mt-20 md:py-10 lg:grid-cols-12 lg:gap-10">
        <p className="text-sm text-[var(--text-muted)] lg:col-span-3">Наша цель</p>
        <p className="max-w-4xl text-xl leading-relaxed tracking-[-0.01em] text-[var(--text-primary)] md:text-2xl lg:col-span-8">
          Развивать и популяризировать гольф в России, объединяя игроков, тренеров, клубы,
          академии и партнёров — и формировать культуру, в которой людям хочется играть и
          оставаться надолго.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-lg text-[var(--text-muted)]">
          Познакомьтесь с клубом в Лужниках и выберите свой формат игры.
        </p>
        <Link
          to="/contacts#booking"
          className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start border-b border-brand-orange pb-1 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-brand-orange md:self-auto"
        >
          Познакомиться с клубом
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
