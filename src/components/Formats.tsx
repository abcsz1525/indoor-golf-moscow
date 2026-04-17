import { motion } from 'framer-motion';
import {
  User,
  UserCheck,
  Users,
  Users2,
  Briefcase,
  GraduationCap,
  Baby,
  PartyPopper,
  Trophy,
  Target,
  Heart,
} from 'lucide-react';
import { Section } from './Section';

const SERVICES = [
  { icon: User, title: 'Индивидуальная тренировка', desc: '1 человек на симуляторе — ваше поле, ваш темп.' },
  { icon: Users, title: 'Групповая тренировка', desc: 'До 4 человек на одном симуляторе — играйте вместе.' },
  { icon: UserCheck, title: 'Индивидуальные уроки с тренером', desc: 'Персональная работа над техникой с PRO-тренером.' },
  { icon: Users2, title: 'Групповые уроки', desc: '2–3 человека — обучение в мини-группе.' },
  { icon: Heart, title: 'Семейные уроки', desc: 'Гольф для всей семьи — отличный формат совместного отдыха.' },
  { icon: Briefcase, title: 'Корпоративы и мероприятия', desc: 'Приватная аренда для команды и гостей.' },
  { icon: PartyPopper, title: 'Дни рождения', desc: 'Уникальный праздник в атмосфере премиального клуба.' },
  { icon: Baby, title: 'Детские праздники', desc: 'Весёлый и безопасный формат для юных гольфистов.' },
  { icon: GraduationCap, title: 'Введение в гольф', desc: 'Для начинающих — первые шаги в мире гольфа.' },
  { icon: Target, title: 'Тренировки для продвинутых', desc: 'Углублённая работа над техникой и стратегией.' },
  { icon: Trophy, title: 'Турниры и челленджи', desc: 'Регулярные клубные соревнования и состязания.' },
];

export function Formats() {
  return (
    <Section id="formats" eyebrow="Услуги" title="Что мы предлагаем">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
        {SERVICES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative bg-bg-primary p-8 min-h-[200px] flex flex-col transition-colors hover:bg-bg-card"
            >
              <span className="absolute top-0 left-0 h-px w-10 bg-brand-orange transition-all duration-500 group-hover:w-full" />
              <Icon size={28} className="text-brand-orange mb-5" strokeWidth={1.4} />
              <h3 className="display uppercase text-white text-xl tracking-wide mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
              <span className="absolute top-6 right-6 text-xs text-white/20 font-mono">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
