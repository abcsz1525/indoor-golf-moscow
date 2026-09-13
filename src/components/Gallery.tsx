import { useState } from 'react';
import { Section } from './Section';
import { Lightbox } from './Lightbox';

import img1 from '../assets/gallery/1.webp';
import img6 from '../assets/gallery/6.webp';
import club6335 from '../assets/gallery/club-6335.webp';
import club6338 from '../assets/gallery/club-6338-retouched.webp';
import club6340 from '../assets/gallery/club-6340.webp';
import club6341 from '../assets/gallery/club-6341.webp';
import club6342 from '../assets/gallery/club-6342.webp';
import club6343 from '../assets/gallery/club-6343.webp';
import club6344 from '../assets/gallery/club-6344.webp';
import club6345 from '../assets/gallery/club-6345.webp';
import clubWide from '../assets/hero-club-wide.webp';

const IMAGES = [
  { src: clubWide, alt: 'Пространство Indoor Golf Moscow в Лужниках', width: 1672, height: 941 },
  { src: img1, alt: 'Мячи и ти в Indoor Golf Moscow', width: 1279, height: 1920 },
  { src: club6335, alt: 'Игровые боксы и зона отдыха Indoor Golf Moscow', width: 1400, height: 1867 },
  { src: club6338, alt: 'Игровой бокс Trackman Performance Studio', width: 1086, height: 1448 },
  { src: club6340, alt: 'Потолочная система Trackman iO в игровом боксе', width: 1400, height: 1867 },
  { src: club6341, alt: 'Режим практики Trackman', width: 1400, height: 1867 },
  { src: img6, alt: 'Фирменный знак Indoor Golf Moscow', width: 999, height: 1400 },
  { src: club6342, alt: 'Виртуальные поля Trackman', width: 1400, height: 1867 },
  { src: club6343, alt: 'Соревновательный режим Trackman', width: 1400, height: 1867 },
  { src: club6344, alt: 'Игровые режимы Trackman', width: 1400, height: 1867 },
  { src: club6345, alt: 'Радар Trackman в Indoor Golf Moscow', width: 1400, height: 1867 },
];

export function Gallery({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <Section id="gallery" eyebrow="Галерея" title="Пространство и люди" headingLevel={headingLevel}>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] md:mb-14">
        Indoor Golf Moscow изнутри: игровые боксы, тренировки и детали пространства в Лужниках.
      </p>

      <button
        type="button"
        onClick={() => setCurrent(0)}
        className="group block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        aria-label="Открыть фото пространства Indoor Golf Moscow"
        aria-haspopup="dialog"
      >
        <img
          src={IMAGES[0].src}
          alt={IMAGES[0].alt}
          width={IMAGES[0].width}
          height={IMAGES[0].height}
          decoding="async"
          className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
        />
      </button>

      <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:mt-6 lg:columns-3 lg:gap-6">
        {IMAGES.slice(1).map((img, index) => {
          const imageIndex = index + 1;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => setCurrent(imageIndex)}
              className="group mb-4 block w-full break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange lg:mb-6"
              aria-label={`Открыть фото ${imageIndex + 1}: ${img.alt}`}
              aria-haspopup="dialog"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading={imageIndex < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
              />
            </button>
          );
        })}
      </div>

      {current !== null && (
        <Lightbox images={IMAGES} current={current} onChange={setCurrent} onClose={() => setCurrent(null)} />
      )}
    </Section>
  );
}
