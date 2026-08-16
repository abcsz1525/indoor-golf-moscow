import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

import detailPhoto from '../assets/gallery/1.webp';
import clubPhoto from '../assets/gallery/club-6335.webp';
import simulatorPhoto from '../assets/gallery/club-6338-retouched.webp';
import trackmanPhoto from '../assets/gallery/club-6345.webp';

export function PhotoStrip() {
  return (
    <Section eyebrow="Пространство" title="До первого удара">
      <div className="grid gap-3 md:grid-cols-12 md:grid-rows-[300px_300px]">
        <figure className="min-h-[440px] overflow-hidden md:col-span-6 md:row-span-2 md:min-h-0">
          <img
            src={clubPhoto}
            alt="Пространство Indoor Golf Moscow в Лужниках"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="min-h-[320px] overflow-hidden md:col-span-6 md:min-h-0">
          <img
            src={simulatorPhoto}
            alt="Игровой бокс Trackman в Indoor Golf Moscow"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="min-h-[320px] overflow-hidden md:col-span-3 md:min-h-0">
          <img
            src={detailPhoto}
            alt="Гольф-мячи и ти в Indoor Golf Moscow"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="min-h-[320px] overflow-hidden md:col-span-3 md:min-h-0">
          <img
            src={trackmanPhoto}
            alt="Радар Trackman 4 в Indoor Golf Moscow"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
      <div className="mt-8 flex items-center justify-between gap-6">
        <p className="max-w-lg text-sm leading-relaxed text-[var(--text-muted)]">
          Игровые боксы, зона отдыха и оборудование клуба — без постановочных рендеров.
        </p>
        <Link to="/gallery" className="text-link shrink-0">
          Смотреть галерею
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
