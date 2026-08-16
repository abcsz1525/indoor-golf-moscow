import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative flex h-9 w-[54px] items-center rounded-full border border-line px-1 transition-colors duration-200"
      style={{ backgroundColor: dark ? '#1E1E1E' : '#E0E0E0' }}
      aria-label={dark ? 'Светлая тема' : 'Тёмная тема'}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-neutral-950 transition-transform duration-200"
        style={{ transform: dark ? 'translateX(20px)' : 'translateX(0)' }}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </div>
    </button>
  );
}
