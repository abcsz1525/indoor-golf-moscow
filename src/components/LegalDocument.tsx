import type { ReactNode } from 'react';

export function LegalDocument({
  eyebrow,
  title,
  revision,
  children,
}: {
  eyebrow: string;
  title: string;
  revision?: string;
  children: ReactNode;
}) {
  return (
    <div className="page-content">
      <section className="pb-16 md:pb-24">
        <div className="container-x max-w-4xl">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-orange" />
            {eyebrow}
          </div>
          <h1 className="section-title text-brand-orange uppercase">{title}</h1>
          {revision && (
            <p className="mt-6 text-sm text-[var(--text-subtle)]">Редакция от {revision}</p>
          )}
          <div className="mt-10 space-y-10 leading-relaxed text-[var(--text-muted)]">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="display text-2xl uppercase text-[var(--text-primary)]">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-brand-orange">{children}</ul>;
}

export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-brand-orange bg-brand-orange/5 px-5 py-4 text-sm">
      {children}
    </div>
  );
}
