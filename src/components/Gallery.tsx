import { motion } from 'framer-motion';
import { Section } from './Section';

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80',
    alt: 'Indoor golf simulator',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1535132011086-b8818f016104?w=900&q=80',
    alt: 'Golf ball close-up',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=900&q=80',
    alt: 'Premium golf club interior',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1591491653056-4e680c820d3f?w=900&q=80',
    alt: 'Golf swing',
    span: 'md:col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=900&q=80',
    alt: 'Golf driver',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=900&q=80',
    alt: 'Green fairway',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80',
    alt: 'Indoor club lounge',
    span: 'md:col-span-2',
  },
];

export function Gallery() {
  return (
    <Section id="gallery" eyebrow="Атмосфера" title="Галерея">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.src + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
            className={`group relative overflow-hidden bg-bg-card border border-transparent hover:border-brand-orange transition-all duration-300 ${img.span}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
