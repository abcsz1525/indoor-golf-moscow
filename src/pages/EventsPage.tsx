import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { usePageMeta } from '../hooks/usePageMeta';

export function EventsPage() {
  usePageMeta(
    'События Indoor Golf Moscow — календарь клуба',
    'Календарь клубных событий Indoor Golf Moscow. Даты, программы и площадки ближайших мероприятий сейчас обновляются.',
  );

  return (
    <div className="page-content">
      <Section
        first
        headingLevel={1}
        eyebrow="Календарь"
        title="События "
        titleHighlight="клуба"
      >
        <div className="overflow-hidden border-y border-line bg-bg-card">
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-14">
            <div className="flex h-14 w-14 items-center justify-center border border-brand-orange/40 bg-brand-orange/10 text-brand-orange md:h-16 md:w-16">
              <CalendarDays aria-hidden="true" className="h-7 w-7" />
            </div>

            <div className="max-w-3xl">
              <div className="eyebrow mb-4 text-brand-orange">Афиша обновляется</div>
              <h2 className="text-3xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-5xl">
                Готовим обновлённый календарь
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                Сейчас мы уточняем календарь, программу и площадки ближайших событий.
                Опубликуем здесь только подтверждённую информацию.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-subtle)] md:text-base">
                Следите за обновлениями — новые анонсы появятся в этом разделе.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-line pt-7 text-sm text-[var(--text-subtle)] md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-3xl leading-relaxed">
            Хотите провести своё мероприятие на нашей площадке — корпоратив, день рождения или
            турнир? Соберём программу под задачу.
          </p>
          <Link
            to="/contacts#booking"
            className="inline-flex min-h-11 items-center gap-2 py-2 font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            Обсудить мероприятие <ArrowRight size={15} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
