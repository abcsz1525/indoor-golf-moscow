import { useState } from 'react';
import { ArrowRight, Clock, MapPin, Train, CircleParking, Map } from 'lucide-react';
import { Section } from './Section';
import { Link } from 'react-router-dom';

const ADDRESS_QUERY = 'Москва, ул. Лужники 24 стр. 21';

export function Location({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <Section id="location" eyebrow="Как нас найти" title="Локация" headingLevel={headingLevel}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="space-y-7 lg:col-span-5">
          <InfoRow icon={MapPin} label="Адрес">
            Москва, ул. Лужники 24, стр. 21
            <br />
            Дворец тенниса Лужники · блок C
          </InfoRow>
          <InfoRow icon={Clock} label="Режим работы">
            Без выходных · 9:00 – 23:00
          </InfoRow>
          <InfoRow icon={Train} label="Метро">
            Воробьёвы горы · МЦК Лужники
          </InfoRow>
          <InfoRow icon={CircleParking} label="Парковка">
            Охраняемая, на территории спорткомплекса
          </InfoRow>

          <a
            href={`https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_QUERY)}&rtext=~${encodeURIComponent(ADDRESS_QUERY)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-2 inline-flex min-h-11 w-full sm:w-auto"
          >
            Построить маршрут
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="relative min-h-[420px] overflow-hidden border border-line bg-bg-card sm:min-h-[390px] lg:col-span-7 lg:min-h-[420px]">
          {mapLoaded ? (
            <iframe
              title="Indoor Golf Moscow — Лужники"
              src={`https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(ADDRESS_QUERY)}&z=16`}
              width="100%"
              height="100%"
              frameBorder={0}
              loading="lazy"
              className="absolute inset-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="eyebrow mb-4 text-brand-orange">Точка назначения</div>
                  <h3 className="max-w-md text-2xl font-light tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
                    Дворец тенниса Лужники, блок C
                  </h3>
                  <p className="mt-4 text-base text-[var(--text-muted)]">
                    Москва, ул. Лужники 24, стр. 21
                  </p>
                </div>
                <Map size={48} strokeWidth={1.1} className="hidden shrink-0 text-brand-orange md:block" />
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
                После нажатия Яндекс Карты могут получить технические данные браузера и
                использовать cookie. Подробнее — в{' '}
                <Link to="/privacy" className="text-brand-orange underline underline-offset-2">
                  политике обработки данных
                </Link>.
                </p>
                <button
                  type="button"
                  aria-label="Показать карту"
                  className="btn-primary mt-5 min-h-11 w-full sm:w-auto"
                  onClick={() => setMapLoaded(true)}
                >
                  Показать карту здесь
                </button>
              </div>
            </div>
          )}
        </div>
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
