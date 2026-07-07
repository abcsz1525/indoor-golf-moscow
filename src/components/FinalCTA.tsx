import { motion } from 'framer-motion';
import { ArrowRight, Phone, Send } from 'lucide-react';

export function FinalCTA({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <section className="relative overflow-hidden bg-brand-orange text-black">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="container-x relative z-10 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="display uppercase"
          style={{ fontSize: 'clamp(40px, 7vw, 110px)', lineHeight: 0.9 }}
        >
          Первый драйв —<br />уже сегодня
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg font-light leading-relaxed"
        >
          Лужники · без выходных 7:00–23:00 · бесплатная парковка.
          Ответим в течение 30 минут в рабочее время.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => onBooking()}
            className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold uppercase tracking-widest px-7 py-4 transition-colors hover:bg-neutral-800 group"
          >
            Записаться
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="tel:+79260926919"
            className="inline-flex items-center gap-2 border border-black px-7 py-4 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors"
          >
            <Phone size={16} />
            8 926 092-69-19
          </a>
          <a
            href="https://t.me/indoorgolf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-black px-7 py-4 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors"
          >
            <Send size={16} />
            Telegram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
