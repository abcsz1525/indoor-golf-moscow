import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from './Section';

import img1 from '../assets/gallery/1.webp';
import img6 from '../assets/gallery/6.webp';
import club6335 from '../assets/gallery/club-6335.webp';
import club6337 from '../assets/gallery/club-6337.webp';
import club6340 from '../assets/gallery/club-6340.webp';
import club6341 from '../assets/gallery/club-6341.webp';
import club6342 from '../assets/gallery/club-6342.webp';
import club6343 from '../assets/gallery/club-6343.webp';
import club6344 from '../assets/gallery/club-6344.webp';
import club6345 from '../assets/gallery/club-6345.webp';

const IMAGES = [
  { src: club6335, alt: 'Indoor Golf Moscow — пространство клуба и зона отдыха' },
  { src: club6345, alt: 'Indoor Golf Moscow — радар TrackMan' },
  { src: club6337, alt: 'Indoor Golf Moscow — экран запуска TrackMan' },
  { src: club6340, alt: 'Indoor Golf Moscow — игровые возможности TrackMan' },
  { src: club6341, alt: 'Indoor Golf Moscow — режимы тренировки TrackMan' },
  { src: club6342, alt: 'Indoor Golf Moscow — виртуальные поля TrackMan' },
  { src: club6343, alt: 'Indoor Golf Moscow — соревнования TrackMan' },
  { src: club6344, alt: 'Indoor Golf Moscow — игры на симуляторе TrackMan' },
  { src: img6, alt: 'Indoor Golf — брендинг клуба' },
  { src: img1, alt: 'Indoor Golf — мячи и ти' },
];

export function Gallery({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => setCurrent((i) => (i + 1) % IMAGES.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + IMAGES.length) % IMAGES.length), []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, reduceMotion]);

  return (
    <Section id="gallery" eyebrow="Атмосфера" title="Галерея" headingLevel={headingLevel}>
      <div className="relative overflow-hidden border border-line" data-cursor="grow">
        <div className="relative aspect-[4/3] bg-neutral-950 md:aspect-[16/9]">
          {IMAGES.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              initial={false}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-white/70 border border-line hover:border-brand-orange text-neutral-900 hover:text-brand-orange transition-colors"
            aria-label="Назад"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-white/70 border border-line hover:border-brand-orange text-neutral-900 hover:text-brand-orange transition-colors"
            aria-label="Вперёд"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 transition-all duration-300 ${
                  i === current ? 'w-8 bg-brand-orange' : 'w-4 bg-neutral-400 hover:bg-neutral-500'
                }`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>

          <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
          <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
          <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
          <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-3">
        {IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <button
              onClick={() => setCurrent(i)}
              className={`relative aspect-[4/3] w-full overflow-hidden border bg-neutral-950 transition-all duration-300 ${
                i === current ? 'border-brand-orange' : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
