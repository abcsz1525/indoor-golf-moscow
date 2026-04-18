import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GridOverlay } from './GridOverlay';

export function Hero({ onBooking }: { onBooking: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-transparent to-transparent opacity-60" />
      </motion.div>

      <GridOverlay variant="orange" />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0A_90%)]" />

      <motion.div
        style={{ opacity: fade }}
        className="container-x relative z-10 pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6 flex items-center gap-3"
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
          className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed"
        >
          Тренируйся, играй и проводи время в комфортном пространстве в{' '}
          <span className="text-white">Лужниках</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <button onClick={onBooking} className="btn-primary group">
            Записаться
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <Link to="/about" className="btn-outline">
            Узнать подробнее
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-brand-orange">
        <div className="container-x py-5 flex flex-wrap items-center justify-between gap-x-10 gap-y-2 text-[11px] md:text-xs uppercase tracking-brand text-white/70">
          <span>Trackman</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Лужники</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Без выходных 7:00–23:00</span>
          <span className="hidden sm:inline text-brand-orange">·</span>
          <span>Pro Level</span>
        </div>
      </div>
    </section>
  );
}
