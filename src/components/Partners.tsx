import { ArrowUpRight } from 'lucide-react';
import { Section } from './Section';

const PARTNERS = [
  {
    name: 'RNGC',
    meta: 'Russian National Golf Center',
    text: 'Стратегический партнёр клуба: совместные турниры, обмен опытом и развитие гольф-сообщества.',
    href: 'https://rngc.golf/',
  },
];

export function Partners() {
  return (
    <Section id="partners" eyebrow="Партнёрская сеть" title="Вместе развиваем гольф" className="bg-bg-secondary">
      <div className="border-t border-line">
        {PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={partner.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-6 border-b border-line py-8 transition-colors hover:text-brand-orange md:grid-cols-12 md:items-center md:py-10"
          >
            <div className="md:col-span-3">
              <span className="display text-5xl leading-none text-brand-orange">{partner.name}</span>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{partner.name}</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{partner.meta}</p>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:col-span-5">{partner.text}</p>
            <ArrowUpRight className="text-brand-orange md:col-span-1 md:justify-self-end" size={20} />
          </a>
        ))}
      </div>
    </Section>
  );
}
