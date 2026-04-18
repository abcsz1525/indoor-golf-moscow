import { motion } from 'framer-motion';
import { AnimatedNumber } from './AnimatedNumber';

const METRICS = [
  { label: 'Ball Speed', value: 285, unit: 'km/h', bar: '95%' },
  { label: 'Launch Angle', value: 12, unit: '°', bar: '60%' },
  { label: 'Carry Distance', value: 245, unit: 'm', bar: '85%' },
  { label: 'Spin Rate', value: 2800, unit: 'rpm', bar: '70%' },
];

export function TrackMan() {
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

      <div className="container-x relative z-10 py-24 md:py-32">
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

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="display uppercase"
          style={{ fontSize: 'clamp(64px, 14vw, 220px)', lineHeight: 0.85 }}
        >
          TrackMan
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 text-xl md:text-2xl leading-relaxed font-light"
          >
            Профессиональная система анализа удара. Точные метрики в реальном
            времени. Именно так тренируются игроки мирового тура.
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
                    <span className="display text-5xl md:text-6xl leading-none">
                      <AnimatedNumber end={m.value} />
                    </span>
                    <span className="ml-2 text-sm font-medium uppercase">{m.unit}</span>
                  </div>
                  <div className="mt-2 h-0.5 bg-black/20 overflow-hidden">
                    <motion.div
                      className="h-full bg-black/60"
                      initial={{ width: '0%' }}
                      whileInView={{ width: m.bar }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-20 relative overflow-hidden border-y border-black/30 py-4">
          <div className="flex gap-16 whitespace-nowrap animate-scroll-x w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center display uppercase text-4xl md:text-6xl">
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
