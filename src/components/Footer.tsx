import { Link } from 'react-router-dom';
import { ArrowUpRight, Send } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY } from '../legal/company';

const NAV = [
  ['/about', 'О нас'],
  ['/tech', 'Технологии'],
  ['/gallery', 'Галерея'],
  ['/services', 'Услуги'],
  ['/events', 'События'],
  ['/contacts', 'Контакты'],
] as const;

const LEGAL = [
  ['/terms', 'Правила клуба'],
  ['/privacy', 'Персональные данные'],
  ['/consent', 'Согласие'],
  ['/legal', 'Реквизиты'],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-primary">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label="Indoor Golf Moscow — главная">
              <Logo size={66} />
            </Link>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-[var(--text-muted)]">
              Indoor-гольф в Лужниках: самостоятельная игра, тренировки с тренером и клубные события.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.instagram.com/indoorgolfmoscow" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm transition-colors hover:border-brand-orange hover:text-brand-orange">
                Instagram <ArrowUpRight size={15} />
              </a>
              <a href="https://t.me/indoorgolf" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm transition-colors hover:border-brand-orange hover:text-brand-orange">
                <Send size={15} /> Telegram
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Разделы</p>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              {NAV.map(([to, label]) => (
                <li key={to}><Link to={to} className="transition-colors hover:text-brand-orange">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-5">Лужники</p>
            <div className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>{COMPANY.venueAddress}</p>
              <p>{COMPANY.hours}</p>
              <a href={COMPANY.phoneHref} className="block text-lg font-medium text-[var(--text-primary)] transition-colors hover:text-brand-orange">
                {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-line pt-7 text-xs leading-relaxed text-[var(--text-subtle)] md:grid-cols-12">
          <div className="md:col-span-5">
            <p>{COMPANY.fullName}</p>
            <p>ИНН {COMPANY.inn} · КПП {COMPANY.kpp} · ОГРН {COMPANY.ogrn}</p>
            <p>{COMPANY.legalAddress}</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-5">
            {LEGAL.map(([to, label]) => (
              <Link key={to} to={to} className="transition-colors hover:text-brand-orange">{label}</Link>
            ))}
          </nav>
          <p className="md:col-span-2 md:text-right">© {new Date().getFullYear()} ID Golf</p>
        </div>
      </div>
    </footer>
  );
}
