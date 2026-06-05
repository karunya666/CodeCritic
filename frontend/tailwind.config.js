/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#080808',
        elevated: '#111111',
        border: 'rgba(255,255,255,0.08)',
        primary: '#5E5CE6',
        'primary-hover': '#4D4AD5',
        secondary: '#00D2FF',
        'text-primary': '#FFFFFF',
        'text-muted': '#8A8A8E',
        'status-error': '#FF453A',
        'status-success': '#32D74B',
        'status-warning': '#FFD60A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}