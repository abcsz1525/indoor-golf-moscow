import { Section } from './Section';
import andreyPhoto from '../assets/founders/andrey.webp';
import nataliaPhoto from '../assets/founders/natalia.webp';

const FOUNDERS = [
  {
    name: 'Андрей Золотарев',
    role: 'Сооснователь ID Golf',
    photo: andreyPhoto,
    alt: 'Андрей Золотарев, сооснователь ID Golf, на гольф-поле',
    width: 1200,
    height: 1800,
  },
  {
    name: 'Наталья Колыхалова',
    role: 'Сооснователь ID Golf',
    photo: nataliaPhoto,
    alt: 'Наталья Колыхалова, сооснователь ID Golf, на гольф-поле',
    width: 960,
    height: 1280,
  },
];

export function Founders() {
  return (
    <Section id="founders" eyebrow="Основатели" title="Андрей и Наталья">
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] md:mb-16 md:text-xl lg:ml-auto lg:mr-[8.333%]">
        Андрей Золотарев и Наталья Колыхалова сами играют, тренируются и выходят на поле. ID Golf
        вырос из их желания сделать вход в игру понятнее, а путь в ней — интереснее.
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6 lg:gap-10">
          {FOUNDERS.map((founder, index) => (
            <article
              key={founder.name}
              className={index === 0 ? 'md:col-span-5' : 'md:col-span-5 md:col-start-7 md:mt-20'}
            >
              <img
                src={founder.photo}
                alt={founder.alt}
                width={founder.width}
                height={founder.height}
                loading="eager"
                decoding="async"
                className="block h-auto w-full"
              />
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.02em] text-[var(--text-primary)] md:text-3xl">
                {founder.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{founder.role}</p>
            </article>
          ))}
      </div>
    </Section>
  );
}
