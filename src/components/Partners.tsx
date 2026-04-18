import { motion } from 'framer-motion';
import { Section } from './Section';

export function Partners() {
  return (
    <Section id="partners" eyebrow="Друзья и партнёры" title="Партнёры" className="bg-bg-secondary">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="border border-line bg-bg-primary p-10 md:p-14 flex flex-col items-center text-center max-w-md"
        >
          <div
            className="display text-brand-orange uppercase tracking-wide"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1 }}
          >
            RNGC
          </div>
          <div className="mt-3 text-sm uppercase tracking-widest text-white/60">
            Russian National Golf Center
          </div>
          <div className="mt-6 h-px w-16 bg-brand-orange" />
          <p className="mt-6 text-white/55 text-sm leading-relaxed max-w-xs">
            Стратегический партнёр клуба. Совместные турниры, обмен опытом и развитие гольф-сообщества.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
