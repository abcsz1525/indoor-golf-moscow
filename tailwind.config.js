/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8471A',
          'orange-hover': '#FF5A2C',
        },
        bg: {
          primary: '#0A0A0A',
          secondary: '#111111',
          card: '#161616',
        },
        metal: {
          silver: '#C0C0C0',
          graphite: '#4A4A4A',
        },
        line: '#1E1E1E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Barlow Condensed"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
        brand: '0.2em',
      },
      backgroundImage: {
        'brand-grid':
          'linear-gradient(rgba(232,71,26,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,71,26,0.08) 1px, transparent 1px)',
        'brand-grid-dark':
          'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        'scroll-x': 'scroll-x 40s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
