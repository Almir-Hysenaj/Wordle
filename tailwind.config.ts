import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': {
            transform: 'rotateX(0)',
            background: '#fff',
            borderColor: '#333',
          },
          '45%': {
            transform: 'rotateX(90deg)',
            background: '#fff',
            borderColor: '#333',
          },
          '55%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)', color: '#eee' },
        },
      },
      animation: {
        flip: 'flip 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
