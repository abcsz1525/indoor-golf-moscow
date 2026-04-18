import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

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
          ? 'bg-white/80 backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
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
                  : 'text-neutral-600 hover:text-brand-orange'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={onBooking} className="btn-primary text-sm py-3 px-6">
            Записаться
          </button>
        </nav>

        <button
          className="lg:hidden text-neutral-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-line">
          <nav className="container-x flex flex-col py-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-lg uppercase tracking-widest ${
                  location.pathname === item.to
                    ? 'text-brand-orange'
                    : 'text-neutral-800 hover:text-brand-orange'
                }`}
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
