import { ArrowRight, Phone } from 'lucide-react';

export function FinalCTA({ onBooking }: { onBooking: (interest?: string) => void }) {
  return (
    <section className="bg-brand-orange text-neutral-950">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:items-end md:py-24">
        <div className="md:col-span-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]">Лужники · ежедневно 9:00–23:00</p>
          <h2 className="display mt-5 text-5xl leading-[0.9] sm:text-6xl md:text-8xl">
            Выберите время.<br />Об игре позаботимся мы.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:flex-col md:items-stretch">
          <button onClick={() => onBooking()} className="inline-flex min-h-12 items-center justify-center gap-2 bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
            Выбрать время
            <ArrowRight size={17} />
          </button>
          <a href="tel:+79260926919" className="inline-flex min-h-12 items-center justify-center gap-2 border border-neutral-950 px-7 py-3 text-sm font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
            <Phone size={16} />
            8 926 092-69-19
          </a>
        </div>
      </div>
    </section>
  );
}
