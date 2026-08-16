import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { to: '/about', label: 'О нас' },
  { to: '/tech', label: 'Технологии' },
  { to: '/gallery', label: 'Галерея' },
  { to: '/services', label: 'Услуги' },
  { to: '/events', label: 'События' },
  { to: '/contacts', label: 'Контакты' },
];

export function Navbar({ onBooking }: { onBooking: () => void }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md transition-colors duration-200"
      style={{ backgroundColor: scrolled ? 'var(--nav-bg)' : 'color-mix(in srgb, var(--bg-primary) 84%, transparent)' }}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <Logo size={66} />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`whitespace-nowrap text-[13px] font-medium transition-colors ${
                location.pathname === item.to
                  ? 'text-brand-orange'
                  : 'hover:text-brand-orange'
              }`}
              style={location.pathname !== item.to ? { color: 'var(--text-muted)' } : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+79260926919"
            className="flex items-center gap-2 whitespace-nowrap text-[13px] transition-colors hover:text-brand-orange"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Позвонить 8 926 092-69-19"
          >
            <Phone size={15} className="text-brand-orange shrink-0" />
            <span className="hidden xl:inline">8 926 092-69-19</span>
          </a>
          <div className="hidden xl:block"><ThemeToggle /></div>
          <button onClick={onBooking} data-booking-trigger className="btn-primary whitespace-nowrap px-6">
            Выбрать время
          </button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex h-11 w-11 items-center justify-center border border-brand-orange bg-brand-orange text-neutral-950 transition-colors hover:bg-brand-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="lg:hidden backdrop-blur-md border-t border-line"
          style={{ backgroundColor: 'var(--nav-mobile-bg)' }}
        >
          <nav className="container-x flex min-h-[calc(100svh-72px)] flex-col gap-1 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex min-h-14 items-center border-b border-line text-2xl font-medium ${
                  location.pathname === item.to
                    ? 'text-brand-orange'
                    : 'hover:text-brand-orange'
                }`}
                style={location.pathname !== item.to ? { color: 'var(--text-primary)' } : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+79260926919"
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center gap-2 border-b border-line text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              <Phone size={17} className="text-brand-orange" />
              8 926 092-69-19
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onBooking();
              }}
              className="btn-primary mt-6 w-full text-left"
            >
              Выбрать время
            </button>
            <div className="mt-auto pt-8"><ThemeToggle /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
