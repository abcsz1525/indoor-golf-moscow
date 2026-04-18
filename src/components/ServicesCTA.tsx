import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ServicesCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-line bg-bg-card p-10 md:p-16 text-center"
        >
          <h3 className="display text-4xl md:text-5xl text-neutral-900 uppercase mb-4">
            Остались вопросы?
          </h3>
          <p className="text-neutral-500 text-lg mb-8 max-w-md mx-auto">
            Свяжитесь с нами — подберём формат под вас
          </p>
          <button
            onClick={() => {
              document.querySelector<HTMLButtonElement>('[data-booking-trigger]')?.click();
            }}
            className="btn-primary group"
            data-cursor="grow"
          >
            Записаться
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
