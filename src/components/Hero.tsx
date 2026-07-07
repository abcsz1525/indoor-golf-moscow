import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import heroPhoto from '../assets/gallery/4.jpeg';

export function Hero({ onBooking }: { onBooking: (interest?: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-start md:justify-center overflow-hidden"
    >
      {/* Photo background with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={heroPhoto}
          alt="Тренировка на симуляторе Trackman в Indoor Golf Moscow"
          className="h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="container-x relative z-10 pt-32 md:pt-32 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6 flex items-center gap-3 !text-white/70"
        >
          <span className="h-px w-10 bg-brand-orange" />
          Trackman · Лужники · Pro Level
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="display text-white font-normal"
          style={{
            fontSize: 'clamp(56px, 10vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '0.01em',
          }}
        >
          Гольф <br />
          <span className="text-brand-orange">круглый</span> год
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-white/80 font-light leading-relaxed"
        >
          Симуляторы Trackman в Лужниках. От 6 000 ₽/час на компанию
          до 6 человек — новичкам поможем с клюшками и первым ударом.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <button onClick={() => onBooking()} className="btn-primary group" data-cursor="grow">
            Записаться
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center gap-2 uppercase tracking-widest px-7 py-4 border border-white/70 text-white transition-all duration-200 hover:border-brand-orange hover:text-brand-orange"
            data-cursor="grow"
          >
            Смотреть цены
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-brand-orange bg-black/40 backdrop-blur-sm">
        <div className="container-x py-5 flex flex-wrap items-center justify-between gap-x-10 gap-y-2 text-[11px] md:text-xs uppercase tracking-brand text-white/70">
          <span>Trackman</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Лужники · бесплатная парковка</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Без выходных 7:00–23:00</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Pro Level</span>
        </div>
      </div>
    </section>
  );
}
