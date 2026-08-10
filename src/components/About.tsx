import { motion } from 'framer-motion';
import { Section } from './Section';
import logoIcon from '../assets/logo-icon.webp';

export function About({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  return (
    <Section
      id="about"
      eyebrow="Кто мы"
      title="Найди свой"
      titleHighlight=" ID в гольфе"
      headingLevel={headingLevel}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="border-l-2 border-brand-orange pl-5 py-1">
            <div className="display text-3xl md:text-4xl uppercase text-[var(--text-primary)]">
              ID = <span className="text-brand-orange">Identity</span>
            </div>
            <p className="mt-2 text-sm uppercase tracking-widest text-[var(--text-subtle)]">
              Identity — идентичность
            </p>
          </div>

          <div className="space-y-5 text-lg text-[var(--text-muted)] leading-relaxed">
            <p>
              Полное имя нашего бренда — <strong className="text-[var(--text-primary)]">Indoor Golf</strong>.
              {' '}<strong className="text-[var(--text-primary)]">ID Golf</strong> — его короткое имя и главный
              смысл: гольф как часть идентичности человека, его характера, образа жизни и круга людей.
            </p>
            <p>
              Мы — гольфисты-любители и энтузиасты, которые искренне любят эту игру. Мы сами прошли
              путь от первого удара до настоящего увлечения гольфом и знаем его с обеих сторон:
              глазами новичка и глазами игрока, выходящего на турнир.
            </p>
            <p>
              Поэтому Indoor Golf для нас — не просто пространство с симуляторами и не услуга на один
              час. Мы создаём среду, в которой человек открывает для себя гольф, совершенствует игру,
              видит собственный прогресс, находит единомышленников и становится частью сообщества.
            </p>
            <p>
              Мы верим, что гольф в России может быть современным, открытым и живым. Без стереотипа
              о закрытом спорте для избранных, но с уважением к его истории, культуре и традициям.
              С передовыми технологиями, сильными тренерами, эстетикой, соревнованиями и понятным
              путём от первого занятия до собственного гандикапа и участия в турнирах.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Indoor Golf Moscow</strong> — дом и отправная
              точка нашей экосистемы. Вокруг него мы создаём тренировки и игровые встречи, клубное
              сообщество, лиги и турниры, образовательные программы и партнёрства.
            </p>
          </div>

          <div className="bg-bg-card border border-line p-6 md:p-8">
            <div className="eyebrow mb-3">Наша цель</div>
            <p className="text-lg text-[var(--text-primary)] leading-relaxed">
              Развивать и популяризировать гольф в России, объединяя игроков, тренеров, клубы,
              академии и партнёров. Вместе мы формируем новую российскую культуру гольфа —
              открытую, технологичную, эстетичную и объединяющую людей.
            </p>
          </div>

          <p className="text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed font-light">
            Гольф — это не просто игра. Это путь, характер и сообщество.
            <span className="block mt-2 text-brand-orange">Найди свой ID в гольфе.</span>
          </p>
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
                  'linear-gradient(rgba(227,91,39,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(227,91,39,0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <img src={logoIcon} alt="Indoor Golf Moscow" className="w-36 h-36 md:w-48 md:h-48 object-contain" />
              <div className="display mt-6 text-3xl uppercase text-[var(--text-primary)]">
                ID = <span className="text-brand-orange">Identity</span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                Indoor Golf · ID Golf
              </div>
            </div>
            {/* corner ticks */}
            <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
            <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
            <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs uppercase tracking-widest">
              <span className="text-[var(--text-subtle)]">Identity</span>
              <span className="text-brand-orange">Get your ID</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
