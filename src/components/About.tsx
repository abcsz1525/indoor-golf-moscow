import { Section } from './Section';

export function About({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  return (
    <Section
      id="about"
      eyebrow="О нас"
      title="Мы — ID Golf"
      headingLevel={headingLevel}
    >
      <div className="grid grid-cols-1 gap-8 border-t border-line pt-8 md:pt-10 lg:grid-cols-12 lg:gap-10">
        <p className="max-w-3xl text-2xl font-normal leading-[1.35] tracking-[-0.02em] text-[var(--text-primary)] md:text-3xl lg:col-span-7">
          ID Golf создали гольфисты, которым важно не только играть самим, но и развивать
          современную культуру гольфа в России.
        </p>
        <p className="max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg lg:col-span-4 lg:col-start-9 lg:pt-1">
          Мы соединяем игру круглый год, работу с тренерами, технологии Trackman, клубные
          встречи и турниры — от первого удара до собственного пути в гольфе.
        </p>
      </div>
    </Section>
  );
}
