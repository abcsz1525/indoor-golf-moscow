import { motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Camera,
  Crosshair,
  ExternalLink,
  Gamepad2,
  Gauge,
  Radar,
  Target,
  Trophy,
  User,
  Users,
} from 'lucide-react';
import trackmanDevice from '../assets/gallery/club-6345.webp';
import trackmanPractice from '../assets/gallery/club-6341.webp';
import trackmanCourses from '../assets/gallery/club-6342.webp';
import trackmanGames from '../assets/gallery/club-6344.webp';
import { Advantages } from './Advantages';

const TRUST_FACTS = [
  { value: '40+', label: 'параметров удара' },
  { value: '2 + 1', label: 'два радара и камера' },
  {
    value: '90 / 100',
    label: 'ведущих игроков PGA Tour — по данным Trackman',
    href: 'https://www.trackman.com/golf/solutions/home-golf-simulator',
  },
];

const SENSORS = [
  {
    icon: Radar,
    number: '01',
    title: 'Радар клюшки',
    text: 'Считывает скорость, траекторию движения, угол атаки и положение лица клюшки в момент удара.',
  },
  {
    icon: Activity,
    number: '02',
    title: 'Радар мяча',
    text: 'Фиксирует скорость и старт мяча, вращение, высоту, направление, carry и итоговую дистанцию.',
  },
  {
    icon: Camera,
    number: '03',
    title: 'Камера и OERT',
    text: 'Оптически дополненное радарное отслеживание уточняет контакт и объединяет визуальные данные с измерениями.',
  },
];

const DATA_GROUPS = [
  {
    value: '17',
    title: 'Параметров клюшки',
    items: ['Club Speed · скорость', 'Face Angle · положение лица', 'Club Path · траектория', 'Attack Angle · угол атаки'],
  },
  {
    value: '13',
    title: 'Параметров мяча',
    items: ['Ball Speed · скорость', 'Launch Angle · угол вылета', 'Spin Rate · вращение', 'Carry · дистанция полёта'],
  },
  {
    value: '25',
    title: 'Параметров паттинга',
    items: ['Tempo · темп', 'Skid Distance · скольжение', 'Roll Speed · скорость качения', 'Break · линия отклонения'],
  },
];

const OUTCOMES = [
  {
    number: '01',
    title: 'Понять причину',
    text: 'Не угадывать, почему мяч ушёл вправо или потерял дистанцию, а увидеть конкретную причину в данных.',
  },
  {
    number: '02',
    title: 'Знать свои дистанции',
    text: 'Составить реальную карту клюшек, увидеть разброс и принимать на поле более уверенные решения.',
  },
  {
    number: '03',
    title: 'Проверять изменения',
    text: 'Сравнивать серии ударов и понимать, действительно ли корректировка делает движение стабильнее.',
  },
  {
    number: '04',
    title: 'Видеть прогресс',
    text: 'Сохранять результаты в профиле Trackman и возвращаться к объективной динамике тренировок.',
  },
];

const AUDIENCES = [
  {
    icon: User,
    title: 'Первое знакомство',
    text: 'Большой экран сразу показывает результат движения, а тренер объясняет главное без перегрузки терминами.',
  },
  {
    icon: Target,
    title: 'Регулярная игра',
    text: 'Тренируйте дистанции, направление, короткую игру и course management независимо от сезона и погоды.',
  },
  {
    icon: Gauge,
    title: 'Работа на результат',
    text: 'Анализируйте механику, dispersion и повторяемость, выстраивая каждую сессию вокруг измеримой задачи.',
  },
  {
    icon: Users,
    title: 'Игра компанией',
    text: 'Виртуальные раунды, командные форматы и челленджи вовлекают новичков и сохраняют спортивный интерес.',
  },
];

const MODES = [
  {
    image: trackmanPractice,
    icon: Crosshair,
    eyebrow: 'Practice',
    title: 'Тренировка с целью',
    text: 'Shot Analysis, Performance Center, Map My Bag и тесты превращают обычную серию ударов в понятный тренировочный план.',
    alt: 'Режимы тренировки Trackman в ID Golf',
  },
  {
    image: trackmanCourses,
    icon: Trophy,
    eyebrow: 'Virtual Golf',
    title: 'Поля мирового уровня',
    text: 'Играйте полноценные раунды на детально воссозданных полях и принимайте те же тактические решения, что и на поле.',
    alt: 'Каталог виртуальных полей Trackman в ID Golf',
  },
  {
    image: trackmanGames,
    icon: Gamepad2,
    eyebrow: 'Games & Competitions',
    title: 'Азарт для любого уровня',
    text: 'Closest to the Pin, Bullseye и другие игровые режимы подходят для дружеских встреч, турниров и мероприятий.',
    alt: 'Игровые режимы Trackman в ID Golf',
  },
];

const FAQ = [
  {
    question: 'Подойдёт ли Trackman новичку?',
    answer:
      'Да. Новичку не нужно самостоятельно разбираться в десятках параметров: система наглядно показывает полёт мяча, а тренер выделяет несколько показателей, важных именно сейчас.',
  },
  {
    question: 'Чем Trackman отличается от обычного симулятора?',
    answer:
      'Trackman — это не только изображение виртуального поля. Система измеряет движение клюшки и параметры мяча, помогает объяснить результат удара и использовать эти данные в тренировке.',
  },
  {
    question: 'Можно ли просто играть, не изучая цифры?',
    answer:
      'Конечно. Вы можете сыграть виртуальный раунд или выбрать развлекательный режим. Аналитика остаётся доступной, но не мешает самой игре.',
  },
  {
    question: 'Можно ли заниматься с тренером?',
    answer:
      'Да. PRO соединяет данные Trackman с техникой игрока и переводит показатели в конкретные, понятные изменения движения.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
};

function BookingButton({ className = 'btn-primary' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => document.querySelector<HTMLButtonElement>('[data-booking-trigger]')?.click()}
      className={`${className} group min-h-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
      data-cursor="grow"
    >
      Попробовать Trackman
      <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

export function TrackmanTechnology() {
  return (
    <>
      <section id="trackman" className="relative overflow-hidden bg-brand-orange text-black">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.13) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-white/20 blur-3xl" />

        <div className="container-x relative z-10 pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div {...reveal} transition={{ duration: 0.7 }} className="lg:col-span-7">
              <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-brand">
                <span className="h-px w-10 bg-black" />
                Trackman в ID Golf
              </div>
              <h1
                className="display uppercase"
                style={{ fontSize: 'clamp(70px, 12vw, 190px)', lineHeight: 0.82 }}
              >
                Trackman
              </h1>
              <p className="mt-8 max-w-3xl display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">
                Данные, которым доверяет мировой тур
              </p>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed md:text-xl">
                Радар и высокоскоростная оптика превращают каждый удар в понятную картину:
                как двигалась клюшка, как вылетел мяч и что изменить уже в следующей попытке.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookingButton className="inline-flex min-h-12 items-center justify-center gap-2 bg-black px-7 py-4 font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800" />
                <a
                  href="#trackman-how"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-black px-7 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  Как это работает
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md overflow-hidden border border-black/30 bg-black">
                <img
                  src={trackmanDevice}
                  alt="Устройство Trackman в пространстве ID Golf"
                  width={1365}
                  height={2048}
                  className="aspect-[2/3] h-auto w-full object-cover"
                  fetchPriority="high"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/85 px-5 py-4 text-[11px] uppercase tracking-brand text-white backdrop-blur-sm">
                  <span>Trackman</span>
                  <span className="text-white/60">Radar synchronized optics</span>
                </figcaption>
              </div>
              <div className="absolute -bottom-5 -left-3 border border-black bg-brand-orange px-4 py-3 text-[11px] uppercase tracking-brand sm:left-4">
                Tour-proven technology
              </div>
            </motion.figure>
          </div>

          <div className="mt-16 grid border-y border-black/30 sm:grid-cols-3">
            {TRUST_FACTS.map((fact, index) => (
              <div
                key={fact.value}
                className={`flex min-h-36 flex-col justify-between py-6 sm:px-6 ${index > 0 ? 'border-t border-black/30 sm:border-l sm:border-t-0' : ''}`}
              >
                <span className="display text-5xl leading-none md:text-6xl">{fact.value}</span>
                <span className="mt-5 max-w-[16rem] text-xs uppercase leading-relaxed tracking-brand">{fact.label}</span>
                {'href' in fact && fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-fit items-center gap-1 text-[10px] uppercase tracking-brand underline decoration-black/40 underline-offset-4 hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Официальный источник
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="container-x grid gap-10 py-12 md:grid-cols-12 md:items-center md:py-16">
          <div className="md:col-span-7">
            <p className="eyebrow !text-white/50">Проверено профессиональным гольфом</p>
            <h2 className="mt-4 display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">
              Одна технология — от первой тренировки до PGA Tour
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="leading-relaxed text-white/70">
              PGA Tour использует Trackman для измерения и визуализации ударов. В 2025 году
              сотрудничество было продлено до 2030 года — продолжение отношений, начавшихся ещё в 2006-м.
            </p>
            <a
              href="https://www.pgatour.com/article/news/latest/2025/08/25/pga-tour-trackman-continue-two-decade-relationship-with-renewed-agreement"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-brand text-brand-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              Источник: PGA Tour
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="trackman-how" className="bg-bg-primary py-16 md:py-24">
        <div className="container-x">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="eyebrow">Как это работает</p>
            <h2 className="section-title mt-4 uppercase text-[var(--text-primary)]">
              Два радара. Одна камера. Полная картина удара.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)] md:text-xl">
              Trackman 4 использует технологию OERT — Optically Enhanced Radar Tracking.
              Радарные и оптические данные синхронизируются, чтобы показать не только результат,
              но и механику, которая к нему привела.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-px bg-line lg:grid-cols-3">
            {SENSORS.map((sensor, index) => {
              const Icon = sensor.icon;
              return (
                <motion.article
                  key={sensor.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative min-h-72 bg-bg-card p-8 md:p-10"
                >
                  <span className="absolute right-7 top-6 font-mono text-xs text-[var(--text-subtle)]">{sensor.number}</span>
                  <Icon size={34} strokeWidth={1.4} aria-hidden="true" className="text-brand-orange" />
                  <h3 className="mt-10 display text-3xl uppercase text-[var(--text-primary)] md:text-4xl">{sensor.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{sensor.text}</p>
                </motion.article>
              );
            })}
          </div>
          <a
            href="https://www.trackman.com/golf/launch-monitors/trackman-4"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-brand text-[var(--text-muted)] hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
          >
            Технические данные Trackman 4
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#101010] py-16 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="container-x relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <motion.div {...reveal} transition={{ duration: 0.7 }} className="lg:col-span-7">
              <p className="eyebrow !text-white/50">Анатомия удара</p>
              <h2 className="section-title mt-4 uppercase text-white">Что Trackman видит за доли секунды</h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65">
                Система отвечает на три вопроса: что произошло, почему это произошло и что изменить
                в следующем ударе. Ниже — группы измерений, а не условный «идеальный» результат.
              </p>
            </motion.div>

            <div className="relative min-h-64 overflow-hidden border border-white/15 bg-white/[0.03] lg:col-span-5" role="img" aria-label="Схема траектории удара: старт, высота и точка приземления">
              <svg viewBox="0 0 520 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="flightGradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#e35b27" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <line x1="36" y1="238" x2="484" y2="238" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
                <motion.path
                  d="M42 232 C 154 44, 330 28, 474 226"
                  fill="none"
                  stroke="url(#flightGradient)"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                />
                <circle cx="42" cy="232" r="6" fill="#e35b27" />
                <circle cx="474" cy="226" r="6" fill="#ffffff" />
              </svg>
              <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-brand text-white/50">Impact / старт</span>
              <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-brand text-white/50">Flight / траектория</span>
              <span className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-brand text-white/50">Carry / приземление</span>
            </div>
          </div>

          <div className="mt-12 grid gap-px bg-white/15 lg:grid-cols-3">
            {DATA_GROUPS.map((group, index) => (
              <motion.article
                key={group.title}
                {...reveal}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="bg-[#101010] p-8 md:p-10"
              >
                <div className="display text-6xl leading-none text-brand-orange">{group.value}</div>
                <h3 className="mt-4 display text-3xl uppercase">{group.title}</h3>
                <ul className="mt-7 space-y-3 text-sm text-white/60">
                  {group.items.map((item) => (
                    <li key={item} className="border-t border-white/10 pt-3">{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <motion.div {...reveal} transition={{ duration: 0.7 }} className="lg:col-span-5">
              <p className="eyebrow">Практическая польза</p>
              <h2 className="section-title mt-4 uppercase text-[var(--text-primary)]">Данные нужны не ради цифр</h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--text-muted)]">
                Хорошая сессия заканчивается не таблицей параметров, а ясным выводом:
                что получилось, над чем работать и как перенести это на настоящее поле.
              </p>
            </motion.div>
            <div className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-7">
              {OUTCOMES.map((outcome, index) => (
                <motion.article
                  key={outcome.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="min-h-64 bg-bg-card p-7 md:p-9"
                >
                  <span className="font-mono text-xs text-brand-orange">{outcome.number}</span>
                  <h3 className="mt-9 display text-3xl uppercase text-[var(--text-primary)]">{outcome.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{outcome.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-secondary py-16 md:py-24">
        <div className="container-x">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="eyebrow">Для каждого уровня</p>
            <h2 className="section-title mt-4 uppercase text-[var(--text-primary)]">Один Trackman. Разные задачи.</h2>
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.article
                  key={audience.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="border border-line bg-bg-card p-7"
                >
                  <Icon size={30} strokeWidth={1.4} aria-hidden="true" className="text-brand-orange" />
                  <h3 className="mt-8 display text-3xl uppercase text-[var(--text-primary)]">{audience.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{audience.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.div {...reveal} transition={{ duration: 0.7 }} className="min-w-0 lg:col-span-8">
              <p className="eyebrow">Больше, чем тренировка</p>
              <h2 className="section-title mt-4 uppercase text-[var(--text-primary)]">
                Тренируйтесь. Играйте. Соревнуйтесь.
              </h2>
            </motion.div>
            <p className="min-w-0 text-lg leading-relaxed text-[var(--text-muted)] lg:col-span-4">
              В одной системе соединены серьёзная аналитика, полноценный виртуальный гольф и игровые форматы.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MODES.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.article
                  key={mode.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="overflow-hidden border border-line bg-bg-card"
                >
                  <div className="overflow-hidden bg-black">
                    <img
                      src={mode.image}
                      alt={mode.alt}
                      width={1365}
                      height={2048}
                      loading="lazy"
                      className="aspect-[3/4] h-auto w-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-brand text-brand-orange">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      {mode.eyebrow}
                    </div>
                    <h3 className="mt-5 display text-3xl uppercase text-[var(--text-primary)] md:text-4xl">{mode.title}</h3>
                    <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{mode.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col gap-4 border border-line bg-bg-secondary p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="max-w-3xl leading-relaxed text-[var(--text-muted)]">
              Глобальная библиотека Trackman включает более 500 виртуальных полей.
              Конкретный набор в клубе может меняться вместе с обновлениями и лицензией системы.
            </p>
            <a
              href="https://www.trackman.com/golf/simulator/courses"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs uppercase tracking-brand text-brand-orange hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              Каталог полей Trackman
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-brand-orange text-black">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="lg:col-span-7">
            <p className="text-xs uppercase tracking-brand">Trackman × философия ID Golf</p>
            <h2 className="mt-5 display text-5xl uppercase leading-[0.9] sm:text-6xl lg:text-8xl">
              Технология помогает увидеть ваш ID
            </h2>
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.08 }} className="space-y-5 text-lg leading-relaxed lg:col-span-5">
            <p>
              ID — это Identity, индивидуальность. У каждого игрока свой темп, физические возможности,
              задачи и путь развития. Поэтому в гольфе не существует одного одинакового свинга для всех.
            </p>
            <p>
              Trackman не заменяет ощущения и не превращает игру в таблицу. Он помогает отделить ощущения
              от фактов и найти решение, подходящее именно вам.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="container-x">
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="eyebrow">Вопросы о технологии</p>
            <h2 className="section-title mt-4 uppercase text-[var(--text-primary)]">Trackman без сложных терминов</h2>
          </motion.div>
          <div className="mt-10 border-t border-line">
            {FAQ.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">
                  <span className="display text-2xl uppercase text-[var(--text-primary)] md:text-3xl">{item.question}</span>
                  <span className="text-3xl font-light text-brand-orange transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-7 pr-10 leading-relaxed text-[var(--text-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Advantages />

      <section className="relative overflow-hidden bg-[#101010] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-x relative z-10 py-16 text-center md:py-24">
          <motion.div {...reveal} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-brand text-brand-orange">Первый удар расскажет больше, чем кажется</p>
            <h2 className="mx-auto mt-6 max-w-5xl display text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              Увидьте свою игру в деталях
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65">
              Для первого знакомства, самостоятельной практики или полноценной тренировки с PRO.
            </p>
            <div className="mt-9 flex justify-center">
              <BookingButton />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
