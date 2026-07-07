import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';

import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import img4 from '../assets/gallery/4.jpeg';
import img5 from '../assets/gallery/5.jpg';

const PHOTOS = [
  { src: img4, alt: 'Тренировка с PRO на симуляторе Trackman' },
  { src: img3, alt: 'Клюшки и симулятор Indoor Golf Moscow' },
  { src: img2, alt: 'Отработка паттинга' },
  { src: img5, alt: 'Экран симулятора Trackman' },
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
