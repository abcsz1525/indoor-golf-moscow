import { motion } from 'framer-motion';
import { User, UserCheck, Users, Users2, Briefcase } from 'lucide-react';
import { Section } from './Section';

const FORMATS = [
  { icon: User, title: 'Индивидуальная игра', desc: 'Сольная сессия на симуляторе — ваше поле, ваш темп.' },
  { icon: UserCheck, title: 'С тренером', desc: 'Персональная работа над техникой с PRO-тренером клуба.' },
  { icon: Users, title: 'С друзьями', desc: 'Компания до 4 человек — дружеский раунд без очередей.' },
  { icon: Users2, title: 'Мини\u2011группа', desc: 'Групповые тренировки для начинающих и любителей.' },
  { icon: Briefcase, title: 'Корпоратив', desc: 'Приватная аренда зала для команды и гостей.' },
];

export function Formats() {
  return (
    <Section id="formats" eyebrow="Выберите свой" title="Форматы">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-line">
        {FORMATS.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-bg-primary p-6 lg:p-5 xl:p-7 min-h-[300px] flex flex-col transition-colors hover:bg-bg-card min-w-0"
            >
              <Icon size={28} className="text-brand-orange mb-6 md:mb-8" strokeWidth={1.4} />
              <div className="min-h-[64px] lg:min-h-[72px] xl:min-h-[80px] flex items-start mb-4">
                <h3
                  className="display uppercase text-white leading-[1] tracking-wide"
                  style={{
                    fontSize: 'clamp(16px, 1.4vw, 22px)',
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal',
                    hyphens: 'none',
                    WebkitHyphens: 'none',
                    minWidth: 0,
                  }}
                >
                  {f.title}
                </h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
              {/* bottom hover line */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-orange transition-all duration-500 group-hover:w-full" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
