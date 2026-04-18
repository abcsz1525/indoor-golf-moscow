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
      className="relative h-8 w-14 rounded-full border border-line transition-colors duration-300 flex items-center px-1"
      style={{ backgroundColor: dark ? '#1E1E1E' : '#E0E0E0' }}
      aria-label={dark ? 'Светлая тема' : 'Тёмная тема'}
    >
      <div
        className="h-6 w-6 rounded-full bg-brand-orange flex items-center justify-center transition-transform duration-300"
        style={{ transform: dark ? 'translateX(22px)' : 'translateX(0)' }}
      >
        {dark ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-white" />}
      </div>
    </button>
  );
}
