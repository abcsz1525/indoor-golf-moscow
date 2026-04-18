import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { to: '/about', label: 'О нас' },
  { to: '/tech', label: 'Технологии' },
  { to: '/gallery', label: 'Галерея' },
  { to: '/services', label: 'Услуги' },
  { to: '/contacts', label: 'Контакты' },
];

export function Navbar({ onBooking }: { onBooking: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'var(--nav-bg)' } : undefined}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center">
          <Logo size={66} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm uppercase tracking-widest transition-colors ${
                location.pathname === item.to
                  ? 'text-brand-orange'
                  : 'hover:text-brand-orange'
              }`}
              style={location.pathname !== item.to ? { color: 'var(--text-muted)' } : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <button onClick={onBooking} data-booking-trigger className="btn-primary text-sm py-3 px-6">
            Записаться
          </button>
        </nav>

        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
            style={{ color: 'var(--text-primary)' }}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden backdrop-blur-md border-t border-line"
          style={{ backgroundColor: 'var(--nav-mobile-bg)' }}
        >
          <nav className="container-x flex flex-col py-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-lg uppercase tracking-widest ${
                  location.pathname === item.to
                    ? 'text-brand-orange'
                    : 'hover:text-brand-orange'
                }`}
                style={location.pathname !== item.to ? { color: 'var(--text-primary)' } : undefined}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={onBooking}
              className="text-lg uppercase tracking-widest text-brand-orange text-left"
            >
              Записаться
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
