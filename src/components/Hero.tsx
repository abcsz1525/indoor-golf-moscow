import { ArrowDown, ArrowRight } from 'lucide-react';
import heroPhoto from '../assets/hero-club-wide.webp';

const FACTS = [
  ['03', 'симулятора'],
  ['9:00–23:00', 'ежедневно'],
  ['до 4', 'игроков'],
];

export function Hero({ onBooking }: { onBooking: (interest?: string) => void }) {
  const scrollToStart = () => {
    document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-neutral-950 text-white">
      <img
        src={heroPhoto}
        alt="Пространство Indoor Golf Moscow в Лужниках"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,.92)_0%,rgba(7,7,7,.72)_42%,rgba(7,7,7,.12)_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,7,7,.74)_0%,transparent_48%,rgba(7,7,7,.22)_100%)]" />

      <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-32 md:justify-center md:pb-32 md:pt-36">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.16em] text-white/70">
          Indoor Golf Moscow · Лужники
        </p>
        <h1
          className="font-brand-display max-w-[1000px] uppercase"
          style={{ fontSize: 'clamp(72px, 12vw, 176px)', lineHeight: 0.82, letterSpacing: '-0.02em' }}
        >
          Гольф.<br />
          <span className="text-brand-orange">Весь год.</span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-base leading-relaxed text-white/78 sm:text-lg md:col-span-6">
            Три симулятора Trackman в Лужниках — для самостоятельной игры,
            тренировок с тренером и встреч с друзьями.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
            <button onClick={() => onBooking()} className="btn-primary group">
              Выбрать время
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={scrollToStart}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/45 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white"
            >
              Выбрать формат
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/20 bg-black/35 backdrop-blur-sm">
        <div className="container-x flex min-h-20 items-stretch">
          <button
            onClick={scrollToStart}
            className="hidden w-20 shrink-0 items-center justify-center border-r border-white/20 text-white/70 transition-colors hover:text-white md:flex"
            aria-label="Перейти к форматам"
          >
            <ArrowDown size={19} />
          </button>
          <div className="grid flex-1 grid-cols-3">
            {FACTS.map(([value, label]) => (
              <div key={label} className="flex flex-col justify-center border-r border-white/20 px-4 last:border-r-0 md:px-8">
                <span className="display text-xl leading-none text-white md:text-2xl">{value}</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.13em] text-white/55 md:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
