import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Section } from './Section';
import logoIcon from '../assets/logo-icon.png';

export function About() {
  return (
    <Section id="about" eyebrow="О пространстве" title="Indoor Golf" titleHighlight=" Moscow">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8"
        >
          <p className="text-xl md:text-2xl text-neutral-800 leading-relaxed font-light">
            Первое в России пространство гольфа в помещении, оснащённое передовыми
            симуляторами <span className="text-brand-orange">Trackman</span>.
            Технологии мирового уровня, профессиональное сообщество и атмосфера
            премиального клуба.
          </p>

          <div className="h-px w-24 bg-brand-orange" />

          <div>
            <div className="eyebrow mb-3">Миссия</div>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
              Мы делаем гольф доступным — позволяем каждому совершенствовать
              мастерство и открывать игру в любое время года.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 text-sm text-neutral-500">
            <MapPin size={18} className="text-brand-orange" />
            <span className="uppercase tracking-widest">
              Москва, ул. Лужники 24, стр. 21
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-square bg-bg-card border border-line overflow-hidden">
            {/* grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(232,71,26,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(232,71,26,0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logoIcon} alt="Indoor Golf Moscow" className="w-48 h-48 object-contain" />
            </div>
            {/* corner ticks */}
            <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
            <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
            <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs uppercase tracking-widest">
              <span className="text-neutral-400">Est. 2025</span>
              <span className="text-brand-orange">№001 · RU</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
