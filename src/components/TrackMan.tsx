import { ArrowRight } from 'lucide-react';
import trackmanIo from '../assets/tech/trackman-io.webp';

const METRICS = [
  ['40+', 'параметров удара'],
  ['2 + 1', 'радара и камера'],
  ['550+', 'полей в глобальной библиотеке'],
];

export function TrackMan({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section id="trackman" className="overflow-hidden bg-[#0d0d0d] text-[#f7f5f0]">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-orange">Технология клуба</p>
            <Heading
              className="font-brand-display mt-4 uppercase"
              style={{ fontSize: 'clamp(64px, 10vw, 142px)', lineHeight: 0.84 }}
            >
              Trackman
            </Heading>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/68">
              Точная картина каждого удара: скорость, траектория, вращение мяча и движение клюшки.
              Данные помогают понимать игру и принимать решения на следующем ударе.
            </p>
            <a href="/tech" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-brand-orange pb-1 text-sm font-semibold text-brand-orange transition-colors hover:border-white hover:text-white">
              Как работает Trackman
              <ArrowRight size={16} />
            </a>
          </div>

          <figure className="relative min-h-[360px] overflow-hidden lg:col-span-7 lg:min-h-[500px]">
            <img
              src={trackmanIo}
              alt="Потолочная система Trackman iO"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/90 to-transparent px-6 pb-6 pt-24 text-sm text-white/70 md:px-8 md:pb-8">
              <span>Trackman iO · первая установленная система в России</span>
              <span className="hidden text-white/45 md:block">Indoor Optimized</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid border-y border-white/20 sm:grid-cols-3">
          {METRICS.map(([value, label]) => (
            <div key={label} className="border-b border-white/20 py-6 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 md:py-8">
              <div className="display text-4xl leading-none text-white md:text-5xl">{value}</div>
              <div className="mt-2 max-w-[18rem] text-sm leading-snug text-white/55">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
