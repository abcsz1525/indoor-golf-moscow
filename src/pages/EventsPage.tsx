import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { usePageMeta } from '../hooks/usePageMeta';
import { EventPhotoReport } from '../components/EventPhotoReport';
import {
  INVITATIONAL_2026_ALBUMS,
  INVITATIONAL_2026_COVER,
  INVITATIONAL_2026_PHOTOS,
} from '../data/invitational2026Photos';

export function EventsPage() {
  usePageMeta(
    'События Indoor Golf Moscow — календарь клуба',
    'Первый Pro-Am турнир ID Golf Invitational прошёл 4 сентября 2026 в гольф- и яхт-клубе «Пестово»: фотоотчёт, итоги и ссылка на полный архив. Даты следующего сезона объявим здесь.',
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
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
          Первый Pro-Am турнир ID Golf Invitational прошёл 4 сентября 2026 в гольф- и яхт-клубе
          «Пестово». Даты следующего сезона объявим здесь.
        </p>

        <div className="flex flex-col gap-6">
          {/* Турнир завершён: карточка намеренно не ссылка — переходить некуда,
              приём заявок закрыт вместе с событием. */}
          <div className="grid grid-cols-1 overflow-hidden border border-line bg-bg-card md:grid-cols-[minmax(0,42%)_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[300px]">
              <img
                alt={INVITATIONAL_2026_COVER.alt}
                width={INVITATIONAL_2026_COVER.width}
                height={INVITATIONAL_2026_COVER.height}
                className="absolute inset-0 h-full w-full object-cover"
                src={INVITATIONAL_2026_COVER.src}
              />
              <span className="absolute left-4 top-4 bg-black/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                Турнир завершён
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 md:p-9">
              <div>
                <div className="eyebrow mb-3 text-brand-orange">Pro-Am турнир</div>
                <h2 className="font-display text-3xl uppercase leading-none tracking-wide text-[var(--text-primary)] md:text-4xl">
                  ID Golf Invitational
                </h2>
                <p className="mt-4 max-w-xl text-sm text-[var(--text-muted)] md:text-base">
                  4 сентября 2026 года в гольф- и яхт-клубе «Пестово» прошёл первый Pro-Am турнир
                  ID Golf. На поле вышли 30 команд: в каждой профессионал и три любителя.
                  Победители получили коллекционные арт-объекты «Матрёшка» от ЦЕНТРСВЕТ.
                </p>
              </div>

              <div>
                <dl className="grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
                  <div className="flex items-start gap-2.5">
                    <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <dd className="text-xs text-[var(--text-muted)] md:text-sm">4 сентября 2026, пятница</dd>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <dd className="text-xs text-[var(--text-muted)] md:text-sm">Гольф- и яхт-клуб «Пестово»</dd>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <dd className="text-xs text-[var(--text-muted)] md:text-sm">30 команд · 3 любителя + профи</dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-subtle)] md:text-sm">
                  Турнир состоялся · сентябрь 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <EventPhotoReport
          photos={INVITATIONAL_2026_PHOTOS}
          albums={INVITATIONAL_2026_ALBUMS}
          description="Двадцать четыре кадра из турнирного дня: разминка, поле «Пестово», команды, церемония награждения и вечер в клубном доме. Полные архивы обоих фотографов — по ссылкам под сеткой."
        />

        <div className="mt-10 grid gap-5 border-t border-line pt-7 text-sm text-[var(--text-subtle)] md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-3xl leading-relaxed">
            Хотите провести своё мероприятие на нашей площадке — корпоратив, день рождения или
            турнир? Соберём программу под задачу.
          </p>
          <Link
            to="/contacts#booking"
            className="inline-flex min-h-11 items-center gap-2 py-2 font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            Оставить заявку <ArrowRight size={15} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
