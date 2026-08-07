import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { Section } from '../components/Section';
import { usePageMeta } from '../hooks/usePageMeta';

interface EventItem {
  slug: string;
  href: string;
  status: 'open' | 'soon';
  badge: string;
  title: string;
  subtitle: string;
  date: string;
  place: string;
  people: string;
  description: string;
  image: string;
}

const EVENTS: EventItem[] = [
  {
    slug: 'invitational-2026',
    href: '/invitational/',
    status: 'open',
    badge: 'Приём заявок открыт',
    title: 'ID Golf Invitational',
    subtitle: 'Pro-Am турнир',
    date: '4 сентября 2026, пятница',
    place: 'Moscow Country Club, Нахабино',
    people: '22 команды · 3 любителя + профи',
    description:
      'Любители играют в одной команде с профессионалами. В зачёт идут три лучших результата команды. Гала-ужин, церемония награждения и программа для гостей на площадке.',
    image: '/invitational/img/course.jpg',
  },
];

export function EventsPage() {
  usePageMeta(
    'События Indoor Golf Moscow — турниры и мероприятия клуба',
    'Ближайшие события Indoor Golf Moscow: Pro-Am турнир ID Golf Invitational 4 сентября 2026 в Нахабино и другие мероприятия клуба.'
  );

  return (
    <div className="page-content">
      <Section
        first
        eyebrow="Календарь"
        title="События "
        titleHighlight="клуба"
      >
        <p className="max-w-2xl text-base md:text-lg text-[var(--text-muted)] -mt-4 mb-10 md:mb-14">
          Турниры, клубные вечера и открытые мероприятия Indoor Golf. Нажмите на событие,
          чтобы посмотреть программу и оставить заявку.
        </p>

        <div className="flex flex-col gap-6">
          {EVENTS.map((ev, i) => (
            <motion.a
              key={ev.slug}
              href={ev.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-[minmax(0,42%)_1fr] overflow-hidden border border-line bg-bg-card transition-colors duration-300 hover:border-brand-orange"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px] overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-brand-orange px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  {ev.badge}
                </span>
              </div>

              <div className="flex flex-col justify-between gap-6 p-6 md:p-9">
                <div>
                  <div className="eyebrow mb-3 text-brand-orange">{ev.subtitle}</div>
                  <h3 className="font-display text-3xl md:text-4xl uppercase leading-none tracking-wide text-[var(--text-primary)]">
                    {ev.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base text-[var(--text-muted)] max-w-xl">
                    {ev.description}
                  </p>
                </div>

                <div>
                  <dl className="grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
                    <div className="flex items-start gap-2.5">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <dd className="text-xs md:text-sm text-[var(--text-muted)]">{ev.date}</dd>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <dd className="text-xs md:text-sm text-[var(--text-muted)]">{ev.place}</dd>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <dd className="text-xs md:text-sm text-[var(--text-muted)]">{ev.people}</dd>
                    </div>
                  </dl>

                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                    Подробнее о турнире
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--text-subtle)]">
          Хотите провести своё мероприятие на нашей площадке — корпоратив, день рождения или
          турнир? Напишите нам, соберём программу под задачу.
        </p>
      </Section>
    </div>
  );
}
