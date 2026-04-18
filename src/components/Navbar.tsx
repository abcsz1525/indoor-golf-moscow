import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { href: '#about', label: 'О нас' },
  { href: '#trackman', label: 'Технологии' },
  { href: '#location', label: 'Локация' },
  { href: '#booking', label: 'Записаться' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <a href="#top" className="flex items-center">
          <Logo size={66} />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-white/80 hover:text-brand-orange transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a href="#booking" className="btn-primary text-sm py-3 px-6">
            Записаться
          </a>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-line">
          <nav className="container-x flex flex-col py-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg uppercase tracking-widest text-white/90 hover:text-brand-orange"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
