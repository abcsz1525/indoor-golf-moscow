import { ArrowDown, ArrowRight, ExternalLink } from 'lucide-react';
import trackmanDevice from '../assets/gallery/club-6345.webp';
import trackmanPractice from '../assets/gallery/club-6341.webp';
import trackmanCourses from '../assets/gallery/club-6342.webp';
import trackmanGames from '../assets/gallery/club-6344.webp';
import trackmanIO from '../assets/tech/trackman-io.webp';
import trackmanIOInside from '../assets/tech/trackman-io-inside.webp';
import { Advantages } from './Advantages';

const OFFICIAL_LINKS = {
  trackman4: 'https://www.trackman.com/golf/launch-monitors/trackman-4',
  trackmanIO: 'https://www.trackman.com/golf/launch-monitors/trackman-io',
  techSpecs: 'https://www.trackman.com/golf/launch-monitors/tech-specs',
  courses: 'https://www.trackman.com/golf/simulator/courses',
  tourPlayers: 'https://www.trackman.com/golf/solutions/home-golf-simulator',
  pgaTour:
    'https://www.pgatour.com/article/news/latest/2025/08/25/pga-tour-trackman-continue-two-decade-relationship-with-renewed-agreement',
};

const HERO_FACTS = [
  { value: '40+', label: 'параметров Trackman 4' },
  { value: '2', label: 'системы в одном клубе' },
  {
    value: '90 / 100',
    label: 'ведущих игроков PGA Tour используют Trackman — по данным производителя',
    href: OFFICIAL_LINKS.tourPlayers,
  },
];

const COURSE_LIBRARY_FACT = 'Глобальная библиотека Trackman — более 550 детально воссозданных полей';
const COURSE_LIBRARY_NOTE = 'Глобальная библиотека Trackman включает более 550 виртуальных полей';

const PLAYER_OUTCOMES = [
  {
    number: '01',
    title: 'Понять причину',
    text: 'Увидеть, почему мяч потерял дистанцию или ушёл с линии, а не строить догадки по одному ощущению.',
  },
  {
    number: '02',
    title: 'Знать свои дистанции',
    text: 'Собрать реальную карту клюшек, оценить разброс и увереннее выбирать удар на поле.',
  },
  {
    number: '03',
    title: 'Проверять изменения',
    text: 'Сравнивать серии ударов и понимать, делает ли корректировка движение стабильнее.',
  },
  {
    number: '04',
    title: 'Видеть прогресс',
    text: 'Сохранять результаты в профиле Trackman и возвращаться к объективной динамике тренировок.',
  },
];

const DATA_EXAMPLES = [
  {
    value: '17',
    title: 'Клюшка',
    items: ['скорость', 'траектория', 'угол атаки', 'положение лица'],
  },
  {
    value: '13',
    title: 'Мяч',
    items: ['скорость', 'угол вылета', 'вращение', 'carry'],
  },
  {
    value: '25',
    title: 'Паттинг',
    items: ['темп', 'скольжение', 'скорость качения', 'линия'],
  },
];

const MODES = [
  {
    image: trackmanPractice,
    label: 'Практика',
    title: 'Тренировка с задачей',
    text: 'Shot Analysis, Performance Center, Map My Bag и тесты помогают построить сессию вокруг конкретного навыка.',
    alt: 'Режимы тренировки Trackman на экране симулятора ID Golf',
  },
  {
    image: trackmanCourses,
    label: 'Virtual Golf',
    title: 'Полноценные раунды',
    text: 'Детально воссозданные поля позволяют работать с выбором клюшки, риском и тактикой, а не только с механикой свинга.',
    alt: 'Каталог виртуальных полей Trackman на экране симулятора ID Golf',
  },
  {
    image: trackmanGames,
    label: 'Games',
    title: 'Игра и соревнование',
    text: 'Closest to the Pin, Bullseye и другие форматы подходят для дружеской встречи, события или первой игры.',
    alt: 'Игровые режимы Trackman на экране симулятора ID Golf',
  },
];

const FAQ = [
  {
    question: 'Подойдёт ли Trackman новичку?',
    answer:
      'Да. Не нужно разбираться во всех показателях сразу: система наглядно показывает полёт мяча, а тренер выделяет несколько параметров, важных на текущем этапе.',
  },
  {
    question: 'Можно ли просто играть, не изучая цифры?',
    answer:
      'Да. Можно сыграть виртуальный раунд или выбрать игровой режим. Аналитика остаётся доступной, но не мешает самой игре.',
  },
  {
    question: 'Чем Trackman отличается от обычного симулятора?',
    answer:
      'Он не только показывает виртуальное поле, но и измеряет движение клюшки и параметры мяча. Поэтому результат удара можно объяснить и использовать в тренировке.',
  },
  {
    question: 'Можно ли заниматься с тренером?',
    answer:
      'Да. PRO соединяет данные Trackman с техникой игрока и переводит показатели в понятные изменения движения.',
  },
];

function BookingButton({
  className =
    'inline-flex min-h-12 items-center justify-center gap-2 bg-brand-orange px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-white',
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => document.querySelector<HTMLButtonElement>('[data-booking-trigger]')?.click()}
      className={`${className} group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
    >
      Выбрать время
      <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-orange underline decoration-brand-orange/35 underline-offset-4 transition-colors hover:text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
    >
      {children}
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  );
}

export function TrackmanTechnology() {
  return (
    <>
      {/* 01 — Hero */}
      <section id="trackman" className="relative isolate overflow-hidden bg-[#0d0d0d] text-white">
        <div className="container-x grid min-h-[760px] gap-12 pb-16 pt-28 md:pt-36 lg:grid-cols-12 lg:items-center lg:pb-24">
          <div className="relative z-10 lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-brand text-brand-orange">Trackman в ID Golf</p>
            <h1 className="mt-7 display text-[clamp(5.5rem,12vw,11rem)] uppercase leading-[0.78] tracking-[-0.02em]">
              Trackman
            </h1>
            <p className="mt-8 max-w-xl display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92]">
              Два поколения точности
            </p>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              В ID Golf работают Trackman 4 и потолочный Trackman iO. Данные помогают разобрать удар,
              построить тренировку или сыграть полноценный виртуальный раунд.
            </p>
            <p className="mt-7 max-w-lg border-l-2 border-brand-orange pl-5 leading-relaxed text-white/85">
              ID Golf первым привёз потолочную систему Trackman iO в Россию.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookingButton />
              <a
                href="#trackman-systems"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/30 px-7 py-4 text-sm text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Сравнить системы
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[470px] lg:col-span-7 lg:min-h-[630px]">
            <figure className="absolute inset-x-0 top-0 h-[74%] overflow-hidden border border-white/10 bg-black">
              <img
                src={trackmanIO}
                alt="Потолочная система Trackman iO"
                width={3840}
                height={2160}
                className="h-full w-full object-cover object-[68%_center]"
                fetchPriority="high"
              />
              <figcaption className="absolute bottom-5 right-5 border-l border-brand-orange pl-4 text-sm text-white/70">
                Trackman iO · потолочная система
              </figcaption>
            </figure>
            <figure className="absolute bottom-0 left-0 h-[42%] w-[42%] min-w-40 overflow-hidden border-4 border-[#0d0d0d] bg-black sm:w-[35%]">
              <img
                src={trackmanDevice}
                alt="Trackman 4 в пространстве ID Golf"
                width={1400}
                height={1867}
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/80 px-4 py-3 text-sm text-white/75">
                Trackman 4
              </figcaption>
            </figure>
            <div className="absolute bottom-4 right-0 w-[54%] border-t border-white/20 pt-5 sm:w-[58%]">
              <p className="text-sm leading-relaxed text-white/55">
                Одна экосистема — для анализа свинга, самостоятельной игры и работы с PRO.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="container-x grid sm:grid-cols-3">
            {HERO_FACTS.map((fact, index) => (
              <div
                key={fact.value}
                className={`py-7 ${index > 0 ? 'border-t border-white/15 sm:border-l sm:border-t-0 sm:pl-8' : 'sm:pr-8'}`}
              >
                <strong className="display text-5xl font-normal leading-none text-brand-orange">{fact.value}</strong>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{fact.label}</p>
                {'href' in fact && fact.href ? (
                  <SourceLink href={fact.href}>Источник Trackman</SourceLink>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Two systems */}
      <section id="trackman-systems" className="bg-bg-primary py-20 md:py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">Две системы</p>
              <h2 className="mt-5 max-w-4xl display text-[clamp(3.4rem,7vw,7.4rem)] leading-[0.9] text-[var(--text-primary)]">
                Разная архитектура. Единая логика данных.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-[var(--text-muted)] lg:col-span-4">
              Обе системы измеряют удар, но делают это по-разному. Выбор зависит от формата сессии,
              а не от уровня игрока.
            </p>
          </div>

          <article className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:items-center lg:py-20">
            <div className="lg:col-span-5">
              <p className="text-sm text-brand-orange">01 / проверенная мобильная система</p>
              <h3 className="mt-4 display text-6xl leading-none text-[var(--text-primary)] md:text-8xl">Trackman 4</h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
                Два радара и синхронизированная камера фиксируют движение клюшки, старт и полёт мяча.
                Система выдаёт более 40 параметров, включая данные паттинга.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-[var(--text-subtle)]">Считывание</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">два радара + камера</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-subtle)]">Формат</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">мобильный модуль</dd>
                </div>
              </dl>
              <div className="mt-6">
                <SourceLink href={OFFICIAL_LINKS.trackman4}>О Trackman 4</SourceLink>
              </div>
            </div>
            <figure className="relative min-h-[420px] overflow-hidden bg-black lg:col-span-7 lg:min-h-[560px]">
              <img
                src={trackmanDevice}
                alt="Оранжевый модуль Trackman 4 в ID Golf"
                width={1400}
                height={1867}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </figure>
          </article>

          <article id="trackman-io" className="grid gap-8 pt-14 lg:grid-cols-12 lg:items-center lg:pt-20">
            <figure className="relative min-h-[400px] overflow-hidden bg-black lg:order-1 lg:col-span-7 lg:min-h-[540px]">
              <img
                src={trackmanIOInside}
                alt="Радар и высокоскоростная оптика внутри Trackman iO"
                width={1920}
                height={1080}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[38%_center]"
              />
            </figure>
            <div className="lg:order-2 lg:col-span-5 lg:pl-8">
              <p className="text-sm text-brand-orange">02 / потолочная система</p>
              <h3 className="mt-4 display text-6xl leading-none text-[var(--text-primary)] md:text-8xl">Trackman iO</h3>
              <h4 className="mt-3 text-lg font-medium text-[var(--text-primary)]">
                Первая система Trackman iO в России
              </h4>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
                Модуль закреплён над зоной удара. Радар, две высокоскоростные камеры и встроенный
                инфракрасный свет работают вместе, а результат появляется сразу после контакта.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-[var(--text-subtle)]">Считывание</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">радар + две камеры</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-subtle)]">Установка</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">потолочный модуль</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-subtle)]">Камеры</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">до 4600 fps</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-subtle)]">Ответ системы</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">Мгновенный результат</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-x-6">
                <SourceLink href={OFFICIAL_LINKS.trackmanIO}>О Trackman iO</SourceLink>
                <SourceLink href={OFFICIAL_LINKS.techSpecs}>Характеристики</SourceLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 03 — Measurement */}
      <section id="trackman-how" className="bg-[#101010] py-20 text-white md:py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-brand text-brand-orange">Как считывается удар</p>
              <h2 className="mt-6 max-w-4xl display text-[clamp(3.5rem,7vw,7.3rem)] leading-[0.88]">
                От контакта до полёта — без догадок
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-12">
              <p className="text-lg leading-relaxed text-white/65">
                <span className="font-medium text-white">Два радара. Одна камера. Полная картина удара.</span>{' '}
                Trackman синхронизирует радарные и оптические измерения. Система показывает не только,
                куда полетел мяч, но и какое движение клюшки привело к этому результату.
              </p>
            </div>
          </div>

          <div className="mt-14 grid border-y border-white/15 md:grid-cols-3">
            <div className="py-9 md:pr-8">
              <span className="display text-5xl text-brand-orange">01</span>
              <h3 className="mt-8 text-2xl font-medium">Контакт</h3>
              <p className="mt-4 leading-relaxed text-white/60">
                Система фиксирует положение клюшки, старт мяча и первые мгновения после удара.
              </p>
            </div>
            <div className="border-t border-white/15 py-9 md:border-l md:border-t-0 md:px-8">
              <span className="display text-5xl text-brand-orange">02</span>
              <h3 className="mt-8 text-2xl font-medium">Измерение</h3>
              <p className="mt-4 leading-relaxed text-white/60">
                Радары и камеры объединяют данные о скорости, направлении, вращении и траектории.
              </p>
            </div>
            <div className="border-t border-white/15 py-9 md:border-l md:border-t-0 md:pl-8">
              <span className="display text-5xl text-brand-orange">03</span>
              <h3 className="mt-8 text-2xl font-medium">Результат</h3>
              <p className="mt-4 leading-relaxed text-white/60">
                На экране появляются параметры удара и реалистичный виртуальный полёт мяча.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <div className="border-l border-brand-orange pl-6 lg:col-span-5">
              <p className="text-sm text-white/45">Trackman 4</p>
              <p className="mt-3 text-xl leading-relaxed text-white/85">
                Два доплеровских радара и камера работают по технологии OERT — Optically Enhanced Radar Tracking.
              </p>
            </div>
            <div className="border-l border-brand-orange pl-6 lg:col-span-5">
              <p className="text-sm text-white/45">Trackman iO</p>
              <p className="mt-3 text-xl leading-relaxed text-white/85">
                Радар 24 GHz, две камеры до 4600 fps и собственная инфракрасная подсветка считывают удар сверху.
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <SourceLink href={OFFICIAL_LINKS.techSpecs}>Официальные данные</SourceLink>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Player value */}
      <section className="bg-bg-primary py-20 md:py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Что получает игрок</p>
              <h2 className="mt-5 display text-[clamp(3.4rem,6vw,6.6rem)] leading-[0.9] text-[var(--text-primary)]">
                Данные нужны для следующего решения
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--text-muted)]">
                Ценность не в количестве цифр, а в ясном выводе: что получилось, над чем работать
                и как перенести это на поле.
              </p>
            </div>
            <div className="border-t border-line lg:col-span-7">
              {PLAYER_OUTCOMES.map((outcome) => (
                <article key={outcome.title} className="grid gap-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr] md:py-9">
                  <span className="font-mono text-sm text-brand-orange">{outcome.number}</span>
                  <div className="grid gap-3 md:grid-cols-2 md:gap-8">
                    <h3 className="text-2xl font-medium text-[var(--text-primary)]">{outcome.title}</h3>
                    <p className="leading-relaxed text-[var(--text-muted)]">{outcome.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-line pt-10 md:mt-28">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <p className="max-w-sm text-sm leading-relaxed text-[var(--text-muted)] lg:col-span-3">
                Среди доступных показателей — данные клюшки, мяча и паттинга. В конкретной сессии
                выбирают только те, которые помогают решить текущую задачу.
              </p>
              <div className="grid gap-px bg-line sm:grid-cols-3 lg:col-span-9">
                {DATA_EXAMPLES.map((group) => (
                  <div key={group.title} className="bg-bg-primary px-0 py-6 sm:px-7">
                    <p className="display text-4xl leading-none text-brand-orange">{group.value}</p>
                    <h3 className="mt-3 text-lg font-medium text-[var(--text-primary)]">{group.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{group.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Practice, courses and games */}
      <section className="border-y border-line bg-bg-secondary py-20 md:py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">Практика и игра</p>
              <h2 className="mt-5 max-w-5xl display text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.9] text-[var(--text-primary)]">
                Одна система. Три разных вечера.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-[var(--text-muted)] lg:col-span-4">
              Можно работать над конкретным ударом, пройти виртуальное поле или выбрать лёгкий соревновательный формат.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            {MODES.map((mode, index) => (
              <article
                key={mode.title}
                className={index === 0 ? 'lg:col-span-6' : 'lg:col-span-3'}
              >
                <figure className="overflow-hidden bg-black">
                  <img
                    src={mode.image}
                    alt={mode.alt}
                    width={1400}
                    height={1867}
                    loading="lazy"
                    className={`h-auto w-full object-cover object-center ${index === 0 ? 'aspect-[4/5] lg:aspect-[5/6]' : 'aspect-[4/5] lg:aspect-[3/5]'}`}
                  />
                </figure>
                <p className="mt-6 text-sm text-brand-orange">{mode.label}</p>
                <h3 className="mt-2 text-2xl font-medium text-[var(--text-primary)]">{mode.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{mode.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-line pt-9 lg:grid-cols-12 lg:items-start">
            <p className="display text-6xl leading-none text-brand-orange lg:col-span-3 md:text-7xl">550+</p>
            <div className="lg:col-span-6">
              <h3 className="text-2xl font-medium text-[var(--text-primary)]">{COURSE_LIBRARY_FACT}</h3>
              <p
                title={COURSE_LIBRARY_NOTE}
                className="mt-4 max-w-2xl leading-relaxed text-[var(--text-muted)]"
              >
                В каталоге производителя — более 550 виртуальных полей. Набор, доступный в клубе,
                может меняться вместе с обновлениями и актуальной лицензией системы.
              </p>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <SourceLink href={OFFICIAL_LINKS.courses}>Каталог Trackman</SourceLink>
            </div>
          </div>
        </div>
      </section>

      <Advantages />

      {/* 06 — FAQ and CTA */}
      <section className="bg-[#101010] py-20 text-white md:py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-brand text-brand-orange">Коротко о главном</p>
              <h2 className="mt-6 display text-[clamp(3.3rem,6vw,6.4rem)] leading-[0.9]">
                Trackman без сложных терминов
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/60">
                Технология остаётся в фоне, пока вы играете, и становится инструментом, когда нужен точный ответ.
              </p>
              <div className="mt-6">
                <SourceLink href={OFFICIAL_LINKS.pgaTour}>Источник: PGA Tour</SourceLink>
              </div>
            </div>
            <div className="border-t border-white/15 lg:col-span-7">
              {FAQ.map((item) => (
                <details key={item.question} className="group border-b border-white/15">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">
                    <span className="text-xl font-medium md:text-2xl">{item.question}</span>
                    <span
                      className="text-3xl font-light text-brand-orange transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-10 leading-relaxed text-white/60">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-20 grid min-w-0 gap-8 border-t border-white/15 pt-12 lg:grid-cols-12 lg:items-end md:mt-28 md:pt-16">
            <div className="min-w-0 lg:col-span-8">
              <p className="text-sm text-brand-orange">Первый удар уже даст данные</p>
              <h2 className="mt-4 max-w-5xl break-words display text-[clamp(3.35rem,8vw,8.5rem)] leading-[0.86]">
                Посмотрите на свою игру в деталях
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                Технология помогает увидеть ваш ID
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="mb-7 max-w-md leading-relaxed text-white/60">
                Для самостоятельной практики, знакомства с гольфом или тренировки с PRO.
              </p>
              <BookingButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
