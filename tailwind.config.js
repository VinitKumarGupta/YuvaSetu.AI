/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Government Color Palette
        'govt-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Primary Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'govt-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'govt-saffron': '#FF9933',
        'govt-white': '#FFFFFF',
        'govt-green': '#138808',
      },
      fontFamily: {
        'govt': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'govt-xs': ['0.75rem', { lineHeight: '1rem' }],
        'govt-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'govt-base': ['1rem', { lineHeight: '1.5rem' }],
        'govt-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'govt-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'govt-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'govt-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'govt-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'govt-5xl': ['3rem', { lineHeight: '1' }],
        'govt-6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'govt': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'govt-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
