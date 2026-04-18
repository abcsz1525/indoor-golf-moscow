import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Train, CircleParking } from 'lucide-react';
import { Section } from './Section';

const ADDRESS_QUERY = 'Москва, ул. Лужники 24 стр. 21';

export function Location() {
  return (
    <Section id="location" eyebrow="Как нас найти" title="Локация">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-8"
        >
          <InfoRow icon={MapPin} label="Адрес">
            Москва, ул. Лужники 24, стр. 21
            <br />
            Дворец тенниса Лужники · блок C
          </InfoRow>
          <InfoRow icon={Clock} label="Режим работы">
            Без выходных · 7:00 – 23:00
          </InfoRow>
          <InfoRow icon={Train} label="Метро">
            Спортивная · 10 минут пешком
          </InfoRow>
          <InfoRow icon={CircleParking} label="Парковка">
            Бесплатно на территории спорткомплекса
          </InfoRow>

          <a
            href={`https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_QUERY)}&rtext=~${encodeURIComponent(ADDRESS_QUERY)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-4 inline-flex"
          >
            Построить маршрут
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative border border-line overflow-hidden bg-bg-card min-h-[420px]"
        >
          <iframe
            title="Indoor Golf Moscow — Лужники"
            src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(ADDRESS_QUERY)}&z=16`}
            width="100%"
            height="100%"
            frameBorder={0}
            className="absolute inset-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
          />
          <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-brand-orange" />
          <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-brand-orange" />
          <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-brand-orange" />
          <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-brand-orange" />
        </motion.div>
      </div>
    </Section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5 pb-6 border-b border-line">
      <Icon size={22} className="text-brand-orange flex-shrink-0 mt-1" strokeWidth={1.5} />
      <div>
        <div className="eyebrow mb-2">{label}</div>
        <div className="text-[var(--text-primary)] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
