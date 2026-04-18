import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { Logo } from './Logo';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-primary">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/">
              <Logo size={66} />
            </Link>
            <p className="mt-6 text-sm text-[var(--text-subtle)] max-w-xs leading-relaxed">
              Первое в России пространство гольфа в помещении. Симуляторы
              Trackman. Лужники, Москва.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Навигация</div>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li><Link to="/about" className="hover:text-brand-orange">О нас</Link></li>
              <li><Link to="/tech" className="hover:text-brand-orange">Технологии</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-orange">Галерея</Link></li>
              <li><Link to="/services" className="hover:text-brand-orange">Услуги</Link></li>
              <li><Link to="/contacts" className="hover:text-brand-orange">Контакты</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Контакты</div>
            <div className="space-y-2 text-[var(--text-muted)] text-sm">
              <div>Москва, ул. Лужники 24, стр. 21</div>
              <div>Дворец тенниса · блок C</div>
              <div>Без выходных 7:00 – 23:00</div>
              <a href="tel:+79260926919" className="block hover:text-brand-orange">
                8 (926) 092-69-19
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              <SocialLink href="https://instagram.com/" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://t.me/+79260926919" label="Telegram">
                <Send size={18} strokeWidth={1.5} />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs uppercase tracking-widest text-[var(--text-subtle)]">
          <div>© 2025 Indoor Golf Moscow. Первое в России.</div>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-brand-orange" />
            We make golf accessible
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-11 w-11 inline-flex items-center justify-center border border-line text-[var(--text-primary)] hover:border-brand-orange hover:text-brand-orange transition-colors"
    >
      {children}
    </a>
  );
}
