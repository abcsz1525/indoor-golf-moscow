import { ArrowRight } from 'lucide-react';

export function ServicesCTA() {
  return (
    <section className="border-y border-line bg-bg-card py-12 md:py-16">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="eyebrow mb-4 text-brand-orange">Поможем выбрать</div>
            <h2 className="max-w-3xl text-3xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-5xl">
              Не уверены, какой формат подойдёт?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              Расскажите, как часто планируете играть и нужен ли вам PRO — мы подберём формат.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.querySelector<HTMLButtonElement>('[data-booking-trigger]')?.click();
            }}
            className="btn-primary group min-h-11 w-full md:w-auto"
            data-cursor="grow"
          >
            Обсудить формат
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
