import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

import img1 from '../assets/gallery/1.webp';
import club6335 from '../assets/gallery/club-6335.webp';
import club6338 from '../assets/gallery/club-6338-retouched.webp';
import club6345 from '../assets/gallery/club-6345.webp';

const PHOTOS = [
  { src: club6335, alt: 'Пространство и зона отдыха Indoor Golf Moscow' },
  { src: club6338, alt: 'Игровая зона TrackMan Performance Studio' },
  { src: club6345, alt: 'Радар TrackMan в Indoor Golf Moscow' },
  { src: img1, alt: 'Гольф-мячи и ти в Indoor Golf Moscow' },
];

export function PhotoStrip() {
  return (
    <Section eyebrow="Атмосфера" title="Как это выглядит">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {PHOTOS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative aspect-[3/4] overflow-hidden border border-line group"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand-orange hover:gap-3 transition-all"
        >
          Смотреть галерею
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
