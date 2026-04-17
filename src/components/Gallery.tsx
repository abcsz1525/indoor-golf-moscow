import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from './Section';

import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import img4 from '../assets/gallery/4.jpeg';
import img5 from '../assets/gallery/5.jpg';
import img6 from '../assets/gallery/6.jpg';

const IMAGES = [
  { src: img1, alt: 'Indoor Golf — мячи и ти' },
  { src: img2, alt: 'Indoor Golf — пространство' },
  { src: img3, alt: 'Indoor Golf — интерьер' },
  { src: img4, alt: 'Indoor Golf — симулятор' },
  { src: img5, alt: 'Indoor Golf — зона отдыха' },
  { src: img6, alt: 'Indoor Golf — клуб' },
];

export function Gallery() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % IMAGES.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + IMAGES.length) % IMAGES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <Section id="gallery" eyebrow="Атмосфера" title="Галерея">
      <div className="relative overflow-hidden border border-line">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-bg-card">
          {IMAGES.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt={img.alt}
              initial={false}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-black/50 border border-line hover:border-brand-orange text-white hover:text-brand-orange transition-colors"
            aria-label="Назад"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-black/50 border border-line hover:border-brand-orange text-white hover:text-brand-orange transition-colors"
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
                  i === current ? 'w-8 bg-brand-orange' : 'w-4 bg-white/40 hover:bg-white/60'
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

      <div className="grid grid-cols-6 gap-2 mt-3">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
              i === current ? 'border-brand-orange' : 'border-line opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </Section>
  );
}
