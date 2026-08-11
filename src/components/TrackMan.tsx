import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const METRICS = [
  { label: 'Club & Ball Data', value: '40+', unit: 'параметров' },
  { label: 'Dual Radar + Optics', value: '2 + 1', unit: 'сенсора' },
  { label: 'Club Data', value: '17', unit: 'параметров' },
  { label: 'Ball Data', value: '13', unit: 'параметров' },
];

export function TrackMan({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? motion.h1 : motion.h2;

  return (
    <section id="trackman" className="relative overflow-hidden bg-brand-orange text-black">
      {/* brand grid overlay (darker on orange per brandbook) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.14) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* diagonal light streak */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rotate-45 bg-gradient-to-b from-white/20 to-transparent blur-3xl" />

      <div className="container-x relative z-10 pt-10 md:pt-16 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 text-xs uppercase tracking-brand mb-6"
        >
          <span className="h-px w-10 bg-black" />
          Технология
        </motion.div>

        <Heading
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="display uppercase"
          style={{ fontSize: 'clamp(64px, 14vw, 220px)', lineHeight: 0.85 }}
        >
          TrackMan
        </Heading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 text-xl md:text-2xl leading-relaxed font-light"
          >
            Профессиональная измерительная система: два радара, камера и более
            40 параметров удара. Технология, которой доверяет мировой тур.
            <a
              href="/tech"
              className="mt-7 flex min-h-11 w-fit items-center gap-2 border-b border-black pb-1 text-xs font-semibold uppercase tracking-brand transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              Подробнее о Trackman
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.p>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-px bg-black/20">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="bg-brand-orange p-6 min-h-[160px] flex flex-col justify-between"
                >
                  <div className="text-[11px] uppercase tracking-brand">{m.label}</div>
                  <div>
                    <span className="display text-5xl md:text-6xl leading-none">{m.value}</span>
                    <span className="ml-2 text-sm font-medium uppercase">{m.unit}</span>
                  </div>
                  <div className="mt-3 h-px bg-black/30" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-20 relative overflow-hidden border-y border-black/30 py-4">
          <div className="flex whitespace-nowrap animate-scroll-x w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center pr-16 display uppercase text-4xl md:text-6xl">
                <span>Precision</span>
                <span className="text-black/40">×</span>
                <span>Data</span>
                <span className="text-black/40">×</span>
                <span>Performance</span>
                <span className="text-black/40">×</span>
                <span>Tour Grade</span>
                <span className="text-black/40">×</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
