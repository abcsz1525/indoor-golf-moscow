import type { InputHTMLAttributes } from 'react';

export function PersonalDataConsent({
  id,
  error,
  inputProps,
  className = '',
}: {
  id: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex min-h-11 max-w-xl cursor-pointer items-start gap-3 py-1 text-xs text-[var(--text-muted)]"
      >
        <input
          {...inputProps}
          id={id}
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#E35B27]"
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span>
          Я даю отдельное{' '}
          <a
            href="/consent"
            target="_blank"
            rel="noreferrer"
            className="text-brand-orange underline underline-offset-2"
          >
            согласие на обработку персональных данных
          </a>{' '}
          для ответа на заявку.
        </span>
      </label>
      <p className="ml-8 mt-2 max-w-xl text-[11px] leading-relaxed text-[var(--text-subtle)]">
        До отправки ознакомьтесь с{' '}
        <a
          href="/privacy"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-brand-orange"
        >
          Политикой обработки персональных данных
        </a>.
      </p>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-brand-orange">
          {error}
        </p>
      )}
    </div>
  );
}
